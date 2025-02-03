package com.dubu.backend.member.application;

import com.dubu.backend.member.domain.Address;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.MemberCategory;
import com.dubu.backend.member.domain.enums.AddressType;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.dto.MemberOnboardingRequest;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.AddressRepository;
import com.dubu.backend.member.infra.repository.MemberCategoryRepository;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.exception.CategoryNotFoundException;
import com.dubu.backend.todo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final AddressRepository addressRepository;

    @Transactional
    public void completeOnboarding(Long memberId, MemberOnboardingRequest request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        List<MemberCategory> memberCategories = request.categories().stream()
                .map(categoryName -> {
                    Category category = categoryRepository.findByName(categoryName)
                            .orElseThrow(() -> new CategoryNotFoundException(categoryName));
                    return MemberCategory.builder()
                            .member(member)
                            .category(category)
                            .build();
                })
                .toList();

        memberCategoryRepository.saveAll(memberCategories);

        saveAddress(member, AddressType.HOME, request.homeAddress(), request.homeAddressX(), request.homeAddressY());
        saveAddress(member, AddressType.SCHOOL, request.schoolAddress(), request.schoolAddressX(), request.schoolAddressY());

        member.updateNickname(request.nickname());
        member.updateStatus(Status.STOP);
    }

    private void saveAddress(Member member, AddressType type, String roadAddress, Double x, Double y) {
        Address address = Address.createAddress(member, type, roadAddress, x, y);
        addressRepository.save(address);
    }
}