/* Fuller easy notes for Data Mining topics (not the neural-network ones, which already have full notes). Simple words, more detail. */
(function(){
const N = {

'dm-what': `## What is data mining?
**Digging through very large amounts of data to find useful, hidden patterns.** Think of gold mining: the data is the soil and the patterns are the gold.

## Definitions from your slides (learn at least two)
- **Tentative definition:** using **efficient techniques** to analyse **very large collections of data** and pull out **useful and possibly unexpected patterns**.
- Finding **hidden information** in a database, or **fitting data to a model**. Other names: exploratory data analysis, data-driven discovery, deductive learning.
- **Hand, Mannila, Smyth:** "Analysis of (often large) observational data sets to find **unsuspected relationships** and to summarize the data in new, understandable and useful ways."
- **Rajaraman, Ullman:** "The **discovery of models** for data." A model can:
  - **explain** the data
  - **predict** future cases
  - **summarize** the data
  - pick out its **most important features**

## Why do we need data mining?
1. **Huge raw data:** terabytes every second from mobiles, photos, web pages, Facebook updates, tweets, blogs, shopping, sensors, cameras, search queries and clicks.
2. **Storage is cheap**, so we keep all of it. But raw data is **useless until we analyse it** and get knowledge out.
3. **"The data is the computer":** a lot of data can be **more powerful than a clever algorithm**. Google fixed spelling mistakes and found synonyms **just by looking at search data**.
4. **Data is power:** Google's query logs, Facebook's friendships, Twitter's tweets and Amazon's transactions are each company's **biggest asset**.
5. **Data is complex:** tables, time series, images and graphs, all **connected**. One phone holds location, friends, check-ins, opinions, photos and queries together.

## Examples of big data
| Kind | Example |
| Transaction data | Walmart 20 million transactions a day; AT&T 300 million calls a day; card companies billions a day |
| Document data | About 50 billion web pages; Wikipedia 4 million articles; about 300 million tweets a day |
| Network data | The web's linked pages; Facebook 500 million users; Twitter 300 million; 250 million blogs |
| Genomic data | 1000 Genomes project: 3 billion DNA letters per person, 3 trillion in total |
| Environmental data | Climate database: 6000 temperature, 7500 rain and 2000 pressure stations |
| Behavioural data | Phones record GPS, photos, calls, posts; Amazon logs browsing and buying; Google logs searches and clicks |`,

'dm-data': `## What is data?
**Data = a collection of objects and their attributes.** Think of a table: each **row** is an object and each **column** is an attribute.

## Two key words
- **Attribute:** a **property or characteristic** of an object, e.g. eye colour, temperature.
  - Other names: **variable, field, characteristic, feature**.
- **Object:** one thing, described by a set of attributes.
  - Other names: **record, point, case, sample, entity, instance**.

> **Example:** in a student table, each student is an **object**; Name, Age and CGPA are **attributes**.

## Three properties of a dataset
- **Size:** how many **objects** (rows) there are.
- **Dimensionality:** how many **attributes** (columns) there are.
- **Sparsity:** how many object–attribute cells are **actually filled**. Many empty cells means the data is sparse.

## Types of attributes
**1. Categorical (qualitative): values are names or labels**
- **Nominal:** just names, **no order**, you can't compare them. Examples: eye colour, zip codes, words.
- **Ordinal:** values have an **order**, but you can't measure the gap between them. Examples: rankings (good, fair, bad), height {tall, medium, short}.

**2. Numeric (quantitative): values are numbers**
- **Discrete:** **counts**, whole numbers. Example: number of children.
- **Continuous:** any value in a range, can have decimals. Examples: temperature, length, time.

**3. Special case: Binary**
- Only **two values**: yes/no, exists/does not exist, 0/1.

| Type | Sub-type | Has order? | Example |
| Categorical | Nominal | No | Eye colour |
| Categorical | Ordinal | Yes | Good, fair, bad |
| Numeric | Discrete | Yes | Count of items |
| Numeric | Continuous | Yes | Temperature |
| Special | Binary | No | Yes / No |`,

'dm-types': `## Types of data (how datasets look)
Different data needs different ways to store and mine it.

## 1. Record data
**Numeric record data**
- Every object has the **same fixed set of numeric attributes**.
- So each object is a **point in multi-dimensional space** (one dimension per attribute).
- Stored as an **n-by-d data matrix**: **n rows = objects**, **d columns = attributes**.

**Categorical data**
- Records with a **fixed set of categorical attributes**.
- Each object is a **vector of category values**, e.g. (Married, Yes, Male).

**Document data**
- Each document becomes a **term vector**.
- Each **word (term) is an attribute**; its value is **how many times** it appears in the document.
- This is called **bag-of-words**: the **order of words is ignored**.

**Set (transaction) data**
- Each object is a **set of items**, like a shopping basket {Bread, Milk, Eggs}.
- Can be shown as a **binary vector** (bought or not) or a **count vector** (how many).

## 2. Ordered data
- **Genomic sequence data:** a long **ordered string** of letters, e.g. GGTTCCGCC… The order matters.
- **Time-series data:** numbers **ordered by time**, e.g. daily **stock prices**.

## 3. Graph data
- Made of **nodes** (points) and **edges** (links between them).
- Example: the **web graph**, where pages are nodes and **HTML links** are edges; also social networks.

| Type | Looks like | Example |
| Numeric record | n × d table of numbers | Height, weight of people |
| Document | Word-count vector | News articles |
| Set / transaction | Basket of items | Supermarket bills |
| Ordered | Sequence | DNA, stock prices |
| Graph | Nodes and edges | Web pages and links |`,

'dm-vsdb': `## Database processing vs data mining
A **database query** finds **exact records** you already know how to describe. **Data mining** finds **new patterns** you didn't know existed.

| Aspect | Database processing | Data mining |
| Query | Well defined, written in SQL | Poorly defined, no exact query language |
| Data | Operational (day-to-day) data | Not operational data (often historical) |
| Output | Precise; a subset of the database | Fuzzy; not a subset of the database (new knowledge) |

## What is NOT data mining?
- Looking up a **phone number** in a phone directory.
- Searching a **web search engine** for information about "Amazon".
These are just **simple lookups**: you get back data that already exists.

## Same data, different questions
| Database query | Data mining query | Task |
| Find all customers who bought milk | Find all items often bought **together with** milk | Association rules |
| Find all credit applicants with last name Smith | Find all applicants who are **poor credit risks** | Classification |
| Find customers who spent more than $10,000 last month | Find customers with **similar buying habits** | Clustering |

## Parts of a data mining algorithm
1. **Model:** the goal is to **fit data to a model**, either:
   - **descriptive:** describes the data, or
   - **predictive:** predicts future values.
2. **Preference:** a rule for **choosing the best model** among many.
3. **Search:** a method to **search the data** (like a "query").`,

'dm-tasks': `## Two main kinds of data mining (Fayyad et al., 1996)
- **Prediction (predictive) methods:** use **some variables** to **predict unknown or future values** of other variables.
- **Description (descriptive) methods:** find **human-understandable patterns** that **describe** the data.

## Which task belongs where?
| Task | Kind |
| Classification | Predictive |
| Regression | Predictive |
| Time-series analysis | Predictive |
| Prediction | Predictive |
| Deviation detection | Predictive |
| Clustering | Descriptive |
| Summarization | Descriptive |
| Association rule discovery | Descriptive |
| Sequential pattern discovery | Descriptive |

## Each task in simple words
- **Classification:** puts data into **predefined groups (classes)**. Also called **supervised learning**, pattern recognition. Example: spam or not spam.
- **Regression:** predicts a **real number** (continuous value). Example: house price.
- **Time-series analysis:** studies values **over time** to predict the future. Example: stock market.
- **Prediction:** guesses a **future state** from past data.
- **Deviation detection:** finds things that are **very different from normal**. Example: fraud.
- **Clustering:** groups **similar data together** with **no predefined classes**. Also called **unsupervised learning**, segmentation, partitioning.
- **Summarization:** gives **short, simple descriptions** of subsets of data (characterization, generalization).
- **Link analysis / association rules:** finds **relationships** between items. Example: bread → butter.
- **Sequential analysis:** finds patterns that happen **in order**. Example: phone → cover → charger.

> **Time-series example (stock market):** predict tomorrow's price, find similar price patterns in the past, and classify a share's behaviour.`,

'dm-classif': `## What is classification?
- You have a set of records called the **training set**.
- Each record has **attributes**, and **one attribute is the class** (the label we care about).
- **Goal:** build a **model** that predicts the class **from the other attributes**.
- Then **new, unseen records** should get the **right class** as accurately as possible.
- A separate **test set** is used to **check accuracy**. Usually the data is split: **training set to build** the model, **test set to validate** it.

> **Slide example:** Refund and Marital Status are **categorical**, Taxable Income is **continuous**, and **Cheat (Yes/No) is the class**.

## Steps in simple words
1. Collect past records where the **answer (class) is known**.
2. **Learn a model** (e.g. a decision tree) from the training set.
3. **Test** the model on the test set to see how accurate it is.
4. **Use** the model on new records.

## Applications
**1. Direct marketing**
- **Goal:** cut mailing cost by sending offers only to people **likely to buy** a new cell phone.
- **How:** use data from a **similar old product**. Class = {buy, don't buy}. Collect **demographic, lifestyle and company-interaction** data, then learn a classifier.

**2. Fraud detection**
- **Goal:** predict **fraudulent** credit-card transactions.
- **How:** use transaction data and account-holder info (**when, what, how often** they pay on time). Label past transactions as **fraud or fair**, learn a model, then **watch new transactions**.

**3. Customer attrition / churn**
- **Goal:** predict whether a customer will **leave for a competitor**.
- **How:** use **call records** (how often, where, what time), plus **financial and marital status**. Label customers **loyal or disloyal** and find a model for loyalty.`,

'dm-cluster': `## What is clustering?
- You have data points with attributes, and a **similarity measure** (a way to say how close two points are).
- **Goal:** make groups (**clusters**) so that:
  - points **in the same cluster** are **very similar** to each other;
  - points **in different clusters** are **less similar**.
- There are **no predefined classes**; the algorithm finds the groups itself (**unsupervised**).

## Key rule
- **Intra-cluster distance** (inside a group) is **minimized**: members are close together.
- **Inter-cluster distance** (between groups) is **maximized**: groups are far apart.

## Similarity measures
- **Euclidean distance** for continuous attributes (straight-line distance).
- Other **problem-specific** measures for other data types.

## Applications
**1. Market segmentation**
- Divide customers into **distinct groups**, each a target for its **own marketing mix**.
- Collect **geographic and lifestyle** attributes, find clusters, then check quality by comparing **buying patterns inside vs across** clusters.

**2. Document clustering**
- Find groups of **similar documents** using their **important words**.
- Find frequent terms → build a **similarity measure** from term counts → cluster.
- **Benefit:** information retrieval can link **new documents or search terms** to the right cluster.
- Example: **3204 Los Angeles Times** articles clustered by common words.

**3. S&P 500 stock data**
- Points are **Stock-UP / Stock-DOWN** events.
- Two events are similar if they **often happen on the same day**.

| Classification | Clustering |
| Classes known in advance | Groups discovered by the algorithm |
| Supervised | Unsupervised |
| Example: spam / not spam | Example: customer segments |`,

'dm-assoc': `## What is association rule discovery?
- A technique that finds **relationships and patterns between items**, written as **"If X, then Y"** (X ⇒ Y).
- Used everywhere from **marketing** to **medical diagnosis**.
- A supermarket studies which products are **bought together** to improve **shelf placement and promotions**.

## Two parts of a rule
- **Antecedent (the "if" part):** e.g. **milk and eggs** are bought.
- **Consequent (the "then" part):** e.g. **cheese** is bought.
- Meaning: customers who buy milk and eggs are **more likely** to also buy cheese.

> {Milk, Eggs} ⇒ {Cheese}

## Applications
**1. Marketing and sales promotion**
Rule: {Bagels, …} ⇒ {Potato Chips}
- **Potato chips as consequent:** tells us what to do to **boost chip sales**.
- **Bagels in the antecedent:** tells us which products are **affected if we stop selling bagels**.
- **Bagels in antecedent and chips in consequent:** tells us what to sell **with bagels** to promote chips.

**2. Supermarket shelf management**
- Find items **bought together by enough customers**.
- Done by processing **point-of-sale barcode** data. Then place those items **near each other**.

**3. Inventory management**
- An **appliance-repair company** predicts which **parts** a repair will need, so service vans **carry them** and **fewer repeat visits** are needed.
- Done by mining which parts **appeared together** in previous repairs.`,

'dm-regtask': `## Regression
- **Predicts a continuous (number) value** of one variable using other variables.
- Assumes a **linear or non-linear** relationship between them.
- Studied a lot in **statistics** and **neural networks**.

**Examples**
- Predict **sales of a new product** from **advertising spending**.
- Predict **wind speed** from **temperature, humidity and air pressure**.
- **Time-series** prediction of **stock-market** indices.

## Deviation (anomaly) detection: predictive
- Finds **big differences from normal behaviour**.
- Examples: **credit-card fraud**, **network attacks**, a faulty machine reading.

## Sequential pattern discovery: descriptive
- Finds patterns that happen **in a certain order over time**.
- Example: customers who buy a **phone**, then a **cover**, then a **charger**.

## Time-series analysis
- **Predict future values** (tomorrow's price).
- **Find similar patterns** over time.
- **Classify behaviour** (rising, falling, stable).

| Task | Output | Kind |
| Regression | A number | Predictive |
| Deviation detection | "Normal" or "unusual" | Predictive |
| Sequential patterns | Ordered patterns | Descriptive |
| Time-series analysis | Future values / patterns | Predictive |`,

'dm-kdd': `## KDD vs data mining
- **KDD (Knowledge Discovery in Databases):** the **whole process** of finding useful information and patterns in data.
- **Data mining:** **one step** inside KDD: using **algorithms** to pull out the patterns.

## The five KDD steps
1. **Selection:** get the data from **different sources**.
2. **Preprocessing:** **clean** the data (fix errors, remove noise, fill missing values).
3. **Transformation:** convert the data into a **common format** suitable for mining.
4. **Data mining:** run algorithms to get the **desired results** (patterns).
5. **Interpretation / evaluation:** show the results to the user in a **meaningful way** (charts, reports).

> **Memory trick:** **S-P-T-D-I**: "**S**ome **P**eople **T**ake **D**ata **I**nside."

## Web log example
| Step | What happens |
| Selection | Choose log data (dates, locations) |
| Preprocessing | Remove identifying URLs and error logs |
| Transformation | Sessionize: sort and group visits into sessions |
| Data mining | Find and count patterns; build a data structure |
| Interpretation | Show the most frequently visited page sequences |
Uses: **cache prediction** and **personalization**.

## The data analysis pipeline
**Preprocessing → Data mining → Post-processing.** Mining is **not the only step**.
- **Preprocessing:** real data is **noisy, incomplete and inconsistent**, so **data cleaning** is needed. Techniques: **sampling, dimensionality reduction, feature selection**. It's dirty work but often **the most important step**.
- **Post-processing:** make the results **useful (actionable)**: **statistical tests** of importance and **visualization**.
- Pre- and post-processing are often **data mining tasks themselves**.`,

'dm-dev': `## Where did data mining come from?
Data mining grew out of **five fields**. Each gave it some tools.

| Field | What it gave data mining |
| Databases | Relational model, SQL, association rule algorithms, data warehousing, scalability |
| Information retrieval | Similarity measures, hierarchical clustering, IR systems, imprecise queries, text data, web search engines |
| Statistics | Bayes theorem, regression, EM algorithm, k-means clustering, time-series analysis |
| Machine learning | Neural networks, decision tree algorithms |
| Algorithms | Algorithm design, algorithm analysis, data structures |

## KDD issues (problems we face)
- **Overfitting:** the model learns the training data **too well**, including noise, and fails on new data.
- **Interpretation:** results can be **hard to understand**.
- **Visualization:** showing results clearly is hard.
- **Large datasets:** too big to process easily.
- **High dimensionality:** **too many attributes**.
- **Multimedia data:** images, audio and video are hard to mine.
- **Missing data:** some values are **empty**.
- **Irrelevant data:** attributes that **don't help**.
- **Noisy data:** **errors** and wrong values.
- **Changing data:** data **keeps changing**, so old models go out of date.
- **Application:** using the results **in real life** can be hard.

> **Exam tip:** you are often asked to list KDD issues. Learn at least **6 to 8** with a one-line meaning each.`,

'dm-slr': `## What is simple linear regression?
- A method that finds the relationship between **two variables**:
  - **Dependent variable (y):** what we **want to predict**, e.g. test score.
  - **Independent variable (x):** what we **already know**, e.g. hours studied.
- It draws the **best-fit straight line** ("line of best fit") through the points, the line with the **smallest overall error**.

## The equation
$$y = b_0 + b_1 x \\quad (\\text{same as } y = mx + c)$$
- **y:** predicted output.
- **x:** input.
- **b1 (m), the slope:** how much y **changes** when x goes up by **1**.
- **b0 (c), the intercept:** the value of y **when x = 0**.

## How is the best line found?
1. **Plot** all the points.
2. Use **Ordinary Least Squares (OLS)**: choose the line that makes the **sum of squared errors smallest**.
3. **Error (residual)** = actual value − predicted value.

## Quick worked example
| Study hours (x) | Test score (y) |
| 2 | 50 |
| 4 | 70 |
| 6 | 90 |
1. **Slope:** m = change in y ÷ change in x = 20 ÷ 2 = **10**.
2. **Intercept:** 50 = 10(2) + c, so c = **30**.
3. **Equation:** **y = 30 + 10x**.
4. **Predict:** 5 hours → 30 + 50 = **80**.
5. **Reverse:** to score 90 → 90 = 10x + 30 → x = **6 hours**.

## Reading the slope
- **m > 0:** positive relationship (x up → y up).
- **m < 0:** negative relationship (x up → y down).

## Why it matters
- **Simple** and **easy to interpret**.
- The **foundation** of more advanced machine learning.
- Answers **"how much?"** and **"in which direction?"**`,

'dm-lrlife': `## Linear regression in real life
Regression helps us **predict a number** and see **how much each factor matters**.

**1. Social media post popularity**
- Likes depend on **topic, posting time, content type, hashtags and length**.
- Regression shows e.g. how much **posting in the evening** adds, how the **number of hashtags** affects likes, and whether **content type matters more than time**.

**2. House prices**
- Price depends on **size, location, rooms and age**.
- If an area averages **$100 per square foot**, a **1,500 sq ft** house ≈ **$150,000**.
- **Buyers** can budget; **sellers** can price competitively.

**3. Exam scores from study time**
- More hours → higher score. Regression **predicts your score** and shows **how much each extra hour helps**.

**4. Sales forecasting**
- A toy store sees sales rise **every December**. If December is **10% higher** than November, it can plan **stock and marketing**.

**5. Sports performance**
- If every **100 extra practice shots** raise shooting accuracy by **2%**, then **500 extra shots** ≈ **+10%**.

## Other uses from the lecture
- **Blood pressure vs medicine dose.**
- **Crop yield** from fertilizer and water.
- **Business revenue** from advertising.

| Example | x (input) | y (output) |
| House | Size in sq ft | Price |
| Study | Hours studied | Exam score |
| Sports | Practice shots | Shooting % |
| Business | Advertising spend | Revenue |`,

'dm-mlr': `## Why more than one variable?
Real results depend on **many factors**:
- **House price:** size, rooms, location.
- **Student performance:** study hours, attendance, previous GPA.
- **Salary:** experience, education, skills.

## What is multiple linear regression?
- A **supervised learning** algorithm.
- Predicts **one dependent variable (y)** from **several independent variables** (x1, x2 … xn) by fitting a **linear equation**.

## The model
$$y = b_0 + b_1x_1 + b_2x_2 + \\dots + b_nx_n$$
- **b0:** intercept (bias), the value of y when all x are 0.
- **b1 … bn:** coefficients (weights).
- Each coefficient = how much y changes when **that x goes up by 1**, **keeping the others the same** (**ceteris paribus**).

> **Salary = 20,000 + 5,000(Experience) + 3,000(Education).** Each extra year adds 5,000 (education fixed). Each extra education level adds 3,000 (experience fixed).

> **House price:** Price = b0 + b1(Size) + b2(Bedrooms) + b3(Age), with data (1000 sq ft, 2 bed, 10 yrs, 50 lacs), (1500, 3, 5, 70), (2000, 4, 2, 90).

## Matrix form
$$y = Xb$$
- **X:** feature matrix; its **first column is all 1s** (for the intercept).
- **b:** vector of coefficients.
- **y:** vector of outputs.

## Cost function: Mean Squared Error (MSE)
$$J(b) = \\frac{1}{m}\\sum_{i=1}^{m}(y_i - \\hat{y}_i)^2$$
- Average of the **squared errors** (actual − predicted). **Goal: make it as small as possible.**

## Two ways to find the coefficients
| Method | Formula | When to use |
| Normal equation | b = (XᵀX)⁻¹Xᵀy | Exact answer; slow for very large data |
| Gradient descent | bj := bj − α · ∂J/∂bj | Step-by-step; good for large data; used widely in ML |
- **α (alpha)** = the **learning rate**, the size of each step.`,

'dm-mlrassume': `## Five assumptions of linear regression
1. **Linearity:** the relationship between x and y is a **straight line**.
2. **Independence:** each observation is **independent** of the others.
3. **Homoscedasticity:** the **errors have the same spread (variance)** everywhere.
4. **No multicollinearity:** the independent variables are **not strongly related to each other**.
5. **Normality of errors:** the errors (residuals) follow a **normal (bell-shaped) distribution**.
If these are broken, **accuracy and interpretation suffer**.

> **Memory trick:** **L-I-H-N-N**: "**L**ines **I**n **H**ouses **N**eed **N**ails."

## Multicollinearity (explained)
- Happens when **two or more inputs are highly correlated**.
- Example: **house size** and **number of rooms** (bigger houses have more rooms).
- **Problem:** coefficients become **unstable** and **hard to interpret** (you can't tell which one really matters).
- **Solutions:**
  - **Remove one** of the related variables, or
  - use **Ridge or Lasso** regression.

## Applications
- **House price** prediction
- **Medical risk** analysis
- **Sales and revenue** forecasting
- **Student performance** prediction
- **Economic and financial** modelling

## Advantages vs limitations
| Advantages | Limitations |
| Simple and easy to interpret | Cannot model non-linear (curved) patterns |
| Fast to train | Sensitive to outliers (extreme values) |
| Works well for linear relationships | Its assumptions must be satisfied |
Linear regression is the **foundation** for **Ridge, Lasso and Elastic Net**.`,

'dm-mlrex': `## What is this example about?
We predict **salary (y)** from **experience (x1)** and **certifications (x2)** using the **normal equation** b = (XᵀX)⁻¹Xᵀy.

| Employee | Experience x1 | Certifications x2 | Salary y |
| 1 | 1 | 1 | 40 |
| 2 | 2 | 1 | 50 |
| 3 | 3 | 2 | 60 |
| 4 | 4 | 3 | 80 |

## The 10 steps in plain words
1. **Write the model:** y = b0 + b1x1 + b2x2.
2. **Build X:** put a **column of 1s** first (for b0), then the x1 and x2 columns. Build **y** from the salaries.
3. **Write the normal equation:** b = (XᵀX)⁻¹Xᵀy.
4. **Find XᵀX:** add up the sums: n = 4, Σx1 = 10, Σx2 = 7, Σx1² = 30, Σx1x2 = 21, Σx2² = 15.
5. **Find the determinant** (= 6) and the **inverse** of XᵀX.
6. **Find Xᵀy:** Σy = 230, Σx1y = 640, Σx2y = 450.
7. **Multiply** (XᵀX)⁻¹ by Xᵀy to get b0 = **25**, b1 ≈ **8.33**, b2 ≈ **6.67**.
8. **Write the equation:** **y = 25 + 8.33x1 + 6.67x2**.
9. **Interpret it:**
   - **25** = base salary with no experience and no certifications.
   - Each extra **year of experience** adds ≈ **8.33** (certifications fixed).
   - Each extra **certification** adds ≈ **6.67** (experience fixed).
10. **Predict:** experience 5, certifications 2 → 25 + 41.67 + 13.33 = **80**.

> **Note:** the PDF has small arithmetic slips (21 written as 20, and different Xᵀy numbers). The steps here are recomputed; the final prediction is still **about 80**.

## Exam tip
Show **every step**: X matrix, XᵀX, inverse, Xᵀy, coefficients, final equation, prediction. Marks are given for the steps, not just the answer.`,

'dm-learn': `## Why do machines need to learn?
- Learning is a **basic part of human intelligence**.
- A system that learns can **adapt to change** and build **better rules with experience**.
- It may be **easier to program**: start simple and let the system **improve itself**.

## Two types of learning
- **Learning from examples (inductive learning):** show the system **10 pictures of different tigers** and let it work out what a tiger is.
- **Learning by being told:** tell it directly: "A tiger has a **long tail, stripes, short ears**…"
**AI focuses mainly on inductive learning.**

## Inductive learning
- Find a **rule or function** that lets us draw **useful conclusions** from data.
- Examples:
  - predict **student performance** from entry qualifications;
  - **classify images** from their features;
  - decide whether a word is a **noun or a verb**.
- Give the system **cases where the answer is known**; the rule it learns should also work on **new cases**.

## Classification
- Many learning problems are **classification** problems: use **input features** to decide the **class**.
- Example: size of teeth + stripiness → **tiger or rabbit**?
- Other examples: **character recognition**, **disease diagnosis**, **student performance prediction**.
- Written formally as:
$$f(\\text{feature}_1, \\text{feature}_2, \\dots) \\rightarrow \\text{Category}$$
- Example: teeth = big, covering = stripy → **tiger**.

## Learning as search
- Search through **all possible rules** and pick the one that **best and most simply** explains the examples.
- Example: the simplest rule that predicts tigers might be **stripy AND longTail → tiger**.`,

'dm-dtree': `## Classification is a two-step process
1. **Learning step:** build the model from **training data**.
2. **Prediction step:** use the model to predict the class of **new data**.
The **decision tree** is one of the **easiest and most popular** classifiers to understand.

## How a decision tree works
- It is a **supervised learning** algorithm that can do **both classification and regression**.
- It learns simple **if-then decision rules** from the training data.
- **To classify a record:**
  1. Start at the **root** node.
  2. Compare the root's attribute with the record's value.
  3. Follow the **branch** that matches.
  4. Repeat at the next node until you reach a **leaf**.
  5. The **leaf gives the answer** (class).
- Each **node tests an attribute**, each **edge is a possible answer**, and the process is **recursive** for each sub-tree.

> **PlayTennis tree:** Outlook at the root. **Sunny** → check Humidity (High → No, Normal → Yes). **Overcast** → Yes. **Rain** → check Wind (Strong → No, Weak → Yes).

## Two types of decision tree
- **Categorical variable decision tree:** the target is a **category** (Yes/No).
- **Continuous variable decision tree:** the target is a **number** (price).

## Terminology (7 terms, learn them all)
1. **Root node:** the **top** node; holds the whole dataset, which gets divided.
2. **Splitting:** dividing a node into **two or more sub-nodes**.
3. **Decision node:** a sub-node that **splits further**.
4. **Leaf / terminal node:** a node that **does not split**; it gives the final answer.
5. **Pruning:** **removing sub-nodes** (the opposite of splitting), to make the tree simpler.
6. **Branch / sub-tree:** a **section** of the whole tree.
7. **Parent and child node:** a node that is split is the **parent**; the new nodes are its **children**.`,

'dm-chaid': `## What is CHAID?
- **CHAID = Chi-squared Automatic Interaction Detector.**
- One of the **oldest** decision-tree classification methods.
- It decides **where to split** a tree using the **chi-square test**.

## What does it measure?
- It checks whether the difference between **sub-nodes** and the **parent node** is **statistically significant** (real, not by chance).
- It compares **observed** counts (what really happened) with **expected** counts (what we'd expect if there were no pattern).

## The formula
$$\\chi^2 = \\sum \\frac{(O - E)^2}{E}$$
- **χ²:** the chi-square value.
- **Σ:** add up over all cells.
- **O:** observed value.
- **E:** expected value.

## Key points
- Works with a **categorical target**, e.g. "Success" or "Failure".
- Can make **two or more splits** at a node (not only binary).
- **Higher chi-square = more significant** difference, so a **better split**.

## Simple steps
1. For each possible split, count **observed** Success/Failure in each sub-node.
2. Work out the **expected** counts using the parent's ratio.
3. Compute **(O − E)² / E** for each cell and **add them up**.
4. Choose the split with the **highest χ²**.`,

'dm-id3': `## What is ID3?
- **ID3 = Iterative Dichotomiser 3.**
- A classification algorithm that **builds a decision tree**.
- Uses a **greedy approach**: at each step it picks the attribute with **maximum Information Gain** (or **minimum Entropy**).
- In the tree: **node = attribute**, **branch = decision (rule)**, **leaf = outcome**.

## Entropy: how mixed is the data?
$$H(S) = -\\sum_{c \\in C} p(c)\\,\\log_2 p(c)$$
- **S:** the current dataset (changes every iteration).
- **C:** the set of classes, e.g. {yes, no}.
- **p(c):** the fraction of records in class c.
- **Entropy = 0:** **pure** (all records the same class).
- **Entropy = 1:** **fully mixed** (half yes, half no, for two classes).

## Information Gain: how much does a split help?
$$IG(A, S) = H(S) - \\sum_{t \\in T} p(t)\\,H(t)$$
- **T:** the subsets made by splitting S on attribute A.
- **p(t):** the fraction of records in subset t.
- **H(t):** entropy of subset t.
- **Pick the attribute with the largest information gain.**

## ID3 steps
1. Start with the **whole set S** as the **root**.
2. For every **unused** attribute, compute its **entropy** and **information gain**.
3. Choose the attribute with the **largest gain** (smallest entropy).
4. **Split** S on that attribute into subsets.
5. **Repeat** on each subset using only attributes **not used before**, until every branch ends in a **pure leaf** (or no attributes are left).

| Word | Meaning |
| Entropy | How mixed/uncertain the data is |
| Information gain | How much a split reduces that uncertainty |
| Greedy | Chooses the best option at each step only |
| Pure node | All records have the same class |`,

'dm-id3ex': `## The problem
Use **ID3** on the **14-day PlayTennis** weather data to build a tree that predicts **Play = Yes/No** from **Outlook, Temperature, Humidity and Wind**.

## Step 1: Entropy of the whole data
- 9 Yes and 5 No out of 14.
$$H(S) = -\\tfrac{9}{14}\\log_2\\tfrac{9}{14} - \\tfrac{5}{14}\\log_2\\tfrac{5}{14} = 0.940$$

## Step 2: Information gain of each attribute
- Example, **Wind:** Weak = 8 days (6 Yes, 2 No) → H = 0.811; Strong = 6 days (3 Yes, 3 No) → H = 1.000.
$$IG(S, \\text{Wind}) = 0.940 - \\tfrac{8}{14}(0.811) - \\tfrac{6}{14}(1.000) = 0.048$$

| Attribute | Information gain |
| **Outlook** | **0.246** |
| Humidity | 0.151 |
| Wind | 0.048 |
| Temperature | 0.029 |
- **Outlook has the highest gain, so it becomes the root.**

## Step 3: Grow each branch
- **Overcast** (4 days, all Yes): **pure**, so it becomes a leaf **Yes**.
- **Sunny** (5 days: 2 Yes, 3 No, H = 0.971):
  - Gain(Humidity) = 0.971, Gain(Temperature) = 0.571, Gain(Wind) = 0.020.
  - Split on **Humidity**: High → **No**, Normal → **Yes**.
- **Rain** (5 days: 3 Yes, 2 No, H = 0.971):
  - Gain(Wind) = 0.971; Humidity and Temperature ≈ 0.020.
  - Split on **Wind**: Weak → **Yes**, Strong → **No**.

## Final tree
~~~
Outlook
├─ Sunny    → Humidity: High → No | Normal → Yes
├─ Overcast → Yes
└─ Rain     → Wind: Weak → Yes | Strong → No
~~~
- **Temperature is never used**: it didn't help enough.

## Exam tip
Always show **H(S)** first, then the **gain table**, then the **branch working**, and finish with the **tree drawing**.`,

'dm-id3char': `## Characteristics of ID3 (its strengths and weaknesses)
1. **Greedy approach**
   - It picks the best attribute **at each step only**, never looking back.
   - So it does **not guarantee the best (optimal) tree**; it can get stuck in a **local optimum**.
2. **Can overfit**
   - It may learn the training data **too exactly**, including noise, and do badly on new data.
   - To avoid this, **smaller trees should be preferred** (e.g. by **pruning**).
3. **Usually small trees, but not always the smallest**
   - It tends to make **short trees**, but **not always the smallest possible** one.
4. **Hard with continuous data**
   - A number attribute (like temperature 21.5) has **many possible split points**.
   - Searching for the **best split value** is **time-consuming**.

| Characteristic | Effect |
| Greedy | May miss the best tree (local optimum) |
| Overfitting | Poor on new data; prefer smaller trees |
| Small trees | Not always the smallest possible |
| Continuous data | Many split points, slow to search |

> **Exam tip:** a 4-mark question "Write characteristics of ID3" = these **four points** with one line each.`
};
Object.entries(N).forEach(([k, v]) => { if (window.EASY && window.EASY[k]) window.EASY[k].n = v; });
})();
