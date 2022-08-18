<template>
  <section>
    <div class="form-admin-wrapper max-w-500-px">
      <div class="title-form-admin-lg fw-7 fs-24 mt-10-px">
        被験者ユーザ登録
      </div>
      <div class="mt-40-px">
        <Input placeholder="ログインID" class="h-40-px" />
      </div>
      <div class="mt-20-px">
        <Input placeholder="パスワード" class="h-40-px" />
      </div>
      <div class="mt-20-px">
        <Input placeholder="(確認用)パスワード" class="h-40-px" />
      </div>
      <div class="mt-50-px mb-50-px">
        <Button type="blue" class="full-width h-40-px">登録</Button>
      </div>
    </div>
  </section>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
export default {
  components: {
    Input,
    Button,
  },
};
</script>

<style></style>
