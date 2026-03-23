-- drop table if exists tscore cascade;
-- drop table if exists pscore cascade;
-- drop table if exists tregister cascade;
-- drop table if exists pregister cascade;
-- drop table if exists evaluate cascade;
-- drop table if exists judge cascade;
-- drop table if exists support cascade;
-- drop table if exists sponsors cascade;
-- drop table if exists assign cascade;
-- drop table if exists allocated cascade;
-- drop table if exists expenses cascade;
-- drop table if exists volunteers cascade;
-- drop table if exists team cascade;
-- drop table if exists participants cascade;
-- drop table if exists equipments cascade;
-- drop table if exists event cascade;
-- drop table if exists fest cascade;

----------------------------- table creation -------------------------------------
-- FEST:
create table fest
(
  fest_id        varchar(10),
  fest_name      varchar(50) not null,
  start_date     date not null,
  end_date       date not null,
  year           numeric(4,0) check (year >= 2000 and year < 2100),
  primary key (fest_id),
  check (end_date >= start_date)
);

-- EQUIPMENTS
create table equipments
(
  equipment_id     varchar(10),
  name             varchar(50) not null,
  type             varchar(30),
  current_condition varchar(30) default 'Good',
  primary key (equipment_id)
);

-- EVENT 
create table event
(
  event_id        varchar(10),
  time_venue      varchar(80),   -- as per image "Time Venue"
  date            date,
  category        varchar(30),
  short_desc      varchar(200),
  event_name      varchar(80),
  fest_id         varchar(10),
  primary key (event_id),
  foreign key (fest_id) references fest(fest_id)
    -- on delete set null?
    on delete cascade
);

-- VOLUNTEERS linked to event
create table volunteers
(
  volunteer_id  varchar(10),
  event_id      varchar(10) not null, -- kya isko bhi PK hona chahiye?
  email         varchar(80),
  name          varchar(60),
  department    varchar(40),
  phone_number  varchar(20),
  primary key (volunteer_id),
  foreign key (event_id) references event(event_id)
    on delete cascade
);

-- EXPENSES per event
create table expenses
(
  expense_id     varchar(12),
  event_id       varchar(10) not null,
  amount_spend   numeric(10,2) check (amount_spend >= 0),
  expense_desc   varchar(200),
  primary key (expense_id),
  foreign key (event_id) references event(event_id)
    on delete cascade
);

-- ALLOCATED equipment to events (link table)
create table allocated
(
  event_id       varchar(10),
  equipment_id   varchar(10),
  allocate_event_name varchar(80),
  how_long       interval,
  primary key (event_id, equipment_id),
  foreign key (event_id) references event(event_id)
    on delete cascade,
  foreign key (equipment_id) references equipments(equipment_id)
    on delete restrict
);

-- ASSIGN volunteers to events with role and shift
create table assign
(
  volunteer_id   varchar(10),
  event_id       varchar(10),
  shift_timings  varchar(40),
  assignment_role varchar(40),
  primary key (volunteer_id, event_id),
  foreign key (volunteer_id) references volunteers(volunteer_id)
    on delete cascade,
  foreign key (event_id) references event(event_id)
    on delete cascade
);

-- SPONSORS master
create table sponsors
(
  sponsor_id     varchar(10),
  sname          varchar(80) not null,
  company        varchar(80),
  sponsorship_type varchar(40),
  contact_details varchar(120) not null,
  primary key (sponsor_id)
);

-- SUPPORT: sponsor supports an event (distribution)
create table support
(
  event_id        varchar(10),
  sponsor_id      varchar(10),
  contact_date    date,
  amount_distributed numeric(12,2) check (amount_distributed >= 0),
  primary key (event_id, sponsor_id),
  foreign key (event_id) references event(event_id)
    on delete cascade,
  foreign key (sponsor_id) references sponsors(sponsor_id)
    on delete cascade
);

-- JUDGE master
create table judge
(
  judge_id        varchar(10),
  contact_number  varchar(20),
  organisation    varchar(80),
  jname           varchar(60),
  designation     varchar(50),
  primary key (judge_id)
);

-- EVALUATE: which judge evaluates which event
create table evaluate
(
  event_id    varchar(10),
  judge_id    varchar(10),
  primary key (event_id, judge_id),
  foreign key (event_id) references event(event_id)
    on delete cascade,
  foreign key (judge_id) references judge(judge_id)
    on delete cascade
);

