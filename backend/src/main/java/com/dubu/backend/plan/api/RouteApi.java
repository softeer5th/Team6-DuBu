package com.dubu.backend.plan.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.plan.dto.response.RouteSearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface RouteApi {

    @Operation(summary = "경로 검색",
            description = """
                    출발지와 도착지의 좌표를 이용하여 대중교통 경로를 검색한다.  
                    ODsay API를 활용하여 검색된 경로를 반환하며,
                    최근 사용한 경로 여부(`isRecentlyUsed`)도 함께 제공된다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "경로 검색 성공",
                    content = @Content(
                            schema = @Schema(implementation = RouteSearchResponseListExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": [
                                                {
                                                  "isRecentlyUsed": true,
                                                  "totalTime": 40,
                                                  "totalSectionTime": 40,
                                                  "paths": [
                                                    {
                                                      "trafficType": "SUBWAY",
                                                      "sectionTime": 20,
                                                      "subwayName": "2호선",
                                                      "subwayCode": 1002,
                                                      "busNumber": null,
                                                      "busId": null,
                                                      "startName": "선릉역",
                                                      "endName": "역삼역"
                                                    },
                                                    {
                                                      "trafficType": "BUS",
                                                      "sectionTime": 20,
                                                      "subwayName": null,
                                                      "subwayCode": null,
                                                      "busNumber": "143",
                                                      "busId": 300143,
                                                      "startName": "역삼",
                                                      "endName": "강남"
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원이 존재하지 않을 경우(MEMBER_NOT_FOUND)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """)
                            }
                    )
            )
    })
    @GetMapping("/search")
    SuccessResponse<List<RouteSearchResponse>> routeSearch(
            Long memberId,
            @Parameter(
                    description = "출발지의 X 좌표(경도)",
                    example = "127.0276009",
                    required = true
            ) Double startX,
            @Parameter(
                    description = "출발지의 Y 좌표(위도)",
                    example = "37.4979421",
                    required = true
            ) Double startY,
            @Parameter(
                    description = "도착지의 X 좌표(경도)",
                    example = "126.9783740",
                    required = true
            ) Double endX,
            @Parameter(
                    description = "도착지의 Y 좌표(위도)",
                    example = "37.5666103",
                    required = true
            ) Double endY
    );

    class RouteSearchResponseListExample {
        public List<RouteSearchResponse> data;
    }

    class ErrorResponseExample {
        public String errorCode;
        public String message;
    }
}