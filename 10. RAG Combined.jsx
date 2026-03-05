import { useState, useEffect, useRef } from 'react';

// ============================================================
// FILE: 39. RAG- Basics
// ============================================================


// ── Design Tokens ──────────────────────────────────────────────
const FONTS = {
  heading: "'Fraunces', serif",
  body: "'Source Sans 3', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const COLORS = {
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  dark: "#0F172A",
  darkAlt: "#1E293B",
  text: "#334155",
  textLight: "#475569",
  muted: "#64748B",
  mutedLight: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  accent: "#0D9488",
  accentLight: "#5EEAD4",
  purple: "#7C3AED",
};

// ── Data ───────────────────────────────────────────────────────
const ragSteps = [
  {
    id: 1,
    title: "Document Ingestion",
    icon: "📥",
    color: "#0D9488",
    shortDesc: "Load and prepare your knowledge base documents",
    detail: `Document Ingestion is the very first step in building a RAG system. Think of it as "feeding" your AI system with all the knowledge it needs to answer questions accurately.

In this phase, you gather all relevant documents — PDFs, web pages, databases, text files, spreadsheets, or any structured/unstructured data — and load them into your pipeline. The goal is to make raw information accessible for the next processing stages.`,
    keyPoints: [
      "Collect documents from various sources (PDFs, databases, APIs, web scraping)",
      "Normalize formats — convert everything to a consistent text representation",
      "Handle metadata extraction (author, date, source URL, document type)",
      "Implement error handling for corrupted or unreadable files",
      "Consider document versioning to keep knowledge up-to-date"
    ],
    example: {
      title: "Python Example — Loading Documents",
      code: `from langchain.document_loaders import (
    PyPDFLoader, 
    TextLoader, 
    WebBaseLoader
)

# Load a PDF document
pdf_loader = PyPDFLoader("medical_guidelines.pdf")
pdf_docs = pdf_loader.load()

# Load a plain text file
text_loader = TextLoader("research_notes.txt")
text_docs = text_loader.load()

# Load content from a web page
web_loader = WebBaseLoader("https://example.com/article")
web_docs = web_loader.load()

# Combine all documents
all_documents = pdf_docs + text_docs + web_docs
print(f"Total documents loaded: {len(all_documents)}")
print(f"First doc preview: {all_documents[0].page_content[:200]}")`
    },
    example2: {
      title: "Real-World Scenario",
      text: `Imagine you're building a customer support chatbot for a university. Your document ingestion step would involve loading:
      
• Student handbook (PDF) — contains policies and procedures
• Course catalog (database) — lists all courses and prerequisites  
• FAQ pages (web scraping) — common questions from the website
• IT support tickets (CSV) — past resolved issues and solutions

Each source requires a different loader, but the output is always a unified list of text documents ready for the next step.`
    }
  },
  {
    id: 2,
    title: "Text Chunking",
    icon: "✂️",
    color: "#7C3AED",
    shortDesc: "Split documents into smaller, meaningful pieces",
    detail: `Text Chunking is the process of breaking large documents into smaller, digestible pieces called "chunks." This is crucial because embedding models and LLMs have token limits, and smaller chunks lead to more precise retrieval.

The art of chunking lies in finding the right balance — chunks should be small enough to be specific but large enough to retain meaningful context. Poor chunking leads to poor retrieval, which leads to poor answers.`,
    keyPoints: [
      "Chunk size matters — typically 200-1000 tokens work well",
      "Overlap between chunks preserves context across boundaries",
      "Recursive splitting respects document structure (paragraphs, sections)",
      "Semantic chunking groups related sentences together",
      "Metadata should be preserved with each chunk for traceability"
    ],
    example: {
      title: "Python Example — Chunking Strategies",
      code: `from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    TokenTextSplitter
)

# Strategy 1: Recursive Character Splitting
# Splits by paragraphs, then sentences, then words
recursive_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # Max characters per chunk
    chunk_overlap=50,      # Overlap between chunks
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)
chunks = recursive_splitter.split_documents(all_documents)

# Strategy 2: Token-based Splitting
# More precise for LLM token limits
token_splitter = TokenTextSplitter(
    chunk_size=256,        # Max tokens per chunk
    chunk_overlap=20       # Token overlap
)
token_chunks = token_splitter.split_documents(all_documents)

print(f"Recursive chunks: {len(chunks)}")
print(f"Token chunks: {len(token_chunks)}")
print(f"Sample chunk: {chunks[0].page_content[:150]}...")`
    },
    example2: {
      title: "Chunking Analogy",
      text: `Think of chunking like organizing a textbook for studying:

📖 The full textbook = Your original document
📑 Chapters = Too large for precise search  
📄 Sections = Good — focused on one topic each
📝 Paragraphs = Even more precise for specific facts
✏️ Sentences = Too small — loses context

The "sweet spot" is usually section-level chunks (200-500 tokens) with some overlap so that if a concept spans two chunks, both chunks capture it.`
    }
  },
  {
    id: 3,
    title: "Embedding Generation",
    icon: "🧮",
    color: "#DC2626",
    shortDesc: "Convert text chunks into numerical vector representations",
    detail: `Embedding Generation transforms human-readable text into dense numerical vectors (arrays of numbers) that capture semantic meaning. These vectors exist in a high-dimensional space where similar concepts are positioned close together.

This is the mathematical backbone of RAG — it allows the system to understand meaning rather than just matching keywords. The sentence "The cat sat on the mat" and "A feline rested on the rug" would have very similar embeddings despite sharing almost no words.`,
    keyPoints: [
      "Embeddings capture semantic meaning, not just keywords",
      "Popular models: OpenAI text-embedding-ada-002, Sentence-BERT, Cohere embed",
      "Vector dimensions typically range from 384 to 1536",
      "Cosine similarity measures how close two vectors are",
      "Choose embedding models based on your domain and language needs"
    ],
    example: {
      title: "Python Example — Creating Embeddings",
      code: `from langchain.embeddings import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer
import numpy as np

# Option 1: OpenAI Embeddings (cloud-based)
openai_embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002"
)
vector = openai_embeddings.embed_query("What is machine learning?")
print(f"Vector dimension: {len(vector)}")  # 1536

# Option 2: Local Embeddings (free, runs on your machine)
local_model = SentenceTransformer('all-MiniLM-L6-v2')
sentences = [
    "Machine learning is a subset of AI",
    "Deep learning uses neural networks", 
    "I love eating pizza"
]
vectors = local_model.encode(sentences)

# Check similarity — related sentences are closer
from numpy.linalg import norm
def cosine_sim(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))

print(f"ML vs DL similarity: {cosine_sim(vectors[0], vectors[1]):.3f}")
print(f"ML vs Pizza similarity: {cosine_sim(vectors[0], vectors[2]):.3f}")`
    },
    example2: {
      title: "Understanding Embeddings Visually",
      text: `Imagine a 3D space where every concept has a position:

🟢 "dog" → [0.8, 0.2, 0.9]
🟢 "puppy" → [0.79, 0.21, 0.88]  ← Very close to "dog"!
🔵 "cat" → [0.7, 0.3, 0.85]      ← Nearby (also a pet)
🔴 "airplane" → [0.1, 0.9, 0.2]  ← Far away (different concept)

In reality, embeddings use 384-1536 dimensions (not just 3), which allows them to capture incredibly nuanced relationships between concepts like tone, formality, domain, and specificity.`
    }
  },
  {
    id: 4,
    title: "Vector Store Indexing",
    icon: "🗄️",
    color: "#EA580C",
    shortDesc: "Store embeddings in a specialized database for fast retrieval",
    detail: `Vector Store Indexing is where you save all your generated embeddings into a specialized database designed for lightning-fast similarity searches. Unlike traditional databases that match exact values, vector stores find the "most similar" vectors using distance metrics.

Think of it as building a highly organized library where books aren't sorted alphabetically, but by meaning — so books about similar topics are physically next to each other on the shelves.`,
    keyPoints: [
      "Vector databases: Pinecone, Weaviate, ChromaDB, FAISS, Qdrant, Milvus",
      "Indexing algorithms: HNSW, IVF, PQ for efficient nearest-neighbor search",
      "Metadata filters allow combining semantic + structured search",
      "Persistence ensures your index survives restarts",
      "Batch insertion is more efficient than one-by-one"
    ],
    example: {
      title: "Python Example — Building a Vector Store",
      code: `import chromadb
from langchain.vectorstores import Chroma, FAISS
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# Option 1: ChromaDB (simple, local, persistent)
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="university_docs"
)
vectorstore.persist()  # Save to disk

# Option 2: FAISS (Facebook AI, very fast, in-memory)
faiss_store = FAISS.from_documents(
    documents=chunks,
    embedding=embeddings
)
faiss_store.save_local("./faiss_index")

# Later, reload the index without re-embedding
loaded_store = FAISS.load_local(
    "./faiss_index", 
    embeddings
)
print(f"Index contains {loaded_store.index.ntotal} vectors")`
    },
    example2: {
      title: "Choosing a Vector Database",
      text: `Here's a quick comparison for beginners:

🟢 ChromaDB — Best for learning and prototyping. Free, runs locally, simple API. Start here!

🔵 FAISS — Best for speed. Created by Meta/Facebook. Blazing fast but no built-in persistence.

🟡 Pinecone — Best for production. Fully managed cloud service. Scales automatically but costs money.

🟣 Weaviate — Best for hybrid search. Combines vector + keyword search. Open-source with cloud option.

🔴 Qdrant — Best for filtering. Excellent metadata filtering with vector search. Rust-based, very fast.

For learning RAG, start with ChromaDB. Move to Pinecone or Qdrant when you need production scale.`
    }
  },
  {
    id: 5,
    title: "Query Processing",
    icon: "🔍",
    color: "#2563EB",
    shortDesc: "Transform user questions into effective search queries",
    detail: `Query Processing is the step where a user's natural language question is prepared for retrieval. This isn't just about embedding the query — it involves understanding intent, expanding the query, and sometimes reformulating it for better retrieval.

A user might ask "How do I fix my WiFi?" but the knowledge base might contain documents titled "Network Troubleshooting Guide." Query processing bridges this gap by understanding the underlying intent and reformulating when needed.`,
    keyPoints: [
      "Embed the user query using the SAME model used for documents",
      "Query expansion adds synonyms and related terms",
      "HyDE (Hypothetical Document Embeddings) generates a hypothetical answer first",
      "Multi-query retrieval creates multiple reformulations of the same question",
      "Intent classification helps route to the right knowledge base"
    ],
    example: {
      title: "Python Example — Advanced Query Processing",
      code: `from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain.chat_models import ChatOpenAI

# Basic query embedding + retrieval
query = "What are the prerequisites for CS 101?"
results = vectorstore.similarity_search(query, k=4)

# Advanced: Multi-Query Retrieval
# Generates multiple versions of the question for better coverage
llm = ChatOpenAI(temperature=0)
multi_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 3}
    ),
    llm=llm
)
# This internally generates queries like:
# "What courses must I complete before CS 101?"
# "CS 101 prerequisite requirements"  
# "Required prior coursework for CS 101"
docs = multi_retriever.get_relevant_documents(query)

# HyDE: Generate hypothetical answer, then search
from langchain.chains import HypotheticalDocumentEmbedder
hyde = HypotheticalDocumentEmbedder.from_llm(
    llm=llm,
    base_embeddings=embeddings,
    prompt_key="web_search"
)`
    },
    example2: {
      title: "Why Query Processing Matters",
      text: `Consider this real scenario:

User asks: "Can I take AI class without math?"

Without processing: Searches for exact phrase match — might miss relevant docs.

With processing, the system generates:
  → "Prerequisites for artificial intelligence course"
  → "Mathematics requirements for AI classes"
  → "Can students enroll in AI without calculus?"

Each reformulation catches different relevant documents that the original phrasing might miss. This dramatically improves retrieval quality and ensures the final answer is comprehensive.`
    }
  },
  {
    id: 6,
    title: "Retrieval & Ranking",
    icon: "🎯",
    color: "#059669",
    shortDesc: "Find and rank the most relevant chunks for the query",
    detail: `Retrieval & Ranking is where the system searches the vector store and returns the most relevant document chunks for the user's query. But raw similarity search isn't always enough — re-ranking ensures the truly best results float to the top.

This is a two-stage process: first, cast a wide net with fast approximate search (retrieve top 20-50 candidates), then apply a more sophisticated re-ranking model to select the final top 3-5 most relevant chunks.`,
    keyPoints: [
      "Similarity search finds the k nearest vectors (k-NN search)",
      "MMR (Maximum Marginal Relevance) balances relevance with diversity",
      "Cross-encoder re-rankers provide more accurate relevance scores",
      "Hybrid search combines dense vectors with sparse keyword matching (BM25)",
      "Score thresholds filter out irrelevant results even if they're the 'closest'"
    ],
    example: {
      title: "Python Example — Retrieval with Re-Ranking",
      code: `from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import (
    CohereRerank
)

# Basic similarity search
results = vectorstore.similarity_search_with_score(
    query="graduation requirements",
    k=5
)
for doc, score in results:
    print(f"Score: {score:.4f} | {doc.page_content[:80]}...")

# MMR Search — diverse results (avoids redundancy)
mmr_results = vectorstore.max_marginal_relevance_search(
    query="graduation requirements",
    k=4,           # Return 4 documents
    fetch_k=20,    # Consider top 20 candidates
    lambda_mult=0.7  # Balance: 0=max diversity, 1=max relevance
)

# Re-Ranking with Cohere (most accurate)
compressor = CohereRerank(top_n=3)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(
        search_kwargs={"k": 20}
    )
)
reranked = compression_retriever.get_relevant_documents(
    "What GPA do I need to graduate?"
)`
    },
    example2: {
      title: "Two-Stage Retrieval Explained",
      text: `Stage 1 — Fast Retrieval (Bi-Encoder):
🔍 Searches millions of chunks in milliseconds
📊 Uses pre-computed embeddings (very fast)
📋 Returns top 20 candidates (rough ranking)
⚡ Like scanning book titles in a library

Stage 2 — Precise Re-Ranking (Cross-Encoder):
🎯 Analyzes query + document together (slower but accurate)
📊 Gives precise relevance scores
📋 Selects final top 3-5 results
🔬 Like reading the first paragraph of each book

This two-stage approach gives you both speed AND accuracy.`
    }
  },
  {
    id: 7,
    title: "Context Assembly & Prompting",
    icon: "🧩",
    color: "#B45309",
    shortDesc: "Combine retrieved context with the query into an LLM prompt",
    detail: `Context Assembly is where you craft the final prompt that will be sent to the Large Language Model (LLM). This step combines the user's original question with the retrieved document chunks in a structured prompt template.

The quality of your prompt template dramatically affects output quality. A well-designed prompt tells the LLM exactly how to use the retrieved context, what to do when the context doesn't contain the answer, and what format to respond in.`,
    keyPoints: [
      "Structure the prompt with clear sections: context, question, instructions",
      "Include source attribution instructions for traceability",
      "Add guardrails: 'If the context doesn't contain the answer, say so'",
      "Manage token budget — leave room for both context and response",
      "Use few-shot examples in the prompt for consistent output format"
    ],
    example: {
      title: "Python Example — Prompt Engineering for RAG",
      code: `from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# Professional RAG Prompt Template
rag_prompt = PromptTemplate(
    template="""You are a helpful university assistant. Answer 
the student's question using ONLY the provided context. 

RULES:
1. Base your answer strictly on the context below
2. If the context doesn't contain the answer, say: 
   "I don't have enough information to answer that."
3. Cite which document(s) you used
4. Be concise but thorough

CONTEXT:
{context}

STUDENT QUESTION: {question}

HELPFUL ANSWER:""",
    input_variables=["context", "question"]
)

# Build the full RAG chain
llm = ChatOpenAI(model="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # Stuffs all docs into one prompt
    retriever=vectorstore.as_retriever(k=4),
    chain_type_kwargs={"prompt": rag_prompt},
    return_source_documents=True
)

# Ask a question!
response = qa_chain({"query": "What is the deadline for dropping a class?"})
print(response["result"])
print("Sources:", [d.metadata for d in response["source_documents"]])`
    },
    example2: {
      title: "Prompt Template Best Practices",
      text: `A great RAG prompt template has these components:

🎭 Role: "You are a [specific role] assistant..."
   Gives the LLM a persona and expertise area.

📋 Context Block: "Based on the following documents: {context}"
   Clearly delineates retrieved information.

❓ Question: "User Question: {question}"
   Separates the actual query from context.

⚠️ Guardrails: "Only use the provided context. If unsure, say so."
   Prevents hallucination and made-up answers.

📐 Format: "Respond in 2-3 sentences with bullet points if needed."
   Controls output structure and length.

🔗 Attribution: "Cite the source document for each claim."
   Enables verification and builds trust.`
    }
  },
  {
    id: 8,
    title: "Response Generation & Evaluation",
    icon: "✨",
    color: "#9333EA",
    shortDesc: "Generate the final answer and evaluate its quality",
    detail: `Response Generation is the final step where the LLM produces the answer based on the assembled prompt. But generating an answer isn't enough — you need to evaluate whether the response is accurate, grounded in the retrieved context, and actually helpful.

Evaluation in RAG has unique metrics beyond traditional NLP: faithfulness (does the answer stick to the context?), relevancy (is the retrieved context relevant?), and answer correctness (is the final answer right?).`,
    keyPoints: [
      "Faithfulness: Does the answer only use information from the context?",
      "Context Relevancy: Were the retrieved chunks actually relevant?",
      "Answer Relevancy: Does the answer actually address the question?",
      "Use RAGAS framework for automated RAG evaluation",
      "Human evaluation remains the gold standard for quality assessment"
    ],
    example: {
      title: "Python Example — RAG Evaluation with RAGAS",
      code: `from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset

# Prepare evaluation data
eval_data = {
    "question": [
        "What is the deadline for dropping a class?",
        "How do I apply for financial aid?"
    ],
    "answer": [
        qa_chain({"query": q})["result"] 
        for q in ["What is the deadline...", "How do I apply..."]
    ],
    "contexts": [
        [doc.page_content for doc in retrieved_docs_q1],
        [doc.page_content for doc in retrieved_docs_q2]
    ],
    "ground_truth": [
        "Students can drop classes until week 10.",
        "Apply through the FAFSA portal by March 1."
    ]
}

dataset = Dataset.from_dict(eval_data)

# Run evaluation
results = evaluate(
    dataset,
    metrics=[
        faithfulness,        # 0-1: stays true to context
        answer_relevancy,    # 0-1: answers the question
        context_precision,   # 0-1: retrieved docs are relevant
        context_recall       # 0-1: all needed info was retrieved
    ]
)
print(results)
# {'faithfulness': 0.92, 'answer_relevancy': 0.88, ...}`
    },
    example2: {
      title: "Common RAG Failure Modes",
      text: `Understanding what can go wrong helps you build better systems:

❌ Hallucination: LLM makes up information not in the context
   Fix: Stronger prompt guardrails + faithfulness evaluation

❌ Wrong Retrieval: System finds irrelevant chunks
   Fix: Better chunking + re-ranking + hybrid search

❌ Missing Context: Answer exists in docs but wasn't retrieved
   Fix: Increase k value + multi-query retrieval

❌ Lost in the Middle: LLM ignores context in the middle of long prompts
   Fix: Put most relevant chunks first and last

❌ Over-Reliance: System can't say "I don't know"
   Fix: Add confidence thresholds + explicit "no answer" instructions`
    }
  }
];

