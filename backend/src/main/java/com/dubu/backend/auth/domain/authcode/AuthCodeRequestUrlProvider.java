package com.dubu.backend.auth.domain.authcode;

import com.dubu.backend.auth.domain.OauthProvider;

public interface AuthCodeRequestUrlProvider {

    OauthProvider supportServer();

    String provide();
}