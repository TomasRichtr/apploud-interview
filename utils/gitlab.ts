import { Member } from "~/types/gitlabData";

export const mergeMembers = (
  projectMembers: Member[],
  groupMembers: Member[],
) => {
  const membersMap: Record<string, Member> = {};

  // Merge projectMembers into membersMap
  for (const member of projectMembers) {
    if (!membersMap[member.id]) {
      membersMap[member.id] = { ...member };
    }
    membersMap[member.id].projectIds = [
      ...(membersMap[member.id].projectIds || []),
      ...member.projectIds,
    ];
  }

  // Merge groupMembers into membersMap
  for (const member of groupMembers) {
    if (!membersMap[member.id]) {
      membersMap[member.id] = { ...member };
    }
    membersMap[member.id].groupIds = [
      ...(membersMap[member.id].groupIds || []),
      ...member.groupIds,
    ];
  }

  // Convert the membersMap to an array
  return Object.values(membersMap);
};
