package com.dubu.backend.statistic.controller;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.statistic.dto.response.DayStatisticInfo;
import com.dubu.backend.statistic.dto.response.WeekStatisticInfo;
import com.dubu.backend.statistic.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticController {
    private final StatisticService statisticService;

    @GetMapping("/day")
    public SuccessResponse<DayStatisticInfo> getDayStatistic(
            @RequestAttribute Long memberId,
            @RequestParam LocalDate date
            )
    {
        return new SuccessResponse<>(statisticService.collectDayStatistic(memberId, date));
    }

    @GetMapping("/week")
    public SuccessResponse<WeekStatisticInfo> getWeekStatistic(
            @RequestAttribute Long memberId,
            @RequestParam LocalDate startDate
    ){
        return new SuccessResponse<>(statisticService.collectWeekStatistic(memberId, startDate));
    }
}