-- TEAM master
create table team
(
  team_id     varchar(10),
  team_leader varchar(60),
  team_name   varchar(60) unique,
  primary key (team_id)
);

-- PARTICIPANTS master (individuals)
create table participants
(
  participant_id varchar(10),
  dob            date,
  phone_no       varchar(20),
  department     varchar(40),
  gender         varchar(10) check (gender in ('Male','Female','Other')),
  pname          varchar(60),
  pemail         varchar(80),
  primary key (participant_id)
);

-- PREGISTER: individual registration for an event
create table pregister
(
  event_id        varchar(10),
  participant_id  varchar(10),
  fee_paid        numeric(10,2) check (fee_paid >= 0),
  registration_date date,
  primary key (event_id, participant_id),
  foreign key (event_id) references event(event_id)
    on delete cascade,
  foreign key (participant_id) references participants(participant_id)
    on delete cascade
);

-- TREGISTER: team registration for an event
create table tregister
(
  event_id     varchar(10),
  team_id      varchar(10),
  fee_paid     numeric(10,2) check (fee_paid >= 0),
  registration_date date,
  primary key (event_id, team_id),
  foreign key (event_id) references event(event_id)
    on delete cascade,
  foreign key (team_id) references team(team_id)
    on delete cascade
);

-- PSCORE: judge gives score to a participant
create table pscore
(
  judge_id       varchar(10),
  participant_id varchar(10),
  remark         varchar(200),
  score          numeric(5,2) check (score >= 0 and score <= 100),
  primary key (judge_id, participant_id),
  foreign key (judge_id) references judge(judge_id)
    on delete cascade,
  foreign key (participant_id) references participants(participant_id)
    on delete cascade
);

-- TSCORE: judge gives score to a team
create table tscore
(
  judge_id   varchar(10),
  team_id    varchar(10),
  remark     varchar(200),
  score      numeric(5,2) check (score >= 0 and score <= 100),
  primary key (judge_id, team_id),
  foreign key (judge_id) references judge(judge_id)
    on delete cascade,
  foreign key (team_id) references team(team_id)
    on delete cascade
);

----------------------------- insertion -------------------------------------

delete from tscore;
delete from pscore;
delete from tregister; 
delete from pregister;
delete from evaluate; 
delete from judge; 
delete from support; 
delete from sponsors;
delete from assign; 
delete from allocated; 
delete from expenses; 
delete from volunteers;
delete from team; 
delete from participants; 
delete from equipments; 
delete from event; 
delete from fest; 

-- FEST (10)
insert into fest values
('F25','TechFest','2025-01-15','2025-01-17',2025),
('F24','TechFest','2024-01-12','2024-01-14',2024),
('C25','Cultural Gala','2025-02-20','2025-02-22',2025),
('S25','Sports Week','2025-03-10','2025-03-16',2025),
('M25','Management Meet','2025-04-05','2025-04-06',2025),
('A25','Art Fiesta','2025-05-01','2025-05-03',2025),
('H25','Health Camp','2025-06-07','2025-06-08',2025),
('E25','Entrepreneur Day','2025-07-12','2025-07-12',2025),
('R25','Research Expo','2025-08-18','2025-08-19',2025),
('G25','Green Drive','2025-09-05','2025-09-05',2025);

-- EQUIPMENTS (10)
insert into equipments values
('EQ01','Projector','AV','Good'),
('EQ02','Speaker Set','Audio','Good'),
('EQ03','Wireless Mic','Audio','Excellent'),
('EQ04','LED Wall','AV','Service'),
('EQ05','Laptop','IT','Good'),
('EQ06','Extension Box','Utility','Good'),
('EQ07','Spotlight','Lighting','Good'),
('EQ08','Mixer','Audio','Good'),
('EQ09','Podium','Furniture','Good'),
('EQ10','Camera','AV','Good');

-- EVENT (10)
insert into event values
('E101','09:00 Hall A','2025-01-15','Tech','Keynote','Opening Keynote','F25'),
('E102','11:00 Hall B','2025-01-15','Tech','Panel','AI Panel','F25'),
('E103','15:00 Arena','2025-01-16','Cultural','Dance','Group Dance','C25'),
('E104','10:00 Stadium','2025-03-11','Sports','Track','100m Sprint','S25'),
('E105','13:00 Hall C','2025-04-05','Biz','Pitch','Startup Pitch','E25'),
('E106','14:00 Lab 1','2025-08-18','Research','Demos','Lab Demos','R25'),
('E107','16:00 Hall D','2025-02-21','Cultural','Music','Solo Singing','C25'),
('E108','09:30 Grounds','2025-03-12','Sports','Team','Football Semis','S25'),
('E109','12:00 Hall E','2025-05-02','Art','Workshop','Watercolor 101','A25'),
('E110','10:30 Hall F','2025-09-05','Env','Talk','Sustainability Talk','G25');

