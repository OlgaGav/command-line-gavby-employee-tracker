INSERT INTO department (id, name)
VALUES (101, "Marketing"),
       (102, "Finance"),
       (103, "Operations management"),
       (104, "IT"),
       (105, "Sales");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (201, "CEO", 120000, 102),
       (202, "Manager", 100000, 101),
       (203, "Sales specialist", 80000, 105),
       (204, "HR specialist", 75000, 103),
       (205, "IT Engineer", 90000, 104),
       (206, "QA Engineer", 50000, 104),
       (207, "Convention manager", 80000, 103),
       (208, "Technologist", 50000, 105),
       (209, "Operations technician", 90000, 103),
       (210, "Power distributor", 80000, 105);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (301, "Moses", "Haas", 207, null),
       (302, "Amanda", "Jill", 201, null),
       (303, "Judy", "Smith", 208, null),
       (304, "Jesus", "Upshaw", 209, null),
       (305, "Peter", "Evins", 210, null),
       (306, "Corinne", "Keener", 202, null),
       (307, "Samantha", "Forney", 205, null),
       (308, "Celeste", "McClanahan", 206, null),
       (309, "Jennifer", "Hatchett", 203, null),
       (310, "Alan", "Cochran", 205, null),
       (311, "Rene", "Lovelace", 204, null);

-- Update Managers for employees:
UPDATE employee 
SET 
    manager_id = 302
WHERE
    id = 301;

UPDATE employee 
SET 
    manager_id = 306
WHERE
    id = 303;

UPDATE employee 
SET 
    manager_id = 306
WHERE
    id = 304;

UPDATE employee 
SET 
    manager_id = 309
WHERE
    id = 305;

UPDATE employee 
SET 
    manager_id = 302
WHERE
    id = 306;

UPDATE employee 
SET 
    manager_id = 306
WHERE
    id = 307;

UPDATE employee 
SET 
    manager_id = 307
WHERE
    id = 308;

UPDATE employee 
SET 
    manager_id = 306
WHERE
    id = 309;

UPDATE employee 
SET 
    manager_id = 307
WHERE
    id = 310;

UPDATE employee 
SET 
    manager_id = 302
WHERE
    id = 311;