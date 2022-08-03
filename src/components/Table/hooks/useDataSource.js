import { unref, watchEffect, ref, watch, computed } from "vue";

export function useDataSource(propsRef, { getPaginationInfo, setPagination, setLoading, tableData }, emit) {
  const dataSourceRef = ref([]);

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource } = propsRef;
      dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    }
  );

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return rowKey ? rowKey : () => "key";
  });

  const getDataSourceRef = computed(() => {
    return unref(dataSourceRef);
  });

  const fetch = async (opt) => {
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const setTableData = (value) => {
    dataSourceRef.value = value;
  };

  const getDataSource = () => {
    return getDataSourceRef.value;
  };

  const reload = async (opt) => {
    await fetch(opt);
  };

  return {
    getRowKey,
    getDataSourceRef,
    fetch,
    setTableData,
    getDataSource,
    reload,
  };
}
