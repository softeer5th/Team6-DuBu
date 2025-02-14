package com.dubu.backend.statistic.service.collection;

import lombok.Getter;

import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Getter
public class DateUsageTimeStatistics {
    private final Map<LocalDate, Integer> dateUsageTime;

    public DateUsageTimeStatistics(LocalDate startDate) {
        dateUsageTime = IntStream.range(0, 7)
                .boxed()
                .collect(Collectors.toMap(
                        i -> startDate.plusDays(i),
                        i -> 0
                ));
    }

    public void addUsageTimeAtDate(LocalDate date, int time){
        dateUsageTime.merge(date, time, Integer::sum);
    }
}
