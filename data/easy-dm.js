/* Easy notes (n) and step-by-step examples (x) for Data Mining topics */
window.EASY = Object.assign(window.EASY || {}, {

'dm-what': { n: `## What is data mining?
**Digging through very large amounts of data to find useful, hidden patterns.** It is like mining for gold: the data is the soil and the patterns are the gold.

Other definitions from your slides:
- Finding **hidden information** in a database; **fitting data to a model**.
- Finding **unexpected relationships** and summarizing data in new, useful ways.
- "The **discovery of models** for data." Models can explain data, predict the future, summarize data, or pick out its main features.

## Why do we need it?
- We create **huge data every second**: phones, photos, social media, shopping, sensors, clicks.
- **Storage is cheap**, so we keep it all, but raw data is useless until we analyse it.
- "**The data is the computer**": lots of data can beat clever algorithms (Google fixed spelling mistakes just by studying search data).
- **Data is power:** Google's search logs, Facebook's friend lists and Amazon's sales are their biggest assets.
- Data is **complex**: tables, time series, images and networks, all connected.

## Examples of big data
- **Transactions:** Walmart 20 million a day.
- **Documents:** 50 billion web pages, 300 million tweets a day.
- **Networks:** web links, Facebook friends.
- **Genomes:** 3 billion DNA letters per person.
- **Climate:** thousands of weather stations.
- **Behaviour:** GPS, check-ins, browsing history.`,
  x: `A supermarket:
1. It stores every bill: millions of rows (big data).
2. Data mining looks through them.
3. It finds a hidden pattern: "people who buy nappies on Friday evening often also buy juice".
4. The shop places juice near the nappies, and sales go up.`},

'dm-data': { n: `- **Data** = a collection of **objects** and their **attributes**.
- **Object** (also: record, row, instance, sample) = one thing, e.g. one customer.
- **Attribute** (also: variable, field, feature, column) = one detail about it, e.g. age.

## Dataset properties
- **Size:** number of objects (rows).
- **Dimensionality:** number of attributes (columns).
- **Sparsity:** how many cells actually have values.

## Types of attributes
- **Categorical (names or groups)**
  - **Nominal:** no order (eye colour, city).
  - **Ordinal:** has an order (small / medium / large; good / fair / bad).
- **Numeric (numbers)**
  - **Discrete:** counts (number of children).
  - **Continuous:** measurements (temperature, height).
- **Binary:** only two values (yes/no).`,
  x: `Customer table:
1. Row "Ali, Lahore, Gold, 3 orders, 72.5 kg, Yes" is one **object**.
2. City = Lahore → **nominal**.
3. Membership = Gold (Silver < Gold < Platinum) → **ordinal**.
4. Orders = 3 → **discrete**. Weight = 72.5 → **continuous**. Newsletter = Yes → **binary**.`},

'dm-types': { n: `Data comes in different shapes:
- **Record data (numeric):** a normal table; each row is a point in space (an n × d matrix: n rows, d columns).
- **Categorical data:** rows of category values.
- **Document data:** each document becomes a list of **word counts** (bag of words; word order doesn't matter).
- **Set data:** e.g. a shopping basket {milk, bread, eggs}.
- **Ordered data:**
  - **Genomic sequence:** a long string of DNA letters (GGTTCC…).
  - **Time series:** values in time order (stock prices each day).
- **Graph data:** nodes and links (web pages linking to each other).`,
  x: `One online shop has all types:
1. Customer table → **record** data.
2. Product reviews → **document** data (count the words "good", "bad").
3. Each order {shoes, socks} → **set** data.
4. Daily sales numbers → **time series**.
5. "Customers who viewed this also viewed" links → **graph** data.`},

'dm-vsdb': { n: `| Aspect | Normal database query | Data mining |
| Question | Exact, clear (SQL) | Fuzzy, no exact query language |
| Data | Daily operational data | Not operational data |
| Answer | Exact; part of the database | Fuzzy pattern; not just a copy of the data |

## NOT data mining
- Looking up a phone number in a directory.
- Searching Google for "Amazon".

## Examples
| Database query | Data mining |
| Who bought milk? | What do people usually buy **with** milk? (association) |
| Applicants named Smith? | Which applicants are **risky**? (classification) |
| Who spent over $10,000? | Which customers **behave alike**? (clustering) |

A data mining algorithm **fits data to a model**. It uses a **preference** (how to choose the best model) and a **search** (how to look through the data).`,
  x: `1. Database question: "List students who failed Math." You get an exact list.
2. Data mining question: "What kind of students usually fail Math?" You get a pattern, e.g. "students who miss more than 30% of classes".`},

'dm-tasks': { n: `Data mining tasks are of two kinds:

## Predictive (guess unknown or future values)
- **Classification:** which group does this belong to?
- **Regression:** what number will it be?
- **Time-series analysis / prediction:** what comes next?
- **Deviation detection:** what is unusual?

## Descriptive (find patterns people can understand)
- **Clustering:** which items are similar?
- **Summarization:** short descriptions of groups.
- **Association rules (link analysis):** what goes together?
- **Sequence discovery:** what happens in order?

**Classification = supervised** (learns from labelled examples). **Clustering = unsupervised** (finds groups on its own).`,
  x: `A bank:
1. Will this applicant repay the loan? Yes/No → **classification** (predictive).
2. How much will they spend next month? → **regression** (predictive).
3. Group customers into savers and spenders → **clustering** (descriptive).
4. People who open a savings account often take a credit card next → **sequence/association** (descriptive).`},

'dm-classif': { n: `**Classification** = putting new items into **known groups (classes)**.

## How it works
1. Take a **training set**: past records where the class is already known.
2. **Learn a model** that predicts the class from the other attributes.
3. Use a separate **test set** to check accuracy.
4. Use the model on **new** records.

## Applications
- **Direct marketing:** predict who will buy a new phone, and send ads only to them (saves mailing cost).
- **Fraud detection:** label past card transactions "fraud" or "fair", learn the pattern, then flag new suspicious ones.
- **Customer churn:** predict which customers will leave for a competitor (from call patterns, payments), and keep them.`,
  x: `Catching tax cheats (your slide example):
1. Past records: Refund (Yes/No), Marital Status, Income, and Cheat (Yes/No = the class).
2. The model learns, e.g., "No refund + single + income 85K → likely cheat".
3. A new person: No refund, Single, 90K → model says **Cheat = Yes**.
4. A test set shows the model is right 85% of the time.`},

'dm-cluster': { n: `**Clustering** = grouping similar items together **without knowing the groups beforehand**.
- Items in the **same cluster** are **similar** (close together).
- Items in **different clusters** are **different** (far apart).
- Similarity is often measured with **Euclidean distance** (straight-line distance).
- Goal: **small distance inside a cluster, big distance between clusters.**

## Applications
- **Market segmentation:** group customers by lifestyle and location, then target each group with different ads.
- **Document clustering:** group news articles with similar words (e.g. 3,204 LA Times articles).
- **Stock data:** group stocks that go up or down on the same days.`,
  x: `A clothing shop has 1,000 customers:
1. Data: age and monthly spending.
2. Clustering finds 3 groups: young low spenders, middle-aged high spenders, and elderly occasional buyers.
3. The shop sends discount offers to group 1 and premium-collection ads to group 2.`},

'dm-assoc': { n: `**Association rules** find items that **happen together**, written as **"If X, then Y"**.
- **X** = antecedent (the "if" part), **Y** = consequent (the "then" part).
- Example: {Milk, Eggs} → {Cheese}: people who buy milk and eggs often buy cheese.

## Applications
1. **Sales promotion:** rule {Bagels} → {Potato chips}
   - Chips as the consequent → how to boost chip sales.
   - Bagels as the antecedent → what gets hurt if we stop selling bagels.
   - Both → sell bagels to boost chips.
2. **Shelf management:** put items bought together near each other (using barcode data).
3. **Inventory:** a repair company learns which parts are needed together, so vans carry the right parts.`,
  x: `1. A shop checks 1,000 bills.
2. 200 bills have bread; 150 of those also have butter.
3. Rule: {Bread} → {Butter}. 75% of bread buyers also buy butter.
4. The shop puts butter next to bread and offers a combo deal.`},

'dm-regtask': { n: `- **Regression** = predicting a **number** (a continuous value) from other variables, using a straight-line (linear) or curved (non-linear) model. Studied in statistics and neural networks.
- **Examples:**
  - sales of a new product from the advertising budget
  - wind speed from temperature, humidity and air pressure
  - stock market index over time

## Other tasks
- **Deviation detection:** find unusual values (fraud, faults).
- **Sequential patterns:** things that happen in order.
- **Time-series analysis:** predict future values, find similar patterns, classify behaviour (e.g. stock market).`,
  x: `1. A company spent Rs 10k, 20k and 30k on ads and sold 100, 200 and 300 units.
2. Regression finds the line: sales = 10 × (ad money in thousands).
3. Prediction: for Rs 40k of ads, expect about 400 units.`},

'dm-kdd': { n: `- **KDD (Knowledge Discovery in Databases)** = the **whole process** of turning raw data into useful knowledge.
- **Data mining** = just **one step** of KDD (running the algorithm).

## KDD steps
1. **Selection:** pick the data you need from different sources.
2. **Preprocessing:** clean the data (fix missing, wrong or noisy values).
3. **Transformation:** convert it into the right format.
4. **Data mining:** run the algorithm to find patterns.
5. **Interpretation / evaluation:** explain the results clearly to the user.

## Data analysis pipeline
**Preprocessing → Data mining → Post-processing.**
- Preprocessing (cleaning, sampling, reducing features) is dirty work but **the most important step**.
- Post-processing = checking importance and making charts so people can act on the results.`,
  x: `Website log example (from your slides):
1. **Select:** take last month's visitor log.
2. **Preprocess:** remove error lines and personal URLs.
3. **Transform:** group clicks into sessions per visitor.
4. **Mine:** count common page sequences.
5. **Interpret:** most visitors go Home → Products → Cart, so speed up those pages (cache) and personalize them.`},

'dm-dev': { n: `## Where data mining came from
- **Databases:** SQL, data warehouses, association rule algorithms.
- **Information retrieval:** search engines, similarity measures, text data.
- **Statistics:** regression, Bayes theorem, k-means, time series.
- **Machine learning:** neural networks, decision trees.
- **Algorithms:** design, analysis, data structures.

## Problems (issues) in KDD
- **Overfitting:** the model memorises the training data and fails on new data.
- **Interpretation and visualization** of results.
- **Large datasets** and **high dimensionality** (too many columns).
- **Multimedia data.**
- **Missing, irrelevant, noisy and changing data.**
- **Applying** results in real life.`,
  x: `1. A student model learns 100 training records perfectly (100% accuracy).
2. On new students, it is only 50% correct.
3. That is **overfitting**: it memorised instead of learning the general pattern.`},

'dm-slr': { n: `**Simple linear regression** draws the **best straight line** through data points, so we can predict one value (**y**) from another (**x**).

- **y** = dependent variable (what we predict, e.g. marks).
- **x** = independent variable (what we know, e.g. study hours).

## Formula
**y = b₀ + b₁x** (same as **y = mx + c**)
- **Slope (m or b₁):** how much y changes when x increases by 1.
- **Intercept (c or b₀):** the value of y when x = 0.

## Finding the line
Use **Ordinary Least Squares (OLS)**: choose the line that makes the **squared errors** as small as possible. Error (**residual**) = actual value − predicted value.

- m > 0 → positive relationship (both go up).
- m < 0 → negative relationship (one goes up, the other goes down).`,
  x: `Data: 2 hours → 50 marks, 4 hours → 70, 6 hours → 90.
1. Slope m = change in y ÷ change in x = (70 − 50) ÷ (4 − 2) = 20 ÷ 2 = **10**.
2. Intercept: 50 = 10 × 2 + c → c = **30**.
3. Line: **y = 30 + 10x**.
4. Predict for 5 hours: y = 30 + 10 × 5 = **80 marks**.
5. To get 90 marks: 90 = 30 + 10x → x = **6 hours**.`},

'dm-lrlife': { n: `Linear regression is used whenever **one thing changes with another**:
- **Social media:** which posting time, hashtags and content type get more likes.
- **House prices:** bigger houses cost more (about $100 per sq ft).
- **Exam marks:** more study hours → higher marks.
- **Sales forecasting:** predict December sales from past years (e.g. +10%).
- **Sports:** more practice shots → better accuracy (100 extra shots → +2%).
- Also: medicine dose vs blood pressure, fertilizer vs crop yield.`,
  x: `House prices:
1. Average price = $100 per square foot.
2. House size = 1,500 sq ft.
3. Predicted price = 100 × 1,500 = **$150,000**.
4. The seller uses this to set a fair price.`},

'dm-mlr': { n: `**Multiple linear regression** = linear regression with **two or more inputs**.

## Formula
**y = b₀ + b₁x₁ + b₂x₂ + … + bₙxₙ**
- b₀ = intercept; b₁, b₂, … = **coefficients (weights)**.
- Each coefficient = how much y changes when **that** input goes up by 1, **keeping the others the same** ("ceteris paribus").

## Matrix form
**y = Xb** (X = input table with a first column of 1s, b = coefficients).

## How good is the line?
**Cost function = Mean Squared Error (MSE):** the average of (actual − predicted)². Smaller is better.

## Finding the coefficients
- **Normal equation:** b = (XᵀX)⁻¹Xᵀy. Gives the exact answer, but is slow for big data.
- **Gradient descent:** take small steps to reduce the error. Fast for big data.`,
  x: `Salary = 20,000 + 5,000 × Experience + 3,000 × Education
1. Someone with 2 years of experience and education level 3:
2. Salary = 20,000 + 5,000 × 2 + 3,000 × 3
3. = 20,000 + 10,000 + 9,000 = **39,000**.
4. One more year of experience (education the same) adds **5,000**.`},

'dm-mlrassume': { n: `## Five assumptions (must be true for good results)
1. **Linearity:** the relationship is a straight line.
2. **Independence:** observations don't affect each other.
3. **Homoscedasticity:** errors have the same spread everywhere.
4. **No multicollinearity:** inputs aren't copies of each other.
5. **Normal errors:** errors follow a bell curve.

## Multicollinearity
Two inputs are very similar (house size and number of rooms), so the coefficients become **unstable** and **confusing**. **Fix:** remove one of them, or use Ridge or Lasso regression.

## Pros and cons
- ✔ Simple, easy to explain, fast.
- ✘ Can't model curves; sensitive to **outliers**; assumptions must hold.`,
  x: `1. You predict house price using Size (sq ft) AND Rooms.
2. Big houses always have more rooms, so the two inputs move together.
3. The model can't tell which one matters, and the coefficients jump around → **multicollinearity**.
4. You remove Rooms and keep Size, and the model becomes stable.`},

'dm-mlrex': { n: `**Goal:** predict salary (y) from experience (x₁) and certifications (x₂) using the **normal equation** b = (XᵀX)⁻¹Xᵀy.

## The idea in plain steps
1. Put the inputs in a table **X**, adding a first column of **1s** (for the intercept).
2. Put the salaries in a column **y**.
3. Multiply **Xᵀ by X**, then **Xᵀ by y**.
4. Find the **inverse** of XᵀX.
5. Multiply the inverse by Xᵀy. This gives the coefficients b₀, b₁, b₂.

## Answer
**y = 25 + 8.33x₁ + 6.67x₂**
- Base salary = 25.
- Each year of experience adds about 8.33.
- Each certification adds about 6.67.

Note: your PDF has small calculation slips; the corrected working is in the detailed notes below.`,
  x: `Predict the salary for 5 years of experience and 2 certifications:
1. Start with the base: **25**.
2. Experience: 8.33 × 5 = **41.67**.
3. Certifications: 6.67 × 2 = **13.33**.
4. Add them: 25 + 41.67 + 13.33 = **80**.`},

'dm-learn': { n: `- **Learning** = a system improves with experience and adapts to change.
- **Learning from examples (inductive learning):** show many examples, e.g. 10 pictures of tigers.
- **Learning by being told:** give the rule directly ("a tiger has stripes and a long tail").
- AI mostly uses **inductive learning**.

## Inductive learning
Find a **rule** from known examples that also works on **new** cases. E.g. predict student performance from entry marks, or classify images.

## Classification
Decide which **category** something belongs to from its features:
**f(feature1, feature2, …) → category** (big teeth + stripy → tiger).

## Learning as search
Search through possible rules and pick the **simplest** one that explains all the examples.`,
  x: `Tiger example from your slide:
1. Animal 1: big teeth, stripy, long tail → Tiger ✔
2. Animal 2: no big teeth, stripy, long tail → not a tiger.
3. Animal 3: big teeth, stripy, no long tail → Tiger ✔
4. Animal 4: big teeth, not stripy, long tail → not a tiger.
5. The simplest rule that fits all four: **big teeth AND stripy → tiger**.`},

'dm-dtree': { n: `A **decision tree** makes decisions by asking questions, like a flow chart.
- It is **supervised learning**, used for classification **and** regression.
- Two steps: **learning** (build the tree from training data) and **prediction** (use it on new data).
- To classify: start at the **root**, answer its question, follow that **branch**, and keep going until you reach a **leaf** (the answer).

## Types
- **Categorical tree:** the answer is a category (Yes/No).
- **Continuous tree:** the answer is a number.

## Terms
- **Root node:** the top; it contains all the data.
- **Splitting:** dividing a node into sub-nodes.
- **Decision node:** a node that splits further.
- **Leaf / terminal node:** an end node; gives the answer.
- **Pruning:** cutting off unnecessary branches.
- **Branch / sub-tree:** a part of the tree.
- **Parent / child node:** a node and the nodes under it.`,
  x: `Should we play tennis today? (from your slides)
1. Root question: **Outlook?** It is Sunny.
2. Next question on the Sunny branch: **Humidity?** It is High.
3. Leaf: **No**, don't play.
4. Another day: Outlook = Overcast → leaf **Yes**, play straight away.`},

'dm-chaid': { n: `- **CHAID** = Chi-squared Automatic Interaction Detector, one of the **oldest** decision-tree methods.
- It checks whether a split makes a **real (statistically significant) difference** between the sub-nodes and the parent.
- It works with a **categorical** target (Success/Failure) and can split into **2 or more** branches.
- **Higher chi-square = better, more meaningful split.**

## Formula
**χ² = Σ (O − E)² / E**
- **O** = observed count (what really happened).
- **E** = expected count (what we'd expect by chance).`,
  x: `1. Expected: 50 of 100 students pass (E = 50).
2. Among students who attended extra classes, 70 passed (O = 70).
3. χ² part = (70 − 50)² ÷ 50 = 400 ÷ 50 = **8**.
4. A big value means "attended extra classes" is a useful question to split on.`},

'dm-id3': { n: `**ID3 (Iterative Dichotomiser 3)** builds a decision tree by always asking the **best question first**. It is **greedy**: it picks the best choice at each step.

## Entropy = how mixed up the data is
**H(S) = − Σ p × log₂(p)**
- **0** = pure (everyone has the same answer).
- **1** (for two classes) = completely mixed (50/50).

## Information gain = how much a question reduces the mess
**IG = Entropy before − weighted Entropy after splitting**
Pick the attribute with the **highest gain** (lowest entropy).

## Steps
1. Calculate the entropy of the whole dataset.
2. For each attribute, calculate the entropy after the split and its information gain.
3. Choose the attribute with the **maximum gain** as the node.
4. Split the data and **repeat** for each branch, using only unused attributes.`,
  x: `Entropy in 3 cases:
1. 10 students, all passed → p = 1 → H = **0** (pure).
2. 5 passed, 5 failed → H = −(0.5 log₂0.5 + 0.5 log₂0.5) = **1** (most mixed).
3. 9 yes, 5 no → H = **0.940** (quite mixed).
A question that turns a mixed group into pure groups has **high information gain**.`},

'dm-id3ex': { n: `**Data:** 14 days of weather, with "Play tennis?" answered 9 Yes and 5 No.

## Step 1 – Starting entropy
H(S) = −(9/14) log₂(9/14) − (5/14) log₂(5/14) = **0.940**

## Step 2 – Gain of each attribute
- **Outlook = 0.246** ← highest
- Humidity = 0.151
- Wind = 0.048
- Temperature = 0.029

So **Outlook** is the root (first question).

## Step 3 – Each branch
- **Overcast:** all 4 days are Yes → leaf **Yes**.
- **Sunny** (2 Yes, 3 No): the best next question is **Humidity** (High → No, Normal → Yes).
- **Rain** (3 Yes, 2 No): the best next question is **Wind** (Weak → Yes, Strong → No).

## Final tree
Outlook → Sunny: ask Humidity | Overcast: Yes | Rain: ask Wind.`,
  x: `How Wind's gain = 0.048 is calculated:
1. Weak wind: 8 days (6 Yes, 2 No) → entropy = **0.811**.
2. Strong wind: 6 days (3 Yes, 3 No) → entropy = **1.0**.
3. Weighted entropy = (8/14 × 0.811) + (6/14 × 1.0) = 0.463 + 0.429 = **0.892**.
4. Gain = 0.940 − 0.892 = **0.048**. It is small, so Wind is not the first question.`},

'dm-id3char': { n: `Characteristics (weak points) of ID3:
1. **Greedy:** it picks the best choice at each step, so it may not find the **best overall tree** (it can get stuck in a local optimum).
2. **Overfitting:** it can memorise the training data. **Smaller trees are better.**
3. It usually makes small trees, but **not always the smallest**.
4. **Struggles with continuous numbers** (e.g. temperature 23.4), because there are too many places to split.`,
  x: `1. Training data has Temperature values 21.1, 21.3, 22.8, …
2. ID3 must test a split after every value, so there are too many choices and it gets slow.
3. Fix: group the numbers into Cool / Mild / Hot first, then use ID3.`},

'dm-nnintro': { n: `An **artificial neural network (ANN)** is a computer model inspired by the **human brain**.

## Networks
A network = **nodes** (small computing units) + **connections** between them. Connections can be one-way or two-way.

## Brain vs computer
- Brain: 10¹⁴ connections, slow (100 Hz), works **in parallel**, keeps working if parts fail, learns fast, intelligent.
- Computer: 10⁸ transistors, very fast (10⁹ Hz), works **step by step**, breaks if a part fails, can't learn like a child.

## Why study ANNs?
- Very powerful and fast (parallel).
- They **learn from examples**, so you don't program every rule.
- **Fault tolerant** (still work if some parts fail).

## Two goals
- **Brain modelling:** understand how the brain works, and help patients.
- **Building smart systems:** make machines do useful real-world jobs.`,
  x: `Recognising handwritten digits:
1. Writing rules for every way of writing "7" is impossible.
2. Instead, show the ANN 10,000 labelled examples of digits.
3. It **learns** the patterns by itself.
4. Now it can read a new "7" it has never seen.`},

'dm-neuron': { n: `## The real brain cell (neuron)
- The brain has about **10¹⁰ to 10¹⁴ neurons**.
- Each one connects to **thousands** of others.
- Signals are **electrochemical** and take **milliseconds** (slow compared with a computer).
- Very low energy: about **10⁻⁶ watts** per neuron.

## Parts of a neuron
- **Dendrites:** receive signals (inputs).
- **Cell body (with nucleus):** processes the signals.
- **Axon:** sends the output signal.
- **Synapse:** the junction between two neurons. Its strength becomes the **weight** in an artificial network.`,
  x: `You touch something hot:
1. Skin neurons send a signal through their **axons**.
2. The next neuron's **dendrites** receive it through **synapses**.
3. The **cell body** decides it is dangerous and fires a signal on.
4. The signal reaches your muscle and you pull your hand back.`},

'dm-annbasics': { n: `An ANN is described by three things:
1. **Architecture:** how neurons are connected.
2. **Training (learning) algorithm:** how the weights are set.
3. **Activation function:** how a neuron decides its output.

## How one artificial neuron works
1. Multiply each input by its **weight**.
2. Add them up, plus a **bias** → net input y_in = b + Σ xᵢwᵢ.
3. Pass the result through an **activation function** → output.

## Architectures
- **Feed-forward:** signals go one way, input → output. Can be single-layer or multi-layer.
- **Recurrent:** signals can loop back.

## Training
- **Supervised:** each example comes with the correct answer (target).
- **Unsupervised:** no answers; the network groups similar inputs itself.

## Activation function: binary sigmoid
f(x) = 1 / (1 + e^(−σx)). It gives an S-shaped output between 0 and 1.`,
  x: `One neuron, inputs x₁ = 1, x₂ = 0, weights w₁ = 0.5, w₂ = 0.8, bias b = −0.2:
1. Weighted sum = 1 × 0.5 + 0 × 0.8 = 0.5.
2. Add the bias: y_in = 0.5 − 0.2 = **0.3**.
3. Sigmoid: f(0.3) = 1 / (1 + e^−0.3) ≈ **0.574**.
4. The output is 0.574, closer to "yes" than "no".`},

'dm-annapps': { n: `What neural networks are used for:
- **Pattern completion:** fix a broken or noisy picture back to the original (like content-addressable memory).
- **Classification:** e.g. tell male from female faces.
- **Optimization:** good-enough answers to hard problems (Travelling Salesman Problem).
- **Data compression:** store data smaller with little loss.
- **Approximation:** learn an input → output rule from examples.
- **Association:** similar input → similar output.
- **Prediction:** the next value in a series (e.g. Karachi Stock Exchange price).
- **Control:** control a robot arm or a vehicle.`,
  x: `A stock-price ANN:
1. Feed it the last 30 days of Karachi Stock Exchange closing prices.
2. It learns the pattern.
3. It predicts tomorrow's price → **prediction** task.`},

'dm-perceptron': { n: `A **perceptron** is the **simplest neural network**: inputs with weights → one output.
- Output **+1** = belongs to the class, **−1** = doesn't, **0** = not sure.
- Rule: if y_in > θ → +1; if y_in < −θ → −1; otherwise 0.

## How it learns (perceptron algorithm)
1. Start with weights = 0, bias = 0, and choose the learning rate α and threshold θ.
2. For each training example, calculate the output.
3. If the output is **wrong**, update:
   - **wᵢ(new) = wᵢ(old) + α × xᵢ × t**
   - **b(new) = b(old) + α × t**
4. If it is **right**, change nothing.
5. Stop when a full round makes no changes.

## Limitation
A single perceptron only works when the classes can be separated by a **straight line** (linearly separable).`,
  x: `Learning AND (α = 1, θ = 0.2, start w₁ = w₂ = b = 0):
1. Input (1,1), target +1: y_in = 0 → output 0 (wrong). Update: w₁ = 1, w₂ = 1, b = 1.
2. Input (1,0), target −1: y_in = 1 + 1 = 2 → output +1 (wrong). Update: w₁ = 0, w₂ = 1, b = 0.
3. Input (0,1), target −1: y_in = 1 → output +1 (wrong). Update: w₁ = 0, w₂ = 0, b = −1.
4. Input (0,0), target −1: y_in = −1 → output −1 ✔
5. After more rounds: **w₁ = 2, w₂ = 3, b = −4** gives the correct answer for all four inputs.`},

'dm-mlp': { n: `## History
- 1943: McCulloch–Pitts first neuron model.
- 1962: Rosenblatt's perceptron (learns its own weights).
- 1969: Minsky & Papert showed single perceptrons have limits.
- 1982: Hopfield networks.
- 1986: **Backpropagation**, a way to train multi-layer networks.

## Multilayer Perceptron (MLP)
- A feed-forward network with **one or more hidden layers**.
- Layers: **input → hidden → output**. Signals move forward layer by layer.
- Every node connects to every node in the next layer, and each connection has a weight.
- Hidden layers let it solve problems a single perceptron can't (curved boundaries).

## Hidden layer
It is called "hidden" because we can't see or set its correct output directly.
Commercial ANNs use 3–4 layers with 10–1000 neurons each.

## Applications
Hospital length-of-stay, stock prices, image recognition, self-driving control.`,
  x: `XOR problem: output 1 when exactly one input is 1.
1. (0,1) and (1,0) → 1; (0,0) and (1,1) → 0.
2. No single straight line can separate these points, so one perceptron fails.
3. An MLP with one hidden layer learns two lines and combines them, and solves it.`},

'dm-bp': { n: `**Backpropagation (BP)** is how an MLP **learns**.

## The idea
1. Give the network an input.
2. Get its output.
3. Compare with the correct answer → find the **error**.
4. Adjust the weights to reduce the error.
5. Repeat with many examples.

## Two phases
- **Forward pass:** the input travels **forward** through the layers to produce an output.
- **Backward pass:** the error travels **backward** from output to input, and each weight is corrected a little.

## Used for
Time-series prediction, credit-risk checks, pattern and speech recognition, image processing, control. BP is the standard algorithm all others are compared with.

## Pros and cons
- ✔ Can learn almost any function (universal approximator); efficient; robust.
- ✘ Can be **very slow** to learn; can get stuck in a **local minimum**.`,
  x: `Think of throwing a ball at a target:
1. **Forward:** you throw and it lands 2 m to the left (output).
2. **Error:** you are 2 m off.
3. **Backward:** you adjust your arm angle a little to the right (weight update).
4. **Repeat:** after many throws you hit the target. That is how backpropagation learns.`},

'dm-bpex': { n: `**Network:** 2 inputs → 2 hidden neurons → 2 outputs (plus biases). Learning rate = 0.5.
**Goal:** inputs 0.05 and 0.10 should give outputs **0.01** and **0.99**.

## Step 1 – Forward pass
- Hidden h₁: net = 0.15 × 0.05 + 0.20 × 0.10 + 0.35 = 0.3775 → sigmoid → **0.593**
- Hidden h₂ → **0.597**
- Outputs: o₁ = **0.751**, o₂ = **0.773** (far from 0.01 and 0.99)

## Step 2 – Error
E = ½(target − output)² for each output, then add them: **0.298**

## Step 3 – Backward pass
Use the **chain rule** to see how much each weight caused the error, then:
**new weight = old weight − 0.5 × (error slope)**
- w₅: 0.40 → **0.359**, and w₆, w₇, w₈ change similarly.
- w₁: 0.15 → **0.1498**, and w₂, w₃, w₄ change similarly.

## Step 4 – Repeat
- After 1 round: error 0.298 → **0.291**
- After 10,000 rounds: error → **0.000035** (outputs ≈ 0.016 and 0.984, very close to the targets)`,
  x: `Updating weight w₅ in 4 small steps:
1. How wrong is o₁? 0.751 − 0.01 = **0.741**.
2. Slope of the sigmoid at o₁: 0.751 × (1 − 0.751) = **0.187**.
3. Input coming into w₅ from h₁: **0.593**.
4. Multiply: 0.741 × 0.187 × 0.593 = **0.082**, then new w₅ = 0.40 − 0.5 × 0.082 = **0.359**.`}
});
