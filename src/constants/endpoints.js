const ENDPOINTS = {
  AUTH: "/auth",
  TASK: "/task",
  PROJECTS: "/projects",
  SUBTASK: "/task/subtask",
  STATUS: "/status",
  PRIORITY: "/priority",
  SHARE_TASK: "/task/share",
  FILTER_TASK: "/filter-task",
  BULK_TASKS: "/bulk-tasks",
};

const AUTH_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

const BULK_TASKS_ENDPOINTS = {
  CREATE: "/create",
  ASSIGN: "/assign/:user_id",
  DELETE: "/delete",
};

const FILTER_TASK_ENDPOINTS = {
  STATUS: "/status",
  DUE_DATE: "/due_date",
  ASSIGNEE: "/assignee",
  SHARED: "/shared",
};

const PROJECTS_ENDPOINTS = {
  GET_PROJECTS: "/",
  GET_PROJECT_BY_ID: "/:id",
  ADD_PROJECT: "/",
  UPDATE_PROJECT: "/:id",
  DELETE_PROJECT: "/:id",
};

const SHARE_TASK_ENDPOINTS = {
  GET_SHARED_USERS: "/:task_id",
  SHARE_TASK: "/:task_id",
};

const STATUS_ENDPOINTS = {
  GET_ALL: "/",
  ADD: "/",
  UPDATE: "/:status_id",
  DELETE: "/:status_id",
};

const PRIORITY_ENDPOINTS = {
  GET_ALL: "/",
  ADD: "/",
  UPDATE: "/:priority_id",
  DELETE: "/:priority_id",
}

const SUBTASK_ENDPOINTS = {
  GET_SUBTASKS: "/:task_id",
  ADD_SUBTASK: "/:task_id",
};

const TASK_ENDPOINTS = {
  CREATE: "/",
  GET_ALL: "/",
  GET_BY_ID: "/:id",
  UPDATE: "/:id",
  DELETE: "/:id",
  MOVE: "/:id/move",
};

export {
  ENDPOINTS,
  AUTH_ENDPOINTS,
  BULK_TASKS_ENDPOINTS,
  FILTER_TASK_ENDPOINTS,
  PROJECTS_ENDPOINTS,
  SHARE_TASK_ENDPOINTS,
  STATUS_ENDPOINTS,
  PRIORITY_ENDPOINTS,
  SUBTASK_ENDPOINTS,
  TASK_ENDPOINTS,
};