const architectureConcepts = [
  {
    name: "Naive RAG",
    desc: "Simple retrieve-then-generate pipeline. Good for learning, limited in production.",
    flow: ["Query → Embed → Retrieve → Generate"],
    level: "Beginner"
  },
  {
    name: "Advanced RAG",
    desc: "Adds pre-retrieval optimization and post-retrieval re-ranking for better accuracy.",
    flow: ["Query Rewrite → Embed → Retrieve → Re-Rank → Generate"],
    level: "Intermediate"
  },
  {
    name: "Modular RAG",
    desc: "Flexible architecture with interchangeable components. Production-ready systems.",
    flow: ["Route → Retrieve + Search → Fuse → Re-Rank → Generate → Evaluate"],
    level: "Advanced"
  }
];

const glossary = [
  { term: "Embedding", def: "A numerical vector representation of text that captures semantic meaning." },
  { term: "Vector Store", def: "A specialized database for storing and querying high-dimensional vectors." },
  { term: "Chunk", def: "A small segment of text split from a larger document for processing." },
  { term: "k-NN", def: "k-Nearest Neighbors — finding the k most similar vectors to a query." },
  { term: "Cosine Similarity", def: "A metric measuring the angle between two vectors (1 = identical, 0 = unrelated)." },
  { term: "Hallucination", def: "When an LLM generates information not supported by the provided context." },
  { term: "Re-Ranking", def: "A second-pass scoring of retrieved documents for more accurate relevance ordering." },
  { term: "Tokenization", def: "Breaking text into tokens (words/subwords) that models can process." },
  { term: "Retriever", def: "The component responsible for finding relevant documents from the knowledge base." },
  { term: "Context Window", def: "The maximum number of tokens an LLM can process in a single prompt." },
  { term: "BM25", def: "A keyword-based ranking algorithm used in hybrid search alongside vector search." },
  { term: "HNSW", def: "Hierarchical Navigable Small World — a fast approximate nearest-neighbor index algorithm." }
];

const quizQuestions = [
  {
    q: "What is the primary purpose of text chunking in RAG?",
    options: [
      "To make documents look prettier",
      "To break documents into smaller pieces for precise retrieval",
      "To compress documents and save storage",
      "To translate documents into different languages"
    ],
    correct: 1
  },
  {
    q: "What do embeddings represent?",
    options: [
      "The physical location of a document",
      "A numerical vector capturing semantic meaning of text",
      "The number of words in a document",
      "A hash code for document identification"
    ],
    correct: 1
  },
  {
    q: "Why is re-ranking important in RAG?",
    options: [
      "It makes the system faster",
      "It reduces storage costs",
      "It provides more accurate relevance scoring after initial retrieval",
      "It translates queries into SQL"
    ],
    correct: 2
  },
  {
    q: "What does 'faithfulness' measure in RAG evaluation?",
    options: [
      "How fast the system responds",
      "Whether the answer only uses information from the retrieved context",
      "How many documents were retrieved",
      "The grammatical correctness of the response"
    ],
    correct: 1
  },
  {
    q: "Which is the recommended chunk size range for most RAG applications?",
    options: [
      "10-50 tokens",
      "200-1000 tokens",
      "5000-10000 tokens",
      "The entire document as one chunk"
    ],
    correct: 1
  },
  {
    q: "What is HyDE in query processing?",
    options: [
      "A vector database",
      "A chunking algorithm",
      "Generating a hypothetical answer to improve search",
      "A programming language for RAG"
    ],
    correct: 2
  }
];

