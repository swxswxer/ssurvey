package com.swx.ssurvey.config;

import com.zhipu.oapi.ClientV4;
import lombok.Data;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.redis")
@Data
public class RedissonConfig {


    private String host = "10.15.25.11";

    private Integer port = 6379;

    private Integer database = 0;

    private String password;

    @Bean
    public RedissonClient redissonClient() {

         // 打印配置信息
       System.out.println("Redis host: " + host);
       System.out.println("Redis port: " + port);
        Config config = new Config();
        config.useSingleServer()
                .setAddress("redis://" + host + ":" + port)
                .setDatabase(database)
                .setPassword(password);
                
        return Redisson.create(config);
    }
}
