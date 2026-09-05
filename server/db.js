const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Helper to generate extensive, long-form multi-section reading matter for chapters
function generateRichChapterContent(bookTitle, author, genre, chapterTitle, chapterNum) {
  const intro = `EXECUTIVE SUMMARY & FOUNDATIONAL CONTEXT\n\n` +
    `Welcome to the comprehensive reading edition of "${chapterTitle}" from the master volume "${bookTitle}" authored by ${author}.\n\n` +
    `In this extensive chapter, we examine the fundamental principles, theoretical frameworks, historical evolution, and pragmatic applications governing ${genre.toLowerCase()}. ` +
    `Whether approaching this text from an academic research perspective or practical mastery, the following detailed analysis lays out the structural paradigms, empirical evidence, and conceptual insights required for deep comprehension.\n\n` +
    `As we delve into ${chapterTitle.toLowerCase()}, it is vital to keep in mind the overarching thesis presented by ${author}: that knowledge is not merely a collection of isolated facts, but an interconnected tapestry of principles that transform our understanding of the discipline.`;

  const section1 = `SECTION I: THEORETICAL ORIGINS & CONCEPTUAL PARADIGMS\n\n` +
    `To fully grasp the significance of ${chapterTitle}, one must first trace its historical origins and conceptual roots. Throughout the development of ${genre}, scholars and practitioners have struggled with fundamental questions regarding organization, methodology, and execution.\n\n` +
    `Historically, early approaches to ${bookTitle.toLowerCase()} relied heavily on trial-and-error heuristics and fragmented methodologies. However, as the field matured, formalized paradigms emerged to establish rigorous standards. ` +
    `The initial breakthrough occurred when researchers recognized that underlying patterns could be systematically cataloged, tested, and optimized.\n\n` +
    `Consider the core architectural principle: every complex system is composed of smaller, interdependent modules. When these modules maintain clean interface boundaries and well-defined responsibilities, the overall stability of the system increases exponentially. ` +
    `Conversely, when system boundaries are blurred, entropy accumulates rapidly, leading to maintenance bottlenecks, unexpected side effects, and catastrophic failures under stress.\n\n` +
    `Furthermore, historical empirical studies demonstrate that organizations adopting systematic frameworks experience a 70% reduction in defect rates and a 3-fold increase in long-term operational velocity. ` +
    `This empirical backing confirms that disciplined methodology is not a luxury, but an essential requirement for sustained excellence.`;

  const section2 = `SECTION II: IN-DEPTH TECHNICAL & METHODOLOGICAL ANALYSIS\n\n` +
    `Moving beyond theoretical foundations, we now analyze the specific operational mechanics and analytical models that define ${chapterTitle}.\n\n` +
    `1. Primary Structural Axioms:\n` +
    `   - Axiom A (Cohesion): Every component within the framework must focus exclusively on a single well-defined purpose. High cohesion minimizes internal complexity and maximizes readability.\n` +
    `   - Axiom B (Decoupling): Inter-component dependencies must be minimized through abstraction layers and contract-based interfaces. Decoupling ensures that modifications in one module do not cascade destructively into adjacent systems.\n` +
    `   - Axiom C (Verifiability): Every assertion, calculation, or state transition must be independently verifiable through automated testing, logical proof, or empirical observation.\n\n` +
    `2. Mathematical & Algorithmic Mechanics:\n` +
    `   In evaluating the performance envelope of ${bookTitle.toLowerCase()}, we apply rigorous complexity analysis. Let S represent the set of all input states, and let F: S -> S' denote the transformation function. ` +
    `The total time complexity T(n) and space complexity M(n) can be modeled as:\n\n` +
    `   T(n) = O(n log n) + ∑ [k = 1 to m] C_k\n` +
    `   M(n) = O(n) + StackDepth(f)\n\n` +
    `Where n denotes the input magnitude, m represents parallel execution threads, and C_k symbolizes boundary synchronization latency. ` +
    `By optimizing the inner execution loop and eliminating redundant allocations, system throughput scales quadratically while resource consumption remains strictly bounded.\n\n` +
    `3. Comparative Case Studies:\n` +
    `   To illustrate these mechanics in practice, consider two contrasting implementation models:\n` +
    `   - Model Alpha (Monolithic Unstructured): Implements all logic within a single execution context. While initially quick to assemble, Model Alpha suffers from exponential cognitive load (O(2^n)) as the codebase grows, rendering maintenance nearly impossible.\n` +
    `   - Model Beta (Modular Layered): Separates presentation, domain logic, data persistence, and external communication into isolated layers. Model Beta maintains constant cognitive load (O(1)) per module, enabling teams to scale effortlessly.`;

  const section3 = `SECTION III: PRAGMATIC EXAMPLES & DETAILED SCENARIOS\n\n` +
    `To reinforce these theoretical insights, let us explore step-by-step practical scenarios and operational workflows illustrating ${chapterTitle} in action.\n\n` +
    `Scenario 1: High-Throughput Processing Under Load\n` +
    `Imagine a production environment handling millions of concurrent requests per second. Under peak load, resource contention at database boundaries frequently causes thread starvation and cascading timeouts. ` +
    `By applying the principles of ${chapterTitle}, engineers introduce asynchronous event loops, non-blocking I/O queues, and resilient circuit breakers.\n\n` +
    `Step 1: Ingestion & Validation - Incoming payload data is validated against strict JSON schema definitions at the edge, rejecting malformed requests in under 2 milliseconds.\n` +
    `Step 2: Queue Placement - Valid requests are pushed to a partitioned distributed event log, decoupling ingestion rate from downstream processing capacity.\n` +
    `Step 3: Worker Execution - Stateless worker nodes consume event batches in parallel, executing business logic and writing updates to persistent storage using idempotent transactions.\n` +
    `Step 4: Monitoring & Telemetry - Real-time metrics track p99 latency, memory allocations, and error rates, automatically triggering auto-scaling policies when thresholds are exceeded.\n\n` +
    `Scenario 2: Refactoring Legacy Bottlenecks\n` +
    `Consider an legacy module containing 5,000 lines of unformatted, tightly-coupled procedural code. Refactoring this module without breaking existing functionality requires a disciplined strategy:\n` +
    `1. Write comprehensive characterization unit tests around the existing legacy behavior to establish a safety net.\n` +
    `2. Extract hidden dependencies into explicit interface parameters using Dependency Injection.\n` +
    `3. Replace monolithic conditional branches with Strategy and State design patterns.\n` +
    `4. Incrementally deploy refactored components behind feature flags, verifying zero regression in production telemetry.`;

  const section4 = `SECTION IV: CRITICAL DEBATES & COUNTER-ARGUMENTS\n\n` +
    `No serious academic or technical treatment of ${bookTitle.toLowerCase()} would be complete without addressing the key controversies and competing viewpoints within the field.\n\n` +
    `Debate 1: Strict Formalism vs. Pragmatic Agility\n` +
    `Critics of rigid formal frameworks argue that excessive adherence to architectural ceremony leads to over-engineering, delayed time-to-market, and bureaucratic inertia. ` +
    `They advocate for lightweight, agile methodologies that prioritize rapid prototyping and iterative feedback over exhaustive upfront design.\n\n` +
    `In response, proponents of structural rigor demonstrate that skipping architectural foundations inevitably incurs massive technical debt. ` +
    `What appears to be 'fast development' in month 1 becomes a quagmire of bug-fixing by month 6. The optimal path lies in balanced pragmatism—applying strong architectural standards where system criticality is high, while maintaining agility in transient experimentation layers.\n\n` +
    `Debate 2: Centralized Control vs. Distributed Autonomy\n` +
    `Another major point of discussion concerns governance. Should decisions be mandated by a central committee, or decentralized to autonomous domain teams? ` +
    `Empirical evidence indicates that federated governance—where central guidelines define global standards (security, protocols, metrics) while individual teams retain autonomy over implementation details—yields the highest organizational performance.`;

  const section5 = `SECTION V: SYNTHESIS, FUTURE TRAJECTORIES & EXTENDED READING\n\n` +
    `As we look toward the future of ${genre}, emerging technologies such as artificial intelligence, quantum computing, and distributed ledger systems promise to redefine the boundaries of ${chapterTitle}.\n\n` +
    `Key Takeaways from Chapter ${chapterNum}:\n` +
    `• Mastery of ${chapterTitle} requires both deep conceptual understanding and disciplined practical execution.\n` +
    `• Architecture and design are continuous processes of trade-off evaluation, requiring constant alignment with evolving goals.\n` +
    `• Simplicity is the ultimate sophistication. Strive to eliminate unnecessary complexity at every layer of your work.\n` +
    `• Automated verification, telemetry, and continuous feedback loops are indispensable tools for maintaining quality over time.\n\n` +
    `Summary Conclusion:\n` +
    `By internalizing the lessons of this chapter, you equip yourself with the cognitive tools and analytical frameworks needed to tackle the most demanding challenges in ${genre.toLowerCase()}. ` +
    `Proceed to the next chapter to explore how these concepts integrate into the broader ecosystem of "${bookTitle}".`;

  return [intro, section1, section2, section3, section4, section5].join('\n\n');
}

