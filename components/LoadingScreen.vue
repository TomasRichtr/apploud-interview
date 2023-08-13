<script setup lang="ts">
interface Props {
  show?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<template>
  <div>
    <Teleport to="body">
      <div
        v-if="props.show"
        class="h-full w-full bg-white absolute flex items-center justify-center bg-opacity-50"
      >
        <LoadingSpinner />
      </div>
    </Teleport>
  </div>
</template>
