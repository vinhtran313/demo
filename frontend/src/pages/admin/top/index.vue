<template>
  <section class="d-flex flex-column align-items-center">
    <router-link
      v-for="(title, index) in titles"
      :key="index"
      :to="{ name: title.name }"
      class="full-width max-w-300-px mt-30-px"
    >
      <Button type="blue" class="h-50-px full-width max-w-300-px">
        {{ title.text }}
      </Button>
    </router-link>
  </section>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      titles: [
        { text: "被験者データ確認", name: "admin.examinees.index" },
        { text: "お知らせ登録", name: "admin.notices" },
        { text: "被験者ユーザ登録", name: "admin.examinees.new" },
        { text: "管理者パスワード変更", name: "admin.password.edit" },
      ],
    };
  },
};
</script>

<style></style>
