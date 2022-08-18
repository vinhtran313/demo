<template>
  <div
    class="min-height-100 p-15-px d-flex flex-column align-items-center justify-content-center"
  >
    <a-form-model layout="vertical" class="w-100 user-info-form">
      <a-form-model-item label="お名前(姓)">
        <Input placeholder="" v-model="user.familyNameKanji" />
      </a-form-model-item>
      <a-form-model-item label="お名前(名)">
        <Input placeholder="" v-model="user.givenNameKanji" />
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
          <Button type="primary" class="mr-20-px" @click="onCancel">
            キャンセル
          </Button>
          <Button type="primary" class="ml-20-px" @click="submitForm">
            変更
          </Button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import RadioGroup from "@/components/RadioGroup.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import SelectBox from "@/components/SelectBox.vue";
import { BIRTHYEAR_OPTIONS, AREAS, SEXS } from "@/constants";
import { getUser, updateUser } from "@/apis/users";
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
    this.fetchUser();
  },
  data() {
    return {
      id: this.$store.state.userID,
      user: {
        givenNameKanji: "",
        familyNameKanji: "",
        birthYear: 1992,
        area: 1,
        sex: 1,
      },
    };
  },
  methods: {
    async fetchUser() {
      try {
        this.$eventBus.emit("showLoading");
        const {
          data: { user },
        } = await getUser(this.id);
        delete user.userID;
        this.user = user;
      } catch (error) {
        this.$handleError(error, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    async submitForm() {
      try {
        this.$eventBus.emit("showLoading");
        const res = await updateUser(this.id, this.user);
        this.$eventBus.emit("showModalSuccess", "変更が成功しました。", () => {
          this.$router.push({ name: "home" });
        });
        console.log(res);
      } catch (error) {
        this.$handleError(error, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    onCancel() {
      this.$router.push({ name: "home" });
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
</style>
