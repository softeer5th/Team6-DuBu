package com.dubu.backend.plan.domain;

import com.dubu.backend.global.domain.BaseTimeEntity;
import com.dubu.backend.plan.domain.enums.TrafficType;
import com.dubu.backend.plan.dto.request.PlanSaveRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"plan_id", "pathOrder"})
})
public class Path extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "path_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TrafficType trafficType;

    @Column(nullable = false, length = 20)
    private String startName;

    @Column(nullable = false, length = 20)
    private String endName;

    @Column(nullable = false, columnDefinition = "SMALLINT")
    private Integer sectionTime;

    @Column(nullable = false, columnDefinition = "SMALLINT")
    private Integer pathOrder;

    public static Path createPath(Plan plan, PlanSaveRequest.Path pathRequest) {
        return Path.builder()
                .plan(plan)
                .trafficType(TrafficType.from(pathRequest.trafficType()))
                .startName(pathRequest.startName())
                .endName(pathRequest.endName())
                .sectionTime(pathRequest.sectionTime())
                .build();
    }
}