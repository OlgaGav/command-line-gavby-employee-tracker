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

  // function return the array with all departments from the db in view "id : department_name"
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

  // function return the array with all employees who are managers from the db in view "id : first_name last_name"
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

  // function return the array with all employees from the db in view "id : first_name last_name"
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

  // function return the array with all employees from the db in view "id : role_name"
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

  // function to show prompt to select department from the list
  // input: list of options; Expected option based on template "id : value"
  // output: id
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

  // function to show prompt to select manager from the list
  // input: list of options; Expected option based on template "id : value"
  // output: id or null
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

  // function to show prompt to select manager from the list
  // input: list of options; Expected option based on template "id : value"
  // output: id or null
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

  // function to show prompt to select manager from the list
  // input: list of options; Expected option based on template "id : value"
  // output: id
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
