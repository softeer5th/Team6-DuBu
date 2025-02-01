package com.dubu.backend.auth.api;

import com.dubu.backend.auth.domain.OauthProvider;
import org.springframework.core.convert.converter.Converter;

public class OauthProviderConverter implements Converter<String, OauthProvider> {

    @Override
    public OauthProvider convert(String source) {
        return OauthProvider.fromName(source);
    }
}