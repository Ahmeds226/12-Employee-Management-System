USE employees_db;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("IT"),
    ("Finance"),
    ("HR");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Manager", 45000, 1),
    ("Sales Advisors", 30000, 1),
    ("Sales Support Specialist", 55000, 1),
    ("UX / UI Designer", 65000, 2),
    ("Senior Software Developer", 80000, 2),
    ("IT Project Manager", 70000, 2),
    ("Accountant", 50000, 3),
    ("Finance Operations Manager", 85000, 3),
    ("Finance Assistant", 75000, 3),
    ("Recruitment Officer", 40000, 4),
    ("HR Manager", 60000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Andrews", "Schultz", 1, 1),
    ("Anika", "Arnold", 1, 1),
    ("Nola", "Orozco", 1, NULL),
    ("Priscilla", "Rebecca", 4, 2),
    ("Jayson", "Ffion", 3, 2),
    ("James", "Bond", 1, 2),
    ("Finnegan", "Angus", 1, NULL),
    ("Patrick", "Swazy", 1, 3),
    ("Tara", "Aiden", 1, 3),
    ("Danielle", "Charles", 3, NULL),
    ("Dominic", "Oskar", 3, 1),
    ("Gillian", "Arnold", 2, NULL),
    ("Makai", "Ciaran", 1, 1),
    ("Bullock", "Arnold", 2, NULL);