import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";

const filterTaskByStatus = async (req, res, next) => {
  try {
    const { sequelize } = db;
    const { status } = req.query;

    if (!status) {
      throw new AppError("Status is required for filtering.", 400);
    }

    const tasks = await sequelize.query(
      `SELECT t.*, s.name AS statusName FROM "Tasks" t INNER JOIN "Statuses" s ON t."StatusId" = s."id" WHERE s."name" = :status`,
      {
        replacements: { status },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (tasks.length === 0) {
      throw new AppError("No tasks found for the given status.", 404);
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
      throw new AppError("Both startDate and endDate are required.", 400);
    }

    const tasks = await sequelize.query(
      `SELECT * FROM "Tasks" WHERE "dueDate" BETWEEN :startDate AND :endDate`,
      {
        replacements: { startDate, endDate },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (tasks.length === 0) {
      throw new AppError("No tasks found in the given date range.", 404);
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
      throw new AppError("Assigned User ID is required for filtering.", 400);
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
      throw new AppError("No tasks found for the given user.", 404);
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
      throw new AppError("Invalid shared status, use 'true' or 'false'.", 400);
    }

    const tasks = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (tasks.length === 0) {
      throw new AppError(`No ${status === "true" ? "shared" : "non-shared"} tasks found.`, 404);
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export { filterTaskByDueDate, filterTaskByStatus, filterTasksAssignedToUser, filterTasksBySharedStatus}

