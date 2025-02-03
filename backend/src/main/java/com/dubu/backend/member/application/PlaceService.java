package com.dubu.backend.member.application;

import com.dubu.backend.member.dto.NaverPlaceApiResponse;
import com.dubu.backend.member.dto.SearchPlaceResponse;
import com.dubu.backend.member.exception.NaverApiServerException;
import com.dubu.backend.member.infra.place.NaverPlaceApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final NaverPlaceApiClient naverPlaceApiClient;

    public List<SearchPlaceResponse> searchPlaces(String query) {
        NaverPlaceApiResponse response = naverPlaceApiClient.searchPlaces(query);

        if(response == null) {
            throw new NaverApiServerException();
        }

        return response.places().stream()
                .map(place -> new SearchPlaceResponse(
                                place.title().replace("<b>", "").replace("</b>", ""),
                                place.roadAddress(),
                                place.mapx() / 1_000_0000.0,
                                place.mapy() / 1_000_0000.0
                ))
                .collect(Collectors.toList());
    }
}