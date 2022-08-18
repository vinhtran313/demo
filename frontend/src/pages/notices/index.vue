<template>
  <div class="">
    <router-link
      v-for="(notice, index) in notices"
      :to="{ name: 'notices.show', params: { id: notice.id, notice: notice } }"
      :key="index"
      class="notice-item"
      :class="{ 'fw-7': !notice?.NoticeUser.read }"
    >
      <div class="notice-item__title text-truncate mr-10-px fs-18">
        {{ notice.title }}
      </div>
      <div class="notice-item__time ml-auto mr-15-px fs-14 keep-all">
        {{ notice.createdAt | formatDateMonth }}
      </div>
      <a-icon type="right" class="arrow-icon fs-24" />
    </router-link>
    <scroll-loader :loader-method="fetchNotices" :loader-disable="disable">
      <div />
    </scroll-loader>
  </div>
</template>

<script>
import { getNotices } from "@/apis/notices";
export default {
  name: "Notices",
  components: {},
  data() {
    return {
      page: 1,
      pagination: null,
      notices: [],
      disable: false,
      pageSize: 20,
    };
  },
  methods: {
    async fetchNotices() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          page: this.page++,
        };
        const res = await getNotices(params);
        this.notices = [...this.notices, ...res.data.notices];
        this.disable = res.data.paginate.page === res.data.paginate.totalPage;
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
.notice-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid $argent-color;

  .arrow-icon {
    color: $picton-blue-color;
  }
}
</style>
