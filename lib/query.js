class Query {
  // 0: view all departments
  viewAllDepartments() {
    return `SELECT id, name as department FROM department`;
  }
  // 1: view all roles
  viewAllRoles() {
    return `SELECT r.id, r.title as role, d.name as department, r.salary 
    FROM role as r 
    INNER JOIN department as d 
    WHERE d.id = r.department_id
    ORDER BY r.title`;
  }
  // 2: view all employees
  viewAllEmployees() {
    return `SELECT e.id, e.first_name, e.last_name, r.title as role, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    LEFT JOIN role AS r ON r.id = e.role_id
    LEFT JOIN department AS d ON d.id = r.department_id
    ORDER BY e.first_name, e.last_name`;
  }
  // 3: view employees by manager
  viewEmployeesByManager() {
    return `SELECT m.id as "manager id", CONCAT(m.first_name, " ", m.last_name) AS "manager name", e.id as "employee id", CONCAT(e.first_name, " ", e.last_name) AS employee, r.title as role, d.name as department, r.salary
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON d.id = r.department_id
    WHERE e.manager_id = ?
    ORDER BY e.first_name, e.last_name;`
  }
  // 4: view employees by department
  viewEmployeesByDepartment() {
    return `SELECT d.name as department, e.id as "employee id", CONCAT(e.first_name, " ", e.last_name) AS employee, r.title as role, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee AS e
    LEFT JOIN employee AS m ON m.id = e.manager_id
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON d.id = r.department_id
    WHERE d.id = ?
    ORDER BY e.first_name, e.last_name;`
  }
  // 5: view the total utilized budget of each department
  viewBudgetOfDepartment() {
    return `SELECT d.name as department, SUM(r.salary) as "total salary"
    FROM department AS d
    INNER JOIN role AS r ON d.id = r.department_id
    INNER JOIN employee AS e ON e.role_id = r.id
    GROUP BY d.id
    ORDER BY d.name`
  }
  // 6: add a department
  addDepartment() {
    return `INSERT INTO department(name)
    VALUES (?)`
  }
  // 7: add a role
  addRole() {
    return `INSERT INTO role(title, salary, department_id)
    VALUES (?, ?, ?)`
  }
  // 8: add an employee
  addEmployee() {
    return `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`
  }
  // 9: update an employee role
  updateEmployeeRole() {
    return `UPDATE employee SET role_id=? WHERE id=?`
  }
  // 10: update employee managers
  updateEmployeeManager() {
    return `UPDATE employee SET manager_id=? WHERE id=?`
  }
  // 11: delete department
  deleteDepartment() {
    return `DELETE FROM department WHERE id=?`
  }
  // 12: delete role
  deleteRole() {
    return `DELETE FROM role WHERE id=?`
  }
  // 13: delete employee
  deleteEmployee() {
    return `DELETE FROM employee WHERE id=?`
  }
  // select employees for a query as list with id and name
  getAllEmployees() {
    return `
    SELECT CONCAT(e.id, " : ", e.first_name, " ",e.last_name) as name, e.first_name, e.last_name 
    FROM employee AS e 
    ORDER BY e.first_name, e.last_name`
  }
  // select employees who are managers
  getAllManagers() {
    return `
    SELECT DISTINCT CONCAT(m.id, " : ", m.first_name, " ", m.last_name) as name, m.first_name, m.last_name
    FROM employee as m
    INNER JOIN employee AS e ON e.manager_id = m.id
    ORDER BY m.first_name, m.last_name`
  }
  // select roles for a query as a list with id and name 
  getAllRoles() {
    return `
    SELECT CONCAT(r.id, " : ", r.title) as name, r.title 
    FROM role as r
    ORDER BY r.title`
  }
  // select department for a query as a list with id and name
  getAllDepartments() {
    return `SELECT CONCAT(d.id, " : ", d.name) as name, d.name as dep FROM department as d ORDER BY d.name`
  }
  getId(strValue) {
    let spaceIndex = strValue.indexOf(" ");
    return strValue.substring(0, spaceIndex);
  }
}


module.exports = Query