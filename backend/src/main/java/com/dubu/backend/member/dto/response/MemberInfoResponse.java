package com.dubu.backend.member.dto.response;

import com.dubu.backend.member.domain.Address;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.AddressType;
import com.dubu.backend.todo.entity.Category;

import java.util.List;

public record MemberInfoResponse(
        String email,
        String nickName,
        List<String> categories,
        String homeAddress,
        String schoolAddress
) {
    public static MemberInfoResponse of(Member member, List<Category> categories, List<Address> addresses) {
        String homeAddress = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.HOME)
                .map(Address::getRoadAddress)
                .findFirst()
                .orElse(null);

        String schoolAddress = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.SCHOOL)
                .map(Address::getRoadAddress)
                .findFirst()
                .orElse(null);

        return new MemberInfoResponse(
                member.getEmail(),
                member.getNickname(),
                categories.stream().map(Category::getName).toList(),
                homeAddress,
                schoolAddress
        );
    }
}