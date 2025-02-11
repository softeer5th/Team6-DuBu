package com.dubu.backend.auth.api;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.global.domain.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

import java.util.Map;

public interface AuthApi {

    @Operation(
            summary = "소셜 로그인 페이지 이동",
            description = """
                    oauthProvider 경로 변수를 통해 소셜 로그인 유형(KAKAO)을 선택하고, 
                    해당 소셜 로그인 인증 페이지로 리다이렉트한다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "302",
                    description = "소셜 로그인 인증 페이지로 리다이렉트 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "지원하지 않는 소셜 로그인 타입인 경우(UNSUPPORTED_SOCIAL_LOGIN)",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "UNSUPPORTED_SOCIAL_LOGIN",
                                              "message": "지원하지 않는 소셜 로그인 타입입니다."
                                            }
                                            """)
                            }
                    )
            )
    })
    void redirectAuthCodeRequestUrl(
            @Parameter(
                    description = "소셜 로그인 제공자(KAKAO 등)",
                    required = true
            )
            OauthProvider oauthProvider,
            HttpServletResponse response
    );

    @Operation(
            summary = "카카오 로그인 콜백 처리",
            description = """
                    카카오 로그인 후, 카카오에서 전달받은 인가 코드(code)를 요청 바디로 전송하면 
                    해당 코드를 사용하여 액세스 토큰을 발급받고 카카오 회원 정보를 조회한 뒤, 
                    서버 측에서 자체 토큰을 발급한다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "카카오 로그인 성공 후 자체 토큰 발급 성공",
                    content = @Content(
                            schema = @Schema(implementation = TokenResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": {
                                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                              }
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 code 요청 등으로 인한 로그인 실패 가능",
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "BAD_REQUEST",
                                              "message": "로그인 요청이 잘못되었습니다."
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<TokenResponse> kakaoCallback(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "카카오에서 인가 코드를 전달받을 때 사용되는 필드(code)",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = KakaoLoginRequestExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "code": "sample_kakao_authorization_code"
                                            }
                                            """)
                            }
                    )
            )
            Map<String, String> request
    );

    @Operation(
            summary = "토큰 재발급",
            description = """
                    만료된 액세스 토큰을 재발급한다. 
                    헤더에 Authorization: Bearer {기존 토큰} 을 담아 요청해야 하며, 
                    서버 내부적으로 Refresh Token 유효성 검사를 수행한다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "액세스 토큰 재발급 성공",
                    content = @Content(
                            schema = @Schema(implementation = TokenResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": {
                                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                              }
                                            }
                                            """)
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = """
                            잘못된 토큰/만료된 토큰/블랙리스트 토큰 등으로 인해 재발급이 불가능한 경우
                            (TOKEN_MISSING, TOKEN_INVALID, TOKEN_BLACKLISTED, REFRESH_TOKEN_EXPIRED)
                            """,
                    content = @Content(
                            schema = @Schema(implementation = ErrorResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "TOKEN_MISSING",
                                              "message": "토큰이 요청 헤더에 없습니다."
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "TOKEN_INVALID",
                                              "message": "유효하지 않은 토큰입니다. 다시 로그인해 주세요."
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "TOKEN_BLACKLISTED",
                                              "message": "해당 토큰은 사용이 금지되었습니다. 다시 로그인해 주세요."
                                            }
                                            """),
                                    @ExampleObject(value = """
                                            {
                                              "errorCode": "REFRESH_TOKEN_EXPIRED",
                                              "message": "세션이 만료되었습니다. 다시 로그인해 주세요."
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<TokenResponse> reissue(HttpServletRequest request);

    @Operation(
            summary = "테스트용 토큰 발급",
            description = "회원 1번(고정)에 대한 임시 액세스 토큰을 발급한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "테스트용 토큰 발급 성공",
                    content = @Content(
                            schema = @Schema(implementation = TokenResponseExample.class),
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            examples = {
                                    @ExampleObject(value = """
                                            {
                                              "data": {
                                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                              }
                                            }
                                            """)
                            }
                    )
            )
    })
    SuccessResponse<TokenResponse> testToken();

    class ErrorResponseExample {
        public String errorCode;
        public String message;
    }

    class TokenResponseExample {
        public TokenResponse data;
    }

    class KakaoLoginRequestExample {
        public String code;
    }
}