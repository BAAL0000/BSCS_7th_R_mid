/* Neural Networks: easy notes with proper maths, drawn diagrams, every slide algorithm and slide-diagram explanations.
   Math: display blocks between lines of $$ , inline math inside \( \).  Diagrams: ::fig name | caption */
window.EASY = Object.assign(window.EASY || {}, {

/* ------------------------------------------------------------------ */
'dm-nnintro': {
key: [
 'ANN = a computer model made of simple connected units (nodes), inspired by the brain',
 'Brain: \\(10^{14}\\) synapses, 100 Hz, parallel, fault tolerant. Computer: \\(10^{8}\\) transistors, \\(10^{9}\\) Hz, serial',
 'ANNs learn from examples, work in parallel and tolerate faults',
 'Two goals: brain modelling and building artificial systems'
],
n: String.raw`## What is a neural network?
An **artificial neural network (ANN)** is a computer model built from many small, simple units called **nodes** (artificial neurons) that are **connected** to each other. It is inspired by how the human brain works.

## Divide and conquer (slide 4–5)
A complex system is easier to understand if we break it into **simple parts**, and simple parts can be joined to build a complex system. A network does exactly this:
- **Nodes** = small computing units. Each node takes inputs, does a small calculation and gives an output.
- **Connections** = paths for information between nodes.
  - **Unidirectional:** information flows one way only.
  - **Bidirectional:** information can flow both ways.

## Brain vs computer (slides 6–7)
| Feature | Brain | Computer |
| Processing elements | \(10^{14}\) synapses | \(10^{8}\) transistors |
| Speed | 100 Hz (slow) | \(10^{9}\) Hz (very fast) |
| How it works | **parallel**, many things at once | mostly **serial**, one step at a time |
| If a part breaks | still works (**fault tolerant**) | stops working |
| Learning | learns fast | can't learn like a baby |
| Intelligence | intelligent and conscious | no real intelligence |
| Evolution | millions of years | a few decades |

**How to read this table:** the computer wins on raw **speed**, but the brain wins on **number of connections**, **parallel work**, **fault tolerance** and **learning**. ANNs try to copy the brain's strengths.

## Why are ANNs worth studying? (slide 8)
- Very **powerful** computing devices.
- **Massive parallelism** makes them efficient.
- They **learn and generalize** from examples, so you don't need to program every rule.
- **Fault tolerant.**
- In principle they can do anything a logic system can do, and more.

## What are they used for? Two goals (slides 9–10)
1. **Brain modelling (biology goal):** understand how real brains handle perception, learning, memory and thinking, and help patients with brain damage.
2. **Artificial system construction (engineering goal):** build smart machines for real-world jobs, take over boring tasks, even beat human performance.

## Slide 15 picture explained: "Information processing in a neural network"
The picture shows a brain with a few neurons and their **synaptic junctions** (the yellow dots). Information flows from neuron to neuron through these junctions. Each junction can be strong or weak; in an ANN this strength becomes a **weight** (a number).`,
x: String.raw`## Example 1: why "learning from examples" is powerful
1. Task: recognise the handwritten digit 7.
2. Writing rules by hand ("a line at the top, then a slanted line…") fails, because everyone writes differently.
3. Instead, show the network 10,000 labelled pictures of digits.
4. The network adjusts its weights by itself and learns the pattern.
5. Now it can read a 7 it has **never seen** before. This is called **generalization**.

## Example 2: fault tolerance
1. A network has 1,000 hidden neurons.
2. 10 of them are damaged (weights set to 0).
3. The other 990 still carry most of the information, so accuracy drops only a little.
4. In a normal program, deleting 10 lines of code usually crashes it completely.

## Example 3: parallel vs serial
1. Adding 1,000 numbers one by one takes a serial computer 1,000 steps.
2. In a network, 1,000 neurons each handle one number **at the same time**, in one step.
3. This is why the slow brain (100 Hz) can still recognise a face in a fraction of a second.`},

/* ------------------------------------------------------------------ */
'dm-neuron': {
key: [
 '\\(10^{10}\\) to \\(10^{14}\\) neurons; each connected to thousands of others',
 'Signals are electrochemical and take milliseconds; about \\(10^{-6}\\) W per neuron',
 'Dendrites = inputs, cell body = processing, axon = output, synapse = connection (→ weight)'
],
n: String.raw`## Some statistics (slide 12)
- An adult brain has about \(10^{10}\) to \(10^{14}\) neurons (nerve cells).
- Each neuron connects to **hundreds of thousands** of other neurons.
- Messages pass as **electrochemical signals** and take **milliseconds**: slow compared with a computer chip.
- Each neuron uses very little energy: about \(10^{-6}\) watts.

## Parts of a neuron (slide 14 diagram explained)
| Part | Job | In an ANN it becomes… |
| **Dendrites** | receive signals from other neurons | the **inputs** \(x_1, x_2, \dots\) |
| **Cell body + nucleus** | adds up the signals and decides whether to fire | the **sum** \(\Sigma\) and **activation function** \(f\) |
| **Axon** | carries the output signal away | the **output** \(y\) |
| **Synapse** | junction between one neuron's axon and the next one's dendrite; can be strong or weak | the **weight** \(w\) |

**How to read the slide 14 diagram:** signals come in from the left through **axons of other neurons**, cross a **synapse**, enter the **dendrites**, are collected in the **cell body**, and leave through this neuron's **axon** to the next synapse. A neuron is a 3-D object, not flat like the drawing.

## From real neuron to artificial neuron
::fig neuron-model | An artificial neuron copies the real one: inputs → weights → sum → activation → output
The artificial neuron does the same job with maths:
$$ y_{in} = b + x_1 w_1 + x_2 w_2 + x_3 w_3 = b + \sum_{i=1}^{n} x_i\, w_i $$
$$ y = f(y_{in}) $$
- \(x_i\) = inputs (like dendrite signals)
- \(w_i\) = weights (like synapse strengths)
- \(b\) = bias (a constant push up or down)
- \(f\) = activation function (decides the output, like the cell deciding to fire)`,
x: String.raw`## Example 1: touching something hot
1. Skin sensors send a signal along their **axons**.
2. It crosses a **synapse** into the next neuron's **dendrites**.
3. The **cell body** adds up all incoming signals; the total is strong, so it **fires**.
4. The signal travels on until it reaches a muscle, and you pull your hand away.

## Example 2: the same idea as an artificial neuron
Signals: pain \(x_1 = 1\), heat \(x_2 = 1\), noise \(x_3 = 0\). Weights: \(w_1 = 0.6,\ w_2 = 0.5,\ w_3 = 0.1\). Bias \(b = -0.8\).
$$ y_{in} = -0.8 + (1)(0.6) + (1)(0.5) + (0)(0.1) = 0.3 $$
Using a step rule "fire if \(y_{in} > 0\)": \(0.3 > 0\), so the neuron **fires** and you pull back.

## Example 3: a weak synapse
Same inputs, but the pain synapse is weak (\(w_1 = 0.1\)):
$$ y_{in} = -0.8 + 0.1 + 0.5 + 0 = -0.2 $$
\(-0.2 < 0\), so it does **not fire**. Changing weights changes the behaviour. This is exactly what "learning" adjusts.`},

/* ------------------------------------------------------------------ */
'dm-annbasics': {
key: [
 'An ANN is described by: architecture, training (learning) algorithm, activation function',
 '\\(y_{in} = b + \\sum x_i w_i\\), then \\(y = f(y_{in})\\)',
 'Feed-forward (single-layer / multi-layer) vs recurrent (loops back)',
 'Supervised = with target outputs; unsupervised = no targets',
 'Binary sigmoid \\(f(x) = \\dfrac{1}{1 + e^{-\\sigma x}}\\), \\(f\'(x) = \\sigma f(x)[1 - f(x)]\\)'
],
n: String.raw`An ANN is an information-processing system that behaves somewhat like a biological network. It is described by **three things** (slide 17):
1. **Architecture:** the pattern of connections between neurons.
2. **Training / learning algorithm:** the method of setting the weights.
3. **Activation function:** the rule a neuron uses to produce its output.

## 1. The maths of one neuron (slide 16, "Mathematical model of a typical neuron")
**Slide 16 diagram explained:** several **input lines** (values +1 or −1) each pass through an adjustable **gain** (= weight). A **bias gain** is fed a constant +1. Everything is added in the **Σ** circle. The sum goes into a **hard-limiter** box that outputs +1 or −1. "Gains are adjustable" means **learning = changing the weights**.
$$ y_{in} = b + \sum_{i=1}^{n} x_i\, w_i \qquad\qquad y = f(y_{in}) $$

## 2. Architectures (slides 18–21)
::fig ff-vs-rec | Feed-forward: signals go one way. Recurrent: outputs can loop back.
- **Feed-forward networks:** signals move **forward only**, input → output.
  - **Single-layer net (slide 19):** inputs \(X_1 \dots X_n\) connect **directly** to outputs \(Y_1 \dots Y_m\). Weight \(w_{ij}\) joins input \(i\) to output \(j\). Every input is linked to every output, so there are \(n \times m\) weights.
  - **Multi-layer net (slide 20):** input units \(X\) → **hidden units** \(Z\) (weights \(w_{ij}\)) → output units \(Y\) (weights \(v_{jk}\)). The hidden layer sits in the middle.
- **Recurrent networks (slide 21):** signals can flow **both ways**; outputs feed back into the net (the arrows that loop back to the same node). This gives the network a kind of memory.

## 3. Training (slide 22)
- **Supervised:** each training input comes **with a target output**. The weights are adjusted until outputs match targets. The net builds an **associative memory**: it can recall a learned pattern when shown a similar one.
- **Unsupervised:** only inputs, **no targets**. The net adjusts weights so **similar inputs end up at the same output unit** (it groups them itself).

## 4. Activation functions (slide 23)
::fig activations | Three common activation functions
**Binary sigmoid (logistic sigmoid)**, the most common one:
$$ f(x) = \frac{1}{1 + e^{-\sigma x}} $$
Its derivative (needed for backpropagation) is very simple:
$$ f'(x) = \sigma \, f(x)\,\big[\,1 - f(x)\,\big] $$
::fig sigmoid | Sigmoid squeezes any number into the range 0 to 1 (here σ = 1)
**How to read the graph:** big negative inputs give outputs near **0**, an input of 0 gives exactly **0.5**, and big positive inputs give outputs near **1**. The curve is smooth, so we can take its slope (derivative). Backpropagation needs this.`,
x: String.raw`## Example 1: one neuron with a sigmoid
Inputs \(x_1 = 1,\ x_2 = 0\); weights \(w_1 = 0.5,\ w_2 = 0.8\); bias \(b = -0.2\); \(\sigma = 1\).
$$ y_{in} = -0.2 + (1)(0.5) + (0)(0.8) = 0.3 $$
$$ y = \frac{1}{1 + e^{-0.3}} = \frac{1}{1 + 0.7408} = \frac{1}{1.7408} = 0.574 $$

## Example 2: sigmoid values to remember
| \(x\) | \(-4\) | \(-2\) | \(0\) | \(2\) | \(4\) |
| \(f(x)\) | 0.018 | 0.119 | 0.500 | 0.881 | 0.982 |

## Example 3: the derivative trick
If \(f(x) = 0.75\) and \(\sigma = 1\):
$$ f'(x) = 0.75 \times (1 - 0.75) = 0.75 \times 0.25 = 0.1875 $$
No need to differentiate the formula again; just use the output value.

## Example 4: counting weights in a single-layer net
3 inputs and 2 outputs, fully connected:
$$ \text{number of weights} = n \times m = 3 \times 2 = 6 \quad (w_{11}, w_{12}, w_{21}, w_{22}, w_{31}, w_{32}) $$

## Example 5: supervised vs unsupervised
- **Supervised:** photos labelled "cat" or "dog" → learn to label new photos.
- **Unsupervised:** 1,000 unlabelled customer records → the net groups similar customers by itself.`},

/* ------------------------------------------------------------------ */
'dm-annapps': {
key: [
 'Pattern completion (content-addressable memory), classification, optimization (TSP)',
 'Data compression, approximation, association',
 'Prediction (e.g. Karachi Stock Exchange), control (robot arm)'
],
n: String.raw`The number of areas where neural networks are used grows every day (slides 24–27):

| Problem area | What the network does | Example |
| **Pattern completion** | learns pictures; given part of a picture or a noisy one, it **rebuilds the original** (acts as a *content-addressable memory*) | restore a scratched photo |
| **Classification** | puts inputs into classes | tell male and female faces apart at near-human level |
| **Optimization** | finds a "good-enough" answer to very hard problems | Travelling Salesman Problem (TSP) |
| **Data compression** | stores data in a smaller form, losing as little as possible | compress images |
| **Approximation** | learns an input → output rule from examples, so new inputs get roughly the right answer | learn \(y = x^2\) from sample points |
| **Association** | same or similar input → same or similar output | recognise a friend's voice on a bad phone line |
| **Prediction** | given past values of a time series, predict the next one | next closing price of the Karachi Stock Exchange |
| **Control** | learns which actions give the right results | move a robot arm or steer a truck |

**Content-addressable memory** means you find a memory by giving **part of its content**, not its address. Hearing the first two notes of a song and remembering the whole song is a good example.

**"Good-enough" (TSP):** the perfect answer may take years to compute, but a network finds a route very close to the best one quickly.`,
x: String.raw`## Example 1: pattern completion
1. Train the net on clear pictures of the letters A, B and C.
2. Show it a smudged "B" with half the pixels missing.
3. The activations settle down to the stored "B", and the full B is recovered.

## Example 2: prediction
1. Input: the last 5 closing prices of a stock: 100, 102, 101, 104, 106.
2. The trained net outputs a prediction for day 6, e.g. **107**.
3. Compare with the real price, adjust the weights, and repeat. The predictions get better.

## Example 3: approximation
1. Training pairs \((x, y)\): \((1, 1), (2, 4), (3, 9), (4, 16)\).
2. The net learns the curve (it is \(y = x^2\)).
3. Ask for \(x = 2.5\) → it answers about **6.25**, even though 2.5 was never in training.

## Example 4: control
1. A robot arm must reach a cup.
2. Input: arm angles and cup position. Output: motor commands.
3. Every miss gives an error; the weights change until the arm reaches the cup smoothly.`},

/* ------------------------------------------------------------------ */
'dm-perceptron': {
key: [
 'Net input \\(y_{in} = b + \\sum x_i w_i\\); output \\(+1\\) if \\(y_{in} > \\theta\\), \\(-1\\) if \\(y_{in} < -\\theta\\), else \\(0\\)',
 'Update only on error: \\(w_i^{new} = w_i^{old} + \\alpha\\, x_i\\, t\\), \\(b^{new} = b^{old} + \\alpha\\, t\\)',
 'AND example (\\(\\alpha = 1,\\ \\theta = 0.2\\)) converges to \\(w_1 = 2,\\ w_2 = 3,\\ b = -4\\) (epoch 10)',
 'Decision boundary: \\(b + x_1 w_1 + x_2 w_2 = 0\\) — works only for linearly separable data'
],
n: String.raw`## What is a perceptron? (slide 28)
The perceptron is one of the earliest neural networks and had a huge impact. The original had **three layers**: sensory units, associator units and a response unit (a rough model of the eye's retina). Its learning rule is **proven to converge**: if a correct set of weights exists, it will find them.

## Architecture (slide 29 diagram explained)
::fig perc-arch | A single perceptron: inputs and a bias feed one output unit Y
- Inputs \(X_1 \dots X_n\) connect to one output unit \(Y\) through weights \(w_1 \dots w_n\).
- An extra input fixed at **1** connects through the **bias** \(b\).
- **Goal:** decide whether an input pattern **belongs** to a class (+1) or **not** (−1). 0 means "not sure".

**Activation (the yellow box on slide 29):**
$$ f(y_{in}) = \begin{cases} +1 & \text{if } y_{in} > \theta \\ \;\;0 & \text{if } -\theta \le y_{in} \le \theta \\ -1 & \text{if } y_{in} < -\theta \end{cases} $$
\(\theta\) (theta) is a small **threshold** that creates an "undecided" band around 0.

## The perceptron learning algorithm (slide 30), every step
**Step 0.** Set all weights and the bias (usually to 0). Choose the learning rate \(\alpha\) with \(0 < \alpha \le 1\) and the threshold \(\theta\).

**Step 1.** While the stopping condition is false, do steps 2–6.

**Step 2.** For each training pair \(s : t\) (input \(s\), target \(t\)), do steps 3–5.

**Step 3.** Put the input into the input units:
$$ x_i = s_i $$
**Step 4.** Compute the response of the output unit:
$$ y_{in} = b + \sum_{i} x_i\, w_i \qquad y = f(y_{in}) $$
**Step 5.** If there is an **error** (\(y \neq t\)), update:
$$ w_i^{\,new} = w_i^{\,old} + \alpha\, x_i\, t \qquad\qquad b^{\,new} = b^{\,old} + \alpha\, t $$
If \(y = t\), change nothing.

**Step 6.** Stopping test: if **no weight changed** in this whole pass (epoch), **stop**; otherwise repeat.

**Why the update works:** if the target is \(t = +1\) but the output was too low, adding \(\alpha x_i t\) **raises** the weights of the active inputs, so next time \(y_{in}\) is bigger. If \(t = -1\), it **lowers** them.

## Slide 31–33 example: learning AND
Training data (binary inputs, bipolar targets): only \((1,1)\) gives \(+1\).
| \(x_1\) | \(x_2\) | target \(t\) |
| 1 | 1 | +1 |
| 1 | 0 | −1 |
| 0 | 1 | −1 |
| 0 | 0 | −1 |

Start \(w_1 = w_2 = b = 0\), \(\alpha = 1\), \(\theta = 0.2\).

**How to read the slide 32 table:** each row is one training input. Columns: the input \((x_1, x_2)\), the **net input** \(y_{in}\), the **output** \(y\), the **target** \(t\), and the **weights after** that row \((w_1, w_2, b)\). If \(y \ne t\) the weights change; if \(y = t\) they stay the same.

**Epoch 1**
| \(x_1\) | \(x_2\) | \(y_{in}\) | \(y\) | \(t\) | \(w_1\) | \(w_2\) | \(b\) |
| 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 2 | 1 | −1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | −1 | 0 | 0 | −1 |
| 0 | 0 | −1 | −1 | −1 | 0 | 0 | −1 |

**Epoch 2**
| \(x_1\) | \(x_2\) | \(y_{in}\) | \(y\) | \(t\) | \(w_1\) | \(w_2\) | \(b\) |
| 1 | 1 | −1 | −1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | −1 | 0 | 1 | −1 |
| 0 | 1 | 0 | 0 | −1 | 0 | 0 | −2 |
| 0 | 0 | −2 | −1 | −1 | 0 | 0 | −2 |

Training continues. In **epoch 10** no weight changes (slide 33), with \(w_1 = 2,\ w_2 = 3,\ b = -4\):
| \(x_1\) | \(x_2\) | \(y_{in} = -4 + 2x_1 + 3x_2\) | \(y\) | \(t\) | correct? |
| 1 | 1 | \(-4+2+3 = 1\) | +1 | +1 | ✔ |
| 1 | 0 | \(-4+2+0 = -2\) | −1 | −1 | ✔ |
| 0 | 1 | \(-4+0+3 = -1\) | −1 | −1 | ✔ |
| 0 | 0 | \(-4\) | −1 | −1 | ✔ |

## Decision boundaries (slide 34)
The output is +1 when \(y_{in} > \theta\) and −1 when \(y_{in} < -\theta\), where
$$ y_{in} = b + x_1 w_1 + x_2 w_2 $$
So the two lines that separate the classes are
$$ b + x_1 w_1 + x_2 w_2 = \theta \qquad\text{and}\qquad b + x_1 w_1 + x_2 w_2 = -\theta $$
For the AND result (\(b=-4,\ w_1=2,\ w_2=3\)), the middle line is
$$ 2x_1 + 3x_2 - 4 = 0 \;\;\Longrightarrow\;\; x_2 = \frac{4 - 2x_1}{3} $$
::fig perc-and | The learned line separates (1,1) from the other three points

## Limitation (slide 38 recap)
A single perceptron computes a weighted sum and a step, so it can only separate classes with a **straight line**: it works only for **linearly separable** data. It cannot learn **XOR**. That is why we need multilayer networks.`,
x: String.raw`## Example 1: one update step, done slowly
Current: \(w_1 = 0,\ w_2 = 0,\ b = 0\). Input \((1, 1)\), target \(t = 1\), \(\alpha = 1\), \(\theta = 0.2\).
1. Net input: \(y_{in} = 0 + (1)(0) + (1)(0) = 0\).
2. Output: \(-0.2 \le 0 \le 0.2\), so \(y = 0\).
3. \(y \neq t\) (0 ≠ 1), so update:
$$ \begin{aligned} w_1 &= 0 + (1)(1)(1) = 1 \\ w_2 &= 0 + (1)(1)(1) = 1 \\ b &= 0 + (1)(1) = 1 \end{aligned} $$

## Example 2: the OR function (extra practice)
Targets: \((1,1) \to 1,\ (1,0) \to 1,\ (0,1) \to 1,\ (0,0) \to -1\). Same settings (\(\alpha = 1,\ \theta = 0.2\), start at 0).
| Epoch | after \((1,1)\) | after \((1,0)\) | after \((0,1)\) | after \((0,0)\) |
| 1 | (1, 1, 1) | (1, 1, 1) | (1, 1, 1) | (1, 1, 0) |
| 2 | (1, 1, 0) | (1, 1, 0) | (1, 1, 0) | (1, 1, −1) |
| 3 | (1, 1, −1) | (2, 1, 0) | (2, 1, 0) | (2, 1, −1) |
| 4 | (2, 1, −1) | (2, 1, −1) | (2, 2, 0) | (2, 2, −1) |
| 5 | no change | no change | no change | no change |
(values are \(w_1, w_2, b\)). Final rule: \(y_{in} = -1 + 2x_1 + 2x_2\). Check \((0,0)\): \(-1 < -0.2\) → −1 ✔; \((1,0)\): \(1 > 0.2\) → +1 ✔.

## Example 3: why XOR fails
XOR targets: \((1,1) \to -1,\ (1,0) \to 1,\ (0,1) \to 1,\ (0,0) \to -1\).
The two "+1" points sit on opposite corners, so **no single straight line** can put \((1,0)\) and \((0,1)\) on one side and \((0,0)\) and \((1,1)\) on the other. The perceptron keeps changing its weights forever.`},

/* ------------------------------------------------------------------ */
'dm-mlp': {
key: [
 'History: 1943 McCulloch–Pitts, 1962 Rosenblatt, 1969 Minsky & Papert, 1982 Hopfield, 1986 backpropagation',
 'MLP = feed-forward network with ≥ 1 hidden layer: input → hidden → output',
 'Hidden layer "hides" its desired output; commercial nets: 3–4 layers, 10–1000 neurons per layer',
 'Hidden layers let the net learn curved (non-linear) boundaries such as XOR'
],
n: String.raw`## Overview of the lecture (slide 36)
Why multilayer perceptrons, some applications, and how they learn (the **backpropagation** algorithm).

## History (slide 37)
| Year | Milestone |
| 1943 | McCulloch–Pitts "neuron" starts the field |
| 1962 | Rosenblatt's perceptron learns its own weights (with a convergence proof) |
| 1969 | Minsky & Papert prove the limits of single-layer perceptrons |
| 1982 | Hopfield: convergence in symmetric networks, energy-function idea |
| 1986 | **Backpropagation of errors**: a way to train multilayer networks |

## Recap: perceptrons (slide 38 diagram explained)
The box shows inputs \(x_1 \dots x_n\) multiplied by weights, added as \(x = \sum w_i x_i\), then passed through a **step** (0 or 1). The red note says the key limitation: it **only works for linearly separable data**.

## Multilayer neural networks (slide 39)
A **multilayer perceptron (MLP)** is a **feed-forward** network with **one or more hidden layers**:
- an **input layer** of source neurons,
- at least one **hidden (middle) layer** of computing neurons,
- an **output layer** of computing neurons.

Signals move **forward, layer by layer**. Every neuron in a layer connects to every neuron in the next layer, and each connection has its own weight (a weight can be zero).

**Slides 40, 41 and 45 diagrams explained:**
- **Slide 40 / 45 (single hidden layer):** red squares = inputs (they only pass values on), green circles = hidden neurons, blue circles = outputs. Every arrow is a weight.
- **Slide 41 (two hidden layers):** input signals → first hidden layer → second hidden layer → output signals. More layers can learn more complex patterns.
::fig mlp-flow | MLP: signals go forward; during training the error goes backward

## What does the middle layer hide? (slide 42)
A hidden layer "hides" its **desired output**. We can see the inputs and the final outputs, but we **never see what the hidden neurons should output**; there's no target for them. Commercial ANNs use **3 or 4 layers** (1 or 2 hidden), each with **10 to 1000 neurons**. Experimental ones may have 5–6 layers and millions of neurons.

## Why hidden layers solve XOR
Each hidden neuron draws **one straight line**. The output neuron **combines** those lines, so the network can make a curved or two-part boundary.
::fig xor-mlp | A tiny MLP that solves XOR: h₁ acts like OR, h₂ like AND, y = OR but not AND

## Applications of MLPs (slide 46 diagrams explained)
- **Left graph (classification):** the input space is coloured into two regions (green and blue) with a **curved** border, which only a multilayer net can draw.
- **Right graph (regression):** scattered data points with a **smooth curve** fitted through them.
- Examples: patients' length of hospital stay, stock price forecasting, image recognition, car driving control.`,
x: String.raw`## Example 1: XOR with a hidden layer (step activation: output 1 if input > threshold, else 0)
- \(h_1 = 1\) if \(x_1 + x_2 > 0.5\) (this is **OR**)
- \(h_2 = 1\) if \(x_1 + x_2 > 1.5\) (this is **AND**)
- \(y = 1\) if \(h_1 - 2h_2 > 0.5\)

| \(x_1\) | \(x_2\) | \(x_1+x_2\) | \(h_1\) | \(h_2\) | \(h_1 - 2h_2\) | \(y\) | XOR |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 ✔ |
| 0 | 1 | 1 | 1 | 0 | 1 | 1 | 1 ✔ |
| 1 | 0 | 1 | 1 | 0 | 1 | 1 | 1 ✔ |
| 1 | 1 | 2 | 1 | 1 | −1 | 0 | 0 ✔ |

The single perceptron failed, but **two hidden neurons** fix it.

## Example 2: counting weights in an MLP
Network 3 inputs → 4 hidden → 2 outputs (fully connected, plus a bias on each hidden and output neuron):
$$ \text{weights} = (3 \times 4) + (4 \times 2) = 12 + 8 = 20 $$
$$ \text{biases} = 4 + 2 = 6 \qquad \text{total} = 26 $$

## Example 3: a forward pass through one hidden neuron
Inputs \((x_1, x_2) = (1, 2)\), weights to hidden neuron \(h\): \(0.5, -0.25\), bias \(0.1\), sigmoid:
$$ net_h = 0.1 + (1)(0.5) + (2)(-0.25) = 0.1 $$
$$ out_h = \frac{1}{1 + e^{-0.1}} = 0.525 $$
This value is then sent forward to the output layer.`},

/* ------------------------------------------------------------------ */
'dm-bp': {
key: [
 'Learning = present input → compute output → compare with target → adjust weights to reduce error',
 'Forward pass: input propagates layer by layer to the output',
 'Backward pass: error propagates from output back to input; weights updated',
 'Update rule (gradient descent): \\(w^{new} = w^{old} - \\eta\\,\\dfrac{\\partial E}{\\partial w}\\)',
 'Pros: universal approximator, efficient, robust. Cons: slow convergence, local minima'
],
n: String.raw`## Learning with MLPs: the general idea (slide 47)
1. Send the MLP an input pattern \(x\) from the training set.
2. Get the output \(y\) from the MLP.
3. Compare \(y\) with the "right answer" (target \(t\)) to get the **error**.
4. Use the error to **modify the weights**, so next time \(y\) is closer to \(t\).
5. Repeat with another \(x\) from the training set.

## Back-propagation neural network (slides 43–44)
Learning works like the perceptron: show training patterns, compute the output, and if it differs from the desired output, **adjust the weights to reduce the error**. The algorithm has **two phases**:
- **Forward pass:** the input pattern goes in at the input layer and propagates **layer by layer** until the output layer produces an output.
- **Backward pass:** if the output is wrong, the **error** is calculated and propagated **backwards** from the output layer to the input layer, and the weights are modified as it goes.

**Slide 48 and 49 diagrams explained:** the yellow bar on top / big arrow says **"forward propagation of the input signals"** (left → right). The bar at the bottom / lower arrow says **"backpropagation of the error"** (right → left). Slide 49 shows inputs \(x_1 \dots x_n\), a hidden layer and outputs \(y_1 \dots y_l\), with **input signals** moving right and **error signals** moving left.
::fig mlp-flow | Forward pass carries signals; backward pass carries the error

## The maths behind it
**1. Error of one output** (squared error):
$$ E = \frac{1}{2}\,(t - y)^2 \qquad\qquad E_{total} = \sum_{k} \frac{1}{2}\,(t_k - y_k)^2 $$
The \(\frac{1}{2}\) is there only so it cancels when we take the derivative.

**2. Gradient descent:** move every weight a small step **downhill** on the error curve:
$$ w^{\,new} = w^{\,old} - \eta \,\frac{\partial E}{\partial w} $$
\(\eta\) (eta) is the **learning rate**: the size of each step.
::fig grad-bowl | Gradient descent: each step moves the weight towards the lowest error

**3. Chain rule:** the error depends on a weight through several steps, so we multiply the small effects:
$$ \frac{\partial E}{\partial w} = \frac{\partial E}{\partial out} \times \frac{\partial out}{\partial net} \times \frac{\partial net}{\partial w} $$
::fig chain | How a weight affects the error, step by step

**4. Delta (δ) for an output neuron \(k\)** (sigmoid, so \(\frac{\partial out}{\partial net} = out(1-out)\)):
$$ \delta_k = (y_k - t_k)\; y_k\,(1 - y_k) $$
$$ \Delta w_{jk} = -\eta\, \delta_k \, out_j $$
**5. Delta for a hidden neuron \(j\):** it has no target, so we collect the error sent back from every output it feeds:
$$ \delta_j = \Big(\sum_{k} \delta_k \, w_{jk}\Big)\; out_j\,(1 - out_j) $$
$$ \Delta w_{ij} = -\eta\, \delta_j \, x_i $$

## The backpropagation algorithm (slide 50), every line
1. **Initialize** all weights to **small random values**.
2. **Repeat**
3. **For each training example:**
4. **Forward-propagate** the input to get the MLP's outputs: \(net = b + \sum w\,x\), \(out = f(net)\) for every layer.
5. **Back-propagate** the error to get \(\Delta w_{ij}\) for **all** weights (using the δ formulas above).
6. **End for**
7. **Update the weights** using the accumulated \(\Delta w_{ij}\): \(w_{ij} \leftarrow w_{ij} + \Delta w_{ij}\).
8. **Until** the stopping criteria are reached (error small enough, or a maximum number of rounds).

## Types of problems (slide 51)
Time-series prediction, credit-risk assessment, pattern recognition, speech processing, cognitive modelling, image processing, control. **BP is the standard algorithm that all other NN algorithms are compared with.**

## Advantages and disadvantages (slide 52)
| Advantages | Disadvantages |
| An MLP trained with BP is a **universal approximator** (can learn almost any function) | Convergence can be **very slow**, especially for big problems |
| Computationally **efficient** | Can get stuck in a **local minimum** (a small dip that isn't the lowest point) |
| **Robust** | |`,
x: String.raw`## Example 1: gradient descent with one weight
Error \(E = (w - 3)^2\), so \(\dfrac{dE}{dw} = 2(w - 3)\). Start \(w = 0\), \(\eta = 0.25\).
| Step | \(w\) | slope \(2(w-3)\) | new \(w = w - 0.25 \times \text{slope}\) |
| 1 | 0 | −6 | \(0 - 0.25(-6) = 1.5\) |
| 2 | 1.5 | −3 | \(1.5 + 0.75 = 2.25\) |
| 3 | 2.25 | −1.5 | \(2.25 + 0.375 = 2.625\) |
| 4 | 2.625 | −0.75 | \(2.625 + 0.1875 = 2.8125\) |
Each step moves closer to \(w = 3\), where the error is 0. Steps get smaller as the slope flattens.

## Example 2: why the learning rate matters
- \(\eta\) **too small** (0.01): very slow; thousands of steps.
- \(\eta\) **too big** (1.5): \(w = 0 \to 0 - 1.5(-6) = 9 \to 9 - 1.5(12) = -9 \to \dots\) It jumps over the bottom and gets worse.
- \(\eta\) **just right** (0.25): smooth progress, as in Example 1.

## Example 3: one output δ
Output \(y = 0.8\), target \(t = 1\):
$$ \delta = (0.8 - 1)(0.8)(1 - 0.8) = (-0.2)(0.8)(0.2) = -0.032 $$
If the hidden output feeding this weight is \(out_j = 0.6\) and \(\eta = 0.5\):
$$ \Delta w = -0.5 \times (-0.032) \times 0.6 = +0.0096 $$
The weight **increases** a little, pushing the output up towards 1.

## Example 4: a local minimum
Imagine a hilly road. A ball rolling downhill may stop in a small dip (a **local minimum**) instead of the deepest valley (the **global minimum**). BP can get stuck the same way; restarting with different random weights often helps.`},

/* ------------------------------------------------------------------ */
'dm-bpex': {
key: [
 'Network 2–2–2 with biases; learning rate \\(\\eta = 0.5\\); sigmoid activation',
 'Forward pass: \\(net = b + \\sum w\\,x\\), \\(out = \\dfrac{1}{1+e^{-net}}\\)',
 'Error: \\(E_{total} = \\sum \\dfrac{1}{2}(target - out)^2\\)',
 'Weight update: \\(w^{new} = w - \\eta \\dfrac{\\partial E_{total}}{\\partial w}\\) using the chain rule',
 'Repeating the update many times makes the error almost zero'
],
n: String.raw`This example (from your step-by-step PDF) follows **one complete round** of backpropagation with real numbers.

## The network
::fig net221 | 2 inputs, 2 hidden neurons, 2 outputs, with starting weights and biases
- Inputs: \(i_1 = 0.05,\; i_2 = 0.10\)
- Targets (what we want): \(o_1 \to 0.01,\; o_2 \to 0.99\)
- Learning rate: \(\eta = 0.5\)
- Activation: sigmoid \(out = \dfrac{1}{1 + e^{-net}}\)

## Step 1: Forward pass, hidden layer
$$ \begin{aligned} net_{h_1} &= w_1 i_1 + w_2 i_2 + b_1 \\ &= (0.15)(0.05) + (0.20)(0.10) + 0.35 \\ &= 0.3775 \end{aligned} $$
$$ out_{h_1} = \frac{1}{1 + e^{-0.3775}} = 0.593269992 $$
In the same way:
$$ \begin{aligned} net_{h_2} &= (0.25)(0.05) + (0.30)(0.10) + 0.35 = 0.3925 \\ out_{h_2} &= 0.596884378 \end{aligned} $$

## Step 2: Forward pass, output layer
$$ \begin{aligned} net_{o_1} &= w_5\, out_{h_1} + w_6\, out_{h_2} + b_2 \\ &= (0.40)(0.593269992) + (0.45)(0.596884378) + 0.60 \\ &= 1.105905967 \end{aligned} $$
$$ out_{o_1} = \frac{1}{1 + e^{-1.105905967}} = 0.75136507 $$
$$ \begin{aligned} net_{o_2} &= (0.50)(0.593269992) + (0.55)(0.596884378) + 0.60 \\ &= 1.224921404 \\ out_{o_2} &= 0.772928465 \end{aligned} $$
The outputs (0.751 and 0.773) are far from the targets (0.01 and 0.99), so we must learn.

## Step 3: Total error
$$ E_{o_1} = \frac{1}{2}(0.01 - 0.75136507)^2 = 0.274811083 $$
$$ E_{o_2} = \frac{1}{2}(0.99 - 0.772928465)^2 = 0.023560026 $$
$$ E_{total} = E_{o_1} + E_{o_2} = 0.298371109 $$

## Step 4: Backward pass, output weights (example \(w_5\))
::fig chain | w₅ changes net_o₁, which changes out_o₁, which changes E_total
By the chain rule:
$$ \frac{\partial E_{total}}{\partial w_5} = \frac{\partial E_{total}}{\partial out_{o_1}} \times \frac{\partial out_{o_1}}{\partial net_{o_1}} \times \frac{\partial net_{o_1}}{\partial w_5} $$
**Piece 1**, how the error changes with the output:
$$ \begin{aligned} \frac{\partial E_{total}}{\partial out_{o_1}} &= -(target_{o_1} - out_{o_1}) \\ &= -(0.01 - 0.75136507) = 0.74136507 \end{aligned} $$
**Piece 2**, slope of the sigmoid:
$$ \begin{aligned} \frac{\partial out_{o_1}}{\partial net_{o_1}} &= out_{o_1}(1 - out_{o_1}) \\ &= 0.75136507\,(1 - 0.75136507) = 0.186815602 \end{aligned} $$
**Piece 3**, how \(net_{o_1}\) changes with \(w_5\) (it is the input on that line):
$$ \frac{\partial net_{o_1}}{\partial w_5} = out_{h_1} = 0.593269992 $$
**Multiply:**
$$ \begin{aligned} \frac{\partial E_{total}}{\partial w_5} &= 0.74136507 \times 0.186815602 \times 0.593269992 \\ &= 0.082167041 \end{aligned} $$
**Update:**
$$ w_5^{+} = w_5 - \eta\,\frac{\partial E_{total}}{\partial w_5} = 0.40 - (0.5)(0.082167041) = 0.35891648 $$
Doing the same for the other output weights:
| Weight | Old | New |
| \(w_5\) | 0.40 | 0.35891648 |
| \(w_6\) | 0.45 | 0.408666186 |
| \(w_7\) | 0.50 | 0.511301270 |
| \(w_8\) | 0.55 | 0.561370121 |

## Step 5: Backward pass, hidden weights (example \(w_1\))
A hidden neuron affects **both** outputs, so we add both effects (using the **old** \(w_5, w_7\)):
$$ \begin{aligned} \frac{\partial E_{total}}{\partial out_{h_1}} &= \delta_{o_1} w_5 + \delta_{o_2} w_7 \\ &= (0.138498562)(0.40) + (-0.038098237)(0.50) \\ &= 0.036350306 \end{aligned} $$
where \(\delta_{o} = \dfrac{\partial E}{\partial out_o} \times out_o(1 - out_o)\).
$$ \begin{aligned} \frac{\partial out_{h_1}}{\partial net_{h_1}} &= out_{h_1}(1 - out_{h_1}) \\ &= 0.593269992\,(1 - 0.593269992) = 0.241300709 \end{aligned} $$
$$ \frac{\partial net_{h_1}}{\partial w_1} = i_1 = 0.05 $$
$$ \frac{\partial E_{total}}{\partial w_1} = 0.036350306 \times 0.241300709 \times 0.05 = 0.000438568 $$
$$ w_1^{+} = 0.15 - (0.5)(0.000438568) = 0.149780716 $$
| Weight | Old | New |
| \(w_1\) | 0.15 | 0.149780716 |
| \(w_2\) | 0.20 | 0.19956143 |
| \(w_3\) | 0.25 | 0.24975114 |
| \(w_4\) | 0.30 | 0.29950229 |

## Step 6: Repeat
::fig error-curve | The total error after more and more training rounds
- After **1** round: \(E_{total}\) falls from 0.298371109 to **0.291027924**.
- After **10,000** rounds: \(E_{total} = 0.0000351085\), and the outputs become \(0.015912196\) (target 0.01) and \(0.984065734\) (target 0.99).`,
x: String.raw`## Example 1: a smaller backprop you can do by hand
One input \(x = 1\), one weight \(w = 0.5\), no bias, sigmoid output, target \(t = 1\), \(\eta = 1\).
1. Forward: \(net = (0.5)(1) = 0.5\), \(\;out = \dfrac{1}{1 + e^{-0.5}} = 0.6225\)
2. Error: \(E = \frac{1}{2}(1 - 0.6225)^2 = \frac{1}{2}(0.3775)^2 = 0.0713\)
3. Chain rule:
$$ \begin{aligned} \frac{\partial E}{\partial w} &= \underbrace{(0.6225 - 1)}_{\partial E/\partial out} \times \underbrace{0.6225(1 - 0.6225)}_{\partial out/\partial net} \times \underbrace{1}_{\partial net/\partial w} \\ &= (-0.3775)(0.2350)(1) = -0.0887 \end{aligned} $$
4. Update: \(w^{+} = 0.5 - (1)(-0.0887) = 0.5887\)
5. Check: \(net = 0.5887\), \(out = 0.6431\), \(E = \frac{1}{2}(0.3569)^2 = 0.0637\). The error went **down** from 0.0713 to 0.0637 ✔

## Example 2: \(w_6\) from the main example
$$ \frac{\partial E_{total}}{\partial w_6} = 0.74136507 \times 0.186815602 \times \underbrace{0.596884378}_{out_{h_2}} = 0.082667628 $$
$$ w_6^{+} = 0.45 - (0.5)(0.082667628) = 0.408666186 $$
The only difference from \(w_5\) is the last piece: \(w_6\) carries \(out_{h_2}\) instead of \(out_{h_1}\).

## Example 3: \(w_7\), where the weight goes up
For output \(o_2\) the output is **too low** (0.773 < 0.99), so the gradient is negative:
$$ \begin{aligned} \frac{\partial E_{total}}{\partial w_7} &= \underbrace{-(0.99 - 0.772928465)}_{-0.217071535} \times \underbrace{0.175510053}_{out_{o_2}(1-out_{o_2})} \times \underbrace{0.593269992}_{out_{h_1}} \\ &= -0.022602541 \end{aligned} $$
$$ w_7^{+} = 0.50 - (0.5)(-0.022602541) = 0.511301270 $$
Subtracting a negative number **increases** the weight, pushing \(o_2\) up towards 0.99.`,

body: String.raw`## Starting values
| Item | Value |
| Inputs | \(i_1 = 0.05,\ i_2 = 0.10\) |
| Targets | \(o_1 = 0.01,\ o_2 = 0.99\) |
| Input → hidden weights | \(w_1 = 0.15,\ w_2 = 0.20,\ w_3 = 0.25,\ w_4 = 0.30\) |
| Hidden → output weights | \(w_5 = 0.40,\ w_6 = 0.45,\ w_7 = 0.50,\ w_8 = 0.55\) |
| Biases | \(b_1 = 0.35,\ b_2 = 0.60\) |
| Learning rate | \(\eta = 0.5\) |

## Formulas used
$$ net = b + \sum_i w_i\, x_i \qquad out = \frac{1}{1 + e^{-net}} \qquad E_{total} = \sum \frac{1}{2}(target - out)^2 $$
$$ \frac{\partial E_{total}}{\partial w} = \frac{\partial E_{total}}{\partial out} \cdot \frac{\partial out}{\partial net} \cdot \frac{\partial net}{\partial w} \qquad w^{+} = w - \eta\,\frac{\partial E_{total}}{\partial w} $$

## Results of one round
| Quantity | Value |
| \(out_{h_1},\ out_{h_2}\) | 0.593269992, 0.596884378 |
| \(out_{o_1},\ out_{o_2}\) | 0.75136507, 0.772928465 |
| \(E_{total}\) | 0.298371109 |
| \(w_5, w_6, w_7, w_8\) (new) | 0.35891648, 0.408666186, 0.511301270, 0.561370121 |
| \(w_1, w_2, w_3, w_4\) (new) | 0.149780716, 0.19956143, 0.24975114, 0.29950229 |
| \(E_{total}\) after 1 round | 0.291027924 |
| \(E_{total}\) after 10,000 rounds | 0.0000351085 |`
}
});
