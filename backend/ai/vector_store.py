from supabase import create_client
from dotenv import load_dotenv
from ai.embeddings import create_embeddings
import os


load_dotenv()


supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)


def search_knowledge(question):

    query_embedding = create_embeddings(
        question
    )


    response = supabase.rpc(
        "match_vet_knowledge",
        {
            "query_embedding": query_embedding,
            "match_count": 3
        }
    ).execute()


    return response.data

