package com.dubu.backend.member.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.application.PlaceService;
import com.dubu.backend.member.dto.PlaceSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/places")
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("/search")
    public SuccessResponse<List<PlaceSearchResponse>> searchPlaces(
            @RequestParam("query") String query
    ) {
        List<PlaceSearchResponse> searchPlaces = placeService.searchPlaces(query);

        return new SuccessResponse<>(searchPlaces);
    }
}