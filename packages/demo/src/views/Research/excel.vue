<template>
  <div>
    <FileSelect :extList="extList" @onSelect="handleOnSelect" />
    <Table :columns="columns" :dataSource="tableData" />
  </div>
</template>
<script lang="ts">
export default {
  name: "ResearchExcel",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
import * as xlsx from "xlsx";
import FileSelect from "@qiu/components/FileSelect.vue";
import { Table } from "ant-design-vue";
import type { TableColumnType } from "ant-design-vue";

const extList = ref(["xlsx"]);
const tableData = ref<ExcelType[]>([]);

// 解析excel数据
type ExcelType = {
  ID?: string;
  name?: string;
  age?: number;
  work?: string;
  level?: string;
};
type ExcelKeyType = "ID" | "name" | "age" | "work" | "level";
const handleSheetData = (data: any): ExcelType[] => {
  const rows: ExcelType[] = [];
  const keys = {
    A: {
      key: "ID",
      desc: "工号",
    },
    B: {
      key: "name",
      desc: "姓名",
    },
    C: {
      key: "age",
      desc: "年龄",
    },
    D: {
      key: "work",
      desc: "工种",
    },
    E: {
      key: "level",
      desc: "职称",
    },
  };
  type keyType = "A" | "B" | "C" | "D" | "E";
  Object.keys(data)
    .filter((key) => /[A-Z0-9]+/.test(key))
    .forEach((key) => {
      // 获取 Excel表头列号
      const letterKey = /[A-Z]+/.exec(key)?.[0] as keyType;
      //   获取Excel表行号
      const numKey = +(/[0-9]+/.exec(key)?.[0] as string) - 2;
      if (numKey >= 0) {
        // 获取Excel当前cell值
        const value = data[key]?.v;
        // 转化为当前行，对应属性的key
        const itemKey = keys[letterKey].key as ExcelKeyType;
        // 创建当前行的控对象
        !rows[numKey] && (rows[numKey] = {});
        // 列表对应行、列值填充
        rows[numKey][itemKey] = value;
      }
    });
  return rows;
};
const handleOnSelect = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e?.target?.result;
    if (data) {
      const sheet = xlsx.read(data, { type: "binary" });
      const { Sheets } = sheet;
      const { Sheet1 } = Sheets;
      tableData.value = handleSheetData(Sheet1);
    }
  };
  reader.readAsBinaryString(file);
};
const columns: TableColumnType[] = [
  { dataIndex: "ID", title: "工号", width: 280 },
  { dataIndex: "name", title: "姓名", width: 280 },
  { dataIndex: "age", title: "年龄", width: 220 },
  { dataIndex: "work", title: "工种", width: 280 },
  { dataIndex: "level", title: "职称", width: 350 },
];
</script>
<style lang="less"></style>
