package com.swx.ssurvey.config;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

/**
 * @program: ssurvey-backend
 * @ClassName: OssConfig
 * @description:
 * @author:
 * @create: 2025/5/15 18:00
 */
@Configuration
@ConfigurationProperties(prefix = "oss")
@Data
public class OssConfig {

    private String endpoint;

    private String accessKeyId;

    private String accessKeySecret;




    @Bean
    @Scope("prototype")
    public OSS getClient(){
        return new OSSClientBuilder().build(endpoint,accessKeyId,accessKeySecret);
    }

}
