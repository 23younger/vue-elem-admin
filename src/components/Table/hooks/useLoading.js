import { ref, unref, watch, computed } from "vue";

export function useLoading(props) {
  const loadingRef = ref(unref(props).loading);

  watch(
    () => unref(props).loading,
    (loading) => {
      loadingRef.value = loading;
    }
  );

  const getLoading = computed(() => unref(loadingRef));

  const setLoading = (loading) => {
    loadingRef.value = loading;
  };

  return { getLoading, setLoading };
}
