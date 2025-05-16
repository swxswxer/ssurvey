package com.swx.ssurvey.manager;

import cn.hutool.core.lang.UUID;
import com.aliyun.oss.OSS;
import com.aliyun.oss.model.ObjectMetadata;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * @program: ssurvey-backend
 * @ClassName: OssManager
 * @description:
 * @author:
 * @create: 2025/5/15 17:59
 */
@Component
public class OssManager {

    @Resource
    private OSS ossClient;
    public String uploadImageInOss(String bucketName,String imageUrl) {

        String objectName = generateRandomObjectName(imageUrl); // OSS中的路径

        // 创建OSSClient实例

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(imageUrl);
            HttpResponse response = httpClient.execute(httpGet);
            // 检查HTTP响应状态
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode != 200) {
                throw new IOException("下载图片失败，状态码：" + statusCode);
            }
            // 获取输入流和元数据
            InputStream inputStream = response.getEntity().getContent();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/png");
            // 设置Content-Length
            Header contentLengthHeader = response.getFirstHeader("Content-Length");
            if (contentLengthHeader != null) {
                metadata.setContentLength(Long.parseLong(contentLengthHeader.getValue()));
            }
            // 上传到OSS
            ossClient.putObject(bucketName, objectName, inputStream, metadata);
            System.out.println("图片上传成功！");
            return "https://swxswx-oss.oss-cn-shenzhen.aliyuncs.com/"+objectName;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭OSSClient
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        return null;
    }

   public String putObject(String filepath, File file){
        //TODO 未实现
        return null;
   }

    private static String generateRandomObjectName(String imageUrl) {
        // 1. 从URL中提取文件名（去掉查询参数）
        String fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1).split("\\?")[0];

        // 2. 提取扩展名（如果无扩展名则默认使用.png）
        String extension = ".png";
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            extension = fileName.substring(lastDotIndex);
        }

        // 3. 生成随机名称并拼接路径
        return "images/" + UUID.randomUUID() + extension;
    }

}
