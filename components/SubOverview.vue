<script setup lang="ts">
import { computed } from "vue";
import { GITLAB_ACCESS_LEVEL } from "~/constants/gitlab";
import { Group, Member, Project } from "~/types/gitlabData";

interface Props {
  itemIds?: string[];
  items?: any[];
  label?: string;
  members?: Member[];
  idsName?: "projectIds" | "groupIds";
}
const props = withDefaults(defineProps<Props>(), {
  itemIds: () => [],
  items: () => [],
  members: () => [],
  label: undefined,
  idsName: "groupIds",
});

const isOpen = ref<boolean>(true);

const memberItems = computed(() => {
  if (isOpen.value) {
    return props.items.filter((item) => props.itemIds.includes(item.id));
  }

  return [];
});

const resolveAccessLevel = (item: Project | Group) => {
  const memberItem = props.members.find((member: Member) => {
    const memberItemIds = member[props.idsName];
    return memberItemIds.includes(item.id);
  });
  if (!memberItem) return "";

  return GITLAB_ACCESS_LEVEL[memberItem.access_level];
};
</script>

<template>
  <div class="ml-6">
    <ExpandControls v-model="isOpen" :label="label" />

    <TransitionGroup name="list" tag="div" class="ml-9">
      <div v-for="item in memberItems" :key="item.id" class="font-normal">
        <slot :item="item" />,
        <span>{{ resolveAccessLevel(item) }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped></style>
