<template>
  <div>
    <Title class="d-flex justify-content-between">
      <span>被驗者一覧</span>
      <div class="d-flex justify-content-end align-items-center fw-4">
        <div class="fs-16 mr-5-px">月選択</div>
        <div class="fs-16 mr-5-px">
          <MonthYearPicker />
        </div>
        <Button type="blue" @click="submitUser">PDF出力</Button>
      </div>
    </Title>
    <div>
      <div>
        <a-row type="flex" justify="center" align="center" class="mt-10-px">
          <a-col flex="130px">userID</a-col>
          <a-col flex="auto"><Input v-model="form.userID" /></a-col>
        </a-row>
        <a-row type="flex" justify="center" align="center" class="mt-10-px">
          <a-col flex="130px">お名前(名)</a-col>
          <a-col flex="auto"><Input v-model="form.userName" /></a-col>
        </a-row>
        <a-row type="flex" justify="center" align="center" class="mt-10-px">
          <a-col flex="130px">異常ステータス</a-col>
          <a-col flex="auto">
            <div>
              <a-row
                type="flex"
                justify="center"
                align="center"
                class="mt-10-px"
              >
                <a-col flex="70px">Silmee</a-col>
                <a-col flex="auto">
                  <CheckboxGroup :options="silmees" v-model="form.silmees" />
                </a-col>
              </a-row>
              <a-row
                type="flex"
                justify="center"
                align="center"
                class="mt-10-px"
              >
                <a-col flex="70px">Walkx</a-col>
                <a-col flex="auto">
                  <CheckboxGroup :options="walkx" v-model="form.walkx" />
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <d-flex class="d-flex align-items-end">
          <Button class="mb-10-px ml-auto" type="blue" html-type="submit">
            検索
          </Button>
        </d-flex>
        <TableResponsive :data="users" :columns="columns" dataKey="userID">
          <template #slot="{ column, record }">
            <router-link
              :to="{
                name: 'admin.examinees.show',
                params: { id: record.userID },
              }"
              v-if="column.type === PREVIEW"
            >
              <a-icon type="eye" class="fs-24" />
            </router-link>
            <router-link
              :to="{
                name: 'admin.examinees.edit',
                params: { id: record.userID },
              }"
              v-if="column.type === EDIT"
            >
              <a-icon type="edit" class="fs-24" />
            </router-link>
          </template>
        </TableResponsive>
        <Pagination :pagination="pagination" :change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Title from "@/components/admin/Title.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import TableResponsive from "@/components/TableResponsive.vue";
import Pagination from "@/components/Pagination.vue";
import MonthYearPicker from "@/components/MonthYearPicker.vue";
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import { getUsers } from "@/apis/admin/users";
import { EDIT, PREVIEW } from "@/constants";
export default Vue.extend({
  components: {
    Title,
    Button,
    Input,
    TableResponsive,
    Pagination,
    MonthYearPicker,
    CheckboxGroup,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "advanced_search" });
  },
  created() {
    this.fetchDataList();
    this.PREVIEW = PREVIEW;
    this.EDIT = EDIT;
  },
  destroyed() {},
  data() {
    return {
      message: "お知らせ登録",
      paramSearch: {},
      selectedRowKeys: [],
      users: [],
      page: 1,
      form: {
        userID: "",
        userName: "",
        silmees: [],
        walkx: [],
      },
      pagination: {
        page: 1,
        total: 50,
      },
      silmees: [
        {
          key: 1,
          label: "装着が3日以上なし",
        },
        {
          key: 2,
          label: "Low Battery",
        },
      ],
      walkx: [
        {
          key: 1,
          label: "装着が3日以上なし",
        },
      ],
      columns: [
        {
          title: "詳細",
          key: "slot",
          type: PREVIEW,
        },
        {
          title: "変更",
          key: "slot",
          type: EDIT,
        },
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
          key: "useAge",
        },
        {
          title: "区分",
          key: "area",
          filter: "area",
          customRender: (rowData) => {
            return rowData.area;
          },
        },
        {
          title: "Silmee接著異常",
          key: "useAge",
        },
        {
          title: "バッテリー(%) ",
          key: "useAge",
        },
        {
          title: "WalkX若若異常",
          key: "useAge",
        },
      ],
      searchProperties: [
        {
          id: 1,
          key_search: "userID",
          label: "userID",
          placeholder: "",
        },
        {
          id: 2,
          key_search: "userName",
          label: "お名前(名)",
          placeholder: "",
        },
      ],
    };
  },
  methods: {
    async fetchDataList() {
      try {
        this.$eventBus.emit("showLoading");
        const params = {
          page: this.page,
          ...this.paramSearch,
        };
        const { data } = await getUsers(params);
        this.users = data.users;
        this.pagination = data.paginate;
      } catch (error) {
        this.$handleError(error, this);
      } finally {
        this.$eventBus.emit("hideLoading");
      }
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
        // call api to search
        if (!error && Object.entries(values).length) {
          this.page = 1;
          this.paramSearch = {};
          Object.entries(values).forEach(([key, value]) => {
            this.paramSearch = {
              ...this.paramSearch,
              [`${key}`]: value,
            };
          });
          this.fetchDataList();
        }
      });
    },
    changePage(page) {
      try {
        this.page = page;
        this.fetchDataList();
      } catch (error) {
        this.$handleError(error, this);
      }
    },
    submitUser() {},
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.box-confirm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid $argent-color;
  padding: 10px 15px;
}

/deep/ .ant-advanced-search-form {
  .ant-form-item-label {
    width: 80px;
    font-size: 16px;
  }

  .ant-form-item {
    display: flex;
    margin-bottom: 5px;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>
