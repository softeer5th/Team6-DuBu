package com.dubu.backend.member.dto;

public record PlaceSearchResponse(
        String title,
        String roadAddress,
        Double x_coordinate,
        Double y_coordinate
) {
}