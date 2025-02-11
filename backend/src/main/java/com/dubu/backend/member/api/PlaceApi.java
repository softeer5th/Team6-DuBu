package com.dubu.backend.member.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.dto.response.PlaceSearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PlaceApi {
    @Operation(
            summary = "장소 검색",
            description = """
                          키워드(query)를 이용해 장소를 검색한다. 
                          내부적으로 네이버 지역 검색 API를 호출한다.
                          """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "장소 검색 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = PlaceSearchResponseListExample.class,
                                    description = "장소 검색 결과 리스트"
                            ),
                            examples = {
                                    @ExampleObject(name = "장소 검색 성공 예시",
                                            value = """
                                                    {
                                                      "data": [
                                                        {
                                                          "title": "카페 홍길동",
                                                          "roadAddress": "서울특별시 강남구 테헤란로 427",
                                                          "x_coordinate": 127.0453733,
                                                          "y_coordinate": 37.5048676
                                                        },
                                                        {
                                                          "title": "카페 이순신",
                                                          "roadAddress": "서울특별시 강남구 봉은사로 109",
                                                          "x_coordinate": 127.0594931,
                                                          "y_coordinate": 37.5057432
                                                        }
                                                      ]
                                                    }
                                                    """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "503",
                    description = "네이버 API 서버 장애 (NAVER_SERVICE_UNAVAILABLE)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
                                    description = "에러 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "네이버 API 서버 장애 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "NAVER_SERVICE_UNAVAILABLE",
                                                      "message": "네이버 API 서버가 장애 상태입니다."
                                                    }
                                                    """)
                            }
                    )
            )
    })
    SuccessResponse<List<PlaceSearchResponse>> searchPlaces(
            @Parameter(description = "검색 키워드", required = true, example = "카페")
            @RequestParam("query") String query
    );

    @Schema(name = "PlaceSearchResponseListExample", description = "장소 검색 응답 예시")
    class PlaceSearchResponseListExample {
        public List<PlaceSearchResponse> data;
    }

    @Schema(name = "ErrorResponseExample", description = "에러 응답 예시")
    class ErrorResponseExample {
        @Schema(example = "NAVER_SERVICE_UNAVAILABLE")
        public String errorCode;
        @Schema(example = "네이버 API 서버가 장애 상태입니다.")
        public String message;
    }
}