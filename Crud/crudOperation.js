// crudOperation.js
const { Op } = require('sequelize');
const {userModel, departmentModel, taskModel} = require("../Model/index")
class Crud {
  constructor(userModel, departmentModel, taskModel) {
    this.userModel = userModel;
    this.departmentModel = departmentModel;
    this.taskModel = taskModel;
  }

  async findOne(query) {
    try {
      const record = await this.userModel.findOne({ where: query });
      return record;
    } catch (error) {
      throw error;
    }
  }
  async create(model, data) {
    try {
      const result = await model.create(data);
      return result;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }
  async allUsers() {
    try {
      const allUsers = await this.userModel.findAll({
        order: [['id', 'ASC']],
        limit: 20,
        distinct: ['name'],
      });
      return allUsers;
    } catch (error) {
      throw new Error(`Error retrieving all users: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const result = await this.userModel.update(data, { where: { id } });
      if (result[0] === 0) {
        throw new Error('Record not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const result = await this.userModel.destroy({ where: { id } });
      return result;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }

  async findAllWithJoin() {
    try {
      const result = await this.userModel.findAll({
        include: [
          { model: this.departmentModel, attributes: ['depname'] },
          { model: this.taskModel, attributes: ['taskName'] }
        ],
      });
      return result;
    } catch (error) {
      throw new Error(`Error retrieving all records with join: ${error.message}`);
    }
  }

  // New method to create a task for a user
  async createTask(userId, taskData) {
    try {
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const task = await this.taskModel.create(taskData);
      await user.addTask(task);

      return task;
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }
}

module.exports = Crud;
