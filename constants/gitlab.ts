const GITLAB_URLS = {
  GROUPS: "https://gitlab.com/api/v4/groups",
  PROJECTS: "https://gitlab.com/api/v4/projects",
};
const PER_PAGE = 100;
const GITLAB_TEST_ACCESS_TOKEN = "naRAbrD8qPXaXVASQ8Zy";
const DEFAULT_GROUP_ID = "10975505";

const GITLAB_ACCESS_LEVEL = {
  0: "No access",
  5: "Minimal access",
  10: "Guest",
  20: "Reporter",
  30: "Developer",
  40: "Maintainer",
  50: "Owner",
};

export {
  GITLAB_URLS,
  GITLAB_TEST_ACCESS_TOKEN,
  PER_PAGE,
  DEFAULT_GROUP_ID,
  GITLAB_ACCESS_LEVEL,
};
