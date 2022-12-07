const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class ViewEmployeesByManager extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let managersList = await this.getAllManagers();
    let manager_id = await this.selectManager(managersList);
    return new Promise((resolve, reject) => {
      connection.query(this.query, manager_id, (error, result) => {
        if (error) {
          console.log("error in query");
          return reject(error);
        }
        console.table(result);
        return resolve(result);
      });
    });
  };
}

module.exports = ViewEmployeesByManager;
