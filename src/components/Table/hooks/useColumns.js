import { h, ref, unref, watch, computed } from "vue";
import { cloneDeep, isEqual } from "lodash-es";
import { isArray, isString } from "@/utils/is";
import { NTooltip } from "naive-ui";
import renderIcon from "../../../utils/icon";

export function useColumns(propsRef) {
  const columnsRef = ref(unref(propsRef).columns);
  let cacheColumns = unref(propsRef).columns;

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns;
    }
  );

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    return columns;
  });

  const handleActionColumn = (propsRef, columns) => {
    const { actionColumn } = unref(propsRef);
    if (!actionColumn) return;
    !columns.find((col) => col.key === "action") &&
      columns.push({
        ...actionColumn,
      });
  };

  const renderCanEditTooltip = (trigger, content) => {
    return h(NTooltip, null, {
      trigger: () => trigger,
      default: () => content,
    });
  };

  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);
    return columns
      .filter((column) => true) // 可以做一些权限过滤相关操作
      .map((column) => {
        // 默认ellipsis为true，开启文本超出省略并hover show tip
        column.ellipsis = typeof column.ellipsis === "undefined" ? { tooltip: true } : false;
        const { edit, title } = column;
        if (edit) {
          column.title = () => {
            return renderCanEditTooltip(
              h("span", {}, [
                h("span", { style: { "margin-right": "5px" }, title }),
                renderIcon("bxs:edit-location", { size: 14 }),
              ]),
              "该列可编辑"
            );
          };
        }
      });
  });

  const setColumns = (columnList) => {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (!columns.length) {
      columnsRef.value = [];
      return;
    }

    const cacheKeys = cacheColumns.map((v) => v.key);

    if (!isString(columns[0])) {
      // 针对拖拽排序
      columnsRef.value = columns;
    } else {
      // 针对勾选取消和其他操作
      const newColumns = [];
      cacheColumns.forEach((item) => {
        if (columns.includes(item.key)) {
          newColumns.push({ ...item });
        }
      });

      if (!isEqual(cacheKeys, columns)) {
        // 调整顺序为原始数据顺序
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.key) - cacheKeys.indexOf(next.key);
        });
      }

      columnsRef.value = newColumns;
    }
  };

  //获取
  function getColumns() {
    const columns = toRaw(unref(getColumnsRef));
    return columns.map((item) => {
      return { ...item, title: item.title, key: item.key, fixed: item.fixed || undefined };
    });
  }

  //获取原始
  function getCacheColumns(isKey) {
    return isKey ? cacheColumns.map((item) => item.key) : cacheColumns;
  }

  //更新原始数据单个字段
  function setCacheColumnsField(key, value) {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.key === key) {
        Object.assign(item, value);
        return;
      }
    });
  }

  return {
    getColumnsRef,
    setColumns,
    getColumns,
    getCacheColumns,
    setCacheColumnsField,
    getPageColumns,
  };
}
