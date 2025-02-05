const GENERAL_MESSAGES = {
  SERVER_ERROR: "Something went wrong!",
  RATE_LIMIT_ERROR: "Too many requests, please try again later.",
  VALIDATION: "Validation Error",
  NOT_FOUND: "Can't find the requested resource on this server",
};

const SCHEMA_VALIDATION = {
  NAME: {
    BASE: '"Name" should be a type of text',
    EMPTY: '"Name" cannot be an empty field',
    MIN: '"Name" should have a minimum length of 3',
    MAX: '"Name" should have a maximum length of 50',
    REQUIRED: '"Name" is a required field',
  },
  EMAIL: {
    BASE: '"Email" should be a type of text',
    EMPTY: '"Email" cannot be an empty field',
    INVALID: '"Email" should be a valid email address',
    REQUIRED: '"Email" is a required field',
  },
  PASSWORD: {
    BASE: '"Password" should be a type of text',
    EMPTY: '"Password" cannot be an empty field',
    MIN: '"Password" should have a minimum length of 6',
    REQUIRED: '"Password" is a required field',
  },
  ROLE: {
    BASE: '"Role" should be a type of text',
    EMPTY: '"Role" cannot be an empty field',
    ONLY: '"Role" should be either "admin" or "user"',
  },
};

const AUTH_ERRORS = {
  MISSING_FIELDS: "Name, email, and password are required.",
  INVALID_EMAIL: "Invalid or undeliverable email address.",
  EMAIL_EXISTS: "E-Mail exists already, please pick a different one.",
  INVALID_CREDENTIALS: "Invalid email or password.",

  NO_TOKEN: "Access denied. No token provided.",
  USER_NOT_FOUND: "User not found.",
  INVALID_TOKEN: "Invalid or expired token.",
  INSUFFICIENT_PERMISSIONS: "Access denied. Insufficient permissions.",
};

const TASK_ERRORS = {
  INVALID_TASK_ARRAY: "Invalid input. Provide a non-empty array of tasks.",
  INVALID_TASK_TITLE: "Invalid task title: {title}",
  INVALID_ASSIGN_INPUT:
    "Invalid input. Provide a userId and a non-empty array of taskIds.",
  USER_NOT_FOUND: "User not found.",
  TASKS_NOT_FOUND: "Tasks not found for IDs: {taskIds}.",
  NO_TASKS_TO_DELETE: "No tasks found to delete with the provided IDs.",
  TASK_NOT_FOUND: "Task not found.",
};

const TASK_FILTER_ERRORS = {
  MISSING_STATUS: "Status is required for filtering.",
  NO_TASKS_FOR_STATUS: "No tasks found for the given status.",
  MISSING_DATE_RANGE: "Both startDate and endDate are required.",
  NO_TASKS_FOR_DATE_RANGE: "No tasks found in the given date range.",
  MISSING_USER_ID: "Assigned User ID is required for filtering.",
  NO_TASKS_FOR_USER: "No tasks found for the given user.",
  INVALID_SHARED_STATUS: "Invalid shared status, use 'true' or 'false'.",
  NO_SHARED_TASKS: "No shared tasks found.",
  NO_NON_SHARED_TASKS: "No non-shared tasks found.",
};

const PROJECT_ERRORS = {
  FETCH_ERROR: "Error fetching projects",
  PROJECT_NOT_FOUND: "Project not found",
  NAME_REQUIRED: "Project name is required",
  UPDATE_ERROR: "Error updating project",
};

const STATUS_ERRORS = {
  NAME_REQUIRED: "Please add the name of the status.",
  NOT_FOUND: "Status not found.",
};

const STATUS_MESSAGES = {
  FETCH_SUCCESS: "Fetched status successfully.",
  ADD_SUCCESS: "Status added successfully.",
  UPDATE_SUCCESS: "Status updated successfully.",
  DELETE_SUCCESS: "Status deleted successfully.",
};

const SUBTASK_ERRORS = {
  TITLE_REQUIRED: "Subtask title is required.",
};

const SUBTASK_MESSAGES = {
  ADD_SUCCESS: "Subtask created successfully.",
  FETCH_SUCCESS: "Subtasks fetched successfully.",
};

const TASK_MESSAGES = {
  CREATE_SUCCESS: "Task created successfully.",
  UPDATE_SUCCESS: "Task updated successfully.",
  DELETE_SUCCESS: "Task deleted successfully.",
  MOVE_SUCCESS: "Task moved successfully.",
};

export {
  GENERAL_MESSAGES,
  SCHEMA_VALIDATION,
  AUTH_ERRORS,
  TASK_ERRORS,
  TASK_FILTER_ERRORS,
  PROJECT_ERRORS,
  STATUS_ERRORS,
  STATUS_MESSAGES,
  SUBTASK_ERRORS,
  SUBTASK_MESSAGES,
  TASK_MESSAGES,
};