// ── Components ─────────────────────────────────────────────────
function CodeBlock({ code, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: COLORS.dark,
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 16,
        border: `1px solid ${COLORS.darkAlt}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: COLORS.darkAlt,
          borderBottom: "1px solid #334155",
        }}
      >
        <span style={{ color: COLORS.mutedLight, fontSize: 13, fontFamily: FONTS.mono }}>
          {title}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "#059669" : "#334155",
            border: "none",
            color: "#E2E8F0",
            padding: "4px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 12,
            transition: "all 0.2s",
            fontFamily: FONTS.mono,
          }}
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: 20,
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.7,
          color: "#E2E8F0",
          fontFamily: FONTS.mono,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function StepCard({ step, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${step.color}15, ${step.color}08)`
          : COLORS.surface,
        border: `2px solid ${isActive ? step.color : COLORS.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive
          ? `0 8px 30px ${step.color}20`
          : "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: "100%",
            background: step.color,
            borderRadius: "0 4px 4px 0",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${step.color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {step.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: step.color,
                background: `${step.color}15`,
                padding: "2px 8px",
                borderRadius: 20,
                fontFamily: FONTS.mono,
              }}
            >
              STEP {step.id}
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.dark,
                fontFamily: FONTS.heading,
              }}
            >
              {step.title}
            </h3>
          </div>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13.5,
              color: COLORS.muted,
              lineHeight: 1.4,
              fontFamily: FONTS.body,
            }}
          >
            {step.shortDesc}
          </p>
        </div>
        <div
          style={{
            fontSize: 18,
            color: isActive ? step.color : "#CBD5E1",
            transition: "all 0.3s",
            transform: isActive ? "rotate(90deg)" : "rotate(0)",
          }}
        >
          ▶
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === quizQuestions[currentQ].correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}
        </div>
        <h3
          style={{
            fontSize: 28,
            fontFamily: FONTS.heading,
            color: COLORS.dark,
            margin: "0 0 8px",
          }}
        >
          {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good Job!" : "Keep Learning!"}
        </h3>
        <p style={{ fontSize: 18, color: COLORS.muted, fontFamily: FONTS.body }}>
          You scored{" "}
          <strong style={{ color: COLORS.accent }}>
            {score}/{quizQuestions.length}
          </strong>{" "}
          ({pct}%)
        </p>
        <button
          onClick={restart}
          style={{
            marginTop: 20,
            padding: "12px 32px",
            background: COLORS.accent,
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            cursor: "pointer",
            fontWeight: 600,
            fontFamily: FONTS.body,
          }}
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentQ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 13, color: COLORS.muted, fontFamily: FONTS.mono }}>
          Question {currentQ + 1} of {quizQuestions.length}
        </span>
        <span
          style={{
            fontSize: 13,
            color: COLORS.accent,
            fontWeight: 600,
            fontFamily: FONTS.mono,
          }}
        >
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: COLORS.border,
          borderRadius: 2,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: `${((currentQ + 1) / quizQuestions.length) * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.purple})`,
            borderRadius: 2,
            transition: "width 0.5s",
          }}
        />
      </div>

      <h4
        style={{
          fontSize: 18,
          color: COLORS.dark,
          marginBottom: 20,
          lineHeight: 1.5,
          fontFamily: FONTS.body,
          fontWeight: 600,
        }}
      >
        {q.q}
      </h4>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, idx) => {
          let bg = COLORS.bg;
          let border = COLORS.border;
          let color = COLORS.text;

          if (answered) {
            if (idx === q.correct) {
              bg = "#ECFDF5";
              border = "#059669";
              color = "#065F46";
            } else if (idx === selected && idx !== q.correct) {
              bg = "#FEF2F2";
              border = "#DC2626";
              color = "#991B1B";
            }
          } else if (idx === selected) {
            bg = "#F0F9FF";
            border = "#2563EB";
            color = "#1E40AF";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              style={{
                padding: "14px 18px",
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: 10,
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
                fontSize: 15,
                color,
                transition: "all 0.2s",
                fontFamily: FONTS.body,
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  marginRight: 10,
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                }}
              >
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <button
            onClick={nextQuestion}
            style={{
              padding: "10px 28px",
              background: COLORS.accent,
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONTS.body,
            }}
          >
            {currentQ < quizQuestions.length - 1 ? "Next Question →" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
function RAGBasics() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("steps");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.def.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const tabs = [
    { id: "steps", label: "Step-by-Step Guide", icon: "📖" },
    { id: "architecture", label: "Architectures", icon: "🏗️" },
    { id: "glossary", label: "Glossary", icon: "📚" },
    { id: "quiz", label: "Knowledge Check", icon: "🧪" },
  ];

  const step = ragSteps[activeStep];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: FONTS.body }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;900&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Hero Header ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.darkAlt} 50%, ${COLORS.dark} 100%)`,
          position: "relative",
          overflow: "hidden",
          padding: "56px 24px 48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.mutedLight} 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent}30, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.purple}20, transparent 70%)`,
          }}
        />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${COLORS.accent}25`,
              border: `1px solid ${COLORS.accent}40`,
              borderRadius: 24,
              padding: "6px 16px",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 14 }}>🤖</span>
            <span
              style={{
                fontSize: 13,
                color: COLORS.accentLight,
                fontWeight: 600,
                letterSpacing: 0.5,
                fontFamily: FONTS.mono,
              }}
            >
              COMPLETE BEGINNER'S GUIDE
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 900,
              color: COLORS.bg,
              margin: "0 0 16px",
              lineHeight: 1.1,
              fontFamily: FONTS.heading,
            }}
          >
            Retrieval-Augmented{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2DD4BF, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Generation
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: COLORS.mutedLight,
              maxWidth: 650,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Master the art of building AI systems that retrieve real knowledge before
            generating answers. From document loading to evaluation — every step explained
            with code and examples.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 28 }}>
            {[
              { icon: "📄", label: "8 Detailed Steps" },
              { icon: "💻", label: "Code Examples" },
              { icon: "🧪", label: "Interactive Quiz" },
              { icon: "🎯", label: "Real-World Scenarios" },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#CBD5E1",
                  fontSize: 14,
                }}
              >
                <span>{f.icon}</span>
                <span style={{ fontFamily: FONTS.body }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What is RAG ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 0" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #ECFDF5, #F0FDFA)",
            border: "2px solid #99F6E4",
            borderRadius: 16,
            padding: 28,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.dark,
              margin: "0 0 12px",
              fontFamily: FONTS.heading,
            }}
          >
            🤔 What is RAG?
          </h2>
          <p style={{ fontSize: 16, color: COLORS.text, lineHeight: 1.75, margin: "0 0 16px" }}>
            <strong>Retrieval-Augmented Generation (RAG)</strong> is a technique that enhances
            Large Language Models (LLMs) by giving them access to external knowledge before
            they generate a response. Instead of relying solely on what the model memorized
            during training, RAG <em>retrieves</em> relevant documents from a knowledge base
            and <em>augments</em> the LLM's prompt with this information.
          </p>
          <p style={{ fontSize: 16, color: COLORS.text, lineHeight: 1.75, margin: 0 }}>
            Think of it like an open-book exam: the LLM can look up specific facts in its
            "textbook" (your documents) before answering, instead of relying purely on memory.
            This dramatically reduces hallucinations, enables domain-specific answers, and
            keeps knowledge up-to-date without retraining the model.
          </p>
          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              background: COLORS.surface,
              borderRadius: 12,
              border: "1px solid #D1FAE5",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                color: COLORS.accent,
                textAlign: "center",
                lineHeight: 2.2,
              }}
            >
              User Question → <strong>Retrieve</strong> Relevant Docs →{" "}
              <strong>Augment</strong> Prompt with Context → <strong>Generate</strong>{" "}
              Grounded Answer
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            background: COLORS.surface,
            borderRadius: 14,
            padding: 6,
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                minWidth: 140,
                padding: "12px 16px",
                background: activeTab === tab.id ? COLORS.dark : "transparent",
                color: activeTab === tab.id ? COLORS.surface : COLORS.muted,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.3s",
                fontFamily: FONTS.body,
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* ═══ STEP-BY-STEP TAB ═══ */}
        {activeTab === "steps" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {ragSteps.map((s, idx) => (
                <StepCard key={s.id} step={s} isActive={activeStep === idx} onClick={() => setActiveStep(idx)} />
              ))}
            </div>

            {/* Expanded Step Detail */}
            <div
              style={{
                background: COLORS.surface,
                borderRadius: 20,
                border: `2px solid ${step.color}30`,
                boxShadow: `0 12px 40px ${step.color}10`,
                overflow: "hidden",
              }}
            >
              {/* Detail header */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${step.color}12, ${step.color}05)`,
                  padding: "28px 32px",
                  borderBottom: `1px solid ${step.color}20`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 36 }}>{step.icon}</span>
                  <div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: step.color,
                        fontFamily: FONTS.mono,
                      }}
                    >
                      STEP {step.id} OF 8
                    </span>
                    <h2
                      style={{
                        margin: "4px 0 0",
                        fontSize: 26,
                        fontWeight: 700,
                        color: COLORS.dark,
                        fontFamily: FONTS.heading,
                      }}
                    >
                      {step.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div style={{ padding: "28px 32px" }}>
                {/* Description */}
                <div
                  style={{
                    fontSize: 16,
                    color: COLORS.text,
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                    marginBottom: 28,
                  }}
                >
                  {step.detail}
                </div>

                {/* Key Points */}
                <div
                  style={{
                    background: COLORS.bg,
                    borderRadius: 14,
                    padding: 24,
                    marginBottom: 28,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.dark,
                      margin: "0 0 16px",
                      fontFamily: FONTS.heading,
                    }}
                  >
                    🔑 Key Points
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {step.keyPoints.map((point, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: `${step.color}15`,
                            color: step.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0,
                            fontFamily: FONTS.mono,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.6 }}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div style={{ marginBottom: 28 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.dark,
                      margin: "0 0 4px",
                      fontFamily: FONTS.heading,
                    }}
                  >
                    💻 Code Example
                  </h3>
                  <CodeBlock code={step.example.code} title={step.example.title} />
                </div>

                {/* Scenario / Analogy */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${step.color}08, ${step.color}04)`,
                    borderRadius: 14,
                    padding: 24,
                    border: `1px solid ${step.color}20`,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.dark,
                      margin: "0 0 12px",
                      fontFamily: FONTS.heading,
                    }}
                  >
                    💡 {step.example2.title}
                  </h3>
                  <div
                    style={{
                      fontSize: 15,
                      color: COLORS.textLight,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {step.example2.text}
                  </div>
                </div>

                {/* Navigation */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 28,
                    paddingTop: 20,
                    borderTop: `1px solid ${COLORS.border}`,
                  }}
                >
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    style={{
                      padding: "10px 20px",
                      background: activeStep === 0 ? COLORS.borderLight : COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      cursor: activeStep === 0 ? "default" : "pointer",
                      fontSize: 14,
                      color: activeStep === 0 ? "#CBD5E1" : COLORS.textLight,
                      fontWeight: 600,
                      fontFamily: FONTS.body,
                    }}
                  >
                    ← Previous Step
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(ragSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === ragSteps.length - 1}
                    style={{
                      padding: "10px 20px",
                      background: activeStep === ragSteps.length - 1 ? COLORS.borderLight : step.color,
                      border: "none",
                      borderRadius: 8,
                      cursor: activeStep === ragSteps.length - 1 ? "default" : "pointer",
                      fontSize: 14,
                      color: activeStep === ragSteps.length - 1 ? "#CBD5E1" : COLORS.surface,
                      fontWeight: 600,
                      fontFamily: FONTS.body,
                    }}
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ARCHITECTURE TAB ═══ */}
        {activeTab === "architecture" && (
          <div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.dark,
                marginBottom: 8,
                fontFamily: FONTS.heading,
              }}
            >
              RAG Architecture Patterns
            </h2>
            <p
              style={{
                fontSize: 16,
                color: COLORS.muted,
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              RAG systems evolve from simple retrieve-and-generate pipelines to modular,
              production-grade architectures. Understanding these patterns helps you choose
              the right complexity for your use case.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {architectureConcepts.map((arch, idx) => {
                const levelColor =
                  idx === 0 ? "#059669" : idx === 1 ? "#D97706" : "#DC2626";
                const levelBg =
                  idx === 0 ? "#ECFDF5" : idx === 1 ? "#FFFBEB" : "#FEF2F2";

                return (
                  <div
                    key={idx}
                    style={{
                      background: COLORS.surface,
                      borderRadius: 16,
                      padding: 28,
                      border: `1px solid ${COLORS.border}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 12,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: levelColor,
                            background: levelBg,
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontFamily: FONTS.mono,
                          }}
                        >
                          {arch.level}
                        </span>
                        <h3
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: COLORS.dark,
                            margin: "10px 0 8px",
                            fontFamily: FONTS.heading,
                          }}
                        >
                          {arch.name}
                        </h3>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 15,
                        color: COLORS.textLight,
                        lineHeight: 1.6,
                        margin: "0 0 18px",
                      }}
                    >
                      {arch.desc}
                    </p>
                    <div
                      style={{
                        background: COLORS.bg,
                        borderRadius: 10,
                        padding: "14px 20px",
                        border: `1px solid ${COLORS.border}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: COLORS.muted,
                          fontFamily: FONTS.mono,
                        }}
                      >
                        Pipeline Flow:
                      </span>
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 14,
                          color: COLORS.accent,
                          fontFamily: FONTS.mono,
                          fontWeight: 600,
                          lineHeight: 1.8,
                          wordBreak: "break-word",
                        }}
                      >
                        {arch.flow[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Architecture Diagram */}
            <div
              style={{
                marginTop: 32,
                background: COLORS.surface,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.dark,
                  margin: "0 0 20px",
                  fontFamily: FONTS.heading,
                }}
              >
                🏗️ Complete RAG Architecture Overview
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                }}
              >
                {[
                  {
                    phase: "Offline Indexing",
                    color: COLORS.purple,
                    items: [
                      "Document Ingestion",
                      "Text Chunking",
                      "Embedding Generation",
                      "Vector Store Indexing",
                    ],
                  },
                  {
                    phase: "Online Query",
                    color: "#2563EB",
                    items: [
                      "Query Processing",
                      "Retrieval & Ranking",
                      "Context Assembly",
                      "Response Generation",
                    ],
                  },
                  {
                    phase: "Evaluation Loop",
                    color: "#059669",
                    items: [
                      "Faithfulness Check",
                      "Relevancy Scoring",
                      "User Feedback",
                      "Continuous Improvement",
                    ],
                  },
                ].map((phase, i) => (
                  <div
                    key={i}
                    style={{
                      background: `${phase.color}08`,
                      borderRadius: 12,
                      padding: 18,
                      border: `1px solid ${phase.color}20`,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: phase.color,
                        margin: "0 0 12px",
                        fontFamily: FONTS.mono,
                      }}
                    >
                      {phase.phase}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {phase.items.map((item, j) => (
                        <div
                          key={j}
                          style={{
                            padding: "8px 12px",
                            background: COLORS.surface,
                            borderRadius: 8,
                            fontSize: 13,
                            color: COLORS.text,
                            fontWeight: 500,
                            borderLeft: `3px solid ${phase.color}`,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ GLOSSARY TAB ═══ */}
        {activeTab === "glossary" && (
          <div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.dark,
                marginBottom: 8,
                fontFamily: FONTS.heading,
              }}
            >
              RAG Glossary
            </h2>
            <p style={{ fontSize: 16, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
              Quick reference for key terms and concepts used throughout RAG systems.
            </p>

            <input
              type="text"
              placeholder="🔍 Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 12,
                border: `2px solid ${COLORS.border}`,
                fontSize: 15,
                marginBottom: 20,
                boxSizing: "border-box",
                fontFamily: FONTS.body,
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredGlossary.map((g, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.surface,
                    borderRadius: 12,
                    padding: "18px 22px",
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${COLORS.accent}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    📌
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: COLORS.dark,
                        margin: "0 0 4px",
                        fontFamily: FONTS.heading,
                      }}
                    >
                      {g.term}
                    </h4>
                    <p
                      style={{
                        fontSize: 14.5,
                        color: COLORS.textLight,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {g.def}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ QUIZ TAB ═══ */}
        {activeTab === "quiz" && (
          <div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.dark,
                marginBottom: 8,
                fontFamily: FONTS.heading,
              }}
            >
              🧪 Knowledge Check
            </h2>
            <p style={{ fontSize: 16, color: COLORS.muted, marginBottom: 24, lineHeight: 1.6 }}>
              Test your understanding of RAG concepts with this interactive quiz.
            </p>
            <div
              style={{
                background: COLORS.surface,
                borderRadius: 16,
                padding: 28,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Quiz />
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          background: COLORS.dark,
          padding: "36px 24px",
          textAlign: "center",
          borderTop: `1px solid ${COLORS.darkAlt}`,
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: COLORS.mutedLight,
            margin: "0 0 6px",
            fontFamily: FONTS.body,
          }}
        >
          RAG Basics — A Complete Interactive Guide
        </p>
        <p style={{ fontSize: 14, color: COLORS.muted, margin: 0, fontFamily: FONTS.mono }}>
          @BIL
        </p>
      </footer>
    </div>
  );
}

// ============================================================
// FILE: 40. RAG
// ============================================================


const ragData = {
  intro: {
    title: "Retrieval-Augmented Generation",
    subtitle: "The Complete Beginner-to-Master Guide",
    description:
      "RAG is a powerful AI architecture that combines the strengths of information retrieval systems with large language models (LLMs) to generate accurate, grounded, and up-to-date responses. Instead of relying solely on what an LLM memorized during training, RAG fetches relevant documents from an external knowledge base and feeds them into the model as context — dramatically reducing hallucinations and enabling domain-specific intelligence.",
  },
  whyRag: [
    {
      icon: "🧠",
      title: "Reduces Hallucinations",
      desc: "LLMs sometimes generate plausible but incorrect answers. RAG grounds responses in real retrieved documents, ensuring factual accuracy.",
      detail:
        "Without RAG, an LLM might confidently state incorrect dates, statistics, or facts. With RAG, every claim can be traced back to a source document, making outputs verifiable and trustworthy.",
    },
    {
      icon: "🔄",
      title: "Always Up-to-Date",
      desc: "LLMs have a training cutoff date. RAG lets you inject the latest information without retraining the entire model.",
      detail:
        "When new research papers, product updates, or policy changes occur, you simply update your knowledge base. The LLM immediately has access to the freshest information without any fine-tuning.",
    },
    {
      icon: "🏢",
      title: "Domain-Specific Knowledge",
      desc: "Embed your organization's proprietary data — internal docs, databases, and manuals — into an AI assistant.",
      detail:
        "A hospital can build a RAG system over medical records and clinical guidelines. A law firm can query case law. A software company can create an assistant over its entire codebase and documentation.",
    },
    {
      icon: "💰",
      title: "Cost-Effective",
      desc: "Fine-tuning large models is expensive. RAG achieves similar domain-specific results at a fraction of the cost.",
      detail:
        "Fine-tuning GPT-4 or similar models can cost thousands of dollars and requires curated training datasets. RAG only needs a vector database and an embedding model — often achievable with open-source tools.",
    },
    {
      icon: "🔐",
      title: "Data Privacy & Control",
      desc: "Your sensitive data stays in your own infrastructure. No need to send proprietary info to third-party training pipelines.",
      detail:
        "With RAG, documents are stored in your own vector database. The LLM only sees the retrieved chunks during inference, giving you full control over what information the AI can access.",
    },
    {
      icon: "📏",
      title: "Scalable & Modular",
      desc: "Easily swap out components — change the LLM, embedding model, or retrieval strategy independently.",
      detail:
        "RAG's modular architecture means you can upgrade individual components without rebuilding the entire system. Move from OpenAI to an open-source LLM, or switch from FAISS to Pinecone, all without changing your core logic.",
    },
  ],
  architecture: [
    {
      step: 1,
      title: "Document Ingestion",
      subtitle: "Loading & Preparing Your Data",
      icon: "📥",
      color: "#FF6B6B",
      description:
        "The first step is collecting and loading your raw data from various sources. This could be PDFs, Word documents, web pages, databases, APIs, or any text-based content. The goal is to gather all the knowledge you want your AI system to access.",
      details: [
        "Supported formats: PDF, DOCX, TXT, HTML, CSV, JSON, Markdown, and more",
        "Use document loaders from frameworks like LangChain, LlamaIndex, or custom parsers",
        "Handle metadata extraction (author, date, source URL, page numbers)",
        "Implement error handling for corrupted or malformed documents",
        "Consider OCR for scanned documents and image-based PDFs",
      ],
      code: `from langchain.document_loaders import (
    PyPDFLoader,
    DirectoryLoader,
    WebBaseLoader,
    CSVLoader
)

# Load a single PDF
loader = PyPDFLoader("company_handbook.pdf")
documents = loader.load()

# Load all PDFs from a directory
dir_loader = DirectoryLoader(
    "./knowledge_base/",
    glob="**/*.pdf",
    loader_cls=PyPDFLoader
)
all_docs = dir_loader.load()

# Load from a website
web_loader = WebBaseLoader(
    "https://docs.example.com/api-reference"
)
web_docs = web_loader.load()

print(f"Loaded {len(all_docs)} documents")
# Each document has: page_content, metadata`,
    },
    {
      step: 2,
      title: "Text Chunking",
      subtitle: "Splitting Documents into Digestible Pieces",
      icon: "✂️",
      color: "#4ECDC4",
      description:
        "Raw documents are often too large to fit into an LLM's context window or to be meaningfully compared via embeddings. Chunking breaks documents into smaller, semantically coherent pieces. The chunk size and overlap strategy significantly impact retrieval quality.",
      details: [
        "Chunk size typically ranges from 256 to 2048 tokens depending on the use case",
        "Overlap (usually 10-20% of chunk size) ensures context isn't lost at boundaries",
        "Recursive character splitting respects paragraph and sentence boundaries",
        "Semantic chunking groups text by meaning rather than fixed character counts",
        "Metadata preservation: each chunk retains info about its source document",
      ],
      code: `from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    TokenTextSplitter
)

# Method 1: Recursive Character Splitting
# (most common and recommended for general use)
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,       # max characters per chunk
    chunk_overlap=200,     # overlap between chunks
    length_function=len,
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)
chunks = splitter.split_documents(documents)

# Method 2: Token-based Splitting
# (better for controlling LLM input size)
token_splitter = TokenTextSplitter(
    chunk_size=512,        # max tokens per chunk
    chunk_overlap=50       # token overlap
)
token_chunks = token_splitter.split_documents(documents)

# Each chunk preserves metadata from parent doc
for chunk in chunks[:3]:
    print(f"Source: {chunk.metadata['source']}")
    print(f"Content: {chunk.page_content[:100]}...")
    print(f"Length: {len(chunk.page_content)} chars\\n")`,
    },
    {
      step: 3,
      title: "Embedding Generation",
      subtitle: "Converting Text to Vector Representations",
      icon: "🔢",
      color: "#45B7D1",
      description:
        "Embeddings convert text chunks into high-dimensional numerical vectors that capture semantic meaning. Similar concepts end up close together in vector space. This is the mathematical foundation that enables semantic search — finding documents by meaning rather than exact keyword matches.",
      details: [
        "Popular models: OpenAI text-embedding-ada-002, Sentence-Transformers, Cohere Embed",
        "Embedding dimensions typically range from 384 to 1536",
        "Cosine similarity is the most common distance metric for comparing embeddings",
        "Batch processing is essential for large document collections",
        "Consider domain-specific embedding models for specialized applications",
      ],
      code: `from langchain.embeddings import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer
import numpy as np

# Option 1: OpenAI Embeddings (cloud-based)
openai_embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002"
)
# Embed a single query
query_vector = openai_embeddings.embed_query(
    "What is our refund policy?"
)
print(f"Vector dimension: {len(query_vector)}")
# Output: Vector dimension: 1536

# Option 2: Open-Source (local, free)
local_model = SentenceTransformer(
    'all-MiniLM-L6-v2'  # Fast, good quality
)
sentences = [
    "The refund policy allows 30-day returns",
    "Machine learning uses neural networks",
    "Returns must include original packaging"
]
vectors = local_model.encode(sentences)

# Demonstrate semantic similarity
from numpy.linalg import norm
def cosine_sim(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))

# "refund policy" is closer to "returns" than "ML"
sim_1 = cosine_sim(vectors[0], vectors[2])  # ~0.72
sim_2 = cosine_sim(vectors[0], vectors[1])  # ~0.15
print(f"Refund ↔ Returns: {sim_1:.2f}")
print(f"Refund ↔ ML: {sim_2:.2f}")`,
    },
    {
      step: 4,
      title: "Vector Store Indexing",
      subtitle: "Storing Embeddings for Fast Retrieval",
      icon: "🗄️",
      color: "#96CEB4",
      description:
        "Once embeddings are generated, they need to be stored in a specialized vector database optimized for similarity search. These databases use algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) to find the most similar vectors in milliseconds, even across millions of documents.",
      details: [
        "Popular vector stores: Pinecone, Weaviate, Chroma, FAISS, Milvus, Qdrant",
        "FAISS (Facebook AI Similarity Search) is great for local development",
        "Pinecone and Weaviate offer managed cloud solutions with built-in scaling",
        "ChromaDB is lightweight and perfect for prototyping",
        "Index types: Flat (exact), IVF (approximate), HNSW (graph-based, fast)",
      ],
      code: `from langchain.vectorstores import Chroma, FAISS
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# Option 1: ChromaDB (simple, great for prototyping)
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="knowledge_base"
)
vectorstore.persist()  # Save to disk

# Option 2: FAISS (fast, local, by Meta)
faiss_store = FAISS.from_documents(
    documents=chunks,
    embedding=embeddings
)
faiss_store.save_local("./faiss_index")

# Later: reload the index
loaded_store = FAISS.load_local(
    "./faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

# Check collection stats
print(f"Total vectors stored: {vectorstore._collection.count()}")
# Output: Total vectors stored: 1247`,
    },
    {
      step: 5,
      title: "Query & Retrieval",
      subtitle: "Finding the Most Relevant Documents",
      icon: "🔍",
      color: "#FFEAA7",
      description:
        "When a user asks a question, the query is embedded using the same model and compared against all stored vectors. The top-k most similar chunks are retrieved. Advanced retrieval strategies like hybrid search (combining semantic + keyword search), re-ranking, and query transformation can significantly improve results.",
      details: [
        "Top-k retrieval: return the k most similar documents (typically k=3 to 10)",
        "Similarity threshold: filter out results below a minimum similarity score",
        "Hybrid search combines dense (vector) and sparse (BM25/keyword) retrieval",
        "MMR (Maximum Marginal Relevance) balances relevance with diversity",
        "Query transformation: rewrite, expand, or decompose complex queries",
      ],
      code: `# Basic similarity search
query = "What is the company's remote work policy?"
results = vectorstore.similarity_search(
    query,
    k=5  # Return top 5 matches
)

for i, doc in enumerate(results):
    print(f"Result {i+1}:")
    print(f"  Source: {doc.metadata.get('source')}")
    print(f"  Content: {doc.page_content[:150]}...\\n")

# Similarity search with scores
results_with_scores = vectorstore.similarity_search_with_score(
    query, k=5
)
for doc, score in results_with_scores:
    print(f"Score: {score:.4f} | {doc.page_content[:80]}...")

# Advanced: MMR for diverse results
mmr_results = vectorstore.max_marginal_relevance_search(
    query,
    k=5,
    fetch_k=20,     # Fetch 20 candidates
    lambda_mult=0.7  # Balance: 1=relevance, 0=diversity
)

# Advanced: Retriever with filtering
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={
        "score_threshold": 0.75,
        "k": 10,
        "filter": {"department": "HR"}
    }
)
filtered_docs = retriever.get_relevant_documents(query)`,
    },
    {
      step: 6,
      title: "Augmented Generation",
      subtitle: "Combining Context with LLM Intelligence",
      icon: "✨",
      color: "#DDA0DD",
      description:
        "The retrieved documents are injected into a carefully crafted prompt template along with the user's question. The LLM then generates a response grounded in the provided context. This is where the 'augmented' in RAG comes from — the model's generation is augmented with retrieved knowledge.",
      details: [
        "Prompt engineering is critical: structure context clearly for the LLM",
        "Include instructions to cite sources and admit when information isn't available",
        "Chain-of-thought prompting can improve reasoning over retrieved context",
        "Temperature setting: lower (0.0-0.3) for factual Q&A, higher for creative tasks",
        "Handle edge cases: no relevant documents found, contradictory information",
      ],
      code: `from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import RetrievalQA

# Define the prompt template
prompt_template = ChatPromptTemplate.from_template("""
You are a helpful assistant that answers questions 
based on the provided context. Follow these rules:

1. Only use information from the context below
2. If the answer isn't in the context, say 
   "I don't have enough information to answer that"
3. Cite the source document when possible
4. Be concise but thorough

Context:
{context}

Question: {question}

Answer:""")

# Initialize the LLM
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0.1  # Low temp for factual answers
)

# Create the RAG chain
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # Stuff all docs into prompt
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 5}
    ),
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt_template}
)

# Ask a question!
response = rag_chain.invoke({
    "query": "What is the remote work policy?"
})

print("Answer:", response["result"])
print("\\nSources:")
for doc in response["source_documents"]:
    print(f"  - {doc.metadata['source']}")`,
    },
  ],
  advancedTopics: [
    {
      title: "Hybrid Search",
      icon: "🔀",
      description:
        "Combine dense vector search (semantic meaning) with sparse keyword search (BM25/TF-IDF) for the best of both worlds. Semantic search excels at understanding intent, while keyword search catches exact terms, acronyms, and proper nouns that embeddings might miss.",
      example: `from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

# Sparse retriever (keyword-based)
bm25 = BM25Retriever.from_documents(chunks)
bm25.k = 5

# Dense retriever (semantic)
dense = vectorstore.as_retriever(search_kwargs={"k": 5})

# Combine with weighted ensemble
hybrid_retriever = EnsembleRetriever(
    retrievers=[bm25, dense],
    weights=[0.4, 0.6]  # 40% keyword, 60% semantic
)
results = hybrid_retriever.get_relevant_documents(
    "HIPAA compliance requirements for cloud storage"
)`,
    },
    {
      title: "Re-Ranking",
      icon: "📊",
      description:
        "After initial retrieval, a cross-encoder re-ranker scores each document-query pair more carefully. This two-stage approach (fast retrieval → precise re-ranking) dramatically improves the quality of final results, especially when the initial retrieval returns many candidates.",
      example: `from sentence_transformers import CrossEncoder

# Stage 1: Fast retrieval (top 20 candidates)
candidates = vectorstore.similarity_search(query, k=20)

# Stage 2: Precise re-ranking with cross-encoder
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# Score each candidate against the query
pairs = [(query, doc.page_content) for doc in candidates]
scores = reranker.predict(pairs)

# Sort by re-ranker score and take top 5
ranked = sorted(
    zip(scores, candidates),
    key=lambda x: x[0],
    reverse=True
)[:5]

for score, doc in ranked:
    print(f"Score: {score:.4f}")
    print(f"Content: {doc.page_content[:100]}...\\n")`,
    },
    {
      title: "Query Transformation",
      icon: "🔄",
      description:
        "Complex or ambiguous queries can be rewritten, expanded, or decomposed into sub-queries for better retrieval. Techniques include HyDE (Hypothetical Document Embeddings), multi-query generation, and step-back prompting to retrieve more relevant context.",
      example: `from langchain.retrievers import MultiQueryRetriever

# Multi-Query: LLM generates multiple query variations
multi_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(temperature=0.3)
)

# Original query: "How does our system handle failures?"
# LLM generates variations:
#   1. "What is the fault tolerance mechanism?"
#   2. "Describe the error handling and recovery process"
#   3. "What happens when a component crashes?"
# All results are combined and deduplicated

# HyDE: Generate a hypothetical answer, then search
from langchain.chains import HypotheticalDocumentEmbedder

hyde = HypotheticalDocumentEmbedder.from_llm(
    llm=ChatOpenAI(),
    base_embeddings=OpenAIEmbeddings(),
    prompt_key="web_search"  # or custom prompt
)
# The hypothetical answer's embedding often matches
# real documents better than the raw question`,
    },
    {
      title: "Evaluation & Metrics",
      icon: "📈",
      description:
        "Measuring RAG performance requires evaluating both retrieval quality and generation quality. Key metrics include context relevance (did we retrieve the right documents?), answer faithfulness (is the answer grounded in context?), and answer relevance (does it address the question?).",
      example: `from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset

# Prepare evaluation dataset
eval_data = {
    "question": [
        "What is the refund policy?",
        "How do I reset my password?"
    ],
    "answer": [rag_answers],       # RAG-generated
    "contexts": [retrieved_chunks], # Retrieved docs
    "ground_truth": [expected]      # Human-written
}

dataset = Dataset.from_dict(eval_data)

# Run RAGAS evaluation
results = evaluate(
    dataset,
    metrics=[
        faithfulness,        # Is answer grounded?
        answer_relevancy,    # Does it answer query?
        context_precision,   # Are retrieved docs relevant?
        context_recall       # Did we find all needed info?
    ]
)
print(results)
# {'faithfulness': 0.92, 'answer_relevancy': 0.88,
#  'context_precision': 0.85, 'context_recall': 0.79}`,
    },
  ],
  useCases: [
    {
      title: "Customer Support Bot",
      icon: "💬",
      desc: "Build an AI chatbot grounded in your product documentation, FAQs, and support tickets for accurate, instant customer assistance.",
    },
    {
      title: "Legal Document Analysis",
      icon: "⚖️",
      desc: "Query across thousands of legal cases, contracts, and regulations to find relevant precedents and clauses in seconds.",
    },
    {
      title: "Medical Knowledge Assistant",
      icon: "🏥",
      desc: "Help clinicians quickly access clinical guidelines, drug interactions, and research papers during patient consultations.",
    },
    {
      title: "Enterprise Search",
      icon: "🏢",
      desc: "Unify knowledge across Confluence, Slack, Google Drive, and databases into a single intelligent search interface.",
    },
    {
      title: "Educational Tutor",
      icon: "📚",
      desc: "Create personalized tutoring systems grounded in textbooks and course materials that can explain concepts and answer student questions.",
    },
    {
      title: "Code Documentation Assistant",
      icon: "💻",
      desc: "Index your codebase documentation, READMEs, and API references to help developers find answers without leaving their IDE.",
    },
  ],
  bestPractices: [
    {
      title: "Chunk Size Optimization",
      tip: "Start with 512-1024 tokens. Smaller chunks improve precision but lose context. Larger chunks preserve context but add noise. Test with your specific data.",
      category: "Chunking",
    },
    {
      title: "Overlap Strategy",
      tip: "Use 10-20% overlap between chunks to prevent losing context at boundaries. For conversational data, overlap at sentence boundaries.",
      category: "Chunking",
    },
    {
      title: "Metadata Enrichment",
      tip: "Store rich metadata (source, date, author, section) with each chunk. Use metadata filters to narrow retrieval scope and improve relevance.",
      category: "Indexing",
    },
    {
      title: "Embedding Model Selection",
      tip: "Match embedding model to your domain. General-purpose models work well for most cases, but domain-specific models (e.g., BioBERT for medical) can significantly improve retrieval in specialized fields.",
      category: "Embeddings",
    },
    {
      title: "Prompt Engineering",
      tip: "Always instruct the LLM to say 'I don't know' when context is insufficient. Include few-shot examples of good answers in your prompt template.",
      category: "Generation",
    },
    {
      title: "Continuous Evaluation",
      tip: "Set up automated evaluation pipelines using RAGAS or custom metrics. Track faithfulness, relevance, and retrieval quality over time as your knowledge base evolves.",
      category: "Evaluation",
    },
  ],
  glossary: [
    { term: "LLM", definition: "Large Language Model — a neural network trained on massive text data that can generate human-like text (e.g., GPT-4, Claude, Llama)." },
    { term: "Embedding", definition: "A numerical vector representation of text that captures its semantic meaning. Similar texts produce similar vectors." },
    { term: "Vector Store", definition: "A specialized database optimized for storing and querying high-dimensional vectors using similarity search algorithms." },
    { term: "Chunking", definition: "The process of splitting large documents into smaller, manageable pieces that can be individually embedded and retrieved." },
    { term: "Cosine Similarity", definition: "A metric that measures the angle between two vectors. Values range from -1 (opposite) to 1 (identical), with higher values indicating greater similarity." },
    { term: "Top-k Retrieval", definition: "Returning the k most similar documents to a query from the vector store. Common values range from 3 to 10." },
    { term: "Hallucination", definition: "When an LLM generates text that sounds plausible but is factually incorrect or fabricated. RAG significantly reduces this." },
    { term: "Context Window", definition: "The maximum number of tokens an LLM can process in a single request. Retrieved documents must fit within this limit." },
    { term: "BM25", definition: "Best Match 25 — a classic keyword-based ranking algorithm used in sparse retrieval and hybrid search systems." },
    { term: "HNSW", definition: "Hierarchical Navigable Small World — a graph-based algorithm for fast approximate nearest neighbor search in vector databases." },
    { term: "Cross-Encoder", definition: "A model that takes a query-document pair as input and outputs a relevance score. More accurate but slower than bi-encoders." },
    { term: "HyDE", definition: "Hypothetical Document Embeddings — a technique where the LLM generates a hypothetical answer, which is then used as the search query for better retrieval." },
  ],
};

