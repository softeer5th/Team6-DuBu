package com.dubu.backend.plan.application;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.dto.request.PlanSaveRequest;
import com.dubu.backend.plan.dto.response.PlanRecentResponse;
import com.dubu.backend.plan.exception.InvalidMemberStatusException;
import com.dubu.backend.plan.exception.NotFoundPlanException;
import com.dubu.backend.plan.exception.UnauthorizedPlanDeletionException;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.plan.infra.repository.PlanRepository;
import com.dubu.backend.todo.entity.Schedule;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.exception.ScheduleNotFoundException;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class PlanService {
    private final TaskSchedulerService taskSchedulerService;
    private final MemberRepository memberRepository;
    private final PlanRepository planRepository;
    private final PathRepository pathRepository;
    private final ScheduleRepository scheduleRepository;
    private final TodoRepository todoRepository;

    private static final ConcurrentHashMap<Long, ScheduledFuture<?>> SCHEDULE_MAP = new ConcurrentHashMap<>();

    @Transactional
    public void savePlan(Long memberId, PlanSaveRequest planSaveRequest) {
        Member currentMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        if (currentMember.getStatus() != Status.STOP) {
            throw new InvalidMemberStatusException(currentMember.getStatus().name());
        }

        Plan newPlan = Plan.createPlan(currentMember, planSaveRequest.totalSectionTime());
        planRepository.save(newPlan);

        List<Path> paths = IntStream.range(0, planSaveRequest.paths().size())
                .mapToObj(index -> Path.createPath(newPlan, planSaveRequest.paths().get(index), index))
                .toList();
        pathRepository.saveAll(paths);

        Schedule schedule = scheduleRepository.findScheduleByMemberAndDate(currentMember, LocalDate.now())
                .orElseThrow(() -> new ScheduleNotFoundException());

        List<Todo> existingTodos = schedule.getTodos();
        List<Todo> newTodos = new ArrayList<>();

        for (int i = 0; i < existingTodos.size(); i++) {
            Todo original = existingTodos.get(i);
            // round-robin으로 Path 할당
            Path assignedPath = paths.get(i % paths.size());
            Todo clonedTodo = Todo.copyOf(original, assignedPath);

            newTodos.add(clonedTodo);
        }
        todoRepository.saveAll(newTodos);
        currentMember.updateStatus(Status.MOVE);
        taskSchedulerService.scheduleFeedbackStatusUpdate(memberId, newPlan);
    }

    @Transactional(readOnly = true)
    public PlanRecentResponse findRecentPlan(Long memberId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        Plan recentPlan = planRepository.findTopByMemberIdOrderByCreatedAtDesc(memberId)
                .orElseThrow(() -> new NotFoundPlanException());

        List<Path> paths = pathRepository.findByPlanWithTodosOrderByPathOrder(recentPlan);

        return PlanRecentResponse.of(recentPlan, paths);
    }

    @Transactional
    public void removePlan(Long memberId, Long planId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        Plan planToDelete = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundPlanException(planId));

        if (!planToDelete.getMember().getId().equals(memberId)) {
            throw new UnauthorizedPlanDeletionException(memberId, planId);
        }

        taskSchedulerService.cancelScheduledPlan(planId);

        planRepository.delete(planToDelete);
    }
}