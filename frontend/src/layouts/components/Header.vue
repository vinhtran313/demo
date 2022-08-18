<template>
  <header class="header-wrapper fw-7">
    <div class="header-content">
      <div class="d-flex align-items-center fs-20">
        <span v-if="!visible" @click="showDrawer">
          <IconImage :src="menuIcon" />
        </span>
        <template v-else>
          <span @click="closeDrawer">
            <IconImage :src="closeIcon" />
          </span>
          <span class="ml-10-px">MENU</span>
        </template>
      </div>
      <div class="header-title">今日の活動</div>
      <router-link
        :to="{ name: 'notices.index' }"
        class="header-notification fs-20 mr-5-px"
      >
        <a-badge :count="count">
          <IconImage :src="noticeIcon" />
        </a-badge>
      </router-link>
    </div>
    <a-drawer
      placement="left"
      class="header-drawer"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="closeDrawer"
    >
      <nav>
        <router-link
          v-for="(headerLink, index) in headerLinks"
          :key="index"
          :to="headerLink.to"
          class="header-link"
        >
          <div class="text-center">
            {{ headerLink.text }}
          </div>
          <a-icon type="right" class="fs-18" />
        </router-link>
      </nav>
    </a-drawer>
  </header>
</template>

<script>
import NoticeIcon from "@/assets/icons/top/noticeB_256.svg";
import CloseIcon from "@/assets/icons/top/closeB_256.svg";
import MenuIcon from "@/assets/icons/top/menuB_256.svg";
import { getUnreadNotice } from "@/apis/notices";
export default {
  name: "DefaultLayoutHeader",
  created() {
    this.noticeIcon = NoticeIcon;
    this.closeIcon = CloseIcon;
    this.menuIcon = MenuIcon;
    this.fetchUnreadNotice();
  },
  data() {
    return {
      visible: false,
      count: 0,
      headerLinks: [
        {
          text: "アプリへの参加許諾",
          to: "/terms",
        },
        {
          text: "アプリへの参加解除",
          to: "/unsubcribe",
        },
        {
          text: "ユーザ情報変更",
          to: "/mypage",
        },
        {
          text: "体力づくりプログラム",
          to: "/physical-program",
        },
      ],
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    closeDrawer() {
      this.visible = false;
    },
    async fetchUnreadNotice() {
      try {
        this.$eventBus.emit("showLoading");
        const { data } = await getUnreadNotice();
        this.count = data.unreadCount;
      } catch (e) {
        this.$handleError(e, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/styles/common/variable.scss";
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 2;

  .header-content {
    background: $bg-title-primary-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 10px;
    color: $primary-color;
    .header-notification {
      color: $primary-color;
    }
  }

  /deep/ .ant-badge-count {
    top: 3px;
    right: 5px;
  }
}

.header-drawer {
  top: 50px;

  .header-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    color: $primary-color;
  }

  ::v-deep {
    .ant-drawer-body {
      padding-top: 10px;
    }

    .ant-drawer-wrapper-body {
      background: $bg-title-primary-color;
    }
  }
}
</style>
