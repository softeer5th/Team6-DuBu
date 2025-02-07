package com.dubu.backend.todo.support;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class RandomPerformanceTest {

    @Test
    @DisplayName("Math.random 테스트")
    void testMathRandom(){
        long startTime = System.currentTimeMillis();

        for(int i = 0; i < 100000000; i++){
            Math.floor(Math.random() * 6);
        }

        long endTime = System.currentTimeMillis();

        System.out.println("시간(ms): " + (endTime - startTime));
    }

    @Test
    @DisplayName("Random 클래스 테스트")
    void testRandom(){
        long startTime = System.currentTimeMillis();

        for(int i = 0; i < 100000000; i++){
            Random random = new Random();
            random.nextInt(6);
        }

        long endTime = System.currentTimeMillis();

        System.out.println("시간(ms): " + (endTime - startTime));
    }

    @Test
    @DisplayName("ThreadLocalRandom 클래스 테스트")
    void testThreadLocalRandom(){
        long startTime = System.currentTimeMillis();

        for(int i = 0; i < 100000000; i++){
            ThreadLocalRandom.current().nextInt(6);
        }

        long endTime = System.currentTimeMillis();

        System.out.println("시간(ms): " + (endTime - startTime));
    }
}
