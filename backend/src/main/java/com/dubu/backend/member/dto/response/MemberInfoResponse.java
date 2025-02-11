package com.dubu.backend.member.dto.response;

import com.dubu.backend.member.domain.Address;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.AddressType;
import com.dubu.backend.todo.entity.Category;

import java.util.List;

public record MemberInfoResponse(
        String email,
        String nickname,
        List<String> categories,
        String homeTitle,
        String schoolTitle
) {
    public static MemberInfoResponse of(Member member, List<Category> categories, List<Address> addresses) {
        String homeTitle = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.HOME)
                .map(Address::getTitle)
                .findFirst()
                .orElse(null);

        String schoolTitle = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.SCHOOL)
                .map(Address::getTitle)
                .findFirst()
                .orElse(null);

        return new MemberInfoResponse(
                member.getEmail(),
                member.getNickname(),
                categories.stream().map(Category::getName).toList(),
                homeTitle,
                schoolTitle
        );
    }
}