USE employee_db;

insert Department (id, department_name) values
(10, "Sales"),
(20, "IT"),
(30, "Finance"),
(40, "HR");

SELECT * FROM Department;

insert Role (id, title, salary, department_id) values
(110, "Sales Manager", 45000, 10),
(111, "Sales Advisors", 30000, 10),
(112, "Sales Support Specialist", 55000, 10),
(113, "UX / UI Designer", 65000, 20),
(114, "Senior Software Developer", 80000, 20),
(115, "IT Project Manager", 70000, 20),
(116, "Accountant", 50000, 30),
(117, "Finance Operations Manager", 85000, 30),
(118, "Finance Assistant", 75000, 30),
(119, "Recruitment Officer", 40000, 40),
(120, "HR Manager", 60000, 40);


SELECT * FROM Role;

insert Employee (id, first_name, last_name, role_id, manager_id) values
(001, "Cade", "Perez", 110, NULL),
(002, "Andrews", "Schultz", 111, 001),
(003, "Anika", "Arnold", 112, 001),
(004, "Nola", "Orozco", 115, NULL),
(005, "Priscilla", "Rebecca", 114, 004),
(006, "Jayson", "Ffion", 113, 004),
(007, "James", "Bond", 116, 008),
(008, "Finnegan", "Angus", 117, NULL),
(009, "Patrick", "Swazy", 118, 008),
(010, "Tara", "Aiden", 119, 011),
(011, "Danielle", "Charles", 120, NULL),
(012, "Dominic", "Oskar", 119, 011),
(013, "Gillian", "Arnold", 119, 011),
(014, "Makai", "Ciaran", 111, 001),
(015, "Bullock", "Arnold", 111, 001);