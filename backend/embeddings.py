
from sentence_transformers import SentenceTransformer

# Load the same model used to upload knowledge embeddings.
model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embeddings(text):
    embedding = model.encode(text)
    return embedding.tolist()
