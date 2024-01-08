const { Op } = require('sequelize');
class Crud {
    constructor(userModel) {
      this.Model = userModel;
    }
  
    async create(data) {
        try {
          const result = await this.Model.create(data);
          return result;
        } catch (error) {
          throw new Error(`Error creating record: ${error.message}`);
        }
      }
  
    async findOne(query) {
      try {
        const record = await this.Model.findOne({ where: query });
        return record;
      } catch (error) {
        throw error;
      }
    }
  
    async allUsers() {
      try {
        // Use findAll on the model instance, not directly on this.Model
        const allUsers = await this.Model.findAll({
          order: [['id', 'ASC']], // Order by name in ascending order
          limit: 20, // Limit the results to 10 records
          // where: { age: { [Op.gt]: 21 } },
          distinct: ['name'],
        });
    
        return allUsers;
      } catch (error) {
        throw new Error(`Error retrieving all users: ${error.message}`);
      }
    }

  
  
      async update(id, data) {
        try {
          const result = await this.Model.update(data, { where: { id } });
          if (result[0] === 0) {
            throw new Error('Record not found');
          }
          return result;
        } catch (error) {
          throw new Error(`Error updating record: ${error.message}`);
        }
      }
      
      // async findAll() {
      //   try {
      //     const result = await this.Model.findAll();
      //     return result;
      //   } catch (error) {
      //     throw new Error(`Error retrieving all records: ${error.message}`);
      //   }
      // }
  
    async delete(id) {
      try {
        const result = await this.Model.destroy({ where: { id } });
        return result;
      } catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
      }
    }
  }
  
  module.exports = Crud;
  