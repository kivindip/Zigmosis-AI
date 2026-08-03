from fastapi import FastAPI
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os

from ai.rag import generate_answer
from ai.safety import protect_response

from fastapi import UploadFile, File
from ai.vision import create_image_embedding
import tempfile

# Load .env file
load_dotenv()

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Supabase connection
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)


# Pet data model
class Pet(BaseModel):
    name: str
    species: str
    breed: str
    age: str
    owner_name: str
    owner_contact: str
    medical_notes: str
    qr_token: str

# =========================
# AI CHAT MODEL
# =========================

class ChatRequest(BaseModel):
    question: str
    pet: dict = {}


# Test backend
@app.get("/")
def home():
    return {"message": "Zigmosis Backend Running"}


# Add new pet
@app.post("/pets")
def add_pet(pet: Pet):

    data = {
        "name": pet.name,
        "species": pet.species,
        "breed": pet.breed,
        "age": pet.age,
        "owner_name": pet.owner_name,
        "owner_contact": pet.owner_contact,
        "medical_notes": pet.medical_notes,
        "qr_token": pet.qr_token
    }

    try:
        response = supabase.table("pets").insert(data).execute()

        return response.data

    except Exception as e:
        print("SUPABASE ERROR:", e)
        return {"error": str(e)}


# Get all pets
@app.get("/pets")
def get_pets():

    try:
        response = supabase.table("pets").select("*").execute()

        return response.data

    except Exception as e:
        print("SUPABASE ERROR:", e)
        return {"error": str(e)}

# =========================
# AI PET ASSISTANT (RAG)
# =========================

@app.post("/ai/chat")
def ai_chat(data: ChatRequest):

    try:

        answer = generate_answer(
    data.question
)


        safe_answer = protect_response(
            answer
        )


        return {
            "question": data.question,
            "answer": safe_answer
        }


    except Exception as e:

        print(
            "AI ERROR:",
            e
        )

        return {
            "error": str(e)
        }
# =========================
# VISION PET VERIFICATION
# =========================

@app.post("/vision/check")
async def vision_check(
    file: UploadFile = File(...)
):

    try:

        # Save uploaded image temporarily
        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".jpg"
        )


        temp_file.write(
            await file.read()
        )

        temp_file.close()


        # Create image embedding
        embedding = create_image_embedding(
            temp_file.name
        )


        # Return embedding for now
        return {
            "message": "Image processed successfully",
            "embedding_size": len(embedding)
        }


    except Exception as e:

        return {
            "error": str(e)
        }
    # Update pet
@app.put("/pets/{pet_id}")
def update_pet(pet_id: str, pet: Pet):

    try:

        data = {
            "name": pet.name,
            "species": pet.species,
            "breed": pet.breed,
            "age": pet.age,
            "owner_name": pet.owner_name,
            "owner_contact": pet.owner_contact,
            "medical_notes": pet.medical_notes,
            "qr_token": pet.qr_token
        }


        response = supabase.table("pets")\
            .update(data)\
            .eq("id", pet_id)\
            .execute()


        return response.data


    except Exception as e:

        return {
            "error": str(e)
        }
    # Delete pet
@app.delete("/pets/{pet_id}")
def delete_pet(pet_id: str):

    try:

        response = supabase.table("pets")\
            .delete()\
            .eq("id", pet_id)\
            .execute()


        return {
            "message": "Pet deleted successfully"
        }


    except Exception as e:

        return {
            "error": str(e)
        }