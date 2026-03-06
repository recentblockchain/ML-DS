import{r as p,j as e}from"./index-CIDXSLTw.js";var a={heading:"'Fraunces', serif",body:"'Source Sans 3', sans-serif",mono:"'JetBrains Mono', monospace"},n={bg:"#F8FAFC",surface:"#FFFFFF",dark:"#0F172A",darkAlt:"#1E293B",text:"#334155",textLight:"#475569",muted:"#64748B",mutedLight:"#94A3B8",border:"#E2E8F0",borderLight:"#F1F5F9",accent:"#0D9488",accentLight:"#5EEAD4",purple:"#7C3AED"},T=[{id:1,title:"Document Ingestion",icon:"📥",color:"#0D9488",shortDesc:"Load and prepare your knowledge base documents",detail:`Document Ingestion is the very first step in building a RAG system. Think of it as "feeding" your AI system with all the knowledge it needs to answer questions accurately.

In this phase, you gather all relevant documents — PDFs, web pages, databases, text files, spreadsheets, or any structured/unstructured data — and load them into your pipeline. The goal is to make raw information accessible for the next processing stages.`,keyPoints:["Collect documents from various sources (PDFs, databases, APIs, web scraping)","Normalize formats — convert everything to a consistent text representation","Handle metadata extraction (author, date, source URL, document type)","Implement error handling for corrupted or unreadable files","Consider document versioning to keep knowledge up-to-date"],example:{title:"Python Example — Loading Documents",code:`from langchain.document_loaders import (
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
print(f"First doc preview: {all_documents[0].page_content[:200]}")`},example2:{title:"Real-World Scenario",text:`Imagine you're building a customer support chatbot for a university. Your document ingestion step would involve loading:
      
• Student handbook (PDF) — contains policies and procedures
• Course catalog (database) — lists all courses and prerequisites  
• FAQ pages (web scraping) — common questions from the website
• IT support tickets (CSV) — past resolved issues and solutions

Each source requires a different loader, but the output is always a unified list of text documents ready for the next step.`}},{id:2,title:"Text Chunking",icon:"✂️",color:"#7C3AED",shortDesc:"Split documents into smaller, meaningful pieces",detail:`Text Chunking is the process of breaking large documents into smaller, digestible pieces called "chunks." This is crucial because embedding models and LLMs have token limits, and smaller chunks lead to more precise retrieval.

The art of chunking lies in finding the right balance — chunks should be small enough to be specific but large enough to retain meaningful context. Poor chunking leads to poor retrieval, which leads to poor answers.`,keyPoints:["Chunk size matters — typically 200-1000 tokens work well","Overlap between chunks preserves context across boundaries","Recursive splitting respects document structure (paragraphs, sections)","Semantic chunking groups related sentences together","Metadata should be preserved with each chunk for traceability"],example:{title:"Python Example — Chunking Strategies",code:`from langchain.text_splitter import (
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
print(f"Sample chunk: {chunks[0].page_content[:150]}...")`},example2:{title:"Chunking Analogy",text:`Think of chunking like organizing a textbook for studying:

📖 The full textbook = Your original document
📑 Chapters = Too large for precise search  
📄 Sections = Good — focused on one topic each
📝 Paragraphs = Even more precise for specific facts
✏️ Sentences = Too small — loses context

The "sweet spot" is usually section-level chunks (200-500 tokens) with some overlap so that if a concept spans two chunks, both chunks capture it.`}},{id:3,title:"Embedding Generation",icon:"🧮",color:"#DC2626",shortDesc:"Convert text chunks into numerical vector representations",detail:`Embedding Generation transforms human-readable text into dense numerical vectors (arrays of numbers) that capture semantic meaning. These vectors exist in a high-dimensional space where similar concepts are positioned close together.

This is the mathematical backbone of RAG — it allows the system to understand meaning rather than just matching keywords. The sentence "The cat sat on the mat" and "A feline rested on the rug" would have very similar embeddings despite sharing almost no words.`,keyPoints:["Embeddings capture semantic meaning, not just keywords","Popular models: OpenAI text-embedding-ada-002, Sentence-BERT, Cohere embed","Vector dimensions typically range from 384 to 1536","Cosine similarity measures how close two vectors are","Choose embedding models based on your domain and language needs"],example:{title:"Python Example — Creating Embeddings",code:`from langchain.embeddings import OpenAIEmbeddings
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
print(f"ML vs Pizza similarity: {cosine_sim(vectors[0], vectors[2]):.3f}")`},example2:{title:"Understanding Embeddings Visually",text:`Imagine a 3D space where every concept has a position:

🟢 "dog" → [0.8, 0.2, 0.9]
🟢 "puppy" → [0.79, 0.21, 0.88]  ← Very close to "dog"!
🔵 "cat" → [0.7, 0.3, 0.85]      ← Nearby (also a pet)
🔴 "airplane" → [0.1, 0.9, 0.2]  ← Far away (different concept)

In reality, embeddings use 384-1536 dimensions (not just 3), which allows them to capture incredibly nuanced relationships between concepts like tone, formality, domain, and specificity.`}},{id:4,title:"Vector Store Indexing",icon:"🗄️",color:"#EA580C",shortDesc:"Store embeddings in a specialized database for fast retrieval",detail:`Vector Store Indexing is where you save all your generated embeddings into a specialized database designed for lightning-fast similarity searches. Unlike traditional databases that match exact values, vector stores find the "most similar" vectors using distance metrics.

Think of it as building a highly organized library where books aren't sorted alphabetically, but by meaning — so books about similar topics are physically next to each other on the shelves.`,keyPoints:["Vector databases: Pinecone, Weaviate, ChromaDB, FAISS, Qdrant, Milvus","Indexing algorithms: HNSW, IVF, PQ for efficient nearest-neighbor search","Metadata filters allow combining semantic + structured search","Persistence ensures your index survives restarts","Batch insertion is more efficient than one-by-one"],example:{title:"Python Example — Building a Vector Store",code:`import chromadb
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
print(f"Index contains {loaded_store.index.ntotal} vectors")`},example2:{title:"Choosing a Vector Database",text:`Here's a quick comparison for beginners:

🟢 ChromaDB — Best for learning and prototyping. Free, runs locally, simple API. Start here!

🔵 FAISS — Best for speed. Created by Meta/Facebook. Blazing fast but no built-in persistence.

🟡 Pinecone — Best for production. Fully managed cloud service. Scales automatically but costs money.

🟣 Weaviate — Best for hybrid search. Combines vector + keyword search. Open-source with cloud option.

🔴 Qdrant — Best for filtering. Excellent metadata filtering with vector search. Rust-based, very fast.

For learning RAG, start with ChromaDB. Move to Pinecone or Qdrant when you need production scale.`}},{id:5,title:"Query Processing",icon:"🔍",color:"#2563EB",shortDesc:"Transform user questions into effective search queries",detail:`Query Processing is the step where a user's natural language question is prepared for retrieval. This isn't just about embedding the query — it involves understanding intent, expanding the query, and sometimes reformulating it for better retrieval.

A user might ask "How do I fix my WiFi?" but the knowledge base might contain documents titled "Network Troubleshooting Guide." Query processing bridges this gap by understanding the underlying intent and reformulating when needed.`,keyPoints:["Embed the user query using the SAME model used for documents","Query expansion adds synonyms and related terms","HyDE (Hypothetical Document Embeddings) generates a hypothetical answer first","Multi-query retrieval creates multiple reformulations of the same question","Intent classification helps route to the right knowledge base"],example:{title:"Python Example — Advanced Query Processing",code:`from langchain.retrievers.multi_query import MultiQueryRetriever
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
)`},example2:{title:"Why Query Processing Matters",text:`Consider this real scenario:

User asks: "Can I take AI class without math?"

Without processing: Searches for exact phrase match — might miss relevant docs.

With processing, the system generates:
  → "Prerequisites for artificial intelligence course"
  → "Mathematics requirements for AI classes"
  → "Can students enroll in AI without calculus?"

Each reformulation catches different relevant documents that the original phrasing might miss. This dramatically improves retrieval quality and ensures the final answer is comprehensive.`}},{id:6,title:"Retrieval & Ranking",icon:"🎯",color:"#059669",shortDesc:"Find and rank the most relevant chunks for the query",detail:`Retrieval & Ranking is where the system searches the vector store and returns the most relevant document chunks for the user's query. But raw similarity search isn't always enough — re-ranking ensures the truly best results float to the top.

This is a two-stage process: first, cast a wide net with fast approximate search (retrieve top 20-50 candidates), then apply a more sophisticated re-ranking model to select the final top 3-5 most relevant chunks.`,keyPoints:["Similarity search finds the k nearest vectors (k-NN search)","MMR (Maximum Marginal Relevance) balances relevance with diversity","Cross-encoder re-rankers provide more accurate relevance scores","Hybrid search combines dense vectors with sparse keyword matching (BM25)","Score thresholds filter out irrelevant results even if they're the 'closest'"],example:{title:"Python Example — Retrieval with Re-Ranking",code:`from langchain.retrievers import ContextualCompressionRetriever
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
)`},example2:{title:"Two-Stage Retrieval Explained",text:`Stage 1 — Fast Retrieval (Bi-Encoder):
🔍 Searches millions of chunks in milliseconds
📊 Uses pre-computed embeddings (very fast)
📋 Returns top 20 candidates (rough ranking)
⚡ Like scanning book titles in a library

Stage 2 — Precise Re-Ranking (Cross-Encoder):
🎯 Analyzes query + document together (slower but accurate)
📊 Gives precise relevance scores
📋 Selects final top 3-5 results
🔬 Like reading the first paragraph of each book

This two-stage approach gives you both speed AND accuracy.`}},{id:7,title:"Context Assembly & Prompting",icon:"🧩",color:"#B45309",shortDesc:"Combine retrieved context with the query into an LLM prompt",detail:`Context Assembly is where you craft the final prompt that will be sent to the Large Language Model (LLM). This step combines the user's original question with the retrieved document chunks in a structured prompt template.

The quality of your prompt template dramatically affects output quality. A well-designed prompt tells the LLM exactly how to use the retrieved context, what to do when the context doesn't contain the answer, and what format to respond in.`,keyPoints:["Structure the prompt with clear sections: context, question, instructions","Include source attribution instructions for traceability","Add guardrails: 'If the context doesn't contain the answer, say so'","Manage token budget — leave room for both context and response","Use few-shot examples in the prompt for consistent output format"],example:{title:"Python Example — Prompt Engineering for RAG",code:`from langchain.prompts import PromptTemplate
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
print("Sources:", [d.metadata for d in response["source_documents"]])`},example2:{title:"Prompt Template Best Practices",text:`A great RAG prompt template has these components:

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
   Enables verification and builds trust.`}},{id:8,title:"Response Generation & Evaluation",icon:"✨",color:"#9333EA",shortDesc:"Generate the final answer and evaluate its quality",detail:`Response Generation is the final step where the LLM produces the answer based on the assembled prompt. But generating an answer isn't enough — you need to evaluate whether the response is accurate, grounded in the retrieved context, and actually helpful.

Evaluation in RAG has unique metrics beyond traditional NLP: faithfulness (does the answer stick to the context?), relevancy (is the retrieved context relevant?), and answer correctness (is the final answer right?).`,keyPoints:["Faithfulness: Does the answer only use information from the context?","Context Relevancy: Were the retrieved chunks actually relevant?","Answer Relevancy: Does the answer actually address the question?","Use RAGAS framework for automated RAG evaluation","Human evaluation remains the gold standard for quality assessment"],example:{title:"Python Example — RAG Evaluation with RAGAS",code:`from ragas import evaluate
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
# {'faithfulness': 0.92, 'answer_relevancy': 0.88, ...}`},example2:{title:"Common RAG Failure Modes",text:`Understanding what can go wrong helps you build better systems:

❌ Hallucination: LLM makes up information not in the context
   Fix: Stronger prompt guardrails + faithfulness evaluation

❌ Wrong Retrieval: System finds irrelevant chunks
   Fix: Better chunking + re-ranking + hybrid search

❌ Missing Context: Answer exists in docs but wasn't retrieved
   Fix: Increase k value + multi-query retrieval

❌ Lost in the Middle: LLM ignores context in the middle of long prompts
   Fix: Put most relevant chunks first and last

❌ Over-Reliance: System can't say "I don't know"
   Fix: Add confidence thresholds + explicit "no answer" instructions`}}],Y=[{name:"Naive RAG",desc:"Simple retrieve-then-generate pipeline. Good for learning, limited in production.",flow:["Query → Embed → Retrieve → Generate"],level:"Beginner"},{name:"Advanced RAG",desc:"Adds pre-retrieval optimization and post-retrieval re-ranking for better accuracy.",flow:["Query Rewrite → Embed → Retrieve → Re-Rank → Generate"],level:"Intermediate"},{name:"Modular RAG",desc:"Flexible architecture with interchangeable components. Production-ready systems.",flow:["Route → Retrieve + Search → Fuse → Re-Rank → Generate → Evaluate"],level:"Advanced"}],K=[{term:"Embedding",def:"A numerical vector representation of text that captures semantic meaning."},{term:"Vector Store",def:"A specialized database for storing and querying high-dimensional vectors."},{term:"Chunk",def:"A small segment of text split from a larger document for processing."},{term:"k-NN",def:"k-Nearest Neighbors — finding the k most similar vectors to a query."},{term:"Cosine Similarity",def:"A metric measuring the angle between two vectors (1 = identical, 0 = unrelated)."},{term:"Hallucination",def:"When an LLM generates information not supported by the provided context."},{term:"Re-Ranking",def:"A second-pass scoring of retrieved documents for more accurate relevance ordering."},{term:"Tokenization",def:"Breaking text into tokens (words/subwords) that models can process."},{term:"Retriever",def:"The component responsible for finding relevant documents from the knowledge base."},{term:"Context Window",def:"The maximum number of tokens an LLM can process in a single prompt."},{term:"BM25",def:"A keyword-based ranking algorithm used in hybrid search alongside vector search."},{term:"HNSW",def:"Hierarchical Navigable Small World — a fast approximate nearest-neighbor index algorithm."}],z=[{q:"What is the primary purpose of text chunking in RAG?",options:["To make documents look prettier","To break documents into smaller pieces for precise retrieval","To compress documents and save storage","To translate documents into different languages"],correct:1},{q:"What do embeddings represent?",options:["The physical location of a document","A numerical vector capturing semantic meaning of text","The number of words in a document","A hash code for document identification"],correct:1},{q:"Why is re-ranking important in RAG?",options:["It makes the system faster","It reduces storage costs","It provides more accurate relevance scoring after initial retrieval","It translates queries into SQL"],correct:2},{q:"What does 'faithfulness' measure in RAG evaluation?",options:["How fast the system responds","Whether the answer only uses information from the retrieved context","How many documents were retrieved","The grammatical correctness of the response"],correct:1},{q:"Which is the recommended chunk size range for most RAG applications?",options:["10-50 tokens","200-1000 tokens","5000-10000 tokens","The entire document as one chunk"],correct:1},{q:"What is HyDE in query processing?",options:["A vector database","A chunking algorithm","Generating a hypothetical answer to improve search","A programming language for RAG"],correct:2}],G=function({code:r,title:m}){const[o,g]=p.useState(!1),u=()=>{navigator.clipboard.writeText(r),g(!0),setTimeout(()=>g(!1),2e3)};return e.jsxs("div",{style:{background:n.dark,borderRadius:12,overflow:"hidden",marginTop:16,border:`1px solid ${n.darkAlt}`},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:n.darkAlt,borderBottom:"1px solid #334155"},children:[e.jsx("span",{style:{color:n.mutedLight,fontSize:13,fontFamily:a.mono},children:m}),e.jsx("button",{onClick:u,style:{background:o?"#059669":"#334155",border:"none",color:"#E2E8F0",padding:"4px 12px",borderRadius:6,cursor:"pointer",fontSize:12,transition:"all 0.2s",fontFamily:a.mono},children:o?"✓ Copied":"📋 Copy"})]}),e.jsx("pre",{style:{margin:0,padding:20,overflowX:"auto",fontSize:13,lineHeight:1.7,color:"#E2E8F0",fontFamily:a.mono},children:e.jsx("code",{children:r})})]})},X=function({step:r,isActive:m,onClick:o}){return e.jsxs("div",{onClick:o,style:{background:m?`linear-gradient(135deg, ${r.color}15, ${r.color}08)`:n.surface,border:`2px solid ${m?r.color:n.border}`,borderRadius:16,padding:"20px 24px",cursor:"pointer",transition:"all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",transform:m?"scale(1.02)":"scale(1)",boxShadow:m?`0 8px 30px ${r.color}20`:"0 2px 8px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"},children:[m&&e.jsx("div",{style:{position:"absolute",top:0,left:0,width:4,height:"100%",background:r.color,borderRadius:"0 4px 4px 0"}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:12,background:`${r.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0},children:r.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("span",{style:{fontSize:11,fontWeight:700,color:r.color,background:`${r.color}15`,padding:"2px 8px",borderRadius:20,fontFamily:a.mono},children:["STEP ",r.id]}),e.jsx("h3",{style:{margin:0,fontSize:17,fontWeight:700,color:n.dark,fontFamily:a.heading},children:r.title})]}),e.jsx("p",{style:{margin:"6px 0 0",fontSize:13.5,color:n.muted,lineHeight:1.4,fontFamily:a.body},children:r.shortDesc})]}),e.jsx("div",{style:{fontSize:18,color:m?r.color:"#CBD5E1",transition:"all 0.3s",transform:m?"rotate(90deg)":"rotate(0)"},children:"▶"})]})]})},Z=function(){const[r,m]=p.useState(0),[o,g]=p.useState(null),[u,C]=p.useState(0),[b,_]=p.useState(!1),[l,s]=p.useState(!1),d=f=>{l||(g(f),s(!0),f===z[r].correct&&C(S=>S+1))},F=()=>{r<z.length-1?(m(f=>f+1),g(null),s(!1)):_(!0)},v=()=>{m(0),g(null),C(0),_(!1),s(!1)};if(b){const f=Math.round(u/z.length*100);return e.jsxs("div",{style:{textAlign:"center",padding:40},children:[e.jsx("div",{style:{fontSize:64,marginBottom:16},children:f>=80?"🏆":f>=50?"👍":"📚"}),e.jsx("h3",{style:{fontSize:28,fontFamily:a.heading,color:n.dark,margin:"0 0 8px"},children:f>=80?"Excellent!":f>=50?"Good Job!":"Keep Learning!"}),e.jsxs("p",{style:{fontSize:18,color:n.muted,fontFamily:a.body},children:["You scored"," ",e.jsxs("strong",{style:{color:n.accent},children:[u,"/",z.length]})," ","(",f,"%)"]}),e.jsx("button",{onClick:v,style:{marginTop:20,padding:"12px 32px",background:n.accent,color:"white",border:"none",borderRadius:10,fontSize:15,cursor:"pointer",fontWeight:600,fontFamily:a.body},children:"Retry Quiz"})]})}const w=z[r];return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20},children:[e.jsxs("span",{style:{fontSize:13,color:n.muted,fontFamily:a.mono},children:["Question ",r+1," of ",z.length]}),e.jsxs("span",{style:{fontSize:13,color:n.accent,fontWeight:600,fontFamily:a.mono},children:["Score: ",u]})]}),e.jsx("div",{style:{width:"100%",height:4,background:n.border,borderRadius:2,marginBottom:24},children:e.jsx("div",{style:{width:`${(r+1)/z.length*100}%`,height:"100%",background:`linear-gradient(90deg, ${n.accent}, ${n.purple})`,borderRadius:2,transition:"width 0.5s"}})}),e.jsx("h4",{style:{fontSize:18,color:n.dark,marginBottom:20,lineHeight:1.5,fontFamily:a.body,fontWeight:600},children:w.q}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:w.options.map((f,S)=>{let k=n.bg,M=n.border,B=n.text;return l?S===w.correct?(k="#ECFDF5",M="#059669",B="#065F46"):S===o&&S!==w.correct&&(k="#FEF2F2",M="#DC2626",B="#991B1B"):S===o&&(k="#F0F9FF",M="#2563EB",B="#1E40AF"),e.jsxs("button",{onClick:()=>d(S),style:{padding:"14px 18px",background:k,border:`2px solid ${M}`,borderRadius:10,cursor:l?"default":"pointer",textAlign:"left",fontSize:15,color:B,transition:"all 0.2s",fontFamily:a.body,lineHeight:1.4},children:[e.jsxs("span",{style:{fontWeight:700,marginRight:10,fontFamily:a.mono,fontSize:13},children:[String.fromCharCode(65+S),"."]}),f]},S)})}),l&&e.jsx("div",{style:{marginTop:20,textAlign:"right"},children:e.jsx("button",{onClick:F,style:{padding:"10px 28px",background:n.accent,color:"white",border:"none",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600,fontFamily:a.body},children:r<z.length-1?"Next Question →":"See Results"})})]})},ee=function(){const[r,m]=p.useState(0),[o,g]=p.useState("steps"),[u,C]=p.useState(""),b=K.filter(s=>s.term.toLowerCase().includes(u.toLowerCase())||s.def.toLowerCase().includes(u.toLowerCase())),_=[{id:"steps",label:"Step-by-Step Guide",icon:"📖"},{id:"architecture",label:"Architectures",icon:"🏗️"},{id:"glossary",label:"Glossary",icon:"📚"},{id:"quiz",label:"Knowledge Check",icon:"🧪"}],l=T[r];return e.jsxs("div",{style:{minHeight:"100vh",background:n.bg,fontFamily:a.body},children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;900&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",rel:"stylesheet"}),e.jsxs("div",{style:{background:`linear-gradient(135deg, ${n.dark} 0%, ${n.darkAlt} 50%, ${n.dark} 100%)`,position:"relative",overflow:"hidden",padding:"56px 24px 48px"},children:[e.jsx("div",{style:{position:"absolute",inset:0,opacity:.07,backgroundImage:`radial-gradient(circle at 1px 1px, ${n.mutedLight} 1px, transparent 0)`,backgroundSize:"32px 32px"}}),e.jsx("div",{style:{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle, ${n.accent}30, transparent 70%)`}}),e.jsx("div",{style:{position:"absolute",bottom:-80,left:-80,width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle, ${n.purple}20, transparent 70%)`}}),e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",position:"relative",zIndex:1},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:`${n.accent}25`,border:`1px solid ${n.accent}40`,borderRadius:24,padding:"6px 16px",marginBottom:20},children:[e.jsx("span",{style:{fontSize:14},children:"🤖"}),e.jsx("span",{style:{fontSize:13,color:n.accentLight,fontWeight:600,letterSpacing:.5,fontFamily:a.mono},children:"COMPLETE BEGINNER'S GUIDE"})]}),e.jsxs("h1",{style:{fontSize:"clamp(32px, 5vw, 52px)",fontWeight:900,color:n.bg,margin:"0 0 16px",lineHeight:1.1,fontFamily:a.heading},children:["Retrieval-Augmented"," ",e.jsx("span",{style:{background:"linear-gradient(135deg, #2DD4BF, #818CF8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Generation"})]}),e.jsx("p",{style:{fontSize:"clamp(16px, 2.5vw, 20px)",color:n.mutedLight,maxWidth:650,lineHeight:1.6,margin:0},children:"Master the art of building AI systems that retrieve real knowledge before generating answers. From document loading to evaluation — every step explained with code and examples."}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:24,marginTop:28},children:[{icon:"📄",label:"8 Detailed Steps"},{icon:"💻",label:"Code Examples"},{icon:"🧪",label:"Interactive Quiz"},{icon:"🎯",label:"Real-World Scenarios"}].map((s,d)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,color:"#CBD5E1",fontSize:14},children:[e.jsx("span",{children:s.icon}),e.jsx("span",{style:{fontFamily:a.body},children:s.label})]},d))})]})]}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto",padding:"40px 24px 0"},children:e.jsxs("div",{style:{background:"linear-gradient(135deg, #ECFDF5, #F0FDFA)",border:"2px solid #99F6E4",borderRadius:16,padding:28},children:[e.jsx("h2",{style:{fontSize:22,fontWeight:700,color:n.dark,margin:"0 0 12px",fontFamily:a.heading},children:"🤔 What is RAG?"}),e.jsxs("p",{style:{fontSize:16,color:n.text,lineHeight:1.75,margin:"0 0 16px"},children:[e.jsx("strong",{children:"Retrieval-Augmented Generation (RAG)"})," is a technique that enhances Large Language Models (LLMs) by giving them access to external knowledge before they generate a response. Instead of relying solely on what the model memorized during training, RAG ",e.jsx("em",{children:"retrieves"})," relevant documents from a knowledge base and ",e.jsx("em",{children:"augments"})," the LLM's prompt with this information."]}),e.jsx("p",{style:{fontSize:16,color:n.text,lineHeight:1.75,margin:0},children:'Think of it like an open-book exam: the LLM can look up specific facts in its "textbook" (your documents) before answering, instead of relying purely on memory. This dramatically reduces hallucinations, enables domain-specific answers, and keeps knowledge up-to-date without retraining the model.'}),e.jsx("div",{style:{marginTop:20,padding:"16px 20px",background:n.surface,borderRadius:12,border:"1px solid #D1FAE5"},children:e.jsxs("div",{style:{fontFamily:a.mono,fontSize:14,color:n.accent,textAlign:"center",lineHeight:2.2},children:["User Question → ",e.jsx("strong",{children:"Retrieve"})," Relevant Docs →"," ",e.jsx("strong",{children:"Augment"})," Prompt with Context → ",e.jsx("strong",{children:"Generate"})," ","Grounded Answer"]})})]})}),e.jsx("div",{style:{maxWidth:900,margin:"0 auto",padding:"32px 24px 0"},children:e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",background:n.surface,borderRadius:14,padding:6,border:`1px solid ${n.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},children:_.map(s=>e.jsxs("button",{onClick:()=>g(s.id),style:{flex:1,minWidth:140,padding:"12px 16px",background:o===s.id?n.dark:"transparent",color:o===s.id?n.surface:n.muted,border:"none",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600,transition:"all 0.3s",fontFamily:a.body},children:[s.icon," ",s.label]},s.id))})}),e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"28px 24px 60px"},children:[o==="steps"&&e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:32},children:T.map((s,d)=>e.jsx(X,{step:s,isActive:r===d,onClick:()=>m(d)},s.id))}),e.jsxs("div",{style:{background:n.surface,borderRadius:20,border:`2px solid ${l.color}30`,boxShadow:`0 12px 40px ${l.color}10`,overflow:"hidden"},children:[e.jsx("div",{style:{background:`linear-gradient(135deg, ${l.color}12, ${l.color}05)`,padding:"28px 32px",borderBottom:`1px solid ${l.color}20`},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14},children:[e.jsx("span",{style:{fontSize:36},children:l.icon}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontSize:12,fontWeight:700,color:l.color,fontFamily:a.mono},children:["STEP ",l.id," OF 8"]}),e.jsx("h2",{style:{margin:"4px 0 0",fontSize:26,fontWeight:700,color:n.dark,fontFamily:a.heading},children:l.title})]})]})}),e.jsxs("div",{style:{padding:"28px 32px"},children:[e.jsx("div",{style:{fontSize:16,color:n.text,lineHeight:1.8,whiteSpace:"pre-line",marginBottom:28},children:l.detail}),e.jsxs("div",{style:{background:n.bg,borderRadius:14,padding:24,marginBottom:28,border:`1px solid ${n.border}`},children:[e.jsx("h3",{style:{fontSize:16,fontWeight:700,color:n.dark,margin:"0 0 16px",fontFamily:a.heading},children:"🔑 Key Points"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:l.keyPoints.map((s,d)=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:24,height:24,borderRadius:6,background:`${l.color}15`,color:l.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,fontFamily:a.mono},children:d+1}),e.jsx("span",{style:{fontSize:15,color:n.textLight,lineHeight:1.6},children:s})]},d))})]}),e.jsxs("div",{style:{marginBottom:28},children:[e.jsx("h3",{style:{fontSize:16,fontWeight:700,color:n.dark,margin:"0 0 4px",fontFamily:a.heading},children:"💻 Code Example"}),e.jsx(G,{code:l.example.code,title:l.example.title})]}),e.jsxs("div",{style:{background:`linear-gradient(135deg, ${l.color}08, ${l.color}04)`,borderRadius:14,padding:24,border:`1px solid ${l.color}20`},children:[e.jsxs("h3",{style:{fontSize:16,fontWeight:700,color:n.dark,margin:"0 0 12px",fontFamily:a.heading},children:["💡 ",l.example2.title]}),e.jsx("div",{style:{fontSize:15,color:n.textLight,lineHeight:1.8,whiteSpace:"pre-line"},children:l.example2.text})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:28,paddingTop:20,borderTop:`1px solid ${n.border}`},children:[e.jsx("button",{onClick:()=>m(Math.max(0,r-1)),disabled:r===0,style:{padding:"10px 20px",background:r===0?n.borderLight:n.surface,border:`1px solid ${n.border}`,borderRadius:8,cursor:r===0?"default":"pointer",fontSize:14,color:r===0?"#CBD5E1":n.textLight,fontWeight:600,fontFamily:a.body},children:"← Previous Step"}),e.jsx("button",{onClick:()=>m(Math.min(T.length-1,r+1)),disabled:r===T.length-1,style:{padding:"10px 20px",background:r===T.length-1?n.borderLight:l.color,border:"none",borderRadius:8,cursor:r===T.length-1?"default":"pointer",fontSize:14,color:r===T.length-1?"#CBD5E1":n.surface,fontWeight:600,fontFamily:a.body},children:"Next Step →"})]})]})]})]}),o==="architecture"&&e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:26,fontWeight:700,color:n.dark,marginBottom:8,fontFamily:a.heading},children:"RAG Architecture Patterns"}),e.jsx("p",{style:{fontSize:16,color:n.muted,marginBottom:28,lineHeight:1.6},children:"RAG systems evolve from simple retrieve-and-generate pipelines to modular, production-grade architectures. Understanding these patterns helps you choose the right complexity for your use case."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:20},children:Y.map((s,d)=>{const F=d===0?"#059669":d===1?"#D97706":"#DC2626",v=d===0?"#ECFDF5":d===1?"#FFFBEB":"#FEF2F2";return e.jsxs("div",{style:{background:n.surface,borderRadius:16,padding:28,border:`1px solid ${n.border}`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12},children:e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:11,fontWeight:700,color:F,background:v,padding:"3px 10px",borderRadius:20,fontFamily:a.mono},children:s.level}),e.jsx("h3",{style:{fontSize:22,fontWeight:700,color:n.dark,margin:"10px 0 8px",fontFamily:a.heading},children:s.name})]})}),e.jsx("p",{style:{fontSize:15,color:n.textLight,lineHeight:1.6,margin:"0 0 18px"},children:s.desc}),e.jsxs("div",{style:{background:n.bg,borderRadius:10,padding:"14px 20px",border:`1px solid ${n.border}`},children:[e.jsx("span",{style:{fontSize:12,fontWeight:600,color:n.muted,fontFamily:a.mono},children:"Pipeline Flow:"}),e.jsx("div",{style:{marginTop:8,fontSize:14,color:n.accent,fontFamily:a.mono,fontWeight:600,lineHeight:1.8,wordBreak:"break-word"},children:s.flow[0]})]})]},d)})}),e.jsxs("div",{style:{marginTop:32,background:n.surface,borderRadius:16,padding:28,border:`1px solid ${n.border}`},children:[e.jsx("h3",{style:{fontSize:20,fontWeight:700,color:n.dark,margin:"0 0 20px",fontFamily:a.heading},children:"🏗️ Complete RAG Architecture Overview"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12},children:[{phase:"Offline Indexing",color:n.purple,items:["Document Ingestion","Text Chunking","Embedding Generation","Vector Store Indexing"]},{phase:"Online Query",color:"#2563EB",items:["Query Processing","Retrieval & Ranking","Context Assembly","Response Generation"]},{phase:"Evaluation Loop",color:"#059669",items:["Faithfulness Check","Relevancy Scoring","User Feedback","Continuous Improvement"]}].map((s,d)=>e.jsxs("div",{style:{background:`${s.color}08`,borderRadius:12,padding:18,border:`1px solid ${s.color}20`},children:[e.jsx("h4",{style:{fontSize:13,fontWeight:700,color:s.color,margin:"0 0 12px",fontFamily:a.mono},children:s.phase}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:s.items.map((F,v)=>e.jsx("div",{style:{padding:"8px 12px",background:n.surface,borderRadius:8,fontSize:13,color:n.text,fontWeight:500,borderLeft:`3px solid ${s.color}`},children:F},v))})]},d))})]})]}),o==="glossary"&&e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:26,fontWeight:700,color:n.dark,marginBottom:8,fontFamily:a.heading},children:"RAG Glossary"}),e.jsx("p",{style:{fontSize:16,color:n.muted,marginBottom:20,lineHeight:1.6},children:"Quick reference for key terms and concepts used throughout RAG systems."}),e.jsx("input",{type:"text",placeholder:"🔍 Search terms...",value:u,onChange:s=>C(s.target.value),style:{width:"100%",padding:"14px 18px",borderRadius:12,border:`2px solid ${n.border}`,fontSize:15,marginBottom:20,boxSizing:"border-box",fontFamily:a.body,outline:"none",transition:"border 0.2s"},onFocus:s=>s.target.style.borderColor=n.accent,onBlur:s=>s.target.style.borderColor=n.border}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:b.map((s,d)=>e.jsxs("div",{style:{background:n.surface,borderRadius:12,padding:"18px 22px",border:`1px solid ${n.border}`,display:"flex",gap:16,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:10,background:`${n.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},children:"📌"}),e.jsxs("div",{children:[e.jsx("h4",{style:{fontSize:16,fontWeight:700,color:n.dark,margin:"0 0 4px",fontFamily:a.heading},children:s.term}),e.jsx("p",{style:{fontSize:14.5,color:n.textLight,margin:0,lineHeight:1.6},children:s.def})]})]},d))})]}),o==="quiz"&&e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:26,fontWeight:700,color:n.dark,marginBottom:8,fontFamily:a.heading},children:"🧪 Knowledge Check"}),e.jsx("p",{style:{fontSize:16,color:n.muted,marginBottom:24,lineHeight:1.6},children:"Test your understanding of RAG concepts with this interactive quiz."}),e.jsx("div",{style:{background:n.surface,borderRadius:16,padding:28,border:`1px solid ${n.border}`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:e.jsx(Z,{})})]})]}),e.jsxs("footer",{style:{background:n.dark,padding:"36px 24px",textAlign:"center",borderTop:`1px solid ${n.darkAlt}`},children:[e.jsx("p",{style:{fontSize:15,color:n.mutedLight,margin:"0 0 6px",fontFamily:a.body},children:"RAG Basics — A Complete Interactive Guide"}),e.jsx("p",{style:{fontSize:14,color:n.muted,margin:0,fontFamily:a.mono},children:"@BIL"})]})]})},y={intro:{title:"Retrieval-Augmented Generation",subtitle:"The Complete Beginner-to-Master Guide",description:"RAG is a powerful AI architecture that combines the strengths of information retrieval systems with large language models (LLMs) to generate accurate, grounded, and up-to-date responses. Instead of relying solely on what an LLM memorized during training, RAG fetches relevant documents from an external knowledge base and feeds them into the model as context — dramatically reducing hallucinations and enabling domain-specific intelligence."},whyRag:[{icon:"🧠",title:"Reduces Hallucinations",desc:"LLMs sometimes generate plausible but incorrect answers. RAG grounds responses in real retrieved documents, ensuring factual accuracy.",detail:"Without RAG, an LLM might confidently state incorrect dates, statistics, or facts. With RAG, every claim can be traced back to a source document, making outputs verifiable and trustworthy."},{icon:"🔄",title:"Always Up-to-Date",desc:"LLMs have a training cutoff date. RAG lets you inject the latest information without retraining the entire model.",detail:"When new research papers, product updates, or policy changes occur, you simply update your knowledge base. The LLM immediately has access to the freshest information without any fine-tuning."},{icon:"🏢",title:"Domain-Specific Knowledge",desc:"Embed your organization's proprietary data — internal docs, databases, and manuals — into an AI assistant.",detail:"A hospital can build a RAG system over medical records and clinical guidelines. A law firm can query case law. A software company can create an assistant over its entire codebase and documentation."},{icon:"💰",title:"Cost-Effective",desc:"Fine-tuning large models is expensive. RAG achieves similar domain-specific results at a fraction of the cost.",detail:"Fine-tuning GPT-4 or similar models can cost thousands of dollars and requires curated training datasets. RAG only needs a vector database and an embedding model — often achievable with open-source tools."},{icon:"🔐",title:"Data Privacy & Control",desc:"Your sensitive data stays in your own infrastructure. No need to send proprietary info to third-party training pipelines.",detail:"With RAG, documents are stored in your own vector database. The LLM only sees the retrieved chunks during inference, giving you full control over what information the AI can access."},{icon:"📏",title:"Scalable & Modular",desc:"Easily swap out components — change the LLM, embedding model, or retrieval strategy independently.",detail:"RAG's modular architecture means you can upgrade individual components without rebuilding the entire system. Move from OpenAI to an open-source LLM, or switch from FAISS to Pinecone, all without changing your core logic."}],architecture:[{step:1,title:"Document Ingestion",subtitle:"Loading & Preparing Your Data",icon:"📥",color:"#FF6B6B",description:"The first step is collecting and loading your raw data from various sources. This could be PDFs, Word documents, web pages, databases, APIs, or any text-based content. The goal is to gather all the knowledge you want your AI system to access.",details:["Supported formats: PDF, DOCX, TXT, HTML, CSV, JSON, Markdown, and more","Use document loaders from frameworks like LangChain, LlamaIndex, or custom parsers","Handle metadata extraction (author, date, source URL, page numbers)","Implement error handling for corrupted or malformed documents","Consider OCR for scanned documents and image-based PDFs"],code:`from langchain.document_loaders import (
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
# Each document has: page_content, metadata`},{step:2,title:"Text Chunking",subtitle:"Splitting Documents into Digestible Pieces",icon:"✂️",color:"#4ECDC4",description:"Raw documents are often too large to fit into an LLM's context window or to be meaningfully compared via embeddings. Chunking breaks documents into smaller, semantically coherent pieces. The chunk size and overlap strategy significantly impact retrieval quality.",details:["Chunk size typically ranges from 256 to 2048 tokens depending on the use case","Overlap (usually 10-20% of chunk size) ensures context isn't lost at boundaries","Recursive character splitting respects paragraph and sentence boundaries","Semantic chunking groups text by meaning rather than fixed character counts","Metadata preservation: each chunk retains info about its source document"],code:`from langchain.text_splitter import (
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
    print(f"Length: {len(chunk.page_content)} chars\\n")`},{step:3,title:"Embedding Generation",subtitle:"Converting Text to Vector Representations",icon:"🔢",color:"#45B7D1",description:"Embeddings convert text chunks into high-dimensional numerical vectors that capture semantic meaning. Similar concepts end up close together in vector space. This is the mathematical foundation that enables semantic search — finding documents by meaning rather than exact keyword matches.",details:["Popular models: OpenAI text-embedding-ada-002, Sentence-Transformers, Cohere Embed","Embedding dimensions typically range from 384 to 1536","Cosine similarity is the most common distance metric for comparing embeddings","Batch processing is essential for large document collections","Consider domain-specific embedding models for specialized applications"],code:`from langchain.embeddings import OpenAIEmbeddings
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
print(f"Refund ↔ ML: {sim_2:.2f}")`},{step:4,title:"Vector Store Indexing",subtitle:"Storing Embeddings for Fast Retrieval",icon:"🗄️",color:"#96CEB4",description:"Once embeddings are generated, they need to be stored in a specialized vector database optimized for similarity search. These databases use algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) to find the most similar vectors in milliseconds, even across millions of documents.",details:["Popular vector stores: Pinecone, Weaviate, Chroma, FAISS, Milvus, Qdrant","FAISS (Facebook AI Similarity Search) is great for local development","Pinecone and Weaviate offer managed cloud solutions with built-in scaling","ChromaDB is lightweight and perfect for prototyping","Index types: Flat (exact), IVF (approximate), HNSW (graph-based, fast)"],code:`from langchain.vectorstores import Chroma, FAISS
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
# Output: Total vectors stored: 1247`},{step:5,title:"Query & Retrieval",subtitle:"Finding the Most Relevant Documents",icon:"🔍",color:"#FFEAA7",description:"When a user asks a question, the query is embedded using the same model and compared against all stored vectors. The top-k most similar chunks are retrieved. Advanced retrieval strategies like hybrid search (combining semantic + keyword search), re-ranking, and query transformation can significantly improve results.",details:["Top-k retrieval: return the k most similar documents (typically k=3 to 10)","Similarity threshold: filter out results below a minimum similarity score","Hybrid search combines dense (vector) and sparse (BM25/keyword) retrieval","MMR (Maximum Marginal Relevance) balances relevance with diversity","Query transformation: rewrite, expand, or decompose complex queries"],code:`# Basic similarity search
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
filtered_docs = retriever.get_relevant_documents(query)`},{step:6,title:"Augmented Generation",subtitle:"Combining Context with LLM Intelligence",icon:"✨",color:"#DDA0DD",description:"The retrieved documents are injected into a carefully crafted prompt template along with the user's question. The LLM then generates a response grounded in the provided context. This is where the 'augmented' in RAG comes from — the model's generation is augmented with retrieved knowledge.",details:["Prompt engineering is critical: structure context clearly for the LLM","Include instructions to cite sources and admit when information isn't available","Chain-of-thought prompting can improve reasoning over retrieved context","Temperature setting: lower (0.0-0.3) for factual Q&A, higher for creative tasks","Handle edge cases: no relevant documents found, contradictory information"],code:`from langchain.chat_models import ChatOpenAI
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
    print(f"  - {doc.metadata['source']}")`}],advancedTopics:[{title:"Hybrid Search",icon:"🔀",description:"Combine dense vector search (semantic meaning) with sparse keyword search (BM25/TF-IDF) for the best of both worlds. Semantic search excels at understanding intent, while keyword search catches exact terms, acronyms, and proper nouns that embeddings might miss.",example:`from langchain.retrievers import EnsembleRetriever
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
)`},{title:"Re-Ranking",icon:"📊",description:"After initial retrieval, a cross-encoder re-ranker scores each document-query pair more carefully. This two-stage approach (fast retrieval → precise re-ranking) dramatically improves the quality of final results, especially when the initial retrieval returns many candidates.",example:`from sentence_transformers import CrossEncoder

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
    print(f"Content: {doc.page_content[:100]}...\\n")`},{title:"Query Transformation",icon:"🔄",description:"Complex or ambiguous queries can be rewritten, expanded, or decomposed into sub-queries for better retrieval. Techniques include HyDE (Hypothetical Document Embeddings), multi-query generation, and step-back prompting to retrieve more relevant context.",example:`from langchain.retrievers import MultiQueryRetriever

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
# real documents better than the raw question`},{title:"Evaluation & Metrics",icon:"📈",description:"Measuring RAG performance requires evaluating both retrieval quality and generation quality. Key metrics include context relevance (did we retrieve the right documents?), answer faithfulness (is the answer grounded in context?), and answer relevance (does it address the question?).",example:`from ragas import evaluate
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
#  'context_precision': 0.85, 'context_recall': 0.79}`}],useCases:[{title:"Customer Support Bot",icon:"💬",desc:"Build an AI chatbot grounded in your product documentation, FAQs, and support tickets for accurate, instant customer assistance."},{title:"Legal Document Analysis",icon:"⚖️",desc:"Query across thousands of legal cases, contracts, and regulations to find relevant precedents and clauses in seconds."},{title:"Medical Knowledge Assistant",icon:"🏥",desc:"Help clinicians quickly access clinical guidelines, drug interactions, and research papers during patient consultations."},{title:"Enterprise Search",icon:"🏢",desc:"Unify knowledge across Confluence, Slack, Google Drive, and databases into a single intelligent search interface."},{title:"Educational Tutor",icon:"📚",desc:"Create personalized tutoring systems grounded in textbooks and course materials that can explain concepts and answer student questions."},{title:"Code Documentation Assistant",icon:"💻",desc:"Index your codebase documentation, READMEs, and API references to help developers find answers without leaving their IDE."}],bestPractices:[{title:"Chunk Size Optimization",tip:"Start with 512-1024 tokens. Smaller chunks improve precision but lose context. Larger chunks preserve context but add noise. Test with your specific data.",category:"Chunking"},{title:"Overlap Strategy",tip:"Use 10-20% overlap between chunks to prevent losing context at boundaries. For conversational data, overlap at sentence boundaries.",category:"Chunking"},{title:"Metadata Enrichment",tip:"Store rich metadata (source, date, author, section) with each chunk. Use metadata filters to narrow retrieval scope and improve relevance.",category:"Indexing"},{title:"Embedding Model Selection",tip:"Match embedding model to your domain. General-purpose models work well for most cases, but domain-specific models (e.g., BioBERT for medical) can significantly improve retrieval in specialized fields.",category:"Embeddings"},{title:"Prompt Engineering",tip:"Always instruct the LLM to say 'I don't know' when context is insufficient. Include few-shot examples of good answers in your prompt template.",category:"Generation"},{title:"Continuous Evaluation",tip:"Set up automated evaluation pipelines using RAGAS or custom metrics. Track faithfulness, relevance, and retrieval quality over time as your knowledge base evolves.",category:"Evaluation"}],glossary:[{term:"LLM",definition:"Large Language Model — a neural network trained on massive text data that can generate human-like text (e.g., GPT-4, Claude, Llama)."},{term:"Embedding",definition:"A numerical vector representation of text that captures its semantic meaning. Similar texts produce similar vectors."},{term:"Vector Store",definition:"A specialized database optimized for storing and querying high-dimensional vectors using similarity search algorithms."},{term:"Chunking",definition:"The process of splitting large documents into smaller, manageable pieces that can be individually embedded and retrieved."},{term:"Cosine Similarity",definition:"A metric that measures the angle between two vectors. Values range from -1 (opposite) to 1 (identical), with higher values indicating greater similarity."},{term:"Top-k Retrieval",definition:"Returning the k most similar documents to a query from the vector store. Common values range from 3 to 10."},{term:"Hallucination",definition:"When an LLM generates text that sounds plausible but is factually incorrect or fabricated. RAG significantly reduces this."},{term:"Context Window",definition:"The maximum number of tokens an LLM can process in a single request. Retrieved documents must fit within this limit."},{term:"BM25",definition:"Best Match 25 — a classic keyword-based ranking algorithm used in sparse retrieval and hybrid search systems."},{term:"HNSW",definition:"Hierarchical Navigable Small World — a graph-based algorithm for fast approximate nearest neighbor search in vector databases."},{term:"Cross-Encoder",definition:"A model that takes a query-document pair as input and outputs a relevance score. More accurate but slower than bi-encoders."},{term:"HyDE",definition:"Hypothetical Document Embeddings — a technique where the LLM generates a hypothetical answer, which is then used as the search query for better retrieval."}]},G=({code:h,title:r})=>{const[m,o]=p.useState(!1),g=()=>{navigator.clipboard.writeText(h),o(!0),setTimeout(()=>o(!1),2e3)};return e.jsxs("div",{style:{background:"#0D1117",borderRadius:12,overflow:"hidden",marginTop:16,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:"#161B22",borderBottom:"1px solid #21262D"},children:[e.jsx("span",{style:{color:"#7EE787",fontSize:13,fontFamily:"'JetBrains Mono', monospace",fontWeight:600},children:r||"Python"}),e.jsx("button",{onClick:g,style:{background:m?"#238636":"#21262D",color:"#C9D1D9",border:"1px solid #30363D",borderRadius:6,padding:"4px 12px",cursor:"pointer",fontSize:12,fontFamily:"'JetBrains Mono', monospace",transition:"all 0.2s"},children:m?"✓ Copied":"Copy"})]}),e.jsx("pre",{style:{margin:0,padding:20,overflowX:"auto",fontSize:13,lineHeight:1.6,color:"#C9D1D9",fontFamily:"'JetBrains Mono', monospace"},children:e.jsx("code",{children:h})})]})},te=({steps:h,activeStep:r})=>e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",marginBottom:24},children:h.map((m,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:o===r?"linear-gradient(135deg, #FF6B6B, #4ECDC4)":o<r?"#238636":"#21262D",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"'JetBrains Mono', monospace",transition:"all 0.3s",cursor:"pointer",border:o===r?"2px solid #fff":"2px solid transparent",boxShadow:o===r?"0 0 20px rgba(78,205,196,0.4)":"none"},children:o<r?"✓":o+1}),o<h.length-1&&e.jsx("div",{style:{width:24,height:2,background:o<r?"#238636":"#21262D",borderRadius:1}})]},o))}),ne=function(){const[r,m]=p.useState("intro"),[o,g]=p.useState(0),[u,C]=p.useState(null),[b,_]=p.useState(""),[l,s]=p.useState({}),[d,F]=p.useState(!1),[v,w]=p.useState(!1),f=p.useRef(null),S=[{id:"intro",label:"Introduction",icon:"🏠"},{id:"why",label:"Why RAG?",icon:"❓"},{id:"architecture",label:"Architecture",icon:"🏗️"},{id:"pipeline",label:"Step-by-Step",icon:"⚙️"},{id:"advanced",label:"Advanced",icon:"🚀"},{id:"usecases",label:"Use Cases",icon:"💡"},{id:"bestpractices",label:"Best Practices",icon:"✅"},{id:"glossary",label:"Glossary",icon:"📖"},{id:"quiz",label:"Knowledge Check",icon:"🎯"}],k=[{q:"What is the primary purpose of RAG?",options:["Replace LLMs entirely","Ground LLM responses in retrieved external knowledge","Train new language models","Compress documents"],correct:1},{q:"Which step converts text into numerical vectors?",options:["Chunking","Indexing","Embedding Generation","Query Transformation"],correct:2},{q:"What does 'Top-k retrieval' mean?",options:["Retrieving only the first k documents","Returning the k most similar documents to the query","Splitting documents into k chunks","Using k different LLMs"],correct:1},{q:"Why is text chunking necessary in RAG?",options:["To make documents look nicer","Because LLMs can only read small text","Documents are too large for embedding and context windows","To delete irrelevant information"],correct:2},{q:"What is a hallucination in the context of LLMs?",options:["A visual illusion in generated images","When the model generates plausible but incorrect information","A type of embedding error","An authentication failure"],correct:1},{q:"Which retrieval strategy combines semantic and keyword search?",options:["Pure vector search","BM25 only","Hybrid Search","Cross-encoding"],correct:2}];p.useEffect(()=>{f.current&&f.current.scrollTo({top:0,behavior:"smooth"})},[r]);const M=y.glossary.filter(t=>t.term.toLowerCase().includes(b.toLowerCase())||t.definition.toLowerCase().includes(b.toLowerCase())),B=t=>e.jsxs("button",{onClick:()=>{m(t.id),w(!1)},style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 16px",border:"none",borderRadius:10,cursor:"pointer",background:r===t.id?"linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))":"transparent",color:r===t.id?"#F0F6FC":"#8B949E",fontFamily:"'DM Sans', sans-serif",fontSize:14,fontWeight:r===t.id?600:400,borderLeft:r===t.id?"3px solid #4ECDC4":"3px solid transparent",transition:"all 0.2s"},children:[e.jsx("span",{style:{fontSize:18},children:t.icon}),t.label]},t.id),L=()=>e.jsxs("div",{children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",borderRadius:20,padding:"48px 40px",marginBottom:32,border:"1px solid #21262D",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)",borderRadius:"50%"}}),e.jsx("div",{style:{position:"absolute",bottom:-40,left:-40,width:160,height:160,background:"radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)",borderRadius:"50%"}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsx("div",{style:{display:"inline-block",padding:"6px 14px",background:"rgba(78,205,196,0.15)",borderRadius:20,marginBottom:16,border:"1px solid rgba(78,205,196,0.3)"},children:e.jsx("span",{style:{color:"#4ECDC4",fontSize:13,fontWeight:600,fontFamily:"'JetBrains Mono', monospace"},children:"AI ARCHITECTURE GUIDE"})}),e.jsx("h1",{style:{fontSize:"clamp(28px, 5vw, 48px)",fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif",lineHeight:1.15},children:y.intro.title}),e.jsx("p",{style:{fontSize:"clamp(16px, 2.5vw, 22px)",color:"#4ECDC4",margin:"0 0 24px 0",fontWeight:500,fontFamily:"'DM Sans', sans-serif"},children:y.intro.subtitle}),e.jsx("p",{style:{fontSize:16,lineHeight:1.8,color:"#8B949E",maxWidth:720,fontFamily:"'DM Sans', sans-serif"},children:y.intro.description})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,marginBottom:32},children:[{label:"Accuracy Boost",value:"40-60%",sub:"reduction in hallucinations"},{label:"Cost Savings",value:"10x",sub:"cheaper than fine-tuning"},{label:"Setup Time",value:"< 1 Day",sub:"for a basic prototype"},{label:"Adoption",value:"85%+",sub:"of enterprise AI uses RAG"}].map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,textAlign:"center",border:"1px solid #21262D",transition:"all 0.3s"},children:[e.jsx("div",{style:{fontSize:"clamp(24px, 4vw, 36px)",fontWeight:800,background:"linear-gradient(135deg, #FF6B6B, #4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'JetBrains Mono', monospace"},children:t.value}),e.jsx("div",{style:{color:"#F0F6FC",fontWeight:600,fontSize:14,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:t.label}),e.jsx("div",{style:{color:"#8B949E",fontSize:12,marginTop:2,fontFamily:"'DM Sans', sans-serif"},children:t.sub})]},i))}),e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:32,border:"1px solid #21262D"},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 16px 0",fontFamily:"'DM Sans', sans-serif",fontSize:20},children:"🎯 How RAG Works — The Big Picture"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"center"},children:[{icon:"📄",label:"Your Documents",color:"#FF6B6B"},{icon:"→",label:"",color:"transparent"},{icon:"✂️",label:"Chunk & Embed",color:"#4ECDC4"},{icon:"→",label:"",color:"transparent"},{icon:"🗄️",label:"Vector Database",color:"#45B7D1"},{icon:"→",label:"",color:"transparent"},{icon:"🔍",label:"User Query",color:"#FFEAA7"},{icon:"→",label:"",color:"transparent"},{icon:"🤖",label:"LLM + Context",color:"#DDA0DD"},{icon:"→",label:"",color:"transparent"},{icon:"✅",label:"Grounded Answer",color:"#96CEB4"}].map((t,i)=>t.label===""?e.jsx("span",{style:{color:"#30363D",fontSize:20,fontWeight:700},children:"→"},i):e.jsxs("div",{style:{background:`${t.color}15`,border:`1px solid ${t.color}40`,borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:90},children:[e.jsx("div",{style:{fontSize:24},children:t.icon}),e.jsx("div",{style:{color:t.color,fontSize:11,fontWeight:600,marginTop:4,fontFamily:"'JetBrains Mono', monospace"},children:t.label})]},i))})]})]}),q=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Why Use RAG?"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Understanding the key benefits of Retrieval-Augmented Generation and why it has become the de-facto standard for building production AI applications."}),e.jsx("div",{style:{display:"grid",gap:16},children:y.whyRag.map((t,i)=>e.jsx("div",{onClick:()=>C(u===i?null:i),style:{background:"#161B22",borderRadius:16,padding:24,border:u===i?"1px solid #4ECDC4":"1px solid #21262D",cursor:"pointer",transition:"all 0.3s"},children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:16},children:[e.jsx("div",{style:{fontSize:32,flexShrink:0},children:t.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:18,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("span",{style:{color:"#4ECDC4",fontSize:18,transition:"transform 0.3s",transform:u===i?"rotate(180deg)":"rotate(0deg)"},children:"▼"})]}),e.jsx("p",{style:{color:"#8B949E",margin:"8px 0 0 0",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.desc}),u===i&&e.jsx("div",{style:{marginTop:16,padding:16,background:"rgba(78,205,196,0.06)",borderRadius:10,borderLeft:"3px solid #4ECDC4"},children:e.jsx("p",{style:{color:"#C9D1D9",margin:0,fontSize:14,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:t.detail})})]})]})},i))})]}),P=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"RAG Architecture Overview"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"A complete visual breakdown of the RAG pipeline showing how data flows from raw documents to intelligent, grounded responses."}),e.jsxs("div",{style:{background:"#161B22",borderRadius:20,padding:32,border:"1px solid #21262D",marginBottom:24},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 24px 0",fontSize:20,fontFamily:"'DM Sans', sans-serif",textAlign:"center"},children:"Complete RAG Pipeline Architecture"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:16},children:y.architecture.map((t,i)=>e.jsxs("div",{style:{background:`${t.color}10`,borderRadius:14,padding:20,textAlign:"center",border:`1px solid ${t.color}30`,position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:t.color,color:"#0D1117",width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,fontFamily:"'JetBrains Mono', monospace"},children:t.step}),e.jsx("div",{style:{fontSize:36,marginTop:8},children:t.icon}),e.jsx("div",{style:{color:t.color,fontWeight:700,fontSize:14,marginTop:8,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("div",{style:{color:"#8B949E",fontSize:11,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:t.subtitle})]},i))}),e.jsxs("div",{style:{marginTop:28,padding:20,background:"#0D1117",borderRadius:12,border:"1px solid #21262D"},children:[e.jsx("h4",{style:{color:"#4ECDC4",margin:"0 0 12px 0",fontFamily:"'JetBrains Mono', monospace",fontSize:14},children:"Two Main Phases:"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16},children:[e.jsxs("div",{style:{padding:16,background:"rgba(255,107,107,0.06)",borderRadius:10,border:"1px solid rgba(255,107,107,0.2)"},children:[e.jsx("div",{style:{color:"#FF6B6B",fontWeight:700,fontSize:14,marginBottom:8,fontFamily:"'DM Sans', sans-serif"},children:"📥 Indexing Phase (Offline)"}),e.jsx("p",{style:{color:"#8B949E",fontSize:13,margin:0,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:"Documents are loaded, chunked, embedded, and stored in a vector database. This happens once (or periodically) and prepares your knowledge base for queries."})]}),e.jsxs("div",{style:{padding:16,background:"rgba(78,205,196,0.06)",borderRadius:10,border:"1px solid rgba(78,205,196,0.2)"},children:[e.jsx("div",{style:{color:"#4ECDC4",fontWeight:700,fontSize:14,marginBottom:8,fontFamily:"'DM Sans', sans-serif"},children:"🔍 Retrieval & Generation (Online)"}),e.jsx("p",{style:{color:"#8B949E",fontSize:13,margin:0,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:"User queries are embedded, similar documents are retrieved from the vector store, and an LLM generates a response grounded in the retrieved context."})]})]})]})]})]}),H=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Step-by-Step Implementation"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:20,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Follow each step to build a complete RAG pipeline from scratch. Click through the steps to see detailed code examples and explanations."}),e.jsx(te,{steps:y.architecture,activeStep:o}),(()=>{const t=y.architecture[o];return e.jsxs("div",{style:{background:"#161B22",borderRadius:20,padding:32,border:`1px solid ${t.color}40`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:20},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:14,background:`${t.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,border:`1px solid ${t.color}40`},children:t.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{color:t.color,fontSize:12,fontWeight:700,fontFamily:"'JetBrains Mono', monospace",textTransform:"uppercase",letterSpacing:1},children:["Step ",t.step," of ",y.architecture.length]}),e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:24,fontFamily:"'DM Sans', sans-serif"},children:t.title})]})]}),e.jsx("p",{style:{color:"#C9D1D9",fontSize:15,lineHeight:1.8,marginBottom:20,fontFamily:"'DM Sans', sans-serif"},children:t.description}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("h4",{style:{color:"#F0F6FC",margin:"0 0 12px 0",fontSize:16,fontFamily:"'DM Sans', sans-serif"},children:"Key Details:"}),e.jsx("div",{style:{display:"grid",gap:8},children:t.details.map((i,c)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsx("span",{style:{color:t.color,fontSize:16,lineHeight:1.5},children:"●"}),e.jsx("span",{style:{color:"#8B949E",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:i})]},c))})]}),e.jsx(G,{code:t.code,title:`Step ${t.step}: ${t.title}`}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:24,gap:12,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>g(Math.max(0,o-1)),disabled:o===0,style:{padding:"10px 24px",borderRadius:10,border:"1px solid #30363D",background:o===0?"#0D1117":"#21262D",color:o===0?"#484F58":"#C9D1D9",cursor:o===0?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:14},children:"← Previous Step"}),e.jsx("button",{onClick:()=>g(Math.min(y.architecture.length-1,o+1)),disabled:o===y.architecture.length-1,style:{padding:"10px 24px",borderRadius:10,border:"none",background:o===y.architecture.length-1?"#21262D":`linear-gradient(135deg, ${t.color}, ${y.architecture[Math.min(o+1,5)].color})`,color:o===y.architecture.length-1?"#484F58":"#0D1117",cursor:o===y.architecture.length-1?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontWeight:700,fontSize:14},children:"Next Step →"})]})]})})()]}),O=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Advanced RAG Techniques"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Take your RAG system to the next level with these production-grade optimization techniques used by leading AI teams."}),e.jsx("div",{style:{display:"grid",gap:20},children:y.advancedTopics.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:28,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:12},children:[e.jsx("span",{style:{fontSize:28},children:t.icon}),e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:20,fontFamily:"'DM Sans', sans-serif"},children:t.title})]}),e.jsx("p",{style:{color:"#8B949E",fontSize:14,lineHeight:1.7,marginBottom:16,fontFamily:"'DM Sans', sans-serif"},children:t.description}),e.jsx(G,{code:t.example,title:t.title})]},i))})]}),Q=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Real-World Use Cases"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"RAG is being deployed across every industry. Here are some of the most impactful applications."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:16},children:y.useCases.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,border:"1px solid #21262D",transition:"all 0.3s"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.icon}),e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 8px 0",fontSize:18,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("p",{style:{color:"#8B949E",margin:0,fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.desc})]},i))})]}),$=()=>{const t=[...new Set(y.bestPractices.map(i=>i.category))];return e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Best Practices & Tips"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Production-tested guidelines to help you build reliable, high-quality RAG systems."}),t.map(i=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{display:"inline-block",padding:"4px 14px",background:"rgba(78,205,196,0.12)",borderRadius:20,marginBottom:14,border:"1px solid rgba(78,205,196,0.25)"},children:e.jsx("span",{style:{color:"#4ECDC4",fontSize:13,fontWeight:700,fontFamily:"'JetBrains Mono', monospace"},children:i})}),e.jsx("div",{style:{display:"grid",gap:12},children:y.bestPractices.filter(c=>c.category===i).map((c,E)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:14,padding:20,border:"1px solid #21262D"},children:[e.jsx("h4",{style:{color:"#F0F6FC",margin:"0 0 8px 0",fontSize:16,fontFamily:"'DM Sans', sans-serif"},children:c.title}),e.jsx("p",{style:{color:"#8B949E",margin:0,fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:c.tip})]},E))})]},i))]})},U=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Glossary of Terms"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:20,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Quick reference for all the key terminology used in RAG systems."}),e.jsx("input",{type:"text",placeholder:"🔍 Search terms...",value:b,onChange:t=>_(t.target.value),style:{width:"100%",padding:"12px 18px",borderRadius:12,background:"#0D1117",border:"1px solid #21262D",color:"#F0F6FC",fontSize:15,fontFamily:"'DM Sans', sans-serif",marginBottom:20,outline:"none",boxSizing:"border-box"}}),e.jsx("div",{style:{display:"grid",gap:10},children:M.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:12,padding:18,border:"1px solid #21262D"},children:[e.jsx("span",{style:{color:"#4ECDC4",fontWeight:700,fontSize:15,fontFamily:"'JetBrains Mono', monospace"},children:t.term}),e.jsx("span",{style:{color:"#30363D",margin:"0 10px"},children:"—"}),e.jsx("span",{style:{color:"#8B949E",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.definition})]},i))})]}),N=()=>{const t=Object.entries(l).filter(([i,c])=>c===k[parseInt(i)].correct).length;return e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Knowledge Check"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Test your understanding of RAG concepts. Select the best answer for each question."}),e.jsx("div",{style:{display:"grid",gap:20},children:k.map((i,c)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:16},children:[e.jsx("div",{style:{minWidth:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",background:d?l[c]===i.correct?"#23863620":l[c]!==void 0?"#FF6B6B20":"#21262D":"#21262D",color:d?l[c]===i.correct?"#7EE787":l[c]!==void 0?"#FF6B6B":"#8B949E":"#8B949E",fontWeight:700,fontSize:14,fontFamily:"'JetBrains Mono', monospace"},children:c+1}),e.jsx("p",{style:{color:"#F0F6FC",margin:0,fontSize:15,lineHeight:1.5,fontFamily:"'DM Sans', sans-serif"},children:i.q})]}),e.jsx("div",{style:{display:"grid",gap:8,paddingLeft:44},children:i.options.map((E,j)=>{const I=l[c]===j,W=j===i.correct;let D="#0D1117",R="#21262D",A="#8B949E";return d&&W?(D="rgba(35,134,54,0.15)",R="#238636",A="#7EE787"):d&&I&&!W?(D="rgba(255,107,107,0.1)",R="#FF6B6B",A="#FF6B6B"):I&&(D="rgba(78,205,196,0.1)",R="#4ECDC4",A="#4ECDC4"),e.jsx("button",{onClick:()=>!d&&s({...l,[c]:j}),style:{display:"block",width:"100%",textAlign:"left",padding:"10px 14px",borderRadius:10,border:`1px solid ${R}`,background:D,color:A,cursor:d?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontSize:14,transition:"all 0.2s"},children:E},j)})})]},c))}),e.jsxs("div",{style:{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{F(!0)},style:{padding:"12px 28px",borderRadius:12,border:"none",cursor:"pointer",background:"linear-gradient(135deg, #4ECDC4, #45B7D1)",color:"#0D1117",fontWeight:700,fontSize:15,fontFamily:"'DM Sans', sans-serif"},children:"Check Answers"}),e.jsx("button",{onClick:()=>{s({}),F(!1)},style:{padding:"12px 28px",borderRadius:12,border:"1px solid #30363D",background:"#21262D",color:"#C9D1D9",cursor:"pointer",fontWeight:600,fontSize:15,fontFamily:"'DM Sans', sans-serif"},children:"Reset Quiz"})]}),d&&e.jsxs("div",{style:{marginTop:20,padding:20,borderRadius:14,background:t>=4?"rgba(35,134,54,0.1)":"rgba(255,107,107,0.1)",border:`1px solid ${t>=4?"#238636":"#FF6B6B"}40`},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:t>=4?"#7EE787":"#FF6B6B",fontFamily:"'DM Sans', sans-serif"},children:t>=5?"🎉 Excellent!":t>=4?"👏 Great Job!":t>=2?"📚 Keep Learning!":"💪 Review the Material"}),e.jsxs("div",{style:{color:"#8B949E",fontSize:14,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:["You scored ",t," out of ",k.length," (",Math.round(t/k.length*100),"%)"]})]})]})},J=()=>{switch(r){case"intro":return L();case"why":return q();case"architecture":return P();case"pipeline":return H();case"advanced":return O();case"usecases":return Q();case"bestpractices":return $();case"glossary":return U();case"quiz":return N();default:return L()}};return e.jsxs("div",{style:{display:"flex",minHeight:"100vh",background:"#0D1117",fontFamily:"'DM Sans', sans-serif",position:"relative"},children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("button",{onClick:()=>w(!v),style:{display:"none",position:"fixed",top:16,left:16,zIndex:1e3,width:44,height:44,borderRadius:12,border:"1px solid #21262D",background:"#161B22",color:"#F0F6FC",cursor:"pointer",fontSize:20,alignItems:"center",justifyContent:"center",...typeof window<"u"&&window.innerWidth<=768?{display:"flex"}:{}},children:v?"✕":"☰"}),e.jsxs("aside",{style:{width:260,minWidth:260,background:"#0D1117",borderRight:"1px solid #21262D",padding:"24px 16px",display:"flex",flexDirection:"column",gap:4,position:"sticky",top:0,height:"100vh",overflowY:"auto",...typeof window<"u"&&window.innerWidth<=768?{position:"fixed",left:v?0:-280,zIndex:999,transition:"left 0.3s",boxShadow:v?"4px 0 24px rgba(0,0,0,0.5)":"none"}:{}},children:[e.jsxs("div",{style:{marginBottom:20,paddingLeft:16},children:[e.jsx("div",{style:{fontSize:20,fontWeight:800,color:"#F0F6FC"},children:"📘 RAG Guide"}),e.jsx("div",{style:{color:"#484F58",fontSize:12,fontFamily:"'JetBrains Mono', monospace",marginTop:4},children:"Beginner → Master"})]}),S.map(B),e.jsx("div",{style:{marginTop:"auto",padding:"16px",borderTop:"1px solid #21262D"},children:e.jsx("div",{style:{color:"#484F58",fontSize:11,fontFamily:"'JetBrains Mono', monospace",textAlign:"center"},children:"Interactive Learning Guide"})})]}),v&&e.jsx("div",{onClick:()=>w(!1),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:998}}),e.jsx("main",{ref:f,style:{flex:1,padding:"32px clamp(20px, 4vw, 48px)",overflowY:"auto",maxHeight:"100vh"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[J(),e.jsx("div",{style:{marginTop:48,paddingTop:24,borderTop:"1px solid #21262D",textAlign:"center"},children:e.jsx("p",{style:{color:"#484F58",fontSize:13,fontFamily:"'JetBrains Mono', monospace"},children:"RAG Complete Guide — From Fundamentals to Production"})})]})})]})},x={intro:{title:"Retrieval-Augmented Generation",subtitle:"The Complete Beginner-to-Master Guide",description:"RAG is a powerful AI architecture that combines the strengths of information retrieval systems with large language models (LLMs) to generate accurate, grounded, and up-to-date responses. Instead of relying solely on what an LLM memorized during training, RAG fetches relevant documents from an external knowledge base and feeds them into the model as context — dramatically reducing hallucinations and enabling domain-specific intelligence."},whyRag:[{icon:"🧠",title:"Reduces Hallucinations",desc:"LLMs sometimes generate plausible but incorrect answers. RAG grounds responses in real retrieved documents, ensuring factual accuracy.",detail:"Without RAG, an LLM might confidently state incorrect dates, statistics, or facts. With RAG, every claim can be traced back to a source document, making outputs verifiable and trustworthy."},{icon:"🔄",title:"Always Up-to-Date",desc:"LLMs have a training cutoff date. RAG lets you inject the latest information without retraining the entire model.",detail:"When new research papers, product updates, or policy changes occur, you simply update your knowledge base. The LLM immediately has access to the freshest information without any fine-tuning."},{icon:"🏢",title:"Domain-Specific Knowledge",desc:"Embed your organization's proprietary data — internal docs, databases, and manuals — into an AI assistant.",detail:"A hospital can build a RAG system over medical records and clinical guidelines. A law firm can query case law. A software company can create an assistant over its entire codebase and documentation."},{icon:"💰",title:"Cost-Effective",desc:"Fine-tuning large models is expensive. RAG achieves similar domain-specific results at a fraction of the cost.",detail:"Fine-tuning GPT-4 or similar models can cost thousands of dollars and requires curated training datasets. RAG only needs a vector database and an embedding model — often achievable with open-source tools."},{icon:"🔐",title:"Data Privacy & Control",desc:"Your sensitive data stays in your own infrastructure. No need to send proprietary info to third-party training pipelines.",detail:"With RAG, documents are stored in your own vector database. The LLM only sees the retrieved chunks during inference, giving you full control over what information the AI can access."},{icon:"📏",title:"Scalable & Modular",desc:"Easily swap out components — change the LLM, embedding model, or retrieval strategy independently.",detail:"RAG's modular architecture means you can upgrade individual components without rebuilding the entire system. Move from OpenAI to an open-source LLM, or switch from FAISS to Pinecone, all without changing your core logic."}],architecture:[{step:1,title:"Document Ingestion",subtitle:"Loading & Preparing Your Data",icon:"📥",color:"#FF6B6B",description:"The first step is collecting and loading your raw data from various sources. This could be PDFs, Word documents, web pages, databases, APIs, or any text-based content. The goal is to gather all the knowledge you want your AI system to access.",details:["Supported formats: PDF, DOCX, TXT, HTML, CSV, JSON, Markdown, and more","Use document loaders from frameworks like LangChain, LlamaIndex, or custom parsers","Handle metadata extraction (author, date, source URL, page numbers)","Implement error handling for corrupted or malformed documents","Consider OCR for scanned documents and image-based PDFs"],code:`from langchain.document_loaders import (
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
# Each document has: page_content, metadata`},{step:2,title:"Text Chunking",subtitle:"Splitting Documents into Digestible Pieces",icon:"✂️",color:"#4ECDC4",description:"Raw documents are often too large to fit into an LLM's context window or to be meaningfully compared via embeddings. Chunking breaks documents into smaller, semantically coherent pieces. The chunk size and overlap strategy significantly impact retrieval quality.",details:["Chunk size typically ranges from 256 to 2048 tokens depending on the use case","Overlap (usually 10-20% of chunk size) ensures context isn't lost at boundaries","Recursive character splitting respects paragraph and sentence boundaries","Semantic chunking groups text by meaning rather than fixed character counts","Metadata preservation: each chunk retains info about its source document"],code:`from langchain.text_splitter import (
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
    print(f"Length: {len(chunk.page_content)} chars\\n")`},{step:3,title:"Embedding Generation",subtitle:"Converting Text to Vector Representations",icon:"🔢",color:"#45B7D1",description:"Embeddings convert text chunks into high-dimensional numerical vectors that capture semantic meaning. Similar concepts end up close together in vector space. This is the mathematical foundation that enables semantic search — finding documents by meaning rather than exact keyword matches.",details:["Popular models: OpenAI text-embedding-ada-002, Sentence-Transformers, Cohere Embed","Embedding dimensions typically range from 384 to 1536","Cosine similarity is the most common distance metric for comparing embeddings","Batch processing is essential for large document collections","Consider domain-specific embedding models for specialized applications"],code:`from langchain.embeddings import OpenAIEmbeddings
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
print(f"Refund ↔ ML: {sim_2:.2f}")`},{step:4,title:"Vector Store Indexing",subtitle:"Storing Embeddings for Fast Retrieval",icon:"🗄️",color:"#96CEB4",description:"Once embeddings are generated, they need to be stored in a specialized vector database optimized for similarity search. These databases use algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) to find the most similar vectors in milliseconds, even across millions of documents.",details:["Popular vector stores: Pinecone, Weaviate, Chroma, FAISS, Milvus, Qdrant","FAISS (Facebook AI Similarity Search) is great for local development","Pinecone and Weaviate offer managed cloud solutions with built-in scaling","ChromaDB is lightweight and perfect for prototyping","Index types: Flat (exact), IVF (approximate), HNSW (graph-based, fast)"],code:`from langchain.vectorstores import Chroma, FAISS
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
# Output: Total vectors stored: 1247`},{step:5,title:"Query & Retrieval",subtitle:"Finding the Most Relevant Documents",icon:"🔍",color:"#FFEAA7",description:"When a user asks a question, the query is embedded using the same model and compared against all stored vectors. The top-k most similar chunks are retrieved. Advanced retrieval strategies like hybrid search (combining semantic + keyword search), re-ranking, and query transformation can significantly improve results.",details:["Top-k retrieval: return the k most similar documents (typically k=3 to 10)","Similarity threshold: filter out results below a minimum similarity score","Hybrid search combines dense (vector) and sparse (BM25/keyword) retrieval","MMR (Maximum Marginal Relevance) balances relevance with diversity","Query transformation: rewrite, expand, or decompose complex queries"],code:`# Basic similarity search
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
filtered_docs = retriever.get_relevant_documents(query)`},{step:6,title:"Augmented Generation",subtitle:"Combining Context with LLM Intelligence",icon:"✨",color:"#DDA0DD",description:"The retrieved documents are injected into a carefully crafted prompt template along with the user's question. The LLM then generates a response grounded in the provided context. This is where the 'augmented' in RAG comes from — the model's generation is augmented with retrieved knowledge.",details:["Prompt engineering is critical: structure context clearly for the LLM","Include instructions to cite sources and admit when information isn't available","Chain-of-thought prompting can improve reasoning over retrieved context","Temperature setting: lower (0.0-0.3) for factual Q&A, higher for creative tasks","Handle edge cases: no relevant documents found, contradictory information"],code:`from langchain.chat_models import ChatOpenAI
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
    print(f"  - {doc.metadata['source']}")`}],advancedTopics:[{title:"Hybrid Search",icon:"🔀",description:"Combine dense vector search (semantic meaning) with sparse keyword search (BM25/TF-IDF) for the best of both worlds. Semantic search excels at understanding intent, while keyword search catches exact terms, acronyms, and proper nouns that embeddings might miss.",example:`from langchain.retrievers import EnsembleRetriever
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
)`},{title:"Re-Ranking",icon:"📊",description:"After initial retrieval, a cross-encoder re-ranker scores each document-query pair more carefully. This two-stage approach (fast retrieval → precise re-ranking) dramatically improves the quality of final results, especially when the initial retrieval returns many candidates.",example:`from sentence_transformers import CrossEncoder

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
    print(f"Content: {doc.page_content[:100]}...\\n")`},{title:"Query Transformation",icon:"🔄",description:"Complex or ambiguous queries can be rewritten, expanded, or decomposed into sub-queries for better retrieval. Techniques include HyDE (Hypothetical Document Embeddings), multi-query generation, and step-back prompting to retrieve more relevant context.",example:`from langchain.retrievers import MultiQueryRetriever

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
# real documents better than the raw question`},{title:"Evaluation & Metrics",icon:"📈",description:"Measuring RAG performance requires evaluating both retrieval quality and generation quality. Key metrics include context relevance (did we retrieve the right documents?), answer faithfulness (is the answer grounded in context?), and answer relevance (does it address the question?).",example:`from ragas import evaluate
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
#  'context_precision': 0.85, 'context_recall': 0.79}`}],useCases:[{title:"Customer Support Bot",icon:"💬",desc:"Build an AI chatbot grounded in your product documentation, FAQs, and support tickets for accurate, instant customer assistance."},{title:"Legal Document Analysis",icon:"⚖️",desc:"Query across thousands of legal cases, contracts, and regulations to find relevant precedents and clauses in seconds."},{title:"Medical Knowledge Assistant",icon:"🏥",desc:"Help clinicians quickly access clinical guidelines, drug interactions, and research papers during patient consultations."},{title:"Enterprise Search",icon:"🏢",desc:"Unify knowledge across Confluence, Slack, Google Drive, and databases into a single intelligent search interface."},{title:"Educational Tutor",icon:"📚",desc:"Create personalized tutoring systems grounded in textbooks and course materials that can explain concepts and answer student questions."},{title:"Code Documentation Assistant",icon:"💻",desc:"Index your codebase documentation, READMEs, and API references to help developers find answers without leaving their IDE."}],bestPractices:[{title:"Chunk Size Optimization",tip:"Start with 512-1024 tokens. Smaller chunks improve precision but lose context. Larger chunks preserve context but add noise. Test with your specific data.",category:"Chunking"},{title:"Overlap Strategy",tip:"Use 10-20% overlap between chunks to prevent losing context at boundaries. For conversational data, overlap at sentence boundaries.",category:"Chunking"},{title:"Metadata Enrichment",tip:"Store rich metadata (source, date, author, section) with each chunk. Use metadata filters to narrow retrieval scope and improve relevance.",category:"Indexing"},{title:"Embedding Model Selection",tip:"Match embedding model to your domain. General-purpose models work well for most cases, but domain-specific models (e.g., BioBERT for medical) can significantly improve retrieval in specialized fields.",category:"Embeddings"},{title:"Prompt Engineering",tip:"Always instruct the LLM to say 'I don't know' when context is insufficient. Include few-shot examples of good answers in your prompt template.",category:"Generation"},{title:"Continuous Evaluation",tip:"Set up automated evaluation pipelines using RAGAS or custom metrics. Track faithfulness, relevance, and retrieval quality over time as your knowledge base evolves.",category:"Evaluation"}],glossary:[{term:"LLM",definition:"Large Language Model — a neural network trained on massive text data that can generate human-like text (e.g., GPT-4, Claude, Llama)."},{term:"Embedding",definition:"A numerical vector representation of text that captures its semantic meaning. Similar texts produce similar vectors."},{term:"Vector Store",definition:"A specialized database optimized for storing and querying high-dimensional vectors using similarity search algorithms."},{term:"Chunking",definition:"The process of splitting large documents into smaller, manageable pieces that can be individually embedded and retrieved."},{term:"Cosine Similarity",definition:"A metric that measures the angle between two vectors. Values range from -1 (opposite) to 1 (identical), with higher values indicating greater similarity."},{term:"Top-k Retrieval",definition:"Returning the k most similar documents to a query from the vector store. Common values range from 3 to 10."},{term:"Hallucination",definition:"When an LLM generates text that sounds plausible but is factually incorrect or fabricated. RAG significantly reduces this."},{term:"Context Window",definition:"The maximum number of tokens an LLM can process in a single request. Retrieved documents must fit within this limit."},{term:"BM25",definition:"Best Match 25 — a classic keyword-based ranking algorithm used in sparse retrieval and hybrid search systems."},{term:"HNSW",definition:"Hierarchical Navigable Small World — a graph-based algorithm for fast approximate nearest neighbor search in vector databases."},{term:"Cross-Encoder",definition:"A model that takes a query-document pair as input and outputs a relevance score. More accurate but slower than bi-encoders."},{term:"HyDE",definition:"Hypothetical Document Embeddings — a technique where the LLM generates a hypothetical answer, which is then used as the search query for better retrieval."}]},V=({code:h,title:r})=>{const[m,o]=p.useState(!1),g=()=>{navigator.clipboard.writeText(h),o(!0),setTimeout(()=>o(!1),2e3)};return e.jsxs("div",{style:{background:"#0D1117",borderRadius:12,overflow:"hidden",marginTop:16,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:"#161B22",borderBottom:"1px solid #21262D"},children:[e.jsx("span",{style:{color:"#7EE787",fontSize:13,fontFamily:"'JetBrains Mono', monospace",fontWeight:600},children:r||"Python"}),e.jsx("button",{onClick:g,style:{background:m?"#238636":"#21262D",color:"#C9D1D9",border:"1px solid #30363D",borderRadius:6,padding:"4px 12px",cursor:"pointer",fontSize:12,fontFamily:"'JetBrains Mono', monospace",transition:"all 0.2s"},children:m?"✓ Copied":"Copy"})]}),e.jsx("pre",{style:{margin:0,padding:20,overflowX:"auto",fontSize:13,lineHeight:1.6,color:"#C9D1D9",fontFamily:"'JetBrains Mono', monospace"},children:e.jsx("code",{children:h})})]})},ie=({steps:h,activeStep:r})=>e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",marginBottom:24},children:h.map((m,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:o===r?"linear-gradient(135deg, #FF6B6B, #4ECDC4)":o<r?"#238636":"#21262D",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"'JetBrains Mono', monospace",transition:"all 0.3s",cursor:"pointer",border:o===r?"2px solid #fff":"2px solid transparent",boxShadow:o===r?"0 0 20px rgba(78,205,196,0.4)":"none"},children:o<r?"✓":o+1}),o<h.length-1&&e.jsx("div",{style:{width:24,height:2,background:o<r?"#238636":"#21262D",borderRadius:1}})]},o))}),re=function(){const[r,m]=p.useState("intro"),[o,g]=p.useState(0),[u,C]=p.useState(null),[b,_]=p.useState(""),[l,s]=p.useState({}),[d,F]=p.useState(!1),[v,w]=p.useState(!1),f=p.useRef(null),S=[{id:"intro",label:"Introduction",icon:"🏠"},{id:"why",label:"Why RAG?",icon:"❓"},{id:"architecture",label:"Architecture",icon:"🏗️"},{id:"pipeline",label:"Step-by-Step",icon:"⚙️"},{id:"advanced",label:"Advanced",icon:"🚀"},{id:"usecases",label:"Use Cases",icon:"💡"},{id:"bestpractices",label:"Best Practices",icon:"✅"},{id:"glossary",label:"Glossary",icon:"📖"},{id:"quiz",label:"Knowledge Check",icon:"🎯"}],k=[{q:"What is the primary purpose of RAG?",options:["Replace LLMs entirely","Ground LLM responses in retrieved external knowledge","Train new language models","Compress documents"],correct:1},{q:"Which step converts text into numerical vectors?",options:["Chunking","Indexing","Embedding Generation","Query Transformation"],correct:2},{q:"What does 'Top-k retrieval' mean?",options:["Retrieving only the first k documents","Returning the k most similar documents to the query","Splitting documents into k chunks","Using k different LLMs"],correct:1},{q:"Why is text chunking necessary in RAG?",options:["To make documents look nicer","Because LLMs can only read small text","Documents are too large for embedding and context windows","To delete irrelevant information"],correct:2},{q:"What is a hallucination in the context of LLMs?",options:["A visual illusion in generated images","When the model generates plausible but incorrect information","A type of embedding error","An authentication failure"],correct:1},{q:"Which retrieval strategy combines semantic and keyword search?",options:["Pure vector search","BM25 only","Hybrid Search","Cross-encoding"],correct:2}];p.useEffect(()=>{f.current&&f.current.scrollTo({top:0,behavior:"smooth"})},[r]);const M=x.glossary.filter(t=>t.term.toLowerCase().includes(b.toLowerCase())||t.definition.toLowerCase().includes(b.toLowerCase())),B=t=>e.jsxs("button",{onClick:()=>{m(t.id),w(!1)},style:{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 16px",border:"none",borderRadius:10,cursor:"pointer",background:r===t.id?"linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.15))":"transparent",color:r===t.id?"#F0F6FC":"#8B949E",fontFamily:"'DM Sans', sans-serif",fontSize:14,fontWeight:r===t.id?600:400,borderLeft:r===t.id?"3px solid #4ECDC4":"3px solid transparent",transition:"all 0.2s"},children:[e.jsx("span",{style:{fontSize:18},children:t.icon}),t.label]},t.id),L=()=>e.jsxs("div",{children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)",borderRadius:20,padding:"48px 40px",marginBottom:32,border:"1px solid #21262D",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)",borderRadius:"50%"}}),e.jsx("div",{style:{position:"absolute",bottom:-40,left:-40,width:160,height:160,background:"radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)",borderRadius:"50%"}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsx("div",{style:{display:"inline-block",padding:"6px 14px",background:"rgba(78,205,196,0.15)",borderRadius:20,marginBottom:16,border:"1px solid rgba(78,205,196,0.3)"},children:e.jsx("span",{style:{color:"#4ECDC4",fontSize:13,fontWeight:600,fontFamily:"'JetBrains Mono', monospace"},children:"AI ARCHITECTURE GUIDE"})}),e.jsx("h1",{style:{fontSize:"clamp(28px, 5vw, 48px)",fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif",lineHeight:1.15},children:x.intro.title}),e.jsx("p",{style:{fontSize:"clamp(16px, 2.5vw, 22px)",color:"#4ECDC4",margin:"0 0 24px 0",fontWeight:500,fontFamily:"'DM Sans', sans-serif"},children:x.intro.subtitle}),e.jsx("p",{style:{fontSize:16,lineHeight:1.8,color:"#8B949E",maxWidth:720,fontFamily:"'DM Sans', sans-serif"},children:x.intro.description})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,marginBottom:32},children:[{label:"Accuracy Boost",value:"40-60%",sub:"reduction in hallucinations"},{label:"Cost Savings",value:"10x",sub:"cheaper than fine-tuning"},{label:"Setup Time",value:"< 1 Day",sub:"for a basic prototype"},{label:"Adoption",value:"85%+",sub:"of enterprise AI uses RAG"}].map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,textAlign:"center",border:"1px solid #21262D",transition:"all 0.3s"},children:[e.jsx("div",{style:{fontSize:"clamp(24px, 4vw, 36px)",fontWeight:800,background:"linear-gradient(135deg, #FF6B6B, #4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'JetBrains Mono', monospace"},children:t.value}),e.jsx("div",{style:{color:"#F0F6FC",fontWeight:600,fontSize:14,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:t.label}),e.jsx("div",{style:{color:"#8B949E",fontSize:12,marginTop:2,fontFamily:"'DM Sans', sans-serif"},children:t.sub})]},i))}),e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:32,border:"1px solid #21262D"},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 16px 0",fontFamily:"'DM Sans', sans-serif",fontSize:20},children:"🎯 How RAG Works — The Big Picture"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"center"},children:[{icon:"📄",label:"Your Documents",color:"#FF6B6B"},{icon:"→",label:"",color:"transparent"},{icon:"✂️",label:"Chunk & Embed",color:"#4ECDC4"},{icon:"→",label:"",color:"transparent"},{icon:"🗄️",label:"Vector Database",color:"#45B7D1"},{icon:"→",label:"",color:"transparent"},{icon:"🔍",label:"User Query",color:"#FFEAA7"},{icon:"→",label:"",color:"transparent"},{icon:"🤖",label:"LLM + Context",color:"#DDA0DD"},{icon:"→",label:"",color:"transparent"},{icon:"✅",label:"Grounded Answer",color:"#96CEB4"}].map((t,i)=>t.label===""?e.jsx("span",{style:{color:"#30363D",fontSize:20,fontWeight:700},children:"→"},i):e.jsxs("div",{style:{background:`${t.color}15`,border:`1px solid ${t.color}40`,borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:90},children:[e.jsx("div",{style:{fontSize:24},children:t.icon}),e.jsx("div",{style:{color:t.color,fontSize:11,fontWeight:600,marginTop:4,fontFamily:"'JetBrains Mono', monospace"},children:t.label})]},i))})]})]}),q=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Why Use RAG?"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Understanding the key benefits of Retrieval-Augmented Generation and why it has become the de-facto standard for building production AI applications."}),e.jsx("div",{style:{display:"grid",gap:16},children:x.whyRag.map((t,i)=>e.jsx("div",{onClick:()=>C(u===i?null:i),style:{background:"#161B22",borderRadius:16,padding:24,border:u===i?"1px solid #4ECDC4":"1px solid #21262D",cursor:"pointer",transition:"all 0.3s"},children:e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:16},children:[e.jsx("div",{style:{fontSize:32,flexShrink:0},children:t.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:18,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("span",{style:{color:"#4ECDC4",fontSize:18,transition:"transform 0.3s",transform:u===i?"rotate(180deg)":"rotate(0deg)"},children:"▼"})]}),e.jsx("p",{style:{color:"#8B949E",margin:"8px 0 0 0",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.desc}),u===i&&e.jsx("div",{style:{marginTop:16,padding:16,background:"rgba(78,205,196,0.06)",borderRadius:10,borderLeft:"3px solid #4ECDC4"},children:e.jsx("p",{style:{color:"#C9D1D9",margin:0,fontSize:14,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:t.detail})})]})]})},i))})]}),P=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"RAG Architecture Overview"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"A complete visual breakdown of the RAG pipeline showing how data flows from raw documents to intelligent, grounded responses."}),e.jsxs("div",{style:{background:"#161B22",borderRadius:20,padding:32,border:"1px solid #21262D",marginBottom:24},children:[e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 24px 0",fontSize:20,fontFamily:"'DM Sans', sans-serif",textAlign:"center"},children:"Complete RAG Pipeline Architecture"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:16},children:x.architecture.map((t,i)=>e.jsxs("div",{style:{background:`${t.color}10`,borderRadius:14,padding:20,textAlign:"center",border:`1px solid ${t.color}30`,position:"relative"},children:[e.jsx("div",{style:{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:t.color,color:"#0D1117",width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,fontFamily:"'JetBrains Mono', monospace"},children:t.step}),e.jsx("div",{style:{fontSize:36,marginTop:8},children:t.icon}),e.jsx("div",{style:{color:t.color,fontWeight:700,fontSize:14,marginTop:8,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("div",{style:{color:"#8B949E",fontSize:11,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:t.subtitle})]},i))}),e.jsxs("div",{style:{marginTop:28,padding:20,background:"#0D1117",borderRadius:12,border:"1px solid #21262D"},children:[e.jsx("h4",{style:{color:"#4ECDC4",margin:"0 0 12px 0",fontFamily:"'JetBrains Mono', monospace",fontSize:14},children:"Two Main Phases:"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16},children:[e.jsxs("div",{style:{padding:16,background:"rgba(255,107,107,0.06)",borderRadius:10,border:"1px solid rgba(255,107,107,0.2)"},children:[e.jsx("div",{style:{color:"#FF6B6B",fontWeight:700,fontSize:14,marginBottom:8,fontFamily:"'DM Sans', sans-serif"},children:"📥 Indexing Phase (Offline)"}),e.jsx("p",{style:{color:"#8B949E",fontSize:13,margin:0,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:"Documents are loaded, chunked, embedded, and stored in a vector database. This happens once (or periodically) and prepares your knowledge base for queries."})]}),e.jsxs("div",{style:{padding:16,background:"rgba(78,205,196,0.06)",borderRadius:10,border:"1px solid rgba(78,205,196,0.2)"},children:[e.jsx("div",{style:{color:"#4ECDC4",fontWeight:700,fontSize:14,marginBottom:8,fontFamily:"'DM Sans', sans-serif"},children:"🔍 Retrieval & Generation (Online)"}),e.jsx("p",{style:{color:"#8B949E",fontSize:13,margin:0,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:"User queries are embedded, similar documents are retrieved from the vector store, and an LLM generates a response grounded in the retrieved context."})]})]})]})]})]}),H=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Step-by-Step Implementation"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:20,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Follow each step to build a complete RAG pipeline from scratch. Click through the steps to see detailed code examples and explanations."}),e.jsx(ie,{steps:x.architecture,activeStep:o}),(()=>{const t=x.architecture[o];return e.jsxs("div",{style:{background:"#161B22",borderRadius:20,padding:32,border:`1px solid ${t.color}40`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:20},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:14,background:`${t.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,border:`1px solid ${t.color}40`},children:t.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{color:t.color,fontSize:12,fontWeight:700,fontFamily:"'JetBrains Mono', monospace",textTransform:"uppercase",letterSpacing:1},children:["Step ",t.step," of ",x.architecture.length]}),e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:24,fontFamily:"'DM Sans', sans-serif"},children:t.title})]})]}),e.jsx("p",{style:{color:"#C9D1D9",fontSize:15,lineHeight:1.8,marginBottom:20,fontFamily:"'DM Sans', sans-serif"},children:t.description}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("h4",{style:{color:"#F0F6FC",margin:"0 0 12px 0",fontSize:16,fontFamily:"'DM Sans', sans-serif"},children:"Key Details:"}),e.jsx("div",{style:{display:"grid",gap:8},children:t.details.map((i,c)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsx("span",{style:{color:t.color,fontSize:16,lineHeight:1.5},children:"●"}),e.jsx("span",{style:{color:"#8B949E",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:i})]},c))})]}),e.jsx(V,{code:t.code,title:`Step ${t.step}: ${t.title}`}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:24,gap:12,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>g(Math.max(0,o-1)),disabled:o===0,style:{padding:"10px 24px",borderRadius:10,border:"1px solid #30363D",background:o===0?"#0D1117":"#21262D",color:o===0?"#484F58":"#C9D1D9",cursor:o===0?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontWeight:600,fontSize:14},children:"← Previous Step"}),e.jsx("button",{onClick:()=>g(Math.min(x.architecture.length-1,o+1)),disabled:o===x.architecture.length-1,style:{padding:"10px 24px",borderRadius:10,border:"none",background:o===x.architecture.length-1?"#21262D":`linear-gradient(135deg, ${t.color}, ${x.architecture[Math.min(o+1,5)].color})`,color:o===x.architecture.length-1?"#484F58":"#0D1117",cursor:o===x.architecture.length-1?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontWeight:700,fontSize:14},children:"Next Step →"})]})]})})()]}),O=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Advanced RAG Techniques"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Take your RAG system to the next level with these production-grade optimization techniques used by leading AI teams."}),e.jsx("div",{style:{display:"grid",gap:20},children:x.advancedTopics.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:28,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:12},children:[e.jsx("span",{style:{fontSize:28},children:t.icon}),e.jsx("h3",{style:{color:"#F0F6FC",margin:0,fontSize:20,fontFamily:"'DM Sans', sans-serif"},children:t.title})]}),e.jsx("p",{style:{color:"#8B949E",fontSize:14,lineHeight:1.7,marginBottom:16,fontFamily:"'DM Sans', sans-serif"},children:t.description}),e.jsx(V,{code:t.example,title:t.title})]},i))})]}),Q=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Real-World Use Cases"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"RAG is being deployed across every industry. Here are some of the most impactful applications."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:16},children:x.useCases.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,border:"1px solid #21262D",transition:"all 0.3s"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:12},children:t.icon}),e.jsx("h3",{style:{color:"#F0F6FC",margin:"0 0 8px 0",fontSize:18,fontFamily:"'DM Sans', sans-serif"},children:t.title}),e.jsx("p",{style:{color:"#8B949E",margin:0,fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.desc})]},i))})]}),$=()=>{const t=[...new Set(x.bestPractices.map(i=>i.category))];return e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Best Practices & Tips"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Production-tested guidelines to help you build reliable, high-quality RAG systems."}),t.map(i=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{display:"inline-block",padding:"4px 14px",background:"rgba(78,205,196,0.12)",borderRadius:20,marginBottom:14,border:"1px solid rgba(78,205,196,0.25)"},children:e.jsx("span",{style:{color:"#4ECDC4",fontSize:13,fontWeight:700,fontFamily:"'JetBrains Mono', monospace"},children:i})}),e.jsx("div",{style:{display:"grid",gap:12},children:x.bestPractices.filter(c=>c.category===i).map((c,E)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:14,padding:20,border:"1px solid #21262D"},children:[e.jsx("h4",{style:{color:"#F0F6FC",margin:"0 0 8px 0",fontSize:16,fontFamily:"'DM Sans', sans-serif"},children:c.title}),e.jsx("p",{style:{color:"#8B949E",margin:0,fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:c.tip})]},E))})]},i))]})},U=()=>e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Glossary of Terms"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:20,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Quick reference for all the key terminology used in RAG systems."}),e.jsx("input",{type:"text",placeholder:"🔍 Search terms...",value:b,onChange:t=>_(t.target.value),style:{width:"100%",padding:"12px 18px",borderRadius:12,background:"#0D1117",border:"1px solid #21262D",color:"#F0F6FC",fontSize:15,fontFamily:"'DM Sans', sans-serif",marginBottom:20,outline:"none",boxSizing:"border-box"}}),e.jsx("div",{style:{display:"grid",gap:10},children:M.map((t,i)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:12,padding:18,border:"1px solid #21262D"},children:[e.jsx("span",{style:{color:"#4ECDC4",fontWeight:700,fontSize:15,fontFamily:"'JetBrains Mono', monospace"},children:t.term}),e.jsx("span",{style:{color:"#30363D",margin:"0 10px"},children:"—"}),e.jsx("span",{style:{color:"#8B949E",fontSize:14,lineHeight:1.6,fontFamily:"'DM Sans', sans-serif"},children:t.definition})]},i))})]}),N=()=>{const t=Object.entries(l).filter(([i,c])=>c===k[parseInt(i)].correct).length;return e.jsxs("div",{children:[e.jsx("h2",{style:{fontSize:32,fontWeight:800,color:"#F0F6FC",margin:"0 0 8px 0",fontFamily:"'DM Sans', sans-serif"},children:"Knowledge Check"}),e.jsx("p",{style:{color:"#8B949E",fontSize:16,marginBottom:28,lineHeight:1.7,fontFamily:"'DM Sans', sans-serif"},children:"Test your understanding of RAG concepts. Select the best answer for each question."}),e.jsx("div",{style:{display:"grid",gap:20},children:k.map((i,c)=>e.jsxs("div",{style:{background:"#161B22",borderRadius:16,padding:24,border:"1px solid #21262D"},children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:16},children:[e.jsx("div",{style:{minWidth:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",background:d?l[c]===i.correct?"#23863620":l[c]!==void 0?"#FF6B6B20":"#21262D":"#21262D",color:d?l[c]===i.correct?"#7EE787":l[c]!==void 0?"#FF6B6B":"#8B949E":"#8B949E",fontWeight:700,fontSize:14,fontFamily:"'JetBrains Mono', monospace"},children:c+1}),e.jsx("p",{style:{color:"#F0F6FC",margin:0,fontSize:15,lineHeight:1.5,fontFamily:"'DM Sans', sans-serif"},children:i.q})]}),e.jsx("div",{style:{display:"grid",gap:8,paddingLeft:44},children:i.options.map((E,j)=>{const I=l[c]===j,W=j===i.correct;let D="#0D1117",R="#21262D",A="#8B949E";return d&&W?(D="rgba(35,134,54,0.15)",R="#238636",A="#7EE787"):d&&I&&!W?(D="rgba(255,107,107,0.1)",R="#FF6B6B",A="#FF6B6B"):I&&(D="rgba(78,205,196,0.1)",R="#4ECDC4",A="#4ECDC4"),e.jsx("button",{onClick:()=>!d&&s({...l,[c]:j}),style:{display:"block",width:"100%",textAlign:"left",padding:"10px 14px",borderRadius:10,border:`1px solid ${R}`,background:D,color:A,cursor:d?"default":"pointer",fontFamily:"'DM Sans', sans-serif",fontSize:14,transition:"all 0.2s"},children:E},j)})})]},c))}),e.jsxs("div",{style:{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{F(!0)},style:{padding:"12px 28px",borderRadius:12,border:"none",cursor:"pointer",background:"linear-gradient(135deg, #4ECDC4, #45B7D1)",color:"#0D1117",fontWeight:700,fontSize:15,fontFamily:"'DM Sans', sans-serif"},children:"Check Answers"}),e.jsx("button",{onClick:()=>{s({}),F(!1)},style:{padding:"12px 28px",borderRadius:12,border:"1px solid #30363D",background:"#21262D",color:"#C9D1D9",cursor:"pointer",fontWeight:600,fontSize:15,fontFamily:"'DM Sans', sans-serif"},children:"Reset Quiz"})]}),d&&e.jsxs("div",{style:{marginTop:20,padding:20,borderRadius:14,background:t>=4?"rgba(35,134,54,0.1)":"rgba(255,107,107,0.1)",border:`1px solid ${t>=4?"#238636":"#FF6B6B"}40`},children:[e.jsx("div",{style:{fontSize:20,fontWeight:700,color:t>=4?"#7EE787":"#FF6B6B",fontFamily:"'DM Sans', sans-serif"},children:t>=5?"🎉 Excellent!":t>=4?"👏 Great Job!":t>=2?"📚 Keep Learning!":"💪 Review the Material"}),e.jsxs("div",{style:{color:"#8B949E",fontSize:14,marginTop:4,fontFamily:"'DM Sans', sans-serif"},children:["You scored ",t," out of ",k.length," (",Math.round(t/k.length*100),"%)"]})]})]})},J=()=>{switch(r){case"intro":return L();case"why":return q();case"architecture":return P();case"pipeline":return H();case"advanced":return O();case"usecases":return Q();case"bestpractices":return $();case"glossary":return U();case"quiz":return N();default:return L()}};return e.jsxs("div",{style:{display:"flex",minHeight:"100vh",background:"#0D1117",fontFamily:"'DM Sans', sans-serif",position:"relative"},children:[e.jsx("link",{href:"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",rel:"stylesheet"}),e.jsx("button",{onClick:()=>w(!v),style:{display:"none",position:"fixed",top:16,left:16,zIndex:1e3,width:44,height:44,borderRadius:12,border:"1px solid #21262D",background:"#161B22",color:"#F0F6FC",cursor:"pointer",fontSize:20,alignItems:"center",justifyContent:"center",...typeof window<"u"&&window.innerWidth<=768?{display:"flex"}:{}},children:v?"✕":"☰"}),e.jsxs("aside",{style:{width:260,minWidth:260,background:"#0D1117",borderRight:"1px solid #21262D",padding:"24px 16px",display:"flex",flexDirection:"column",gap:4,position:"sticky",top:0,height:"100vh",overflowY:"auto",...typeof window<"u"&&window.innerWidth<=768?{position:"fixed",left:v?0:-280,zIndex:999,transition:"left 0.3s",boxShadow:v?"4px 0 24px rgba(0,0,0,0.5)":"none"}:{}},children:[e.jsxs("div",{style:{marginBottom:20,paddingLeft:16},children:[e.jsx("div",{style:{fontSize:20,fontWeight:800,color:"#F0F6FC"},children:"📘 RAG Guide"}),e.jsx("div",{style:{color:"#484F58",fontSize:12,fontFamily:"'JetBrains Mono', monospace",marginTop:4},children:"Beginner → Master"})]}),S.map(B),e.jsx("div",{style:{marginTop:"auto",padding:"16px",borderTop:"1px solid #21262D"},children:e.jsx("div",{style:{color:"#484F58",fontSize:11,fontFamily:"'JetBrains Mono', monospace",textAlign:"center"},children:"Interactive Learning Guide"})})]}),v&&e.jsx("div",{onClick:()=>w(!1),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:998}}),e.jsx("main",{ref:f,style:{flex:1,padding:"32px clamp(20px, 4vw, 48px)",overflowY:"auto",maxHeight:"100vh"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[J(),e.jsx("div",{style:{marginTop:48,paddingTop:24,borderTop:"1px solid #21262D",textAlign:"center"},children:e.jsx("p",{style:{color:"#484F58",fontSize:13,fontFamily:"'JetBrains Mono', monospace"},children:"RAG Complete Guide — From Fundamentals to Production"})})]})})]})};function se(){const[h,r]=p.useState(0),m=[{id:0,label:"39. RAG Basics"},{id:1,label:"40. RAG"},{id:2,label:"41. RAG Guide"}],o="#0a0e1a",g="#1e3a5f",u="#00d4ff",C="#475569";return e.jsxs("div",{style:{minHeight:"100vh"},children:[e.jsxs("div",{style:{display:"flex",gap:"6px",padding:"10px 16px",background:o,borderBottom:`2px solid ${g}`,flexWrap:"wrap",position:"sticky",top:0,zIndex:9999},children:[e.jsx("span",{style:{color:u,fontFamily:"'Courier New', monospace",fontSize:11,display:"flex",alignItems:"center",marginRight:8,fontWeight:700,letterSpacing:1},children:"RAG Suite:"}),m.map(b=>e.jsx("button",{onClick:()=>r(b.id),style:{padding:"5px 14px",borderRadius:5,border:`1px solid ${h===b.id?u:g}`,background:h===b.id?`${u}18`:"transparent",color:h===b.id?u:C,fontFamily:"'Courier New', monospace",fontSize:10,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},children:b.label},b.id))]}),e.jsxs("div",{children:[h===0&&e.jsx(ee,{}),h===1&&e.jsx(ne,{}),h===2&&e.jsx(re,{})]})]})}export{se as default};