-- VOLUNTEERS (10)
insert into volunteers values
('V001','E101','v1@fest.org','Arjun','CSE','900000001'),
('V002','E101','v2@fest.org','Meera','ECE','900000002'),
('V003','E102','v3@fest.org','Kiran','ME','900000003'),
('V004','E103','v4@fest.org','Riya','CIV','900000004'),
('V005','E104','v5@fest.org','Dev','EEE','900000005'),
('V006','E105','v6@fest.org','Anu','MBA','900000006'),
('V007','E106','v7@fest.org','Rohit','CSE','900000007'),
('V008','E107','v8@fest.org','Sara','IT','900000008'),
('V009','E108','v9@fest.org','Ishan','CIV','900000009'),
('V010','E109','v10@fest.org','Neha','ART','900000010');

-- EXPENSES (10)
insert into expenses values
('X001','E101',12000,'Stage setup'),
('X002','E101',3500,'Refreshments'),
('X003','E102',5000,'Panel logistics'),
('X004','E103',8000,'Costumes'),
('X005','E104',4000,'Track markings'),
('X006','E105',7000,'AV rental'),
('X007','E106',6000,'Posters'),
('X008','E107',3000,'Mics'),
('X009','E108',9500,'Referee & kits'),
('X010','E109',2500,'Art supplies');

-- ALLOCATED (10)
insert into allocated values
('E101','EQ01','Opening Keynote','2 hours'),
('E101','EQ02','Opening Keynote','2 hours'),
('E102','EQ08','AI Panel','3 hours'),
('E103','EQ07','Group Dance','4 hours'),
('E104','EQ06','100m Sprint','1 hour'),
('E105','EQ05','Startup Pitch','3 hours'),
('E106','EQ10','Lab Demos','5 hours'),
('E107','EQ03','Solo Singing','3 hours'),
('E108','EQ09','Football Semis','3 hours'),
('E109','EQ04','Watercolor 101','6 hours');

-- ASSIGN (10)
insert into assign values
('V001','E101','08:00-12:00','Stage Manager'),
('V002','E101','08:00-12:00','Hospitality'),
('V003','E102','10:00-14:00','Mic Desk'),
('V004','E103','14:00-18:00','Backstage'),
('V005','E104','09:00-11:00','Track Marshal'),
('V006','E105','12:00-16:00','Registration'),
('V007','E106','13:00-18:00','Demo Support'),
('V008','E107','15:00-18:00','Emcee Support'),
('V009','E108','08:00-12:00','Logistics'),
('V010','E109','10:00-16:00','Workshop Helper');

-- SPONSORS (10)
insert into sponsors values
('S001','Alpha Corp','Alpha Corp','Gold','alpha@corp.com'),
('S002','Beta Ltd','Beta Ltd','Silver','beta@ltd.com'),
('S003','Gamma Media','Gamma Media','Media','gm@media.com'),
('S004','Delta Tech','Delta Tech','Tech','dt@tech.com'),
('S005','Echo Foods','Echo Foods','Food','ef@foods.com'),
('S006','Foxtrot Bank','Foxtrot Bank','Banking','fb@bank.com'),
('S007','Globe Sports','Globe Sports','Sports','gs@sports.com'),
('S008','Helio Health','Helio Health','Health','hh@health.com'),
('S009','Indigo Paints','Indigo Paints','Art','ip@paints.com'),
('S010','Jupiter Energy','Jupiter Energy','Green','je@energy.com');

-- SUPPORT (10)
insert into support values
('E101','S001','2024-12-20',50000),
('E101','S003','2024-12-22',15000),
('E102','S004','2024-12-25',20000),
('E103','S009','2025-01-25',8000),
('E104','S007','2025-02-20',12000),
('E105','S006','2025-03-01',18000),
('E106','S004','2025-07-20',10000),
('E107','S001','2025-02-10',7000),
('E108','S007','2025-03-05',15000),
('E110','S010','2025-08-15',9000);

