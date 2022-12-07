const inquirer = require("inquirer");
const Query = require("./query");
const query = new Query();
const connection = query.getConnection();

class Option {
  constructor(id, name, query) {
    this.id = id;
    this.name = name;
    this.query = query;
  }

  getOptionName() {
    return this.name;
  }

  executeQuery() {
    throw new Error("You have to implement the method executeQuery!");
  }

  getAllDepartments = () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllDepartments(), (error, result) => {
        if (error) {
          console.log("error in query getAllDepartments");
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  };

  getAllManagers = () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllManagers(), (error, result) => {
        if (error) {
          console.log("error in query getAllManagers");
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  };

  getAllEmployees = () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllEmployees(), (error, result) => {
        if (error) {
          console.log("error in query getAllEmployees");
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  };

  getAllRoles = () => {
    return new Promise((resolve, reject) => {
      connection.query(query.getAllRoles(), (error, result) => {
        if (error) {
          console.log("error in query getAllRoles");
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  };

  selectDepartment = async (departmentsList) => {
    let res = await inquirer.prompt([
      {
        type: "list",
        name: "department",
        message: "Select the department from the list: ",
        choices: departmentsList,
      },
    ]);
    let department_id = await query.getId(res.department);
    return department_id;
  };

  selectManager = async (managersList) => {
    let res = await inquirer.prompt([
      {
        type: "list",
        name: "manager",
        message: "Select the manager name from the list: ",
        choices: managersList,
      },
    ]);
    if (res.manager === "None") {
      return null;
    }
    let manager_id = await query.getId(res.manager);
    return manager_id;
  };

  selectEmployee = async (employeesList) => {
    let res = await inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Select the employee name from the list: ",
        choices: employeesList,
      },
    ]);
    if (res.employee === "None") {
      return null;
    }
    let employee_id = await query.getId(res.employee);
    return employee_id;
  };

  selectRole = async (rolesList) => {
    let res = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "Select the role from the list: ",
        choices: rolesList,
      },
    ]);
    let role_id = await query.getId(res.role);
    return role_id;
  };

}

module.exports = Option;
