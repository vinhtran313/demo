<template>
  <div>
    <WhiteTable :columns="columns" :data="users" />
    <div class="d-flex justify-content-center mt-20-px">
      <Checkbox v-model="isAgreed">確認しました</Checkbox>
    </div>
    <div class="d-flex align-items-center justify-content-center mt-20-px">
      <Button type="blue" class="mr-15-px" :disabled="isAgreed" @click="onBack">
        戻る
      </Button>
      <Button
        type="blue"
        class="ml-15-px"
        :disabled="!isAgreed"
        @click="confirmUser"
      >
        お知らせ入力
      </Button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import WhiteTable from "@/components/admin/WhiteTable.vue";
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";

const columns = [
  {
    title: "userId",
    key: "userID",
  },
  {
    title: "お名前(名)",
    customRender: (rowData) => {
      return rowData.givenNameKanji + rowData.familyNameKanji;
    },
  },
  {
    title: "年齢",
    key: "area",
    filter: "area",
  },
];

export default Vue.extend({
  components: { WhiteTable, Checkbox, Button },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    onBack: {
      type: Function,
      default: () => {},
    },
  },
  created() {},
  data() {
    return {
      columns,
      isAgreed: false,
    };
  },
  methods: {
    confirmUser() {
      this.$eventBus.emit("onHandleConfirmUser", this.users);
    },
  },
});
</script>

<style lang="scss" scoped>
.ct-button-blue {
  width: 140px;
}
</style>
