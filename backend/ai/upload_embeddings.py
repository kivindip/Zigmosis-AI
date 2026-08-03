from sentence_transformers import SentenceTransformer
from supabase import create_client
from dotenv import load_dotenv
import os
import json


load_dotenv()


supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# Load knowledge base

with open(
    "ai/knowledge_base.json",
    "r"
) as file:

    documents = json.load(file)



for doc in documents:

    text = doc["content"]

    embedding = model.encode(
        text
    ).tolist()


    data = {
        "topic": doc["topic"],
        "content": text,
        "embedding": embedding
    }


    response = (
        supabase
        .table("vet_knowledge")
        .insert(data)
        .execute()
    )


    print(
        "Uploaded:",
        doc["topic"]
    )


print("Embedding upload completed!")