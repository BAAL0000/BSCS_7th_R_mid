/* Fuller easy notes for Database topics (replace the short "Easy notes"). Simple words, more detail. */
(function(){
const N = {

'db-cat': `## What is this topic about?
Not all databases are built the same way. Different jobs need different kinds of databases. This topic gives you **three families** of databases, **two kinds of work** (OLTP and OLAP), and some **special areas** where databases are used.

## 1. The three families of databases
**Relational databases (RDBMS)**
- Data is kept in **tables** (rows and columns), like a very strict Excel sheet.
- Every row in a table has the **same columns**.
- They follow **ACID** rules, so data stays correct even when many people use it at once.
- Examples: **PostgreSQL, Oracle, MySQL**.
- Best for: banks, universities, shops, hospitals.

**NoSQL databases**
- Data is kept as **flexible JSON documents** or **key–value pairs**.
- Records don't all need the same fields.
- They grow **horizontally**: you add more servers when data grows.
- Examples: **MongoDB, Cassandra, Redis**.
- Best for: social media, chat apps, very large websites.

**Graph and spatial databases**
- **Graph** databases store **nodes** (things) and **edges** (links) and can follow links very fast.
- **Spatial** databases store **locations and shapes** (coordinates, polygons).
- Examples: **Neo4j, Amazon Neptune, PostGIS**.
- Best for: "people you may know", maps, route finding.

## 2. Two kinds of work: OLTP vs OLAP
**OLTP – Online Transaction Processing**
- **Goal:** lots of real-time record updates.
- **Queries:** fast, simple lookups.
- **Design:** highly normalized tables (3NF).
- **Examples:** e-commerce checkout, ATM transactions.

**OLAP – Online Analytical Processing**
- **Goal:** study old (historical) data to find patterns.
- **Queries:** big, complex summaries over huge data (terabytes).
- **Design:** star schema, snowflake schema, columnar data warehouses.
- **Examples:** management dashboards, seasonal sales trends.

## 3. Special database domains
- **GIS & spatial:** coordinates, polygons, satellite images.
- **Time-series:** values recorded over time, like IoT sensors or stock-market prices.
- **Bioinformatics:** DNA sequences and protein structures.
- **Cloud warehouses:** huge storage in the cloud where storage and computing are separate ("lakehouse").

## Key words
RDBMS · NoSQL · Graph · ACID · OLTP · OLAP · 3NF · Star/snowflake schema`,

'db-basics': `## What is this topic about?
Before learning databases, you must know a few basic words. This topic explains **data vs information**, the **three parts of a database system**, the **miniworld** and **metadata**.

## Data vs information
- **Raw data** = facts with no meaning yet. Example: "09152026", "98.6", "404".
- **Information** = data that is organised and given **context**, so it means something. Example: "Patient temperature: 98.6°F (normal)".
- A database stores **data**; when we query it and present it well, we get **information**.

## The database system triad (3 parts)
1. **Database:** a logically connected collection of **saved (persistent) related data** that represents the current state of the miniworld.
2. **DBMS (Database Management System):** general software that **manages** the data: storage, queries, access control (security) and recovery after failures. Examples: MySQL, Oracle.
3. **Database system:** the **whole environment** together: hardware + DBMS software + stored data + client applications.

## Miniworld (Universe of Discourse)
- The **small part of the real world** that the database is about, e.g. a university.
- When something changes in that real world (e.g. **student grades are submitted**), the database must be **updated** so it stays true.

## Metadata (the data catalog)
- Metadata = **"data about data"**.
- The DBMS stores a full **description** of the database inside itself, in the **catalog**.
- It includes: **table structures, data types, constraints (rules), user permissions** and **physical file mappings**.

## Key words
Data · Information · Database · DBMS · Database system · Miniworld · Metadata · Catalog`,

'db-func': `## What is this topic about?
A DBMS does **four main jobs**, one after another, and also keeps the database **safe and fast** in the background.

## The four functional pillars
**Stage 1 – Data Definition (DDL)**
- Decide data types, integrity rules (constraints) and storage structures.
- Create table structures and column **domains** (allowed values).
- Create **primary keys** and **foreign keys**.

**Stage 2 – Data Construction**
- Load the **first data** onto disk (persistent storage).
- **Bulk-load** data from outside files.
- Allocate disk blocks and **build B-tree indexes**.

**Stage 3 – Data Manipulation (DML)**
- **Query** the data, **update** records and **make reports**.
- Get records using **SQL queries**.
- **Insert, update and delete** rows, also in large batches.

**Stage 4 – Sharing & Protection**
- Control **many users at the same time** (concurrency).
- Stop **unauthorized access**.
- **Isolation** so users don't spoil each other's work (no race problems).
- **Permissions** for each user role.

## Maintenance, recovery and optimization (background work)
- **Automated logging:** every transaction is written in a **write-ahead log before it is committed**, so the database can recover exactly after a crash.
- **Query optimizer:** a **cost-based optimizer** chooses the **fastest plan** (which join order, which index).
- **Reorganization:** defragmentation, table "vacuuming" and statistics updates keep the database fast.

## Key words
DDL · Construct · DML · Concurrency · Isolation · Write-ahead log · Query optimizer · B-tree index`,

'db-uni': `## What is this topic about?
Your lecture uses one **university database** as an example. It shows how real data is split into tables, how rows look, how a query asks a question, and how a transaction keeps data correct.

## The four tables (entities)
| Table | Columns |
| STUDENT | StudentID, Name, Class, Major |
| COURSE | CourseNumber, Title, CreditHours, Department |
| SECTION | SectionID, CourseNumber, Semester, Year, Instructor |
| GRADE_REPORT | StudentID, SectionID, LetterGrade |

## What each table means
- **STUDENT:** one row per student.
- **COURSE:** one row per course (e.g. "Database Systems").
- **SECTION:** one row each time a course is taught (same course, different semester).
- **GRADE_REPORT:** one row per student per section, holding the grade.

## Sample rows (tuples)
- STUDENT: (17, Smith, Senior, CS) and (23, Brown, Sophomore, CS).
- GRADE_REPORT: (17, 112, B) means student 17 got **B** in section 112; (23, 119, A) means student 23 got **A** in section 119.

## Keys
- **Primary key (PK)** makes each row unique (StudentID in STUDENT).
- **Foreign key (FK)** connects tables (StudentID in GRADE_REPORT points to STUDENT). This is **referential integrity**.

## A query
"Show Smith's transcript": join STUDENT and GRADE_REPORT on StudentID, keep only Smith, show CourseNumber and Grade.

## A transaction
Enrolling a student needs **two steps**: add a GRADE_REPORT row **and** reduce the seats in that section by one. Both are put inside **BEGIN TRANSACTION … COMMIT**, so either **both happen or neither** happens.

## Key words
Entity · Tuple · Primary key · Foreign key · Referential integrity · Query · Transaction · COMMIT`,

'db-char': `## What is this topic about?
Why is the **database approach** better than keeping data in separate files? Because of **four characteristics**.

## 1. Self-describing nature
- The database stores **its own description** (schema) in the **system catalog / data dictionary**.
- So the DBMS software doesn't need fixed code for "university courses" or "bank ledgers"; it **reads the catalog at runtime** to check every request.
- **Catalog driven:** one DBMS works for any schema.
- **Uniform querying:** you can query the catalog tables just like normal tables.
- **Versus files:** old file programs **hard-code byte positions** inside their code.

## 2. Program–data independence
- **Logical data independence:** change the conceptual design without rewriting user views or programs. Example: adding an optional **student email** column; old queries still work.
- **Physical data independence:** change the storage without changing the design or queries. Example: adding a **B-tree index**, or moving data from **HDD to NVMe SSD**.

## 3. Support for multiple views
- Different users need **different parts** or **summaries** of the data.
- A **student** sees only their own grades; the **registrar** sees GPA across all departments.

## 4. Multi-user concurrency
- **Hundreds of users** can work at the same time without corrupting the data (no race conditions).
- **Locking** and **MVCC (multi-version concurrency control)** keep transactions isolated.

## Key words
Self-describing · Catalog · Logical independence · Physical independence · Views · Concurrency · Locking · MVCC`,

'db-actors': `## What is this topic about?
Many **people** are involved with a database. Some use it directly ("actors on the scene"), and some build and run the system ("workers behind the scene").

## Actors on the scene
- **Database Administrator (DBA)** – *operational governor*: looks after the system, **assigns privileges**, plans **storage capacity** and **disaster recovery**.
- **Database Designer** – *schema architect*: finds the **entities, relationships and constraints** and **normalizes** the design.
- **Application Programmers** – *interface engineers*: build the **client apps, APIs** and ready-made ("canned") transactions for end users.

## End users (four types)
- **Naive / parametric:** run the same fixed transactions using **buttons**. Example: bank tellers, airline agents.
- **Casual:** use the database **now and then** with **different questions** each time. Example: middle managers, researchers.
- **Sophisticated:** understand the DBMS **deeply** and build advanced models. Example: data scientists, financial quants.
- **Standalone:** keep a **personal database** with ready-made software. Example: personal tax or photo catalog apps.

## Workers behind the scene
- **DBMS system designers:** write the DBMS software itself (kernel, disk buffer manager, SQL parser).
- **Tool developers:** make extra tools: schema design tools, GUI profilers, benchmark suites.
- **Operators & maintenance staff:** run the **server hardware, network switches, cooling** and **automatic failover power**.

## Key words
DBA · Designer · Programmer · Naive · Casual · Sophisticated · Standalone · Behind the scene`,

'db-adv': `## What is this topic about?
The **benefits** of using a DBMS, and the cases when a **heavy DBMS is a bad idea**.

## Advantages
**Controlling redundancy (repeated data)**
- Each fact is stored **only once**, so different departments never hold **different values** for the same thing.
- Saves **storage space** and removes **update anomalies** (one copy changed, the other not).

**Enforcing integrity constraints**
- The DBMS **automatically blocks wrong data**.
- Data types and limits, e.g. **GPA must be between 0.0 and 4.0**.
- **Referential integrity** stops "orphan" foreign keys (pointing to nothing).

**Automated recovery**
- After a crash, the recovery system **rolls back unfinished transactions** and **re-applies committed ones**.

**Standardization**
- The DBA sets **common naming rules**, data dictionary standards and display formats for everyone.

**Rapid development**
- Programmers don't write low-level file or index code; they focus on the **business application**.

## When NOT to use a heavy DBMS
- **High cost:** licences, big server memory and DBA salaries cost more than the benefit for simple projects.
- **Strict real-time deadlines:** hard real-time embedded systems (e.g. a **flight autopilot**) cannot wait for query parsing.
- **Single-user simplicity:** a desktop program with **no sharing** runs faster with flat files or **SQLite**.

## Key words
Redundancy · Update anomaly · Integrity constraint · Referential integrity · Recovery · Standardization`,

'db-hist': `## What is this topic about?
How databases **developed over time**, from the 1960s to today, and what is coming next.

## Early era
- **1960s – Hierarchical model (mainframes):** data in a strict **tree** (one parent → many children). Used by **IBM IMS** (Apollo space programme). **Could not handle many-to-many links** directly.
- **Early 1970s – Network model (CODASYL):** a record can have **many parents** using **pointers**. Standardized by **CODASYL DBTG**. Pointers were **fragile** and hard to manage.

## The relational revolution
- **1970 – Dr. Edgar F. Codd** proposed the **relational model**: data in **tables**, separate from physical pointers, based on maths (**first-order predicate logic**).
- Users say **WHAT** data they want; the **optimizer** decides **HOW** to get it.
- **Late 1970s–1980s – IBM System R** proved relational systems really work and created **SEQUEL** (later **SQL**). This led to **Oracle, DB2 and SQL Server**.

## Modern waves
- **1990s – Object-relational:** fixed the gap with object-oriented programming; added **user types and XML/JSON**.
- **2000s – Web & big data:** **Google Bigtable** and **MapReduce** started open-source distributed computing.
- **2010s – NoSQL:** gave up strict **ACID** to scale across many servers (**CAP theorem**).
- **Present – Cloud-native distributed SQL:** e.g. **Spanner, CockroachDB**, with global consistency.

## Modern frontiers
- **Real-time streaming:** processing endless events with time windows (**Apache Kafka, Apache Flink**).
- **Data lakehouse:** cheap cloud storage + ACID rules (**Delta Lake, Apache Iceberg, Snowflake**).
- **Vector databases:** text, audio and images turned into long number lists (e.g. **1536 numbers**); fast similar-item search (**HNSW**); **RAG** feeds facts into AI chatbots (LLMs).

## The next decade
- **Autonomous (self-driving) databases:** AI creates indexes, sets buffer sizes, fixes bad SQL.
- **Hardware acceleration:** queries on **GPUs, FPGAs**, CXL memory, for near-zero delay.
- **Multi-model:** one engine for relational, document, graph and vector data.`,

'db-models': `## What is a data model?
A **data model** is a set of ideas (concepts) used to describe a database:
- its **structure** (data types, relationships),
- its **constraints** (rules that must be true),
- and usually basic **operations** (how to get and change data).
Some models also describe **behaviour**, like user-defined operations or **triggers**.

## The three categories (from user-friendly to machine-level)
**1. High-level (conceptual) models**
- Use ideas close to how **people** think: **entities, attributes, relationships**.
- Examples: the **ER model** and the **Enhanced ER (EER)** model.

**2. Representational (implementation) models**
- Still understandable to users, but close to how data is really stored.
- The **relational model** is the main example today. Older ones: **network** and **hierarchical** models.

**3. Low-level (physical) models**
- Describe how data is stored as **files**: record formats, field order and **access paths such as indexes**.
- Used mainly by **system programmers**, not normal users.

## One example at all three levels
- **Conceptual:** entity types STUDENT, COURSE, ENROLLMENT.
- **Representational:** tables STUDENT, COURSE, ENROLLS_IN linked by foreign keys.
- **Physical:** indexed files on disk with a **B+-tree index on Student_ID**.`,

'db-schema': `## The big idea
Every database has two different things:
1. a **design** that is fixed, and
2. the **actual data**, which changes all the time.
Database language keeps these two **clearly separate**.

## The words
- **Database schema:** the **description** of the database: names of data types (tables) and their details. Decided during design and **rarely changed**. Also called the **intension**.
- **Schema diagram:** a **picture** of the schema (entity types and their attributes).
- **Database state / instance:** the **actual data** at one moment, like a **snapshot**. Also called the **extension**.
- **Initial state:** the state when the database is **first loaded**.
- **Valid state:** a state that follows the **structure and all the constraints** of the schema. Every state after loading should stay valid.

## Example
- "EMPLOYEE has Name, SSN and Salary" is part of the **schema**; it changes only if the database is redesigned.
- The thousands of actual employee rows stored right now form the **current state**; it changes every time someone is hired or leaves.

## Why it matters
- The DBMS **checks every state against the schema**.
- The schema itself is saved as **metadata** in the **system catalog (data dictionary)**, separate from the data.`,

'db-3schema': `## What is it?
The **three-schema architecture** (from the **ANSI/SPARC** report) splits a database into **three levels**.

## Why was it made?
1. To keep **user applications separate** from the **physical database**.
2. So each user group sees data at the **right level of detail**.
3. So a **change at one level disturbs the others as little as possible**.

## The three levels
**External level (top) – user views**
- Made of many **external schemas (views)**.
- Each view shows only the part **one user group** needs and **hides the rest**.

**Conceptual level (middle) – community schema**
- One **conceptual schema** for the **whole database**, for all users.
- Describes **entities, data types, relationships, operations and constraints**.
- **Hides storage details**. Usually written in a representational model (relational).

**Internal level (bottom) – physical storage**
- The **internal schema**, written with a physical model.
- Describes **complete storage details**: record formats, field order, **indexes (access paths)**.

## The two mappings (translators)
- **External/conceptual mapping:** tells the DBMS how each **view** relates to the full design, so the **design can change without changing every view**.
- **Conceptual/internal mapping:** tells how a conceptual record is **stored on disk**, so **storage can change without changing the design**.

## Main benefit
These mappings give us **data independence** (next topic).`,

'db-indep': `## Definition
**Data independence** = you can **change the schema at one level** without having to change the schema at the **next higher level**. It is the main benefit of the three-schema architecture.

## Type 1: Logical data independence
- You **change the conceptual schema** (the design) and **external views and programs don't need to change**.
- The design may **grow** (add a new record type or data item) or **shrink**.
- Only the **view definitions and the external/conceptual mapping** are updated.
- **Example:** splitting EMPLOYEE into **EMPLOYEE** and **EMPLOYEE_CONTACT**. Views can be redefined to hide the split, so most programs keep working.

## Type 2: Physical data independence
- You **change the internal schema** (storage) and the **conceptual schema doesn't change**.
- Changes like **reorganizing files, adding indexes, changing storage devices** are absorbed by the **conceptual/internal mapping**.
- **Example:** adding a **B+-tree index on Employee.Salary** to speed up searches; no program needs rewriting.

## Which is harder?
**Logical** independence is **harder** to achieve, because programs are often written to depend closely on the **exact table structure** they use.

## Key words
Logical independence · Physical independence · Mapping · Conceptual schema · Internal schema`,

'db-lang': `## What is this topic about?
Once a database is designed, we need **languages** to define it and to work with its data, and **interfaces** so different kinds of users can use it.

## DBMS languages
- **DDL – Data Definition Language:** used by the **DBA and designers** to define the conceptual and internal schemas (e.g. CREATE TABLE).
- **VDL – View Definition Language:** defines **views** (external level).
- **SDL – Storage Definition Language:** defines the **internal schema** (storage).
- Most modern DBMSs **merge DDL, VDL and SDL into one DDL**.

**DML – Data Manipulation Language** (works with the data)
- **High-level (non-procedural) DML:** you say **WHAT** you want, not HOW. **SQL** is the standard example. Can be used **interactively** or **embedded** in a programming language. It is **set-oriented**: one statement can return **many records**.
- **Low-level (procedural) DML:** must be **embedded** in a programming language; gets **one record at a time** and needs **loops**. Also called **record-at-a-time** DML.

## DBMS interfaces (for different users)
- **Menu-based:** pick from lists (web browsing).
- **Forms-based:** fill in fields on a form (for users who don't know a query language).
- **Graphical (GUI):** schema shown as a diagram; point and click.
- **Natural language:** type a request in everyday language; it is translated to a query.
- **Parametric users:** e.g. bank tellers using a small fixed set of operations with **buttons or function keys**.
- **DBA interfaces:** special commands to **create accounts, set parameters, grant/revoke privileges, tune performance**.
- **Speech input/output** and interfaces for **mobile and special devices**.`,

'db-util': `## What is this topic about?
Besides answering queries, a DBMS comes with **utilities** (helper programs) and works with other **tools**.

## Utilities that come with a DBMS
- **Loading:** loads existing data files (e.g. **flat text files**) into the database, sometimes **changing formats** on the way.
- **Backup:** makes a **regular backup copy**, usually on **separate storage**, so the database can be **recovered after a failure**.
- **File reorganization:** changes a file into a **different file organization** to **improve performance**.
- **Performance monitoring:** watches how the database is used and gives **statistics to the DBA**, who decides things like **which indexes to build**.

## Other tools (not always from the same company)
- **Data dictionary / repository:** stores **schema descriptions and other metadata**; can itself be **queried like a small database**.
- **Application generators:** automatically create programs for common jobs like **data entry, updates and reports**.
- **CASE tools (Computer-Aided Software Engineering):** used in the **early design stages**.
- **Communication software:** lets users reach the DBMS **over a network**.`,

'db-arch': `## What is this topic about?
**Where** the database software runs and **how users connect** to it.

## Centralized DBMS architecture
- **Everything on one system:** DBMS software, hardware, application programs and the user interface.
- Users connected through **terminals with no processing power** of their own.
- Later, smarter terminals or **PCs** could prepare data locally before sending it to the central machine.

## Client/server architectures
- **Clients** run the **user interface** and local application logic.
- **Servers** hold the **DBMS** and answer **queries and transactions** from many clients.

**Two-tier architecture**
- The **client talks directly** to the database server.
- **File-server style (older):** the server only sends files; most processing happens on the client.
- **Database-server style (common today):** the server does **query processing and transaction management**; the client handles the interface and some logic.

**Three-tier (n-tier) architecture** – typical for **web applications**
1. **Presentation tier:** the browser / user interface.
2. **Application (business-logic) tier:** an **application server** with the business rules.
3. **Database tier:** the DBMS.
- **Better security:** clients **never talk to the database directly**.
- **Easier to scale:** add more servers when users grow.`,

'db-class': `## What is this topic about?
DBMSs can be **grouped (classified)** in **six different ways**.

## 1. By data model
- **Relational** (most common today).
- **Network** and **hierarchical** (mostly old / legacy).
- **Object-oriented** and **object-relational**.
- **NoSQL families:** **document, key-value, column-family, graph**.

## 2. By number of users
- **Single-user** (common on personal computers).
- **Multi-user** (normal for organizations).

## 3. By number of sites
- **Centralized:** all data at **one site**.
- **Distributed:** data spread over **many sites**.
  - **Homogeneous:** the **same DBMS** everywhere.
  - **Heterogeneous:** **different DBMSs** at different sites.

## 4. By cost
From **free and open-source** (MySQL, PostgreSQL) to **expensive commercial** systems whose price grows with features, size and support.

## 5. By access-path options (purpose)
- **General-purpose** DBMSs for any job.
- **Special-purpose** systems built for one job, e.g. **airline reservations**, which trade flexibility for speed.

## 6. By intended workload
- **OLTP:** many short read/write transactions.
- **OLAP / data warehousing:** large, mostly-read analytical queries.`,

'db-design': `## What is this topic about?
Building a database application involves **two activities**:
1. **Database design:** deciding the **structure** of the database itself.
2. **Application (program) design:** designing the **programs and transactions** that use and update it.
This topic focuses on the **first one**.

## The four phases of database design
**Phase 1 – Requirements collection and analysis**
- Designers **interview future users** to understand and **write down their data needs**, including expected **constraints**.
- **Functional requirements** (the operations and transactions the system must do) are collected **alongside** the data requirements.

**Phase 2 – Conceptual design**
- Use the requirements to make a **conceptual schema**, usually a diagram in the **ER or EER model**.
- It describes the data clearly: types, relationships and constraints.
- It can be **checked against the functional requirements** to make sure it supports them.

**Phase 3 – Logical design (data model mapping)**
- Convert the conceptual schema into the **implementation model** of the chosen DBMS, usually the **relational model** (tables).

**Phase 4 – Physical design**
- Decide **internal storage structures, file organizations, indexes, access paths** and other physical settings.

## Important note
The phases are **not always strictly one after another**. Conceptual and logical design are often **revisited and improved together**, and some methods map ER directly to tables in one combined step.

## Output of each phase
Requirements list → ER/EER diagram → relational tables → indexes and storage plan.`,

'db-er': `## What is the ER model?
- The **Entity–Relationship (ER) model** describes data using **three ideas**: **entities, attributes and relationships**.
- It was proposed by **Peter Chen in 1976**.
- It gives a **high-level, conceptual** picture of an organization's data, **independent of how it will be built**, shown as an **ER diagram**.
- Most database design tools are built around it.

## Entities
An **entity** is a real-world **thing or object** with its own existence, different from every other object. Examples: a particular employee, a car, a house.

## Attributes (the details of an entity)
**Simple vs composite**
- **Simple (atomic):** can't be divided. Example: **Age**.
- **Composite:** can be split into meaningful parts. Example: **Address → Street, City, Zip**; **Name → First, Middle, Last**.

**Single-valued vs multivalued**
- **Single-valued:** one value per entity. Example: Age.
- **Multivalued:** several values at once. Example: several **phone numbers** or **college degrees**.

**Stored vs derived**
- **Stored:** saved directly. Example: **Birth_Date**.
- **Derived:** calculated from another attribute. Example: **Age** from Birth_Date. The stored one used for the calculation is called the **prerequisite**.

**Complex attributes:** composite and multivalued **nested together**, e.g. a person with **several addresses**, each split into parts.

## NULL values
NULL means "no value":
- **Not applicable:** e.g. College_Degree for someone without a degree.
- **Unknown:** either it **exists but wasn't recorded**, or **we don't know whether it exists**.`,

'db-keys': `## Entity type vs entity set
- **Entity type:** a group of entities that share the **same attributes**. Described by a **name and its list of attributes**. Example: **EMPLOYEE** with Name, Age, Address, Salary.
- **Entity set:** **all the entities** of that type stored in the database **right now** (its current state).
- In practice people often use these two words to mean the same thing.

## Key attribute
- An attribute (or a group of attributes) whose value is **different for every entity**.
- This is called a **uniqueness constraint**.
- Example: **SSN** is a natural key for EMPLOYEE, because **Name alone might not be unique**.

## Candidate keys
- Some entity types have **more than one possible key**.
- Each possible key is called a **candidate key**. Example: a student can be identified by **RollNo** or by **CNIC**.

## Value set (domain)
- The set of values that may **legally** be given to an attribute.
- Example: **Age** could be the integers from **0 to 150**.

## What if there is no key?
Some entity types have **no key of their own**. They can't be identified by their own attributes alone. They are **weak entity types** (next topics).`,

'db-rel': `## Relationship words
- **Relationship:** an **association** between two or more entities. Example: an employee **works for** a department.
- **Relationship instance:** **one** such link between specific entities. Example: Ali works for IT.
- **Relationship type:** the **general set** of such links. Example: **WORKS_FOR** relates EMPLOYEE to DEPARTMENT.

## Degree
- The **number of entity types** that take part.
- **Binary** = 2 (most common). **Ternary** = 3. Higher ones are called **n-ary**.

## Structural constraint 1: Cardinality ratio (the MAXIMUM)
How many relationship instances an entity can be part of, **at most**:
- **1:1** – an EMPLOYEE manages at most one DEPARTMENT, and a DEPARTMENT has at most one manager.
- **1:N** – one DEPARTMENT has many EMPLOYEEs, but each EMPLOYEE works for one DEPARTMENT.
- **M:N** – an EMPLOYEE can work on many PROJECTs, and a PROJECT can have many EMPLOYEEs.

## Structural constraint 2: Participation (the MINIMUM)
Does an entity **have to** take part?
- **Total participation (existence dependency):** **every** entity must take part. Example: every EMPLOYEE must work for a department. Drawn with a **double line**.
- **Partial participation:** taking part is **optional**. Example: not every EMPLOYEE manages a department. Drawn with a **single line**.

Cardinality ratio + participation together = **structural constraints**.`,

'db-weak': `## What is a weak entity type?
An entity type that **does not have enough attributes of its own to form a key**. It is identified by being **related to an entity of another type** (its **owner**) plus some of its **own** attribute values.

## The three parts you must know
**1. Owner (identifying) entity type**
- The entity type that the weak entity **depends on** for identification.

**2. Identifying relationship**
- Links the weak entity to its owner.
- Always **total participation** on the weak side (a weak entity can't be identified without its owner).
- Usually **1:N**: one owner can have many weak entities; each weak entity has **exactly one** owner.

**3. Partial key (discriminator)**
- The attribute(s) that are unique **only among the weak entities of the same owner**, not across the whole set.

## Example
- **DEPENDENT**(Name, Birth_date, Relationship) is a weak entity owned by **EMPLOYEE** through **DEPENDENTS_OF**.
- Dependent's **Name** is the **partial key**: unique among one employee's dependents, but two employees might both have a child named "Ali".
- Full identity = **owner's key + partial key** (EmployeeSSN + Name).

## How to draw it
- Weak entity → **double-outlined rectangle**.
- Identifying relationship → **double-outlined diamond**.
- Partial key → **dashed underline**.`,

'db-roles': `## Roles
- Every entity type in a relationship plays a **role** in it.
- Most of the time role names are just **helpful documentation**.
- They become **essential** in **recursive relationships**, where the **same entity type takes part more than once** in different roles.

## Recursive relationship example
- **SUPERVISION** on EMPLOYEE: one employee plays **"Supervisor"**, the other plays **"Supervisee"**.
- Without role names, you couldn't tell **which employee supervises which**.

## Attributes of relationship types
- A relationship type can have its **own attributes**, just like an entity type.
- Example: in the **M:N** relationship **WORKS_ON** between EMPLOYEE and PROJECT, the attribute **Hours** (hours per week an employee works on a project) belongs to the **relationship**, not to EMPLOYEE or PROJECT alone.

## Where can a relationship attribute go?
- **1:1 or 1:N:** it can usually be **moved (migrated)** to one of the entity types, normally the one on the **N side**, without losing information.
- **M:N:** it **must stay on the relationship**; otherwise the link between one specific pair and its value would be lost.`,

'db-notation': `## Chen's ER diagram symbols
**Entities**
- **Rectangle** → entity type (a set of similar objects, e.g. EMPLOYEE).
- **Double rectangle** → **weak** entity type (no key of its own).

**Attributes**
- **Oval** → attribute (a property, e.g. Name).
- **Oval with underlined name** → **key** attribute.
- **Double oval** → **multivalued** attribute.
- **Dashed oval** → **derived** attribute (e.g. Age from Birth_date).

**Relationships**
- **Diamond** → relationship type.
- **Double diamond** → **identifying** relationship (weak entity ↔ owner).

**Participation**
- **Double line** → **total** participation (every entity must take part).
- **Single line** → **partial** participation (optional).

## Lines and labels
- Lines connect entities to their **attributes**, and entities to the **relationships** they take part in.
- **Cardinality labels (1, M, N)** are written on the lines near each entity type.

## The (min, max) notation (another method)
- Each line gets a pair **(min, max)**.
- **min = 0** → partial participation; **min ≥ 1** → total participation.
- **max = 1 or N** → the most relationship instances that entity can be part of.`,

'db-uml': `## What is UML?
The **Unified Modeling Language (UML)** is a general modelling language used across **software engineering**. Its **class diagrams** are the closest thing to ER diagrams, but because UML is for software in general (not just databases), there are differences.

## ER vs UML: the differences
- **Basic shape:** ER uses an entity rectangle with just the name; UML uses a **class** rectangle split into **name, attributes and operations**.
- **Links:** ER uses a **diamond** joined by lines; UML uses a **plain line (association)** directly between classes.
- **Limits:** ER uses cardinality (1, M, N) or (min,max); UML uses **multiplicities** like **0..1, 1, 0..*, 1..*** at each end.
- **Behaviour:** ER shows **no behaviour** (only structure); UML classes list **operations (methods)**.
- **Weak entities:** ER has the double rectangle/diamond; UML has **no special symbol** and uses **composition or aggregation**.
- **Inheritance:** not in basic ER (added later in **EER**); UML has it **built in** with a **hollow-triangle arrow** (generalization).
- **Typical use:** ER is for **database** design; UML is for **general software** design.`,

'db-ternary': `## Higher-degree relationships
- Most relationships are **binary** (2 entity types).
- The ER model also allows **ternary** (3) and **n-ary** relationships, where **more than two** entity types are linked at once.

## Example: SUPPLY
- **SUPPLY** links **SUPPLIER, PART and PROJECT**.
- One instance means: "**this supplier** gives **this part** to **this project**."

## Why not just split it into three binary relationships?
- If you use SUPPLIER–PART, PART–PROJECT and SUPPLIER–PROJECT separately, you know which suppliers deal in which parts and which parts go to which projects.
- But you **lose the exact three-way fact**: which supplier actually supplied **which part** to **which project**.
- So a set of binary relationships may **not capture the same information or constraints**.

## Constraints on n-ary relationships
- They are stated **per pair**. Example: a given (Supplier, Part) pair is linked to **at most one** Project, while a supplier can still have many parts and projects overall.

## Design rule
Use an n-ary relationship **only when all the entity types truly must be linked together at the same time**; otherwise prefer **simpler binary** relationships.`,

'db-eer': `## Why basic ER is not enough (the hierarchy problem)
1. **Limitation:** basic ER treats all entities as **flat, separate boxes**.
2. **Reality:** at a university, an **INSTRUCTOR**, a **LAB ATTENDANT** and a **REGISTRAR** are all **EMPLOYEES**.
3. **Problem:** repeating **Name, CNIC and HireDate** in three tables is a **maintenance nightmare**.
4. **Solution:** **Enhanced ER (EER)** adds **superclasses and subclasses**.

## Superclass and subclass ("IS-A" relationship)
- **Superclass (parent):** holds the **common** attributes. Example: EMPLOYEE (EmpID, Name, Salary).
- **Subclass (child):** holds its **own extra** attributes. Example: INSTRUCTOR (HighestDegree, OfficeRank).
- We say "an INSTRUCTOR **IS-A** EMPLOYEE".

## Type inheritance
A subclass entity **automatically inherits every attribute and every relationship** of its superclass. You don't repeat them.

## The golden rule
An entity in a subclass is the **exact same real-world person/thing** as its superclass record. Dr. Ayesha the instructor and Dr. Ayesha the employee are **one person**, stored at two levels.`,

'db-specgen': `## Two directions, same result
There are **two opposite ways** to build a superclass/subclass hierarchy. Both reach the **same design**.

## Specialization (top-down)
- **Start** with one **general** group.
- **Break it down** into distinct subclasses based on **different features**.
- **Example:** start with **VEHICLE** and carve out **CAR, TRUCK and MOTORCYCLE**.

## Generalization (bottom-up)
- **Start** with **separate** groups.
- **Notice what they share** and combine them under **one new parent**.
- **Example:** look at **SAVINGS_ACCOUNT** and **CHECKING_ACCOUNT** and create the parent **ACCOUNT**.

## Takeaway
- **Specialization refines differences.**
- **Generalization consolidates (joins) commonalities.**`,

'db-constr': `## Two kinds of constraints on a hierarchy
### 1. Disjointness constraint – can one entity be in more than one subclass?
- **Disjoint (symbol 'd'):** an entity can belong to **at most ONE** subclass. Example: a vehicle is **either** a CAR **or** a TRUCK, never both.
- **Overlapping (symbol 'o'):** an entity can belong to **MANY** subclasses at the same time. Example: at an engineering firm, an EMPLOYEE can be **both** an ENGINEER **and** a PROJECT_MANAGER.
- **Design rule:** use **d** when roles are mutually exclusive; use **o** when roles can mix.

### 2. Completeness constraint – must every parent be in a subclass?
- **Total specialization (double line):** **every** superclass entity **must** belong to at least one subclass. Example: every STUDENT must be **UNDERGRADUATE or POSTGRADUATE**.
- **Partial specialization (single line):** a superclass entity **can exist without** belonging to any subclass. Example: an EMPLOYEE might just be basic admin staff, not in any specialist subclass.

## Four possible combinations
1. **Disjoint–Total**
2. **Disjoint–Partial**
3. **Overlapping–Total**
4. **Overlapping–Partial**`,

'db-union': `## The problem
**Who owns a vehicle?** It could be an individual **PERSON**, a **BANK** or a **COMPANY**.

## Why normal inheritance fails
A PERSON and a COMPANY **don't share the same parent** entity, so we can't make OWNER a normal subclass of one superclass.

## The solution: Category (Union type)
- A **category** is a collection that represents the **UNION** of **completely different** entity classes.
- OWNER = PERSON **∪** BANK **∪** COMPANY.

## Selective inheritance
An OWNER **inherits attributes only from the specific parent type it actually belongs to**. A person-owner has a person's attributes (e.g. CNIC); a bank-owner has a bank's attributes.

## Notation
Drawn with a **circle containing the letter 'U'**, connected to all the parent entities.`,

'db-relmodel': `## What is the relational model?
It turns the conceptual design (ER diagrams) into **formal mathematical tables**.

## The four words
- **Relation (table):** a mathematical **set of rows** with **uniquely named columns**.
- **Tuple (row / record):** an **ordered set of attribute values** representing **one** miniworld entity.
- **Attribute (column / field):** a **named property** with a domain, e.g. Student_CNIC, DOB.
- **Domain:** the set of allowed values for an attribute.

## Two key constraints
**Domain constraint**
- Every value must **match the allowed data type and value range**. Example: Age must be a whole number in an allowed range; a date column must hold dates.

**Entity integrity**
- The **Primary Key (PK) can NEVER be NULL**, under any condition.
- Reason: the PK is how we **identify** each row; if it were empty, we couldn't tell rows apart.

## Remember
Relation = table, Tuple = row, Attribute = column. Because a relation is a **set**, there are no exact duplicate rows and the **order of rows doesn't matter**.`,

'db-refint': `## Referential integrity: the foreign key contract
It's about connecting tables **reliably**, without leaving **orphaned** data (rows that point to nothing).

## 1. Foreign key (FK)
An attribute in **table A** that **refers to the Primary Key of table B**. Example: DeptID in STUDENT refers to DeptID in DEPARTMENT.

## 2. The integrity rule
A foreign key value **must either exist** in the referenced table **or be NULL**.

## 3. What breaks the rule?
- Inserting a student with **DeptID = 99** when **department 99 does not exist**.
- Deleting a department that still has students pointing to it (unless an action is set).

## 4. What happens when a parent row is deleted? (enforcement actions)
- **ON DELETE RESTRICT:** **block** the delete if any child rows still refer to it.
- **ON DELETE CASCADE:** **automatically delete** all matching child rows too.
- **ON DELETE SET NULL:** **keep** the child rows but **clear their FK** (set it to NULL), disconnecting them.

## How to choose
- RESTRICT → when children must never be lost by accident.
- CASCADE → when children mean nothing without the parent (e.g. order items of a deleted order).
- SET NULL → when children can live without the parent.`,

'db-mapping': `## What is ER-to-relational mapping?
A **step-by-step method (algorithm)** to turn an ER diagram into **relational tables**.

## Step 1: Regular (strong) entities
- Each strong entity becomes its **own table**.
- Include all **simple attributes**.
- Choose one **minimal candidate key** as the **Primary Key**.
- **Flatten composite attributes** into separate simple columns (e.g. Street, City, Zip).

## Step 2: Weak entities
- Each weak entity becomes a **separate table** with all its simple attributes.
- **Primary Key = owner's PK (as a foreign key) + the weak entity's partial key (discriminator).**

## Step 3: 1:1 relationships (foreign-key approach)
- Put the PK of one table as a **foreign key in the other** table.
- **Rule of thumb:** put the FK in the table with **TOTAL participation**, to **avoid NULL values**.

## Step 4: 1:N relationships
- **Always** put the PK of the **"1" side** into the table on the **"N" (many) side** as a foreign key.
- **Analogy:** each student belongs to ONE department, so put **DeptID inside the STUDENT** table.

## Step 5: M:N relationships
- Create a **new, independent bridge (junction) table**.
- It holds the **PKs of both tables as foreign keys**.
- **Both foreign keys together** form its **composite Primary Key**. Any relationship attributes (like Hours or Grade) go here too.

## Step 6: Multivalued attributes
- Create a **separate table** with (**Owner_PK, Attribute_Value**). Example: several phone numbers.
- **Both columns together** form the composite Primary Key.`,

'db-eermap': `## The challenge
How do we store a **superclass/subclass hierarchy** in tables? We must balance **NULL values** against **expensive joins**.

## Option 8A: Multiple tables (superclass + subclasses)
- One table for the **superclass** + one table for **each subclass**.
- They are linked by the **same Primary Key**.
- **Best for general use**; works for any kind of hierarchy.

## Option 8B: Subclass tables only
- **No superclass table**; each subclass table **repeats** the common columns.
- Works **ONLY for Total + Disjoint** hierarchies (every entity in exactly one subclass).

## Option 8C: Single table with a type discriminator
- **Flatten everything into one wide table** with an extra **"Role/Type" column**.
- Columns that don't apply to a row are left **NULL**.
- Good when subclasses are **disjoint** and have **few** extra attributes.

## Option 8D: Single table with Boolean flags
- One table with **yes/no flags** like **is_engineer, is_manager**.
- **Best for Overlapping** subclasses (one entity can be several types).

## Trade-off
- **Many tables (8A):** fewer NULLs but **more joins**.
- **One table (8C/8D):** **no joins** but **more NULLs**.`,

'db-algebra1': `## What is relational algebra?
The **mathematical foundation of database querying**. SQL is built on it. This topic covers the **unary** operators (they work on **one** table).

## 1. Selection – σ (sigma)
- **Horizontal filtering:** keeps the **rows** that match a condition.
- **Notation:** σ Salary > 50000 (EMPLOYEE) → returns the **full rows** where salary is above 50,000.
- Like the **WHERE** clause in SQL.

## 2. Projection – π (pi)
- **Vertical filtering:** keeps only the **listed columns** and drops the others.
- **Notation:** π Name, Salary (EMPLOYEE) → returns only the Name and Salary values.
- Like the **SELECT column list** in SQL.

## 3. Set elimination rule
- Pure relational-algebra projection **automatically removes duplicate rows** (because a relation is a set).

## 4. Rename – ρ (rho)
- **Renames** a relation or its columns.
- Used to **avoid confusion during self-joins** (joining a table with itself).

## Combining operators
π Name ( σ Dept = 'IT' (EMPLOYEE) ) → first pick IT rows, then show only names. Read **from the inside out**.`,

'db-algebra2': `## Set operations
These **combine two relations** using **Union, Intersection and Set Difference**, plus the Cartesian product.

## 1. Union compatibility (needed first)
- The two relations **must have the same number of columns** with **matching data domains** (types).
- Without this, ∪, ∩ and − are not allowed.

## 2. Union (R ∪ S)
- **Combines rows from both** tables and **removes duplicates**.

## 3. Intersection (R ∩ S)
- Returns **only the rows that appear in BOTH** tables.

## 4. Set difference (R − S)
- Returns rows that are **in R but NOT in S**.
- Order matters: R − S is **not** the same as S − R.

## 5. Cartesian product (R × S)
- **Pairs every row of R with every row of S**.
- Number of rows = (rows in R) × (rows in S). Example: 3 rows × 4 rows = **12 rows**.
- Union compatibility is **not** needed for ×.`,

'db-algebra3': `## Joins and division
Joins **connect tables on shared attributes**; division solves **"for all"** questions.

## 1. Theta join (R ⋈θ S)
- A **Cartesian product filtered by a comparison condition θ** (like =, <, >, ≥).

## 2. Equijoin
- A theta join whose condition uses **only equality (=)**.

## 3. Natural join (R * S)
- **Automatically** equijoins on columns with the **same name**.
- **Drops the duplicate columns**, so the matching column appears once.

## 4. Division (R ÷ S)
- Finds rows in R that match **ALL** rows in S.

## 5. Classic division problem
- "**Find students who have completed ALL courses required for graduation.**"
- Whenever an exam question says "**all**", think of **division**.`,

'db-subq': `## What is a subquery?
A query written **inside** another query. One query **depends** on the result of another.

## 1. Uncorrelated subquery
- The **inner query runs once**; its result is passed to the outer query.
- **Example:** SELECT Name FROM EMP WHERE Salary > (SELECT AVG(Salary) FROM EMP);
  → first find the company average once, then list everyone above it.

## 2. Correlated subquery
- The **inner query runs again for every row** of the outer query, because it **uses values from that row**.
- **Example:** find employees earning more than the average salary of **THEIR OWN department**. For each employee, the average of that employee's department is calculated.
- Usually **slower** than uncorrelated.

## 3. EXISTS vs IN
- **EXISTS** is a **true/false check**: it **stops scanning as soon as it finds the first match**.
- **IN** builds the full list of values and then checks membership.
- So EXISTS can be **faster** on big tables.`,

'db-joins': `## The SQL join family
Joins decide **what to do with rows that have no match**, so we never lose data by accident.

## 1. INNER JOIN
- Returns rows **ONLY when there is a match in both tables**.
- Unmatched rows ("orphans") are **discarded**.

## 2. LEFT OUTER JOIN
- Keeps **EVERY row from the LEFT** table.
- If there's no match on the right, the right-table columns are filled with **NULL**.

## 3. RIGHT OUTER JOIN
- Keeps **EVERY row from the RIGHT** table.
- Missing left-table columns are filled with **NULL**.

## 4. FULL OUTER JOIN
- Keeps **all rows from both** tables.
- Missing sides are filled with **NULL**.

## 5. Use case
- Finding **departments with ZERO enrolled students** needs a **LEFT JOIN** (DEPARTMENT on the left), then look for rows where the student columns are **NULL**.`,

'db-group': `## Grouping and summarising
Used to **summarise data by categories** and then **filter those summaries**.

## 1. GROUP BY
- **Collapses** individual rows into **summary groups** ("buckets") based on a common value. Example: one group per department.

## 2. Aggregate functions
- **COUNT()** – how many rows.
- **SUM()** – total.
- **AVG()** – average.
- **MIN()** – smallest value.
- **MAX()** – largest value.

## 3. WHERE vs HAVING (the most common SQL interview question)
- **WHERE** filters **individual rows BEFORE** they are grouped.
- **HAVING** filters **whole groups AFTER** grouping is done.

## 4. The rule
- You **cannot use aggregate functions inside WHERE** (groups don't exist yet at that point).

## Example in words
"Departments with more than 50 enrolled students":
WHERE keeps only enrolled students → GROUP BY department → COUNT each group → HAVING COUNT > 50 keeps only the big departments.`,

'db-trig': `## What is a trigger?
**Automatic business logic that runs inside the database engine** whenever something happens to a table.

## The ECA model (Event–Condition–Action)
- **Event:** a database **write operation**: **INSERT, UPDATE or DELETE**.
- **Condition:** an **optional true/false check** done before running the trigger.
- **Action:** **stored procedure code** that runs if the condition is true.

## BEFORE vs AFTER triggers
- **BEFORE** triggers run **before** the change is saved; they **validate or clean (sanitize) input**.
- **AFTER** triggers run **after** the change is saved; they are used to **audit** (record) changes.

## ROW vs STATEMENT triggers
- **FOR EACH ROW:** runs **once for every row** changed, and can look at the **OLD and NEW** values of that row.
- **FOR EACH STATEMENT:** runs **only once** for the whole SQL statement, however many rows it changed.

## Typical use: an audit trail
An **AFTER UPDATE … FOR EACH ROW** trigger writes the OLD salary, NEW salary, the user and the time into an audit table, automatically and every time.`,

'db-assert': `## Enforcing rules across tables
How do we make sure **database-wide rules** stay true, even when they involve **several tables**?

## 1. CHECK constraints
- Check a rule **inside a single row** of one table.
- Example: **CHECK (Salary > 0)**.

## 2. CREATE ASSERTION
- A **schema-level rule** that checks something across **multiple tables**.
- Example: "**The total salary of a department cannot exceed the department's allocated budget.**"

## 3. Practical reality
- Most commercial DBMSs (**MySQL, Oracle**) **don't support full general assertions**, because checking them all the time causes **severe performance overhead**.

## 4. Industry solution
- Complex multi-table rules are enforced using **database triggers** instead.

## Summary
CHECK = one row · ASSERTION = many tables (theory) · TRIGGER = what companies really use.`,

'db-views': `## What is a view?
A **stored SQL query** that behaves like a **virtual table** when you use it. It **doesn't store data itself**; it shows data from the real tables each time.

## Why use views?
**1. Security shield**
- **Hide sensitive data**. Example: a view of EMPLOYEES **without the Salary** column.

**2. Query simplification**
- Hide a messy **5-table join** behind a simple **SELECT * FROM view_name**.

## Updatable views
- You can INSERT/UPDATE through a view **only if** it is built on a **single table** and has **no aggregations** (no COUNT, SUM, GROUP BY…).

## WITH CHECK OPTION
- **Prevents users from inserting rows that would immediately disappear from the view.**
- Example: a view of only CS students with CHECK OPTION will refuse to insert an EE student.`,

'db-ddl': `## Changing tables in a live database (DDL)
Sometimes the structure of a table must change after the database is already in use. These commands do that **safely**.

## 1. ALTER TABLE … ADD COLUMN
- **Adds** a new attribute (column).
- Best to give it a **DEFAULT value**, so existing rows get a value instead of NULL.

## 2. ALTER TABLE … DROP COLUMN
- **Removes** an attribute.
- With **CASCADE**, views that depend on that column are dropped too.

## 3. ALTER TABLE … MODIFY / ALTER COLUMN
- **Changes a column's data type** or its **NULL / NOT NULL** rule.

## 4. DROP TABLE … RESTRICT vs CASCADE
- **RESTRICT:** **fails** if any foreign keys still point to this table.
- **CASCADE:** drops the table **and deletes the child constraints** that point to it.

## 5. Production warning
- Altering **large tables (millions of rows)** **locks** them, so users must wait.
- Such changes are done during a **maintenance window** (a quiet planned time).`,

'db-review': `## Chapter 3 review questions explained
Your slide ends with **four check questions**. Here is what each one tests and how to answer it simply.

## Q1. When choose Option 8A vs Option 8C for EER subclasses?
- **8A** (superclass table + subclass tables linked by the same PK) is the **general** choice: no wasted NULLs, but needs **joins**.
- **8C** (one wide table + a type column) avoids joins but **fills unused columns with NULL**. Use it when subclasses are **disjoint** and have **few extra attributes**.

## Q2. Why must the FK be on the N side of a 1:N relationship?
- Each row on the **N side** relates to **exactly one** row on the 1 side, so it can store **one** FK value.
- If we put it on the 1 side, one cell would need **many values** (not allowed). Example: DeptID goes in STUDENT.

## Q3. Difference between WHERE and HAVING (with an example)
- **WHERE** filters **rows before** grouping; **HAVING** filters **groups after** grouping.
- Example: WHERE Status = 'Enrolled' … GROUP BY DeptID … HAVING COUNT(*) > 50.

## Q4. How does an AFTER UPDATE trigger give a tamper-proof audit trail?
- It **fires automatically** after every update, **for each row**, and saves the **OLD and NEW values, the user and the time** in an audit table.
- It runs **inside the database engine**, so applications **cannot skip it**.

## Next chapter preview
Database application programming, **JDBC** and extensible data models.`
};
Object.entries(N).forEach(([k, v]) => { if (window.EASY && window.EASY[k]) window.EASY[k].n = v; });
})();
