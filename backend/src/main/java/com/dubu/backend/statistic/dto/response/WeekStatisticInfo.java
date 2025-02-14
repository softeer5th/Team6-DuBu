package com.dubu.backend.statistic.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record WeekStatisticInfo(
        List<DayUsageTime> dayUsageTimes,
        int totalTodoCount,
        int lastWeekDiff,
        int totalMoveTime,
        int totalUsageTime,
        List<CategoryTodoInfo> categoryTodoCounts
) {
    public static WeekStatisticInfo of(Map<LocalDate, Integer> dateUsageTime, int totalTodoCount, int lastWeekDiff, int totalMoveTime, int totalUsageTime, Map<String, Integer> categoryTodoCount){
        return new WeekStatisticInfo(
                DayUsageTime.fromDateUsageTime(dateUsageTime),
                totalTodoCount,
                lastWeekDiff,
                totalMoveTime,
                totalUsageTime,
                CategoryTodoInfo.fromCategoryTodoCount(categoryTodoCount)
        );
    }

    record DayUsageTime(LocalDate date, int usageTime){
        private static List<DayUsageTime> fromDateUsageTime(Map<LocalDate, Integer> dateUsageTime){
            return dateUsageTime.entrySet()
                            .stream()
                            .map(entry -> new DayUsageTime(entry.getKey(), entry.getValue()))
                            .toList();
        }
    }
}
