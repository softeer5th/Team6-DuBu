package com.dubu.backend.todo.entity;

import com.dubu.backend.global.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TodoType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty", nullable = false)
    private TodoDifficulty todoDifficulty;

    @Column(length = 500)
    private String memo ;

    @Column(name = "scheduled_date", columnDefinition = "DATE")
    private LocalDate scheduledDate;

    @Column(name = "spent_time", columnDefinition = "MEDIUMINT")
    private Integer spentTime;

    @Column(name = "is_done", columnDefinition = "TINYINT(1)")
    private Boolean isDone;

    @Column(name = "is_deleted", columnDefinition = "TINYINT(1)")
    private Boolean isDeleted;

    // Member 엔티티 구현되면 포함
    // @ManyToOne(fetch =  FetchType.LAZY)
    // @JoinColumn(name = "member_id")
    // private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Route 엔티티 구현되면 포함
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "route_id")
    // private Route route;
}
