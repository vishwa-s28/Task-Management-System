const ENDPOINTS = {
  AUTH: "/auth",
  TASK: "/task",
  PROJECTS: "/projects",
  SUBTASK: "/task/subtask",
  STATUS: "/status",
  SHARE_TASK: "/task/share",
  FILTER_TASK: "/filter-task",
  BULK_TASKS: "/bulk-tasks",
};

const AUTH_ENDPOINTS = {
  REGISTER: "/register",
  LOGIN: "/login",
};

const BULK_TASKS_ENDPOINTS = {
  CREATE: "/create",
  ASSIGN: "/assign/:userId",
  DELETE: "/delete",
};

const FILTER_TASK_ENDPOINTS = {
  STATUS: "/status",
  DUE_DATE: "/dueDate",
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
  GET_SHARED_USERS: "/:taskId",
  SHARE_TASK: "/:taskId",
};

const STATUS_ENDPOINTS = {
  GET_ALL: "/",
  ADD: "/",
  UPDATE: "/:statusId",
  DELETE: "/:statusId",
};

const SUBTASK_ENDPOINTS = {
  GET_SUBTASKS: "/:taskId",
  ADD_SUBTASK: "/:taskId",
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
  SUBTASK_ENDPOINTS,
  TASK_ENDPOINTS,
};
