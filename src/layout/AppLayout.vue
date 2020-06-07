<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider breakpoint="lg" collapsedWidth="0" v-model="collapsed">
      <div class="logo">
        <a-row>
          <a-col :sm="6">
            <a-avatar size="large" icon="user" />
          </a-col>
          <a-col :sm="6">
            <span>Admin</span>
          </a-col>
        </a-row>
      </div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1" @click="goTo('/')">
          <a-icon type="dashboard" />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2" @click="goTo('/about')">
          <a-icon type="desktop" />
          <span>About</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="database" /><span>Master data</span></span
          >
          <a-menu-item key="3" @click="goTo('destination')">
            <a-icon type="pushpin" />
            <span>Destinasi</span>
          </a-menu-item>
          <a-menu-item key="4" @click="goTo('tourpackage')">
            <a-icon type="hdd" />
            <span>Paket travel</span>
          </a-menu-item>
          <a-menu-item key="5" @click="goTo('tourpackageschedule')">
            <a-icon type="schedule" />
            <span>Jadwal paket</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Users</span></span>
          <a-menu-item key="6">
            <a-icon type="user" />
            <span>Member</span>
          </a-menu-item>
          <a-menu-item key="7">
            <a-icon type="user" />
            <span>Admin</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="appstore" /><span>App</span></span>
          <a-menu-item key="6">
            <a-icon type="inbox" />
            <span>Chat</span>
          </a-menu-item>
          <a-menu-item key="7">
            <a-icon type="mail" />
            <span>Broadcast</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="8">
          <a-icon type="book" />
          <span>Data order</span>
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>Laporan</span>
        </a-menu-item>
        <a-menu-item key="10">
          <a-icon type="logout" />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="header">
        <a-menu
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px', float: 'right' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <!-- Gatau kenapa yang lay-out-content haru pake minheight. ini semenetara dulu -->
      <a-layout-content style="margin: 16px; height: 100vh">
        <perfect-scrollbar>
          <router-view />
        </perfect-scrollbar>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Lucky Tri Bhakti ©2020 Made With
        <a-icon
          type="heart"
          theme="filled"
          :style="{ color: 'hotpink' }"
        ></a-icon>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    test: function() {
      alert("test");
    },
    goTo: function(route) {
      this.$router.push({ path: route });
    }
  }
};
</script>

<style lang="less">
.ps {
  background-color: #fff;
  padding: 24px;
  height: 100%;
}

#components-layout-demo-custom-trigger {
  height: 100vh;

  .trigger{
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover{
    color: #1890ff;
  }

  .logo{
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    position: relative;
  }
}

.ant-table-filter-dropdown{
  .ant-dropdown-menu{
    max-height: calc(20vh)
  }
}
</style>
