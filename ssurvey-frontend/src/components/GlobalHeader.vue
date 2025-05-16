<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="titleBar">
            <img class="logo" src="../assets/logo.png">
            <div class="title">S-SURVEY</div>
          </div>
        </a-menu-item>
        
        <!-- 渲染所有顶级菜单 -->
        <template v-for="item in visibleRouters">
          <!-- 普通菜单项 -->
          <a-menu-item v-if="!item.meta?.isSubmenu" :key="item.path">
            {{ item.name }}
          </a-menu-item>
          
          <!-- 嵌套菜单项 -->
          <a-sub-menu v-else :key="item.path">
            <template #title>{{ item.name }}</template>
            <a-menu-item 
              v-for="subItem in getSubMenuItems(item)"
              :key="subItem.path"
            >
              {{ subItem.name }}
            </a-menu-item>
          </a-sub-menu>
        </template>
       
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "无名" }}
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>

  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/router";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import { RouteRecordRaw } from "vue-router";

const router = useRouter();

const loginUserStore = useLoginUserStore();

//当前选中的菜单项
const selectedKeys = ref(["/"]);
//路由跳转时自动更新选中的菜单项
router.afterEach((to) => {
  const currentPath = to.path;
  // 更新选中的菜单项，考虑子菜单的情况
  if (currentPath.startsWith('/admin/')) {
    // 如果是子菜单，则选中子菜单项而不是父菜单
    selectedKeys.value = [currentPath];
  } else {
    selectedKeys.value = [currentPath];
  }
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 获取可见的顶级路由
const visibleRouters = computed(() => {
  return routes.filter((item) => {
    // 排除具有parentMenu元数据的子菜单路由
    if (item.meta?.parentMenu) {
      return false;
    }
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 获取特定菜单下的子菜单项
const getSubMenuItems = (route: RouteRecordRaw) => {
  // 优先使用subMenuItems字段
  if (route.meta?.subMenuItems) {
    return (route.meta.subMenuItems as RouteRecordRaw[]).filter((subItem) => {
      if (subItem.meta?.hideInMenu) {
        return false;
      }
      if (!checkAccess(loginUserStore.loginUser, subItem.meta?.access as string)) {
        return false;
      }
      return true;
    });
  }
  
  // 后向兼容，使用children字段
  if (route.children) {
    return route.children.filter((child) => {
      if (child.meta?.hideInMenu) {
        return false;
      }
      if (!checkAccess(loginUserStore.loginUser, child.meta?.access as string)) {
        return false;
      }
      return true;
    });
  }
  
  return [];
};

</script>

<style scoped>
#globalHeader {
}

.titleBar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  margin-left: 16px;
}

.logo {
  height: 32px;
}
</style>
