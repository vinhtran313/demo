<template>
  <section class="pagination-wrap mt-10-px">
    <div class="total-item">合計 {{ pagination.total }} 件</div>
    <div v-if="showPagination">
      <a-pagination
        :total="pagination.total"
        :page-size="pageSize"
        :default-current="1"
        :current="pagination.page"
        @change="change"
      />
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import { DEFAULT_ITEM_PER_PAGE } from "@/constants";
export default Vue.extend({
  props: {
    pagination: { type: Object, default: () => {} },
    change: { type: Function, default: () => {} },
  },
  computed: {
    pageSize() {
      return this.pagination.per || DEFAULT_ITEM_PER_PAGE;
    },
    showPagination() {
      return this.pagination.total > this.pageSize;
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .total-item {
    margin-right: 10px;
    font-size: 14px;
  }
}
</style>
