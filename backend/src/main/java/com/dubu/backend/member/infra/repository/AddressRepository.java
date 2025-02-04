package com.dubu.backend.member.infra.repository;

import com.dubu.backend.member.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByMemberId(Long memberId);
}
