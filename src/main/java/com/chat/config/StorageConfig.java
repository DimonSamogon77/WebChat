package com.chat.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfig {
    private MinioClient client;

    public StorageConfig(@Value("${storage.access.key}") String accessKey, @Value("${storage.secret.key}") String secretKey) {
        client = MinioClient.builder()
                .credentials(accessKey, secretKey)
                .endpoint("http://95.31.1.120:9000")
                .build();
    }

    public MinioClient getClient() {
        return client;
    }
}
