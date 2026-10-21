/* Database Systems — from: Lecture Notes 1 & 2 (PDF), Lecture 1 detailed (slides), Chapter 3 Advanced Data Modeling (slides) */
window.LECTURES = (window.LECTURES || []).concat([
  { id:'db-l1', s:'db', n:'Lecture 1', t:'Database Concepts & Architecture', img:'hero-db' },
  { id:'db-l2', s:'db', n:'Lecture 2', t:'Data Modeling with the ER Model', img:'lib1' },
  { id:'db-c3', s:'db', n:'Chapter 3', t:'EER, Relational Mapping, Algebra & SQL', img:'code2' }
]);
window.TOPICS = (window.TOPICS || []).concat([

/* ---------------- LECTURE 1 ---------------- */
{ id:'db-cat', s:'db', lec:'db-l1', t:'Database Categories, OLTP vs OLAP & Domains', g:'OLTP', img:'join',
  figs:[{src:'db1_02',cap:'Primary database categories'},{src:'db1_03',cap:'OLTP vs OLAP'}],
  sum:'The main families of databases, the two kinds of workload (transactions vs analytics), and specialised database domains.',
  key:['RDBMS = tables + ACID; NoSQL = flexible documents / key-value; Graph = nodes and edges','OLTP: many short real-time updates, 3NF schema (ATM, checkout)','OLAP: complex analysis over history, star/snowflake schema (dashboards)'],
  body:`## Primary database categories
| Category | What it is | Examples |
| Relational (RDBMS) | Strict tables (schemas) with ACID transactions | PostgreSQL, Oracle, MySQL |
| NoSQL stores | Flexible JSON documents and key-value pairs, scale horizontally | MongoDB, Cassandra, Redis |
| Graph & spatial | Follow node relationships directly; store coordinates and shapes | Neo4j, Amazon Neptune, PostGIS |

## OLTP vs OLAP
| Aspect | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
| Goal | High-volume, real-time record updates | Historical, multidimensional pattern analysis |
| Queries | Fast, low-latency simple lookups | Complex aggregations across terabytes |
| Schema | Highly normalized (3NF) | Star, snowflake and columnar data warehouses |
| Use cases | E-commerce checkout, ATM transactions | Executive dashboards, seasonal trends |

## Specialized database domains
- **GIS & spatial:** geospatial coordinates, polygons, satellite raster overlays.
- **Time-series:** IoT sensor telemetry, stock-market order books.
- **Bioinformatics:** genomic nucleotide sequences, protein structures.
- **Cloud warehouses:** elastic lakehouses where compute is separated from object storage.`},

{ id:'db-basics', s:'db', lec:'db-l1', t:'Data, Information, Database, DBMS & Miniworld', g:'DBMS', img:'acid',
  figs:[{src:'db1_06',cap:'The database system triad'}],
  sum:'Core definitions: raw data vs information, the database / DBMS / database-system triad, the miniworld and metadata.',
  key:['Data = raw facts; Information = data given context and meaning','Database + DBMS software + applications/hardware = Database System','Miniworld = the part of the real world the database represents','Metadata (catalog) = description of the database stored inside it'],
  body:`## Data vs information
- **Raw data:** unprocessed facts, symbols or observations recorded without context. Example: "09152026", "98.6", "404".
- **Information:** data that is structured, given context and formatted so it has meaning. Example: "Patient temperature: 98.6°F (Normal)".

## The database system triad
1. **Database:** a logically coherent collection of persistent, related data representing the state of a miniworld.
2. **DBMS (Database Management System):** general-purpose software that manages storage, queries, access control and recovery.
3. **Database system:** the whole environment: hardware + DBMS software + stored data + client applications.

## Miniworld (Universe of Discourse)
The specific part of the real world that the database models. Any change in the real world (e.g. student grades submitted) is reflected as an update to the database state.

## Metadata (data catalog)
The complete description of the database, stored inside the system: table structures, data types, constraints, user permissions and physical file mappings.`},

{ id:'db-func', s:'db', lec:'db-l1', t:'DBMS Functions: Define, Construct, Manipulate, Share', g:'DDL', img:'code1',
  sum:'The four functional pillars of a DBMS plus maintenance, recovery and optimisation.',
  key:['Define (DDL) → Construct (load data) → Manipulate (DML) → Share & protect','Write-ahead log enables recovery','Cost-based query optimizer picks the cheapest plan'],
  body:`## Four functional pillars
| Stage | Pillar | What happens |
| 1 | Data Definition (DDL) | Specify data types, integrity rules and storage structures; create table schemas and column domains; set primary and foreign keys |
| 2 | Data Construction | Load the initial data onto storage; bulk ingestion from external files; physical block allocation and B-tree index builds |
| 3 | Data Manipulation (DML) | Query, update and generate reports; retrieval through SQL; batch inserts, updates and deletes |
| 4 | Sharing & Protection | Control multi-user concurrency and block unauthorized access; isolation to avoid race anomalies; permissions per user role |

## Maintenance, recovery and optimisation
- **Automated logging:** a write-ahead log records every transaction before commit, so recovery is deterministic.
- **Query optimizer:** a cost-based optimizer chooses the lowest-latency execution plan across joins and indexes.
- **Reorganization:** defragmentation, table vacuuming and statistics updates keep throughput steady.`},

{ id:'db-uni', s:'db', lec:'db-l1', t:'University Example: Schema, Tuples & Queries', g:'SQL', img:'lib2',
  sum:'The university miniworld used throughout the course: its entities, sample rows, a query and a transaction.',
  key:['STUDENT, COURSE, SECTION, GRADE_REPORT','PK guarantees uniqueness; FK enforces referential integrity','A transaction groups INSERT + UPDATE so both happen or neither'],
  body:`## Schema entities
| Entity | Attributes |
| STUDENT | StudentID, Name, Class, Major |
| COURSE | CourseNumber, Title, CreditHours, Department |
| SECTION | SectionID, CourseNumber, Semester, Year, Instructor |
| GRADE_REPORT | StudentID, SectionID, LetterGrade |

## Tuples (rows)
| StudentID (PK) | Name | Class | Major |
| 17 | Smith | Senior | CS |
| 23 | Brown | Sophomore | CS |

| StudentID (FK) | SectionID (FK) | Grade |
| 17 | 112 | B |
| 23 | 119 | A |

The **primary key** makes each row unique; the **foreign key** enforces referential integrity between tables.

## Sample query: Smith's transcript
~~~
SELECT CourseNumber, Grade
FROM   STUDENT S, GRADE_REPORT G
WHERE  S.StudentID = G.StudentID
AND    S.Name = 'Smith';
~~~
## Atomic transaction: enroll a student and take one seat
~~~
BEGIN TRANSACTION;
  INSERT INTO GRADE_REPORT VALUES (23, 112, NULL);
  UPDATE SECTION SET Seats = Seats - 1 WHERE SectionID = 112;
COMMIT;
~~~`},

{ id:'db-char', s:'db', lec:'db-l1', t:'Characteristics of the Database Approach', g:'4×', img:'code3',
  sum:'Self-describing catalog, program-data independence, multiple views and multi-user concurrency.',
  key:['Self-describing: the catalog holds the schema, so the DBMS is generic','Program-data independence: logical and physical levels','Multiple views for different users','Concurrency control with locking or MVCC'],
  body:`## 1. Self-describing nature (system catalog / data dictionary)
A database stores not only user data but its complete schema description. The DBMS does not hard-code logic for "university courses" or "bank ledgers"; it reads the catalog at runtime to check every operation.
- **Catalog driven:** the DBMS works generically on any schema.
- **Uniform querying:** catalog tables can be queried like normal tables.
- **Versus files:** traditional file programs hard-code byte offsets inside the code.

## 2. Program-data independence
- **Logical data independence:** change the conceptual schema without rewriting external views or applications. Example: adding an optional student email column leaves existing queries working.
- **Physical data independence:** change internal storage without changing the conceptual schema or queries. Example: adding a B-tree index, or moving data from HDD to NVMe SSD.

## 3. Support for multiple views
Different users see different subsets and summaries. A student sees only their own grades; the registrar sees GPA across all departments.

## 4. Multi-user concurrency
Hundreds of users work at the same time without interfering. Locking and multi-version concurrency control (MVCC) keep transactions isolated.`},

{ id:'db-actors', s:'db', lec:'db-l1', t:'Actors on the Scene & Workers Behind the Scene', g:'DBA', img:'owner2',
  figs:[{src:'db1_17',cap:'Primary stakeholders'}],
  sum:'Who uses and who builds database systems: DBA, designers, programmers, end-user classes and behind-the-scene workers.',
  key:['DBA = custodian; Designer = schema architect; Programmer = interface engineer','End users: naive/parametric, casual, sophisticated, standalone','Behind the scene: DBMS designers, tool developers, operators'],
  body:`## Actors on the scene
| Role | Responsibility | Nickname |
| Database Administrator (DBA) | Custody of the system, privileges, storage capacity, disaster planning | Operational governor |
| Database Designer | Identifies entities, relationships and constraints; normalizes logical views | Schema architect |
| Application Programmers | Build client apps, APIs and canned transactions for end users | Interface engineer |

## End-user classes
| Class | Behaviour | Examples |
| Naive / parametric | Run standard canned transactions through fixed buttons | Bank tellers, airline agents |
| Casual | Occasional access with different ad-hoc queries each time | Middle managers, researchers |
| Sophisticated | Understand DBMS internals and build advanced models | Data scientists, financial quants |
| Standalone | Keep personal databases with ready-made packages | Personal tax or photo catalogs |

## Workers behind the scene
- **DBMS system designers:** write the database kernel, buffer managers and SQL parsers.
- **Tool developers:** build schema-modelling tools, GUI profilers and benchmark suites.
- **Operators & maintenance:** run the server hardware, network switches, cooling and failover power.`},

{ id:'db-adv', s:'db', lec:'db-l1', t:'Advantages of a DBMS & When Not to Use One', g:'+/−', img:'acid',
  sum:'Why organisations use a DBMS, and the cases where a heavy DBMS is the wrong choice.',
  key:['Controlled redundancy, integrity constraints, recovery, standards, faster development','Avoid a DBMS when cost is too high, hard real-time deadlines exist, or it is a simple single-user program'],
  body:`## Advantages
- **Controlled redundancy:** each fact is stored once, so departments never hold conflicting values; less storage waste and no update anomalies.
- **Integrity constraints:** the DBMS blocks invalid writes, e.g. data types and checks like GPA between 0.0 and 4.0; referential integrity prevents orphan foreign keys.
- **Automated recovery:** the crash-recovery subsystem rolls back uncommitted transactions and re-applies committed ones.
- **Standardization:** the DBA sets naming conventions, data-dictionary standards and display formats.
- **Rapid development:** developers skip low-level file and index code and focus on business logic.

## When NOT to use a heavy DBMS
- **High overhead costs:** licences, server memory and DBA salaries outweigh the benefit for simple projects.
- **Strict real-time deadlines:** hard real-time embedded systems (e.g. flight autopilot) cannot afford query-parsing overhead.
- **Single-user simplicity:** isolated desktop programs with no concurrency run faster on flat files or SQLite.`},

{ id:'db-hist', s:'db', lec:'db-l1', t:'History & Future of Database Technology', g:'1970', img:'cdc',
  sum:'From hierarchical and network models to Codd\'s relational model, NoSQL, cloud, streaming and vector databases.',
  key:['1960s hierarchical (IBM IMS), early 1970s network (CODASYL)','1970 Codd: relational model, declare WHAT not HOW; System R → SQL','1990s object-relational, 2000s Bigtable/MapReduce, 2010s NoSQL (CAP), now distributed SQL','Frontiers: streaming, lakehouse, vector DBs/RAG, self-driving databases'],
  body:`## Early era
- **1960s, Hierarchical model (mainframes):** data in strict 1:N parent-child trees. Pioneered by IBM IMS (Apollo programme). Could not model many-to-many links directly.
- **Early 1970s, Network model (CODASYL):** records can have several parents through pointer graphs. Formalized by CODASYL DBTG standards; navigational pointers were fragile.

## The relational revolution
- **1970, Edgar F. Codd:** separated logical relations from physical pointers using first-order predicate logic. Users declare **what** data they want; the optimizer decides **how**.
- **Late 1970s–1980s:** IBM System R proved relational systems practical and created SEQUEL (later SQL). Led to Oracle, DB2 and SQL Server.

## Modern waves
| Era | Wave | Idea |
| 1990s | Object-relational | Bridged the OOP impedance mismatch; user types, XML/JSON |
| 2000s | Web & big data | Google Bigtable and MapReduce started open-source distributed computing |
| 2010s | NoSQL | Gave up strict ACID for horizontal scaling (Brewer's CAP theorem) |
| Present | Cloud-native | Distributed SQL (Spanner, CockroachDB) with global consistency |

## Modern frontiers
- **Real-time streaming:** continuous event queues with sliding time windows (Apache Kafka, Apache Flink).
- **Data lakehouse:** cheap cloud object storage with ACID governance (Delta Lake, Apache Iceberg, Snowflake).
- **Vector databases:** text, audio and images turned into embedding vectors (e.g. 1536 dimensions); HNSW approximate nearest-neighbour search; Retrieval-Augmented Generation (RAG) feeds facts to LLMs.

## The next decade
- **Autonomous tuning (self-driving databases):** ML creates indexes, sizes buffers and rewrites bad SQL.
- **Hardware acceleration:** GPUs, FPGAs and CXL pooled memory for near-zero latency.
- **Multi-model convergence:** one engine for relational, document, graph and vector workloads.`},

{ id:'db-models', s:'db', lec:'db-l1', t:'Data Models and Their Categories', g:'3 lvls', img:'lib1',
  sum:'What a data model is, and the three categories: conceptual, representational and physical.',
  key:['Data model = concepts for structure, operations and constraints','High-level (conceptual): ER, EER','Representational (implementation): relational, network, hierarchical','Low-level (physical): files, record formats, indexes'],
  body:`## Definition
A **data model** is a set of concepts for describing the structure of a database (data types, relationships, constraints), plus basic operations for retrieval and update, independent of any one implementation. Some models also describe dynamic behaviour (user-defined operations, triggers).

## Three categories (closest to user → closest to storage)
1. **High-level (conceptual):** entities, attributes and relationships, close to how users see the enterprise. The ER model and Enhanced ER (EER) model.
2. **Representational (implementation):** understandable to users but close to how data is organized in storage. The relational model (dominant today); older network and hierarchical models.
3. **Low-level (physical):** how data is stored as files: record formats, field ordering, access paths such as indexes. Used by systems programmers.

> **Example:** a university is modelled conceptually with STUDENT, COURSE and ENROLLMENT; implemented as relational tables STUDENT, COURSE, ENROLLS_IN linked by foreign keys; and stored physically as indexed files with a B+-tree on Student_ID.`},

{ id:'db-schema', s:'db', lec:'db-l1', t:'Schemas, Instances and States', g:'S/I', img:'code2',
  sum:'The difference between a database\'s fixed description (schema) and its changing contents (state).',
  key:['Schema = intension (rarely changes)','State/instance = extension = snapshot at one moment','Valid state satisfies every constraint','Schema stored as metadata in the catalog (data dictionary)'],
  body:`| Term | Meaning |
| Database schema | Description of the database: each data type's name and description. Set at design time, rarely changes. Also called the **intension**. |
| Schema diagram | A diagram of some or all of the schema (entity types and attributes). |
| Database state / instance | The actual data at one moment (a **snapshot**). Also called the **extension**. |
| Initial state | The state when the database is first loaded. |
| Valid state | A state that satisfies the structure and all constraints of the schema. |

> **Example:** "EMPLOYEE has Name, SSN and Salary" is schema. The thousands of employee rows stored now form the current state, which changes every time someone joins or leaves.

The DBMS enforces the schema on every state. The schema itself is stored as **metadata** in the system catalog (data dictionary), separate from the data it describes.`},

{ id:'db-3schema', s:'db', lec:'db-l1', t:'Three-Schema (ANSI/SPARC) Architecture', g:'E·C·I', img:'join',
  sum:'External, conceptual and internal levels, and the two mappings between them.',
  key:['External level: user views','Conceptual level: whole database for all users','Internal level: physical storage','Two mappings: external/conceptual and conceptual/internal'],
  body:`The three-schema architecture (ANSI/SPARC report) separates user applications from the physical database so each group sees data at the right level of abstraction, and changes at one level disturb the others as little as possible.

| Level | Described by | What it describes |
| External | External schemas (user views) | The part of the database one user group needs; hides the rest |
| Conceptual | Conceptual schema | Entities, data types, relationships, operations and constraints for the whole database; hides storage. Usually a representational model |
| Internal | Internal schema (physical model) | Complete storage details: record formats, field order, access paths/indexes |

## Mappings
- **Conceptual/internal mapping:** how a conceptual record is stored physically, so storage can change without touching the conceptual schema.
- **External/conceptual mapping:** how each view relates to the conceptual schema, so the conceptual schema can change without changing every view.`},

{ id:'db-indep', s:'db', lec:'db-l1', t:'Data Independence: Logical & Physical', g:'L/P', img:'norm',
  sum:'Changing one level of the schema without changing the level above it.',
  key:['Logical: change conceptual schema, views and programs unaffected','Physical: change internal schema, conceptual schema unaffected','Logical independence is harder to achieve'],
  body:`**Data independence** is the capacity to change the schema at one level without changing the schema at the next higher level. It is the main benefit of the three-schema architecture.

| Type | Meaning | Example |
| Logical data independence | Change the conceptual schema (add/remove record types or items) without changing external schemas or programs; only view definitions and mappings change | Splitting EMPLOYEE into EMPLOYEE and EMPLOYEE_CONTACT; views can be redefined to hide the split |
| Physical data independence | Change the internal schema (reorganize files, add indexes, change devices) without changing the conceptual schema | Adding a B+-tree index on Employee.Salary; no program needs rewriting |

Logical independence is harder to achieve fully, because programs often depend closely on the logical structure of the data they use.`},

{ id:'db-lang', s:'db', lec:'db-l1', t:'DBMS Languages and Interfaces', g:'DML', img:'code1',
  sum:'DDL, VDL, SDL, high-level and low-level DML, and the interfaces offered to different users.',
  key:['DDL defines schemas; VDL defines views; SDL defines internal schema','High-level DML (SQL): non-procedural, set-oriented','Low-level DML: procedural, record-at-a-time, embedded with loops','Interfaces: menu, forms, GUI, natural language, parametric, DBA, speech/mobile'],
  body:`## Languages
| Language | Purpose |
| DDL – Data Definition Language | Used by the DBA and designers to define conceptual and internal schemas |
| VDL – View Definition Language | Defines user views (external level) |
| SDL – Storage Definition Language | Defines the internal schema; most modern DBMSs merge DDL, VDL and SDL into one DDL |
| High-level (non-procedural) DML | Says **what** data to retrieve, not how. SQL is the standard. Used interactively or embedded; **set-oriented** (one statement returns many records) |
| Low-level (procedural) DML | Embedded in a programming language; retrieves one record at a time and needs loops (**record-at-a-time**) |

## Interfaces
- **Menu-based:** lists of options, for browsing and web clients.
- **Forms-based:** fill in fields on a form; for users who do not know query languages.
- **Graphical (GUI):** schema shown as a diagram; point and click to query.
- **Natural language:** requests in everyday language translated into formal queries.
- **Parametric users:** e.g. bank tellers, using a small fixed set of operations via buttons or function keys.
- **DBA interfaces:** privileged commands for accounts, system parameters, granting/revoking privileges, tuning.
- **Speech input/output, mobile and specialized devices.**`},

{ id:'db-util', s:'db', lec:'db-l1', t:'Database System Utilities and Tools', g:'⚙', img:'acid',
  sum:'Loading, backup, file reorganization, performance monitoring, and the tools that accompany a DBMS.',
  key:['Utilities: loading, backup, file reorganization, performance monitoring','Tools: data dictionary/repository, application generators, CASE tools, communication software'],
  body:`## Utilities that ship with a DBMS
- **Loading:** loads existing data files (e.g. flat text files) into the database, converting formats if needed.
- **Backup:** creates periodic copies on separate storage so the database can be recovered after failure.
- **File reorganization:** changes a file's organization to improve performance.
- **Performance monitoring:** reports usage statistics to the DBA, who decides e.g. which indexes to build.

## Other tools
- **Data dictionary / repository:** stores schema descriptions and other metadata; can be queried like a small database.
- **Application generators:** generate data-entry, update and reporting programs.
- **CASE tools (Computer-Aided Software Engineering):** used in early design stages.
- **Communication software:** lets the DBMS be accessed over a network.`},

{ id:'db-arch', s:'db', lec:'db-l1', t:'Centralized and Client-Server Architectures', g:'2/3T', img:'code3',
  sum:'Single-system centralized DBMSs, two-tier and three-tier (n-tier) client-server designs.',
  key:['Centralized: everything on one system, dumb terminals','Two-tier: client talks directly to DB server','Three-tier: presentation → application/business logic → database'],
  body:`## Centralized architecture
DBMS software, hardware, application programs and user-interface processing all run on **one system**. Users connected through terminals with no processing power; later PCs could capture and format data locally first.

## Client/server architectures
Clients run the user interface and local logic; servers house the DBMS and answer queries and transactions from many clients.

| Architecture | Description |
| Two-tier | The client talks directly to the database server. Older **file-server**: server only supplies files, processing at client. Common **database-server**: server does query processing and transaction management; client handles UI and some logic. |
| Three-tier (n-tier) | Typical for web apps: **presentation tier** (browser/UI) → **application/business-logic tier** (application server) → **database tier** (DBMS). Clients never touch the database directly, which improves security and scaling. |`},

{ id:'db-class', s:'db', lec:'db-l1', t:'Classification of DBMSs', g:'≡', img:'lisa',
  sum:'Six independent ways to classify a DBMS.',
  key:['By data model, users, sites, cost, access path, workload','Distributed: homogeneous vs heterogeneous','OLTP vs OLAP/warehousing'],
  body:`| Dimension | Classes |
| Data model | Relational; network and hierarchical (legacy); object-oriented; object-relational; NoSQL (document, key-value, column-family, graph) |
| Number of users | Single-user (personal computers) vs multiuser (organizations) |
| Number of sites | Centralized (data at one site) vs distributed (many sites), either **homogeneous** (same DBMS everywhere) or **heterogeneous** (different DBMSs) |
| Cost | Free/open-source (MySQL, PostgreSQL) up to high-end commercial systems |
| Access-path options | General-purpose vs special-purpose systems tuned for one application (e.g. airline reservations) |
| Intended workload | OLTP (many short read/write transactions) vs OLAP / data warehousing (large read-mostly analytical queries) |`},

/* ---------------- LECTURE 2: ER MODEL ---------------- */
{ id:'db-design', s:'db', lec:'db-l2', t:'The Database Design Process', g:'4 ph', img:'notes2',
  sum:'Requirements → conceptual design → logical design (mapping) → physical design.',
  key:['Requirements collection & analysis (data + functional requirements)','Conceptual design: ER/EER schema','Logical design: map to relational model','Physical design: storage, indexes, access paths'],
  body:`Building a database application involves **database design** (the structure) and **application design** (programs and transactions). The simplified design process:

1. **Requirements collection and analysis:** interview users; document data requirements and constraints; collect functional requirements (operations and transactions).
2. **Conceptual design:** produce a conceptual schema with a high-level model such as ER or EER; check it against the functional requirements.
3. **Logical design (data model mapping):** map the conceptual schema into the DBMS's implementation model, usually relational.
4. **Physical design:** choose internal storage structures, file organizations, indexes and access paths.

The phases are not always strictly sequential; conceptual and logical design are often refined together.`},

{ id:'db-er', s:'db', lec:'db-l2', t:'ER Model Concepts, Entities & Attribute Types', g:'E-R', img:'lib1',
  sum:'Peter Chen\'s ER model (1976), entities, and every kind of attribute.',
  key:['ER = entities, attributes, relationships (Chen, 1976)','Simple vs composite; single vs multivalued; stored vs derived','NULL = not applicable or unknown','Complex attributes = nested composite + multivalued'],
  body:`## The ER model
The Entity-Relationship model describes data with **entities, attributes and relationships**. Proposed by **Peter Chen in 1976**, it is a conceptual model shown graphically as an ER diagram, independent of implementation.

## Entities and attributes
An **entity** is a real-world thing with independent existence (a particular employee, car, house). **Attributes** are the properties that describe it.

| Attribute type | Meaning | Example |
| Simple (atomic) | Cannot be divided | Age |
| Composite | Divides into meaningful sub-parts | Address → Street, City, Zip; Name → First, Middle, Last |
| Single-valued | One value per entity | Age |
| Multivalued | Several values at once | Phone numbers, college degrees |
| Stored | Kept in the database | Birth_Date |
| Derived | Computed from a stored (prerequisite) attribute | Age from Birth_Date |

## NULL values
- "Not applicable": e.g. College_Degree for someone with no degree.
- "Unknown": either known to exist but missing, or not known whether it exists.

**Complex attributes** nest composite and multivalued attributes, e.g. several addresses, each composite.`},

{ id:'db-keys', s:'db', lec:'db-l2', t:'Entity Types, Entity Sets, Keys & Value Sets', g:'KEY', img:'code2',
  sum:'Entity type vs entity set, key and candidate keys, and value sets (domains).',
  key:['Entity type = schema; entity set = current collection','Key attribute must be unique (uniqueness constraint)','More than one possible key → candidate keys','Value set (domain) = allowed values'],
  body:`| Term | Meaning |
| Entity type | A collection of entities sharing the same attributes, described by name + attributes, e.g. EMPLOYEE(Name, Age, Address, Salary) |
| Entity set | All entities of a type that exist in the database right now (the current state). Often used interchangeably with entity type |
| Key attribute | Attribute(s) whose values must be distinct for every entity: a **uniqueness constraint**. SSN is a natural key for EMPLOYEE; Name may not be unique |
| Candidate key | When an entity type has more than one possible key, each one |
| Value set (domain) | The set of values allowed for an attribute, e.g. Age ∈ integers 0–150 |

Some entity types have no natural key of their own; these lead to **weak entity types**.`},

{ id:'db-rel', s:'db', lec:'db-l2', t:'Relationships, Degree, Cardinality & Participation', g:'1:N', img:'hand2',
  sum:'Relationship types, their degree, and the structural constraints cardinality ratio and participation.',
  key:['Degree = number of participating entity types (binary, ternary, n-ary)','Cardinality ratio: 1:1, 1:N, M:N (maximum)','Participation: total (double line) vs partial (single line) (minimum)','Cardinality + participation = structural constraints'],
  body:`- **Relationship:** an association among two or more entities (an employee works for a department).
- **Relationship instance:** one such association between specific entities.
- **Relationship type:** the set of associations among entity types, e.g. WORKS_FOR relates EMPLOYEE to DEPARTMENT.
- **Degree:** number of participating entity types. Most are **binary** (2); **ternary** (3) and n-ary also exist.

## Structural constraints
| Constraint | Meaning | Examples |
| Cardinality ratio | Maximum number of relationship instances an entity can join | **1:1** employee manages at most one department; **1:N** a department has many employees, each works for one; **M:N** employees work on many projects, projects have many employees |
| Participation | Whether an entity's existence depends on the relationship | **Total** (existence dependency, double line): every employee must work for a department. **Partial** (single line): not every employee manages a department |`},

{ id:'db-weak', s:'db', lec:'db-l2', t:'Weak Entity Types', g:'⧈', img:'norm',
  sum:'Entities without their own key, identified through an owner entity.',
  key:['No key of its own → identified by owner + partial key','Identifying relationship: total participation, usually 1:N','Double rectangle, double diamond, dashed underline'],
  body:`A **weak entity type** does not have enough attributes to form a key. It is identified by its relationship to an **owner (identifying) entity type** plus some of its own attributes.

| Term | Meaning |
| Owner / identifying entity type | The entity type the weak entity depends on for identification |
| Identifying relationship | Links the weak entity to its owner. Always **total participation** on the weak side; usually **1:N** (one owner, many weak entities) |
| Partial key (discriminator) | Attribute(s) unique among weak entities of the **same owner**, but not across the whole set |

> **Example:** DEPENDENT(Name, Birth_date, Relationship) is owned by EMPLOYEE through DEPENDENTS_OF. Dependent Name is the partial key: unique among one employee's dependents only.

**Notation:** weak entity = double-outlined rectangle; identifying relationship = double diamond; partial key = dashed underline.`},

{ id:'db-roles', s:'db', lec:'db-l2', t:'Roles, Recursive Relationships & Relationship Attributes', g:'↺', img:'lean',
  sum:'Role names, recursive relationships, and attributes that belong to a relationship.',
  key:['Roles are essential in recursive relationships (Supervisor / Supervisee)','Relationships can have attributes (Hours on WORKS_ON)','1:1 or 1:N attributes can migrate to the N side; M:N attributes cannot'],
  body:`## Role names
Each entity type in a relationship plays a **role**. Roles are mostly documentation, but become essential in **recursive relationships**, where the same entity type takes part more than once.

> **Example:** SUPERVISION on EMPLOYEE: one participant plays "Supervisor", the other "Supervisee". Without roles you could not tell who supervises whom.

## Attributes of relationship types
A relationship can have its own attributes. In the M:N relationship WORKS_ON between EMPLOYEE and PROJECT, **Hours** (hours per week on a project) belongs to the relationship instance, not to either entity alone.

- For **1:1 or 1:N**, a relationship attribute can usually be **migrated** to one entity type (normally the N side) without losing information.
- For **M:N**, it must stay on the relationship, or the link between one specific pair and its value is lost.`},

{ id:'db-notation', s:'db', lec:'db-l2', t:'ER Diagram Notation (Chen) & (min,max)', g:'◇', img:'notes1',
  sum:'All the shapes used in ER diagrams, and the (min, max) labelling alternative.',
  key:['Rectangle entity; double rectangle weak entity','Oval attribute; underlined key; double oval multivalued; dashed oval derived','Diamond relationship; double diamond identifying','Double line total; single line partial; (min,max) alternative'],
  body:`| Symbol | Name | Meaning |
| Rectangle | Entity type | A set of similar objects, e.g. EMPLOYEE |
| Double rectangle | Weak entity type | Entity type with no key of its own |
| Oval | Attribute | Property of an entity or relationship |
| Oval, underlined name | Key attribute | Uniquely identifies each entity |
| Double oval | Multivalued attribute | Can hold several values |
| Dashed oval | Derived attribute | Computed from others, e.g. Age |
| Diamond | Relationship type | Association among entity types |
| Double diamond | Identifying relationship | Links a weak entity to its owner |
| Double line | Total participation | Every entity must take part |
| Single line | Partial participation | Participation is optional |

Cardinality labels (1, M, N) go on the lines near each entity type.

## (min, max) notation
Each line can instead carry a **(min, max)** pair: min = 0 means partial participation; min ≥ 1 means total; max = 1 or N gives the upper bound.`},

{ id:'db-uml', s:'db', lec:'db-l2', t:'UML Class Diagrams vs ER Diagrams', g:'UML', img:'code3',
  sum:'How UML class diagrams differ from ER diagrams.',
  key:['UML class = name + attributes + operations','Association = plain line; multiplicities 0..1, 1..*','No weak-entity symbol (use composition/aggregation)','Inheritance built in (hollow triangle); ER needs EER'],
  body:`| Aspect | ER model | UML class diagram |
| Basic construct | Entity type: rectangle with name | Class: rectangle split into name, attributes, operations |
| Association | Relationship: diamond joined to each entity | Association: plain line between classes |
| Constraints | Cardinality (1, M, N) or (min,max) | Multiplicities 0..1, 1, 0..*, 1..* at each end |
| Behaviour | Not represented (purely structural) | Classes list operations (methods) |
| Weak entities | Double rectangle and double diamond | No symbol; modelled with composition or aggregation |
| Inheritance | Not in base model; added in EER | Built in; hollow-triangle generalization arrow |
| Typical use | Conceptual design for databases | General software design |`},

{ id:'db-ternary', s:'db', lec:'db-l2', t:'Relationships of Higher Degree (Ternary)', g:'3-way', img:'hand1',
  sum:'Ternary and n-ary relationships, and why they are not always replaceable by binaries.',
  key:['SUPPLY(SUPPLIER, PART, PROJECT) records a 3-way fact','Three binaries lose which supplier supplied which part to which project','Use n-ary only when all entities must be associated at once'],
  body:`Most relationships are binary, but the ER model allows **ternary** (degree 3) and **n-ary** relationships.

> **Example:** SUPPLY among SUPPLIER, PART and PROJECT records that a given supplier furnishes a given part to a given project. Splitting it into SUPPLIER-PART, PART-PROJECT and SUPPLIER-PROJECT shows which suppliers deal in which parts and which parts go to which projects, but **loses** the specific three-way fact.

So a set of binary relationships may not capture the same information or constraints as one higher-degree relationship.

Cardinality constraints for n-ary relationships are stated per pair, e.g. a given (Supplier, Part) combination is linked to at most one Project. **Guideline:** use an n-ary relationship only when all participants must genuinely be associated together; otherwise prefer binary relationships.`},

/* ---------------- CHAPTER 3 ---------------- */
{ id:'db-eer', s:'db', lec:'db-c3', t:'EER: Superclasses, Subclasses & Inheritance', g:'IS-A', img:'owner2',
  sum:'Why basic ER is not enough, and how EER adds superclass/subclass ("is-a") hierarchies.',
  key:['Basic ER treats entities as flat boxes → duplication of Name, CNIC, HireDate','Superclass holds common attributes; subclass holds specific ones','Subclass inherits all attributes and relationships','A subclass entity is the SAME real-world entity as its superclass record'],
  body:`## Why basic ER falls short (the hierarchy problem)
1. **Limitation:** basic ER treats all entities as flat, uniform boxes.
2. **Reality:** at a university, an INSTRUCTOR, a LAB ATTENDANT and a REGISTRAR are all EMPLOYEES.
3. **Problem:** repeating Name, CNIC and HireDate in three tables is a maintenance nightmare.
4. **Solution:** Enhanced ER (EER) modelling adds **superclasses and subclasses**.

## The "is-a" relationship
| Concept | Meaning |
| Superclass | Parent entity holding common attributes, e.g. EMPLOYEE(EmpID, Name, Salary) |
| Subclass | Child entity holding unique attributes, e.g. INSTRUCTOR(HighestDegree, OfficeRank) |
| Type inheritance | A subclass automatically inherits every attribute and relationship of its superclass |
| Golden rule | A subclass entity is the **exact same** real-world person as the superclass record |`},

{ id:'db-specgen', s:'db', lec:'db-c3', t:'Specialization vs Generalization', g:'↕', img:'tree2',
  sum:'Top-down specialization and bottom-up generalization reach the same hierarchy.',
  key:['Specialization: top-down, general → subclasses (VEHICLE → CAR, TRUCK, MOTORCYCLE)','Generalization: bottom-up, combine similar types (SAVINGS + CHECKING → ACCOUNT)','Specialization refines differences; generalization consolidates commonalities'],
  body:`| Direction | Process | Example |
| Specialization (top-down) | Start with a general group and break it into distinct subclasses | VEHICLE → CAR, TRUCK, MOTORCYCLE |
| Generalization (bottom-up) | Notice similarities between separate groups and combine them under one parent | SAVINGS_ACCOUNT + CHECKING_ACCOUNT → ACCOUNT |

**Takeaway:** specialization refines differences; generalization consolidates commonalities. Both reach the same hierarchical design.`},

{ id:'db-constr', s:'db', lec:'db-c3', t:'Disjointness & Completeness Constraints', g:'d / o', img:'tree3',
  sum:'Disjoint vs overlapping, total vs partial specialization, and the four combinations.',
  key:["Disjoint 'd': at most one subclass","Overlapping 'o': several subclasses at once",'Total (double line): every superclass entity must be in a subclass','Partial (single line): may belong to none','4 combinations: D-T, D-P, O-T, O-P'],
  body:`## Disjointness constraint
| Constraint | Symbol | Rule | Example |
| Disjoint | d | An entity belongs to **at most one** subclass | A vehicle is a CAR or a TRUCK, never both |
| Overlapping | o | An entity can belong to **several** subclasses | An EMPLOYEE can be both ENGINEER and PROJECT_MANAGER |

Use **d** when roles are mutually exclusive; **o** when roles can mix.

## Completeness constraint
| Constraint | Notation | Rule | Example |
| Total specialization | Double line | Every superclass entity **must** belong to a subclass | Every STUDENT is UNDERGRADUATE or POSTGRADUATE |
| Partial specialization | Single line | A superclass entity **may** belong to no subclass | An EMPLOYEE may be basic admin staff |

## Four combinations
Disjoint-Total, Disjoint-Partial, Overlapping-Total, Overlapping-Partial.`},

{ id:'db-union', s:'db', lec:'db-c3', t:'Union Types (Categories)', g:'∪', img:'retro',
  sum:'A subclass whose parents are completely different entity types.',
  key:['OWNER can be a PERSON, BANK or COMPANY','Different parents share no common superclass','Selective inheritance: only from the parent it belongs to',"Notation: circle with 'U'"],
  body:`1. **The problem:** who owns a vehicle? A PERSON, a BANK or a COMPANY.
2. **Why inheritance fails:** a PERSON and a COMPANY do not share the same parent entity.
3. **Category (union type):** a collection representing the **union** of completely distinct entity classes.
4. **Selective inheritance:** an OWNER inherits attributes **only** from the specific parent type it belongs to.
5. **Notation:** a circle containing a **U**, connected to the parent entities.`},

{ id:'db-relmodel', s:'db', lec:'db-c3', t:'The Relational Model: Relations, Tuples & Constraints', g:'R(A)', img:'code1',
  sum:'Relations, tuples, attributes, domain constraints and entity integrity.',
  key:['Relation = table = set of rows with unique column names','Tuple = row; attribute = column','Domain constraint: values must fit the data type/range','Entity integrity: the PK can never be NULL'],
  body:`| Term | Meaning |
| Relation (table) | A mathematical set of rows with uniquely named columns |
| Tuple (row / record) | An ordered set of attribute values representing one miniworld entity |
| Attribute (column / field) | A named domain property, e.g. Student_CNIC, DOB |
| Domain constraint | Values must conform to the allowed data type and value range |
| Entity integrity | The **primary key can never be NULL** under any condition |`},

{ id:'db-refint', s:'db', lec:'db-c3', t:'Referential Integrity & ON DELETE Actions', g:'FK', img:'cart',
  sum:'The foreign-key contract and what happens when a referenced row is deleted.',
  key:['FK value must exist in the referenced table or be NULL','Violation: inserting DeptID = 99 when dept 99 does not exist','RESTRICT blocks; CASCADE deletes children; SET NULL clears FK'],
  body:`1. **Foreign key (FK):** an attribute in table A that references the primary key of table B.
2. **Integrity rule:** a foreign-key value must **either exist** in the referenced table **or be NULL**.
3. **Violation:** inserting a student with DeptID = 99 when department 99 does not exist.

## Enforcement on deletion
| Action | Effect |
| ON DELETE RESTRICT | Block the delete if child rows reference it |
| ON DELETE CASCADE | Automatically delete all matching child rows |
| ON DELETE SET NULL | Keep children but clear their FK column |`},

{ id:'db-mapping', s:'db', lec:'db-c3', t:'ER-to-Relational Mapping (Steps 1–6)', g:'ER→R', img:'lib2',
  sum:'The formal algorithm for turning an ER diagram into tables.',
  key:['Step 1 strong entity → table, flatten composites','Step 2 weak entity → table, PK = owner PK + partial key','Step 3 1:1 → FK on the total-participation side','Step 4 1:N → FK on the N side','Step 5 M:N → junction table, composite PK','Step 6 multivalued → separate table (Owner_PK, Value)'],
  body:`| Step | ER construct | Mapping rule |
| 1 | Regular (strong) entity | Standalone table with all simple attributes; choose a minimal candidate key as PK; flatten composites into simple columns (Street, City, Zip) |
| 2 | Weak entity | Separate table with its simple attributes; **PK = owner PK (as FK) + partial key (discriminator)** |
| 3 | 1:1 relationship | Foreign-key approach: put one table's PK as FK in the other. Put the FK in the table with **total participation** to avoid NULLs |
| 4 | 1:N relationship | Always put the PK of the **1** side as an FK in the **N** side. Each student belongs to one department → DeptID goes in STUDENT |
| 5 | M:N relationship | Create a **bridge / junction table** holding both PKs as FKs; together they form the composite PK |
| 6 | Multivalued attribute | Separate table (Owner_PK, Attribute_Value); both columns form the composite PK (e.g. several phone numbers) |`},

{ id:'db-eermap', s:'db', lec:'db-c3', t:'Mapping EER Hierarchies: Options 8A–8D', g:'8A–D', img:'join',
  sum:'Four ways to store superclass/subclass hierarchies, trading NULLs against joins.',
  key:['8A: superclass + subclass tables (general use)','8B: subclass tables only (total disjoint only)','8C: one table + type discriminator (NULLs)','8D: one table + boolean flags (overlapping)'],
  body:`| Option | Design | When to use |
| 8A – Multiple tables (superclass + subclasses) | Superclass table plus a table per subclass, linked by the same PK | Best for general use |
| 8B – Subclass tables only | No superclass table; common columns repeated in each subclass | Works **only** for total, disjoint hierarchies |
| 8C – Single table + type discriminator | One wide table with a 'Role' column; NULLs for non-applicable fields | Few subclass attributes, disjoint |
| 8D – Single table + boolean flags | One table with flags like is_engineer, is_manager | Best for **overlapping** subclasses |

The choice balances **NULL values** (single table) against **expensive joins** (multiple tables).`},

{ id:'db-algebra1', s:'db', lec:'db-c3', t:'Relational Algebra: σ Selection, π Projection, ρ Rename', g:'σ π ρ', img:'code2',
  sum:'The unary operators that filter rows, filter columns and rename.',
  key:['σ selects rows (horizontal filter)','π projects columns (vertical filter), removes duplicates','ρ renames relations/columns, e.g. for self-joins'],
  body:`| Operator | Symbol | What it does | Example |
| Selection | σ (sigma) | Horizontal filter: rows matching a condition | σ Salary > 50000 (EMPLOYEE) → full rows with salary over 50k |
| Projection | π (pi) | Vertical filter: keeps only listed columns | π Name, Salary (EMPLOYEE) |
| Rename | ρ (rho) | Renames a relation or columns to avoid ambiguity in self-joins | ρ E2 (EMPLOYEE) |

**Set elimination rule:** pure relational-algebra projection automatically removes duplicate rows.`},

{ id:'db-algebra2', s:'db', lec:'db-c3', t:'Relational Algebra: Set Operations', g:'∪ ∩ −', img:'tree1',
  sum:'Union, intersection, difference and Cartesian product, and union compatibility.',
  key:['Union compatibility: same number of columns, matching domains','R ∪ S both, no duplicates; R ∩ S common; R − S in R not S','R × S pairs every row; |R| × |S| rows'],
  body:`| Operation | Meaning |
| Union compatibility | Both relations must have the same number of columns with matching domains |
| Union R ∪ S | Rows from both tables, duplicates removed |
| Intersection R ∩ S | Only rows that appear in **both** |
| Set difference R − S | Rows in R that are **not** in S |
| Cartesian product R × S | Every row of R paired with every row of S; cardinality = size(R) × size(S) |`},

{ id:'db-algebra3', s:'db', lec:'db-c3', t:'Relational Algebra: Joins & Division', g:'⋈ ÷', img:'hand2',
  sum:'Theta join, equijoin, natural join and the division operator for "for all" queries.',
  key:['Theta join = Cartesian product filtered by θ','Equijoin = theta join using only =','Natural join (*) equijoins on same-named columns and drops duplicates','Division R ÷ S: tuples in R matching ALL tuples in S'],
  body:`| Operator | Meaning |
| Theta join R ⋈θ S | Cartesian product filtered by a comparison condition θ |
| Equijoin | A theta join whose condition uses only equality (=) |
| Natural join R * S | Equijoins automatically on columns with the same name and drops the duplicate columns |
| Division R ÷ S | Finds tuples in R that match **all** tuples in S |

> **Classic division problem:** "Find students who have completed **all** courses required for graduation."`},

{ id:'db-subq', s:'db', lec:'db-c3', t:'Nested & Correlated Subqueries, EXISTS vs IN', g:'( )', img:'code3',
  sum:'Queries inside queries: run once vs once per outer row.',
  key:['Uncorrelated: inner query runs once','Correlated: inner query runs for every outer row','EXISTS stops at the first match (boolean check)'],
  body:`1. **Uncorrelated subquery:** the inner query runs **once**; its result is passed to the outer query.
~~~
SELECT Name FROM EMP
WHERE  Salary > (SELECT AVG(Salary) FROM EMP);
~~~
2. **Correlated subquery:** the inner query runs **repeatedly, once for each outer row**. Example: employees earning more than the average salary of **their own** department.
~~~
SELECT E.Name FROM EMP E
WHERE  E.Salary > (SELECT AVG(Salary) FROM EMP
                   WHERE DeptID = E.DeptID);
~~~
3. **EXISTS vs IN:** EXISTS stops scanning as soon as it finds the first match (a boolean check).`},

{ id:'db-joins', s:'db', lec:'db-c3', t:'SQL Join Family: Inner & Outer Joins', g:'⟕', img:'kmeans',
  sum:'INNER, LEFT, RIGHT and FULL OUTER joins.',
  key:['INNER: only matches','LEFT: all left rows, NULL-padded','RIGHT: all right rows','FULL: all rows from both','Departments with zero students need LEFT JOIN'],
  body:`| Join | Result |
| INNER JOIN | Rows only when there is a match in both tables (orphans discarded) |
| LEFT OUTER JOIN | Every row of the left table; missing right columns padded with NULL |
| RIGHT OUTER JOIN | Every row of the right table; missing left columns padded with NULL |
| FULL OUTER JOIN | All rows from both tables, NULLs on the missing side |

> **Use case:** finding departments with **zero** enrolled students needs a LEFT JOIN.
~~~
SELECT D.Name
FROM   DEPARTMENT D LEFT JOIN STUDENT S ON S.DeptID = D.DeptID
WHERE  S.StudentID IS NULL;
~~~`},

{ id:'db-group', s:'db', lec:'db-c3', t:'GROUP BY, Aggregates & HAVING', g:'Σ', img:'apriori',
  sum:'Summarising rows into groups and filtering groups; WHERE vs HAVING.',
  key:['GROUP BY collapses rows into buckets','COUNT, SUM, AVG, MIN, MAX','WHERE filters rows BEFORE grouping; HAVING filters groups AFTER','No aggregates inside WHERE'],
  body:`1. **GROUP BY:** collapses rows into summary buckets by common values.
2. **Aggregate functions:** COUNT(), SUM(), AVG(), MIN(), MAX().
3. **WHERE vs HAVING** (the most common SQL interview question):
- **WHERE** filters individual rows **before** grouping.
- **HAVING** filters aggregated groups **after** grouping.
4. **Rule:** you cannot use aggregate functions inside a WHERE clause.
~~~
SELECT DeptID, AVG(Salary) AS avg_sal
FROM   EMPLOYEE
WHERE  Status = 'Active'          -- rows first
GROUP  BY DeptID
HAVING AVG(Salary) > 50000;       -- then groups
~~~`},

{ id:'db-trig', s:'db', lec:'db-c3', t:'Database Triggers: ECA Architecture', g:'ECA', img:'acid',
  sum:'Event-Condition-Action rules that fire inside the database engine.',
  key:['Event (INSERT/UPDATE/DELETE) → Condition → Action','BEFORE triggers validate; AFTER triggers audit','FOR EACH ROW uses NEW/OLD; FOR EACH STATEMENT fires once'],
  body:`## ECA model
- **Event:** a write operation (INSERT, UPDATE, DELETE).
- **Condition:** an optional boolean check before the trigger body runs.
- **Action:** stored procedural code executed if the condition holds.

## BEFORE vs AFTER
**BEFORE** triggers validate or sanitize inputs; **AFTER** triggers audit changes.

## Row vs statement
**FOR EACH ROW** inspects NEW/OLD values per tuple; **FOR EACH STATEMENT** fires once per statement.

> **Audit trail:** an AFTER UPDATE trigger can write OLD and NEW salary, the user and the time into an audit table automatically, so changes cannot be hidden.`},

{ id:'db-assert', s:'db', lec:'db-c3', t:'CHECK, Assertions vs Triggers', g:'✓', img:'notes1',
  sum:'Enforcing rules within a row, across tables, and how industry does it.',
  key:['CHECK validates one row, e.g. CHECK (Salary > 0)','CREATE ASSERTION checks invariants across tables','Most DBMSs avoid general assertions (overhead)','Multi-table rules are enforced with triggers'],
  body:`1. **CHECK constraints:** validate logic within a single row, e.g. CHECK (Salary > 0).
2. **CREATE ASSERTION:** a schema-level rule checking invariants across multiple tables. Example: "Total salary of a department cannot exceed its allocated budget."
3. **Practical reality:** most commercial engines (MySQL, Oracle) avoid general assertions because of severe performance overhead.
4. **Industry solution:** complex multi-table rules are enforced with **triggers**.`},

{ id:'db-views', s:'db', lec:'db-c3', t:'SQL Views: Virtual Tables', g:'VIEW', img:'lib1',
  sum:'Stored queries that behave like tables, for security and simplicity.',
  key:['View = stored query used as a virtual table','Security: hide columns like Salary','Simplicity: hide 5-table joins','Updatable only if single table, no aggregates','WITH CHECK OPTION blocks rows that would vanish'],
  body:`| Feature | Meaning |
| Definition | A stored SQL query that behaves like a virtual table at runtime |
| Security shield | Restricts sensitive data, e.g. a view of EMPLOYEES without Salary |
| Query simplification | Hides a messy 5-table join behind SELECT * FROM view_name |
| Updatable views | Accept INSERT/UPDATE only if built on a single table without aggregations |
| WITH CHECK OPTION | Prevents inserting rows that would immediately disappear from the view |
~~~
CREATE VIEW emp_public AS
SELECT EmpID, Name, DeptID FROM EMPLOYEE
WITH CHECK OPTION;
~~~`},

{ id:'db-ddl', s:'db', lec:'db-c3', t:'Schema Changes with ALTER and DROP (DDL)', g:'ALTER', img:'code1',
  sum:'Safely altering table structures in live databases.',
  key:['ADD COLUMN (set a DEFAULT)','DROP COLUMN (CASCADE drops dependent views)','MODIFY / ALTER COLUMN type or NULL','DROP TABLE RESTRICT fails if FKs point here; CASCADE removes them','Big tables lock → maintenance window'],
  body:`| Command | Effect |
| ALTER TABLE … ADD COLUMN | Adds a new attribute (prefer a DEFAULT value) |
| ALTER TABLE … DROP COLUMN | Removes an attribute (CASCADE also drops dependent views) |
| ALTER TABLE … MODIFY / ALTER COLUMN | Changes a data type or NULL constraint |
| DROP TABLE … RESTRICT | Fails if foreign keys point to this table |
| DROP TABLE … CASCADE | Drops the table and the child constraints |

**Production warning:** altering million-row tables locks them and needs a maintenance window.`},

{ id:'db-review', s:'db', lec:'db-c3', t:'Chapter 3 Review Questions (with answers)', g:'Q&A', img:'lib2',
  sum:'The four check questions from the end of Chapter 3, answered from the slides.',
  key:['8A for general/large subclass data; 8C for few subclass attributes with disjoint roles','FK on N side because each N row points to exactly one parent','WHERE filters rows, HAVING filters groups','AFTER UPDATE trigger writes OLD/NEW values to an audit table'],
  body:`## 1. When choose Option 8A vs Option 8C for EER subclasses?
**8A** (superclass table + subclass tables linked by the same PK) is the general-purpose choice; it avoids NULLs but needs joins. **8C** (one wide table + type discriminator) avoids joins but fills non-applicable fields with NULL; use it when subclasses have few specific attributes and roles are disjoint.

## 2. Why must the FK go on the N side of a 1:N relationship?
Each row on the N side relates to exactly one row on the 1 side, so it can hold a single FK value. Putting it on the 1 side would need many values in one cell (a repeating group). Example: DeptID goes inside STUDENT.

## 3. Differentiate WHERE and HAVING
WHERE filters individual rows before grouping; HAVING filters groups after aggregation.
~~~
SELECT DeptID, COUNT(*) FROM STUDENT
WHERE  Status = 'Enrolled'
GROUP  BY DeptID
HAVING COUNT(*) > 50;
~~~
## 4. How does an AFTER UPDATE trigger give a tamper-proof audit trail?
It fires automatically after every update, FOR EACH ROW, and inserts the OLD and NEW values, the user and a timestamp into an audit table. Because it runs inside the engine, applications cannot skip it.`}
]);
