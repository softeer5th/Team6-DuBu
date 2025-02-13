package com.dubu.backend.plan.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.api.MemberApi;
import com.dubu.backend.plan.dto.request.PlanCreateRequest;
import com.dubu.backend.plan.dto.request.PlanFeedbackCreateRequest;
import com.dubu.backend.plan.dto.response.FeedbackWritePageInfoResponse;
import com.dubu.backend.plan.dto.response.PlanRecentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;

public interface PlanApi {

    @Operation(summary = "계획 생성", description = "선택한 경로를 기반으로 회원의 이동 중 계획을 생성한다. 상태가 STOP인 회원만 생성할 수 있다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "계획 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "회원 상태가 STOP이 아닐 경우(INVALID_MEMBER_STATUS)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "INVALID_MEMBER_STATUS",
                                              "message": "회원의 상태가 MOVE인 경우 해당 API를 이용할 수 없습니다."
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원 또는 스케줄이 존재하지 않을 경우(MEMBER_NOT_FOUND, SCHEDULE_NOT_FOUND)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "SCHEDULE_NOT_FOUND",
                                              "message": "스케줄을 찾을 수 없습니다."
                                            }
                                            """)
                            }
                    )
            )
    })
    void createPlan(
            @Parameter(hidden = true) @RequestAttribute("memberId") Long memberId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "계획 생성 요청 DTO",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = PlanCreateRequest.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "totalSectionTime": 40,
                                              "paths": [
                                                {
                                                  "trafficType": "SUBWAY",
                                                  "sectionTime": 20,
                                                  "subwayCode": 1002,
                                                  "busNumber": null,
                                                  "startName": "선릉",
                                                  "endName": "역삼"
                                                },
                                                {
                                                  "trafficType": "BUS",
                                                  "sectionTime": 20,
                                                  "subwayCode": null,
                                                  "busNumber": "143",
                                                  "startName": "역삼",
                                                  "endName": "강남"
                                                }
                                              ]
                                            }
                                            """)
                            }
                    )
            )
            @RequestBody PlanCreateRequest planCreateRequest
    );

    @Operation(summary = "계획 피드백 생성", description = "이동 완료 후 피드백 페이지에서 이동 중 계획에 대한 피드백을 작성한다. 상태가 FEEDBACK인 회원만 피드백을 작성할 수 있다.\n"
            + "3가지 상태 존재(DISSATISFIED, MODERATE, SATISFIED)")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "계획 피드백 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "회원 상태가 FEEDBACK이 아닐 경우(INVALID_MEMBER_STATUS) 또는 잘못된 기분 형식(INVALID_MOOD)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "INVALID_MEMBER_STATUS",
                                              "message": "회원의 상태가 STOP인 경우 해당 API를 이용할 수 없습니다."
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "INVALID_MOOD",
                                              "message": "유효하지 않은 기분 형식입니다. mood : HAPPY"
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "해당 계획에 대한 접근 권한이 없는 경우(UNAUTHORIZED_PLAN_DELETION)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "UNAUTHORIZED_PLAN_DELETION",
                                              "message": "회원이 해당 계획에 접근 권한이 없어 삭제할 수 없습니다. memberId : 9999, planId : 1234"
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원 또는 계획이 존재하지 않을 경우(MEMBER_NOT_FOUND, NOT_FOUND_PLAN)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "NOT_FOUND_PLAN",
                                              "message": "계획을 찾을 수 없습니다. planId : 1234"
                                            }
                                            """)
                            }
                    )
            )
    })
    void createPlanFeedback(
            Long memberId,
            Long planId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "계획 피드백 생성 요청 DTO",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = PlanFeedbackCreateRequest.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "mood": "SATISFIED",
                                              "memo": "오늘 일정에 만족합니다."
                                            }
                                            """)
                            }
                    )
            )
            PlanFeedbackCreateRequest planFeedbackCreateRequest
    );

    @Operation(summary = "최근 계획 조회", description = "이동 중 페이지에 접근할 때, 회원이 가장 최근에 생성한 계획에 관한 데이터를 전부 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "최근 계획 조회 성공",
                    content = @Content(
                            schema = @Schema(implementation = PlanRecentResponse.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": {
                                                "planId": 15,
                                                "totalSectionTime": 40,
                                                "createdAt": "2025-02-11T09:00:00",
                                                "paths": [
                                                  {
                                                    "pathId": 101,
                                                    "trafficType": "SUBWAY",
                                                    "sectionTime": 20,
                                                    "subwayCode": 1002,
                                                    "busNumber": null,
                                                    "startName": "선릉",
                                                    "endName": "역삼",
                                                    "todos": [
                                                      {
                                                        "todoId": 99,
                                                        "isDone": true,
                                                        "title": "출근 준비",
                                                        "category": "OTHERS",
                                                        "difficulty": "EASY",
                                                        "memo": null
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원 혹은 최근 계획이 존재하지 않을 경우(MEMBER_NOT_FOUND, NOT_FOUND_PLAN)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "NOT_FOUND_PLAN",
                                              "message": "계획을 찾을 수 없습니다."
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<PlanRecentResponse> getRecentPlan(
            Long memberId
    );

    @Operation(summary = "피드백 작성 페이지 정보 조회", description = "현재 FEEDBACK 상태에서 작성할 피드백 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "피드백 작성 페이지 정보 조회 성공",
                    content = @Content(
                            schema = @Schema(implementation = FeedbackWritePageInfoResponse.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": {
                                                "planId": 15,
                                                "totalSectionTime": 40,
                                                "totalTodoCount": 3,
                                                "todos": [
                                                  {
                                                    "category": "OTHERS",
                                                    "title": "조깅 자세 영상 시청"
                                                  },
                                                  {
                                                    "category": "ENGLISH",
                                                    "title": "영어 단어 암기"
                                                  }
                                                ]
                                              }
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "회원 상태가 FEEDBACK이 아닐 경우(INVALID_MEMBER_STATUS)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "INVALID_MEMBER_STATUS",
                                              "message": "회원의 상태가 STOP인 경우 해당 API를 이용할 수 없습니다."
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원 혹은 계획이 존재하지 않을 경우(MEMBER_NOT_FOUND, NOT_FOUND_PLAN)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "NOT_FOUND_PLAN",
                                              "message": "계획을 찾을 수 없습니다."
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<FeedbackWritePageInfoResponse> getFeedbackWritePageInfo(
            Long memberId
    );

    @Operation(
            summary = "이동 완료 업데이트",
            description = """
                    이동 중 페이지에서 피드백 페이지로 넘어가는 이동완료 버튼을 누를 때 회원의 상태를 MOVE에서 FEEDBACK으로 변경할 때 사용한다. 
                    또한 완료한 할 일들의 소모한 시간이 추가되고 TYPE 또한 DONE으로 변경된다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "이동 완료 업데이트 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원이 존재하지 않는 경우 (MEMBER_NOT_FOUND)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = MemberApi.ErrorResponseExample.class,
                                    description = "에러 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_NOT_FOUND",
                                                      "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """)
                            }
                    )
            )
    })
    void completePlanMove(
            Long memberId
    );

    @Operation(summary = "계획 삭제", description = "이동 중 페이지에서 이동을 취소할 때, 현재 이용중인 계획을 삭제한다.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "계획 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "해당 계획에 접근 권한이 없는 경우(UNAUTHORIZED_PLAN_DELETION)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "UNAUTHORIZED_PLAN_DELETION",
                                              "message": "회원이 해당 계획에 접근 권한이 없어 삭제할 수 없습니다. memberId : 9999, planId : 1234"
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원 혹은 계획이 존재하지 않을 경우(MEMBER_NOT_FOUND, NOT_FOUND_PLAN)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "MEMBER_NOT_FOUND",
                                              "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "NOT_FOUND_PLAN",
                                              "message": "계획을 찾을 수 없습니다. planId : 1234"
                                            }
                                            """)
                            }
                    )
            )
    })
    void deletePlan(
            Long memberId,
            Long planId
    );

    class ErrorResponseExample {
        public String errorCode;
        public String message;
    }
}