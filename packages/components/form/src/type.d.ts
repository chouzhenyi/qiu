/**
 * @description BasicForm表单支持的输入组件类型
 */
type componentType = "Input" | "Select";

type componentPropType = { placeholder: string };

/**
 * @description 表单item组件属性类型约束
 */
type FormSchema = {
  component: componentType;
  componentProps: componentPropType;
};

/**
 * @description 表单操作button设置类型
 */
type ActionBtnGroupType = {};
