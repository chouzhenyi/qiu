import type { SchamaType } from "@/components/Form/FormType";

export const schemas: SchamaType[] = [
  {
    type: "Input",
    label: "输入框",
  },
  {
    type: "Select",
    label: "下拉选择",
  },
  {
    type: "Radio",
    label: "单选框",
  },
  {
    type: "Checkbox",
    label: "多选框",
  },
  {
    type: "TextArea",
    label: "文本域",
  },
  {
    type: "Upload",
    label: "上传文件",
  },
  {
    type: "DatePicker",
    label: "日期选择",
  },
];
