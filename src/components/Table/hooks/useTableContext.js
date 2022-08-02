import { inject } from "vue";
import { provide } from "vue";

const key = Symbol("ty-table");
export function createContextTable(instance) {
  provide(key, instance);
}

export function useContextTable() {
  return inject(key);
}
