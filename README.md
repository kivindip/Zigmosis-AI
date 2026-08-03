#  Zigmosis AI

## AI-Powered Pet Digital Identity & Health Assistant (MVP)

Zigmosis AI is a full-stack AI-powered pet healthcare platform designed to create digital identities for pets, store important health records, and provide intelligent pet care assistance.

The platform helps pet owners manage pet information through a digital profile while using AI-based assistance to provide general guidance about pet health, nutrition, vaccination, and care.

This project was developed as a Minimum Viable Product (MVP) to demonstrate the integration of web development, cloud databases, backend APIs, and AI-assisted features.

---

#  Features

##  Pet Digital Identity Management

Zigmosis allows users to create and manage digital profiles for their pets.

Features:
- Register new pets
- Store pet details
- View registered pets
- Update pet information
- Delete pet records
- Maintain pet health information

---

##  Cloud Database Integration

The project uses Supabase as the cloud database platform.

Database features:
- Secure pet data storage
- Real-time database connection
- Pet record management
- CRUD operations

CRUD Operations:

 Create  
- Add new pet profiles to the database

 Read  
- Retrieve and display stored pet information

 Update  
- Modify existing pet details

 Delete  
- Remove pet records when required

---

#  PawPal AI Assistant

PawPal is Zigmosis AI's intelligent pet care assistant.

It provides general guidance about:

-  Pet nutrition
-  Vaccination information
-  Dog care
-  Cat care
-  Common health concerns
- Skin problems
-  Emergency situations

The assistant is designed to provide quick pet care information while reminding users to consult professional veterinarians when necessary.

---

#  AI Vision Check

The AI Vision Check feature provides a pet image verification workflow.

Features:
- Upload pet images
- Preview uploaded images
- Process image input
- Provide verification feedback

This feature represents the foundation for future AI-powered pet recognition and identification systems.

---

#  System Architecture


User
│
▼
Frontend Interface
(HTML, CSS, JavaScript)
│
▼
FastAPI Backend
(Python)
│
├───────────────┐
▼ ▼
Supabase AI Services
Database PawPal Assistant
Vision Processing


---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python
- FastAPI
- REST API

## Database

- Supabase
- PostgreSQL

## AI Components

- PawPal AI Assistant
- Pet Vision Processing Prototype

## Development Tools

- Git
- GitHub
- Visual Studio Code

---

#  Project Structure


Zigmosis-AI/

│
├── backend/
│ │
│ ├── main.py
│ ├── ai/
│ │ ├── rag.py
│ │ ├── safety.py
│ │ └── vision.py
│ ├── .env
│ └── requirements.txt
│
├── frontend/
│ │
│ ├── index.html
│ ├── about.html
│ ├── register.html
│ ├── pets.html
│ ├── assistant.html
│ ├── vision.html
│ ├── style.css
│ └── script.js
│
├── data/
├── models/
├── src/
│
└── README.md


---

#  Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/Zigmosis-AI.git
Security

The project includes:

Environment variable protection
Separation of frontend and backend
API-based communication
Input validation using FastAPI models

 Future Improvements

Future versions of Zigmosis AI can include:

Advanced RAG-based AI assistant
Veterinary knowledge database integration
Real pet recognition model
QR code pet identification scanning
Mobile application
Veterinary service integration
Health tracking and reminders

Project Goal

The goal of Zigmosis AI is to improve pet healthcare management by combining digital pet identity, cloud technology, and AI assistance into one accessible platform.

 Author

Kivindi Perera

AI Student
Sri Lanka
