import React, { forwardRef, useImperativeHandle } from "react";
import { Form as AntdForm } from "antd";
const Form = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getData: () => {
      console.log("getData");
    },
    setData: (data) => {
      console.log("setData", data);
    },
  }));
  return (
    <>
      <AntdForm />
    </>
  );
});
export default Form;
