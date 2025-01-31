package com.dubu.backend.config.annotation;

import com.dubu.backend.config.TestP6SpySqlFormatConfig;
import com.dubu.backend.config.TestQueryDslConfig;
import com.github.gavlyukovskiy.boot.jdbc.decorator.DataSourceDecoratorAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@AutoConfigureTestDatabase(replace = Replace.NONE) // 테스트 DB가 아닌 개발 DB 사용
@Import({TestQueryDslConfig.class, TestP6SpySqlFormatConfig.class})
@DataJpaTest(showSql = false) // spring.jpa.show-sql=false 와 동일
@ImportAutoConfiguration(DataSourceDecoratorAutoConfiguration.class) // p6spy 설정
public @interface CustomDataJpaTest {
}
