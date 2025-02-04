package com.dubu.backend.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record NaverPlaceApiResponse(
        @JsonProperty("items") List<NaverPlace> places
) {
    public record NaverPlace(
            String title,
            String roadAddress,
            Integer mapx,
            Integer mapy
    ) {}
}