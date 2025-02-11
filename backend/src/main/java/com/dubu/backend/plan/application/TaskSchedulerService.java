package com.dubu.backend.plan.application;

import com.dubu.backend.member.application.MemberService;
import com.dubu.backend.plan.domain.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Service
public class TaskSchedulerService {
    @Qualifier("statusUpdateScheduler")
    private final TaskScheduler taskScheduler;
    private final MemberService memberService;

    private static final ConcurrentHashMap<Long, ScheduledFuture<?>> SCHEDULE_MAP = new ConcurrentHashMap<>();

    @Autowired
    public TaskSchedulerService(
            @Qualifier("statusUpdateScheduler") TaskScheduler taskScheduler,
            MemberService memberService
    ) {
        this.taskScheduler = taskScheduler;
        this.memberService = memberService;
    }

    public void scheduleFeedbackStatusUpdate(Long memberId, Plan plan) {
        Instant threeHoursLater = Instant.now().plus(3, ChronoUnit.HOURS);

        ScheduledFuture<?> future = taskScheduler.schedule(
                () -> memberService.updateMemberStatus(memberId, "FEEDBACK"),
                threeHoursLater
        );

        SCHEDULE_MAP.put(plan.getId(), future);
    }

    public void cancelScheduledPlan(Long planId) {
        ScheduledFuture<?> future = SCHEDULE_MAP.get(planId);
        if (future != null && !future.isCancelled() && !future.isDone()) {
            future.cancel(false);
            SCHEDULE_MAP.remove(planId);
        }
    }
}