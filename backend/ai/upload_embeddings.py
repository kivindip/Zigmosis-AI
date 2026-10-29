
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

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("ai/knowledge_base.json", "r", encoding="utf-8") as file:
    documents = json.load(file)

# Get the existing knowledge to avoid uploading duplicates.
response = (
    supabase
    .table("vet_knowledge")
    .select("topic, content")
    .execute()
)

existing = {
    (item["topic"], item["content"])
    for item in response.data
}

for doc in documents:
    topic = doc["topic"]
    content = doc["content"]

    # Skip knowledge that already exists.
    if (topic, content) in existing:
        print("Skipped existing:", topic)
        continue

    embedding = model.encode(content).tolist()

    data = {
        "topic": topic,
        "content": content,
        "embedding": embedding
    }

    supabase.table("vet_knowledge").insert(data).execute()

    print("Uploaded:", topic)

print("Knowledge upload completed!")
