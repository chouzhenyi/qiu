import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Table as AntdTable, Button } from "antd";

const randomStr = () => {
  return Math.random().toString(36);
};

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "地址",
    dataIndex: "address",
  },
];

const Table = forwardRef((props, ref) => {
  const [dataSource, setDataSource] = useState([]);
  const getTableData = () => {
    console.log("getTableData", dataSource);
  };
  useImperativeHandle(ref, () => ({
    getData: () => {
      return dataSource;
    },
    setData: (data) => {
      console.log("setData", data);
      const { count } = data;
      const tableData = new Array(count).fill("").map((item, index) => ({
        key: randomStr(),
        name: `姓名${randomStr()}`,
        age: Math.floor(Math.random() * 100),
        address: `地址${index}`,
      }));
      setDataSource(() => tableData);
      //   setDataSource(tableData);
      console.log("setDataSource", dataSource);
    },
  }));

  return (
    <>
      <Button
        onClick={() => {
          getTableData();
        }}
      >
        获取表格数据
      </Button>
      <AntdTable columns={columns} dataSource={dataSource} />
    </>
  );
});
export default Table;
