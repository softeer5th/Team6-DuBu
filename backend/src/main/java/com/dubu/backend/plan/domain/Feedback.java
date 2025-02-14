package com.dubu.backend.plan.domain;

import com.dubu.backend.global.domain.BaseTimeEntity;
import com.dubu.backend.plan.domain.enums.Mood;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Feedback extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false, unique = true)
    private Plan plan;

    @Column(nullable = false)
    private Mood mood;

    @Column(length = 500)
    private String memo;

    public static Feedback createFeedback(Plan plan, String mood, String memo) {
        return Feedback.builder()
                .plan(plan)
                .mood(Mood.fromString(mood))
                .memo(memo)
                .build();
    }
}