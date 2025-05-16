# S-Survey 问卷调查系统

S-Survey 是一个功能强大的问卷调查系统，支持创建、管理和分析各种类型的问卷和调查。该系统提供了丰富的功能，包括问卷设计、数据收集、结果分析以及AI辅助生成问题等先进特性。

## 系统架构

系统由前端和后端两部分组成：

- **前端**：基于 Vue.js 的现代化 Web 应用，提供用户友好的界面
- **后端**：基于 Spring Boot 的 RESTful API 服务，提供数据处理和业务逻辑

## 功能特点

- **多样化问卷创建**：支持多种问卷题型，满足不同调查需求
- **应用管理**：创建和管理多个调查应用
- **用户答题管理**：收集和存储用户答题数据
- **AI辅助出题**：使用AI技术自动生成调查问题
- **数据分析**：对调查结果进行统计和分析
- **文件上传**：支持上传和管理问卷相关文件
- **用户管理**：支持用户注册、登录和权限控制
- **评分系统**：对问卷回答进行智能评分

# 前端项目 (ssurvey-frontend)

## 技术栈

- **核心框架**：Vue 3.2.x + TypeScript
- **状态管理**：Pinia
- **UI 组件库**：Arco Design Vue
- **路由管理**：Vue Router 4.x
- **HTTP 客户端**：Axios
- **数据可视化**：ECharts
- **Markdown 编辑器**：ByteMD
- **二维码生成**：QRCode

## 项目结构

```
src/
├── api/           - API 请求接口
├── assets/        - 静态资源文件
├── components/    - 通用组件
├── constant/      - 常量定义
├── layouts/       - 页面布局组件
├── router/        - 路由配置
├── store/         - Pinia 状态管理
├── views/         - 页面视图组件
│   ├── admin/     - 管理员相关页面
│   ├── app/       - 应用管理页面
│   ├── answer/    - 用户答题页面
│   ├── statistic/ - 数据统计分析页面
│   └── user/      - 用户相关页面
├── App.vue        - 应用入口组件
└── main.ts        - 应用入口文件
```

## 安装和运行

### 环境要求

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run serve
```

应用将在 `http://localhost:8080` 上运行

### 编译打包

```bash
npm run build
```

### 使用 Docker 部署

```bash
# 构建镜像
docker build -t ssurvey-frontend .

# 运行容器
docker run -p 80:80 ssurvey-frontend
```

### 使用 Docker Compose 运行前后端

```bash
docker-compose up -d
```

## 功能模块

- **首页**：系统介绍及入口
- **用户认证**：注册、登录、密码重置
- **应用管理**：创建和管理调查应用
- **问卷设计**：创建和编辑问卷模板
- **答题系统**：响应式的问卷填写界面
- **数据统计**：图表化展示调查结果
- **管理后台**：系统配置和用户管理

# 后端项目 (ssurvey-backend)

## 技术栈

- **框架**：Spring Boot 2.7.2
- **ORM**：MyBatis-Plus 3.5.2
- **数据库**：MySQL
- **缓存**：Redis, Caffeine
- **分库分表**：ShardingSphere 5.2.0
- **API文档**：Knife4j (Swagger) 4.4.0
- **AI集成**：智谱AI接口
- **对象存储**：腾讯云COS、阿里云OSS
- **工具库**：Hutool, EasyExcel等

## 系统要求

- JDK 1.8+
- Maven 3.6+
- MySQL 5.7+
- Redis 6.0+

## 安装部署

### 1. 克隆代码库

```bash
git clone https://github.com/yourusername/ssurvey-backend.git
cd ssurvey-backend
```

### 2. 配置数据库

在MySQL中创建名为`ssurvey`的数据库，并导入`sql`目录下的SQL脚本

### 3. 修改配置文件

根据实际环境修改`src/main/resources/application.yml`文件中的数据库连接、Redis连接等配置

### 4. 编译打包

```bash
mvn clean package
```

### 5. 运行应用

```bash
java -jar target/ssurvey-backend-0.0.1-SNAPSHOT.jar
```

或者使用Docker运行：

```bash
docker build -t ssurvey-backend .
docker run -p 8101:8101 ssurvey-backend
```

## 项目结构

```
src/main/java/com/swx/ssurvey/
├── annotation    - 自定义注解
├── aop           - 面向切面编程相关代码
├── common        - 通用类和工具
├── config        - 配置类
├── constant      - 常量定义
├── controller    - API控制器
├── exception     - 异常处理
├── generate      - 代码生成相关
├── manager       - 业务管理类
├── mapper        - 数据库映射接口
├── model         - 数据模型
├── scoring       - 评分相关逻辑
├── service       - 业务服务层
└── utils         - 工具类
```

## API文档

应用启动后，可以通过访问 `http://localhost:8101/api/doc.html` 查看API文档。

## 主要API

- `/api/question/*` - 问题管理相关API
- `/api/user/*` - 用户管理相关API
- `/api/app/*` - 应用管理相关API
- `/api/user-answer/*` - 用户答题管理相关API
- `/api/scoring-result/*` - 评分结果相关API
- `/api/file/*` - 文件上传管理相关API

## 环境配置

项目支持多环境配置：

- `application.yml` - 公共配置
- `application-dev.yml` - 开发环境配置
- `application-test.yml` - 测试环境配置
- `application-prod.yml` - 生产环境配置

# 系统集成

## 前后端联调

前端应用默认将API请求发送到 `http://localhost:8101/api`，可以通过修改 `.env` 文件中的 `VUE_APP_API_BASE_URL` 变量来更改API基础URL。

## 生产环境部署

推荐使用 Docker Compose 进行前后端一键部署：

```bash
# 克隆前后端代码库
git clone https://github.com/yourusername/ssurvey-frontend.git
git clone https://github.com/yourusername/ssurvey-backend.git

# 使用Docker Compose启动整个系统
docker-compose up -d
```

# 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

# 许可证

本项目采用 [MIT 许可证](LICENSE)

# 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 项目作者：swxswx
- 邮箱：[a913685201@163.com]
- GitHub：[github.com/swxswxer]

---

© 2023 S-Survey AI智能答题应用平台
