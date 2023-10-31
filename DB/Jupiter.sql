CREATE TABLE Employee_Job_Title(
  Job_Title_ID  varchar(5),
  Job_Title varchar(50) not null,
  PRIMARY KEY (Job_Title_ID)
);

create table Department(
		Department_Name varchar(50),
        Budget numeric(12,2),
		PRIMARY KEY (Department_Name)
        
);

create table Branch(
	Branch_ID varchar(5),
    Branch_Name varchar(30) not null,
    Address varchar(50),
    Contact_Number varchar(20),
    PRIMARY KEY (Branch_ID)
);

CREATE TABLE Employee_Status(
  Status_ID varchar(5),
  Status_Type varchar(20) not null,
  PRIMARY KEY (Status_ID)
);

create table Organization(
	Registration_No varchar(10),
    Organization_Name varchar (25) not null,
    Address varchar(50) not null,
    PRIMARY KEY (Registration_No)
    );


CREATE TABLE Employee_Pay_Grade(
  Pay_Grade_ID varchar(5),
  Pay_Grade varchar(10) not null,
  No_pay_Leave_Count int,
  Annual_Leave_Count int,
  Casual_Leave_Count int,
  Maternity_Leave_Count int,
  PRIMARY KEY (Pay_Grade_ID)
);

-- CREATE TABLE Employee (
-- Employee_ID VARCHAR(5),
--   Branch_ID varchar(5),
--   Name varchar(100) not null,
--   Birthday date,
--   Marital_status enum('Married','Un-Married','Divorced','Widowed'),
--   Emergency_contact_Number varchar(15),
--   Status_ID varchar(5),
--   Job_Title_ID varchar(5),
--   Pay_Grade_ID varchar(5),
--   Supervisor_ID varchar(5),
--   PRIMARY KEY (Employee_ID),
--   FOREIGN KEY (Job_Title_ID) REFERENCES Employee_Job_Title(Job_Title_ID),
--   FOREIGN KEY (Status_ID) REFERENCES Employee_Status(Status_ID),
--   FOREIGN KEY (Branch_ID) REFERENCES Branch(Branch_ID),
--   FOREIGN KEY (Pay_Grade_ID) REFERENCES Employee_Pay_Grade(Pay_Grade_ID),
--   FOREIGN KEY (Supervisor_ID) REFERENCES Employee(Employee_ID)
-- );

CREATE TABLE Employee (
  Employee_ID varchar(5),
  Branch_ID varchar(5),
  Name varchar(100) not null,
  Birthday date,
  Department varchar(50),
  Gender enum('Male', 'Female'),
  Marital_status enum('Married','Un-Married','Divorced','Widowed'),
  Emergency_contact_Number varchar(15),
  Status_ID varchar(5),
  Job_Title_ID varchar(5),
  Pay_Grade_ID varchar(5),
  Supervisor_ID varchar(5),
  PRIMARY KEY (Employee_ID),
  FOREIGN KEY (Job_Title_ID) REFERENCES Employee_Job_Title(Job_Title_ID),
  FOREIGN KEY (Status_ID) REFERENCES Employee_Status(Status_ID),
  FOREIGN KEY (Branch_ID) REFERENCES Branch(Branch_ID),
  FOREIGN KEY (Department) REFERENCES Department(Department_Name),
  FOREIGN KEY (Pay_Grade_ID) REFERENCES Employee_Pay_Grade(Pay_Grade_ID),
  FOREIGN KEY (Supervisor_ID) REFERENCES Employee(Employee_ID)
);




