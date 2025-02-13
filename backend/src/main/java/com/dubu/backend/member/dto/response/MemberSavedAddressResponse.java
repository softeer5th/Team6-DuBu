package com.dubu.backend.member.dto.response;

import com.dubu.backend.member.domain.Address;
import com.dubu.backend.member.domain.enums.AddressType;

import java.util.List;

public record MemberSavedAddressResponse(
    String homeTitle,
    Double homeXCoordinate,
    Double homeYCoordinate,
    String schoolTitle,
    Double schoolXCoordinate,
    Double schoolYCoordinate
) {
    public static MemberSavedAddressResponse from(List<Address> addresses) {
        Address homeAddress = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.HOME)
                .findFirst()
                .orElse(null);

        Address schoolAddress = addresses.stream()
                .filter(address -> address.getAddressType() == AddressType.SCHOOL)
                .findFirst()
                .orElse(null);

        return new MemberSavedAddressResponse(
                homeAddress != null ? homeAddress.getTitle() : null,
                homeAddress != null ? homeAddress.getXCoordinate() : null,
                homeAddress != null ? homeAddress.getYCoordinate() : null,
                schoolAddress != null ? schoolAddress.getTitle() : null,
                schoolAddress != null ? schoolAddress.getXCoordinate() : null,
                schoolAddress != null ? schoolAddress.getYCoordinate() : null
        );
    }
}