const BOOK_IMAGES = {
  "book-1": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
  "book-2": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
  "book-3": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
  "book-4": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
  "book-5": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
  "book-6": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
  "book-7": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
  "book-8": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
  "book-9": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
  "book-10": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=600",
  "book-11": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600",
  "book-12": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600",
  "book-13": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
  "book-14": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
  "book-15": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
  "book-16": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600",
  "book-17": "https://images.unsplash.com/photo-1474939557548-f842486be195?auto=format&fit=crop&q=80&w=600",
  "book-18": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600",
  "book-19": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
  "book-20": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  "book-21": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
  "book-22": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
  "book-23": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
  "book-24": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600",
  "book-25": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600",
  "book-26": "https://images.unsplash.com/photo-1516116211223-48a98968f498?auto=format&fit=crop&q=80&w=600",
  "book-27": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600",
  "book-28": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600",
  "book-29": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
  "book-30": "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
  "book-31": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
  "book-32": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600"
};

const INITIAL_BOOKS = [
  {
    id: "book-1",
    title: "Clean Code Architecture & Systems",
    author: "Robert C. Martin & Tech Scholars",
    genre: "Technology",
    isbn: "978-0132350884",
    publishYear: 2021,
    rating: 4.9,
    totalCopies: 8,
    availableCopies: 5,
    coverGradient: "from-blue-600 to-indigo-900",
    coverImage: BOOK_IMAGES["book-1"],
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. This comprehensive guide details principles of software craftmanship, SOLID design patterns, and sustainable architecture.",
    topics: ["Software Engineering", "Clean Code", "Design Patterns", "Refactoring"],
    pageCount: 464,
    chapters: [
      {
        title: "Chapter 1: Clean Code Principles & Craftsman Mindset",
        content: generateRichChapterContent("Clean Code Architecture & Systems", "Robert C. Martin", "Technology", "Clean Code Principles & Craftsman Mindset", 1)
      },
      {
        title: "Chapter 2: Meaningful Names & Function Decomposition",
        content: generateRichChapterContent("Clean Code Architecture & Systems", "Robert C. Martin", "Technology", "Meaningful Names & Function Decomposition", 2)
      },
      {
        title: "Chapter 3: SOLID Architecture & System Boundaries",
        content: generateRichChapterContent("Clean Code Architecture & Systems", "Robert C. Martin", "Technology", "SOLID Architecture & System Boundaries", 3)
      },
      {
        title: "Chapter 4: Unit Testing, TDD & Verification Suites",
        content: generateRichChapterContent("Clean Code Architecture & Systems", "Robert C. Martin", "Technology", "Unit Testing, TDD & Verification Suites", 4)
      },
      {
        title: "Chapter 5: Refactoring Legacy Codebases & Technical Debt",
        content: generateRichChapterContent("Clean Code Architecture & Systems", "Robert C. Martin", "Technology", "Refactoring Legacy Codebases & Technical Debt", 5)
      }
    ]
  },
  {
    id: "book-2",
    title: "Steve Jobs: The Digital Visionary",
    author: "Walter Isaacson",
    genre: "Biography",
    isbn: "978-1451648539",
    publishYear: 2011,
    rating: 4.8,
    totalCopies: 6,
    availableCopies: 3,
    coverGradient: "from-amber-600 to-red-900",
    coverImage: BOOK_IMAGES["book-2"],
    description: "Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and intensely burning personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries.",
    topics: ["Innovation", "Apple", "Leadership", "Technology History"],
    pageCount: 656,
    chapters: [
      {
        title: "Chapter 1: Childhood, Palo Alto & The Garage Era",
        content: generateRichChapterContent("Steve Jobs: The Digital Visionary", "Walter Isaacson", "Biography", "Childhood, Palo Alto & The Garage Era", 1)
      },
      {
        title: "Chapter 2: The Macintosh Revolution & GUI Craftsmanship",
        content: generateRichChapterContent("Steve Jobs: The Digital Visionary", "Walter Isaacson", "Biography", "The Macintosh Revolution & GUI Craftsmanship", 2)
      },
      {
        title: "Chapter 3: NeXT Workstations & The Pixar Renaissance",
        content: generateRichChapterContent("Steve Jobs: The Digital Visionary", "Walter Isaacson", "Biography", "NeXT Workstations & The Pixar Renaissance", 3)
      },
      {
        title: "Chapter 4: Return to Apple, Think Different & iMac",
        content: generateRichChapterContent("Steve Jobs: The Digital Visionary", "Walter Isaacson", "Biography", "Return to Apple, Think Different & iMac", 4)
      },
      {
        title: "Chapter 5: iPod, iPhone, iPad & The Ecosystem Legacy",
        content: generateRichChapterContent("Steve Jobs: The Digital Visionary", "Walter Isaacson", "Biography", "iPod, iPhone, iPad & The Ecosystem Legacy", 5)
      }
    ]
  },
  {
    id: "book-3",
    title: "Quantum Physics & Cosmos Mechanics",
    author: "Dr. Elena Rostova",
    genre: "Science",
    isbn: "978-0199206506",
    publishYear: 2023,
    rating: 4.9,
    totalCopies: 10,
    availableCopies: 7,
    coverGradient: "from-purple-600 to-cyan-900",
    coverImage: BOOK_IMAGES["book-3"],
    description: "An extraordinary journey into the subatomic world of quantum mechanics, wave-particle duality, quantum entanglement, and spacetime geometry. Dr. Rostova simplifies complex quantum field theories into engaging, intuitive explorations for curious minds.",
    topics: ["Quantum Computing", "Theoretical Physics", "Astrophysics", "Cosmology"],
    pageCount: 380,
    chapters: [
      {
        title: "Chapter 1: The Quantum Realm Awakening & Planck Constant",
        content: generateRichChapterContent("Quantum Physics & Cosmos Mechanics", "Dr. Elena Rostova", "Science", "The Quantum Realm Awakening & Planck Constant", 1)
      },
      {
        title: "Chapter 2: Wave-Particle Duality & Double Slit Experiments",
        content: generateRichChapterContent("Quantum Physics & Cosmos Mechanics", "Dr. Elena Rostova", "Science", "Wave-Particle Duality & Double Slit Experiments", 2)
      },
      {
        title: "Chapter 3: Heisenberg Uncertainty & State Superposition",
        content: generateRichChapterContent("Quantum Physics & Cosmos Mechanics", "Dr. Elena Rostova", "Science", "Heisenberg Uncertainty & State Superposition", 3)
      },
      {
        title: "Chapter 4: Quantum Entanglement & Spooky Action at Distance",
        content: generateRichChapterContent("Quantum Physics & Cosmos Mechanics", "Dr. Elena Rostova", "Science", "Quantum Entanglement & Spooky Action at Distance", 4)
      },
      {
        title: "Chapter 5: Quantum Computing, Qubits & Shor's Algorithm",
        content: generateRichChapterContent("Quantum Physics & Cosmos Mechanics", "Dr. Elena Rostova", "Science", "Quantum Computing, Qubits & Shor's Algorithm", 5)
      }
    ]
  },
  {
    id: "book-4",
    title: "Meditations of the Mind",
    author: "Marcus Aurelius",
    genre: "Philosophy",
    isbn: "978-0140449334",
    publishYear: 2018,
    rating: 4.7,
    totalCopies: 12,
    availableCopies: 9,
    coverGradient: "from-emerald-700 to-teal-950",
    coverImage: BOOK_IMAGES["book-4"],
    description: "Written in Greek by the Roman Emperor Marcus Aurelius without any intention of publication, the Meditations offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe.",
    topics: ["Stoicism", "Self-Mastery", "Ethics", "Mental Clarity"],
    pageCount: 256,
    chapters: [
      {
        title: "Book I: Debts, Ancestral Lessons & Moral Duty",
        content: generateRichChapterContent("Meditations of the Mind", "Marcus Aurelius", "Philosophy", "Book I: Debts, Ancestral Lessons & Moral Duty", 1)
      },
      {
        title: "Book II: On Inner Peace, Purpose & Morning Reflections",
        content: generateRichChapterContent("Meditations of the Mind", "Marcus Aurelius", "Philosophy", "Book II: On Inner Peace, Purpose & Morning Reflections", 2)
      },
      {
        title: "Book III: The Citadel of the Soul & Impermanence",
        content: generateRichChapterContent("Meditations of the Mind", "Marcus Aurelius", "Philosophy", "Book III: The Citadel of the Soul & Impermanence", 3)
      },
      {
        title: "Book IV: Universal Nature, Reason & Equanimity",
        content: generateRichChapterContent("Meditations of the Mind", "Marcus Aurelius", "Philosophy", "Book IV: Universal Nature, Reason & Equanimity", 4)
      },
      {
        title: "Book V: Serenity in Adversity & The Logos",
        content: generateRichChapterContent("Meditations of the Mind", "Marcus Aurelius", "Philosophy", "Book V: Serenity in Adversity & The Logos", 5)
      }
    ]
  },
  {
    id: "book-5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic Literature",
    isbn: "978-0141439518",
    publishYear: 2003,
    rating: 4.9,
    totalCopies: 15,
    availableCopies: 11,
    coverGradient: "from-rose-600 to-pink-900",
    coverImage: BOOK_IMAGES["book-5"],
    description: "Jane Austen's witty masterpiece follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
    topics: ["19th Century Literature", "Romance", "Social Satire", "British Classics"],
    pageCount: 432,
    chapters: [
      {
        title: "Chapter 1: The Bennet Household & Netherfield Let",
        content: generateRichChapterContent("Pride and Prejudice", "Jane Austen", "Classic Literature", "Chapter 1: The Bennet Household & Netherfield Let", 1)
      },
      {
        title: "Chapter 2: The Ball at Meryton & First Impressions",
        content: generateRichChapterContent("Pride and Prejudice", "Jane Austen", "Classic Literature", "Chapter 2: The Ball at Meryton & First Impressions", 2)
      },
      {
        title: "Chapter 3: Netherfield Sojourn & Muddy Petticoats",
        content: generateRichChapterContent("Pride and Prejudice", "Jane Austen", "Classic Literature", "Chapter 3: Netherfield Sojourn & Muddy Petticoats", 3)
      },
      {
        title: "Chapter 4: The Hunsford Parsonage Proposal & Letter",
        content: generateRichChapterContent("Pride and Prejudice", "Jane Austen", "Classic Literature", "Chapter 4: The Hunsford Parsonage Proposal & Letter", 4)
      },
      {
        title: "Chapter 5: Pemberley Estate Tour & Final Resolution",
        content: generateRichChapterContent("Pride and Prejudice", "Jane Austen", "Classic Literature", "Chapter 5: Pemberley Estate Tour & Final Resolution", 5)
      }
    ]
  }
];

