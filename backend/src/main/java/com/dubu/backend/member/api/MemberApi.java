package com.dubu.backend.member.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.dto.request.MemberInfoUpdateRequest;
import com.dubu.backend.member.dto.request.MemberOnboardingRequest;
import com.dubu.backend.member.dto.request.MemberStatusUpdateRequest;
import com.dubu.backend.member.dto.response.MemberInfoResponse;
import com.dubu.backend.member.dto.response.MemberSavedAddressResponse;
import com.dubu.backend.member.dto.response.MemberStatusResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface MemberApi {

    @Operation(
            summary = "회원 정보 조회",
            description = "마이페이지에서 회원의 기본 정보(이메일, 닉네임, 카테고리, 주소 제목)를 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "회원 정보 조회 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = MemberInfoResponse.class),
                            examples = {
                                    @ExampleObject(
                                            name = "회원 정보 조회 성공 예시",
                                            value = """
                                                    {
                                                      "data": {
                                                        "email": "test@example.com",
                                                        "nickname": "홍길동",
                                                        "categories": ["READING", "ENGLISH"],
                                                        "homeTitle": "집",
                                                        "schoolTitle": "학교"
                                                      }
                                                    }
                                                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원이 존재하지 않는 경우 (MEMBER_NOT_FOUND)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            examples = {
                                    @ExampleObject(
                                            name = "회원 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_NOT_FOUND",
                                                      "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    SuccessResponse<MemberInfoResponse> getMemberInfo(
            Long memberId
    );

    @Operation(
            summary = "회원 상태 조회",
            description = "ONBOARDING, STOP, MOVE, FEEDBACK 4가지 상태에 따라 다른 페이지를 보여주기 위한 회원의 현재 상태(Status)를 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "회원 상태 조회 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = MemberStatusResponse.class,
                                    description = "회원 상태 정보 응답"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 상태 조회 성공 예시",
                                            value = """
                                                    {
                                                      "data": {
                                                        "status": "STOP"
                                                      }
                                                    }
                                                    """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원이 존재하지 않는 경우 (MEMBER_NOT_FOUND)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
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
    SuccessResponse<MemberStatusResponse> getMemberStatus(
            Long memberId
    );

    @Operation(
            summary = "회원의 저장된 주소 조회",
            description = "메인 페이지에서 회원이 저장한 주소 정보(HOME, SCHOOL)를 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "회원 주소 조회 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = MemberSavedAddressResponse.class,
                                    description = "회원 주소 정보 응답"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 주소 조회 성공 예시",
                                            value = """
                                                    {
                                                      "data": {
                                                        "homeTitle": "서울시 강남구 테헤란로 123",
                                                        "homeXCoordinate": 127.0276009,
                                                        "homeYCoordinate": 37.4979421,
                                                        "schoolTitle": "서울시 관악구 관악로 1",
                                                        "schoolXCoordinate": 126.9528804,
                                                        "schoolYCoordinate": 37.4784966
                                                      }
                                                    }
                                                    """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            다음 경우에 발생할 수 있습니다:
                            1. 회원을 찾을 수 없는 경우 (MEMBER_NOT_FOUND)
                            2. 저장된 주소가 없는 경우 (MEMBER_SAVED_ADDRESS_NOT_FOUND)
                            """,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
                                    description = "에러 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_NOT_FOUND",
                                                      "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """),
                                    @ExampleObject(name = "주소 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_SAVED_ADDRESS_NOT_FOUND",
                                                      "message": "회원이 저장한 주소를 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """)
                            }
                    )
            )
    })
    SuccessResponse<MemberSavedAddressResponse> getMemberSavedAddress(
            Long memberId
    );

    @Operation(
            summary = "회원 카테고리 조회",
            description = "할 일 수정 페이지에서 회원이 온보딩 과정에서 선택했던 목표를 보여주기 위해 회원이 추가한 카테고리 목록을 조회한다.\n"
                    + "6가지 카테고리 존재(READING, HOBBY, ENGLISH, LANGUAGE, NEWS, OTHERS)"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "회원 카테고리 조회 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = StringListResponseExample.class,
                                    description = "카테고리 문자열 배열 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 카테고리 조회 성공 예시",
                                            value = """
                                                    {
                                                      "data": [
                                                        "READING",
                                                        "ENGLISH"
                                                      ]
                                                    }
                                                    """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            다음 경우에 발생할 수 있습니다:
                            1. 회원을 찾을 수 없는 경우 (MEMBER_NOT_FOUND)
                            2. 회원의 카테고리 정보를 찾을 수 없는 경우 (MEMBER_CATEGORY_NOT_FOUND)
                            """,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
                                    description = "에러 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_NOT_FOUND",
                                                      "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """),
                                    @ExampleObject(name = "회원 카테고리 미존재 에러 예시",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_CATEGORY_NOT_FOUND",
                                                      "message": "회원의 카테고리 정보를 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """)
                            }
                    )
            )
    })
    SuccessResponse<List<String>> getMemberCategory(
            Long memberId
    );

    @Operation(
            summary = "회원 온보딩 완료",
            description = "카카오 로그인을 통해 회원을 생성한 이후 추가 정보(카테고리, 주소, 닉네임 등)를 저장하여 온보딩을 완료한다.\n"
                    + "6가지 카테고리 존재(READING, HOBBY, ENGLISH, LANGUAGE, NEWS, OTHERS)"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "온보딩 완료 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            다음 경우에 발생할 수 있습니다:
                            1. 회원을 찾을 수 없는 경우 (MEMBER_NOT_FOUND)
                            2. 카테고리를 찾을 수 없는 경우 (CATEGORY_NOT_FOUND)
                            """,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
                                    description = "에러 응답 예시"
                            ),
                            examples = {
                                    @ExampleObject(name = "회원 미존재 에러",
                                            value = """
                                                    {
                                                      "errorCode": "MEMBER_NOT_FOUND",
                                                      "message": "회원을 찾을 수 없습니다. memberId : 9999"
                                                    }
                                                    """),
                                    @ExampleObject(name = "카테고리 미존재 에러",
                                            value = """
                                                    {
                                                      "errorCode": "CATEGORY_NOT_FOUND",
                                                      "message": "카테고리를 찾을 수 없습니다. categoryName : ENGLISH"
                                                    }
                                                    """)
                            }
                    )
            )
    })
    void completeOnboarding(
            @Parameter(hidden = true)
            @RequestAttribute("memberId") Long memberId,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "회원 온보딩 요청 DTO",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = MemberOnboardingRequest.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(name = "온보딩 요청 예시",
                                            value = """
                                                    {
                                                      "categories": [
                                                        "READING",
                                                        "HOBBY",
                                                        "ENGLISH"
                                                      ],
                                                      "homeTitle": "집",
                                                      "homeAddress": "서울시 강남구 테헤란로 123",
                                                      "homeAddressX": 127.0276009,
                                                      "homeAddressY": 37.4979421,
                                                      "schoolTitle": "학교",
                                                      "schoolAddress": "서울시 관악구 관악로 1",
                                                      "schoolAddressX": 126.9528804,
                                                      "schoolAddressY": 37.4784966,
                                                      "nickname": "홍길동"
                                                    }
                                                    """)
                            }
                    )
            )
            @RequestBody MemberOnboardingRequest request
    );

    @Operation(
            summary = "회원 정보 수정",
            description = "마이페이지에서 회원의 카테고리, 주소 정보를 수정한다. 6가지 카테고리(READING, HOBBY, ENGLISH, LANGUAGE, NEWS, OTHERS) 중에서 원하는 카테고리를 선택할 수 있다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "회원 정보 수정 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = MemberInfoResponse.class),
                            examples = {
                                    @ExampleObject(
                                            name = "회원 정보 수정 성공 예시",
                                            value = """
                                                    {
                                                      "data": {
                                                        "email": "test@example.com",
                                                        "nickname": "홍길동",
                                                        "categories": [
                                                          "READING",
                                                          "OTHERS"
                                                        ],
                                                        "homeTitle": "반포 자이",
                                                        "schoolTitle": "홍익대학교"
                                                      }
                                                    }
                                                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            다음 경우에 발생할 수 있습니다:
                            1. 회원을 찾을 수 없는 경우 (MEMBER_NOT_FOUND)
                            2. 카테고리를 찾을 수 없는 경우 (CATEGORY_NOT_FOUND)
                            """,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
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
                                              "errorCode": "CATEGORY_NOT_FOUND",
                                              "message": "카테고리를 찾을 수 없습니다. categoryName : NEWS"
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<MemberInfoResponse> updateMemberInfo(
            Long memberId,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "회원 정보 수정 요청 DTO",
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = MemberInfoUpdateRequest.class),
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "categories": [
                                                "READING",
                                                "OTHERS"
                                              ],
                                              "homeTitle": "역삼 자이",
                                              "homeAddress": "서울시 강남구 역삼동 123",
                                              "homeAddressX": 127.0000,
                                              "homeAddressY": 37.0000,
                                              "schoolTitle": "서울대학교",
                                              "schoolAddress": "서울시 관악구 관악로 1",
                                              "schoolAddressX": 126.9528804,
                                              "schoolAddressY": 37.4784966
                                            }
                                            """)
                            }
                    )
            )
            @RequestBody MemberInfoUpdateRequest request
    );

    @Operation(
            summary = "회원 상태 변경",
            description = """
                    요청한 값으로 회원의 상태(Status)를 변경한다.
                    다음 경우에 사용할 수 있습니다:
                    1. 이동 중 페이지에서 피드백 페이지로 넘어가는 이동완료 버튼을 누를 때 회원의 상태를 MOVE에서 FEEDBACK으로 변경할 때 사용한다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "회원 상태 업데이트 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "회원이 존재하지 않는 경우 (MEMBER_NOT_FOUND)",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = ErrorResponseExample.class,
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
    void updateMemberStatus(
            @Parameter(hidden = true)
            @RequestAttribute("memberId") Long memberId,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "회원 상태 업데이트 요청 DTO",
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = MemberStatusUpdateRequest.class),
                            examples = {
                                    @ExampleObject(name = "회원 상태 업데이트 요청 예시",
                                            value = """
                                                    {
                                                      "status": "FEEDBACK"
                                                    }
                                                    """)
                            }
                    )
            )
            @RequestBody MemberStatusUpdateRequest request
    );

    @Schema(name = "ErrorResponseExample", description = "에러 응답 예시")
    class ErrorResponseExample {
        @Schema(example = "MEMBER_NOT_FOUND")
        public String errorCode;
        @Schema(example = "회원을 찾을 수 없습니다. memberId : 9999")
        public String message;
    }

    @Schema(name = "StringListResponseExample", description = "단순 문자열 리스트 예시")
    class StringListResponseExample {
        @Schema(example = "[\"READING\", \"ENGLISH\"]")
        public List<String> data;
    }
}