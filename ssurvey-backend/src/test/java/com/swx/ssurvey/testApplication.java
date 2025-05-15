package com.swx.ssurvey;

import com.swx.ssurvey.manager.AiManager;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.openxmlformats.schemas.drawingml.x2006.main.STTextTabAlignType.L;

/**
 * @program: ssurvey-backend
 * @ClassName: testApplication
 * @description:
 * @author:
 * @create: 2025/5/15 20:44
 */
@SpringBootTest
public class testApplication {

    @Resource
    private AiManager aiManager;

    @Test
    public void test() throws ExecutionException, InterruptedException {
        // 创建两个 CompletableFuture 任务
        CompletableFuture<String> avatarFuture = CompletableFuture.supplyAsync(() -> 
            aiManager.doImagesRequest("", "生成一个富有诗意的随机用户头像,要求风格为卡通类型")
        );
        
        CompletableFuture<String> usernameFuture = CompletableFuture.supplyAsync(() -> 
            aiManager.doSyncStableRequest("", "生成一个富有诗意的随机用户名，要求是中文")
        );

        // 等待所有任务完成并获取结果
        CompletableFuture.allOf(avatarFuture, usernameFuture).join();
        
        // 获取结果
        String avatarUrl = avatarFuture.get();
        String username = usernameFuture.get();
        
        System.out.println("生成的头像URL: " + avatarUrl);
        System.out.println("生成的用户名: " + username);
    }

}
