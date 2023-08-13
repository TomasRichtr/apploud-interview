export interface Project {
  id: string;
  full_name: string;
}

export interface Group {
  id: string;
  full_name: string;
}

export interface Member {
  name: string;
  id: string;
  groupIds: string[];
  projectIds: string[];
  access_level: 0 | 10 | 20 | 30 | 40 | 50;
}

export interface GitlabData {
  projects: Project[];
  groups: Group[];
  projectMembers: Member[];
  groupMembers: Member[];
  members: Member[];
  isFetching: boolean;
  groupId: string;
}

export interface GitlabError extends Error {
  response: {
    _data: {
      message: string;
    };
    status: number;
  };
}
