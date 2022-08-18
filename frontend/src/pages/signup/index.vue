<template>
  <div>
    <div class="banner">
      <IconImage :src="heartBlueIcon" class="fs-24" :width="60" :height="60" />
      <div class="fw-7 fs-18">ユーザ情報登録</div>
    </div>
    <div class="mt-30-px p-15-px">
      <a-form-model layout="vertical" class="w-100 user-info-form">
        <a-form-model-item label="お名前(姓)">
          <Input placeholder="Last Name" v-model="user.familyNameKanji" />
        </a-form-model-item>
        <a-form-model-item label="お名前(名)">
          <Input placeholder="First Name" v-model="user.givenNameKanji" />
        </a-form-model-item>
        <a-form-model-item label="生まれ年">
          <SelectBox v-model="user.birthYear" :options="BIRTHYEAR_OPTIONS" />
        </a-form-model-item>
        <a-form-model-item label="性別">
          <div class="d-flex justify-content-start ml-30-px">
            <RadioGroup :options="SEXS" v-model="user.sex" />
          </div>
        </a-form-model-item>
        <a-form-model-item label="区分">
          <SelectBox
            v-model="user.area"
            :options="AREAS"
            keyName="id"
            labelName="name"
          />
        </a-form-model-item>
        <a-form-model-item>
          <div class="d-flex justify-content-center mt-30-px">
            <Button type="primary" class="" @click="submitForm">OK</Button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import RadioGroup from "@/components/RadioGroup.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import SelectBox from "@/components/SelectBox.vue";
import { BIRTHYEAR_OPTIONS, AREAS, SEXS } from "@/constants";
import { createUser } from "@/apis/users";
import HeartBlueIcon from "@/assets/icons/logo/logo_blue_256.svg";
export default {
  name: "Mypage",
  components: {
    Button,
    RadioGroup,
    Input,
    SelectBox,
  },
  created() {
    this.BIRTHYEAR_OPTIONS = BIRTHYEAR_OPTIONS;
    this.AREAS = AREAS;
    this.SEXS = SEXS;
    this.heartBlueIcon = HeartBlueIcon;
  },
  data() {
    return {
      user: {
        givenNameKanji: "",
        familyNameKanji: "",
        birthYear: 1945,
        area: 1,
        sex: 1,
        deviceType: this.$route.query.deviceType,
        deviceId: this.$route.query.deviceId,
        pushtoken: this.$route.query.pushtoken,
        endpoint: this.$route.query.endpoint,
        attribute: this.$route.query.attribute,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        this.$eventBus.emit("showLoading");
        const { data } = await createUser(this.user);
        this.$store.commit("storeSessionKeyAndUserID", data);
        const json = data;
        const jsonstr = JSON.stringify(json);
        // 処理は省略

        // ブラウザー判定
        const ua = window.navigator.userAgent.toLowerCase();
        const isIOS =
          ua.includes("iphone") || ua.includes("ipod") || ua.includes("ipad");
        // if (window.webkit) {
        if (isIOS) {
          // iOS
          window.webkit.messageHandlers.viewUserinfo.postMessage(jsonstr);
        } else {
          // Android
          window.android_app.viewUserinfo(jsonstr);
        }
        // } else {
        //   alert("WebViewで実行してください");
        // }
        // this.$success({
        //   title: "Create user success",
        // });
        // this.$router.push({ name: "home" });
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
@import "@/assets/styles/common/variable.scss";
/deep/ .user-info-form {
  .ant-form-item {
    margin-bottom: 12px;
  }
  .ant-form-item-label label {
    font-size: 1.2rem;
    margin-left: 10px;
  }
  .ct-radio-group {
    gap: 40px;
    label {
      font-size: 22px;
    }
  }
}

.banner {
  height: 120px;
  background: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: $white-color;
  position: relative;
  .anticon {
    font-size: 6rem;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    height: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    background: $primary-color;
    box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 5px;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 65px;
    height: 65px;
    background: $primary-color;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg) skew(-20deg, -20deg);
    box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 5px;
  }
}
</style>
