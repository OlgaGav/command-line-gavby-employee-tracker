class Query {
  // view all departments
  viewAllDepartments() {
    return `SELECT id, name as department FROM department`;
  }
  // view all employees
  viewAllEmployees() {
    return `SELECT e.id, e.first_name, e.last_name, r.title as role, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON d.id = r.department_id
    ORDER BY e.first_name, e.last_name`;
  }
  // view all roles
  viewAllRoles() {
    return `SELECT r.id, r.title as role, d.name as department, r.salary 
    FROM role as r 
    INNER JOIN department as d 
    WHERE d.id = r.department_id
    ORDER BY r.title`;
  }

  // view employees by manager
  viewEmployeesByManager() {
    return `SELECT m.id as "manager id", CONCAT(m.first_name, " ", m.last_name) AS "manager name", e.id as "employee id", CONCAT(e.first_name, " ", e.last_name) AS employee, r.title as role, d.name as department, r.salary
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON d.id = r.department_id
    WHERE e.manager_id = ?
    ORDER BY e.first_name, e.last_name;`
  }
  // view employees by department
  viewEmployeesByDepartment() {
    return `SELECT d.name as department, e.id as "employee id", CONCAT(e.first_name, " ", e.last_name) AS employee, r.title as role, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON d.id = r.department_id
    WHERE d.id = ?
    ORDER BY e.first_name, e.last_name;`
  }
  // view the total utilized budget of each department
  viewBudgetOfDepartment() {
    return `SELECT d.name as department, SUM(r.salary) as "total salary"
    FROM department AS d
    INNER JOIN role AS r ON d.id = r.department_id
    INNER JOIN employee AS e ON e.role_id = r.id
    GROUP BY d.id
    ORDER BY d.name`
  }
  // add a department
  addDepartment() {
    return `INSERT INTO department(name)
    VALUES (?)`
  }
  // add a role
  addRole() {
    return `INSERT INTO role(title, salary, department_id)
    VALUES (?, ?, ?)`
  }
  // add an employee
  addEmployee() {
    return `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`
  }
  // update an employee role
  updateEmployeeRole() {
    return ``
  }
  // update employee managers
  updateEmployeeManager() {
    return ``
  }
  // delete department
  deleteDepartment() {
    return ``
  }
  // delete role
  deleteRole() {
    return ``
  }
  // delete employee
  deleteEmployee() {
    return ``
  }
}


module.exports = Query