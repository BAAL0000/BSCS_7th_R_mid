/* Extra easy content for Database topics: m = "More to remember" notes, q = quick questions [question, short answer] */
window.MORE = Object.assign(window.MORE || {}, {

'db-cat': { m: `## Remember the 3 families with one picture each
- **Relational = Excel sheet with strict rules.** Every row has the same columns. Good for banks, schools, shops.
- **NoSQL = a notebook.** Each page can look different. Good for social media posts, chats, very big websites.
- **Graph = a friends map.** Dots (people) joined by lines (friendships). Good for "people you may know".

## Easy way to remember OLTP vs OLAP
- **OLTP = "T" for Transaction** → the cashier: many tiny jobs every second (buy, pay, withdraw).
- **OLAP = "A" for Analysis** → the manager: a few big questions about old data (trends, reports).
- OLTP tables are **normalized (3NF)** so updates are quick and safe.
- OLAP uses **star / snowflake / column** designs so big reports run fast.

## Special domains with a real example each
| Domain | Real example |
| GIS / spatial | Google Maps finding the nearest petrol pump |
| Time-series | a weather sensor sending temperature every minute |
| Bioinformatics | storing a person's DNA letters |
| Cloud warehouse | a big company storing 10 years of sales in the cloud |`,
 q: [['Which database type follows ACID strictly?','Relational (RDBMS).'],['Give 2 NoSQL examples.','MongoDB and Redis (also Cassandra).'],['ATM withdrawal is OLTP or OLAP?','OLTP (one quick transaction).'],['Which schema does OLAP use?','Star, snowflake or columnar data warehouse.']] },

'db-basics': { m: `## Data → Information in 3 steps
1. **Data:** "Ali", "85", "DB" (just values).
2. **Add context:** Ali got 85 marks in Database.
3. **Information:** "Ali passed Database with grade A."

## The triad as a shop
| Word | In a shop | Meaning |
| Database | the goods on the shelves | the stored data |
| DBMS | the shopkeeper | software that manages the data |
| Database system | the whole shop | hardware + DBMS + data + apps |

## More about the miniworld
- Also called the **Universe of Discourse**.
- It is only the **part** of the world we care about, not the whole world. A university database doesn't store students' favourite food.
- If the real world changes, the database must be **updated** to stay correct.

## More about metadata
- Stored in the **catalog / data dictionary**.
- It holds: table structures, data types, constraints (rules), **user permissions**, and file mappings.
- The DBMS reads the metadata before doing anything, to check the request is valid.`,
 q: [['Is "404" data or information?','Data (no meaning yet).'],['Name the 3 parts of the database triad.','Database, DBMS, Database system.'],['Another name for miniworld?','Universe of Discourse.'],['Where is metadata stored?','In the system catalog / data dictionary.']] },

'db-func': { m: `## Memory trick: "**D**ogs **C**an **M**ake **S**ounds"
**D**efine → **C**onstruct → **M**anipulate → **S**hare.

## What each stage really includes (from the slides)
**1. Define (DDL)**
- Set table structures and column **domains** (allowed values).
- Create **primary keys** and **foreign keys**.

**2. Construct**
- **Bulk-load** data from outside files.
- Allocate disk blocks and **build B-tree indexes**.

**3. Manipulate (DML)**
- Get records with **SQL queries**.
- **Insert, update, delete** many records (batch updates).

**4. Share & protect**
- **Isolation** so two users don't spoil each other's work (no race problems).
- **Permissions** for each user role.

## The 3 background helpers
| Helper | What it does | Simple picture |
| Write-ahead log | writes each change in a diary **before** saving | a diary you can read after a crash |
| Query optimizer | picks the fastest plan | Google Maps choosing the quickest road |
| Reorganization | defragment, vacuum, update statistics | cleaning and arranging a messy room |`,
 q: [['First DBMS stage?','Define (DDL).'],['Which stage builds indexes?','Construct.'],['Why write a log before commit?','So the database can recover exactly after a crash.'],['What does the query optimizer choose?','The lowest-cost (fastest) execution plan.']] },

'db-uni': { m: `## Why 4 tables and not 1?
If everything were in one table, the course title would be repeated for every student. Splitting into STUDENT, COURSE, SECTION and GRADE_REPORT stores each fact **once**.

## How the tables connect
- **COURSE → SECTION:** a course (e.g. CS-301) can run many sections (Fall 2025, Spring 2026).
- **STUDENT + SECTION → GRADE_REPORT:** one row per student per section, holding the grade.

## Reading the sample rows
| StudentID | Name | Class | Major |
| 17 | Smith | Senior | CS |
| 23 | Brown | Sophomore | CS |
- Grade row (17, 112, B) means **student 17 (Smith) got B in section 112**.
- The FK (17) must exist in STUDENT; otherwise the DBMS rejects the row.

## The query in plain English
"From STUDENT and GRADE_REPORT, join rows where the StudentIDs match, keep only Smith, and show the course number and grade."

## Why the transaction matters
If the system adds the grade row but crashes before reducing the seat, the seat count is wrong. The transaction makes it **all or nothing**.`,
 q: [['Which column is the PK of STUDENT?','StudentID.'],['What does (23, 119, A) mean?','Student 23 (Brown) got grade A in section 119.'],['What keyword ends a transaction successfully?','COMMIT.'],['Why use a transaction for enrolment?','So the insert and the seat update happen together or not at all.']] },

'db-char': { m: `## Database approach vs old file approach
| Point | Old file system | Database approach |
| Design info | hidden inside each program's code (byte positions) | stored in the catalog |
| Change the structure | rewrite all programs | programs keep working |
| Many users | files get corrupted | locking / MVCC keeps it safe |
| Different users | everyone sees the same file | each user gets their own view |

## Remember the 4 with "**S-P-V-C**"
**S**elf-describing, **P**rogram-data independence, multiple **V**iews, **C**oncurrency.

## Extra points from the slides
- **Catalog driven:** the DBMS works the same way for a bank or a hospital, because it reads the catalog.
- **Uniform querying:** you can query the catalog tables with SQL like normal tables.
- **MVCC** (multi-version concurrency control): readers see an older copy while a writer is working, so nobody waits too long.`,
 q: [['What does "self-describing" mean?','The database stores its own schema (in the catalog).'],['Adding an email column without breaking queries shows…?','Logical data independence.'],['Moving data from HDD to SSD without changing programs shows…?','Physical data independence.'],['Two ways to control concurrency?','Locking and MVCC.']] },

'db-actors': { m: `## Easy way to remember the 3 main actors
- **DBA = the guard** (protects, backs up, gives keys/permissions).
- **Designer = the architect** (draws the plan of tables).
- **Programmer = the builder** (builds the app screens).

## End users by how often and how deeply they use it
| Type | How often | How deep | Example |
| Naive / parametric | all day | very shallow (buttons) | bank teller, airline agent |
| Casual | sometimes | medium (different questions) | middle manager, researcher |
| Sophisticated | often | very deep (complex models) | data scientist, financial quant |
| Standalone | for themselves | uses ready-made software | personal tax or photo app |

## Workers behind the scene: who builds what
- **DBMS system designers:** write the DBMS itself (the kernel, buffer manager, SQL parser).
- **Tool developers:** make design tools, GUI profilers, benchmark suites.
- **Operators / maintenance:** keep the servers, network, cooling and backup power running.`,
 q: [['Who gives permissions to users?','The DBA.'],['A bank teller is which type of user?','Naive / parametric.'],['Who writes the SQL parser?','DBMS system designers (workers behind the scene).'],['Who identifies entities and relationships?','The database designer.']] },

'db-adv': { m: `## Advantages explained simply
- **Controlled redundancy:** store each fact once → saves space and avoids "update anomalies" (one copy changed, the other not).
- **Integrity constraints:** the DBMS refuses wrong data automatically:
  - data types and limits (GPA between 0.0 and 4.0)
  - referential integrity (no foreign key pointing to nothing)
- **Automated recovery:** rolls back unfinished work and re-applies committed work after a crash.
- **Standardization:** the DBA sets common names, formats and dictionary rules.
- **Rapid development:** programmers skip low-level file and index coding.

## When NOT to use a heavy DBMS
| Situation | Why not | Use instead |
| Small simple project | licence, servers and DBA cost more than the benefit | simple files / free DB |
| Hard real-time system (autopilot) | query parsing adds delay | special embedded code |
| One user, no sharing | DBMS features unused | flat files or SQLite |`,
 q: [['What is an update anomaly?','When a fact stored twice is changed in one place but not the other.'],['Example of an integrity constraint?','GPA must be between 0.0 and 4.0.'],['Why not use a DBMS in a flight autopilot?','It cannot tolerate query-processing delay (hard real-time).'],['What is a good choice for a single-user desktop app?','Flat files or SQLite.']] },

'db-hist': { m: `## Timeline to remember
| When | Model / event | Key fact |
| 1960s | Hierarchical | tree (1 parent → many children); IBM IMS, Apollo |
| Early 1970s | Network (CODASYL) | many parents via pointers; fragile |
| 1970 | Relational (Codd) | tables + maths; say WHAT, not HOW |
| Late 1970s–80s | IBM System R | created SEQUEL → SQL; led to Oracle, DB2, SQL Server |
| 1990s | Object-relational | OOP features, XML/JSON |
| 2000s | Big data | Google Bigtable, MapReduce |
| 2010s | NoSQL | trade strict ACID for scaling (CAP theorem) |
| Today | Cloud-native | Spanner, CockroachDB (global consistency) |

## Problems of the old models
- Hierarchical **couldn't do many-to-many** links directly.
- Network's **pointers broke easily** (brittle).

## Modern frontiers in one line each
- **Streaming:** process endless live events (Kafka, Flink).
- **Lakehouse:** cheap cloud storage + ACID (Delta Lake, Iceberg, Snowflake).
- **Vector DB:** text/images turned into number vectors (e.g. 1536 numbers); fast similar-item search (HNSW); feeds facts to AI chatbots (RAG).
- **Next decade:** self-driving (AI-tuned) databases, GPU/FPGA speed, one engine for all data types.`,
 q: [['Who proposed the relational model and when?','Edgar F. Codd, 1970.'],['Which project created SEQUEL/SQL?','IBM System R.'],['What did NoSQL give up for scaling?','Strict ACID (following the CAP theorem).'],['What does RAG stand for?','Retrieval-Augmented Generation.']] },

'db-models': { m: `## Three levels as a house
| Level | House example | Database example | Who uses it |
| Conceptual (high) | the family's wish list: 3 rooms, 1 kitchen | ER diagram | users & designers |
| Representational | the architect's drawing | relational tables | designers, programmers |
| Physical (low) | bricks, pipes, wires | files, records, B+-tree index | system programmers |

## Extra points
- A data model describes **structure** (types, relationships, constraints) **and** basic **operations** (retrieve, update).
- Some models also describe **behaviour**, like triggers or user-defined operations.
- The **relational** model is the most used representational model today.`,
 q: [['Which level uses ER diagrams?','High-level (conceptual).'],['Relational model belongs to which category?','Representational (implementation).'],['Who mostly uses physical models?','System programmers.'],['Besides structure, what else does a data model include?','Operations (and sometimes behaviour such as triggers).']] },

'db-schema': { m: `## Two pairs of names to remember
- **Schema = intension** (the "intended" design).
- **State = extension** (what the design is "extended"/filled with).

## Types of state
- **Empty state:** schema defined, no data yet.
- **Initial state:** the first data loaded.
- **Current state:** the data right now.
- **Valid state:** follows every rule of the schema.

## Schema diagram
A picture showing table names and columns, e.g.
STUDENT(Name, StudentID, Class, Major) → COURSE(Title, CourseNumber, Credits).
It shows **structure only**, never the actual rows.`,
 q: [['Another name for schema?','Intension.'],['Another name for the database state?','Extension (or snapshot / instance).'],['Does the schema change often?','No, rarely.'],['What is a valid state?','A state that satisfies all constraints of the schema.']] },

'db-3schema': { m: `## Purpose (why ANSI/SPARC made it)
1. Separate **user views** from **physical storage**.
2. Let changes at one level **not disturb** the others.

## Levels with one word each
- **External = Views** (many; one per user group).
- **Conceptual = Whole** (one design for the whole database).
- **Internal = Storage** (one physical layout).

## The two mappings with a simple example
- **External ↔ Conceptual:** the "Student Portal" view shows only Name and Grade from the full STUDENT and GRADE tables.
- **Conceptual ↔ Internal:** the STUDENT table is stored in file stu.dat with an index on StudentID.

**Exam tip:** draw 3 boxes on top of each other (External, Conceptual, Internal) with arrows labelled with the two mappings.`,
 q: [['Which level has many schemas?','External level (one view per user group).'],['Which level hides storage details?','Conceptual level.'],['Name the 2 mappings.','External/conceptual and conceptual/internal.'],['Main goal of the architecture?','To support data independence.']] },

'db-indep': { m: `## Compare in one table
| Point | Physical independence | Logical independence |
| What changes | internal schema (storage) | conceptual schema (tables/columns) |
| What stays the same | conceptual schema & programs | external views & programs |
| Which mapping absorbs it | conceptual/internal | external/conceptual |
| Example | add an index, new SSD | add a column, split a table |
| Difficulty | easier | harder |

## Why logical is harder
Programs are often written for an exact table layout (column names, order). Changing the layout can break them unless views hide the change.`,
 q: [['Adding an index is which type?','Physical data independence.'],['Splitting a table and redefining views is which type?','Logical data independence.'],['Which is harder to achieve?','Logical data independence.'],['Which mapping absorbs storage changes?','Conceptual/internal mapping.']] },

'db-lang': { m: `## Languages by job
| Language | Job | Example |
| DDL | define structure | CREATE TABLE, ALTER TABLE |
| VDL | define views | CREATE VIEW |
| SDL | define storage | file and index settings |
| DML | work with data | SELECT, INSERT, UPDATE, DELETE |

## High-level vs low-level DML
| High-level (SQL) | Low-level |
| non-procedural: say WHAT | procedural: say HOW |
| set-at-a-time (many rows) | record-at-a-time (one row) |
| used alone or embedded | must be embedded, needs loops |

## Interfaces with users
- Menu → web visitors. Forms → data-entry clerks. GUI → people who like clicking diagrams.
- Natural language → "show me all students in CS". Parametric → bank teller buttons.
- DBA interface → create accounts, grant/revoke rights, tune performance.
- Also speech and mobile interfaces.`,
 q: [['CREATE TABLE is which language?','DDL.'],['Is SQL procedural or non-procedural?','Non-procedural (high-level DML).'],['What is record-at-a-time DML?','Low-level DML that fetches one record at a time in a loop.'],['Which interface suits a bank teller?','Parametric interface.']] },

'db-util': { m: `## 4 utilities = "**L**azy **B**oys **R**arely **M**ove"
**L**oading, **B**ackup, **R**eorganization, **M**onitoring.

## What each solves
| Utility | Problem it solves |
| Loading | getting old data (text files) into the DB |
| Backup | losing data after a failure |
| File reorganization | slow performance from messy files |
| Performance monitoring | not knowing what is slow |

## Other tools in one line
- **Data dictionary / repository:** metadata store (can be queried).
- **Application generators:** auto-make data-entry forms and reports.
- **CASE tools:** help in the early design phase.
- **Communication software:** remote/network access to the DBMS.`,
 q: [['Which utility makes periodic safety copies?','Backup.'],['Which tool helps early design?','CASE tools.'],['What does performance monitoring give the DBA?','Usage statistics to decide things like which indexes to build.'],['What stores metadata and can be queried?','The data dictionary / repository.']] },

'db-arch': { m: `## The three architectures compared
| Type | Who does the work | Example |
| Centralized | one big machine does everything | old mainframe with terminals |
| Two-tier | client (UI + some logic) + DB server | desktop app talking straight to MySQL |
| Three-tier | browser + app server + DB server | online shopping website |

## Two kinds of two-tier
- **File server:** the server only sends files; the client does most processing (old style).
- **Database server:** the server runs queries and transactions (common today).

## Why three-tier is popular
- **Security:** clients never talk to the database directly.
- **Scalability:** you can add more app servers when users grow.`,
 q: [['In which architecture does the client talk directly to the DB server?','Two-tier.'],['Name the 3 tiers.','Presentation, application (business logic), database.'],['Why is three-tier more secure?','Clients never access the database directly.'],['What did terminals in centralized systems lack?','Their own processing power.']] },

'db-class': { m: `## Remember the 6 ways: "**M**y **U**ncle **S**ells **C**heap **P**ink **W**atches"
**M**odel, **U**sers, **S**ites, **C**ost, **P**urpose (access path), **W**orkload.

## Extra detail
- **NoSQL families:** document, key-value, column-family, graph.
- **Distributed:** homogeneous = same DBMS at all sites; heterogeneous = different DBMSs.
- **Special-purpose example:** airline reservation systems (fast but not general).
- **OLTP vs OLAP:** many short read/write transactions vs big read-mostly reports.`,
 q: [['Name the 4 NoSQL families.','Document, key-value, column-family, graph.'],['What is a heterogeneous distributed DB?','Different DBMSs at different sites.'],['Example of a special-purpose DBMS?','Airline reservation system.'],['Two workload types?','OLTP and OLAP (data warehousing).']] },

'db-design': { m: `## The 4 phases with their output
| Phase | Output (what you get) |
| Requirements | list of data needs + functional needs |
| Conceptual design | ER / EER diagram |
| Logical design | relational tables (schema) |
| Physical design | indexes, file organization |

## Two parallel jobs
- **Database design:** the structure.
- **Application design:** the programs and transactions.
Functional requirements (what the users will DO) are collected next to the data requirements, and the conceptual schema is checked against them.`,
 q: [['Output of conceptual design?','An ER/EER diagram (conceptual schema).'],['Another name for logical design?','Data model mapping.'],['Which phase chooses indexes?','Physical design.'],['What are functional requirements?','The operations and transactions the application must perform.']] },

'db-er': { m: `## Attribute types as pairs (remember the opposite)
| Pair | Example A | Example B |
| Simple vs Composite | Age | Address (Street, City, Zip) |
| Single-valued vs Multivalued | Age | Phone numbers |
| Stored vs Derived | Birth_Date | Age |

## Extra details
- The **stored attribute** used to calculate a derived one is called its **prerequisite** (Birth_Date is the prerequisite of Age).
- **Complex attribute** = composite + multivalued mixed, e.g. several addresses, each with Street/City/Zip.
- **NULL has 3 meanings:**
  1. not applicable (no college degree)
  2. known to exist but missing (has a phone, number not recorded)
  3. not known if it exists`,
 q: [['Who proposed the ER model?','Peter Chen, 1976.'],['Is "Phone numbers" single or multivalued?','Multivalued.'],['Age calculated from Birth_Date is…?','A derived attribute (Birth_Date is its prerequisite).'],['Give the meanings of NULL.','Not applicable, or unknown (missing / not known if it exists).']] },

'db-keys': { m: `## Key words in one line each
- **Entity type** = the class (STUDENT).
- **Entity set** = all students saved right now.
- **Key attribute** = unique for each entity (uniqueness constraint).
- **Candidate key** = any attribute that could be the key.
- **Value set / domain** = allowed values.

## Examples
| Entity type | Possible key | Not a key (why) |
| STUDENT | RollNo, CNIC | Name (two "Ahmed"s) |
| CAR | RegistrationNo, ChassisNo | Colour (many red cars) |
| BOOK | ISBN | Title (same title, different editions) |`,
 q: [['Difference between entity type and entity set?','Type = the definition; set = the actual entities stored now.'],['What constraint does a key give?','Uniqueness constraint.'],['Can an entity have more than one candidate key?','Yes, e.g. RollNo and CNIC.'],['What is a domain?','The set of allowed values for an attribute.']] },

'db-rel': { m: `## Two questions to always ask
1. **"At most how many?"** → cardinality ratio (1:1, 1:N, M:N).
2. **"Must every one join?"** → participation (total or partial).

## Practice table
| Relationship | Cardinality | Participation |
| Employee MANAGES Department | 1:1 | Employee partial, Department total |
| Department HAS Employees | 1:N | Employee total |
| Employee WORKS_ON Project | M:N | depends on the rules |
| Student ENROLLS in Course | M:N | Student usually total |

## Words to know
- **Relationship instance** = one specific link (Ali works for IT).
- **Relationship type** = the general link (WORKS_FOR).
- **Structural constraints** = cardinality + participation together.`,
 q: [['Degree of a binary relationship?','2.'],['Total participation is drawn as…?','A double line.'],['Employees and projects with many on both sides is…?','M:N.'],['Cardinality + participation together are called…?','Structural constraints.']] },

'db-weak': { m: `## 4 must-know facts about weak entities
1. **No key of its own.**
2. Needs an **owner** (identifying) entity.
3. Uses a **partial key** (discriminator) unique only per owner.
4. Its identifying relationship is **total** on the weak side and usually **1:N**.

## Drawing checklist
- Weak entity → **double rectangle**.
- Identifying relationship → **double diamond**.
- Partial key → **dashed underline**.

## More examples
| Owner | Weak entity | Partial key |
| EMPLOYEE | DEPENDENT | Name |
| BUILDING | ROOM | RoomNo |
| ORDER | ORDER_ITEM | LineNo |`,
 q: [['How is a weak entity identified?','By the owner\'s key + its own partial key.'],['Symbol for an identifying relationship?','Double diamond.'],['Is the identifying relationship total or partial on the weak side?','Total.'],['Another name for partial key?','Discriminator.']] },

'db-roles': { m: `## When are role names needed?
Only when it is not obvious, mainly in **recursive** relationships (an entity type related to itself).

## More recursive examples
| Relationship | Entity | Role 1 | Role 2 |
| SUPERVISION | EMPLOYEE | Supervisor | Supervisee |
| MARRIED_TO | PERSON | Husband | Wife |
| PREREQUISITE | COURSE | Required course | Next course |

## Relationship attributes: where do they go?
- **1:1** → can move to either entity.
- **1:N** → move to the **N side**.
- **M:N** → must stay on the **relationship** (e.g. Hours on WORKS_ON).`,
 q: [['What is a recursive relationship?','An entity type related to itself (e.g. SUPERVISION on EMPLOYEE).'],['Where does Hours in WORKS_ON (M:N) belong?','On the relationship itself.'],['For 1:N, where can a relationship attribute move?','To the entity on the N side.'],['Why are roles needed in recursive relationships?','To tell which entity plays which part.']] },

'db-notation': { m: `## "Double means special" rule
- Double rectangle → weak entity.
- Double oval → multivalued attribute.
- Double diamond → identifying relationship.
- Double line → total participation.

## Other shapes
- **Underlined** text → key. **Dashed underline** → partial key.
- **Dashed oval** → derived attribute.
- Ovals attached to ovals → composite attribute.

## (min, max) examples
| Line label | Meaning |
| (0, 1) | optional, at most one |
| (1, 1) | exactly one (total) |
| (0, N) | optional, many |
| (1, N) | at least one, many (total) |`,
 q: [['What does a double oval show?','A multivalued attribute.'],['What does (0,1) mean?','Optional participation, at most one.'],['What does a dashed oval show?','A derived attribute.'],['Total participation in (min,max) means min is…?','1 or more.']] },

'db-uml': { m: `## Translate ER words into UML words
| ER word | UML word |
| Entity type | Class |
| Attribute | Attribute |
| Relationship type | Association |
| Cardinality (1, N) | Multiplicity (1, 0..*, 1..*) |
| Weak entity | Composition / aggregation |
| Specialization (EER) | Generalization (hollow triangle) |

## Multiplicity meanings
- **0..1** = zero or one. **1** = exactly one.
- **0..*** = zero or many. **1..*** = one or many.`,
 q: [['Third compartment of a UML class holds…?','Operations (methods).'],['UML word for relationship type?','Association.'],['How does UML show weak entities?','With composition or aggregation.'],['Which notation has inheritance built in?','UML (hollow-triangle generalization).']] },

'db-ternary': { m: `## Ternary in one sentence
"**Who** supplied **what** to **where**" — three entities linked in one fact.

## How to decide binary or ternary
Ask: "Do I need all three together to state the fact?"
- **Yes** → ternary.
- **No** → binary relationships are simpler and better.

## Another example
TEACHES(TEACHER, COURSE, SEMESTER): "Dr. Ali teaches Database in Fall 2025." Splitting it loses which semester a teacher taught which course.`,
 q: [['Degree of a ternary relationship?','3.'],['Why not always split into binaries?','You can lose the exact 3-way fact or constraint.'],['How are ternary constraints stated?','Per pair, e.g. (Supplier, Part) → at most one Project.'],['When should you use n-ary?','Only when all entities must be associated together.']] },

'db-eer': { m: `## EER words
- **Superclass** (parent) and **subclass** (child).
- **IS-A relationship:** an INSTRUCTOR **is a** EMPLOYEE.
- **Type inheritance:** a child gets all of the parent's attributes **and relationships**.

## Example tree
EMPLOYEE (EmpID, Name, CNIC, HireDate, Salary)
- INSTRUCTOR (+ HighestDegree, OfficeRank)
- LAB_ATTENDANT (+ LabName)
- REGISTRAR (+ OfficeNo)

Name and CNIC are written **once** (in EMPLOYEE), not three times.`,
 q: [['What problem does EER solve?','Repeating shared attributes across similar entities.'],['What is type inheritance?','A subclass gets all attributes and relationships of its superclass.'],['Is an instructor record a different person from its employee record?','No, the same real-world entity.'],['Name the relationship between subclass and superclass.','IS-A.']] },

'db-specgen': { m: `## Compare
| Point | Specialization | Generalization |
| Direction | top-down | bottom-up |
| Start with | one general class | many specific classes |
| Focus | differences | similarities |
| Example | VEHICLE → CAR, TRUCK | SAVINGS + CHECKING → ACCOUNT |

Both end with the **same** superclass/subclass hierarchy.`,
 q: [['Top-down process?','Specialization.'],['Bottom-up process?','Generalization.'],['Which focuses on similarities?','Generalization.'],['Give a specialization example.','VEHICLE → CAR, TRUCK, MOTORCYCLE.']] },

'db-constr': { m: `## Two questions, four answers
1. **Can one entity be in 2 subclasses?** No → disjoint (d). Yes → overlapping (o).
2. **Must every entity be in a subclass?** Yes → total (double line). No → partial (single line).

## One example for each combination
| Combination | Example |
| Disjoint-Total | STUDENT → UNDERGRAD / POSTGRAD |
| Disjoint-Partial | VEHICLE → CAR / TRUCK (bicycles are neither) |
| Overlapping-Total | PERSON → STUDENT / EMPLOYEE (everyone is at least one) |
| Overlapping-Partial | EMPLOYEE → ENGINEER / MANAGER (some are just staff) |`,
 q: [['Symbol for disjoint?','d (in a circle).'],['Symbol for overlapping?','o.'],['Total specialization line?','Double line.'],['How many combinations are there?','Four.']] },

'db-union': { m: `## Union type vs normal inheritance
| Point | Normal subclass | Union type (category) |
| Parents | one superclass | several different superclasses |
| Inherits | everything from its parent | only from the parent it belongs to |
| Symbol | circle with d / o | circle with **U** |

## Another example
ACCOUNT_HOLDER = PERSON ∪ COMPANY. A person holder has CNIC; a company holder has NTN number.`,
 q: [['What is another name for union type?','Category.'],['Symbol?','A circle with U.'],['What is selective inheritance?','Inheriting only from the parent type the entity actually belongs to.'],['Give an example.','OWNER = PERSON ∪ BANK ∪ COMPANY.']] },

'db-relmodel': { m: `## Same thing, three names
| Formal | Table word | File word |
| Relation | Table | File |
| Tuple | Row | Record |
| Attribute | Column | Field |

## Two rules to remember
- **Domain constraint:** right type and range (Age is a number 0–150).
- **Entity integrity:** **PK can never be NULL** (otherwise we can't identify the row).

Bonus: a relation is a **set**, so the order of rows does not matter and there are no exact duplicate rows.`,
 q: [['Formal word for row?','Tuple.'],['Can a primary key be NULL?','No (entity integrity).'],['What does the domain constraint check?','Values match the allowed type and range.'],['Formal word for column?','Attribute.']] },

'db-refint': { m: `## The rule in one line
**A foreign key must point to a real row, or be NULL.**

## Ways to break it
- **Insert** a child with a missing parent (DeptID 99 that doesn't exist).
- **Update** a child's FK to a missing value.
- **Delete** a parent that still has children.

## Choosing an ON DELETE action
| Action | Use when |
| RESTRICT | children must never be lost by accident |
| CASCADE | children have no meaning without the parent (order items of a deleted order) |
| SET NULL | children can exist without the parent (employee whose department closed) |`,
 q: [['When is a foreign key value valid?','When it exists in the referenced table or is NULL.'],['Which action deletes children automatically?','ON DELETE CASCADE.'],['Which action blocks the delete?','ON DELETE RESTRICT.'],['Which keeps children but clears their FK?','ON DELETE SET NULL.']] },

'db-mapping': { m: `## Steps as a checklist
| Step | If you see… | Do this |
| 1 | strong entity | new table, simple columns, pick PK |
| 2 | weak entity | new table, PK = owner PK + partial key |
| 3 | 1:1 | FK in the table with total participation |
| 4 | 1:N | FK on the N side |
| 5 | M:N | new junction table with both PKs |
| 6 | multivalued attribute | new table (owner PK, value) |

## Memory tricks
- **"Many holds the key"** → in 1:N, the many side gets the FK.
- **"M:N needs a middle man"** → junction table.
- Composite attributes are **flattened** (Address → Street, City, Zip columns).`,
 q: [['Where does the FK go in 1:N?','On the N (many) side.'],['How is M:N mapped?','With a junction (bridge) table holding both PKs as a composite PK.'],['PK of a weak entity table?','Owner\'s PK + partial key.'],['How is a multivalued attribute mapped?','A separate table (owner PK, value), both forming the PK.']] },

'db-eermap': { m: `## Pick the option quickly
| Situation | Best option |
| general case, many subclass attributes | 8A |
| every entity in exactly one subclass (total + disjoint) | 8B |
| disjoint, few subclass attributes, want no joins | 8C |
| overlapping subclasses | 8D |

## Trade-off in one line
**More tables = more joins. One table = more NULLs.**`,
 q: [['Option for overlapping subclasses?','8D (boolean flags).'],['When does 8B work?','Only for total and disjoint hierarchies.'],['What does 8C add?','A type/role discriminator column.'],['Main trade-off?','Joins (many tables) vs NULLs (one table).']] },

'db-algebra1': { m: `## Symbols to remember
| Symbol | Name | Picks | SQL part |
| σ | Selection | rows | WHERE |
| π | Projection | columns | SELECT list |
| ρ | Rename | new names | AS |

## Combining them
π Name (σ Dept = 'IT' (EMPLOYEE)) → "names of IT employees".
Read from the **inside out**: first select rows, then project columns.`,
 q: [['Which operator filters rows?','σ (selection).'],['Which filters columns?','π (projection).'],['Does π remove duplicates?','Yes, in pure relational algebra.'],['Why use ρ?','To rename relations/columns, e.g. in self-joins.']] },

'db-algebra2': { m: `## Union compatibility (needed for ∪, ∩, −)
Same number of columns + matching domains (types).

## Quick results
For R = {1, 2, 3} and S = {2, 3, 4}:
- R ∪ S = {1, 2, 3, 4}
- R ∩ S = {2, 3}
- R − S = {1}
- S − R = {4} (difference is not symmetric)

## Cartesian product
R with 3 rows and S with 4 rows gives **3 × 4 = 12** rows.`,
 q: [['What is union compatibility?','Same number of columns with matching domains.'],['Is R − S equal to S − R?','No.'],['Rows in R × S if R has 5 and S has 2?','10.'],['Does union keep duplicates?','No, duplicates are removed.']] },

'db-algebra3': { m: `## Join family
| Join | Condition | Duplicate columns |
| Theta (⋈θ) | any comparison | kept |
| Equijoin | only = | kept |
| Natural (*) | = on same-named columns | removed |

## Division "for all" questions
- "Students who took **all** required courses."
- "Suppliers who supply **all** parts."
Whenever you see "**all**" in a question, think **÷**.`,
 q: [['Which join removes the duplicate column?','Natural join.'],['Equijoin uses which operator?','= only.'],['Division answers which type of question?','"For all" questions.'],['Theta join = Cartesian product + …?','A comparison condition θ.']] },

'db-subq': { m: `## Uncorrelated vs correlated
| Point | Uncorrelated | Correlated |
| Inner query runs | once | once per outer row |
| Uses outer row values | no | yes |
| Speed | usually faster | usually slower |

## EXISTS vs IN
- **IN:** builds the full list, then checks.
- **EXISTS:** stops at the first match (a yes/no check), so it is often faster for big tables.`,
 q: [['Which subquery runs once?','Uncorrelated.'],['Which uses values from the outer row?','Correlated.'],['Why can EXISTS be faster?','It stops at the first match.'],['Example of a correlated question?','Employees earning above THEIR OWN department\'s average.']] },

'db-joins': { m: `## Picture the joins as two circles
- **INNER** = only the overlap.
- **LEFT** = all of the left circle.
- **RIGHT** = all of the right circle.
- **FULL** = both circles completely.

## Missing values become NULL
In outer joins, a row with no match gets **NULL** in the other table's columns.`,
 q: [['Which join drops unmatched rows?','INNER JOIN.'],['Which keeps all rows of both tables?','FULL OUTER JOIN.'],['What fills missing columns in outer joins?','NULL.'],['How to find departments with no students?','LEFT JOIN and check for NULL students.']] },

'db-group': { m: `## Order SQL runs the clauses (helps you remember)
1. **FROM** (which table)
2. **WHERE** (filter rows)
3. **GROUP BY** (make groups)
4. **HAVING** (filter groups)
5. **SELECT** (choose columns)
6. **ORDER BY** (sort)

That's why WHERE can't use COUNT: groups don't exist yet at step 2.

## Aggregate functions
COUNT (how many), SUM (total), AVG (average), MIN (smallest), MAX (largest).`,
 q: [['WHERE filters…?','Rows, before grouping.'],['HAVING filters…?','Groups, after grouping.'],['Can COUNT be used in WHERE?','No.'],['Name 5 aggregate functions.','COUNT, SUM, AVG, MIN, MAX.']] },

'db-trig': { m: `## ECA with a real example
- **E**vent: a new order is INSERTED.
- **C**ondition: is the stock less than 10?
- **A**ction: insert a "reorder" alert.

## BEFORE vs AFTER
| BEFORE | AFTER |
| runs before saving | runs after saving |
| checks/cleans input | audits/logs changes |
| e.g. change empty name to "Unknown" | e.g. write salary change to a log |

## ROW vs STATEMENT
- **FOR EACH ROW:** 100 rows updated → runs 100 times; can see OLD and NEW values.
- **FOR EACH STATEMENT:** runs once for the whole command.`,
 q: [['What does ECA stand for?','Event, Condition, Action.'],['Which trigger is used for audit trails?','AFTER trigger.'],['Which trigger can use OLD/NEW values?','FOR EACH ROW.'],['Name the trigger events.','INSERT, UPDATE, DELETE.']] },

'db-assert': { m: `## Compare
| Point | CHECK | ASSERTION | TRIGGER |
| Scope | one row of one table | many tables | any event |
| Support | everywhere | rarely (slow) | everywhere |
| Example | Salary > 0 | total salary ≤ budget | enforce the budget rule |

**Remember:** assertions are the theory; triggers are the practice.`,
 q: [['Which constraint works within one row?','CHECK.'],['Why do MySQL/Oracle avoid assertions?','Severe performance overhead.'],['What do companies use instead of assertions?','Triggers.'],['Give an assertion example.','A department\'s total salary cannot exceed its budget.']] },

'db-views': { m: `## View = a window
It shows data from real tables but **stores nothing** itself. If the table changes, the view shows the change automatically.

## 2 main reasons to use views
1. **Security:** hide columns (salary, CNIC) or rows (only CS students).
2. **Simplicity:** replace a long 5-table join with one simple name.

## Updatable view rules
- Built on **one** table.
- **No** aggregates (COUNT, SUM…) and no GROUP BY.
- **WITH CHECK OPTION** stops inserts that the view wouldn't show.`,
 q: [['Does a view store data?','No, it is a virtual table.'],['Two reasons to use a view?','Security and query simplification.'],['When is a view updatable?','Single table, no aggregation.'],['Purpose of WITH CHECK OPTION?','Block rows that would vanish from the view.']] },

'db-ddl': { m: `## Commands at a glance
| Command | Does |
| ALTER TABLE … ADD | add a column (give a DEFAULT) |
| ALTER TABLE … DROP COLUMN | remove a column |
| ALTER TABLE … MODIFY / ALTER COLUMN | change type or NULL rule |
| DROP TABLE … RESTRICT | delete table only if nothing points to it |
| DROP TABLE … CASCADE | delete table and the links to it |

## Production tip
Big tables (millions of rows) get **locked** during ALTER, so do it in a **maintenance window** (quiet time).`,
 q: [['Command to add a column?','ALTER TABLE … ADD COLUMN.'],['Difference between RESTRICT and CASCADE in DROP TABLE?','RESTRICT fails if FKs point to it; CASCADE removes those links too.'],['Why give a DEFAULT when adding a column?','So existing rows get a value instead of NULL.'],['Why use a maintenance window?','ALTER on big tables locks them.']] },

'db-review': { m: `## How to answer these in the exam
- **Write a definition first**, then a small example, then a one-line conclusion.
- For SQL questions always write a **short query**.
- For mapping questions draw a **tiny table** with PK/FK marked.

## Extra practice questions
1. Map an M:N relationship STUDENT–COURSE with attribute Grade.
2. Write SQL for "departments having more than 3 employees".
3. Explain disjoint vs overlapping with your own example.
4. Write the ECA parts of a trigger that logs deleted students.`,
 q: [['8A or 8C for overlapping roles?','Neither is best; 8D (flags) or 8A. 8C suits disjoint roles.'],['Where does Grade go when mapping STUDENT–COURSE (M:N)?','In the junction table ENROLLS(StudentID, CourseID, Grade).'],['SQL keyword to filter groups?','HAVING.'],['Trigger timing for an audit log?','AFTER.']] }
});
