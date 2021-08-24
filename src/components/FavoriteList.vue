<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th
          v-for="(attribute, index) in dataAttributes"
          :key="index"
          class="px-4 py-2 text-emerald-600"
        >
          {{ attribute }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="operation in operationsList"
        :key="completeOperation(operation)"
      >
        <td
          class="
            border border-emerald-500
            px-4
            py-2
            text-emerald-600
            font-medium
          "
        >
          {{ getDate(operation.date) }}
        </td>
        <td
          class="
            border border-emerald-500
            px-4
            py-2
            text-emerald-600
            font-medium
          "
        >
          {{ completeOperation(operation) }}
        </td>
        <td
          class="
            border border-emerald-500
            px-4
            py-2
            text-emerald-600
            font-medium
          "
        >
          {{ operation.result }}
        </td>
        <td
          class="
            border border-emerald-500
            px-4
            py-2
            text-emerald-600
            font-medium
          "
        >
          <button class="mb-3 rounded-full flex items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400" @click="deleteOperation(operation)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
import { ActionTypes, Operation } from "../store/index";

export default defineComponent({
  setup() {
    const dataAttributes = reactive(["Date", "Opération", "Résultat"]);
    const store = useStore();
    const operationsList = computed(() => {
      return store.getters.favoriteOperations;
    });

    const getDate = (date: Date): string => {
      const yearMonthDay =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return yearMonthDay + " " + time;
    };

    const completeOperation = (operation: Operation): string => {
      return (
        operation.firstNumber +
        " " +
        operation.operationType +
        " " +
        operation.secondNumber
      );
    };

    const deleteOperation = (operation: Operation): void => {
      store.dispatch(ActionTypes.DELETE_OPERATION, operation)
    };

    return {
      dataAttributes,
      operationsList,
      getDate,
      completeOperation,
      deleteOperation
    };
  },
});
</script>

<style scoped>
</style>
