package com.dubu.backend.member.dto.response;

public record PlaceSearchResponse(
        String title,
        String roadAddress,
        Double x_coordinate,
        Double y_coordinate
) {
}