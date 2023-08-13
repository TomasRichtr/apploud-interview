<script setup lang="ts">
import strings from "~/constants/strings";

interface Props {
  modelValue?: boolean;
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: strings.GROUPS,
});

interface Emits {
  (e: "update:modelValue", modelValue: boolean): void;
}
const emit = defineEmits<Emits>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="flex items-end">
    <Icon
      v-if="!value"
      name="ph:plus-fill"
      class="cursor-pointer"
      @click="value = true"
    />
    <Icon
      v-else
      name="ph:minus-fill"
      class="cursor-pointer"
      @click="value = false"
    />
    <span class="ml-3">{{ label }}:</span>
  </div>
</template>

<style scoped></style>
