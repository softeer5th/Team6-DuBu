package com.dubu.backend.auth.domain.authcode;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.exception.UnsupportedSocialLoginTypeException;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@Component
public class AuthCodeRequestUrlProviderComposite {

    private final Map<OauthProvider, AuthCodeRequestUrlProvider> mapping;

    public AuthCodeRequestUrlProviderComposite(Set<AuthCodeRequestUrlProvider> providers) {
        mapping = providers.stream()
                .collect(toMap(
                        AuthCodeRequestUrlProvider::supportServer,
                        identity()
                ));
    }

    public String provide(OauthProvider oauthProvider) {
        return getProvider(oauthProvider).provide();
    }

    private AuthCodeRequestUrlProvider getProvider(OauthProvider oauthProvider) {
        return Optional.ofNullable(mapping.get(oauthProvider))
                .orElseThrow(() -> new UnsupportedSocialLoginTypeException());
    }
}