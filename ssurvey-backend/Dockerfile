# 第一阶段：构建应用
FROM maven:3.8.6-openjdk-8-slim AS build

# 设置工作目录
WORKDIR /app

# 配置Maven使用阿里云镜像源
COPY settings.xml /usr/share/maven/conf/settings.xml

# 首先复制 pom.xml 文件，以利用 Docker 缓存层
COPY pom.xml .
# 复制 Maven 包装器文件
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd ./

# 下载依赖项（可以利用Docker缓存层，提高构建速度）
RUN mvn dependency:go-offline -B

# 复制源代码
COPY src/ src/

# 构建应用程序
RUN mvn package -DskipTests

# 第二阶段：创建最终镜像
FROM openjdk:8-jre-slim

# 安装字体支持（对于EasyExcel导出功能可能需要）
RUN apt-get update && apt-get install -y \
    fontconfig \
    libfreetype6 \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 设置时区为上海
ENV TZ=Asia/Shanghai

# 创建目录 - 如果需要挂载数据卷
RUN mkdir -p /app/logs

# 从构建阶段复制构建好的jar文件
COPY --from=build /app/target/*.jar app.jar

# 暴露应用程序端口
EXPOSE 8101

# 启动命令
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
