import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomePage.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import NoAuthPage from "@/views/NoAuthPage.vue";
import UserLoginPage from "@/views/user/UserLoginPage.vue";
import UserRegisterPage from "@/views/user/UserRegisterPage.vue";
import AdminUserPage from "@/views/admin/AdminUserPage.vue";
import AdminAppPage from "@/views/admin/AdminAppPage.vue";
import AdminQuestionPage from "@/views/admin/AdminQuestionPage.vue";
import AdminScoringResultPage from "@/views/admin/AdminScoringResultPage.vue";
import AdminUserAnswerPage from "@/views/admin/AdminUserAnswerPage.vue";
import HomePage from "@/views/HomePage.vue";
import AppDetailPage from "@/views/app/AppDetailPage.vue";
import AddScoringResultPage from "@/views/add/AddScoringResultPage.vue";
import AddQuestionPage from "@/views/add/AddQuestionPage.vue";
import AddAppPage from "@/views/add/AddAppPage.vue";
import AnswerResultPage from "@/views/answer/AnswerResultPage.vue";
import DoAnswerPage from "@/views/answer/DoAnswerPage.vue";
import MyAnswerPage from "@/views/answer/MyAnswerPage.vue";
import AppStatisticPage from "@/views/statistic/AppStatisticPage.vue";

// 系统管理子菜单项路由定义
const adminSubMenuRoutes: Array<RouteRecordRaw> = [
  {
    path: "/admin/user",
    name: "用户管理",
    component: AdminUserPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      parentMenu: "/admin", // 标记父菜单路径
    },
  },
  {
    path: "/admin/app",
    name: "应用管理",
    component: AdminAppPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      parentMenu: "/admin", // 标记父菜单路径
    },
  },
  {
    path: "/admin/question",
    name: "题目管理",
    component: AdminQuestionPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      parentMenu: "/admin", // 标记父菜单路径
    },
  },
  {
    path: "/admin/scoring_result",
    name: "评分管理",
    component: AdminScoringResultPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      parentMenu: "/admin", // 标记父菜单路径
    },
  },
  {
    path: "/admin/user_answer",
    name: "回答管理",
    component: AdminUserAnswerPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      parentMenu: "/admin", // 标记父菜单路径
    },
  }
];

// 采用类型断言处理扩展的路由类型
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomePage
  },
  {
    path: "/add/app",
    name: "创建应用",
    component: AddAppPage,
  },
  {
    path: "/answer/my",
    name: "我的答题",
    component: MyAnswerPage,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  // 系统管理折叠菜单（仅作为菜单项，不实际路由）
  {
    path: "/admin",
    name: "系统管理",
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      isSubmenu: true,
      hideInMenu: false,
      subMenuItems: adminSubMenuRoutes, // 引用子菜单路由列表
    },
  },
  // 将管理系统子菜单作为独立路由添加到主路由数组
  ...adminSubMenuRoutes,
  {
    path: "/app_statistic",
    name: "应用统计",
    component: AppStatisticPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },

  //不在菜单中显示的路由
  {
    path: "/app/detail/:id",
    name: "应用详情",
    props: true,
    component: AppDetailPage,
    meta:{
      hideInMenu: true,
    }
  },

  {
    path: "/add/app/:id",
    name: "修改应用",
    props: true,
    component: AddAppPage,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question/:appId",
    name: "创建题目",
    component: AddQuestionPage,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/scoring_result/:appId",
    name: "创建评分",
    component: AddScoringResultPage,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/answer/do/:appId",
    name: "答题",
    component: DoAnswerPage,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/result/:id",
    name: "答题结果",
    component: AnswerResultPage,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },

  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthPage,
    meta:{
      hideInMenu: true,
    }
  },

  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginPage,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterPage,
      },
    ],
    meta:{
      hideInMenu: true,
    }
  },

];

