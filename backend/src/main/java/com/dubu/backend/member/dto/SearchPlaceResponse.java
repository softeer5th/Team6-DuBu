package com.dubu.backend.member.dto;

public record SearchPlaceResponse(
        String title,
        String roadAddress,
        Double x_coordinate,
        Double y_coordinate
) {
}