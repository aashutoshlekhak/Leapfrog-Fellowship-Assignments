set search_path to 'Day4AssignmentHome';

create table if not exists employees
(
	first_name VARCHAR(100),
    last_name VARCHAR(100),
    sex CHAR(1),
    doj DATE,
    "current_date" text,
    designation VARCHAR(100),
    age INTEGER,
    salary NUMERIC,
    unit VARCHAR(100),
    leaves_used INTEGER,
    leaves_remaining INTEGER,
    ratings NUMERIC,
    past_exp NUMERIC
);

-- Common Table Expressions (CTEs):
-- CTE Question 1: Calculate the average salary by department for all Analysts.
with avg_salary_of_department as
(select unit, avg(salary) as average_salary from employees group by unit)
select * from avg_salary_of_department; 



-- CTE Question 2: List all employees who have used more than 10 leaves.
with employee_with_multiple_leaves as 
(select first_name, last_name, leaves_used from employees
where leaves_used > 10
)
select * from employee_with_multiple_leaves


-- Views:
-- Question 3: Create a view to show the details of all Senior Analysts.

create view senior_analyst as 
select first_name, last_name, designation from employees
where designation ='Senior Analyst';
select * from senior_analyst;


-- Materialized Views:
-- Question 4: Create a materialized view to store the count of employees by department.
create materialized view employee_count_by_department as 
(select unit as Department, count(*) as Employee_Count from employees 
group by unit)
select * from employee_count_by_department


-- Procedures (Stored Procedures):
-- Question 6: Create a procedure to update an employee's salary by their first name and last name.
create or replace procedure update_employee_salary 
(
	e_first_name varchar(100), 
	e_last_name varchar(100), 
	new_salary numeric
)
language plpgsql
as $$
begin
update employees
	set salary = new_salary
	where first_name = e_first_name and last_name = e_last_name;
end;
$$;
select * from employees
call update_employee_salary('TOMASA', 'ARMEN', 50000);
select * from employees where first_name ='TOMASA';


-- Question 7: Create a procedure to calculate the total number of leaves used across all departments.
create or replace procedure leaves_across_departments()
language plpgsql
as $$
begin
create or replace view temp_leaves as 
select unit as department, sum(leaves_used) as total_leaves from employees group by unit;
end;
$$;

call leaves_across_departments();

select * from temp_leaves;








