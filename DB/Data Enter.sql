INSERT INTO Employee_Job_Title (Job_Title_ID, Job_Title)
VALUES
  ('JT001', 'Admin'),
  ('JT002', 'HR Manager'),
  ('JT003', 'Senior Software Engineer'),
  ('JT004', 'Senior QA Engineer'),
  ('JT005','Senior Accountant'),
  ('JT006','Software Engineer'),
  ('JT007','QA Engineer'),
  ('JT008','Accountant'),
  ('JT009','Administrative Officer')
  
  ;
  
  INSERT INTO Department (Department_Name, Budget) 
VALUES 
	('Finance', 250000.00),
    ('Sales and Marketing', 400000.00),
    ('Human Resources', 350000.00),
    ('Customer Service', 200000.00),
    ('Quality Assurance',100000.00);

INSERT INTO Branch (Branch_ID, Branch_Name, Address, Contact_Number) 
VALUES 
    ('B001', 'Sri Lanka', '123 Main Street, Colombo, Sri Lanka', '0112345456'),
    ('B002', 'Pakistan', '456 Elm Street, Lahore, Pakistan', '0213456789'),
    ('B003', 'Bangladesh', '789 Oak Street, Dhaka, Bangladesh', '88029876543');
    
    
-- Sample data for Employee_Status table
INSERT INTO Employee_Status (Status_ID, Status_Type)
VALUES
  ('S001', 'Intern-fulltime'),
  ('S002', 'Intern-Parttime'),
  ('S003', 'Contract-fultime'),
  ('S004', 'Contract-parttime'),
  ('S005', 'Permanent'),
  ('S006', 'Freelance');

-- Sample data for Organization table
INSERT INTO Organization (Registration_No, Organization_Name, Address)
VALUES
  ('OR001', 'Jupiter', '123 Main Street,Colombo,Sri Lanka');


-- Sample data for Employee_Pay_Grade table
INSERT INTO Employee_Pay_Grade (Pay_Grade_ID, Pay_Grade, No_pay_Leave_Count, Annual_Leave_Count, Casual_Leave_Count, Maternity_Leave_Count)
VALUES
  ('PG001', 'Level 1', 50, 10, 8, 15),
  ('PG002', 'Level 2', 50, 19, 8, 14),
  ('PG003', 'Level 3', 50, 15, 6, 10),
  ('PG004', 'Level 4', 50, 11, 10, 12),
  ('PG005', 'Level 5', 50, 12, 7, 11);


 

-- Sample data for Employee table
INSERT INTO Employee (Branch_ID, Name, Department, Gender,Birthday, Marital_status, Emergency_contact_Number, Status_ID, Job_Title_ID, Pay_Grade_ID,Supervisor_ID)
VALUES
 ('B001', 'Kavindu Prabath','Quality Assurance','Male', '1990-05-15', 'Married', '077-1231234', 'S005', 'JT001', 'PG001',null),
 ('B001', 'Kasun Silva','Customer Service','Male', '1985-08-22', 'Un-Married', '0713455432',  'S003', 'JT002', 'PG005',null),
( 'B001', 'Nirasha Jayasinghe','Human Resources','Female' ,'1992-11-10', 'Married', '0723455432',  'S005', 'JT009', 'PG005',null),
( 'B001', 'Nuwan Gamage','Sales and Marketing','Male', '1988-03-30', 'Married', '0776545654',  'S002', 'JT003', 'PG002','E003'),
('B001', 'Sandun Perera','Human Resources' ,'Male','1988-03-31', 'Married', '0776578654',  'S003', 'JT006', 'PG001','E004'),
   
( 'B002', 'John Doe','Quality Assurance','Male', '1990-06-15', 'Married', '123-456-7890', 'S001','JT005', 'PG001','E003'),
('B002', 'Jane Ayere','Customer Service' ,'Female','1985-08-02', 'Un-Married', '987-654-3210','S002', 'JT002', 'PG004',null),
('B002', 'Ahmed Khan','Human Resources','Male' ,'1998-11-11', 'Un-Married', '345-678-9012','S003', 'JT004', 'PG001','E003'),
('B002', 'Sara Ahmed','Quality Assurance' , 'Female','1992-04-30', 'Un-Married', '567-890-1234', 'S004','JT007', 'PG004','E008'),
( 'B002', 'Ali Hassan','Sales and Marketing' ,'Male','1980-07-18', 'Un-Married', '789-012-3456', 'S006','JT009', 'PG003','E003'),
   
