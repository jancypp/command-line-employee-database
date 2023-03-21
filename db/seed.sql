USE employee_db;

INSERT INTO department(departmentname) VALUES
('IT'),
('Accounting'),
('Finance'),
('Operations'),
('Legal'),
('Sales');

INSERT INTO role(title, salary, department_id) VALUES
('Engineering', 150000, 1),
('Accountant', 100000, 2),
('Finance Manager', 120000, 3),
('Operations Manager', 160000, 4),
('Lawyer', 150000, 5),
('Sales Rep', 70000, 6),
('IT Manager', 165000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Jancy', 'Polzkill', 7,null),
('John', 'Smith', 1 , 1),
('Suzy', 'Cue', 4, null),
('Ted', 'Lasso', 5, 3),
('Jan', 'Brady', 6, 3),
('Jimmy', 'Hendrix' ,3, null),
('Brad', 'Pitt', 2, 6);
