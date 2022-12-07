const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class DeleteDepartment extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let departmentsList = await this.getAllDepartments();
    let department_id = await this.selectDepartment(departmentsList);
    return new Promise((resolve, reject) => {
      connection.query(this.query, department_id, (error, result) => {
        if (error) {
          console.log("Error in query deleteDepartment.");
          return reject(error);
        } else {
          console.log("Department was deleted successfully.");
          return resolve(result);
        }
      });
    });
  };

}

module.exports = DeleteDepartment;
