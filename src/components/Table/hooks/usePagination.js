import { ref, unref, computed } from "vue";
import { isBoolean } from "@/utils/is";
import { paginationEnum } from "../const";

export function usePagination(propsRef) {
  const paginationRef = ref({});
  const show = ref(true);

  const getPaginationInfo = computed(() => {
    const { pagination } = propsRef;
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }
    const { DEFAULTPAGESIZE, PAGESIZES } = paginationEnum;
    return {
      pageSize: DEFAULTPAGESIZE,
      pagesizes: PAGESIZES,
      showSizePicker: true,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(paginationRef),
      // pageCount: unref(paginationRef)[key], // key是取接口返的字段
    };
  });

  const setPagination = (info) => {
    const paginationInfo = unref(getPaginationInfo);
    paginationRef.value = {
      ...(isBoolean(paginationInfo) ? {} : paginationInfo),
      ...info,
    };
  };

  const getPagination = () => {
    return unref(getPaginationInfo);
  };

  const setShowPagination = async (bool) => {
    show.value = bool;
  };

  const getShowPagination = () => {
    return unref(show.value);
  };

  return {
    getPaginationInfo,
    setPagination,
    getPagination,
    setShowPagination,
    getShowPagination,
  };
}
