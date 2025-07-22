import React, { useRef, useEffect } from "react";
import Table from "./components/table";
import { Button, notification, Modal } from "antd";

const getTableCount = () => {
  return Math.floor(Math.random() * 20);
};

const DataFlow = () => {
  const tableRef = useRef(null);
  useEffect(() => {
    tableRef.current.setData({ count: getTableCount() });
  }, []);
  return (
    <div>
      <h1>数据流</h1>
      <Button
        onClick={() => {
          const tableData = tableRef.current.getData();
          console.log("数据流 tableData", tableData);
          notification.success({
            message: `当前表格数据行数为${tableData.length}`,
          });
        }}
      >
        获取表格数据
      </Button>
      <Button
        onClick={() => {
          Modal.confirm({
            title: "确认",
            content: "确认设置表格数据行数吗？",
            onOk: () => {
              tableRef.current.setData({ count: getTableCount() });
            },
          });
        }}
      >
        设置表格数据行数
      </Button>
      <Table ref={tableRef} />
    </div>
  );
};

export default DataFlow;
