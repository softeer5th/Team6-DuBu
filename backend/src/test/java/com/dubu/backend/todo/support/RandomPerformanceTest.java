package com.dubu.backend.todo.support;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

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

        Random random = new Random();
        for(int i = 0; i < 100000000; i++){
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

    @Test
    @DisplayName("리스트에서 랜덤 여러 개 선택 - Collection shuffle 이용")
    void testSelectUsingCollectionShuffle(){
        List<Integer> intList = new ArrayList<>(IntStream.range(0, 10) //IntStream.range(0, 1000000)
                .boxed()
                .toList());

        long startTime = System.currentTimeMillis();

        Collections.shuffle(intList);

        System.out.println(intList.subList(0, 4));
        long endTime = System.currentTimeMillis();

        System.out.println("시간(ms): " + (endTime - startTime));
    }

    @Test
    @DisplayName("리스트에서 랜덤 여러 개 선택 - ThreadLocalRandom 사용")
    void testSelectUsingThreadLocalRandom(){
        List<Integer> intList = new ArrayList<>(IntStream.range(0, 10)//IntStream.range(0, 1000000)
                .boxed()
                .toList());

        Set<Integer> result = new HashSet<>();

        long startTime = System.currentTimeMillis();

        ThreadLocalRandom random = ThreadLocalRandom.current();
        while(result.size() < 4){
            result.add(random.nextInt(intList.size()));
        }

        System.out.println(result);
        long endTime = System.currentTimeMillis();

        System.out.println("시간(ms): " + (endTime - startTime));
    }
}
