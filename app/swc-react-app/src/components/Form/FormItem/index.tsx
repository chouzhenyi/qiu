import { Form } from "antd";

type FormItemProps = {
  label?: string;
  children?: any;
};

const FormItem = (props: FormItemProps) => {
  const { label = "", children } = props;
  return <Form.Item label={label}>{children}</Form.Item>;
};

export default FormItem;
