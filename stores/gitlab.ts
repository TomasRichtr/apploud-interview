import { fetchAllGitlabPages } from "~/utils/gitlabApi";
import { DEFAULT_GROUP_ID, GITLAB_URLS } from "~/constants/gitlab";
import { GitlabData, GitlabError } from "~/types/gitlabData";
import { mergeMembers } from "~/utils/gitlab";

const useGitlabStore = defineStore("gitlab", () => {
  const gitlab = reactive<GitlabData>({
    projects: [],
    groups: [],
    projectMembers: [],
    groupMembers: [],
    members: [],
    isFetching: false,
    groupId: "",
  });

  const resetGitlabData = () => {
    gitlab.projects = [];
    gitlab.groups = [];
    gitlab.projectMembers = [];
    gitlab.groupMembers = [];
  };

  const initGroups = async (topGroupId: string) => {
    const topGroup = await fetchAllGitlabPages({ id: topGroupId });
    const subGroups = await fetchAllGitlabPages({
      id: topGroupId,
      endPoint: GITLAB_URLS.GROUPS,
      resource: "descendant_groups",
    });

    gitlab.groups = [...topGroup, ...subGroups];
  };

  const initGroupMembers = async () => {
    for (const group of gitlab.groups) {
      const groupMembers = await fetchAllGitlabPages({
        id: group.id,
        endPoint: GITLAB_URLS.GROUPS,
        resource: "members",
      });
      const extGroupMembers = groupMembers.map((m) => {
        return {
          ...m,
          groupIds: m.groupIds ? [...m.groupIds, group.id] : [group.id],
        };
      });
      gitlab.groupMembers.push(...extGroupMembers);
    }
  };

  const initProjects = async () => {
    for (const group of gitlab.groups) {
      const projects = await fetchAllGitlabPages({
        id: group.id,
        endPoint: GITLAB_URLS.GROUPS,
        resource: "projects",
      });
      gitlab.projects.push(...projects);
    }
  };

  const initProjectMembers = async () => {
    for (const project of gitlab.projects) {
      const projectMembers = await fetchAllGitlabPages({
        id: project.id,
        endPoint: GITLAB_URLS.PROJECTS,
        resource: "members",
      });
      const extProjectMembers = projectMembers.map((m) => {
        return {
          ...m,
          projectIds: m.projectIds
            ? [...m.projectIds, project.id]
            : [project.id],
        };
      });
      gitlab.projectMembers.push(...extProjectMembers);
    }
  };

  const initMembers = () => {
    gitlab.members = mergeMembers(gitlab.projectMembers, gitlab.groupMembers);
  };

  const initGitlabData = async () => {
    gitlab.isFetching = true;
    try {
      await initGroups(gitlab.groupId || DEFAULT_GROUP_ID);
      await initGroupMembers();
      await initProjects();
      await initProjectMembers();
      initMembers();
    } catch (err) {
      const error = err as GitlabError;
      const { _data, status = 500 } = error.response || {};
      const statusMessage = _data?.message || "Oops! Something went wrong!";
      gitlab.groupId = "";
      showError({
        statusCode: status,
        statusMessage,
      });
    } finally {
      gitlab.isFetching = false;
    }
  };

  return {
    gitlab,
    initGitlabData,
    resetGitlabData,
  };
});

export default useGitlabStore;
