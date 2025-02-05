import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { TASK_FILTER_ERRORS } from "../constants/errorMessages.js";

const filterTaskByStatus = async (req, res, next) => {
  try {
    const { sequelize } = db;
    const { status } = req.query;

    if (!status) {
      throw new AppError(TASK_FILTER_ERRORS.MISSING_STATUS, 400);
    }

    const tasks = await sequelize.query(
      `SELECT t.*, s.name AS statusName FROM "Tasks" t INNER JOIN "Statuses" s ON t."StatusId" = s."id" WHERE s."name" = :status`,
      {
        replacements: { status },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (tasks.length === 0) {
      throw new AppError(TASK_FILTER_ERRORS.NO_TASKS_FOR_STATUS, 404);
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const filterTaskByDueDate = async (req, res, next) => {
  try {
    const { sequelize } = db;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw new AppError(TASK_FILTER_ERRORS.MISSING_DATE_RANGE, 400);
    }

    const tasks = await sequelize.query(
      `SELECT * FROM "Tasks" WHERE "dueDate" BETWEEN :startDate AND :endDate`,
      {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (tasks.length === 0) {
      throw new AppError(TASK_FILTER_ERRORS.NO_TASKS_FOR_DATE_RANGE, 404);
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const filterTasksAssignedToUser = async (req, res, next) => {
  try {
    const { sequelize } = db;
    const { assignedUserId } = req.query;

    if (!assignedUserId) {
      throw new AppError(TASK_FILTER_ERRORS.MISSING_USER_ID, 400);
    }

    const tasks = await sequelize.query(
      `
      SELECT 
        t.*, 
        u.name AS assignedUserName,
        (
          SELECT json_agg(json_build_object('id', st.id, 'title', st.title)) 
          FROM "Subtasks" st 
          WHERE st."TaskId" = t.id
        ) AS subtasks
      FROM 
        "Tasks" t
      INNER JOIN 
        "UserTasks" ut ON t.id = ut."TaskId"
      INNER JOIN 
        "Users" u ON ut."UserId" = u.id
      WHERE 
        u.id = :assignedUserId
      `,
      {
        replacements: { assignedUserId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (tasks.length === 0) {
      throw new AppError(TASK_FILTER_ERRORS.NO_TASKS_FOR_USER, 404);
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const filterTasksBySharedStatus = async (req, res, next) => {
  try {
    const { sequelize } = db;
    const { status } = req.query;

    let query;
    if (status === "true") {
      query = `
        SELECT t.*
        FROM "Tasks" t
        WHERE EXISTS (
          SELECT 1
          FROM "UserTasks" ut
          WHERE ut."TaskId" = t.id
        )
      `;
    } else if (status === "false") {
      query = `
        SELECT t.*
        FROM "Tasks" t
        WHERE NOT EXISTS (
          SELECT 1
          FROM "UserTasks" ut
          WHERE ut."TaskId" = t.id
        )
      `;
    } else {
      throw new AppError(TASK_FILTER_ERRORS.INVALID_SHARED_STATUS, 400);
    }

    const tasks = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (tasks.length === 0) {
      throw new AppError(
        status === "true"
          ? TASK_FILTER_ERRORS.NO_SHARED_TASKS
          : TASK_FILTER_ERRORS.NO_NON_SHARED_TASKS,
        404
      );
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export {
  filterTaskByDueDate,
  filterTaskByStatus,
  filterTasksAssignedToUser,
  filterTasksBySharedStatus,
};
