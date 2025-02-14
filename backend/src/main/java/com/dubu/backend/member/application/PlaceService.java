package com.dubu.backend.member.application;

import com.dubu.backend.member.dto.response.KakaoPlaceApiResponse;
import com.dubu.backend.member.dto.response.NaverPlaceApiResponse;
import com.dubu.backend.member.dto.response.PlaceSearchResponse;
import com.dubu.backend.member.exception.KakaoApiServerException;
import com.dubu.backend.member.exception.NaverApiServerException;
import com.dubu.backend.member.infra.client.KakaoPlaceApiClient;
import com.dubu.backend.member.infra.client.NaverPlaceApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final NaverPlaceApiClient naverPlaceApiClient;
    private final KakaoPlaceApiClient kakaoPlaceApiClient;

    public List<PlaceSearchResponse> searchPlaces(String query) {
        NaverPlaceApiResponse naverPlaceApiResponse = naverPlaceApiClient.searchPlaces(query);
        KakaoPlaceApiResponse kakaoPlaceApiResponse = kakaoPlaceApiClient.searchPlaces(query);

        if (naverPlaceApiResponse == null) {
            throw new NaverApiServerException();
        }
        if (kakaoPlaceApiResponse == null) {
            throw new KakaoApiServerException();
        }

        List<NaverPlaceApiResponse.NaverPlace> naverPlaces = naverPlaceApiResponse.places();
        List<KakaoPlaceApiResponse.DocumentsResponse> kakaoPlaces = kakaoPlaceApiResponse.documents();

        return mergeResultsUsingRoundRobin(naverPlaces, kakaoPlaces);
    }

    private List<PlaceSearchResponse> mergeResultsUsingRoundRobin(
            List<NaverPlaceApiResponse.NaverPlace> naverPlaces,
            List<KakaoPlaceApiResponse.DocumentsResponse> kakaoPlaces
    ) {

        Iterator<NaverPlaceApiResponse.NaverPlace> naverIterator = naverPlaces.iterator();
        Iterator<KakaoPlaceApiResponse.DocumentsResponse> kakaoIterator = kakaoPlaces.iterator();

        List<PlaceSearchResponse> result = new ArrayList<>();

        while (naverIterator.hasNext() || kakaoIterator.hasNext()) {
            if (naverIterator.hasNext()) {
                NaverPlaceApiResponse.NaverPlace naverPlace = naverIterator.next();
                result.add(new PlaceSearchResponse(
                        naverPlace.title().replace("<b>", "").replace("</b>", ""),
                        naverPlace.roadAddress(),
                        naverPlace.mapx() / 1_000_0000.0,
                        naverPlace.mapy() / 1_000_0000.0
                ));
            }

            if (kakaoIterator.hasNext()) {
                KakaoPlaceApiResponse.DocumentsResponse kakaoPlace = kakaoIterator.next();
                result.add(new PlaceSearchResponse(
                        kakaoPlace.roadAddress().buildingName(),
                        kakaoPlace.roadAddress().addressName(),
                        Double.parseDouble(kakaoPlace.roadAddress().x()),
                        Double.parseDouble(kakaoPlace.roadAddress().y())
                ));
            }
        }

        return result;
    }
}