-- JUDGE (10)
insert into judge values
('J001','911111111','Tech Univ','Dr. Kapoor','Professor'),
('J002','922222222','StartUp Hub','Ms. Rao','Investor'),
('J003','933333333','Arts Guild','Mr. Sen','Artist'),
('J004','944444444','Sports Assoc','Coach Vikram','Coach'),
('J005','955555555','MediaNet','Anita','Journalist'),
('J006','966666666','Music Board','Harish','Composer'),
('J007','977777777','Health Org','Dr. Iyer','Physician'),
('J008','988888888','Research Lab','Dr. Bose','Scientist'),
('J009','999999999','Environment NGO','Rina','Director'),
('J010','900000000','Cultural Council','Megha','Curator');

-- EVALUATE (10)
insert into evaluate values
('E101','J001'),
('E105','J002'),
('E103','J003'),
('E104','J004'),
('E107','J006'),
('E108','J004'),
('E106','J008'),
('E109','J003'),
('E110','J009'),
('E102','J001');

-- TEAM (10)
insert into team values
('T001','Priya','CodeCrafters'),
('T002','Nikhil','DataWaves'),
('T003','Ananya','StepUp'),
('T004','Kabir','Fast & Fit'),
('T005','Rakesh','PitchPerfect'),
('T006','Ira','LabRats'),
('T007','Raman','MelodyMakers'),
('T008','Zoya','GoalGetters'),
('T009','Leena','BrushStrokes'),
('T010','Tarun','GreenGuard');

-- PARTICIPANTS (10)
insert into participants values
('P001','2004-01-01','8011111111','CSE','Male','Arjun','arjun@example.com'),
('P002','2003-05-12','8022222222','ECE','Female','Meera','meera@example.com'),
('P003','2002-09-20','8033333333','ME','Male','Kiran','kiran@example.com'),
('P004','2001-11-11','8044444444','CIV','Female','Riya','riya@example.com'),
('P005','2000-03-03','8055555555','EEE','Male','Dev','dev@example.com'),
('P006','2003-07-07','8066666666','MBA','Female','Anu','anu@example.com'),
('P007','2004-02-14','8077777777','CSE','Male','Rohit','rohit@example.com'),
('P008','2002-12-30','8088888888','IT','Female','Sara','sara@example.com'),
('P009','2001-06-25','8099999999','CIV','Male','Ishan','ishan@example.com'),
('P010','2004-08-08','8000000000','ART','Female','Neha','neha@example.com');

-- PREGISTER (10)
insert into pregister values
('E101','P001',0,'2024-12-28'),
('E101','P002',0,'2024-12-28'),
('E102','P003',0,'2024-12-29'),
('E103','P004',200,'2025-01-26'),
('E104','P005',0,'2025-02-25'),
('E105','P006',500,'2025-03-20'),
('E106','P007',0,'2025-08-05'),
('E107','P008',150,'2025-02-15'),
('E108','P009',0,'2025-03-06'),
('E109','P010',300,'2025-04-20');

-- TREGISTER (10)
insert into tregister values
('E101','T001',0,'2024-12-28'),
('E102','T002',0,'2024-12-29'),
('E103','T003',500,'2025-01-26'),
('E104','T004',0,'2025-02-25'),
('E105','T005',1000,'2025-03-20'),
('E106','T006',0,'2025-08-05'),
('E107','T007',300,'2025-02-15'),
('E108','T008',0,'2025-03-06'),
('E109','T009',400,'2025-04-20'),
('E110','T010',0,'2025-08-15');

-- PSCORE (10)
insert into pscore values
('J001','P001','Clear talk',92.5),
('J001','P002','Good delivery',88.0),
('J003','P004','Graceful',90.0),
('J004','P005','Fast start',84.0),
('J002','P006','Strong pitch',91.0),
('J008','P007','Innovative demo',86.0),
('J006','P008','Melodic',89.5),
('J004','P009','Solid defense',78.0),
('J003','P010','Creative',93.0),
('J001','P003','Insightful',87.0);

-- TSCORE (10)
insert into tscore values
('J001','T001','Clean code',90.0),
('J001','T002','Strong data story',88.5),
('J003','T003','Synchronized',92.0),
('J004','T004','Photo finish',85.0),
('J002','T005','Investor ready',91.5),
('J008','T006','Great prototype',87.0),
('J006','T007','Harmony',89.0),
('J004','T008','Teamwork',82.0),
('J003','T009','Color work',94.0),
('J009','T010','Impactful',90.5);

------------------------------------------------------------------------------------------------