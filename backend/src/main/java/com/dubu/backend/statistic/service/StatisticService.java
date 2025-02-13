package com.dubu.backend.statistic.service;

import com.dubu.backend.statistic.dto.response.DayStatisticInfo;
import com.dubu.backend.statistic.dto.response.WeekStatisticInfo;

import java.time.LocalDate;

public interface StatisticService {
    DayStatisticInfo collectDayStatistic(Long memberId, LocalDate date);
    WeekStatisticInfo collectWeekStatistic(Long memberId, LocalDate date);
}
