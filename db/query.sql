USE employee_db;

select * from department;


select d.id,d.departmentname, r.id,r.title, r.salary from department d left join role r on d.id = r.department_id;

select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id; 

select e.id, e.first_name, e.last_name, r.id, r.title, r.salary, d.id, d.departmentname, m.first_name "Manager firstname",m.last_name "Manager Lastname" from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id left join employee m on e.manager_id = m.id;