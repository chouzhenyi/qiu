<script setup lang="ts">
import { ref, unref, computed } from "vue";
import { Table, TableProps } from "ant-design-vue";

type dataIndexType = "name" | "age" | "address";
type columnProps = {
  title: string;
  dataIndex: dataIndexType;
  key: dataIndexType;
  width: number | undefined;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 235,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 365,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 400,
  },
].map((item) => {
  return {
    ...item,
    // width: item.dataIndex !== "address" ? 300 : undefined,
    // width: 300,
  };
}) as columnProps[];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const selectedRowKeys = ref([]);

const rowSelection = computed(() => {
  return {
    onChange: (list: any[]) => {
      console.log("change", list);
    },
    hideDefaultSelections: true,
    fixed: "left",
  };
});
const getTableProps = computed(() => {
  return {
    rowSelection,
    columns,
    dataSource: data,
    bordered: true,
  } as TableProps;
});
</script>

<template>
  <div>
    <Table v-bind="{ ...getTableProps }"></Table>
    <table class="table" border="1">
      <thead>
        <tr>
          <th v-for="item in columns" :key="item.key" :width="item.width">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.key">
          <td v-for="column in columns" :width="column.width" :key="column.key">
            {{ item[column.dataIndex] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  table-layout: fixed;
  width: 100%;
  text-align: center;
}
</style>