const CodeBlock = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: "#0D1117", borderRadius: 12, overflow: "hidden", marginTop: 16, border: "1px solid #21262D" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#161B22", borderBottom: "1px solid #21262D" }}>
        <span style={{ color: "#7EE787", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{title || "Python"}</span>
        <button onClick={handleCopy} style={{ background: copied ? "#238636" : "#21262D", color: "#C9D1D9", border: "1px solid #30363D", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: 20, overflowX: "auto", fontSize: 13, lineHeight: 1.6, color: "#C9D1D9", fontFamily: "'JetBrains Mono', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ProgressIndicator = ({ steps, activeStep }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginBottom: 24 }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          background: i === activeStep ? "linear-gradient(135deg, #FF6B6B, #4ECDC4)" : i < activeStep ? "#238636" : "#21262D",
          color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.3s", cursor: "pointer", border: i === activeStep ? "2px solid #fff" : "2px solid transparent",
          boxShadow: i === activeStep ? "0 0 20px rgba(78,205,196,0.4)" : "none",
        }}>
          {i < activeStep ? "✓" : i + 1}
        </div>
        {i < steps.length - 1 && (
          <div style={{ width: 24, height: 2, background: i < activeStep ? "#238636" : "#21262D", borderRadius: 1 }} />
        )}
      </div>
    ))}
  </div>
);

