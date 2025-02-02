package com.dubu.backend.member.domain;

import com.dubu.backend.global.domain.BaseTimeEntity;
import com.dubu.backend.member.domain.enums.AddressType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Address extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'OTHER'")
    private AddressType addressType;

    private String name;

    @Column(nullable = false)
    private String roadAddress;

    @Column(nullable = false)
    private Double xCoordinate;

    @Column(nullable = false)
    private Double yCoordinate;

    public static Address createAddress(Member member, AddressType addressType, String roadAddress, Double xCoordinate, Double yCoordinate) {
        return Address.builder()
                .member(member)
                .addressType(addressType)
                .roadAddress(roadAddress)
                .xCoordinate(xCoordinate)
                .yCoordinate(yCoordinate)
                .build();
    }
}