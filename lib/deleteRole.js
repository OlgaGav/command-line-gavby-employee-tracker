const Option = require("./option.js");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class DeleteRole extends Option {
  constructor(...args) {
    super(...args);
  }

  executeQuery = async () => {
    let rolesList = await this.getAllRoles();
    let role_id = await this.selectRole(rolesList);
    return new Promise((resolve, reject) => {
      connection.query(this.query, role_id, (error, result) => {
        if (error) {
          console.log("Error in query deleteRole.");
          return reject(error);
        } else {
          console.log("Role was deleted successfully.");
          return resolve(result);
        }
      });
    });
  };

}

module.exports = DeleteRole;
