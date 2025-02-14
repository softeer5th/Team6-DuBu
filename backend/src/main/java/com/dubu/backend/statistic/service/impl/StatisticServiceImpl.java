package com.dubu.backend.statistic.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Feedback;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.infra.repository.PlanRepository;
import com.dubu.backend.statistic.dto.response.DayStatisticInfo;
import com.dubu.backend.statistic.dto.response.WeekStatisticInfo;
import com.dubu.backend.statistic.service.StatisticService;
import com.dubu.backend.statistic.service.collection.CategoryTodoStatistics;
import com.dubu.backend.statistic.service.collection.DateUsageTimeStatistics;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatisticServiceImpl implements StatisticService {
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final PlanRepository planRepository;

    @Override
    public DayStatisticInfo collectDayStatistic(Long memberId, LocalDate date) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        List<Category> categories = categoryRepository.findAll();
        List<Plan> dayPlans = planRepository.findByMemberAndTypeAndCreatedAtBetween(member, TodoType.DONE, date.atStartOfDay(), date.atTime(LocalTime.MAX));

        if(dayPlans == null || dayPlans.isEmpty()){
            return null;
        }

        return buildDailyStatisticInfo(categories, dayPlans);
    }

    @Override
    public WeekStatisticInfo collectWeekStatistic(Long memberId, LocalDate date) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        List<Category> categories = categoryRepository.findAll();

        List<Plan> thisWeekPlans = planRepository.findByMemberAndTypeAndCreatedAtBetween(member, TodoType.DONE, date.atStartOfDay(), date.plusWeeks(1).atTime(LocalTime.MAX));

        if(thisWeekPlans == null || thisWeekPlans.isEmpty()){
            return null;
        }

        List<Plan> lastWeekPlans = planRepository.findByMemberAndCreatedAtBetween(member, date.minusWeeks(1).atStartOfDay(), date.minusDays(1).atTime(LocalTime.MAX));

        return buildWeekStatisticInfo(date, categories, thisWeekPlans, lastWeekPlans);
    }


    private DayStatisticInfo buildDailyStatisticInfo(List<Category> categories, List<Plan> plans) {
        int totalMoveTime = 0;
        int totalUsageTime = 0;
        List<Feedback> feedbacks = new ArrayList<>();
        CategoryTodoStatistics categoryTodoStatistics = new CategoryTodoStatistics(categories);

        for(Plan plan: plans){
            totalMoveTime += plan.getTotalTime();
            feedbacks.add(plan.getFeedback());

           for(Path path: plan.getPaths()){
                for(Todo todo: path.getTodos()){
                    categoryTodoStatistics.countDoneTodoByCategory(todo);
                    totalUsageTime += todo.getSpentTime();
                }
            }
        }

        return DayStatisticInfo.of(totalMoveTime, totalUsageTime, feedbacks, categoryTodoStatistics.getCategoryTodoCount());
    }

    private WeekStatisticInfo buildWeekStatisticInfo(LocalDate startDate, List<Category> categories, List<Plan> thisWeekPlans, List<Plan> lastWeekPlans){
        DateUsageTimeStatistics dateUsageTimeStatistics = new DateUsageTimeStatistics(startDate);
        int totalMoveTime = 0;
        int totalUsageTime = 0;
        int totalTodoCount = 0;
        CategoryTodoStatistics categoryTodoStatistics = new CategoryTodoStatistics(categories);

        for(Plan plan: thisWeekPlans){
            dateUsageTimeStatistics.addUsageTimeAtDate(plan.getCreatedAt().toLocalDate(), plan.getTotalTime());
            totalMoveTime += plan.getTotalTime();

            for(Path path: plan.getPaths()){
                for(Todo todo: path.getTodos()){
                    totalTodoCount += 1;
                    categoryTodoStatistics.countDoneTodoByCategory(todo);
                    totalUsageTime += todo.getSpentTime();
                }
            }
        }
        int lastWeekDiff = totalUsageTime - calculateWeeklyUsageTime(lastWeekPlans);

        return WeekStatisticInfo.of(dateUsageTimeStatistics.getDateUsageTime(), totalTodoCount, lastWeekDiff, totalMoveTime, totalUsageTime, categoryTodoStatistics.getCategoryTodoCount());
    }

    private int calculateWeeklyUsageTime(List<Plan> plans){
        return plans.stream().mapToInt(Plan::getTotalTime).sum();
    }
}