// Dynamically generate remaining 27 books with rich cover images
const ADDITIONAL_BOOK_TEMPLATES = [
  { id: "book-6", title: "Artificial Intelligence & Neural Frontiers", author: "Dr. Alexander Vance", genre: "Technology", gradient: "from-blue-500 to-cyan-800" },
  { id: "book-7", title: "Becoming", author: "Michelle Obama", genre: "Biography", gradient: "from-violet-600 to-purple-950" },
  { id: "book-8", title: "The Art of War", author: "Sun Tzu", genre: "Philosophy", gradient: "from-red-700 to-stone-900" },
  { id: "book-9", title: "Cybersecurity & Cryptographic Defenses", author: "Marcus Thorne", genre: "Technology", gradient: "from-teal-600 to-slate-900" },
  { id: "book-10", title: "Ancient Civilizations & Lost Empire Scrolls", author: "Prof. Arthur Pendelton", genre: "History", gradient: "from-amber-700 to-yellow-950" },
  { id: "book-11", title: "Leonardo da Vinci", author: "Walter Isaacson", genre: "Biography", gradient: "from-orange-600 to-amber-900" },
  { id: "book-12", title: "The Republic", author: "Plato", genre: "Philosophy", gradient: "from-sky-700 to-blue-950" },
  { id: "book-13", title: "Chronicles of Narnia: The Lion's Realm", author: "C.S. Lewis", genre: "Fantasy & Sci-Fi", gradient: "from-blue-700 to-indigo-950" },
  { id: "book-14", title: "Design Systems & UI Aesthetics", author: "Elena Vasquez", genre: "Design & Architecture", gradient: "from-fuchsia-600 to-pink-950" },
  { id: "book-15", title: "Climate Change & Biosphere Dynamics", author: "Dr. Sarah Lin", genre: "Science", gradient: "from-emerald-600 to-green-950" },
  { id: "book-16", title: "Einstein: His Life and Universe", author: "Walter Isaacson", genre: "Biography", gradient: "from-indigo-600 to-purple-900" },
  { id: "book-17", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic Literature", gradient: "from-amber-600 to-yellow-900" },
  { id: "book-18", title: "1984: Totalitarian Dystopia", author: "George Orwell", genre: "Classic Literature", gradient: "from-stone-700 to-slate-950" },
  { id: "book-19", title: "Full-Stack Web Development Architecture", author: "Samantha Wright", genre: "Technology", gradient: "from-cyan-600 to-blue-900" },
  { id: "book-20", title: "Cosmic Odyssey & Astrophysics", author: "Carl Sagan Legacy Team", genre: "Science", gradient: "from-violet-700 to-blue-950" },
  { id: "book-21", title: "The Industrial Revolution & Modern Age", author: "Prof. Kenneth Clark", genre: "History", gradient: "from-yellow-700 to-amber-950" },
  { id: "book-22", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic Literature", gradient: "from-amber-500 to-purple-900" },
  { id: "book-23", title: "The Hobbit: There and Back Again", author: "J.R.R. Tolkien", genre: "Fantasy & Sci-Fi", gradient: "from-emerald-700 to-amber-900" },
  { id: "book-24", title: "Atomic Habits & Behavioral Mastery", author: "James Clear", genre: "Philosophy", gradient: "from-amber-600 to-orange-950" },
  { id: "book-25", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "History", gradient: "from-stone-600 to-amber-950" },
  { id: "book-26", title: "Data Structures & Algorithmic Thinking", author: "Dr. Narendra Sharma", genre: "Technology", gradient: "from-blue-700 to-slate-950" },
  { id: "book-27", title: "Alexander the Great & Hellenistic Era", author: "Prof. Robin Lane Fox", genre: "History", gradient: "from-yellow-600 to-stone-900" },
  { id: "book-28", title: "Deep Work & Focused Attention", author: "Cal Newport", genre: "Technology", gradient: "from-cyan-700 to-indigo-950" },
  { id: "book-29", title: "Frankenstein: The Modern Prometheus", author: "Mary Shelley", genre: "Classic Literature", gradient: "from-teal-800 to-slate-950" },
  { id: "book-30", title: "Neurobiology of Consciousness", author: "Dr. VS Ramachandran", genre: "Science", gradient: "from-purple-700 to-pink-950" },
  { id: "book-31", title: "The Odyssey", author: "Homer", genre: "Classic Literature", gradient: "from-blue-600 to-teal-900" },
  { id: "book-32", title: "Principles of Macroeconomics & Markets", author: "Dr. Paul Samuelson", genre: "Philosophy", gradient: "from-amber-700 to-stone-900" }
];

ADDITIONAL_BOOK_TEMPLATES.forEach((tmpl, i) => {
  const chapterTitles = [
    `Chapter 1: Foundational Framework & Theoretical Origins of ${tmpl.title}`,
    `Chapter 2: Core Operational Mechanics & System Paradigms`,
    `Chapter 3: Deep Case Studies, Empirical Data & Practical Workflows`,
    `Chapter 4: Critical Debates, Controversies & Counter-Arguments`,
    `Chapter 5: Synthesis, Future Trajectories & Advanced Mastery`
  ];

  INITIAL_BOOKS.push({
    id: tmpl.id,
    title: tmpl.title,
    author: tmpl.author,
    genre: tmpl.genre,
    isbn: `978-${Math.floor(100000000 + (i * 123456) % 899999999)}`,
    publishYear: 2018 + (i % 6),
    rating: Number((4.7 + (i % 4) * 0.08).toFixed(2)),
    totalCopies: 5 + (i % 8),
    availableCopies: 3 + (i % 5),
    coverGradient: tmpl.gradient,
    coverImage: BOOK_IMAGES[tmpl.id] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    description: `An authoritative, deep-dive examination into ${tmpl.title} by ${tmpl.author}. Featuring 5 extensive chapters covering foundational theory, empirical evidence, pragmatic scenarios, and advanced trajectories.`,
    topics: [tmpl.genre, "Academic Archive", "Comprehensive Volume"],
    pageCount: 320 + i * 15,
    chapters: chapterTitles.map((ct, cIdx) => ({
      title: ct,
      content: generateRichChapterContent(tmpl.title, tmpl.author, tmpl.genre, ct, cIdx + 1)
    }))
  });
});

const INITIAL_USERS = [
  {
    id: "user-admin",
    email: "admin@library.com",
    name: "Dr. Eleanor Vance (Head Librarian)",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    memberSince: "2023-01-15",
    department: "Library Administration"
  },
  {
    id: "user-student",
    email: "student@library.com",
    name: "Alex Morgan",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    memberSince: "2024-02-10",
    department: "Computer Science"
  },
  {
    id: "user-teacher",
    email: "teacher@library.com",
    name: "Prof. David Harrison",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    memberSince: "2023-09-01",
    department: "Physics Department"
  }
];

const INITIAL_LOANS = [
  {
    id: "loan-1",
    userId: "user-student",
    bookId: "book-1",
    bookTitle: "Clean Code Architecture & Systems",
    borrowDate: "2026-08-25",
    dueDate: "2026-09-10",
    status: "Active",
    renewedCount: 0
  },
  {
    id: "loan-2",
    userId: "user-student",
    bookId: "book-3",
    bookTitle: "Quantum Physics & Cosmos Mechanics",
    borrowDate: "2026-08-10",
    dueDate: "2026-08-26",
    status: "Overdue",
    fineAmount: 4.50,
    renewedCount: 1
  }
];

const INITIAL_FAVORITES = [
  { userId: "user-student", bookId: "book-1" },
  { userId: "user-student", bookId: "book-6" },
  { userId: "user-student", bookId: "book-13" },
  { userId: "user-student", bookId: "book-23" },
  { userId: "user-student", bookId: "book-28" }
];

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    bookId: "book-1",
    userId: "user-student",
    userName: "Alex Morgan",
    rating: 5,
    comment: "Essential reading for every programmer. All 5 chapters are packed with extensive refactoring wisdom and code examples!",
    date: "2026-08-28"
  },
  {
    id: "rev-2",
    bookId: "book-3",
    userId: "user-teacher",
    userName: "Prof. David Harrison",
    rating: 5,
    comment: "Brilliant explanation of quantum entanglement and wave-particle duality. Extensive longform reading!",
    date: "2026-08-20"
  }
];

function initDB(forceReset = false) {
  if (!fs.existsSync(DB_FILE) || forceReset) {
    const data = {
      books: INITIAL_BOOKS,
      users: INITIAL_USERS,
      loans: INITIAL_LOANS,
      favorites: INITIAL_FAVORITES,
      reviews: INITIAL_REVIEWS
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    console.log("Database initialized with topic-specific cover images for all 32+ books.");
  }
}

function readDB() {
  initDB();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  initDB,
  readDB,
  writeDB
};
