<script setup lang="ts">
import useGitlabStore from "~/stores/gitlab";
import strings from "~/constants/strings";

const gitlabStore = useGitlabStore();
const { initGitlabData, resetGitlabData } = gitlabStore;
const input = ref<HTMLInputElement>();

const searchGitlabData = () => {
  resetGitlabData();
  initGitlabData();
};

const userCount = computed(() => {
  return gitlabStore.gitlab.members.length;
});

watch(
  () => gitlabStore.gitlab.isFetching,
  async () => {
    if (!gitlabStore.gitlab.isFetching) {
      await nextTick();
      input.value?.focus();
    }
  },
);
</script>

<template>
  <MainLayout
    class="fixed w-full h-20 bg-black flex items-center justify-between"
  >
    <span class="text-white flex min-w-[8rem] font-bold text-lg">
      {{ strings.USER_COUNT }}: {{ userCount }}
    </span>
    <div class="flex w-full justify-between gap-4">
      <input
        id="topGroupId"
        ref="input"
        v-model="gitlabStore.gitlab.groupId"
        name="topGroupId"
        type="text"
        :disabled="gitlabStore.gitlab.isFetching"
        :placeholder="strings.INPUT_PLACEHOLDER"
        class="border px-4 py-2 rounded-lg text-black w-full block"
        @keydown.enter="searchGitlabData"
      />
      <button
        class="text-black w-2/12 font-semibold bg-white h-12 rounded-lg px-4 py-2 hover:bg-gray-200"
        @click="searchGitlabData"
      >
        SEARCH
      </button>
    </div>
  </MainLayout>
</template>
