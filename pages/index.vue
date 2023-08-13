<script setup lang="ts">
import useGitlabStore from "~/stores/gitlab";
import MainLayout from "~/components/MainLayout.vue";
import strings from "~/constants/strings";

const gitlabStore = useGitlabStore();
const { initGitlabData } = gitlabStore;

onMounted(() => {
  initGitlabData();
});
</script>

<template>
  <MainLayout>
    <LoadingScreen :show="gitlabStore.gitlab.isFetching" />
    <MembersOverview>
      <template #group="{ groupIds }">
        <SubOverview
          :item-ids="groupIds"
          :items="gitlabStore.gitlab.groups"
          :members="gitlabStore.gitlab.groupMembers"
          ids-name="groupIds"
        >
          <template #default="{ item }">
            {{ item.full_name }}, id: {{ item.id }}
          </template>
        </SubOverview>
      </template>

      <template #project="{ projectIds }">
        <SubOverview
          :item-ids="projectIds"
          :items="gitlabStore.gitlab.projects"
          :label="strings.PROJECTS"
          :members="gitlabStore.gitlab.projectMembers"
          ids-name="projectIds"
        >
          <template #default="{ item }">
            {{ item.path_with_namespace }}, id: {{ item.id }}
          </template>
        </SubOverview>
      </template>
    </MembersOverview>
  </MainLayout>
</template>

<style scoped></style>