CREATE TABLE Employee_Leave_Details (
  Employee_ID varchar(5),
  Remaining_Maternity_Leave_Count int,
  Remaining_No_pay_Leave_Count int,
  Remaining_Annual_Leave_Count int,
  Remaining_Casual_Leave_Count int,
  PRIMARY KEY (Employee_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);


CREATE TABLE Leave_Application (
  Leave_Application_No varchar(5),
  Employee_ID varchar(5) not null,
  LeaveType enum('Annual','Casual','Maternity','No-pay'),
  Start_Date date,
  End_Date date,
  Approval_status enum("Pending","Accepted","Rejected"),
  PRIMARY KEY (Leave_Application_No),
  FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);


create table user_account(
		Employee_ID varchar(5),
		user_name varchar(30),
        password varchar(200),
        primary key(Employee_ID),
		foreign key(Employee_ID) references Employee(Employee_ID)
        
);

create table dependants(
		Dependant_ID varchar(5),
        Employee_ID varchar(5),
        Name varchar(50),
        Age int,
        Relationship varchar(20),
        status enum("Student", "Under Graduate", "Post Graduate","Other"),
        primary key(Dependant_ID),
        foreign key(Employee_ID) references Employee(Employee_ID)
        )
;

CREATE VIEW SupervisorsAndSubordinates AS
SELECT
    Sup.Employee_ID AS SupervisorID,
    Sup.Name AS SupervisorName,
    Sub.Employee_ID AS SubordinateID,
    Sub.Name AS SubordinateName
FROM
    Employee Sup
JOIN
    Employee Sub ON Sup.Employee_ID = Sub.Supervisor_ID;


-- create trigger for auto increment Employee_ID
DELIMITER //

CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    -- Calculate the next employeeID
    declare max_ID int;
     SELECT MAX(CAST(SUBSTRING(Employee_ID, 2) AS UNSIGNED)) into max_ID FROM employee;
    if(max_ID is null) then 
    set max_ID = 0;
    end if;
    SET NEW.Employee_ID = CONCAT('E', LPAD((max_ID + 1 ), 3, '0'));
END;

//

DELIMITER ;

-- create trigger for auto increment leave_application_ID
DELIMITER //

CREATE TRIGGER before_LeaveApplication_insert
BEFORE INSERT ON leave_application
FOR EACH ROW
BEGIN
    -- Calculate the next Application Number
    declare max_Application_No int;
    SELECT MAX(CAST(SUBSTRING(Leave_Application_No, 2) AS UNSIGNED)) into max_Application_No from leave_application;
    if(max_Application_No is null) then 
    set max_Application_No = 0;
    end if;
    SET NEW.Leave_Application_No = CONCAT('L', LPAD((max_Application_No + 1  ), 3, '0'));
END;

//
DELIMITER ;

-- function for get the supervisor ID
DELIMITER //
CREATE FUNCTION select_supervisor_ID (SupervisorName VARCHAR(100))
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (SELECT Employee_ID FROM employee WHERE Name = SupervisorName);
END //

DELIMITER ;

-- function for get the paygrade ID
DELIMITER //
CREATE FUNCTION select_payGrade_ID (paygrade VARCHAR(10))
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (SELECT Pay_Grade_ID FROM employee_pay_grade WHERE Pay_Grade = paygrade);
END //

DELIMITER ;

-- function for get the JobTitle ID
DELIMITER //
CREATE FUNCTION select_jobTitle_ID (jobTitle VARCHAR(50))
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (SELECT Job_Title_ID FROM employee_job_title WHERE Job_Title = jobTitle);
END //

DELIMITER ;

-- function for get the status ID
DELIMITER //
CREATE FUNCTION select_status_ID (statusType VARCHAR(20))
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (SELECT Status_ID FROM employee_status WHERE Status_Type = statusType);
END //

DELIMITER ;

-- function for get the branch ID
DELIMITER //
CREATE FUNCTION select_branch_ID (branchName VARCHAR(30))
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (SELECT Branch_ID FROM branch WHERE Branch_Name = branchName);
END //

DELIMITER ;

-- function for get the employee Leave informations according to Paygrade
-- no pay leave count
DELIMITER //
CREATE FUNCTION get_No_pay_Leave_Count (PayGradeID VARCHAR(5))
RETURNS INT
READS SQL DATA
BEGIN
    RETURN (SELECT No_pay_Leave_Count FROM employee_pay_grade WHERE Pay_Grade_ID = PayGradeID );
END //

-- Annual_Leave_Count
CREATE FUNCTION get_Annual_Leave_Count (PayGradeID VARCHAR(5))
RETURNS INT
READS SQL DATA
BEGIN
    RETURN (SELECT Annual_Leave_Count FROM employee_pay_grade WHERE Pay_Grade_ID = PayGradeID );
END //

-- Casual_Leave_Count
CREATE FUNCTION get_Casual_Leave_Count (PayGradeID VARCHAR(5))
RETURNS INT
READS SQL DATA
BEGIN
    RETURN (SELECT Casual_Leave_Count FROM employee_pay_grade WHERE Pay_Grade_ID = PayGradeID );
END //

-- Maternity_Leave_Count

CREATE FUNCTION get_Maternity_Leave_Count (gender varchar(10) , PayGradeID VARCHAR(5))
RETURNS INT
READS SQL DATA
BEGIN
	if gender = 'Male' then 
    return 0 ;
    else 
    RETURN (SELECT Maternity_Leave_Count FROM employee_pay_grade WHERE Pay_Grade_ID = PayGradeID );
    end if;
END //

DELIMITER ;

-- create a procedure to When add employee auto add the username and password

DELIMITER //

CREATE PROCEDURE AddEmployeeAndUserAccount(
    IN Name VARCHAR(255),
    IN birthday date,    
    IN contactNumber varchar(255),    
    In maritalStatus varchar(255),
    IN user_name VARCHAR(255),
    IN password VARCHAR(255),
    IN branchName VARCHAR(30),
    IN statusType VARCHAR(20),
    IN jobTitle VARCHAR(50),
    IN paygrade VARCHAR(10),
    IN SupervisorName VARCHAR(100),
    In department varchar(50),
    In gender Enum("Male","Female")
    
)
BEGIN
    DECLARE newEmployeeID varchar(5);

    -- Add the new employee
    INSERT INTO employee (Name, Birthday, Emergency_contact_Number, Marital_status,Branch_ID,Job_Title_ID,Pay_Grade_ID,Status_ID,Supervisor_ID,Department,Gender) VALUES (Name,birthday,contactNumber,maritalStatus,select_branch_ID(branchName),select_jobTitle_ID (jobTitle),select_payGrade_ID (paygrade),select_status_ID (statusType),select_supervisor_ID (SupervisorName),department,gender);
	set newEmployeeID = CONCAT('E', LPAD((SELECT MAX(CAST(SUBSTRING(Employee_ID, 2) AS UNSIGNED))  FROM employee), 3, '0'));

    -- Add the user account
    INSERT INTO user_account (Employee_ID, user_name, password)
    VALUES (newEmployeeID, user_name, password);
	
    
    -- Add remaining leave count
    INSERT INTO employee_leave_details (Employee_ID, Remaining_No_pay_Leave_Count,Remaining_Maternity_Leave_Count,Remaining_Casual_Leave_Count,Remaining_Annual_Leave_Count)
    VALUES (newEmployeeID, get_No_pay_Leave_Count(select_payGrade_ID(paygrade)),get_Maternity_Leave_Count(gender,select_payGrade_ID(paygrade)),get_Casual_Leave_Count(select_payGrade_ID(paygrade)),get_Annual_Leave_Count(select_payGrade_ID(paygrade)));
    
    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;

DELIMITER //
CREATE FUNCTION getLastEmployeeID()
RETURNS VARCHAR(5)
READS SQL DATA
BEGIN
    RETURN (select CONCAT('E', LPAD((SELECT MAX(CAST(SUBSTRING(Employee_ID, 2) AS UNSIGNED))  FROM employee)+1, 3, '0')));
END //


DELIMITER ;
CREATE 
    ALGORITHM = UNDEFINED 
    SQL SECURITY DEFINER
VIEW `loginwithjobtitle` AS
    SELECT 
        `Employee_ID`,
        `user_name`,
        `password`,
         `Job_Title_ID`
    FROM
        (`user_account`
        JOIN `employee` ON ((`user_account`.`Employee_ID` = `employee`.`Employee_ID`)));


create view GetPersonalInfo as SELECT e.Employee_ID, p.Pay_Grade as Pay_grade,b.Branch_Name, e.Name,e.Birthday,e.Gender,e.Department,e.Marital_status,e.Emergency_contact_Number, es.Status_Type, ej.Job_Title,ej.Job_Title_ID, s.Name as Supervisor_Name FROM employee e join branch b on b.Branch_ID = e.Branch_ID  natural join employee_pay_grade p natural join employee_status es natural join employee_job_title ej  left join employee s on e.Supervisor_ID = s.Employee_ID ;        


-- create a procedure to When add employee auto add the username and password

DELIMITER //

CREATE PROCEDURE UpdateEmployee(
	IN empID varchar(5),
    IN Name VARCHAR(255),
    IN birthday date,    
    IN contactNumber varchar(255),    
    In maritalStatus varchar(255),
    IN branchName VARCHAR(30),
    IN statusType VARCHAR(20),
    IN jobTitle VARCHAR(50),
    IN paygrade VARCHAR(10),
    IN SupervisorName VARCHAR(100),
    In department varchar(50),
    In gender Enum("Male","Female")
    
)
BEGIN
    DECLARE newEmployeeID varchar(5);

    -- Add the new employee
    update employee set Name = Name, Birthday = birthday, Emergency_contact_Number = contactNumber, Marital_status = maritalStatus,Branch_ID = select_branch_ID(branchName),Job_Title_ID = select_jobTitle_ID (jobTitle),Pay_Grade_ID = select_payGrade_ID (paygrade),Status_ID = select_status_ID (statusType),Supervisor_ID= select_supervisor_ID (SupervisorName),Department = department,Gender = gender where Employee_ID = empID;
  COMMIT;
END //



DELIMITER ;

-- create trigger for auto increment dependant ID
DELIMITER //

CREATE TRIGGER before_dependant_insert
BEFORE INSERT ON dependants
FOR EACH ROW
BEGIN
    -- Calculate the next dependant ID
    declare max_ID int;
     SELECT MAX(CAST(SUBSTRING(Dependant_ID, 2) AS UNSIGNED)) into max_ID FROM dependants;
    if(max_ID is null) then 
    set max_ID = 0;
    end if;
    SET NEW.Dependant_ID = CONCAT('D', LPAD((max_ID + 1 ), 3, '0'));
END;

//

DELIMITER ;

-- procedure for reset password
DELIMITER //

CREATE PROCEDURE UpdatePassword(
	IN empID varchar(5),
    IN pass VARCHAR(255)
)
BEGIN
    -- Add the new employee
    update user_account set password = pass where Employee_ID = empID;

  COMMIT;
END //

DELIMITER ;

-- procedure add dependant
DELIMITER //

CREATE PROCEDURE AddDependant(
	IN empID varchar(5),
    IN name VARCHAR(255),
    IN age int,
    IN relationship varchar(20),
    IN statusType varchar(20)
)
BEGIN
    -- Add the new employee
    insert into dependants(Employee_ID,Name,Age,Relationship,status) values (empID,name,age,relationship,statusType);

  COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EditDependant(
    IN name VARCHAR(255),
    IN age int,
    IN relationship varchar(20),
    IN statusType varchar(20),
    In dependant_ID varchar(5)
)
BEGIN
    -- Add the new employee
   	update dependants set Name = name, Age = age, Relationship = relationship , status = statusType where Dependant_ID = dependant_ID;


  COMMIT;
END //

DELIMITER ;