function RAGFull() {
  const [activeSection, setActiveSection] = useState("intro");
  const [activeStep, setActiveStep] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const sections = [
    { id: "intro", label: "Introduction", icon: "🏠" },
    { id: "why", label: "Why RAG?", icon: "❓" },
    { id: "architecture", label: "Architecture", icon: "🏗️" },
    { id: "pipeline", label: "Step-by-Step", icon: "⚙️" },
    { id: "advanced", label: "Advanced", icon: "🚀" },
    { id: "usecases", label: "Use Cases", icon: "💡" },
    { id: "bestpractices", label: "Best Practices", icon: "✅" },
    { id: "glossary", label: "Glossary", icon: "📖" },
    { id: "quiz", label: "Knowledge Check", icon: "🎯" },
  ];

  const quizQuestions = [
    { q: "What is the primary purpose of RAG?", options: ["Replace LLMs entirely", "Ground LLM responses in retrieved external knowledge", "Train new language models", "Compress documents"], correct: 1 },
    { q: "Which step converts text into numerical vectors?", options: ["Chunking", "Indexing", "Embedding Generation", "Query Transformation"], correct: 2 },
    { q: "What does 'Top-k retrieval' mean?", options: ["Retrieving only the first k documents", "Returning the k most similar documents to the query", "Splitting documents into k chunks", "Using k different LLMs"], correct: 1 },
    { q: "Why is text chunking necessary in RAG?", options: ["To make documents look nicer", "Because LLMs can only read small text", "Documents are too large for embedding and context windows", "To delete irrelevant information"], correct: 2 },
    { q: "What is a hallucination in the context of LLMs?", options: ["A visual illusion in generated images", "When the model generates plausible but incorrect information", "A type of embedding error", "An authentication failure"], correct: 1 },
    { q: "Which retrieval strategy combines semantic and keyword search?", options: ["Pure vector search", "BM25 only", "Hybrid Search", "Cross-encoding"], correct: 2 },
  ];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  const filteredGlossary = ragData.glossary.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navBtn = (section) => (
    <button
      key={section.id}
      onClick={() => { setActiveSection(section.id); setSidebarOpen(false); }}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "12px 16px", border: "none", borderRadius: 10, cursor: "pointer",
        background: activeSection === section.id ? "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))" : "transparent",
        color: activeSection === section.id ? "#F0F6FC" : "#8B949E",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: activeSection === section.id ? 600 : 400,
        borderLeft: activeSection === section.id ? "3px solid #4ECDC4" : "3px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <span style={{ fontSize: 18 }}>{section.icon}</span>
      {section.label}
    </button>
  );

  const renderIntro = () => (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
        borderRadius: 20, padding: "48px 40px", marginBottom: 32,
        border: "1px solid #21262D", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(78,205,196,0.15)", borderRadius: 20, marginBottom: 16, border: "1px solid rgba(78,205,196,0.3)" }}>
            <span style={{ color: "#4ECDC4", fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>AI ARCHITECTURE GUIDE</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.15 }}>
            {ragData.intro.title}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#4ECDC4", margin: "0 0 24px 0", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
            {ragData.intro.subtitle}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#8B949E", maxWidth: 720, fontFamily: "'DM Sans', sans-serif" }}>
            {ragData.intro.description}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Accuracy Boost", value: "40-60%", sub: "reduction in hallucinations" },
          { label: "Cost Savings", value: "10x", sub: "cheaper than fine-tuning" },
          { label: "Setup Time", value: "< 1 Day", sub: "for a basic prototype" },
          { label: "Adoption", value: "85%+", sub: "of enterprise AI uses RAG" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "#161B22", borderRadius: 16, padding: 24, textAlign: "center",
            border: "1px solid #21262D", transition: "all 0.3s",
          }}>
            <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'JetBrains Mono', monospace" }}>
              {stat.value}
            </div>
            <div style={{ color: "#F0F6FC", fontWeight: 600, fontSize: 14, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            <div style={{ color: "#8B949E", fontSize: 12, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#161B22", borderRadius: 16, padding: 32, border: "1px solid #21262D" }}>
        <h3 style={{ color: "#F0F6FC", margin: "0 0 16px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 20 }}>
          🎯 How RAG Works — The Big Picture
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
          {[
            { icon: "📄", label: "Your Documents", color: "#FF6B6B" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "✂️", label: "Chunk & Embed", color: "#4ECDC4" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🗄️", label: "Vector Database", color: "#45B7D1" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🔍", label: "User Query", color: "#FFEAA7" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🤖", label: "LLM + Context", color: "#DDA0DD" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "✅", label: "Grounded Answer", color: "#96CEB4" },
          ].map((item, i) =>
            item.label === "" ? (
              <span key={i} style={{ color: "#30363D", fontSize: 20, fontWeight: 700 }}>→</span>
            ) : (
              <div key={i} style={{
                background: `${item.color}15`, border: `1px solid ${item.color}40`,
                borderRadius: 12, padding: "12px 16px", textAlign: "center", minWidth: 90,
              }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ color: item.color, fontSize: 11, fontWeight: 600, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{item.label}</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderWhyRag = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Why Use RAG?
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Understanding the key benefits of Retrieval-Augmented Generation and why it has become the de-facto standard for building production AI applications.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        {ragData.whyRag.map((item, i) => (
          <div key={i}
            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            style={{
              background: "#161B22", borderRadius: 16, padding: 24,
              border: expandedCard === i ? "1px solid #4ECDC4" : "1px solid #21262D",
              cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                  <span style={{ color: "#4ECDC4", fontSize: 18, transition: "transform 0.3s", transform: expandedCard === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </div>
                <p style={{ color: "#8B949E", margin: "8px 0 0 0", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                {expandedCard === i && (
                  <div style={{
                    marginTop: 16, padding: 16, background: "rgba(78,205,196,0.06)",
                    borderRadius: 10, borderLeft: "3px solid #4ECDC4",
                  }}>
                    <p style={{ color: "#C9D1D9", margin: 0, fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{item.detail}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderArchitecture = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        RAG Architecture Overview
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        A complete visual breakdown of the RAG pipeline showing how data flows from raw documents to intelligent, grounded responses.
      </p>
      <div style={{ background: "#161B22", borderRadius: 20, padding: 32, border: "1px solid #21262D", marginBottom: 24 }}>
        <h3 style={{ color: "#F0F6FC", margin: "0 0 24px 0", fontSize: 20, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
          Complete RAG Pipeline Architecture
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {ragData.architecture.map((step, i) => (
            <div key={i} style={{
              background: `${step.color}10`, borderRadius: 14, padding: 20, textAlign: "center",
              border: `1px solid ${step.color}30`, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                background: step.color, color: "#0D1117", width: 24, height: 24, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
              }}>
                {step.step}
              </div>
              <div style={{ fontSize: 36, marginTop: 8 }}>{step.icon}</div>
              <div style={{ color: step.color, fontWeight: 700, fontSize: 14, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>{step.title}</div>
              <div style={{ color: "#8B949E", fontSize: 11, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{step.subtitle}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, padding: 20, background: "#0D1117", borderRadius: 12, border: "1px solid #21262D" }}>
          <h4 style={{ color: "#4ECDC4", margin: "0 0 12px 0", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
            Two Main Phases:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ padding: 16, background: "rgba(255,107,107,0.06)", borderRadius: 10, border: "1px solid rgba(255,107,107,0.2)" }}>
              <div style={{ color: "#FF6B6B", fontWeight: 700, fontSize: 14, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>📥 Indexing Phase (Offline)</div>
              <p style={{ color: "#8B949E", fontSize: 13, margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                Documents are loaded, chunked, embedded, and stored in a vector database. This happens once (or periodically) and prepares your knowledge base for queries.
              </p>
            </div>
            <div style={{ padding: 16, background: "rgba(78,205,196,0.06)", borderRadius: 10, border: "1px solid rgba(78,205,196,0.2)" }}>
              <div style={{ color: "#4ECDC4", fontWeight: 700, fontSize: 14, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>🔍 Retrieval & Generation (Online)</div>
              <p style={{ color: "#8B949E", fontSize: 13, margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                User queries are embedded, similar documents are retrieved from the vector store, and an LLM generates a response grounded in the retrieved context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Step-by-Step Implementation
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 20, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Follow each step to build a complete RAG pipeline from scratch. Click through the steps to see detailed code examples and explanations.
      </p>
      <ProgressIndicator steps={ragData.architecture} activeStep={activeStep} />
      {(() => {
        const step = ragData.architecture[activeStep];
        return (
          <div style={{
            background: "#161B22", borderRadius: 20, padding: 32, border: `1px solid ${step.color}40`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: `${step.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                border: `1px solid ${step.color}40`,
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ color: step.color, fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>
                  Step {step.step} of {ragData.architecture.length}
                </div>
                <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 24, fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
              </div>
            </div>
            <p style={{ color: "#C9D1D9", fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
              {step.description}
            </p>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: "#F0F6FC", margin: "0 0 12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>Key Details:</h4>
              <div style={{ display: "grid", gap: 8 }}>
                {step.details.map((detail, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: step.color, fontSize: 16, lineHeight: 1.5 }}>●</span>
                    <span style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <CodeBlock code={step.code} title={`Step ${step.step}: ${step.title}`} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "1px solid #30363D",
                  background: activeStep === 0 ? "#0D1117" : "#21262D",
                  color: activeStep === 0 ? "#484F58" : "#C9D1D9",
                  cursor: activeStep === 0 ? "default" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                }}
              >
                ← Previous Step
              </button>
              <button
                onClick={() => setActiveStep(Math.min(ragData.architecture.length - 1, activeStep + 1))}
                disabled={activeStep === ragData.architecture.length - 1}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "none",
                  background: activeStep === ragData.architecture.length - 1 ? "#21262D" : `linear-gradient(135deg, ${step.color}, ${ragData.architecture[Math.min(activeStep + 1, 5)].color})`,
                  color: activeStep === ragData.architecture.length - 1 ? "#484F58" : "#0D1117",
                  cursor: activeStep === ragData.architecture.length - 1 ? "default" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
                }}
              >
                Next Step →
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );

  const renderAdvanced = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Advanced RAG Techniques
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Take your RAG system to the next level with these production-grade optimization techniques used by leading AI teams.
      </p>
      <div style={{ display: "grid", gap: 20 }}>
        {ragData.advancedTopics.map((topic, i) => (
          <div key={i} style={{ background: "#161B22", borderRadius: 16, padding: 28, border: "1px solid #21262D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{topic.icon}</span>
              <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 20, fontFamily: "'DM Sans', sans-serif" }}>{topic.title}</h3>
            </div>
            <p style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              {topic.description}
            </p>
            <CodeBlock code={topic.example} title={topic.title} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Real-World Use Cases
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        RAG is being deployed across every industry. Here are some of the most impactful applications.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {ragData.useCases.map((uc, i) => (
          <div key={i} style={{
            background: "#161B22", borderRadius: 16, padding: 24, border: "1px solid #21262D",
            transition: "all 0.3s",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{uc.icon}</div>
            <h3 style={{ color: "#F0F6FC", margin: "0 0 8px 0", fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>{uc.title}</h3>
            <p style={{ color: "#8B949E", margin: 0, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{uc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBestPractices = () => {
    const categories = [...new Set(ragData.bestPractices.map((b) => b.category))];
    return (
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
          Best Practices & Tips
        </h2>
        <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Production-tested guidelines to help you build reliable, high-quality RAG systems.
        </p>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{
              display: "inline-block", padding: "4px 14px", background: "rgba(78,205,196,0.12)",
              borderRadius: 20, marginBottom: 14, border: "1px solid rgba(78,205,196,0.25)",
            }}>
              <span style={{ color: "#4ECDC4", fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{cat}</span>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {ragData.bestPractices.filter((b) => b.category === cat).map((bp, i) => (
                <div key={i} style={{ background: "#161B22", borderRadius: 14, padding: 20, border: "1px solid #21262D" }}>
                  <h4 style={{ color: "#F0F6FC", margin: "0 0 8px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>{bp.title}</h4>
                  <p style={{ color: "#8B949E", margin: 0, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{bp.tip}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGlossary = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Glossary of Terms
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 20, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Quick reference for all the key terminology used in RAG systems.
      </p>
      <input
        type="text"
        placeholder="🔍 Search terms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%", padding: "12px 18px", borderRadius: 12,
          background: "#0D1117", border: "1px solid #21262D", color: "#F0F6FC",
          fontSize: 15, fontFamily: "'DM Sans', sans-serif", marginBottom: 20,
          outline: "none", boxSizing: "border-box",
        }}
      />
      <div style={{ display: "grid", gap: 10 }}>
        {filteredGlossary.map((item, i) => (
          <div key={i} style={{ background: "#161B22", borderRadius: 12, padding: 18, border: "1px solid #21262D" }}>
            <span style={{ color: "#4ECDC4", fontWeight: 700, fontSize: 15, fontFamily: "'JetBrains Mono', monospace" }}>{item.term}</span>
            <span style={{ color: "#30363D", margin: "0 10px" }}>—</span>
            <span style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.definition}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    const score = Object.entries(quizAnswers).filter(([q, a]) => a === quizQuestions[parseInt(q)].correct).length;
    return (
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
          Knowledge Check
        </h2>
        <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Test your understanding of RAG concepts. Select the best answer for each question.
        </p>
        <div style={{ display: "grid", gap: 20 }}>
          {quizQuestions.map((qq, qi) => (
            <div key={qi} style={{ background: "#161B22", borderRadius: 16, padding: 24, border: "1px solid #21262D" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{
                  minWidth: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: showQuizResults ? (quizAnswers[qi] === qq.correct ? "#23863620" : quizAnswers[qi] !== undefined ? "#FF6B6B20" : "#21262D") : "#21262D",
                  color: showQuizResults ? (quizAnswers[qi] === qq.correct ? "#7EE787" : quizAnswers[qi] !== undefined ? "#FF6B6B" : "#8B949E") : "#8B949E",
                  fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {qi + 1}
                </div>
                <p style={{ color: "#F0F6FC", margin: 0, fontSize: 15, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{qq.q}</p>
              </div>
              <div style={{ display: "grid", gap: 8, paddingLeft: 44 }}>
                {qq.options.map((opt, oi) => {
                  const isSelected = quizAnswers[qi] === oi;
                  const isCorrect = oi === qq.correct;
                  let bg = "#0D1117";
                  let borderColor = "#21262D";
                  let textColor = "#8B949E";
                  if (showQuizResults && isCorrect) { bg = "rgba(35,134,54,0.15)"; borderColor = "#238636"; textColor = "#7EE787"; }
                  else if (showQuizResults && isSelected && !isCorrect) { bg = "rgba(255,107,107,0.1)"; borderColor = "#FF6B6B"; textColor = "#FF6B6B"; }
                  else if (isSelected) { bg = "rgba(78,205,196,0.1)"; borderColor = "#4ECDC4"; textColor = "#4ECDC4"; }
                  return (
                    <button key={oi} onClick={() => !showQuizResults && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                        borderRadius: 10, border: `1px solid ${borderColor}`, background: bg,
                        color: textColor, cursor: showQuizResults ? "default" : "pointer",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, transition: "all 0.2s",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <button onClick={() => { setShowQuizResults(true); }}
            style={{
              padding: "12px 28px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #4ECDC4, #45B7D1)", color: "#0D1117",
              fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Check Answers
          </button>
          <button onClick={() => { setQuizAnswers({}); setShowQuizResults(false); }}
            style={{
              padding: "12px 28px", borderRadius: 12, border: "1px solid #30363D",
              background: "#21262D", color: "#C9D1D9", cursor: "pointer",
              fontWeight: 600, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Reset Quiz
          </button>
        </div>
        {showQuizResults && (
          <div style={{
            marginTop: 20, padding: 20, borderRadius: 14,
            background: score >= 4 ? "rgba(35,134,54,0.1)" : "rgba(255,107,107,0.1)",
            border: `1px solid ${score >= 4 ? "#238636" : "#FF6B6B"}40`,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: score >= 4 ? "#7EE787" : "#FF6B6B", fontFamily: "'DM Sans', sans-serif" }}>
              {score >= 5 ? "🎉 Excellent!" : score >= 4 ? "👏 Great Job!" : score >= 2 ? "📚 Keep Learning!" : "💪 Review the Material"}
            </div>
            <div style={{ color: "#8B949E", fontSize: 14, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
              You scored {score} out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "intro": return renderIntro();
      case "why": return renderWhyRag();
      case "architecture": return renderArchitecture();
      case "pipeline": return renderPipeline();
      case "advanced": return renderAdvanced();
      case "usecases": return renderUseCases();
      case "bestpractices": return renderBestPractices();
      case "glossary": return renderGlossary();
      case "quiz": return renderQuiz();
      default: return renderIntro();
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D1117", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Mobile menu toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: "none", position: "fixed", top: 16, left: 16, zIndex: 1000,
          width: 44, height: 44, borderRadius: 12, border: "1px solid #21262D",
          background: "#161B22", color: "#F0F6FC", cursor: "pointer", fontSize: 20,
          alignItems: "center", justifyContent: "center",
          ...(typeof window !== "undefined" && window.innerWidth <= 768 ? { display: "flex" } : {}),
        }}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside style={{
        width: 260, minWidth: 260, background: "#0D1117", borderRight: "1px solid #21262D",
        padding: "24px 16px", display: "flex", flexDirection: "column", gap: 4,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        ...(typeof window !== "undefined" && window.innerWidth <= 768
          ? { position: "fixed", left: sidebarOpen ? 0 : -280, zIndex: 999, transition: "left 0.3s", boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.5)" : "none" }
          : {}),
      }}>
        <div style={{ marginBottom: 20, paddingLeft: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F0F6FC" }}>📘 RAG Guide</div>
          <div style={{ color: "#484F58", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>Beginner → Master</div>
        </div>
        {sections.map(navBtn)}
        <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #21262D" }}>
          <div style={{ color: "#484F58", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
            Interactive Learning Guide
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} />
      )}

      {/* Main Content */}
      <main ref={contentRef} style={{
        flex: 1, padding: "32px clamp(20px, 4vw, 48px)", overflowY: "auto", maxHeight: "100vh",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {renderContent()}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #21262D", textAlign: "center" }}>
            <p style={{ color: "#484F58", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
              RAG Complete Guide — From Fundamentals to Production
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// FILE: 41. RAG Guide
// ============================================================


const ragData41 = {
  intro: {
    title: "Retrieval-Augmented Generation",
    subtitle: "The Complete Beginner-to-Master Guide",
    description:
      "RAG is a powerful AI architecture that combines the strengths of information retrieval systems with large language models (LLMs) to generate accurate, grounded, and up-to-date responses. Instead of relying solely on what an LLM memorized during training, RAG fetches relevant documents from an external knowledge base and feeds them into the model as context — dramatically reducing hallucinations and enabling domain-specific intelligence.",
  },
  whyRag: [
    {
      icon: "🧠",
      title: "Reduces Hallucinations",
      desc: "LLMs sometimes generate plausible but incorrect answers. RAG grounds responses in real retrieved documents, ensuring factual accuracy.",
      detail:
        "Without RAG, an LLM might confidently state incorrect dates, statistics, or facts. With RAG, every claim can be traced back to a source document, making outputs verifiable and trustworthy.",
    },
    {
      icon: "🔄",
      title: "Always Up-to-Date",
      desc: "LLMs have a training cutoff date. RAG lets you inject the latest information without retraining the entire model.",
      detail:
        "When new research papers, product updates, or policy changes occur, you simply update your knowledge base. The LLM immediately has access to the freshest information without any fine-tuning.",
    },
    {
      icon: "🏢",
      title: "Domain-Specific Knowledge",
      desc: "Embed your organization's proprietary data — internal docs, databases, and manuals — into an AI assistant.",
      detail:
        "A hospital can build a RAG system over medical records and clinical guidelines. A law firm can query case law. A software company can create an assistant over its entire codebase and documentation.",
    },
    {
      icon: "💰",
      title: "Cost-Effective",
      desc: "Fine-tuning large models is expensive. RAG achieves similar domain-specific results at a fraction of the cost.",
      detail:
        "Fine-tuning GPT-4 or similar models can cost thousands of dollars and requires curated training datasets. RAG only needs a vector database and an embedding model — often achievable with open-source tools.",
    },
    {
      icon: "🔐",
      title: "Data Privacy & Control",
      desc: "Your sensitive data stays in your own infrastructure. No need to send proprietary info to third-party training pipelines.",
      detail:
        "With RAG, documents are stored in your own vector database. The LLM only sees the retrieved chunks during inference, giving you full control over what information the AI can access.",
    },
    {
      icon: "📏",
      title: "Scalable & Modular",
      desc: "Easily swap out components — change the LLM, embedding model, or retrieval strategy independently.",
      detail:
        "RAG's modular architecture means you can upgrade individual components without rebuilding the entire system. Move from OpenAI to an open-source LLM, or switch from FAISS to Pinecone, all without changing your core logic.",
    },
  ],
  architecture: [
    {
      step: 1,
      title: "Document Ingestion",
      subtitle: "Loading & Preparing Your Data",
      icon: "📥",
      color: "#FF6B6B",
      description:
        "The first step is collecting and loading your raw data from various sources. This could be PDFs, Word documents, web pages, databases, APIs, or any text-based content. The goal is to gather all the knowledge you want your AI system to access.",
      details: [
        "Supported formats: PDF, DOCX, TXT, HTML, CSV, JSON, Markdown, and more",
        "Use document loaders from frameworks like LangChain, LlamaIndex, or custom parsers",
        "Handle metadata extraction (author, date, source URL, page numbers)",
        "Implement error handling for corrupted or malformed documents",
        "Consider OCR for scanned documents and image-based PDFs",
      ],
      code: `from langchain.document_loaders import (
    PyPDFLoader,
    DirectoryLoader,
    WebBaseLoader,
    CSVLoader
)

# Load a single PDF
loader = PyPDFLoader("company_handbook.pdf")
documents = loader.load()

# Load all PDFs from a directory
dir_loader = DirectoryLoader(
    "./knowledge_base/",
    glob="**/*.pdf",
    loader_cls=PyPDFLoader
)
all_docs = dir_loader.load()

# Load from a website
web_loader = WebBaseLoader(
    "https://docs.example.com/api-reference"
)
web_docs = web_loader.load()

print(f"Loaded {len(all_docs)} documents")
# Each document has: page_content, metadata`,
    },
    {
      step: 2,
      title: "Text Chunking",
      subtitle: "Splitting Documents into Digestible Pieces",
      icon: "✂️",
      color: "#4ECDC4",
      description:
        "Raw documents are often too large to fit into an LLM's context window or to be meaningfully compared via embeddings. Chunking breaks documents into smaller, semantically coherent pieces. The chunk size and overlap strategy significantly impact retrieval quality.",
      details: [
        "Chunk size typically ranges from 256 to 2048 tokens depending on the use case",
        "Overlap (usually 10-20% of chunk size) ensures context isn't lost at boundaries",
        "Recursive character splitting respects paragraph and sentence boundaries",
        "Semantic chunking groups text by meaning rather than fixed character counts",
        "Metadata preservation: each chunk retains info about its source document",
      ],
      code: `from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    TokenTextSplitter
)

# Method 1: Recursive Character Splitting
# (most common and recommended for general use)
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,       # max characters per chunk
    chunk_overlap=200,     # overlap between chunks
    length_function=len,
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)
chunks = splitter.split_documents(documents)

# Method 2: Token-based Splitting
# (better for controlling LLM input size)
token_splitter = TokenTextSplitter(
    chunk_size=512,        # max tokens per chunk
    chunk_overlap=50       # token overlap
)
token_chunks = token_splitter.split_documents(documents)

# Each chunk preserves metadata from parent doc
for chunk in chunks[:3]:
    print(f"Source: {chunk.metadata['source']}")
    print(f"Content: {chunk.page_content[:100]}...")
    print(f"Length: {len(chunk.page_content)} chars\\n")`,
    },
    {
      step: 3,
      title: "Embedding Generation",
      subtitle: "Converting Text to Vector Representations",
      icon: "🔢",
      color: "#45B7D1",
      description:
        "Embeddings convert text chunks into high-dimensional numerical vectors that capture semantic meaning. Similar concepts end up close together in vector space. This is the mathematical foundation that enables semantic search — finding documents by meaning rather than exact keyword matches.",
      details: [
        "Popular models: OpenAI text-embedding-ada-002, Sentence-Transformers, Cohere Embed",
        "Embedding dimensions typically range from 384 to 1536",
        "Cosine similarity is the most common distance metric for comparing embeddings",
        "Batch processing is essential for large document collections",
        "Consider domain-specific embedding models for specialized applications",
      ],
      code: `from langchain.embeddings import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer
import numpy as np

# Option 1: OpenAI Embeddings (cloud-based)
openai_embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002"
)
# Embed a single query
query_vector = openai_embeddings.embed_query(
    "What is our refund policy?"
)
print(f"Vector dimension: {len(query_vector)}")
# Output: Vector dimension: 1536

# Option 2: Open-Source (local, free)
local_model = SentenceTransformer(
    'all-MiniLM-L6-v2'  # Fast, good quality
)
sentences = [
    "The refund policy allows 30-day returns",
    "Machine learning uses neural networks",
    "Returns must include original packaging"
]
vectors = local_model.encode(sentences)

# Demonstrate semantic similarity
from numpy.linalg import norm
def cosine_sim(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))

# "refund policy" is closer to "returns" than "ML"
sim_1 = cosine_sim(vectors[0], vectors[2])  # ~0.72
sim_2 = cosine_sim(vectors[0], vectors[1])  # ~0.15
print(f"Refund ↔ Returns: {sim_1:.2f}")
print(f"Refund ↔ ML: {sim_2:.2f}")`,
    },
    {
      step: 4,
      title: "Vector Store Indexing",
      subtitle: "Storing Embeddings for Fast Retrieval",
      icon: "🗄️",
      color: "#96CEB4",
      description:
        "Once embeddings are generated, they need to be stored in a specialized vector database optimized for similarity search. These databases use algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) to find the most similar vectors in milliseconds, even across millions of documents.",
      details: [
        "Popular vector stores: Pinecone, Weaviate, Chroma, FAISS, Milvus, Qdrant",
        "FAISS (Facebook AI Similarity Search) is great for local development",
        "Pinecone and Weaviate offer managed cloud solutions with built-in scaling",
        "ChromaDB is lightweight and perfect for prototyping",
        "Index types: Flat (exact), IVF (approximate), HNSW (graph-based, fast)",
      ],
      code: `from langchain.vectorstores import Chroma, FAISS
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# Option 1: ChromaDB (simple, great for prototyping)
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",
    collection_name="knowledge_base"
)
vectorstore.persist()  # Save to disk

# Option 2: FAISS (fast, local, by Meta)
faiss_store = FAISS.from_documents(
    documents=chunks,
    embedding=embeddings
)
faiss_store.save_local("./faiss_index")

# Later: reload the index
loaded_store = FAISS.load_local(
    "./faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

# Check collection stats
print(f"Total vectors stored: {vectorstore._collection.count()}")
# Output: Total vectors stored: 1247`,
    },
    {
      step: 5,
      title: "Query & Retrieval",
      subtitle: "Finding the Most Relevant Documents",
      icon: "🔍",
      color: "#FFEAA7",
      description:
        "When a user asks a question, the query is embedded using the same model and compared against all stored vectors. The top-k most similar chunks are retrieved. Advanced retrieval strategies like hybrid search (combining semantic + keyword search), re-ranking, and query transformation can significantly improve results.",
      details: [
        "Top-k retrieval: return the k most similar documents (typically k=3 to 10)",
        "Similarity threshold: filter out results below a minimum similarity score",
        "Hybrid search combines dense (vector) and sparse (BM25/keyword) retrieval",
        "MMR (Maximum Marginal Relevance) balances relevance with diversity",
        "Query transformation: rewrite, expand, or decompose complex queries",
      ],
      code: `# Basic similarity search
query = "What is the company's remote work policy?"
results = vectorstore.similarity_search(
    query,
    k=5  # Return top 5 matches
)

for i, doc in enumerate(results):
    print(f"Result {i+1}:")
    print(f"  Source: {doc.metadata.get('source')}")
    print(f"  Content: {doc.page_content[:150]}...\\n")

# Similarity search with scores
results_with_scores = vectorstore.similarity_search_with_score(
    query, k=5
)
for doc, score in results_with_scores:
    print(f"Score: {score:.4f} | {doc.page_content[:80]}...")

# Advanced: MMR for diverse results
mmr_results = vectorstore.max_marginal_relevance_search(
    query,
    k=5,
    fetch_k=20,     # Fetch 20 candidates
    lambda_mult=0.7  # Balance: 1=relevance, 0=diversity
)

# Advanced: Retriever with filtering
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={
        "score_threshold": 0.75,
        "k": 10,
        "filter": {"department": "HR"}
    }
)
filtered_docs = retriever.get_relevant_documents(query)`,
    },
    {
      step: 6,
      title: "Augmented Generation",
      subtitle: "Combining Context with LLM Intelligence",
      icon: "✨",
      color: "#DDA0DD",
      description:
        "The retrieved documents are injected into a carefully crafted prompt template along with the user's question. The LLM then generates a response grounded in the provided context. This is where the 'augmented' in RAG comes from — the model's generation is augmented with retrieved knowledge.",
      details: [
        "Prompt engineering is critical: structure context clearly for the LLM",
        "Include instructions to cite sources and admit when information isn't available",
        "Chain-of-thought prompting can improve reasoning over retrieved context",
        "Temperature setting: lower (0.0-0.3) for factual Q&A, higher for creative tasks",
        "Handle edge cases: no relevant documents found, contradictory information",
      ],
      code: `from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import RetrievalQA

# Define the prompt template
prompt_template = ChatPromptTemplate.from_template("""
You are a helpful assistant that answers questions 
based on the provided context. Follow these rules:

1. Only use information from the context below
2. If the answer isn't in the context, say 
   "I don't have enough information to answer that"
3. Cite the source document when possible
4. Be concise but thorough

Context:
{context}

Question: {question}

Answer:""")

# Initialize the LLM
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0.1  # Low temp for factual answers
)

# Create the RAG chain
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # Stuff all docs into prompt
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 5}
    ),
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt_template}
)

# Ask a question!
response = rag_chain.invoke({
    "query": "What is the remote work policy?"
})

print("Answer:", response["result"])
print("\\nSources:")
for doc in response["source_documents"]:
    print(f"  - {doc.metadata['source']}")`,
    },
  ],
  advancedTopics: [
    {
      title: "Hybrid Search",
      icon: "🔀",
      description:
        "Combine dense vector search (semantic meaning) with sparse keyword search (BM25/TF-IDF) for the best of both worlds. Semantic search excels at understanding intent, while keyword search catches exact terms, acronyms, and proper nouns that embeddings might miss.",
      example: `from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

# Sparse retriever (keyword-based)
bm25 = BM25Retriever.from_documents(chunks)
bm25.k = 5

# Dense retriever (semantic)
dense = vectorstore.as_retriever(search_kwargs={"k": 5})

# Combine with weighted ensemble
hybrid_retriever = EnsembleRetriever(
    retrievers=[bm25, dense],
    weights=[0.4, 0.6]  # 40% keyword, 60% semantic
)
results = hybrid_retriever.get_relevant_documents(
    "HIPAA compliance requirements for cloud storage"
)`,
    },
    {
      title: "Re-Ranking",
      icon: "📊",
      description:
        "After initial retrieval, a cross-encoder re-ranker scores each document-query pair more carefully. This two-stage approach (fast retrieval → precise re-ranking) dramatically improves the quality of final results, especially when the initial retrieval returns many candidates.",
      example: `from sentence_transformers import CrossEncoder

# Stage 1: Fast retrieval (top 20 candidates)
candidates = vectorstore.similarity_search(query, k=20)

# Stage 2: Precise re-ranking with cross-encoder
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# Score each candidate against the query
pairs = [(query, doc.page_content) for doc in candidates]
scores = reranker.predict(pairs)

# Sort by re-ranker score and take top 5
ranked = sorted(
    zip(scores, candidates),
    key=lambda x: x[0],
    reverse=True
)[:5]

for score, doc in ranked:
    print(f"Score: {score:.4f}")
    print(f"Content: {doc.page_content[:100]}...\\n")`,
    },
    {
      title: "Query Transformation",
      icon: "🔄",
      description:
        "Complex or ambiguous queries can be rewritten, expanded, or decomposed into sub-queries for better retrieval. Techniques include HyDE (Hypothetical Document Embeddings), multi-query generation, and step-back prompting to retrieve more relevant context.",
      example: `from langchain.retrievers import MultiQueryRetriever

# Multi-Query: LLM generates multiple query variations
multi_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(temperature=0.3)
)

# Original query: "How does our system handle failures?"
# LLM generates variations:
#   1. "What is the fault tolerance mechanism?"
#   2. "Describe the error handling and recovery process"
#   3. "What happens when a component crashes?"
# All results are combined and deduplicated

# HyDE: Generate a hypothetical answer, then search
from langchain.chains import HypotheticalDocumentEmbedder

hyde = HypotheticalDocumentEmbedder.from_llm(
    llm=ChatOpenAI(),
    base_embeddings=OpenAIEmbeddings(),
    prompt_key="web_search"  # or custom prompt
)
# The hypothetical answer's embedding often matches
# real documents better than the raw question`,
    },
    {
      title: "Evaluation & Metrics",
      icon: "📈",
      description:
        "Measuring RAG performance requires evaluating both retrieval quality and generation quality. Key metrics include context relevance (did we retrieve the right documents?), answer faithfulness (is the answer grounded in context?), and answer relevance (does it address the question?).",
      example: `from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall
)
from datasets import Dataset

# Prepare evaluation dataset
eval_data = {
    "question": [
        "What is the refund policy?",
        "How do I reset my password?"
    ],
    "answer": [rag_answers],       # RAG-generated
    "contexts": [retrieved_chunks], # Retrieved docs
    "ground_truth": [expected]      # Human-written
}

dataset = Dataset.from_dict(eval_data)

# Run RAGAS evaluation
results = evaluate(
    dataset,
    metrics=[
        faithfulness,        # Is answer grounded?
        answer_relevancy,    # Does it answer query?
        context_precision,   # Are retrieved docs relevant?
        context_recall       # Did we find all needed info?
    ]
)
print(results)
# {'faithfulness': 0.92, 'answer_relevancy': 0.88,
#  'context_precision': 0.85, 'context_recall': 0.79}`,
    },
  ],
  useCases: [
    {
      title: "Customer Support Bot",
      icon: "💬",
      desc: "Build an AI chatbot grounded in your product documentation, FAQs, and support tickets for accurate, instant customer assistance.",
    },
    {
      title: "Legal Document Analysis",
      icon: "⚖️",
      desc: "Query across thousands of legal cases, contracts, and regulations to find relevant precedents and clauses in seconds.",
    },
    {
      title: "Medical Knowledge Assistant",
      icon: "🏥",
      desc: "Help clinicians quickly access clinical guidelines, drug interactions, and research papers during patient consultations.",
    },
    {
      title: "Enterprise Search",
      icon: "🏢",
      desc: "Unify knowledge across Confluence, Slack, Google Drive, and databases into a single intelligent search interface.",
    },
    {
      title: "Educational Tutor",
      icon: "📚",
      desc: "Create personalized tutoring systems grounded in textbooks and course materials that can explain concepts and answer student questions.",
    },
    {
      title: "Code Documentation Assistant",
      icon: "💻",
      desc: "Index your codebase documentation, READMEs, and API references to help developers find answers without leaving their IDE.",
    },
  ],
  bestPractices: [
    {
      title: "Chunk Size Optimization",
      tip: "Start with 512-1024 tokens. Smaller chunks improve precision but lose context. Larger chunks preserve context but add noise. Test with your specific data.",
      category: "Chunking",
    },
    {
      title: "Overlap Strategy",
      tip: "Use 10-20% overlap between chunks to prevent losing context at boundaries. For conversational data, overlap at sentence boundaries.",
      category: "Chunking",
    },
    {
      title: "Metadata Enrichment",
      tip: "Store rich metadata (source, date, author, section) with each chunk. Use metadata filters to narrow retrieval scope and improve relevance.",
      category: "Indexing",
    },
    {
      title: "Embedding Model Selection",
      tip: "Match embedding model to your domain. General-purpose models work well for most cases, but domain-specific models (e.g., BioBERT for medical) can significantly improve retrieval in specialized fields.",
      category: "Embeddings",
    },
    {
      title: "Prompt Engineering",
      tip: "Always instruct the LLM to say 'I don't know' when context is insufficient. Include few-shot examples of good answers in your prompt template.",
      category: "Generation",
    },
    {
      title: "Continuous Evaluation",
      tip: "Set up automated evaluation pipelines using RAGAS or custom metrics. Track faithfulness, relevance, and retrieval quality over time as your knowledge base evolves.",
      category: "Evaluation",
    },
  ],
  glossary: [
    { term: "LLM", definition: "Large Language Model — a neural network trained on massive text data that can generate human-like text (e.g., GPT-4, Claude, Llama)." },
    { term: "Embedding", definition: "A numerical vector representation of text that captures its semantic meaning. Similar texts produce similar vectors." },
    { term: "Vector Store", definition: "A specialized database optimized for storing and querying high-dimensional vectors using similarity search algorithms." },
    { term: "Chunking", definition: "The process of splitting large documents into smaller, manageable pieces that can be individually embedded and retrieved." },
    { term: "Cosine Similarity", definition: "A metric that measures the angle between two vectors. Values range from -1 (opposite) to 1 (identical), with higher values indicating greater similarity." },
    { term: "Top-k Retrieval", definition: "Returning the k most similar documents to a query from the vector store. Common values range from 3 to 10." },
    { term: "Hallucination", definition: "When an LLM generates text that sounds plausible but is factually incorrect or fabricated. RAG significantly reduces this." },
    { term: "Context Window", definition: "The maximum number of tokens an LLM can process in a single request. Retrieved documents must fit within this limit." },
    { term: "BM25", definition: "Best Match 25 — a classic keyword-based ranking algorithm used in sparse retrieval and hybrid search systems." },
    { term: "HNSW", definition: "Hierarchical Navigable Small World — a graph-based algorithm for fast approximate nearest neighbor search in vector databases." },
    { term: "Cross-Encoder", definition: "A model that takes a query-document pair as input and outputs a relevance score. More accurate but slower than bi-encoders." },
    { term: "HyDE", definition: "Hypothetical Document Embeddings — a technique where the LLM generates a hypothetical answer, which is then used as the search query for better retrieval." },
  ],
};

const CodeBlock41 = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: "#0D1117", borderRadius: 12, overflow: "hidden", marginTop: 16, border: "1px solid #21262D" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#161B22", borderBottom: "1px solid #21262D" }}>
        <span style={{ color: "#7EE787", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{title || "Python"}</span>
        <button onClick={handleCopy} style={{ background: copied ? "#238636" : "#21262D", color: "#C9D1D9", border: "1px solid #30363D", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: 20, overflowX: "auto", fontSize: 13, lineHeight: 1.6, color: "#C9D1D9", fontFamily: "'JetBrains Mono', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ProgressIndicator41 = ({ steps, activeStep }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginBottom: 24 }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          background: i === activeStep ? "linear-gradient(135deg, #FF6B6B, #4ECDC4)" : i < activeStep ? "#238636" : "#21262D",
          color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.3s", cursor: "pointer", border: i === activeStep ? "2px solid #fff" : "2px solid transparent",
          boxShadow: i === activeStep ? "0 0 20px rgba(78,205,196,0.4)" : "none",
        }}>
          {i < activeStep ? "✓" : i + 1}
        </div>
        {i < steps.length - 1 && (
          <div style={{ width: 24, height: 2, background: i < activeStep ? "#238636" : "#21262D", borderRadius: 1 }} />
        )}
      </div>
    ))}
  </div>
);

function RAGGuideComp() {
  const [activeSection, setActiveSection] = useState("intro");
  const [activeStep, setActiveStep] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const sections = [
    { id: "intro", label: "Introduction", icon: "🏠" },
    { id: "why", label: "Why RAG?", icon: "❓" },
    { id: "architecture", label: "Architecture", icon: "🏗️" },
    { id: "pipeline", label: "Step-by-Step", icon: "⚙️" },
    { id: "advanced", label: "Advanced", icon: "🚀" },
    { id: "usecases", label: "Use Cases", icon: "💡" },
    { id: "bestpractices", label: "Best Practices", icon: "✅" },
    { id: "glossary", label: "Glossary", icon: "📖" },
    { id: "quiz", label: "Knowledge Check", icon: "🎯" },
  ];

  const quizQuestions = [
    { q: "What is the primary purpose of RAG?", options: ["Replace LLMs entirely", "Ground LLM responses in retrieved external knowledge", "Train new language models", "Compress documents"], correct: 1 },
    { q: "Which step converts text into numerical vectors?", options: ["Chunking", "Indexing", "Embedding Generation", "Query Transformation"], correct: 2 },
    { q: "What does 'Top-k retrieval' mean?", options: ["Retrieving only the first k documents", "Returning the k most similar documents to the query", "Splitting documents into k chunks", "Using k different LLMs"], correct: 1 },
    { q: "Why is text chunking necessary in RAG?", options: ["To make documents look nicer", "Because LLMs can only read small text", "Documents are too large for embedding and context windows", "To delete irrelevant information"], correct: 2 },
    { q: "What is a hallucination in the context of LLMs?", options: ["A visual illusion in generated images", "When the model generates plausible but incorrect information", "A type of embedding error", "An authentication failure"], correct: 1 },
    { q: "Which retrieval strategy combines semantic and keyword search?", options: ["Pure vector search", "BM25 only", "Hybrid Search", "Cross-encoding"], correct: 2 },
  ];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  const filteredGlossary = ragData41.glossary.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navBtn = (section) => (
    <button
      key={section.id}
      onClick={() => { setActiveSection(section.id); setSidebarOpen(false); }}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        padding: "12px 16px", border: "none", borderRadius: 10, cursor: "pointer",
        background: activeSection === section.id ? "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))" : "transparent",
        color: activeSection === section.id ? "#F0F6FC" : "#8B949E",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: activeSection === section.id ? 600 : 400,
        borderLeft: activeSection === section.id ? "3px solid #4ECDC4" : "3px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <span style={{ fontSize: 18 }}>{section.icon}</span>
      {section.label}
    </button>
  );

  const renderIntro = () => (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",
        borderRadius: 20, padding: "48px 40px", marginBottom: 32,
        border: "1px solid #21262D", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(78,205,196,0.15)", borderRadius: 20, marginBottom: 16, border: "1px solid rgba(78,205,196,0.3)" }}>
            <span style={{ color: "#4ECDC4", fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>AI ARCHITECTURE GUIDE</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.15 }}>
            {ragData41.intro.title}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#4ECDC4", margin: "0 0 24px 0", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
            {ragData41.intro.subtitle}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#8B949E", maxWidth: 720, fontFamily: "'DM Sans', sans-serif" }}>
            {ragData41.intro.description}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Accuracy Boost", value: "40-60%", sub: "reduction in hallucinations" },
          { label: "Cost Savings", value: "10x", sub: "cheaper than fine-tuning" },
          { label: "Setup Time", value: "< 1 Day", sub: "for a basic prototype" },
          { label: "Adoption", value: "85%+", sub: "of enterprise AI uses RAG" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "#161B22", borderRadius: 16, padding: 24, textAlign: "center",
            border: "1px solid #21262D", transition: "all 0.3s",
          }}>
            <div style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'JetBrains Mono', monospace" }}>
              {stat.value}
            </div>
            <div style={{ color: "#F0F6FC", fontWeight: 600, fontSize: 14, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            <div style={{ color: "#8B949E", fontSize: 12, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#161B22", borderRadius: 16, padding: 32, border: "1px solid #21262D" }}>
        <h3 style={{ color: "#F0F6FC", margin: "0 0 16px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 20 }}>
          🎯 How RAG Works — The Big Picture
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
          {[
            { icon: "📄", label: "Your Documents", color: "#FF6B6B" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "✂️", label: "Chunk & Embed", color: "#4ECDC4" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🗄️", label: "Vector Database", color: "#45B7D1" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🔍", label: "User Query", color: "#FFEAA7" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "🤖", label: "LLM + Context", color: "#DDA0DD" },
            { icon: "→", label: "", color: "transparent" },
            { icon: "✅", label: "Grounded Answer", color: "#96CEB4" },
          ].map((item, i) =>
            item.label === "" ? (
              <span key={i} style={{ color: "#30363D", fontSize: 20, fontWeight: 700 }}>→</span>
            ) : (
              <div key={i} style={{
                background: `${item.color}15`, border: `1px solid ${item.color}40`,
                borderRadius: 12, padding: "12px 16px", textAlign: "center", minWidth: 90,
              }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ color: item.color, fontSize: 11, fontWeight: 600, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{item.label}</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderWhyRag = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Why Use RAG?
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Understanding the key benefits of Retrieval-Augmented Generation and why it has become the de-facto standard for building production AI applications.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        {ragData41.whyRag.map((item, i) => (
          <div key={i}
            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            style={{
              background: "#161B22", borderRadius: 16, padding: 24,
              border: expandedCard === i ? "1px solid #4ECDC4" : "1px solid #21262D",
              cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
                  <span style={{ color: "#4ECDC4", fontSize: 18, transition: "transform 0.3s", transform: expandedCard === i ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </div>
                <p style={{ color: "#8B949E", margin: "8px 0 0 0", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                {expandedCard === i && (
                  <div style={{
                    marginTop: 16, padding: 16, background: "rgba(78,205,196,0.06)",
                    borderRadius: 10, borderLeft: "3px solid #4ECDC4",
                  }}>
                    <p style={{ color: "#C9D1D9", margin: 0, fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{item.detail}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderArchitecture = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        RAG Architecture Overview
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        A complete visual breakdown of the RAG pipeline showing how data flows from raw documents to intelligent, grounded responses.
      </p>
      <div style={{ background: "#161B22", borderRadius: 20, padding: 32, border: "1px solid #21262D", marginBottom: 24 }}>
        <h3 style={{ color: "#F0F6FC", margin: "0 0 24px 0", fontSize: 20, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
          Complete RAG Pipeline Architecture
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {ragData41.architecture.map((step, i) => (
            <div key={i} style={{
              background: `${step.color}10`, borderRadius: 14, padding: 20, textAlign: "center",
              border: `1px solid ${step.color}30`, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                background: step.color, color: "#0D1117", width: 24, height: 24, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
              }}>
                {step.step}
              </div>
              <div style={{ fontSize: 36, marginTop: 8 }}>{step.icon}</div>
              <div style={{ color: step.color, fontWeight: 700, fontSize: 14, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>{step.title}</div>
              <div style={{ color: "#8B949E", fontSize: 11, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{step.subtitle}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, padding: 20, background: "#0D1117", borderRadius: 12, border: "1px solid #21262D" }}>
          <h4 style={{ color: "#4ECDC4", margin: "0 0 12px 0", fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
            Two Main Phases:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ padding: 16, background: "rgba(255,107,107,0.06)", borderRadius: 10, border: "1px solid rgba(255,107,107,0.2)" }}>
              <div style={{ color: "#FF6B6B", fontWeight: 700, fontSize: 14, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>📥 Indexing Phase (Offline)</div>
              <p style={{ color: "#8B949E", fontSize: 13, margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                Documents are loaded, chunked, embedded, and stored in a vector database. This happens once (or periodically) and prepares your knowledge base for queries.
              </p>
            </div>
            <div style={{ padding: 16, background: "rgba(78,205,196,0.06)", borderRadius: 10, border: "1px solid rgba(78,205,196,0.2)" }}>
              <div style={{ color: "#4ECDC4", fontWeight: 700, fontSize: 14, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>🔍 Retrieval & Generation (Online)</div>
              <p style={{ color: "#8B949E", fontSize: 13, margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                User queries are embedded, similar documents are retrieved from the vector store, and an LLM generates a response grounded in the retrieved context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Step-by-Step Implementation
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 20, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Follow each step to build a complete RAG pipeline from scratch. Click through the steps to see detailed code examples and explanations.
      </p>
      <ProgressIndicator41 steps={ragData41.architecture} activeStep={activeStep} />
      {(() => {
        const step = ragData41.architecture[activeStep];
        return (
          <div style={{
            background: "#161B22", borderRadius: 20, padding: 32, border: `1px solid ${step.color}40`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: `${step.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                border: `1px solid ${step.color}40`,
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ color: step.color, fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>
                  Step {step.step} of {ragData41.architecture.length}
                </div>
                <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 24, fontFamily: "'DM Sans', sans-serif" }}>{step.title}</h3>
              </div>
            </div>
            <p style={{ color: "#C9D1D9", fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
              {step.description}
            </p>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: "#F0F6FC", margin: "0 0 12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>Key Details:</h4>
              <div style={{ display: "grid", gap: 8 }}>
                {step.details.map((detail, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: step.color, fontSize: 16, lineHeight: 1.5 }}>●</span>
                    <span style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <CodeBlock41 code={step.code} title={`Step ${step.step}: ${step.title}`} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "1px solid #30363D",
                  background: activeStep === 0 ? "#0D1117" : "#21262D",
                  color: activeStep === 0 ? "#484F58" : "#C9D1D9",
                  cursor: activeStep === 0 ? "default" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                }}
              >
                ← Previous Step
              </button>
              <button
                onClick={() => setActiveStep(Math.min(ragData41.architecture.length - 1, activeStep + 1))}
                disabled={activeStep === ragData41.architecture.length - 1}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "none",
                  background: activeStep === ragData41.architecture.length - 1 ? "#21262D" : `linear-gradient(135deg, ${step.color}, ${ragData41.architecture[Math.min(activeStep + 1, 5)].color})`,
                  color: activeStep === ragData41.architecture.length - 1 ? "#484F58" : "#0D1117",
                  cursor: activeStep === ragData41.architecture.length - 1 ? "default" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14,
                }}
              >
                Next Step →
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );

  const renderAdvanced = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Advanced RAG Techniques
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Take your RAG system to the next level with these production-grade optimization techniques used by leading AI teams.
      </p>
      <div style={{ display: "grid", gap: 20 }}>
        {ragData41.advancedTopics.map((topic, i) => (
          <div key={i} style={{ background: "#161B22", borderRadius: 16, padding: 28, border: "1px solid #21262D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{topic.icon}</span>
              <h3 style={{ color: "#F0F6FC", margin: 0, fontSize: 20, fontFamily: "'DM Sans', sans-serif" }}>{topic.title}</h3>
            </div>
            <p style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
              {topic.description}
            </p>
            <CodeBlock41 code={topic.example} title={topic.title} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderUseCases = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Real-World Use Cases
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        RAG is being deployed across every industry. Here are some of the most impactful applications.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {ragData41.useCases.map((uc, i) => (
          <div key={i} style={{
            background: "#161B22", borderRadius: 16, padding: 24, border: "1px solid #21262D",
            transition: "all 0.3s",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{uc.icon}</div>
            <h3 style={{ color: "#F0F6FC", margin: "0 0 8px 0", fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>{uc.title}</h3>
            <p style={{ color: "#8B949E", margin: 0, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{uc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBestPractices = () => {
    const categories = [...new Set(ragData41.bestPractices.map((b) => b.category))];
    return (
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
          Best Practices & Tips
        </h2>
        <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Production-tested guidelines to help you build reliable, high-quality RAG systems.
        </p>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{
              display: "inline-block", padding: "4px 14px", background: "rgba(78,205,196,0.12)",
              borderRadius: 20, marginBottom: 14, border: "1px solid rgba(78,205,196,0.25)",
            }}>
              <span style={{ color: "#4ECDC4", fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{cat}</span>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {ragData41.bestPractices.filter((b) => b.category === cat).map((bp, i) => (
                <div key={i} style={{ background: "#161B22", borderRadius: 14, padding: 20, border: "1px solid #21262D" }}>
                  <h4 style={{ color: "#F0F6FC", margin: "0 0 8px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>{bp.title}</h4>
                  <p style={{ color: "#8B949E", margin: 0, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{bp.tip}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGlossary = () => (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
        Glossary of Terms
      </h2>
      <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 20, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
        Quick reference for all the key terminology used in RAG systems.
      </p>
      <input
        type="text"
        placeholder="🔍 Search terms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%", padding: "12px 18px", borderRadius: 12,
          background: "#0D1117", border: "1px solid #21262D", color: "#F0F6FC",
          fontSize: 15, fontFamily: "'DM Sans', sans-serif", marginBottom: 20,
          outline: "none", boxSizing: "border-box",
        }}
      />
      <div style={{ display: "grid", gap: 10 }}>
        {filteredGlossary.map((item, i) => (
          <div key={i} style={{ background: "#161B22", borderRadius: 12, padding: 18, border: "1px solid #21262D" }}>
            <span style={{ color: "#4ECDC4", fontWeight: 700, fontSize: 15, fontFamily: "'JetBrains Mono', monospace" }}>{item.term}</span>
            <span style={{ color: "#30363D", margin: "0 10px" }}>—</span>
            <span style={{ color: "#8B949E", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.definition}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    const score = Object.entries(quizAnswers).filter(([q, a]) => a === quizQuestions[parseInt(q)].correct).length;
    return (
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#F0F6FC", margin: "0 0 8px 0", fontFamily: "'DM Sans', sans-serif" }}>
          Knowledge Check
        </h2>
        <p style={{ color: "#8B949E", fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
          Test your understanding of RAG concepts. Select the best answer for each question.
        </p>
        <div style={{ display: "grid", gap: 20 }}>
          {quizQuestions.map((qq, qi) => (
            <div key={qi} style={{ background: "#161B22", borderRadius: 16, padding: 24, border: "1px solid #21262D" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{
                  minWidth: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: showQuizResults ? (quizAnswers[qi] === qq.correct ? "#23863620" : quizAnswers[qi] !== undefined ? "#FF6B6B20" : "#21262D") : "#21262D",
                  color: showQuizResults ? (quizAnswers[qi] === qq.correct ? "#7EE787" : quizAnswers[qi] !== undefined ? "#FF6B6B" : "#8B949E") : "#8B949E",
                  fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {qi + 1}
                </div>
                <p style={{ color: "#F0F6FC", margin: 0, fontSize: 15, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{qq.q}</p>
              </div>
              <div style={{ display: "grid", gap: 8, paddingLeft: 44 }}>
                {qq.options.map((opt, oi) => {
                  const isSelected = quizAnswers[qi] === oi;
                  const isCorrect = oi === qq.correct;
                  let bg = "#0D1117";
                  let borderColor = "#21262D";
                  let textColor = "#8B949E";
                  if (showQuizResults && isCorrect) { bg = "rgba(35,134,54,0.15)"; borderColor = "#238636"; textColor = "#7EE787"; }
                  else if (showQuizResults && isSelected && !isCorrect) { bg = "rgba(255,107,107,0.1)"; borderColor = "#FF6B6B"; textColor = "#FF6B6B"; }
                  else if (isSelected) { bg = "rgba(78,205,196,0.1)"; borderColor = "#4ECDC4"; textColor = "#4ECDC4"; }
                  return (
                    <button key={oi} onClick={() => !showQuizResults && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                        borderRadius: 10, border: `1px solid ${borderColor}`, background: bg,
                        color: textColor, cursor: showQuizResults ? "default" : "pointer",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, transition: "all 0.2s",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <button onClick={() => { setShowQuizResults(true); }}
            style={{
              padding: "12px 28px", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #4ECDC4, #45B7D1)", color: "#0D1117",
              fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Check Answers
          </button>
          <button onClick={() => { setQuizAnswers({}); setShowQuizResults(false); }}
            style={{
              padding: "12px 28px", borderRadius: 12, border: "1px solid #30363D",
              background: "#21262D", color: "#C9D1D9", cursor: "pointer",
              fontWeight: 600, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Reset Quiz
          </button>
        </div>
        {showQuizResults && (
          <div style={{
            marginTop: 20, padding: 20, borderRadius: 14,
            background: score >= 4 ? "rgba(35,134,54,0.1)" : "rgba(255,107,107,0.1)",
            border: `1px solid ${score >= 4 ? "#238636" : "#FF6B6B"}40`,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: score >= 4 ? "#7EE787" : "#FF6B6B", fontFamily: "'DM Sans', sans-serif" }}>
              {score >= 5 ? "🎉 Excellent!" : score >= 4 ? "👏 Great Job!" : score >= 2 ? "📚 Keep Learning!" : "💪 Review the Material"}
            </div>
            <div style={{ color: "#8B949E", fontSize: 14, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
              You scored {score} out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "intro": return renderIntro();
      case "why": return renderWhyRag();
      case "architecture": return renderArchitecture();
      case "pipeline": return renderPipeline();
      case "advanced": return renderAdvanced();
      case "usecases": return renderUseCases();
      case "bestpractices": return renderBestPractices();
      case "glossary": return renderGlossary();
      case "quiz": return renderQuiz();
      default: return renderIntro();
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D1117", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Mobile menu toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: "none", position: "fixed", top: 16, left: 16, zIndex: 1000,
          width: 44, height: 44, borderRadius: 12, border: "1px solid #21262D",
          background: "#161B22", color: "#F0F6FC", cursor: "pointer", fontSize: 20,
          alignItems: "center", justifyContent: "center",
          ...(typeof window !== "undefined" && window.innerWidth <= 768 ? { display: "flex" } : {}),
        }}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside style={{
        width: 260, minWidth: 260, background: "#0D1117", borderRight: "1px solid #21262D",
        padding: "24px 16px", display: "flex", flexDirection: "column", gap: 4,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        ...(typeof window !== "undefined" && window.innerWidth <= 768
          ? { position: "fixed", left: sidebarOpen ? 0 : -280, zIndex: 999, transition: "left 0.3s", boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.5)" : "none" }
          : {}),
      }}>
        <div style={{ marginBottom: 20, paddingLeft: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F0F6FC" }}>📘 RAG Guide</div>
          <div style={{ color: "#484F58", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>Beginner → Master</div>
        </div>
        {sections.map(navBtn)}
        <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #21262D" }}>
          <div style={{ color: "#484F58", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
            Interactive Learning Guide
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} />
      )}

      {/* Main Content */}
      <main ref={contentRef} style={{
        flex: 1, padding: "32px clamp(20px, 4vw, 48px)", overflowY: "auto", maxHeight: "100vh",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {renderContent()}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #21262D", textAlign: "center" }}>
            <p style={{ color: "#484F58", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
              RAG Complete Guide — From Fundamentals to Production
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// COMBINED NAVIGATION WRAPPER
// ============================================================
export default function RAGCombined() {
  const [activeModule, setActiveModule] = React.useState(0);

  const modules = [
    { id: 0, label: '39. RAG Basics' },
    { id: 1, label: '40. RAG' },
    { id: 2, label: '41. RAG Guide' },
  ];

  const navBg = '#0a0e1a';
  const navBorder = '#1e3a5f';
  const activeColor = '#00d4ff';
  const inactiveColor = '#475569';

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '10px 16px',
        background: navBg,
        borderBottom: `2px solid ${navBorder}`,
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}>
        <span style={{
          color: activeColor,
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          marginRight: 8,
          fontWeight: 700,
          letterSpacing: 1,
        }}>
          RAG Suite:
        </span>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              padding: '5px 14px',
              borderRadius: 5,
              border: `1px solid ${activeModule === mod.id ? activeColor : navBorder}`,
              background: activeModule === mod.id ? `${activeColor}18` : 'transparent',
              color: activeModule === mod.id ? activeColor : inactiveColor,
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {mod.label}
          </button>
        ))}
      </div>
      <div>
        {activeModule === 0 && <RAGBasics />}
        {activeModule === 1 && <RAGFull />}
        {activeModule === 2 && <RAGGuideComp />}
      </div>
    </div>
  );
}
