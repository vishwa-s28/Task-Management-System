import db from "../sequelize-client.js";
import AppError from "../utils/appError.js";

const getAllStatus = async (req, res, next) => {
  try {
    const { Status } = db;
    const status = await Status.findAll();

    res.status(200).json({
      message: "Fetch Status successfully",
      status,
    });
  } catch (error) {
    next(error);
  }
};
const addStatus = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { Status } = db;
    if (!name) {
      throw new AppError("Please add name of status", 400);
    }
    const status = await Status.create({
      name,
    });

    res.status(201).json({
      message: "Status added successfully",
      status,
    });
  } catch (error) {
    next(error);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const { name } = req.body;
    const statusId = req.params.statusId;
    const { Status } = db;
    const status = await Status.findByPk(statusId);

    if (!status) {
      throw new AppError("Status not found", 404);
    }

    status.name = name || status.name;
    await status.save();
    res.status(201).json({
      message: "Status updated successfully",
      status,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStatus = async (req, res, next) => {
  try {
    const { Status } = db;
    const statusId = req.params.statusId;

    const status = await Status.findByPk(statusId);

    if (!status) {
      throw new AppError("Status not found", 404);
    }

    await status.destroy();

    res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { addStatus, getAllStatus, updateStatus, deleteStatus };
