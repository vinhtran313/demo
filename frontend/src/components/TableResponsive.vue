<template>
  <div class="cs-table-user">
    <table>
      <thead>
        <tr>
          <th class="text-center" v-if="onChangeRowSelection" scope="col">
            <Checkbox
              class="justify-content-center"
              :checked="getCheckboxAllStatus()"
              @change="handleCheckAllRow"
            />
          </th>
          <th v-for="(column, index) in columns" :key="index" scope="col">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, indexRow) in data"
          :key="`row${indexRow}`"
          @click="clickRow(rowData)"
        >
          <template v-if="onChangeRowSelection">
            <td>
              <Checkbox
                class="justify-content-center"
                :checked="getCheckboxStatus(rowData[`${dataKey}`])"
                @change="(checked) => handleCheckRow(checked, rowData)"
              />
            </td>
          </template>
          <td
            v-for="(column, indexCol) in columns"
            :key="`row${indexRow}-col${indexCol}`"
            :data-label="column.title"
          >
            <template v-if="column.key === 'operation'">
              <div class="operation">
                <slot name="operation" :record="rowData" />
              </div>
            </template>
            <template v-if="column.key === 'slot'">
              <slot name="slot" :record="rowData" :column="column" />
            </template>
            <template v-else>{{ getCellData(rowData, column) }}</template>
          </td>
        </tr>
      </tbody>
    </table>
    <a-empty v-if="data.length === 0" :image="simpleImage" />
  </div>
</template>
<script>
import Vue from "vue";
import { Empty } from "ant-design-vue";
import Checkbox from "@/components/Checkbox.vue";
export default Vue.extend({
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    selectedRows: { type: Array, default: () => [] },
    onClickRow: { type: Function, default: () => {} },
    onChangeRowSelection: { type: Function, default: null },
    dataKey: { type: String, default: "id" },
  },
  components: {
    Checkbox,
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  data() {
    return {
      selectedData: [...this.selectedRows],
    };
  },
  methods: {
    getCheckboxStatus(id) {
      return !!this.selectedData.find((data) => id === data[`${this.dataKey}`]);
    },
    getCheckboxAllStatus() {
      console.log("caculate");
      return this.data.length === this.selectedData.length;
    },
    clickRow(record) {
      this.onClickRow(record);
    },
    getCellData(rowData, { key, filter = null, customRender = null }) {
      try {
        let value = "";
        if (customRender) {
          value = customRender(rowData);
        } else if (key.includes(".")) {
          value = key.split(".").reduce((acc, cur) => {
            return acc ? acc[cur] : "";
          }, rowData);
        } else {
          value = rowData[key];
        }
        return filter ? Vue.filter(filter)(value) : value;
      } catch (error) {
        this.$handleError(error, this);
      }
    },
    handleCheckRow(checked, rowData) {
      if (checked) {
        this.selectedData = [...this.selectedData, rowData];
      } else {
        this.selectedData = this.selectedData.filter(
          (row) => row[`${this.dataKey}`] !== rowData[`${this.dataKey}`]
        );
      }
      this.onChangeRowSelection(this.selectedData);
    },
    handleCheckAllRow(checked) {
      if (checked) {
        this.selectedData = this.data;
      } else {
        this.selectedData = [];
      }
      this.onChangeRowSelection(this.selectedData);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.cs-table-user {
  table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    min-width: 100%;
    table-layout: fixed;
    border: 1px solid $argent-color;
    border-spacing: 0;

    tr {
      background-color: white;
      padding: 0.35em;
      &:hover {
        td {
          background: #e6f7ff;
        }
      }
    }

    thead {
      tr {
        background: $weldon-blue;
      }
    }

    th,
    td {
      padding: 16px;
      text-align: left;
      border: 1px solid $argent-color;
    }

    td {
      word-wrap: break-word;
      cursor: pointer;
    }

    th {
      font-size: 1.1em;
      background-color: $weldon-blue;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 8px 16px;
    }
  }

  .operation {
    min-width: 120px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    table {
      border: 0;

      thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      tr {
        display: block;
        margin-bottom: 0.625em;
      }

      td {
        border-bottom: 1px solid #e8e8e8;
        display: block;
        font-size: 0.8em;
        text-align: right;
        min-height: 5.2rem;
      }

      td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
        padding-right: 5px;
      }
    }
  }
}
</style>
