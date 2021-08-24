<template>
  <div class="flex justify-items-center">
    <p class="px-7.5 mx-3">Type de l'opération</p>
    <select class="mx-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" v-model="operationType">
      <option v-for="type in operationTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
  <div
    class="
      shadow-xl
      font-medium
      bg-green-300
      rounded-md
      flex
      items-center
      justify-center
      mx-3
    "
  >
    <input class="bg-gray-100 appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="first-number" v-model="firstNumber" />
    <p>{{ operationSign }}</p>
    <input class="bg-gray-100 appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="second-number" v-model="secondNumber" />
    <p>= {{ resultOperation }}</p>
    <button class="mt-4 mb-3 rounded-full flex items-center w-100 ml-1 shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400" @click="addOperation">Ajouter aux favoris</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore, ActionTypes } from "../store";
export default defineComponent({
  setup() {
    const store = useStore();
    const operationTypes = reactive([
      "division",
      "multiplication",
      "soustraction",
      "addition",
    ]);
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const operationType = ref("addition");

    const resultOperation = computed((): number => {
      if (operationType.value === "addition") {
        return firstNumber.value + secondNumber.value;
      } else if (operationType.value === "multiplication") {
        return firstNumber.value * secondNumber.value;
      } else if (operationType.value === "division") {
        return firstNumber.value / secondNumber.value;
      } else {
        return firstNumber.value - secondNumber.value;
      }
    });
    const operationSign = computed((): string => {
      if (operationType.value === "addition") {
        return "+";
      } else if (operationType.value === "multiplication") {
        return "x";
      } else if (operationType.value === "division") {
        return "/";
      } else {
        return "-";
      }
    });
    const addOperation = () => {
      store.dispatch(ActionTypes.ADD_OPERATION, {
        firstNumber: firstNumber.value,
        secondNumber: secondNumber.value,
        operationType: operationSign.value,
        result: resultOperation.value,
        date: new Date()
      });
    };

    return {
      operationTypes,
      firstNumber,
      secondNumber,
      operationType,
      addOperation,
      resultOperation,
      operationSign,
    };
  },
});
</script>

<style scoped>
</style>
