/* Data Mining — from: datamiing-1 (CS 483 intro), datamining-lect, Linear Regression Lecture + GeeksforGeeks PDF, Lecture 6 (decision trees), ID3 PDF, NN slides, step-by-step backpropagation PDF */
window.LECTURES = (window.LECTURES || []).concat([
  { id:'dm-intro', s:'dm', n:'Lectures 1–2', t:'Introduction to Data Mining & Data', img:'hero-dm' },
  { id:'dm-lr', s:'dm', n:'Linear Regression', t:'Simple & Multiple Linear Regression', img:'tree' },
  { id:'dm-dt', s:'dm', n:'Lecture 6', t:'Learning, Decision Trees & ID3', img:'tree1' },
  { id:'dm-nn', s:'dm', n:'Neural Networks', t:'Artificial Neural Networks & Backpropagation', img:'brain1' }
]);
window.TOPICS = (window.TOPICS || []).concat([

/* ---------------- INTRO ---------------- */
{ id:'dm-what', s:'dm', lec:'dm-intro', t:'What Is Data Mining & Why We Need It', g:'WHY', img:'hero-dm',
  sum:'Definitions of data mining, why huge data needs it, and examples of big data sources.',
  key:['Efficient analysis of very large data to extract useful, possibly unexpected patterns','Finding hidden information; fitting data to a model','Huge, cheap-to-store data: transactions, documents, networks, genomes, climate, behaviour','"The data is the computer": large data can beat complex algorithms'],
  body:`## Definitions
- **Tentative definition:** the use of efficient techniques to analyze very large collections of data and extract **useful and possibly unexpected patterns**.
- Finding **hidden information** in a database; **fitting data to a model**. Similar terms: exploratory data analysis, data-driven discovery, deductive learning.
- "Analysis of (often large) observational data sets to find **unsuspected relationships** and summarize data in novel, understandable and useful ways" (Hand, Mannila, Smyth).
- "The discovery of **models** for data" (Rajaraman, Ullman). Models can explain the data, predict future instances, summarize the data, or extract its most prominent features.

## Why we need it
- **Huge raw data:** terabytes per second from mobiles, photos, web documents, Facebook updates, tweets, blogs, transactions, sensors, surveillance, queries, clicks.
- **Cheap storage** makes keeping it possible; we must analyze it to extract knowledge.
- **"The data is the computer":** large data can be more powerful than complex algorithms (Google solved NLP problems like misspellings and synonyms just by looking at data).
- **Data is power:** query logs (Google), friendships (Facebook), tweets (Twitter), transactions (Amazon) are a company's biggest assets.
- Data is also **complex**: tables, time series, images, graphs, all interconnected (location, friends, check-ins, opinions, photos, queries from one phone).

## Examples of big data
| Kind | Example |
| Transaction data | Walmart 20M transactions/day; AT&T 300M calls/day; card companies billions/day; point cards track users |
| Document data | ~50 billion web pages; Wikipedia 4M articles; news portals; ~300M tweets/day |
| Network data | Web 50B linked pages; Facebook 500M users; Twitter 300M; IM ~1B users; 250M blogs |
| Genomic sequences | 1000 Genomes: 3×10⁹ nucleotides per person → 3×10¹² total, plus medical history and gene expression |
| Environmental data | Climate database: 6000 temperature, 7500 precipitation, 2000 pressure stations (spatiotemporal) |
| Behavioral data | Phones record GPS, images, calls/SMS, posts, check-ins; Amazon logs browsing and purchases; Google/Bing log queries and clicks |`},

{ id:'dm-data', s:'dm', lec:'dm-intro', t:'What Is Data? Objects, Attributes & Types', g:'n×d', img:'pre',
  figs:[{src:'dml_12',cap:'Objects and attributes'}],
  sum:'Data objects and attributes, attribute types, and dataset size, dimensionality and sparsity.',
  key:['Data = collection of objects and their attributes','Attribute = variable/field/feature; object = record/point/instance','Categorical: nominal (no order) vs ordinal (order); Numeric: discrete vs continuous; binary','Size = #objects; dimensionality = #attributes; sparsity = populated pairs'],
  body:`**Data** is a collection of data **objects** and their **attributes**.
- **Attribute:** a property or characteristic of an object (eye colour, temperature). Also called variable, field, characteristic or **feature**.
- **Object:** described by a collection of attributes. Also called record, point, case, sample, entity or **instance**.

## Dataset properties
- **Size:** number of objects.
- **Dimensionality:** number of attributes.
- **Sparsity:** number of populated object-attribute pairs.

## Types of attributes
| Type | Sub-type | Examples |
| Categorical | **Nominal**: no order or comparison | Eye colour, zip codes, words |
| Categorical | **Ordinal**: order but not comparable amounts | Rankings (good, fair, bad), height {tall, medium, short} |
| Numeric | **Discrete**: counts | Count |
| Numeric | **Continuous** | Temperature, length, time |
| Special case | **Binary** | Yes/no, exists/not exists |`},

{ id:'dm-types', s:'dm', lec:'dm-intro', t:'Types of Data: Record, Document, Ordered, Graph', g:'{ }', img:'dna1',
  figs:[{src:'dml_16',cap:'Document data as term vectors'},{src:'dml_17',cap:'Genomic sequence data'},{src:'dml_18',cap:'Time-series data'},{src:'dml_19',cap:'Graph data'}],
  sum:'Numeric record data, categorical data, document (bag-of-words), ordered sequences and graphs.',
  key:['Numeric: points in d-dimensional space, n-by-d matrix','Categorical: vector of categorical values','Document: term vector, bag-of-words (no order)','Set data: binary or count vectors','Ordered: genomic strings, time series','Graph: web pages and links'],
  body:`| Type | Representation |
| Numeric record data | Objects with the same fixed numeric attributes are **points in multi-dimensional space**; stored as an **n-by-d data matrix** (n rows = objects, d columns = attributes) |
| Categorical data | Records with a fixed set of categorical attributes; each object is a vector of categorical values |
| Document data | Each document is a **term vector**; each term is an attribute whose value is how often it occurs. **Bag-of-words**: no ordering |
| Set data | Each object is a set of values (with or without counts); can be a binary vector or count vector |
| Ordered data: genomic | A long **ordered string** (GGTTCCGCC…) |
| Ordered data: time series | A sequence of numeric values ordered over time (e.g. stock prices) |
| Graph data | Nodes and edges, e.g. the web graph and HTML links |`},

{ id:'dm-vsdb', s:'dm', lec:'dm-intro', t:'Data Mining vs Database Processing', g:'DB/DM', img:'kmeans',
  sum:'How data-mining queries differ from database queries, with examples.',
  key:['DB query: well defined, SQL, operational data, precise output, subset of DB','DM query: poorly defined, no precise language, not operational data, fuzzy output, not a subset','Not DM: looking up a phone number, searching "Amazon"','DM: items bought with milk (association), poor credit risks (classification), similar buyers (clustering)'],
  body:`| Aspect | Database processing | Data mining processing |
| Query | Well defined; SQL | Poorly defined; no precise query language |
| Data | Operational data | Not operational data |
| Output | Precise; a subset of the database | Fuzzy; not a subset of the database |

## What is NOT data mining
- Looking up a phone number in a phone directory.
- Querying a web search engine for information about "Amazon".

## Query examples
| Database query | Data mining query |
| Find all customers who purchased milk | Find all items frequently purchased **with** milk (**association rules**) |
| Find all credit applicants with last name Smith | Find all credit applicants who are **poor credit risks** (**classification**) |
| Identify customers who bought more than $10,000 last month | Identify customers with **similar buying habits** (**clustering**) |

## Data mining algorithm
Objective: **fit data to a model** (descriptive or predictive). **Preference:** technique to choose the best model. **Search:** technique to search the data ("query").`},

{ id:'dm-tasks', s:'dm', lec:'dm-intro', t:'Data Mining Models and Tasks', g:'P/D', img:'apriori',
  figs:[{src:'dm1_10',cap:'Data mining models and tasks'}],
  sum:'Predictive vs descriptive methods and the basic tasks.',
  key:['Predictive: classification, regression, time-series analysis, prediction, deviation detection','Descriptive: clustering, summarization, association rules, sequence discovery','Classification = supervised; clustering = unsupervised','Summarization = characterization/generalization; link analysis = association rules'],
  body:`- **Prediction methods:** use some variables to predict unknown or future values of other variables.
- **Description methods:** find human-interpretable patterns that describe the data. (Fayyad et al., 1996)

## Task list
| Task | Kind |
| Classification | Predictive |
| Regression | Predictive |
| Time-series analysis | Predictive |
| Prediction | Predictive |
| Deviation detection | Predictive |
| Clustering | Descriptive |
| Summarization | Descriptive |
| Association rule discovery | Descriptive |
| Sequential pattern / sequence discovery | Descriptive |

## Basic tasks explained
- **Classification:** maps data into predefined groups or classes. Supervised learning, pattern recognition, prediction.
- **Regression:** maps a data item to a real-valued prediction variable.
- **Clustering:** groups similar data together. Unsupervised learning, segmentation, partitioning.
- **Summarization:** maps data into subsets with simple descriptions (characterization, generalization).
- **Link analysis:** uncovers relationships among data (association rules).
- **Sequential analysis:** determines sequential patterns.

> **Time-series example (stock market):** predict future values, find similar patterns over time, classify behaviour.`},

{ id:'dm-classif', s:'dm', lec:'dm-intro', t:'Classification: Definition & Applications', g:'CLS', img:'tree',
  figs:[{src:'dm1_14',cap:'Classification: training set → learn classifier → model → test set'}],
  sum:'Learning a model for a class attribute, with direct marketing, fraud and churn examples.',
  key:['Training set: records with attributes, one is the class','Find a model for the class as a function of other attributes','Test set measures accuracy','Apps: direct marketing, fraud detection, customer churn'],
  body:`## Definition
Given a collection of records (**training set**), each with attributes, one of which is the **class**: find a **model** for the class attribute as a function of the other attributes. **Goal:** previously unseen records are assigned a class as accurately as possible. A **test set** measures accuracy; the data is usually split into training (build) and test (validate) sets.

> In the slide example, Refund and Marital Status are categorical, Taxable Income is continuous, and Cheat is the class.

## Applications
| Application | Goal | Approach |
| Direct marketing | Cut mailing cost by targeting consumers likely to buy a new cell phone | Use data from a similar earlier product; {buy, don't buy} is the class; collect demographic, lifestyle and company-interaction data; learn a classifier |
| Fraud detection | Predict fraudulent credit-card transactions | Use transactions and account-holder info (when, what, how often pays on time); label past transactions fraud/fair; learn a model; watch new transactions |
| Customer attrition / churn | Predict whether a customer will be lost to a competitor | Use call records (how often, where, time of day), financial and marital status; label loyal/disloyal; find a model for loyalty |`},

{ id:'dm-cluster', s:'dm', lec:'dm-intro', t:'Clustering: Definition & Applications', g:'○○', img:'kmeans',
  figs:[{src:'dm1_22',cap:'Intracluster distances minimized, intercluster maximized'}],
  sum:'Grouping similar points, similarity measures, and market segmentation / document clustering examples.',
  key:['Points in a cluster more similar to each other; less similar across clusters','Euclidean distance for continuous attributes','Intracluster distance minimized; intercluster maximized','Apps: market segmentation, document clustering (3204 LA Times articles), S&P 500 stocks'],
  body:`## Definition
Given data points with attributes and a **similarity measure**, find clusters so that:
- points in **one cluster are more similar** to one another;
- points in **separate clusters are less similar**.

**Similarity measures:** Euclidean distance for continuous attributes; other problem-specific measures. **Intracluster distances are minimized; intercluster distances are maximized.**

## Applications
| Application | Goal / approach |
| Market segmentation | Divide a market into distinct customer subsets, each a possible target for its own marketing mix. Collect geographic and lifestyle attributes; find clusters; check quality by comparing buying patterns within vs across clusters |
| Document clustering | Find groups of similar documents from important terms. Identify frequent terms; build a similarity measure from term frequencies; cluster. **Gain:** information retrieval can relate new documents or search terms to clusters. Example: 3204 Los Angeles Times articles, similarity = common words |
| S&P 500 stock data | Points are Stock-{UP/DOWN} events; two are similar if they often happen on the same day; association rules quantify the similarity |`},

{ id:'dm-assoc', s:'dm', lec:'dm-intro', t:'Association Rule Discovery', g:'X⇒Y', img:'shop1',
  sum:'Finding "if X then Y" rules and their applications.',
  key:['Rules of the form "If X, then Y"','{Milk, Eggs} ⇒ {Cheese}: antecedent ⇒ consequent','Apps: marketing & promotion ({Bagels} ⇒ {Potato chips}), shelf management, inventory management'],
  body:`## Definition
A technique to find associations, relationships and patterns between items, expressed as **"If X, then Y"**. Used from marketing to medical diagnosis. A supermarket can improve placement and promotion by analyzing which products are bought together.

> **Antecedent:** milk and eggs are purchased. **Consequent:** cheese is purchased. Customers who buy milk and eggs are more likely to buy cheese.

## Applications
1. **Marketing and sales promotion:** rule {Bagels, …} ⇒ {Potato Chips}.
   - Potato chips as **consequent** → what to do to boost their sales.
   - Bagels in the **antecedent** → which products are affected if bagels are discontinued.
   - Bagels in antecedent and chips in consequent → what to sell with bagels to promote chips.
2. **Supermarket shelf management:** find items bought together by enough customers by processing point-of-sale barcode data.
3. **Inventory management:** an appliance-repair company predicts the parts needed so service vehicles carry them, reducing visits; mine co-occurrence of parts in previous repairs.`},

{ id:'dm-regtask', s:'dm', lec:'dm-intro', t:'Regression, Deviation Detection & Sequential Patterns', g:'ŷ', img:'tree',
  sum:'Predicting continuous values, and the remaining tasks.',
  key:['Regression: predict a continuous variable with a linear or nonlinear model','Examples: sales from advertising, wind speed from temperature/humidity/pressure, stock index time series','Studied in statistics and neural networks'],
  body:`## Regression
Predict the value of a **continuous** variable from other variables, assuming a linear or nonlinear model of dependency. Studied greatly in statistics and neural networks.
- Predicting sales of a new product from advertising expenditure.
- Predicting wind velocity from temperature, humidity, air pressure.
- Time-series prediction of stock-market indices.

## Other tasks
- **Deviation detection (predictive):** detect significant deviations from normal behaviour.
- **Sequential pattern discovery (descriptive):** find patterns that occur in order over time.
- **Time-series analysis:** predict future values, find similar patterns over time, classify behaviour.`},

{ id:'dm-kdd', s:'dm', lec:'dm-intro', t:'KDD Process & the Data Analysis Pipeline', g:'KDD', img:'pre',
  figs:[{src:'dm1_33',cap:'The KDD process'},{src:'dml_22',cap:'The data analysis pipeline'}],
  sum:'Knowledge Discovery in Databases: selection, preprocessing, transformation, mining, interpretation; plus the web-log example.',
  key:['KDD = whole process of finding useful information; DM = the algorithm step','Selection → Preprocessing → Transformation → Data Mining → Interpretation/Evaluation','Preprocessing: noisy, incomplete, inconsistent data; sampling, dimensionality reduction, feature selection','Post-processing: statistical importance, visualization'],
  body:`- **KDD (Knowledge Discovery in Databases):** the process of finding useful information and patterns in data.
- **Data mining:** the use of algorithms to extract the information and patterns in the KDD process.

## KDD steps
1. **Selection:** obtain data from various sources.
2. **Preprocessing:** cleanse the data.
3. **Transformation:** convert to a common format; transform to a new format.
4. **Data mining:** obtain the desired results.
5. **Interpretation / evaluation:** present results to the user in a meaningful way.

> **Web log example:** Selection: choose log data (dates, locations). Preprocessing: remove identifying URLs and error logs. Transformation: sessionize (sort and group). Data mining: identify and count patterns; build a data structure. Interpretation: identify and display frequently accessed sequences. Uses: cache prediction, personalization.

## The data analysis pipeline
**Data preprocessing → Data mining → Result post-processing.** Mining is not the only step.
- **Preprocessing:** real data is noisy, incomplete and inconsistent; **data cleaning** is needed. Techniques: sampling, dimensionality reduction, feature selection. Dirty work, but often the most important step.
- **Post-processing:** make results actionable: statistical analysis of importance, visualization.
- Pre- and post-processing are often data-mining tasks themselves.`},

{ id:'dm-dev', s:'dm', lec:'dm-intro', t:'Data Mining Development & KDD Issues', g:'⚑', img:'dna2',
  figs:[{src:'dm1_35',cap:'Fields that feed data mining'}],
  sum:'The fields data mining grew from, and the issues KDD faces.',
  key:['Roots: databases, statistics, IR, machine learning, algorithms','Issues: overfitting, interpretation, visualization, large datasets, high dimensionality','Also: multimedia, missing, irrelevant, noisy, changing data; application'],
  body:`## Data mining development
| Field | Contributions |
| Databases | Relational data model, SQL, association rule algorithms, data warehousing, scalability techniques |
| Information retrieval | Similarity measures, hierarchical clustering, IR systems, imprecise queries, textual data, web search engines |
| Statistics | Bayes theorem, regression analysis, EM algorithm, k-means clustering, time-series analysis |
| Machine learning | Neural networks, decision tree algorithms |
| Algorithms | Algorithm design techniques, algorithm analysis, data structures |

## KDD issues
- Overfitting
- Interpretation
- Visualization
- Large datasets
- High dimensionality
- Multimedia data
- Missing data
- Irrelevant data
- Noisy data
- Changing data
- Application`},

/* ---------------- LINEAR REGRESSION ---------------- */
{ id:'dm-slr', s:'dm', lec:'dm-lr', t:'Simple Linear Regression & Worked Example', g:'y=mx+c', img:'tree',
  sum:'The regression line, slope and intercept, least squares, and the study-hours example.',
  key:['Models dependent y from independent x with a best-fit straight line','y = b0 + b1·x (or y = mx + c); b1 slope, b0 intercept','OLS minimizes the sum of squared errors (residuals)','Example: (2,50),(4,70),(6,90) → y = 30 + 10x; 5 h → 80; for 90 → 6 h','m > 0 positive relation, m < 0 negative'],
  body:`## What it is
A statistical method that models the relationship between a **dependent variable** (what we predict, e.g. test score) and an **independent variable** (what we know, e.g. hours studied). It finds the **best-fit straight line**, the "line of best fit", which minimizes overall prediction error.

## Equation
**y = b0 + b1·x** (same as **y = mx + c**)
- y: predicted output; x: input feature.
- **b1 (m): slope**, how much y changes for a one-unit change in x.
- **b0 (c): intercept**, the value of y when x = 0.

## How the line is found
Plot the points, then choose the line closest to them using **Ordinary Least Squares (OLS)**, which minimizes the sum of squared errors. The gap between actual and predicted value is the **error term (residual)**.

## Worked example
| Study hours (x) | Test score (y) |
| 2 | 50 |
| 4 | 70 |
| 6 | 90 |

1. **Slope:** m = Δy / Δx = 20 / 2 = **10** (each extra hour adds 10 points).
2. **Intercept:** using (2, 50): 50 = 10(2) + c → c = **30**.
3. **Equation:** **y = 30 + 10x**.
4. **Predict:** 3 h → 60; 5 h → 30 + 50 = **80**.
5. **Reverse:** score ≥ 90 → 90 = 10x + 30 → x = **6 hours**.

## Interpretation
m > 0: positive relationship; m < 0: negative relationship. Linear regression assumes the trend is a straight line.

## Why it matters
Simple and interpretable; the foundation of advanced ML; answers "how much" and "in what direction".`},

{ id:'dm-lrlife', s:'dm', lec:'dm-lr', t:'Linear Regression in Real Life', g:'5 ex', img:'apriori',
  sum:'Five real-life uses of linear regression from your GeeksforGeeks reading.',
  key:['Social media engagement (time, hashtags, content type)','House prices ($100/sq ft → 1500 sq ft ≈ $150,000)','Exam scores from study time','Sales forecasting (December +10%)','Sports (100 extra shots → +2% accuracy)'],
  body:`| Example | How regression helps |
| Social media post popularity | Engagement depends on topic, posting time, content type, hashtags and length. Regression quantifies e.g. how much evening posting adds, how hashtag count affects likes, and whether content type matters more than time |
| House prices | Price depends on size, location, rooms, age. If an area averages **$100 per sq ft**, a 1,500 sq ft house ≈ **$150,000**. Buyers budget; sellers price competitively |
| Exam scores from study time | More study hours → higher scores; regression predicts your score and shows how effective each extra hour is |
| Sales forecasting | A toy store sees sales rise every December; if December is **10% higher** than November, it can plan inventory and marketing |
| Sports performance | If every **100 extra practice shots** raises shooting % by **2%**, then 500 extra shots ≈ **+10%** |

Other uses from the lecture: blood pressure vs medicine dosage; crop yield from fertilizer and water; business revenue from advertising.`},

{ id:'dm-mlr', s:'dm', lec:'dm-lr', t:'Multiple Linear Regression: Model, Matrix Form & Cost', g:'Xb', img:'pre',
  sum:'Predicting with several inputs, interpreting coefficients, matrix form, MSE, normal equation and gradient descent.',
  key:['y = b0 + b1x1 + b2x2 + … + bnxn','Each coefficient: change in y per unit of that x, others constant (ceteris paribus)','Matrix form y = Xb (column of 1s for intercept)','Cost J(b) = (1/m) Σ (yi − ŷi)² (MSE)','Normal equation b = (XᵀX)⁻¹Xᵀy (exact, slow for big data); gradient descent bj := bj − α ∂J/∂bj'],
  body:`## Why multiple variables
Real outcomes depend on many factors: house price on size, rooms, location; student performance on study hours, attendance, prior GPA; salary on experience, education, skills.

## Definition
A **supervised learning** algorithm that models one dependent variable y from **multiple independent variables** x1 … xn by fitting a linear equation.

## Model
**y = b0 + b1x1 + b2x2 + … + bnxn**
- b0: intercept (bias); b1…bn: regression coefficients (weights).
- Each coefficient = how much y changes when that variable rises by one unit, **keeping others constant** ("**ceteris paribus**").

> **Salary = 20,000 + 5,000(Experience) + 3,000(Education).** Each extra year adds 5,000 (education fixed); each education level adds 3,000 (experience fixed).

> **House price:** Price = b0 + b1(Size) + b2(Bedrooms) + b3(Age), with data (1000 sq ft, 2 bed, 10 yrs, 50 lacs), (1500, 3, 5, 70), (2000, 4, 2, 90).

## Matrix form
**y = Xb**, where X is the feature matrix (first column all 1s for the intercept), b the coefficient vector, y the output vector.

## Cost function (Mean Squared Error)
**J(b) = (1/m) Σ (yi − ŷi)²**. Goal: minimize it.

## Estimating coefficients
| Method | Formula | Notes |
| Normal equation (closed form) | b = (XᵀX)⁻¹ Xᵀy | Exact; computationally expensive for large data |
| Gradient descent (iterative) | bj := bj − α · ∂J/∂bj | Efficient for large data; widely used in ML |`},

{ id:'dm-mlrassume', s:'dm', lec:'dm-lr', t:'Regression Assumptions, Multicollinearity, Pros & Cons', g:'≈', img:'kmeans',
  sum:'The five assumptions, multicollinearity, applications, advantages and limitations.',
  key:['Linearity, independence, homoscedasticity, no multicollinearity, normality of errors','Multicollinearity → unstable coefficients; fix by removing a variable or Ridge/Lasso','Pros: simple, interpretable, fast','Cons: no non-linear patterns, sensitive to outliers, assumptions must hold'],
  body:`## Assumptions
1. **Linearity:** the relationship is linear.
2. **Independence:** observations are independent.
3. **Homoscedasticity:** constant variance of errors.
4. **No multicollinearity:** independent variables are not highly correlated.
5. **Normality of errors:** residuals are normally distributed.

Violating them hurts accuracy and interpretation.

## Multicollinearity
When independent variables are highly correlated, coefficients become **unstable** and **hard to interpret**. Example: house size and number of rooms. **Solutions:** remove one variable, or use **Ridge or Lasso** regression.

## Applications
House prices, medical risk analysis, sales and revenue forecasting, student performance, economic and financial modelling.

| Advantages | Limitations |
| Simple and interpretable | Cannot model non-linear patterns |
| Fast to train | Sensitive to outliers |
| Works well for linear relationships | Assumptions must be satisfied |

Foundation for Ridge, Lasso and Elastic Net.`},

{ id:'dm-mlrex', s:'dm', lec:'dm-lr', t:'Solved Example: Multiple Regression by Normal Equation', g:'(XᵀX)⁻¹', img:'tree',
  sum:'Salary from experience and certifications, solved step by step (with corrected arithmetic).',
  key:['XᵀX = [[4,10,7],[10,30,21],[7,21,15]], det = 6','Xᵀy = [230, 640, 450]','b = (25, 8.33, 6.67) → y = 25 + 8.33x1 + 6.67x2','Predict x1 = 5, x2 = 2 → y ≈ 80'],
  body:`> **Correction note:** the solved example in your PDF has small arithmetic slips (it uses 20 instead of 21 in XᵀX and gives Xᵀy as 230, 700, 480). The steps below are recomputed. The final prediction is still **≈ 80**.

## Problem
Predict salary y from experience x1 and certifications x2.
| Employee | Experience x1 | Certifications x2 | Salary y |
| 1 | 1 | 1 | 40 |
| 2 | 2 | 1 | 50 |
| 3 | 3 | 2 | 60 |
| 4 | 4 | 3 | 80 |

## Step 1 – Model
y = b0 + b1x1 + b2x2

## Step 2 – Feature matrix X (column of 1s) and output y
~~~
X = | 1 1 1 |      y = | 40 |
    | 1 2 1 |          | 50 |
    | 1 3 2 |          | 60 |
    | 1 4 3 |          | 80 |
~~~
## Step 3 – Normal equation: b = (XᵀX)⁻¹ Xᵀy

## Step 4 – XᵀX
~~~
XᵀX = |  4  10   7 |
      | 10  30  21 |
      |  7  21  15 |
~~~
(Σx1 = 10, Σx2 = 7, Σx1² = 30, Σx1x2 = 1+2+6+12 = 21, Σx2² = 15)

## Step 5 – Determinant and inverse
~~~
|XᵀX| = 4(30·15 − 21·21) − 10(10·15 − 21·7) + 7(10·21 − 30·7)
      = 4(9) − 10(3) + 7(0) = 6

(XᵀX)⁻¹ = 1/6 · |  9   −3    0 |
                | −3   11  −14 |
                |  0  −14   20 |
~~~
## Step 6 – Xᵀy
~~~
Xᵀy = | 40+50+60+80        |   | 230 |
      | 40+100+180+320     | = | 640 |
      | 40+50+120+240      |   | 450 |
~~~
## Step 7 – Coefficients
~~~
b0 = (9·230 − 3·640 + 0·450)/6    = 150/6 = 25
b1 = (−3·230 + 11·640 − 14·450)/6 =  50/6 ≈ 8.33
b2 = (0·230 − 14·640 + 20·450)/6  =  40/6 ≈ 6.67
~~~
## Step 8 – Equation
**y = 25 + 8.33x1 + 6.67x2**

## Step 9 – Interpretation
- Intercept 25: base salary with zero experience and certifications.
- Each extra year of experience adds ≈ 8.33 units (certifications fixed).
- Each extra certification adds ≈ 6.67 units (experience fixed).

## Step 10 – Prediction (experience 5, certifications 2)
y = 25 + 8.33(5) + 6.67(2) = 25 + 41.67 + 13.33 = **80**`},

/* ---------------- LECTURE 6: LEARNING & DECISION TREES ---------------- */
{ id:'dm-learn', s:'dm', lec:'dm-dt', t:'Learning, Inductive Learning & Classification', g:'f(x)', img:'brain2',
  figs:[{src:'l6_08',cap:'Tiger example: positive and negative examples'}],
  sum:'Why systems learn, inductive learning from examples, classification as a function, and learning as search.',
  key:['Learning lets a system adapt and improve with experience','Learning from examples (inductive) vs by being told','Goal: a rule that works on new cases','Classification: f(feature1, feature2, …) → Category','Learning as search: simplest rule that fits the data'],
  body:`## Why learning
A fundamental part of human intelligence. A system that learns can adapt to change and develop more sophisticated rules with experience; it may also be easier to program (start simple, let it improve).

## Types of learning
- **Learning from examples (inductive learning):** show 10 pictures of different tigers.
- **Learning by being told:** "A tiger has a long tail, stripes, short ears…"
AI focuses on **inductive learning**.

## Inductive learning
Find a rule or function that lets you draw useful conclusions, e.g. student performance from entry qualifications, classifying images from features, noun vs verb in a sentence. Give the system cases where the result is known; the rule should work for **new cases**.

## Classification
Many learning problems are classification problems: given input features (size of teeth, stripiness), decide which class (tiger vs rabbit). Examples: character recognition, disease diagnosis, student performance prediction.

Formally: **f(feature1, feature2, …) → Category**. E.g. teeth = big, covering = stripy → tiger. We start from cases where the right class is known.

## Learning as search
Search through all possible rules and find the one that best (and most simply) accounts for the example data, e.g. the simplest conjunction of features (stripy AND longTail → tiger) that predicts tigers in the data.`},

{ id:'dm-dtree', s:'dm', lec:'dm-dt', t:'Decision Trees: Algorithm, Types & Terminology', g:'⊢', img:'tree1',
  figs:[{src:'l6_10',cap:'Decision tree for PlayTennis'},{src:'l6_17',cap:'Decision tree terminology'}],
  sum:'How decision trees classify, categorical vs continuous trees, and all the node terms.',
  key:['Two steps: learning step (build model) and prediction step','Supervised; works for classification and regression','Start at root, compare attribute, follow branch, reach leaf','Root, splitting, decision node, leaf/terminal, pruning, branch/sub-tree, parent/child'],
  body:`## Introduction
Classification is a two-step process: a **learning step** (build the model from training data) and a **prediction step** (use it on new data). The decision tree is one of the easiest and most popular classifiers to understand.

## Algorithm
- Belongs to **supervised learning**; can solve **both regression and classification**.
- Goal: a model that predicts the class or value of the target by learning simple **decision rules** from training data.
- To classify a record: start at the **root**, compare the root attribute with the record's value, follow the matching **branch** to the next node, repeat until a **leaf**.
- Each node tests an attribute; each edge is a possible answer; the process is **recursive** for each sub-tree. The leaf gives the classification.

> **PlayTennis tree:** Outlook at the root. Sunny → Humidity (High → No, Normal → Yes). Overcast → Yes. Rain → Wind (Strong → No, Weak → Yes).

## Types
- **Categorical variable decision tree:** categorical target variable.
- **Continuous variable decision tree:** continuous target variable.

## Terminology
1. **Root node:** the entire population/sample, divided into homogeneous sets.
2. **Splitting:** dividing a node into two or more sub-nodes.
3. **Decision node:** a sub-node that splits further.
4. **Leaf / terminal node:** a node that does not split.
5. **Pruning:** removing sub-nodes of a decision node (the opposite of splitting).
6. **Branch / sub-tree:** a subsection of the whole tree.
7. **Parent and child node:** a node divided into sub-nodes is the parent; the sub-nodes are its children.`},

{ id:'dm-chaid', s:'dm', lec:'dm-dt', t:'Chi-Square (CHAID) Splitting', g:'χ²', img:'tree3',
  figs:[{src:'l6_21',cap:'Chi-square formula'}],
  sum:'Chi-squared Automatic Interaction Detector and its formula.',
  key:['CHAID = Chi-squared Automatic Interaction Detector, one of the oldest methods','Measures significance between sub-nodes and parent','Categorical target (Success/Failure); 2+ splits','χ² = Σ (O − E)² / E; higher χ² = more significant split'],
  body:`- **CHAID** stands for **Chi-squared Automatic Interaction Detector**, one of the oldest tree classification methods.
- It finds the **statistical significance** of differences between sub-nodes and the parent node.
- Measured by the sum of squares of standardized differences between **observed and expected** frequencies of the target.
- Works with a **categorical** target ("Success" or "Failure"); can perform **two or more splits**.
- **Higher chi-square = higher significance** of the difference between sub-node and parent.

## Formula
**χ² = Σ (O − E)² / E**
- χ²: chi-square obtained
- Σ: the sum of
- O: observed score
- E: expected score`},

{ id:'dm-id3', s:'dm', lec:'dm-dt', t:'ID3 Algorithm: Entropy & Information Gain', g:'H(S)', img:'tree2',
  figs:[{src:'l6_24',cap:'Entropy formula'}],
  sum:'Iterative Dichotomiser 3, entropy, information gain, and the algorithm steps.',
  key:['ID3 = Iterative Dichotomiser 3; greedy; pick max Information Gain / min Entropy','H(S) = −Σ p(c) log₂ p(c); H = 0 means pure','IG(A,S) = H(S) − Σ p(t) H(t)','Steps: entropy of S → for each attribute entropy & gain → pick max gain → split → recurse on unused attributes'],
  body:`## What is ID3?
**ID3 (Iterative Dichotomiser 3)** is a classification algorithm that builds a decision tree with a **greedy approach**, choosing at each step the attribute with **maximum Information Gain (IG)** or **minimum Entropy (H)**.

A decision tree: **node = feature (attribute)**, **branch = decision (rule)**, **leaf = outcome** (categorical or continuous).

## Entropy
A measure of the **uncertainty** in dataset S:

**H(S) = − Σ p(c) · log₂ p(c)**, over classes c in C
- S: current dataset (changes every iteration)
- C: set of classes, e.g. {yes, no}
- p(c): proportion of elements of class c in S

**Entropy = 0** means a pure class (all the same category).

## Information gain
How much uncertainty in S is reduced by splitting on attribute A:

**IG(A, S) = H(S) − Σ p(t) · H(t)**, over subsets t in T
- T: subsets created by splitting S on A (S = union of t)
- p(t): proportion of elements in t
- H(t): entropy of subset t

The attribute with the **largest information gain** is used to split.

## Steps
1. Begin with the original set S as the root.
2. Each iteration, go through every **unused** attribute and compute its entropy H and information gain IG.
3. Select the attribute with the **smallest entropy / largest information gain**.
4. Split S by that attribute into subsets.
5. Recurse on each subset, considering only attributes **never selected before**; repeat until the tree is complete.`},

{ id:'dm-id3ex', s:'dm', lec:'dm-dt', t:'ID3 Worked Example: PlayTennis Weather Data', g:'0.246', img:'tree1',
  figs:[{src:'l6_09',cap:'PlayTennis training data (14 days)'},{src:'l6_10',cap:'Final decision tree'}],
  sum:'Full ID3 calculation on the 14-day weather dataset.',
  key:['H(S) = 0.940 (9 yes, 5 no)','Gains: Outlook 0.246 (root), Humidity 0.151, Wind 0.048, Temperature 0.029','Overcast → always Yes','Sunny branch: Humidity (gain 0.971); Rain branch: Wind (gain 0.971)'],
  body:`## Dataset (14 days)
| Day | Outlook | Temperature | Humidity | Wind | Play |
| 1 | Sunny | Hot | High | Weak | No |
| 2 | Sunny | Hot | High | Strong | No |
| 3 | Overcast | Hot | High | Weak | Yes |
| 4 | Rain | Mild | High | Weak | Yes |
| 5 | Rain | Cool | Normal | Weak | Yes |
| 6 | Rain | Cool | Normal | Strong | No |
| 7 | Overcast | Cool | Normal | Strong | Yes |
| 8 | Sunny | Mild | High | Weak | No |
| 9 | Sunny | Cool | Normal | Weak | Yes |
| 10 | Rain | Mild | Normal | Weak | Yes |
| 11 | Sunny | Mild | Normal | Strong | Yes |
| 12 | Overcast | Mild | High | Strong | Yes |
| 13 | Overcast | Hot | Normal | Weak | Yes |
| 14 | Rain | Mild | High | Strong | No |

## Step 1 – Entropy of the whole set
9 Yes, 5 No:
~~~
H(S) = −(9/14)log₂(9/14) − (5/14)log₂(5/14) = 0.940
~~~
## Step 2 – Gain for each attribute
Example, **Wind**: Weak = 8 (6 Yes, 2 No) → H = 0.811; Strong = 6 (3 Yes, 3 No) → H = 1.000
~~~
IG(S, Wind) = 0.940 − (8/14)(0.811) − (6/14)(1.000) = 0.048
~~~
| Attribute | Information gain |
| **Outlook** | **0.246** |
| Humidity | 0.151 |
| Wind | 0.048 |
| Temperature | 0.029 |

**Outlook** has the highest gain, so it is the **root**.

## Step 3 – Branches
- **Overcast** (4 days, all Yes) → pure → leaf **Yes**.
- **Sunny** (5 days: 2 Yes, 3 No, H = 0.971): Gain(Humidity) = 0.971, Gain(Temperature) = 0.571, Gain(Wind) = 0.020 → split on **Humidity**: High → **No**, Normal → **Yes** (both pure).
- **Rain** (5 days: 3 Yes, 2 No, H = 0.971): Gain(Wind) = 0.971 (Humidity and Temperature ≈ 0.020) → split on **Wind**: Weak → **Yes**, Strong → **No**.

## Final tree
~~~
Outlook
├─ Sunny    → Humidity: High → No | Normal → Yes
├─ Overcast → Yes
└─ Rain     → Wind: Weak → Yes | Strong → No
~~~`},

{ id:'dm-id3char', s:'dm', lec:'dm-dt', t:'Characteristics of ID3', g:'±', img:'tree3',
  sum:'Strengths and weaknesses of the ID3 algorithm.',
  key:['Greedy → not guaranteed optimal; local optimum','Can overfit → prefer smaller trees','Usually small trees, not always the smallest','Harder on continuous data (many split points)'],
  body:`1. ID3 uses a **greedy approach**, so it does **not guarantee an optimal solution**; it can get stuck in **local optima**.
2. ID3 can **overfit** the training data; to avoid overfitting, **smaller decision trees** should be preferred.
3. It usually produces small trees, but **not always the smallest possible** tree.
4. ID3 is harder to use on **continuous data**: there are many more places to split a continuous attribute, and searching for the best split value is time-consuming.`},

/* ---------------- NEURAL NETWORKS ---------------- */
{ id:'dm-nnintro', s:'dm', lec:'dm-nn', t:'Why Neural Networks? Brain vs Computer', g:'ANN', img:'brain1',
  figs:[{src:'nn_15',cap:'Information processing in a neural network'}],
  sum:'Divide and conquer with networks, brain vs computer, why ANNs are worth studying and their two goals.',
  key:['Network = nodes (computational units) + connections (uni- or bidirectional)','Brain: 10¹⁴ synapses, 100 Hz, parallel, fault tolerant, adaptive','Computer: 10⁸ transistors, 10⁹ Hz, serial, not fault tolerant','ANNs: powerful, parallel, learn & generalize, fault tolerant','Goals: brain modelling and artificial system construction'],
  body:`## Course objectives
Introduce neural networks for classification and regression; give design methodologies; design single- and multi-layer feed-forward networks; implement in MATLAB; apply to real-world tasks; analyse performance.

## Divide and conquer
A complex system can be decomposed into simpler elements to understand it, and simple elements combined into a complex system (Bar Yam, 1997). **Networks** are one way:
- A set of **nodes** (computational units that receive inputs, process them and produce an output) and **connections** between nodes.
- Connections determine information flow: **unidirectional** (one way) or **bidirectional** (either way).

## Brains vs computers
| Aspect | Brain | Computer |
| Processing elements | 10¹⁴ synapses | 10⁸ transistors |
| Speed | 100 Hz | 10⁹ Hz |
| Style | Parallel, distributed | Mostly serial, centralized |
| Fault tolerant | Yes | No |
| Adaptive | Learns fast | Not even close to an infant |
| Intelligence | Intelligent and conscious | Lacks intelligence |
| Evolution | Tens of millions of years | Decades |

## Why ANNs are worth studying
- Extremely powerful computational devices.
- Massive parallelism makes them efficient.
- They **learn and generalize** from training data, with no need for enormous programming.
- Particularly **fault tolerant**.
- In principle they can do anything a symbolic/logic system can, and more.

## What they are used for: two goals
- **Brain modelling (biological):** model how real brains work, to understand perception, action, learning, memory and intelligence, and help brain-damaged patients.
- **Artificial system construction (engineering):** build efficient real-world systems, make machines more powerful, relieve humans of tedious tasks, even improve on human performance.`},

{ id:'dm-neuron', s:'dm', lec:'dm-nn', t:'The Biological Neuron', g:'CELL', img:'brain3',
  figs:[{src:'nn_14',cap:'Salient features of a neuron'}],
  sum:'Statistics of the brain and the parts of a neuron.',
  key:['10¹⁰ to 10¹⁴ neurons, each linked to hundreds of thousands of others','Slow electrochemical signals (milliseconds)','~10⁻⁶ W per neuron','Parts: dendrites (input), cell body + nucleus, axon (output), synapse (junction)'],
  body:`## Some statistics
- About **10¹⁰ to 10¹⁴ neurons** in an adult human brain.
- Neurons are highly connected: each connects to **hundreds of thousands** of others.
- Information passes slowly compared with transistors: **electrochemical signals** taking **milliseconds**.
- Energy per neuron is low: about **10⁻⁶ watts**.

Under a microscope neurons look like blobs of ink, but they are many molecules working together in an organized way: the best information-processing system known.

## Salient features of a neuron
| Part | Role |
| Dendrites | Receive signals from other neurons (inputs) |
| Cell body (with nucleus) | Processes the incoming signals |
| Axon | Carries the output signal to other neurons |
| Synapse | Junction where one neuron's axon meets another's dendrite; its strength is what an ANN's **weight** models |

A neuron is a three-dimensional entity.`},

{ id:'dm-annbasics', s:'dm', lec:'dm-nn', t:'ANN Basics: Architecture, Training & Activation', g:'w·x', img:'brain2',
  figs:[{src:'nn_19',cap:'Single-layer feed-forward net'},{src:'nn_21',cap:'Recurrent net'},{src:'nn_23',cap:'Binary sigmoid activation'}],
  sum:'What characterizes an ANN, feed-forward vs recurrent architectures, supervised vs unsupervised training, and activation functions.',
  key:['ANN = information-processing system like biological networks','Characterized by architecture, training algorithm, activation function','Feed-forward (single layer, multi-layer) vs recurrent (both directions)','Supervised: input + target; Unsupervised: no targets, similar inputs → same output','Binary sigmoid f(x) = 1/(1+e^(−σx)), f′(x) = σ f(x)[1 − f(x)]'],
  body:`An **artificial neural network** is an information-processing system with performance characteristics similar to biological neural networks. It is characterized by:
- **Architecture:** the pattern of connections between neurons.
- **Training / learning algorithm:** the method of determining the connection weights.
- **Activation function:** the function a neuron uses to become activated.

## Mathematical model of a neuron
Inputs x1…xn are multiplied by weights w1…wn, summed with a bias b into the net input **y_in = b + Σ xi·wi**, then passed through an activation function f to give the output **y = f(y_in)**.

## Architectures
| Category | Description |
| Feed-forward | Signals flow forward from input units to output units. **Single-layer** nets (inputs connect directly to outputs) and **multi-layer** nets (one or more hidden layers) |
| Recurrent | Signals can flow in **both directions**, including feedback loops |

## Training
- **Supervised:** present training vectors each with a **target output**; adjust weights by a learning algorithm. The network develops an associative memory and can recall a stored pattern from a similar input.
- **Unsupervised:** input vectors with **no targets**; the net adjusts weights and biases so the most similar inputs map to the same output unit.

## Common activation function: binary (logistic) sigmoid
**f(x) = 1 / (1 + exp(−σx))**, with derivative **f′(x) = σ · f(x) · [1 − f(x)]**.`},

{ id:'dm-annapps', s:'dm', lec:'dm-nn', t:'Typical Problem Areas for Neural Networks', g:'7×', img:'brain1',
  sum:'Pattern completion, classification, optimization, compression, approximation, association, prediction and control.',
  key:['Pattern completion: content-addressable memory','Classification: male/female faces at near-human level','Optimization: good-enough TSP solutions','Data compression, approximation, association','Prediction: next Karachi Stock Exchange price','Control: robot arm'],
  body:`| Area | Description |
| Pattern completion | Train on visual patterns (pixels); given part of a pattern or a noisy one, the network converges to the memorized original, acting like a **content-addressable memory** |
| Classification | Early networks distinguished **male and female faces** with near-human ability, which is very hard to program directly |
| Optimization | Hard problems like the **Travelling Salesman Problem (TSP)**; some networks converge to "good-enough" solutions close to the global optimum |
| Data compression | Represent input data in compressed form while losing as little information as possible |
| Approximation | Learn an input → output mapping from examples so future inputs give approximately the right answer |
| Association | Associate an input with an output; the same or similar input gives the same or similar output |
| Prediction | Given past samples of a time series (e.g. **Karachi Stock Exchange** closing prices), predict the next one |
| Control | E.g. control a **robot arm** or truck: learn which inputs (actions) produce the correct outputs |`},

{ id:'dm-perceptron', s:'dm', lec:'dm-nn', t:'The Perceptron: Architecture, Algorithm & AND Example', g:'θ', img:'brain2',
  figs:[{src:'nn_29',cap:'Simple perceptron for pattern classification'},{src:'nn_33',cap:'Perceptron example: final weights'}],
  sum:'The simple perceptron, its learning rule, the full AND-function training run, and decision boundaries.',
  key:['Output +1 belongs, −1 does not, 0 undecided (|y_in| ≤ θ)','Update only on error: wi = wi + α·xi·t, b = b + α·t','AND example: start w = 0, b = 0, α = 1, θ = 0.2 → final w1 = 2, w2 = 3, b = −4','Decision boundary: y_in = b + x1w1 + x2w2 = ±θ; works only for linearly separable data'],
  body:`## Background
Perceptrons had perhaps the most far-reaching impact of the early neural nets. The original had three layers: **sensory, associator and response units**, an approximate model of a retina. Under suitable assumptions its iterative learning **converges to the correct weights**.

## Simple perceptron for classification
Inputs X1…Xn with weights w1…wn plus a bias b feed one output unit. Goal: classify each pattern as belonging (+1) or not belonging (−1) to a class.
~~~
        +1   if y_in >  θ
f(y_in) = 0  if −θ ≤ y_in ≤ θ     (undecided)
        −1   if y_in < −θ
~~~
## Algorithm
1. Initialize weights, bias and threshold θ; set learning rate α (0 < α ≤ 1).
2. While the stopping condition is false:
3. For each training pair s : t:
4. Set activations xi = si.
5. Compute the response y.
6. If y ≠ t, update: **wi(new) = wi(old) + α·xi·t**, **b(new) = b(old) + α·t**.
7. Stop if no weight changed in step 3.

## Worked example: AND function
Data (binary inputs, bipolar targets): (1,1) → 1, (1,0) → −1, (0,1) → −1, (0,0) → −1. Start **w1 = w2 = b = 0**, **α = 1**, **θ = 0.2**.

**Epoch 1**
| x1 | x2 | y_in | y | t | w1 | w2 | b |
| 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 2 | 1 | −1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | −1 | 0 | 0 | −1 |
| 0 | 0 | −1 | −1 | −1 | 0 | 0 | −1 |

Training continues epoch by epoch until no weights change (epoch 10 in the slides), giving **w1 = 2, w2 = 3, b = −4**:
| x1 | x2 | y_in | y | t |
| 1 | 1 | 1 | 1 | 1 |
| 1 | 0 | −2 | −1 | −1 |
| 0 | 1 | −1 | −1 | −1 |
| 0 | 0 | −4 | −1 | −1 |

## Decision boundaries
Output is +1 if y_in > θ and −1 if y_in < −θ, where **y_in = b + x1·w1 + x2·w2**. The lines b + x1w1 + x2w2 = ±θ separate the classes. **Key limitation:** a single perceptron works only for **linearly separable** data.`},

{ id:'dm-mlp', s:'dm', lec:'dm-nn', t:'Multilayer Perceptrons (MLP) & History', g:'MLP', img:'brain2',
  figs:[{src:'nn_40',cap:'MLP with a single hidden layer'},{src:'nn_41',cap:'MLP with two hidden layers'},{src:'nn_46',cap:'Applications of MLPs'}],
  sum:'History of neural nets, MLP structure, what the hidden layer hides, and applications.',
  key:['1943 McCulloch–Pitts; 1962 Rosenblatt perceptron; 1969 Minsky & Papert limits; 1982 Hopfield; 1986 backpropagation','MLP = feed-forward with ≥1 hidden layer; signals propagate layer by layer','Hidden layer "hides" its desired output','Commercial: 3–4 layers, 10–1000 neurons per layer'],
  body:`## History
| Year | Milestone |
| 1943 | McCulloch–Pitts "neuron" started the field |
| 1962 | Rosenblatt's perceptron learned its own weights; convergence proof |
| 1969 | Minsky & Papert's book proved the limits of single-layer perceptrons |
| 1982 | Hopfield: convergence in symmetric networks; energy-function concept |
| 1986 | Backpropagation of errors: a method to train multilayer networks |

## Recap: perceptron limitation
A single perceptron only works for **linearly separable** data, which is why we need multilayer networks.

## Multilayer neural networks
A **multilayer perceptron (MLP)** is a feed-forward network with **one or more hidden layers**: an input layer of source neurons, at least one hidden (middle) layer of computational neurons, and an output layer. Input signals propagate **forward, layer by layer**. Each node connects to every node in the next layer; each connection has a weight (which can be zero).

## What does the middle layer hide?
A hidden layer "hides" its desired output: its neurons cannot be observed through the network's input/output behaviour, and there is no obvious way to know what their output should be.

Commercial ANNs use **three or four layers** (one or two hidden), each with **10 to 1000 neurons**. Experimental networks may have five or six layers (three or four hidden) and millions of neurons.

## Applications of MLPs
Classification and regression problems: patients' length of stay, stock-price forecasting, image recognition, car-driving control.`},

{ id:'dm-bp', s:'dm', lec:'dm-nn', t:'Backpropagation Algorithm', g:'⇄', img:'brain3',
  figs:[{src:'nn_48',cap:'Forward propagation of input, backpropagation of error'},{src:'nn_49',cap:'Three-layer back-propagation network'},{src:'nn_50',cap:'Backpropagation pseudocode'}],
  sum:'How MLPs learn: forward pass, backward pass, the algorithm, uses, pros and cons.',
  key:['Present a pattern, compute output, compare with target, adjust weights to cut error','Forward pass: input → layer by layer → output','Backward pass: error propagated from output back to input; weights modified','Uses: time series, credit risk, pattern recognition, speech, cognition, images, control','Universal approximator, efficient, robust; but slow convergence and local minima'],
  body:`## Learning with MLPs (general idea)
1. Send the MLP an input pattern x from the training set.
2. Get the output y.
3. Compare y with the target t to get the error.
4. Use the error to modify the weights so next time y is closer to t.
5. Repeat with another x from the training set.

## Two phases
- **Forward pass:** a training input is presented to the input layer and propagated **layer by layer** until the output layer produces the output.
- **Backward pass:** if the output differs from the desired output, an **error** is calculated and propagated **backwards** from the output layer to the input layer, modifying the weights as it goes.

## Algorithm
~~~
1: Initialize all weights to small random values
2: repeat
3:   for each training example do
4:     Forward-propagate the input features to get the MLP's outputs
5:     Back-propagate the error to compute Δw_ij for all weights
6:   end for
7:   Update the weights using the accumulated Δw_ij
8: until stopping criteria reached
~~~
## Types of problems
Time-series prediction, credit-risk assessment, pattern recognition, speech processing, cognitive modelling, image processing, control. **BP is the standard algorithm against which all other NN algorithms are compared.**

| Advantages | Disadvantages |
| An MLP trained with BP is a **universal approximator** of functions | Convergence can be **very slow**, especially in large problems |
| Computationally efficient | Suffers from **local minima** |
| Robust | — |`},

{ id:'dm-bpex', s:'dm', lec:'dm-nn', t:'Backpropagation Step-by-Step Numeric Example', g:'0.298', img:'brain1',
  sum:'The full forward pass, error and weight updates for the 2-2-2 network from your step-by-step PDF.',
  key:['Inputs 0.05, 0.10 → targets 0.01, 0.99; learning rate η = 0.5','out_h1 = 0.5933, out_h2 = 0.5969; out_o1 = 0.7514, out_o2 = 0.7729','E_total = 0.2984','w5 → 0.3589, w6 → 0.4087, w7 → 0.5113, w8 → 0.5614; w1 → 0.1498 …','Error after 1 round 0.2910; after 10,000 rounds 0.0000351'],
  body:`## Network and starting values
Two inputs, two hidden neurons, two outputs, biases on hidden and output layers, logistic activation.
| Item | Value |
| Inputs | i1 = 0.05, i2 = 0.10 |
| Targets | o1 = 0.01, o2 = 0.99 |
| Input → hidden weights | w1 = 0.15, w2 = 0.20, w3 = 0.25, w4 = 0.30 |
| Hidden → output weights | w5 = 0.40, w6 = 0.45, w7 = 0.50, w8 = 0.55 |
| Biases | b1 = 0.35, b2 = 0.60 |
| Learning rate | η = 0.5 |

## Forward pass
~~~
net_h1 = w1·i1 + w2·i2 + b1 = 0.15(0.05) + 0.20(0.10) + 0.35 = 0.3775
out_h1 = 1 / (1 + e^−0.3775) = 0.593269992
out_h2 = 0.596884378      (net_h2 = 0.3925)

net_o1 = w5·out_h1 + w6·out_h2 + b2 = 1.105905967
out_o1 = 0.75136507
out_o2 = 0.772928465
~~~
## Total error (squared error)
~~~
E_o1 = ½(0.01 − 0.75136507)² = 0.274811083
E_o2 = ½(0.99 − 0.772928465)² = 0.023560026
E_total = 0.298371109
~~~
## Backward pass: output layer (example w5)
Chain rule: ∂E/∂w5 = ∂E/∂out_o1 · ∂out_o1/∂net_o1 · ∂net_o1/∂w5
~~~
∂E/∂out_o1     = −(target − out) = 0.74136507
∂out_o1/∂net_o1 = out(1 − out)  = 0.186815602
∂net_o1/∂w5    = out_h1         = 0.593269992
∂E/∂w5 = 0.082167041
w5_new = 0.40 − 0.5 × 0.082167041 = 0.35891648
~~~
Similarly: **w6 = 0.408666186, w7 = 0.511301270, w8 = 0.561370121**.

## Backward pass: hidden layer
The error at a hidden neuron is the sum of its effects on both outputs (using the **old** w5–w8). For w1:
~~~
∂E/∂w1 = 0.000438568
w1_new = 0.15 − 0.5 × 0.000438568 = 0.149780716
~~~
Similarly: **w2 = 0.19956143, w3 = 0.24975114, w4 = 0.29950229**.

## Result
After the first round the total error falls from **0.298371109 to 0.291027924**. After **10,000** repetitions it falls to **0.0000351085**, and the outputs become 0.015912196 (target 0.01) and 0.984065734 (target 0.99).`}
]);
