import type { ItemType } from "ant-design-vue";

export type routerMenuType = ItemType & {
  path: string;
  name: string;
};
