-- 1. Find all students enrolled in the Math Course
select * from students where student_id in (
select student_id from Enrollments 
	where course_id = 
	(select course_id from Courses where course_name='Math'));

-- 2. List all courses taken by students named Bob.
Select course_name from courses where course_id in 
(SELECT course_id from Enrollments where student_id=
(SELECT student_id from Students where student_name='Bob'));


-- 3. Find the names of students who are enrolled in more than one course.
select student_name from Students where student_id in 
(SELECT student_id from Enrollments
GROUP BY student_id
HAVING COUNT(course_id)>1
ORDER BY student_id);

-- 4. List all students who are in Grade A (grade_id = 1)
select student_id, student_name, student_age from Students where 
student_grade_id in (select grade_id from Grades where grade_name = 'A');


-- 5. Find the number of students enrolled in each course
SELECT 
    course_name, 
    (SELECT COUNT(student_id)
     FROM Enrollments 
     WHERE Enrollments.course_id = Courses.course_id) AS student_count
FROM 
    Courses;

-- 6. Retrieve the course with the highest number of enrollments.
SELECT 
    course_name, 
    (SELECT COUNT(student_id) 
     FROM Enrollments 
     WHERE Enrollments.course_id = Courses.course_id) AS student_count
FROM 
    Courses 
ORDER BY 
    student_count DESC 
LIMIT 3;

-- 7. List students who are enrolled in all available courses
SELECT 
    student_name 
FROM 
    Students 
WHERE 
    student_id IN (
        SELECT 
            student_id 
        FROM 
            Enrollments 
        GROUP BY 
            student_id 
        HAVING 
            COUNT(DISTINCT course_id) = (SELECT COUNT(course_id) FROM Courses)
    );

-- 8. Students who are not enrolled in any courses
SELECT 
    student_name 
FROM 
    Students 
WHERE 
    student_id NOT IN (
        SELECT 
            student_id 
        FROM 
            Enrollments
    );


-- 9. Retrieve the average age of students enrolled in the Science course.
SELECT 
    AVG(student_age) 
FROM 
    Students 
WHERE 
    student_id IN (
        SELECT 
            student_id 
        FROM 
            Enrollments 
        WHERE 
            course_id = (SELECT course_id FROM Courses WHERE course_name = 'Science')
    );


-- 10. Find the grade of students enrolled in the History course.
SELECT 
    grade_name 
FROM 
    Grades 
WHERE 
    grade_id IN (
        SELECT 
            student_grade_id 
        FROM 
            Students 
        WHERE 
            student_id IN (
                SELECT 
                    student_id 
                FROM 
                    Enrollments 
                WHERE 
                    course_id = (SELECT course_id FROM Courses WHERE course_name = 'History')
            )
    );

















