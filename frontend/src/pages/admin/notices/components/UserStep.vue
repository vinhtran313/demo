<template>
  <div>
    <UserSearch
      v-if="currentStep === CREATE_NOTICE_STEPS.SHOW_USERS"
      :onHandleSubmitUser="handleSubmitUser"
      :selectedUsersProp="users"
    />
    <UserConfirm
      v-else-if="currentStep === CREATE_NOTICE_STEPS.SHOW_SELECTED_USERS"
      :users="users"
      :onBack="handleBackSearch"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { CREATE_NOTICE_STEPS } from "@/constants";
import UserSearch from "./UserSearch.vue";
import UserConfirm from "./UserConfirm.vue";

export default Vue.extend({
  components: {
    UserSearch,
    UserConfirm,
  },
  props: {
    onChangeMessage: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    this.CREATE_NOTICE_STEPS = CREATE_NOTICE_STEPS;
    this.onChangeMessage("お知らせ対象者選択");
  },
  data() {
    return {
      currentStep: CREATE_NOTICE_STEPS.SHOW_USERS,
      users: [],
    };
  },
  methods: {
    handleSubmitUser(users) {
      this.users = users;
      this.currentStep = CREATE_NOTICE_STEPS.SHOW_SELECTED_USERS;
      this.onChangeMessage("お知らせ対象者確認");
    },
    handleBackSearch() {
      this.currentStep = CREATE_NOTICE_STEPS.SHOW_USERS;
      this.onChangeMessage("お知らせ対象者選択");
    },
  },
});
</script>
