<template>
  <div>
    <div class="box-confirm">
      <div>送对象 但別</div>
      <Button type="blue" @click="submitUser">対象者確認</Button>
    </div>
    <a-form
      layout="horizontal"
      class="ant-advanced-search-form mt-10-px"
      :form="form"
      @submit="handleSearch"
    >
      <a-row type="flex">
        <a-col :span="12">
          <a-row :gutter="12" class="ml-10-px">
            <a-col v-for="field in searchProperties" :key="field.id" :span="24">
              <a-form-item
                labelAlign="left"
                :label="`${field.label}`"
                :colon="false"
              >
                <Input
                  v-decorator="[`${field.key_search}`]"
                  :placeholder="`${field.placeholder}`"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12" class="d-flex align-items-end justify-content-end">
          <Button class="mb-10-px mr-20-px" type="blue" html-type="submit">
            検索
          </Button>
        </a-col>
      </a-row>
    </a-form>
    <TableResponsive
      :data="users"
      :columns="columns"
      :onChangeRowSelection="changeRowSelection"
      :selectedRows="selectedUsers"
      dataKey="userID"
    />
    <Pagination :pagination="pagination" :change="changePage" />
  </div>
</template>

<script>
import Vue from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import TableResponsive from "@/components/TableResponsive.vue";
import Pagination from "@/components/Pagination.vue";
import { getUsers } from "@/apis/admin/users";

export default Vue.extend({
  components: {
    Button,
    Input,
    TableResponsive,
    Pagination,
  },
  props: {
    onHandleSubmitUser: {
      type: Function,
      default: () => {},
    },
    selectedUsersProp: {
      type: Array,
      default: () => [],
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "advanced_search" });
  },
  created() {
    this.fetchDataList();
  },
  data() {
    return {
      paramSearch: {},
      selectedRowKeys: [],
      selectedUsers: [...this.selectedUsersProp],
      users: [],
      page: 1,
      pagination: {
        page: 1,
        total: 50,
      },
      columns: [
        {
          title: "userId",
          key: "userID",
        },
        {
          title: "お名前(名)",
          customRender: (rowData) => {
            return rowData.givenNameKanji + (rowData.familyNameKanji || "");
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
          key_search: "keyword",
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
    submitUser() {
      this.onHandleSubmitUser(this.selectedUsers);
    },
    changeRowSelection(users) {
      this.selectedUsers = [...users];
    },
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