( 'B003', 'Mehak Ali', 'Customer Service','Male','1995-12-03', 'Un-Married', '456-789-0123', 'S001', 'JT002', 'PG004',null),
( 'B003', 'Kamran Khan','Quality Assurance','Male' ,'1982-09-28', 'Married', '789-012-3456', 'S003', 'JT009', 'PG001',null),
( 'B003', 'Aisha Malik','Quality Assurance','Female', '1998-02-14', 'Un-Married', '567-890-1234', 'S002', 'JT003', 'PG003','E012'),
( 'B003', 'Ahmad Shah','Customer Service','Male' ,'1987-06-08', 'Divorced', '123-456-7890', 'S003', 'JT006', 'PG002','E013'),
('B003', 'Sana Abbas', 'Sales and Marketing',"Female", '1991-03-25', 'Widowed', '987-654-3210', 'S001', 'JT004', 'PG001','E012');

-- Sample data for Employee_Leave_Details table
INSERT INTO Employee_Leave_Details (Employee_ID,  Remaining_No_pay_Leave_Count, Remaining_Annual_Leave_Count, Remaining_Casual_Leave_Count,Remaining_Maternity_Leave_Count)
VALUES
('E001', 10, 5,5, 0),
('E002', 12, 8, 2, 0),
('E003', 8, 3, 5, 2),
('E004', 15, 6, 2, 0),
('E005', 9, 4, 6, 0),
('E006', 14, 7, 5, 0),
('E007', 11, 5, 3, 1),
('E008', 13, 6, 2, 0),
('E009', 7, 3, 1, 6),
('E010', 16, 8, 3, 0),
 ('E011', 10, 5, 5, 0),
('E012', 12, 8, 2, 0),
('E013', 8, 3, 1, 10),
('E014', 15, 6, 2, 0),
('E015', 9, 4, 6, 9);


INSERT INTO Leave_Application (Leave_Application_No, Employee_ID, LeaveType, Start_Date, End_Date, Approval_status)
VALUES
  ('L001', 'E001', 'Annual', '2023-07-28', '2023-07-31', 'Accepted'),
  ('L002', 'E002', 'Casual', '2023-08-06', '2023-08-07', 'Rejected'),
  ('L003', 'E013', 'Casual', '2023-08-07', '2023-08-10', 'Rejected'),
  ('L004', 'E006', 'Maternity', '2023-08-07', '2023-08-12', 'Accepted'),
  ('L005', 'E009', 'Casual', '2023-08-10', '2023-08-11', 'Accepted'),
  ('L006', 'E012', 'Maternity', '2023-09-20', '2023-09-28', 'Accepted'),
  ('L007', 'E003', 'Annual', '2023-10-17', '2023-10-19', 'Pending');

insert into user_account (Employee_ID , user_name, password)
values ("E001","Kavindu Prabath","$argon2id$v=19$m=65536,t=3,p=4$VFdAskJVqypQ2wcKyC9ZWQ$hPkVcVtJhmgWhgyQa7pY2R3WUN/OzlgV51In+j1or6w");
insert into user_account (Employee_ID , user_name, password)
values ("E002","Kasun Silva","$argon2id$v=19$m=65536,t=3,p=4$YoOq70BhFOdZEKHWm1CGZA$xC4lOXZbr5jSupkudg7nzGDrRLlhcxhilKAsidOh2Cs");
insert into user_account (Employee_ID , user_name, password)
values ("E003","Nirasha Jayasinghe","$argon2id$v=19$m=65536,t=3,p=4$59hWjXMFXudtombrB1TgWw$tU6/E1TGc3EhSI/TtTWWl7JJio7UtJQsnrTcTj73EvU");
insert into user_account (Employee_ID , user_name, password)
values ("E004","Nuwan Gamage","$argon2id$v=19$m=65536,t=3,p=4$uKOn62Xui7PwEgdKzVSqYQ$WCL4qNdyPWKBoAk/tQ8CCY6/Et2YyD5Vt5gIAb9+JLU");
insert into user_account (Employee_ID , user_name, password)
values ("E005","Sandun Perera","$argon2id$v=19$m=65536,t=3,p=4$QYhQIvtTqFd8v8aYVhCCow$Ehik7ay4UW28BhQiUAvg4YAthaA8BPsjb37qKdofqtk");

