<template>
  <section>
    <div class="form-admin-wrapper max-w-500-px">
      <div class="title-form-admin-sm fw-7 mt-10-px">管理者用</div>
      <div class="title-form-admin-lg fw-7 fs-24 mt-10-px">ログイン</div>
      <div class="mt-40-px">
        <Input placeholder="メールアドレス" class="h-40-px" v-model="email" />
      </div>
      <div class="mt-20-px">
        <Input placeholder="パスワード" class="h-40-px" v-model="password" />
      </div>
      <div class="mt-50-px mb-50-px">
        <router-link :to="{ name: 'user.home', params: { id: 1 } }">
          <Button type="blue" class="full-width h-40-px">ログイン</Button>
        </router-link>
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
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style></style>
