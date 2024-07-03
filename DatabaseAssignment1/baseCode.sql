-- -- SCHEMA: Day2Assignment

-- -- DROP SCHEMA IF EXISTS "Day2Assignment" ;

-- CREATE SCHEMA IF NOT EXISTS "Day2Assignment"
--     AUTHORIZATION postgres;


-- -- Drop tables if they exist
-- DROP TABLE IF EXISTS Enrollments;
-- DROP TABLE IF EXISTS Students;
-- DROP TABLE IF EXISTS Courses;
-- DROP TABLE IF EXISTS Grades;

-- -- Create Grades table
-- CREATE TABLE IF NOT EXISTS Grades (
--     grade_id INT PRIMARY KEY,
--     grade_name VARCHAR(10)
-- );

-- -- Insert into Grades table
-- INSERT INTO Grades (grade_id, grade_name) VALUES
-- (1, 'A'),
-- (2, 'B'),
-- (3, 'C');

-- -- Create Students table
-- CREATE TABLE IF NOT EXISTS Students (
--     student_id INT PRIMARY KEY,
--     student_name VARCHAR(50),
--     student_age INT,
--     student_grade_id INT,
--     FOREIGN KEY (student_grade_id) REFERENCES Grades(grade_id)
-- );

-- -- Create Courses table
-- CREATE TABLE IF NOT EXISTS Courses (
--     course_id INT PRIMARY KEY,
--     course_name VARCHAR(50)
-- );

-- -- Insert into Courses table
-- INSERT INTO Courses (course_id, course_name) VALUES
-- (101, 'Math'),
-- (102, 'Science'),
-- (103, 'History');

-- -- Insert into Students table
-- INSERT INTO Students (student_id, student_name, student_age, student_grade_id) VALUES
-- (1, 'Alice', 17, 1),
-- (2, 'Bob', 16, 2),
-- (3, 'Charlie', 18, 1),
-- (4, 'David', 16, 2),
-- (5, 'Eve', 17, 1),
-- (6, 'Frank', 18, 3),
-- (7, 'Grace', 17, 2),
-- (8, 'Henry', 16, 1),
-- (9, 'Ivy', 18, 2),
-- (10, 'Jack', 17, 3);

-- -- Create Enrollments table
-- CREATE TABLE IF NOT EXISTS Enrollments (
--     enrollment_id INT PRIMARY KEY,
--     student_id INT,
--     course_id INT,
--     enrollment_date DATE,
--     FOREIGN KEY (student_id) REFERENCES Students(student_id),
--     FOREIGN KEY (course_id) REFERENCES Courses(course_id)
-- );

-- -- Insert into Enrollments table
-- INSERT INTO Enrollments (enrollment_id, student_id, course_id, enrollment_date) VALUES
-- (1, 1, 101, '2023-09-01'),
-- (2, 1, 102, '2023-09-01'),
-- (3, 2, 102, '2023-09-01'),
-- (4, 3, 101, '2023-09-01'),
-- (5, 3, 103, '2023-09-01'),
-- (6, 4, 101, '2023-09-01'),
-- (7, 4, 102, '2023-09-01'),
-- (8, 5, 102, '2023-09-01'),
-- (9, 6, 101, '2023-09-01'),
-- (10, 7, 103, '2023-09-01');




