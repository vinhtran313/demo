<template>
  <div>
    <Title :message="message" />
    <div>
      <AreaStep
        v-if="currentStep === CREATE_NOTICE_STEPS.SHOW_AREA"
        @onChooseArea="handleChooseArea"
      />
      <NoticeForm
        v-else-if="currentStep === CREATE_NOTICE_STEPS.FILL_FORM"
        :onSubmit="createNotice"
      />
      <UserStep
        v-else-if="currentStep === CREATE_NOTICE_STEPS.SHOW_USERS"
        :onChangeMessage="changeMessage"
        :onHandleConfirmUser="handleConfirmUser"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Title from "@/components/admin/Title.vue";
import { CREATE_NOTICE_STEPS, AREA_ID_CHOOSE_USER } from "@/constants";
import UserStep from "./components/UserStep.vue";
import AreaStep from "./components/AreaStep.vue";
import NoticeForm from "./components/NoticeForm.vue";
import { createNotice } from "@/apis/admin/notices";

export default Vue.extend({
  components: {
    Title,
    UserStep,
    NoticeForm,
    AreaStep,
  },
  created() {
    this.CREATE_NOTICE_STEPS = CREATE_NOTICE_STEPS;
    this.$eventBus.on("onHandleConfirmUser", this.handleConfirmUser);
  },
  destroyed() {
    this.$eventBus.off("onHandleConfirmUser", this.handleConfirmUser);
  },
  data() {
    return {
      message: "お知らせ登録",
      d: false,
      notice: {
        title: null,
        description: null,
        area: null,
        userIds: [],
      },
      currentStep: CREATE_NOTICE_STEPS.SHOW_AREA,
    };
  },
  methods: {
    handleChooseArea(areaId) {
      if (areaId != AREA_ID_CHOOSE_USER) {
        this.currentStep = CREATE_NOTICE_STEPS.FILL_FORM;
      } else {
        this.currentStep = CREATE_NOTICE_STEPS.SHOW_USERS;
      }
      this.notice.area = areaId;
    },
    changeMessage(message) {
      this.message = message;
    },
    handleConfirmUser(users) {
      this.notice.userIds = users.map((user) => user.userID);
      this.currentStep = CREATE_NOTICE_STEPS.FILL_FORM;
    },
    async createNotice(title, description) {
      try {
        this.$eventBus.emit("showLoading");
        this.notice.title = title;
        this.notice.description = description;
        const data = {
          ...this.notice,
          area: +this.notice.area,
        };
        await createNotice(data);
        this.$success({
          title: "Create notice success",
        });
      } catch (error) {
        this.$handleError(error, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
  },
});
</script>
