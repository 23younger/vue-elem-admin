import { NDataTable } from "naive-ui";

export const basicProps = {
  ...NDataTable.props,
  title: {
    type: String,
    default: "",
  },
  request: {
    type: Function,
    default: () => {},
  },
};
