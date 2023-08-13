import {
  DEFAULT_GROUP_ID,
  GITLAB_TEST_ACCESS_TOKEN,
  GITLAB_URLS,
  PER_PAGE,
} from "~/constants/gitlab";

export const requestGitlabAPI = async (
  endPoint = GITLAB_URLS.GROUPS,
  resource = "",
  id = DEFAULT_GROUP_ID,
  page = 1,
) => {
  const { gitlabToken: urlGitlabToken } = useRoute().query;
  const envGitlabToken = useRuntimeConfig().public.gitlabToken;
  const gitLabToken = envGitlabToken || urlGitlabToken;

  return await $fetch(`${endPoint}/${id}/${resource}`, {
    query: {
      per_page: PER_PAGE,
      page,
    },
    headers: {
      Authorization: `Bearer ${gitLabToken || GITLAB_TEST_ACCESS_TOKEN}`,
    },
  });
};

export const fetchAllGitlabPages = async ({
  endPoint = GITLAB_URLS.GROUPS,
  resource = "",
  id = DEFAULT_GROUP_ID,
}) => {
  let page = 1;
  let allResults: any[] = [];
  let currentPageResults;

  do {
    currentPageResults = await requestGitlabAPI(endPoint, resource, id, page);
    allResults = allResults.concat(currentPageResults);
    page++;
  } while (currentPageResults.length === PER_PAGE);

  return allResults;
};
