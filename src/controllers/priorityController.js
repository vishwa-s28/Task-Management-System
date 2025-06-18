import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";
import { PRIORITY_ERRORS, PRIORITY_MESSAGES } from "../constants/errorMessages.js"; 

const getAllPriorities = async (req, res, next) => {
  try {
    const { Priority } = db;
    const priority = await Priority.findAll();

    res.status(200).json({
      message: PRIORITY_MESSAGES.FETCH_SUCCESS,
      priority,
    });
  } catch (error) {
    next(error);
  }
};

const addPriority = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const { Priority } = db;

    if (!name) {
      throw new AppError(PRIORITY_ERRORS.NAME_REQUIRED, 400);
    }

    const priority = await Priority.create({ name, color });

    res.status(201).json({
      message: PRIORITY_MESSAGES.ADD_SUCCESS,
      priority,
    });
  } catch (error) {
    next(error);
  }
};

const updatePriority = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const priorityId = req.params.priority_id;
    const { Priority } = db;

    const priority = await Priority.findByPk(priorityId);

    if (!priority) {
      throw new AppError(PRIORITY_ERRORS.NOT_FOUND, 404);
    }

    priority.name = name || priority.name;
    priority.color = color || priority.color;
    await priority.save();

    res.status(200).json({
      message: PRIORITY_MESSAGES.UPDATE_SUCCESS,
      priority,
    });
  } catch (error) {
    next(error);
  }
};

const deletePriority = async (req, res, next) => {
  try {
    const { Priority } = db;
    const priorityId = req.params.priority_id;

    const priority = await Priority.findByPk(priorityId);

    if (!priority) {
      throw new AppError(PRIORITY_ERRORS.NOT_FOUND, 404);
    }

    await priority.destroy();

    res.status(200).json({ message: PRIORITY_MESSAGES.DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};

export { addPriority, getAllPriorities, updatePriority, deletePriority };
