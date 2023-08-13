<script setup lang="ts">
import { storeToRefs } from "pinia";
import useGitlabStore from "~/stores/gitlab";

const gitlabStore = useGitlabStore();
const { gitlab } = storeToRefs(gitlabStore);
</script>

<template>
  <TransitionGroup name="list" tag="div">
    <div
      v-for="member in gitlab.members"
      :key="member.id"
      class="text-2xl font-semibold mb-6"
    >
      {{ member.name }}, id: {{ member.id }}
      <slot
        v-if="!!member.groupIds"
        name="group"
        :group-ids="member.groupIds"
      />
      <slot
        v-if="!!member.projectIds"
        name="project"
        :project-ids="member.projectIds"
      />
    </div>
  </TransitionGroup>
</template>
