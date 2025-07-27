import React from "react";
import { Input, Select, Radio, Checkbox, Upload, DatePicker } from "antd";

export type CompType =
  | "Input"
  | "Select"
  | "Radio"
  | "Checkbox"
  | "TextArea"
  | "Upload"
  | "DatePicker";

type InputPropsType = {
  type: CompType;
  componentProps?: any;
};

const CustomInputArea = (props: InputPropsType) => {
  const { type, componentProps } = props;
  switch (type) {
    case "Input":
      return <Input {...componentProps} />;
    case "Select":
      return <Select {...componentProps} />;
    case "Radio":
      return <Radio {...componentProps} />;
    case "Checkbox":
      return <Checkbox {...componentProps} />;
    case "TextArea":
      return <Input.TextArea {...componentProps} />;
    case "Upload":
      return <Upload {...componentProps} />;
    case "DatePicker":
      return <DatePicker {...componentProps} />;
    default:
      return null;
  }
};

export default CustomInputArea;
