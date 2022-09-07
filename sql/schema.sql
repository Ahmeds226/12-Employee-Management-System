DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- Department table:
CREATE TABLE Department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (40)
);

-- Role table:
CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (40),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

-- Employee table:
CREATE TABLE Employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id) 
    ON DELETE CASCADE
);