insert into user_account (Employee_ID , user_name, password)
values ("E006","John Doe","$argon2id$v=19$m=65536,t=3,p=4$lWzVaVQ5uNBT8GnBJxJVwg$n7rkCAxwj1ghom8gCW7ViN+Cr/LCkQWPJ0Nd8sNJyzE");
insert into user_account (Employee_ID , user_name, password)
values ("E007","Jane Ayere","$argon2id$v=19$m=65536,t=3,p=4$lDtB8fd1NVE3+w7s8AuMhQ$wmSh1ajk1pM/PjzbpY3RfIg5qCoYary7nOaY5N/AjPs");
insert into user_account (Employee_ID , user_name, password)
values ("E008","Ahmed Khan","$argon2id$v=19$m=65536,t=3,p=4$mBXMQ7q5ptJYd0y5sKpUKA$YxKox9CPaQpkdTE0HuobuCCuKZKdYH1iLxMVDyrdBE0");
insert into user_account (Employee_ID , user_name, password)
values ("E009","Sara Ahmed","$argon2id$v=19$m=65536,t=3,p=4$YgCJLMi0SbbFGIZbcY7QgA$7x06xGyuOrSrhDEdfg29wIGwk7s5C0Ow+WymvLbU4AQ");
insert into user_account (Employee_ID , user_name, password)
values ("E010","Ali Hassan","$argon2id$v=19$m=65536,t=3,p=4$A4qwtWSz33bu+OlFZADI7w$TGqVRvm42tJE+GAXhH9fGCijcLBqR2X8jEolpZeU6+s");

insert into user_account (Employee_ID , user_name, password)
values ("E011","Mehak Ali","$argon2id$v=19$m=65536,t=3,p=4$gqpFiChnR0Wl1L8N9VZ77g$fvXN5/oHaKToa3n3xS6DZMvsU2801BfmXtfK6avfQUw");
insert into user_account (Employee_ID , user_name, password)
values ("E012","Kamran Khan","$argon2id$v=19$m=65536,t=3,p=4$xzcMDSt+kUbIjKcNcyy4nw$XuXe0QMDnU+zQ8yEPF4CpvdFDIsLnko05AsUbqxw7QI");
insert into user_account (Employee_ID , user_name, password)
values ("E013","Aisha Malik","$argon2id$v=19$m=65536,t=3,p=4$tX3XZbcuGO9trjYtY4KeRQ$N41cyIheS7hsVQOI0M/Kr9mGLPgh7DNFbxCfbHh+SNI");
insert into user_account (Employee_ID , user_name, password)
values ("E014","Ahmad Shah","$argon2id$v=19$m=65536,t=3,p=4$Or7BiDjTqI3DPM38OACLsQ$UblOi+X8SjGEkiNJ5zSEKolKjyj3ShpKfx29jV4Dnn4");
insert into user_account (Employee_ID , user_name, password)
values ("E015","Sana Abbas","$argon2id$v=19$m=65536,t=3,p=4$EDMvzPLuCc73hzUPvR/kGQ$EeyIayS0nxgPvV6AbcsFefrL+Q1ZxB5qSlxVpXK83P8");

INSERT INTO dependants (Dependant_ID, Employee_ID, Name, Age, Relationship, Status)
VALUES
	('D001', 'E002', 'Nimasha Pathum', 10, 'Daughter', 'Student'),
	('D002', 'E002', 'Dilini Prathibha', 8, 'Daughter', 'Student'),
    ('D003', 'E003', 'Kasuni Manchanayake', 11, 'Daughter', 'Student'),
	('D004', 'E005', 'Dilshan Gayashan', 23, 'Son', 'Post Graduate'),
	('D005', 'E008', 'Shoib Ahmad', 9, 'Son', 'Student'),
	('D006', 'E009', 'Nazir Mohomad', 20, 'Son', 'Under Graduate'),
	('D007', 'E011', 'Nasfa Ahmad', 5, 'Daughter', 'Other'),
	('D008', 'E014', 'Muhammad Khan', 14, 'Son', 'Student');

