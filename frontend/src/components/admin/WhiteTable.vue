<template>
  <div class="cs-table-user">
    <table>
      <thead>
        <tr>
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
export default Vue.extend({
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    onClickRow: { type: Function, default: () => {} },
  },

  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  methods: {
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
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common/variable.scss";
.cs-table-user {
  overflow: auto !important;
  max-height: calc(100vh - 200px);
  border: 1.5px solid $argent-color;

  &::-webkit-scrollbar {
    display: block;
    width: 20px;
    height: 20px;
    background-color: white;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
  table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    min-width: 100%;
    table-layout: fixed;

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
      position: sticky;
      top: 0px;
      z-index: 2;
    }

    th,
    td {
      padding: 16px;
      text-align: left;
    }

    td {
      word-wrap: break-word;
      cursor: pointer;
    }

    th {
      font-size: 1.1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 5.2rem;
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
        border-bottom: 1px solid #272e33;
        display: block;
        margin-bottom: 0.625em;
      }

      td {
        border-bottom: 1px solid #e8e8e8;
        display: block;
        font-size: 0.8em;
        text-align: right;
      }

      td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
        padding-right: 5px;
      }

      td:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
