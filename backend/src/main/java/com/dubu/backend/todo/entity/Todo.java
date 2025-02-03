package com.dubu.backend.todo.entity;

import com.dubu.backend.global.domain.BaseTimeEntity;
import com.dubu.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
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
    private TodoDifficulty difficulty;

    @Column(length = 500)
    private String memo ;

    @Column(name = "spent_time", columnDefinition = "MEDIUMINT")
    private Integer spentTime;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Todo parentTodo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    // Route 엔티티 구현되면 포함
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "route_id")
    // private Route route;

    public static Todo of(String title, TodoType type, TodoDifficulty difficulty, String memo, Member member, Category category, Todo parentTodo, Schedule schedule){
        return Todo.builder()
                .title(title)
                .type(type)
                .difficulty(difficulty)
                .memo(memo)
                .member(member)
                .category(category)
                .parentTodo(parentTodo)
                .schedule(schedule)
                .build();
    }

    public void clearParentTodo(){
        this.parentTodo = null;
    }

    private void updateTitle(String title){
        this.title = title;
    }

    private void updateCategory(Category category){
        this.category = category;
    }

    private void updateDifficulty(TodoDifficulty difficulty){
        this.difficulty = difficulty;
    }

    private void updateMemo(String memo){
        this.memo = memo;
    }

    public void updateTodo(String title, Category category, TodoDifficulty difficulty, String memo){
        if(title != null) updateTitle(title);
        if(category != null) updateCategory(category);
        if(difficulty != null) updateDifficulty(difficulty);
        if(memo != null) updateMemo(memo);
    }
}
