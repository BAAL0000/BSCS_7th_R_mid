/* Easy notes (n) and step-by-step examples (x) for Database topics */
window.EASY = Object.assign(window.EASY || {}, {

'db-cat': { n: `## Kinds of databases
Not every database is the same. There are three main families:
- **Relational (RDBMS):** keeps data in tables with fixed columns, like a strict Excel sheet. It follows ACID rules, so data stays correct. Examples: MySQL, Oracle, PostgreSQL.
- **NoSQL:** more flexible. Each record can look different (like JSON documents) and it grows easily across many servers. Examples: MongoDB, Redis, Cassandra.
- **Graph & spatial:** a graph database stores who is linked to whom (like friends on Facebook). Spatial databases store maps and locations. Examples: Neo4j, PostGIS.

## Two kinds of work: OLTP and OLAP
- **OLTP (Online Transaction Processing):** lots of small, fast jobs every second, like ATM withdrawals or online checkout. Tables are normalized (3NF).
- **OLAP (Online Analytical Processing):** a few big questions about old data, like "which month had the highest sales last year?". Uses star/snowflake data warehouses.

## Special databases
- **GIS / spatial:** maps, coordinates, satellite images.
- **Time-series:** sensor readings and stock prices over time.
- **Bioinformatics:** DNA and protein data.
- **Cloud warehouses:** huge storage in the cloud, separate from computing power.`,
  x: `1. You buy a burger with your card. The shop's system saves one small record instantly. This is **OLTP**.
2. At night, the owner asks: "Which burger sold the most this month?" The system reads thousands of old records. This is **OLAP**.
3. The burger chain's delivery app shows riders on a map. That location data lives in a **spatial** database.
4. The app's "customers also liked" links are stored in a **graph** database.`},

'db-basics': { n: `## Data vs information
- **Data** = raw facts with no meaning yet. Example: "98.6".
- **Information** = data with context and meaning. Example: "Patient temperature is 98.6°F (normal)".

## Three words you must not mix up
1. **Database:** the organised collection of related data (the stored data itself).
2. **DBMS:** the software that manages the data, e.g. MySQL. It handles storing, searching, security and recovery.
3. **Database system:** everything together: hardware + DBMS + data + applications.

## Miniworld
The small part of the real world that the database is about, e.g. "our university". When something changes in real life (a teacher submits grades), the database is updated too.

## Metadata
"Data about data." It describes the database: table names, column types, rules and who is allowed to see what. It is stored in the system catalog.`,
  x: `1. A teacher writes "Ali – 85" on paper. That is **data**.
2. The system shows "Ali passed Database with an A". That is **information**.
3. The table that stores all marks is part of the **database**.
4. MySQL, which saves and finds those marks, is the **DBMS**.
5. The note "Marks column = number from 0 to 100" is **metadata**.`},

'db-func': { n: `A DBMS does four main jobs, in this order:
1. **Define (DDL):** decide the design: which tables, which columns, which types, primary and foreign keys.
2. **Construct:** load the first data into the database (bulk loading, building indexes).
3. **Manipulate (DML):** use the data: search it, add, change or delete rows, make reports.
4. **Share & protect:** let many users work at the same time without clashing, and give each user only the permissions they need.

## Behind the scenes
- **Logging:** every change is written to a log first (write-ahead log), so the database can recover after a crash.
- **Query optimizer:** chooses the fastest way to answer each query.
- **Reorganization:** cleans and rearranges data so it stays fast.`,
  x: `Making a library database:
1. **Define:** create table BOOK(BookID, Title, Author).
2. **Construct:** load 5,000 existing books from an Excel file.
3. **Manipulate:** a student searches "Database" and finds 12 books; the librarian adds a new book.
4. **Share & protect:** 50 students search at once; only the librarian can delete books.`},

'db-uni': { n: `This is the main practice example in your lecture: a **university database**.

## Its tables
- **STUDENT** – StudentID, Name, Class, Major
- **COURSE** – CourseNumber, Title, CreditHours, Department
- **SECTION** – SectionID, CourseNumber, Semester, Year, Instructor
- **GRADE_REPORT** – StudentID, SectionID, Grade

## Keys
- **Primary key (PK):** a column that is unique for every row, like StudentID. No two students can have the same ID.
- **Foreign key (FK):** a column that points to a PK in another table. GRADE_REPORT.StudentID points to STUDENT.StudentID. This keeps the tables connected correctly (referential integrity).

## Query and transaction
- A **query** asks a question, e.g. "show Smith's courses and grades".
- A **transaction** is a group of steps that must all happen together, or none of them. Enrolling a student = add a grade row AND reduce one seat.`,
  x: `Enroll student 23 (Brown) in section 112:
1. Start: BEGIN TRANSACTION.
2. Add row (23, 112, NULL) to GRADE_REPORT. The grade is empty for now.
3. Reduce seats in section 112 by 1.
4. COMMIT. Both changes are saved together.
5. If the power fails after step 2, the database undoes step 2, so we never get a student enrolled without a seat being taken.`},

'db-char': { n: `The database approach is better than old file systems because of four features:

1. **Self-describing:** the database stores its own design (in the catalog). So the same DBMS software can run any database: a bank, a school, a hospital.
2. **Program–data independence:** you can change how data is stored without rewriting programs.
   - Logical independence: add a column (like Email) and old queries still work.
   - Physical independence: add an index or move to a faster disk and nothing else changes.
3. **Multiple views:** different users see different parts. A student sees only their own grades; the registrar sees everyone's GPA.
4. **Multi-user concurrency:** hundreds of people can use it at once. Locks and MVCC stop them from damaging each other's work.`,
  x: `1. The university adds an "Email" column to STUDENT.
2. The old "show grades" program never used Email, so it keeps working. That is **logical independence**.
3. Later the IT team moves the database to a new SSD. No program changes. That is **physical independence**.
4. During result day, 500 students check marks at the same time and nothing gets mixed up. That is **concurrency**.`},

'db-actors': { n: `## People who work directly with the database
- **DBA (Database Administrator):** the boss of the database. Gives permissions, checks space, makes backups and plans for disasters.
- **Database designer:** plans the tables, relationships and rules.
- **Application programmers:** build the apps and screens that users use.

## End users (4 types)
- **Naive / parametric:** press fixed buttons for the same tasks every day, e.g. bank teller.
- **Casual:** ask different questions now and then, e.g. a manager.
- **Sophisticated:** experts who understand the DBMS deeply, e.g. data scientist.
- **Standalone:** keep a small personal database with ready-made software, e.g. a personal tax app.

## Workers behind the scene
- **DBMS designers** write the DBMS software itself.
- **Tool developers** build design and testing tools.
- **Operators** look after the servers, network, power and cooling.`,
  x: `In a bank:
1. The **designer** plans the Account and Customer tables.
2. A **programmer** builds the teller screen.
3. The **teller** (naive user) clicks "Deposit" 200 times a day.
4. The branch **manager** (casual user) asks once: "How many new accounts this month?"
5. The **DBA** takes a backup every night and gives the teller only deposit/withdraw permission.`},

'db-adv': { n: `## Why use a DBMS?
- **Less repeated data:** each fact is saved once, so there are no conflicting copies.
- **Correct data:** rules stop bad data, e.g. GPA must be between 0.0 and 4.0; a foreign key can't point to nothing.
- **Recovery:** after a crash, unfinished transactions are undone and finished ones are kept.
- **Standards:** the DBA sets common names and formats for everyone.
- **Faster development:** programmers don't have to write their own file-handling code.

## When NOT to use a big DBMS
- **Too costly** for a small, simple project (licences, servers, DBA salary).
- **Hard real-time systems** like an airplane autopilot can't wait for query processing.
- **Single-user simple programs** work faster with a plain file or SQLite.`,
  x: `1. A university saves a student's address in Admissions AND Accounts. The student moves; only Admissions is updated. Now there are two different addresses.
2. With a DBMS, the address is stored once, so this problem disappears.
3. But a tiny notes app on one phone doesn't need Oracle; a simple file is enough.`},

'db-hist': { n: `## How databases changed over time
1. **1960s – Hierarchical model:** data stored like a family tree (one parent, many children). IBM IMS, used in the Apollo moon programme. Couldn't handle many-to-many links.
2. **Early 1970s – Network model (CODASYL):** a record could have many parents, using pointers. Pointers were fragile.
3. **1970 – Relational model by Edgar F. Codd:** data in simple tables. You say **what** you want; the system works out **how**. IBM System R created SQL. This led to Oracle, DB2 and SQL Server.
4. **1990s – Object-relational:** added object-oriented features, XML/JSON.
5. **2000s – Big data:** Google Bigtable and MapReduce.
6. **2010s – NoSQL:** gave up some ACID rules to scale across many servers (CAP theorem).
7. **Today – Cloud-native distributed SQL:** e.g. Google Spanner, CockroachDB.

## New trends
- **Streaming:** process data live as it arrives (Kafka, Flink).
- **Lakehouse:** cheap cloud storage plus ACID rules (Delta Lake, Snowflake).
- **Vector databases:** store text/images as number vectors for AI search and chatbots (RAG).
- **Future:** self-tuning databases, GPU speed-ups, one engine for all data types.`,
  x: `Imagine storing "students and courses":
1. **Hierarchical:** each student folder contains its courses. A course shared by 100 students is copied 100 times.
2. **Network:** students point to courses with links. Breaking one link breaks the data.
3. **Relational:** a STUDENT table, a COURSE table and an ENROLLS table. Simple and flexible: you just write a SQL query.`},

'db-models': { n: `A **data model** is a way to describe data: its structure, its rules and the operations on it.

There are three levels, from human-friendly to machine-level:
1. **High-level (conceptual):** how people think about the data: entities, attributes, relationships. Drawn as ER or EER diagrams.
2. **Representational (implementation):** close to storage but still understandable, e.g. the relational model (tables). Older ones: network, hierarchical.
3. **Low-level (physical):** how data is saved on disk: files, record formats, indexes. Used by system programmers.`,
  x: `University example at the three levels:
1. **Conceptual:** "Students enroll in courses" (ER diagram with STUDENT, COURSE, ENROLLMENT).
2. **Representational:** tables STUDENT, COURSE and ENROLLS_IN joined by foreign keys.
3. **Physical:** files on disk with a B+-tree index on Student_ID.`},

'db-schema': { n: `- **Schema:** the design of the database: table names, columns and types. It is decided at the start and rarely changes. Also called the **intension**.
- **Schema diagram:** a picture of the schema.
- **State / instance:** the actual data inside right now (a snapshot). It changes all the time. Also called the **extension**.
- **Initial state:** the data when the database is first loaded.
- **Valid state:** a state that follows all the rules of the schema.

The schema is saved as **metadata** in the system catalog.`,
  x: `1. Schema: EMPLOYEE(Name, SSN, Salary). This is fixed.
2. Monday: 1,000 employee rows. This is the state on Monday.
3. Tuesday: 3 people are hired. Now there are 1,003 rows. The state changed, but the schema did not.
4. If someone enters Salary = "abc", that would not be a valid state, so the DBMS rejects it.`},

'db-3schema': { n: `The **three-schema architecture** (ANSI/SPARC) splits a database into three levels so that changes in one level don't break the others.

1. **External level (top):** user views. Each group of users sees only the part they need.
2. **Conceptual level (middle):** the full design of the whole database: entities, relationships, rules. Storage details are hidden.
3. **Internal level (bottom):** how data is physically stored: files, record formats, indexes.

## Mappings (translators between levels)
- **External/conceptual mapping:** links each view to the full design.
- **Conceptual/internal mapping:** links the full design to the storage.`,
  x: `Think of a hotel:
1. **External:** a guest sees only their room; the cook sees only the kitchen. These are views.
2. **Conceptual:** the manager's full floor plan of the whole hotel.
3. **Internal:** the pipes and wires inside the walls.
4. You can change pipes (internal) without changing the floor plan, and guests never notice.`},

'db-indep': { n: `**Data independence** = you can change one level of the database without changing the level above it.

- **Physical data independence:** change the storage (new index, new disk, reorganize files) → the conceptual schema and programs don't change. Easy to achieve.
- **Logical data independence:** change the conceptual schema (add/remove a table or column) → user views and programs don't change. Harder to achieve, because programs often depend on table structure.`,
  x: `1. You add an index on Employee.Salary to make searching faster. Programs don't change. That is **physical** independence.
2. You split EMPLOYEE into EMPLOYEE and EMPLOYEE_CONTACT. You redefine the old view so it still shows everything. Old programs keep working. That is **logical** independence.`},

'db-lang': { n: `## Languages
- **DDL (Data Definition Language):** creates the structure, e.g. CREATE TABLE.
- **VDL:** defines views. **SDL:** defines storage. Most systems now put all of these inside one DDL.
- **DML (Data Manipulation Language):** works with data: SELECT, INSERT, UPDATE, DELETE.
  - **High-level (non-procedural) DML** such as SQL: you say WHAT you want; it returns many rows at once (set-at-a-time).
  - **Low-level (procedural) DML:** you write loops and get one record at a time (record-at-a-time).

## Interfaces (ways to use a DBMS)
- **Menu-based:** pick from lists.
- **Forms-based:** fill in a form.
- **GUI:** click on diagrams.
- **Natural language:** type a normal sentence.
- **Parametric:** fixed buttons for repeated tasks (bank teller).
- **DBA interface:** special commands for accounts, permissions and tuning.
- **Speech and mobile interfaces.**`,
  x: `1. DDL: CREATE TABLE Student(ID INT, Name VARCHAR(50));
2. DML: INSERT INTO Student VALUES (1,'Ali');
3. High-level DML: SELECT Name FROM Student WHERE ID > 0; gives all matching rows in one go.
4. A clerk who knows no SQL uses a **form** with "ID" and "Name" boxes instead.`},

'db-util': { n: `**Utilities** are helper programs that come with the DBMS:
- **Loading:** bring existing files into the database.
- **Backup:** make a safety copy regularly.
- **File reorganization:** rearrange files so they work faster.
- **Performance monitoring:** watch usage and tell the DBA what is slow.

**Other tools:**
- **Data dictionary / repository:** a catalog of all metadata.
- **Application generators:** quickly build forms and reports.
- **CASE tools:** help with design.
- **Communication software:** allows access over a network.`,
  x: `1. A college has student records in Excel. The **loader** imports them.
2. Every night a **backup** copy is made.
3. The **monitor** shows that searching by Name is slow.
4. The DBA adds an index, and then **reorganizes** the file.`},

'db-arch': { n: `- **Centralized:** one big computer does everything (DBMS, programs, interface). Users use simple terminals.
- **Two-tier client/server:** your PC (client) runs the screen and some logic; the database server answers the queries.
- **Three-tier (n-tier):** used by websites.
  1. **Presentation tier:** the browser.
  2. **Application tier:** the web/app server with the business rules.
  3. **Database tier:** the DBMS.
  The user never talks to the database directly, which makes it safer and easier to grow.`,
  x: `Ordering food online:
1. You tap "Order" in the browser (presentation tier).
2. The app server checks the price and your address (application tier).
3. The app server saves the order in the database (database tier).
4. Your browser never touches the database itself.`},

'db-class': { n: `A DBMS can be grouped in six ways:
1. **By data model:** relational, network, hierarchical, object-oriented, object-relational, NoSQL (document, key-value, column, graph).
2. **By number of users:** single-user or multi-user.
3. **By number of sites:** centralized (one place) or distributed (many places). Distributed can be homogeneous (same DBMS everywhere) or heterogeneous (different DBMSs).
4. **By cost:** free/open-source or commercial.
5. **By purpose:** general-purpose or special-purpose (e.g. airline booking).
6. **By workload:** OLTP (many small transactions) or OLAP (big analysis).`,
  x: `Classify MySQL used by a university website:
1. Model: relational.
2. Users: multi-user.
3. Sites: centralized (one server).
4. Cost: free/open-source.
5. Purpose: general-purpose.
6. Workload: mostly OLTP.`},

'db-design': { n: `Designing a database happens in four phases:
1. **Requirements collection and analysis:** talk to users; write down what data they need and what operations they will do.
2. **Conceptual design:** draw an ER/EER diagram of the data.
3. **Logical design (mapping):** turn the diagram into tables for the chosen DBMS (usually relational).
4. **Physical design:** choose storage details: indexes, file organization.

Phases can overlap and be repeated.`,
  x: `Designing a library system:
1. **Ask:** the librarian says "we need books, members and loans".
2. **Draw:** an ER diagram BOOK —borrowed by— MEMBER.
3. **Map:** tables BOOK, MEMBER and LOAN(BookID, MemberID, Date).
4. **Physical:** add an index on Title for fast search.`},

'db-er': { n: `The **ER (Entity-Relationship) model** was created by **Peter Chen in 1976**. It describes data using three things:
- **Entity:** a real-world thing, e.g. a student or a car.
- **Attribute:** a detail of an entity, e.g. name or age.
- **Relationship:** a link between entities, e.g. a student *takes* a course.

## Types of attributes
- **Simple:** can't be split (Age). **Composite:** can be split (Address → Street, City, Zip).
- **Single-valued:** one value (Age). **Multivalued:** many values (Phone numbers).
- **Stored:** saved directly (Birth_Date). **Derived:** calculated from others (Age from Birth_Date).
- **Complex:** composite and multivalued together (several addresses, each with parts).

## NULL
NULL means no value: either "not applicable" (no college degree) or "unknown".`,
  x: `Entity: STUDENT Ali
1. Name = "Ali Khan" → composite (first + last name).
2. Phones = 0300…, 0333… → multivalued.
3. Birth_Date = 2003-05-01 → stored.
4. Age = 23 → derived from Birth_Date.
5. CollegeDegree = NULL → not applicable yet.`},

'db-keys': { n: `- **Entity type:** the category, e.g. EMPLOYEE (with Name, Age, Salary).
- **Entity set:** all the actual employees stored right now.
- **Key attribute:** an attribute that is different for every entity (unique), e.g. SSN or CNIC.
- **Candidate keys:** if more than one attribute could be the key, each one is a candidate key.
- **Value set (domain):** allowed values for an attribute, e.g. Age from 0 to 150.

If an entity type has no key of its own, it is a **weak entity** (next topic).`,
  x: `Entity type STUDENT:
1. Candidate keys: RollNo and CNIC (both unique).
2. We choose RollNo as the key.
3. Name is not a key, because two students can both be "Ahmed".
4. Domain of Semester = 1 to 8.`},

'db-rel': { n: `A **relationship** links entities, e.g. EMPLOYEE *works for* DEPARTMENT.
- **Degree:** how many entity types take part. 2 = binary (most common), 3 = ternary.

## Cardinality ratio (the MAXIMUM)
- **1:1** – one employee manages one department.
- **1:N** – one department has many employees.
- **M:N** – many employees work on many projects.

## Participation (the MINIMUM)
- **Total (double line):** every entity must take part. Every employee must work for a department.
- **Partial (single line):** taking part is optional. Not every employee manages a department.

Cardinality + participation together are called **structural constraints**.`,
  x: `Relationship TEACHES between TEACHER and COURSE:
1. One teacher teaches many courses, and each course has one teacher → **1:N**.
2. Every course must have a teacher → **total** participation on the COURSE side.
3. Some teachers are on research leave and teach nothing → **partial** on the TEACHER side.`},

'db-weak': { n: `A **weak entity** has no key of its own. It is identified by its **owner** entity plus its own **partial key**.

- **Owner (identifying) entity:** the entity it depends on.
- **Identifying relationship:** links the weak entity to its owner. It is always total on the weak side and usually 1:N.
- **Partial key (discriminator):** unique only among the weak entities of the **same** owner.

**Drawing:** double rectangle for the weak entity, double diamond for the identifying relationship, and a dashed underline for the partial key.`,
  x: `1. EMPLOYEE 101 has two children, Ali and Sara. EMPLOYEE 205 also has a child named Ali.
2. "Ali" alone is not unique.
3. DEPENDENT is a weak entity; its partial key is Name.
4. The full key is (EmployeeID + Name): (101, Ali) and (205, Ali) are now different.`},

'db-roles': { n: `- Every entity in a relationship plays a **role**. Usually the role is obvious, so we don't write it.
- In a **recursive relationship**, the same entity type appears twice, so we **must** name the roles.
  - SUPERVISION on EMPLOYEE: one is the **Supervisor**, the other is the **Supervisee**.
- **Relationship attributes:** a relationship can have its own details. Hours belongs to WORKS_ON(Employee, Project), not to either one alone.
  - For 1:1 or 1:N, such an attribute can be moved to one entity (usually the N side).
  - For M:N, it must stay on the relationship.`,
  x: `1. Employee Sara supervises Employee Bilal. Both are EMPLOYEE, so we write roles: Sara = Supervisor, Bilal = Supervisee.
2. Bilal works on Project X for 10 hours and on Project Y for 5 hours.
3. "Hours" depends on the pair (Bilal, X), so it is an attribute of WORKS_ON.`},

'db-notation': { n: `## Chen's ER symbols
- **Rectangle** = entity. **Double rectangle** = weak entity.
- **Oval** = attribute. **Underlined name** = key attribute.
- **Double oval** = multivalued attribute. **Dashed oval** = derived attribute.
- **Diamond** = relationship. **Double diamond** = identifying relationship.
- **Double line** = total participation. **Single line** = partial participation.
- Numbers 1, M, N on the lines show cardinality.

## (min, max) notation
Instead of 1/N, write (min, max) on each line:
- min = 0 → partial participation; min ≥ 1 → total participation.
- max = the upper limit (1 or N).`,
  x: `Draw "Each employee works for exactly one department; a department has 1 or more employees":
1. EMPLOYEE rectangle — WORKS_FOR diamond — DEPARTMENT rectangle.
2. EMPLOYEE side: (1,1), meaning at least 1 and at most 1.
3. DEPARTMENT side: (1,N), meaning at least 1 and many.`},

'db-uml': { n: `**UML class diagrams** are another way to draw data, popular in software engineering.

Differences from ER:
- A UML **class** box has 3 parts: name, attributes and **operations (methods)**. ER has no operations.
- Links are plain **lines** (associations), not diamonds.
- Limits are written as **multiplicities**: 0..1, 1, 0..*, 1..*.
- UML has **no weak-entity symbol**; it uses composition/aggregation instead.
- UML has **inheritance built in** (hollow triangle arrow). Basic ER doesn't; EER adds it.
- ER is made for databases; UML is for general software design.`,
  x: `Same idea in both:
1. ER: [STUDENT] —<ENROLLS>— [COURSE] with M and N.
2. UML: Student box (name, rollNo, + enroll()) —— Course box, with 0..* written at both ends.`},

'db-ternary': { n: `A **ternary relationship** links **three** entity types at once.

- Example: SUPPLY(SUPPLIER, PART, PROJECT) means "this supplier gives this part to this project".
- If you split it into three binary relationships (supplier–part, part–project, supplier–project), you **lose** the exact 3-way fact.
- Constraints are written per pair, e.g. one (Supplier, Part) pair goes to at most one Project.
- **Rule:** use a ternary relationship only when all three must be linked together; otherwise use binary ones.`,
  x: `1. Facts: Ahmed Traders sends bolts to Project A. Khan Ltd sends bolts to Project B.
2. Binary only: we know Ahmed sells bolts, bolts go to A and B, and Ahmed works with A and B.
3. We can no longer tell whose bolts went to B. Ternary SUPPLY keeps the exact facts.`},

'db-eer': { n: `**Problem with basic ER:** instructors, lab attendants and registrars are all employees, so Name, CNIC and HireDate are repeated in three places.

**Solution, EER (Enhanced ER):** add **superclasses** and **subclasses**.
- **Superclass:** the parent with common attributes, e.g. EMPLOYEE(EmpID, Name, Salary).
- **Subclass:** the child with extra attributes, e.g. INSTRUCTOR(HighestDegree, OfficeRank).
- **Inheritance:** the subclass automatically gets all attributes and relationships of the superclass.
- **Golden rule:** an instructor and their employee record are the **same** real person. It is an "IS-A" relationship.`,
  x: `1. EMPLOYEE has EmpID, Name and Salary.
2. INSTRUCTOR IS-A EMPLOYEE and adds HighestDegree.
3. Dr. Ayesha is stored once as an employee and once as an instructor, but she is one person.
4. She inherits Name and Salary and only adds HighestDegree = PhD.`},

'db-specgen': { n: `Two directions to build the same hierarchy:
- **Specialization (top-down):** start with a general class and split it into subclasses. VEHICLE → CAR, TRUCK, MOTORCYCLE.
- **Generalization (bottom-up):** start with separate classes, notice what they share, and join them under a new parent. SAVINGS_ACCOUNT + CHECKING_ACCOUNT → ACCOUNT.

Specialization focuses on **differences**; generalization focuses on **similarities**.`,
  x: `1. **Specialization:** you start with PERSON and split it into STUDENT and TEACHER, because they have different details.
2. **Generalization:** you already have CAR and BIKE tables, see both have RegNo and Owner, and create a parent VEHICLE.`},

'db-constr': { n: `## Disjointness (can an entity be in more than one subclass?)
- **Disjoint (d):** only ONE subclass. A vehicle is a car OR a truck.
- **Overlapping (o):** can be in MANY. An employee can be an engineer AND a project manager.

## Completeness (must every parent be in some subclass?)
- **Total (double line):** YES. Every student is undergraduate or postgraduate.
- **Partial (single line):** NO. Some employees are just general staff.

## Four combinations
Disjoint-Total, Disjoint-Partial, Overlapping-Total, Overlapping-Partial.`,
  x: `STUDENT → {UNDERGRAD, POSTGRAD}:
1. Can one student be both at the same time? No → **disjoint (d)**.
2. Must every student be one of them? Yes → **total**.
3. So the answer is **disjoint-total**.`},

'db-union': { n: `A **union type (category)** is a subclass whose parents are **different, unrelated** entity types.

- Example: the OWNER of a vehicle can be a PERSON, a BANK or a COMPANY.
- These three have no common parent, so normal inheritance doesn't work.
- OWNER = PERSON ∪ BANK ∪ COMPANY.
- **Selective inheritance:** each owner inherits only from the type it really is.
- Drawn with a **circle containing U**.`,
  x: `1. Car 1 is owned by Mr. Ali (a PERSON), so this owner has a CNIC.
2. Car 2 is owned by HBL (a BANK), so this owner has a BranchCode.
3. Both are OWNERs, but each has only its own parent's attributes.`},

'db-relmodel': { n: `In the relational model:
- **Relation** = table.
- **Tuple** = one row (one record).
- **Attribute** = one column.
- **Domain constraint:** values must be the right type and in the allowed range.
- **Entity integrity:** the **primary key can never be NULL**.`,
  x: `Table STUDENT(RollNo, Name, Age):
1. Row (101, 'Ali', 21) is a tuple.
2. Age = 'twenty' breaks the domain constraint (it must be a number).
3. Inserting (NULL, 'Sara', 20) breaks entity integrity, because RollNo is the PK.`},

'db-refint': { n: `- A **foreign key (FK)** in table A points to the primary key of table B.
- **Rule:** an FK value must **exist** in table B, or be **NULL**.
- **Violation:** a student with DeptID 99 when department 99 doesn't exist.

## What happens when a parent row is deleted
- **ON DELETE RESTRICT:** stop the delete.
- **ON DELETE CASCADE:** delete the children too.
- **ON DELETE SET NULL:** keep the children but empty their FK.`,
  x: `The CS department (ID 5) has 3 students. Someone deletes department 5:
1. **RESTRICT:** "Error: students still belong to this department."
2. **CASCADE:** the 3 students are deleted too.
3. **SET NULL:** the 3 students stay, with DeptID = NULL.`},

'db-mapping': { n: `How to turn an ER diagram into tables (6 steps):
1. **Strong entity** → its own table. Break composite attributes into simple columns. Pick a PK.
2. **Weak entity** → its own table. PK = owner's PK + partial key.
3. **1:1 relationship** → put an FK in one table, preferably the one with total participation (fewer NULLs).
4. **1:N relationship** → put the FK on the **N (many)** side.
5. **M:N relationship** → make a **new junction table** with both PKs; together they form its PK.
6. **Multivalued attribute** → new table (OwnerPK, Value); both columns form the PK.`,
  x: `ER: STUDENT (M) —ENROLLS— (N) COURSE, a STUDENT has many Phones, and STUDENT belongs to 1 DEPARTMENT.
1. Tables STUDENT and COURSE (step 1).
2. Many students per department → add DeptID to STUDENT (step 4).
3. M:N enrolls → new table ENROLLS(StudentID, CourseID) (step 5).
4. Phones → new table STUDENT_PHONE(StudentID, Phone) (step 6).`},

'db-eermap': { n: `Four ways to store a superclass/subclass hierarchy in tables:
- **8A:** one table for the superclass + one table per subclass, linked by the same PK. Works for everything (best general choice).
- **8B:** only subclass tables; common columns are repeated. Works ONLY if every entity is in exactly one subclass (total + disjoint).
- **8C:** one big table + a "type" column. Unused columns are NULL. Good for disjoint subclasses with few extra columns.
- **8D:** one big table + yes/no flag columns (is_engineer, is_manager). Best for overlapping subclasses.

**Trade-off:** more tables = more joins; one table = more NULLs.`,
  x: `EMPLOYEE → ENGINEER (Skill), MANAGER (Budget):
1. **8A:** EMPLOYEE(ID, Name), ENGINEER(ID, Skill), MANAGER(ID, Budget).
2. **8C:** EMPLOYEE(ID, Name, Type, Skill, Budget). An engineer has Budget = NULL.
3. **8D:** EMPLOYEE(ID, Name, is_engineer, is_manager, Skill, Budget). Someone can be both.`},

'db-algebra1': { n: `Relational algebra is the maths behind SQL. Three basic operators:
- **σ Selection:** picks **rows** that meet a condition. σ Salary > 50000 (EMPLOYEE).
- **π Projection:** picks **columns**. π Name, Salary (EMPLOYEE). It also removes duplicate rows.
- **ρ Rename:** gives a new name to a table or column, useful when joining a table with itself.

Memory trick: **σ = Select rows, π = Pick columns.**`,
  x: `EMPLOYEE: (Ali, 40000), (Sara, 60000), (Bilal, 70000)
1. σ Salary > 50000 → (Sara, 60000), (Bilal, 70000).
2. π Name of that result → Sara, Bilal.
3. In SQL: SELECT Name FROM EMPLOYEE WHERE Salary > 50000;`},

'db-algebra2': { n: `Set operations combine two tables:
- **Union compatibility:** both tables must have the same number of columns with matching types.
- **Union (R ∪ S):** all rows from both, with no repeats.
- **Intersection (R ∩ S):** only rows found in both.
- **Difference (R − S):** rows in R but not in S.
- **Cartesian product (R × S):** every row of R paired with every row of S. Rows = rows of R × rows of S.`,
  x: `R = {Ali, Sara, Bilal} (cricket club), S = {Sara, Hina} (debate club)
1. R ∪ S = {Ali, Sara, Bilal, Hina}
2. R ∩ S = {Sara}
3. R − S = {Ali, Bilal}
4. R × S gives 3 × 2 = 6 pairs.`},

'db-algebra3': { n: `- **Theta join (⋈θ):** Cartesian product + a condition (any of =, <, >, …).
- **Equijoin:** a theta join that uses only "=".
- **Natural join (*):** automatically joins on columns with the same name and shows that column only once.
- **Division (÷):** answers **"for ALL"** questions: which rows in R match every row in S.`,
  x: `COMPLETED(Student, Course): (Ali, DB), (Ali, OS), (Sara, DB). REQUIRED(Course): (DB), (OS)
1. COMPLETED ÷ REQUIRED: who completed ALL required courses?
2. Ali has DB and OS, so Ali qualifies. Sara has only DB, so she doesn't.
3. Answer = {Ali}.`},

'db-subq': { n: `A **subquery** is a query inside another query.
- **Uncorrelated:** the inner query runs **once**; the outer query uses its answer.
- **Correlated:** the inner query runs **again for every row** of the outer query, because it uses that row's values.
- **EXISTS vs IN:** EXISTS stops as soon as it finds the first match, so it can be faster.`,
  x: `1. Uncorrelated: "Who earns more than the company average?" Calculate the average once (say 50k), then list everyone above 50k.
2. Correlated: "Who earns more than the average of THEIR OWN department?" For Ali in IT, calculate the IT average; for Sara in HR, calculate the HR average; and so on for each row.`},

'db-joins': { n: `- **INNER JOIN:** only rows that match in both tables.
- **LEFT OUTER JOIN:** all rows from the left table; missing right-side values become NULL.
- **RIGHT OUTER JOIN:** all rows from the right table.
- **FULL OUTER JOIN:** all rows from both tables.

To find "departments with zero students", use a LEFT JOIN and look for NULL students.`,
  x: `DEPARTMENT: CS, EE, Math. STUDENT: Ali (CS), Sara (EE).
1. INNER JOIN → (CS, Ali), (EE, Sara).
2. LEFT JOIN (department on the left) → (CS, Ali), (EE, Sara), (Math, NULL).
3. Rows with NULL → Math has zero students.`},

'db-group': { n: `- **GROUP BY:** puts rows with the same value into one group.
- **Aggregate functions:** COUNT, SUM, AVG, MIN, MAX work on each group.
- **WHERE:** filters single rows **before** grouping.
- **HAVING:** filters whole groups **after** grouping.
- **Rule:** you cannot use COUNT/SUM/AVG inside WHERE.`,
  x: `Find departments with more than 50 enrolled students:
1. WHERE Status = 'Enrolled' keeps only enrolled students.
2. GROUP BY DeptID makes one group per department.
3. COUNT(*) counts each group: CS 80, EE 30.
4. HAVING COUNT(*) > 50 keeps only CS.`},

'db-trig': { n: `A **trigger** is an automatic action inside the database. It follows **ECA**:
- **Event:** INSERT, UPDATE or DELETE happens.
- **Condition:** an optional check.
- **Action:** the code that runs.

Types:
- **BEFORE trigger:** checks or fixes data before saving.
- **AFTER trigger:** records what changed (audit).
- **FOR EACH ROW:** runs once per changed row (can use OLD and NEW values).
- **FOR EACH STATEMENT:** runs once per command.`,
  x: `Salary audit trail:
1. **Event:** someone updates Ali's salary from 50k to 60k.
2. **Condition:** has the salary changed? Yes.
3. **Action (AFTER, FOR EACH ROW):** save (Ali, OLD 50k, NEW 60k, user, time) in a SALARY_LOG table.
4. Nobody can change a salary without it being recorded.`},

'db-assert': { n: `- **CHECK constraint:** a rule for one row. CHECK (Salary > 0).
- **ASSERTION:** a rule across many tables, e.g. "a department's total salary can't exceed its budget".
- Most real DBMSs (MySQL, Oracle) don't support full assertions because they are slow.
- In practice, multi-table rules are enforced with **triggers**.`,
  x: `1. Rule "salary can't be negative" → CHECK on the EMPLOYEE table.
2. Rule "IT department's total salary ≤ 1 million budget" needs EMPLOYEE + DEPARTMENT.
3. MySQL has no assertions, so write a trigger that sums the salaries on every update and blocks the update if the total goes over budget.`},

'db-views': { n: `A **view** is a saved query that acts like a virtual table. It shows data from real tables but stores none itself.
- **Security:** hide sensitive columns (show employees without Salary).
- **Simplicity:** hide a long, complex join behind one simple name.
- **Updatable views:** you can insert/update through a view only if it is built on one table with no aggregates.
- **WITH CHECK OPTION:** stops you inserting rows that the view itself wouldn't show.`,
  x: `1. CREATE VIEW cs_students AS SELECT ID, Name FROM STUDENT WHERE Dept='CS' WITH CHECK OPTION;
2. A teacher runs SELECT * FROM cs_students; and sees only CS students, with no fees or CNIC.
3. Someone tries to insert an EE student through this view. It is blocked by CHECK OPTION.`},

'db-ddl': { n: `Changing a live table's structure:
- **ALTER TABLE … ADD COLUMN:** add a new column (give it a DEFAULT).
- **ALTER TABLE … DROP COLUMN:** remove a column. CASCADE also drops dependent views.
- **ALTER TABLE … MODIFY/ALTER COLUMN:** change the type or NULL rule.
- **DROP TABLE … RESTRICT:** fails if other tables still point to it.
- **DROP TABLE … CASCADE:** drops it and removes those links.
- **Warning:** on huge tables these lock the table, so do them in a maintenance window.`,
  x: `1. ALTER TABLE Student ADD Email VARCHAR(100) DEFAULT 'none';
2. ALTER TABLE Student ALTER COLUMN Name VARCHAR(80);
3. DROP TABLE Department RESTRICT; fails because Student.DeptID still points to it.`},

'db-review': { n: `The 4 review questions from Chapter 3, in simple words:
1. **8A vs 8C:** use 8A (separate parent and child tables) for general cases with many child details; use 8C (one table + type column) when children have few extra columns and don't overlap.
2. **Why the FK goes on the N side:** each "many" row points to exactly one parent, so it holds one value. On the "1" side it would need many values in one cell.
3. **WHERE vs HAVING:** WHERE filters rows before grouping; HAVING filters groups after grouping.
4. **AFTER UPDATE audit trigger:** fires automatically after every update and saves the OLD and NEW values, the user and the time in an audit table, so changes can't be hidden.`,
  x: `Practise like the exam:
1. Read each question.
2. Cover the answer and write your own in 3–4 lines.
3. Compare with the answer above and fix what you missed.
4. For Q3, always give a small SQL example with GROUP BY + HAVING.`}
});
