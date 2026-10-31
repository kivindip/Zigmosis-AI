# Zigmosis AI – Smart Pet Care and Digital Pet Identity Platform

**Zigmosis AI** is a web-based pet-care platform designed to support pet owners and the wider community in managing pet information, accessing pet-care guidance, and helping reunite missing pets with their families.

The platform brings together digital pet registration, QR-based pet identity, missing and found pet reports, pet listings, educational resources, and an AI-powered assistant called **PawPal**.

The main goal is to make pet information easier to manage and help create a more connected and supportive pet-care community in Sri Lanka.




## Project Overview

Finding reliable pet information and responding to a missing pet can be challenging for pet owners. Important pet details may be scattered across different platforms, and owners may struggle to reach people who can help.

Zigmosis AI aims to address these challenges through one central platform where users can:

- Register their pets and maintain digital pet identities.
- Access QR-based pet identification.
- Report missing and found pets.
- Browse pet listings and view individual pet information.
- Access pet-care articles and guides.
- Ask pet-related questions using the PawPal AI assistant.
- Contact the team and submit feedback.



##  Project Objectives

The main objectives of Zigmosis AI are to:

1. Provide a simple way for pet owners to register and manage pet information.
2. Introduce digital pet identities with QR codes.
3. Help owners report and search for missing pets.
4. Allow users to report pets they have found.
5. Connect pet owners and the community through shared pet reports.
6. Provide accessible pet-care information and educational resources.
7. Offer an AI-powered assistant for general pet-care guidance.
8. Develop a user-friendly platform that supports responsible pet ownership.



##  Main Features

### 1.  User Authentication

- Provides a sign-in interface for users.
- Supports account access through the authentication system.
- Helps users access the platform's available features.

### 2.  Home Page

- Introduces the Zigmosis AI platform.
- Provides navigation to the main sections.
- Highlights the platform's purpose and services.

### 3.  Our Story, Vision and Mission

- Explains the background and purpose of the project.
- Presents the platform's vision and mission.
- Includes testimonials to share user experiences.

### 4.  How Zigmosis Works

- Explains the main steps involved in using the platform.
- Introduces pet registration and digital identity.
- Explains how missing and found reports help the community.

### 5.  Contact and Feedback

- Allows users to contact the Zigmosis team.
- Provides a contact form for messages and enquiries.
- Includes a feedback section for suggestions and opinions.

### 6.  Pet Registration

- Allows users to register their pets.
- Collects important pet information, such as name, breed, age and identifying details.
- Supports adding a pet photograph.
- Provides a digital pet identity with a QR code.

### 7.  Report Missing Pet

- Allows owners to report missing pets.
- Supports uploading a photograph.
- Collects pet details and identifying information.
- Includes the last-seen location and date.
- Allows users to provide a description and contact information.

### 8.  Report Found Pet

- Allows users to report pets they have found.
- Supports uploading a photograph of the found pet.
- Collects available pet information.
- Includes the location where the pet was found.
- Provides contact information to help owners get in touch.

### 9.  Pet Listings

- Displays available missing and found pet reports.
- Allows users to browse pet photographs and basic information.
- Provides access to individual pet details.

### 10.  Pet Details

- Displays information about an individual pet.
- Includes available details such as name, breed, age, colour and location.
- Helps users review a pet report.
- Provides available contact options for communicating with the reporter.

### 11.  Pet Reports

- Allows users to explore submitted pet reports.
- Provides access to individual report information.
- Helps users review available missing and found pet records.

### 12.  Missing and Found Section

- Brings missing and found pet information together.
- Allows users to check missing pet reports.
- Allows users to browse found pet reports.
- Supports community involvement in helping reunite pets with their owners.

### 13.  Blog and Guides

- Provides pet-care articles and educational resources.
- Covers useful information about pet care and safety.
- Helps owners access guidance and learn more about responsible pet ownership.

### 14.  PawPal – AI Pet Assistant

PawPal is the AI-powered assistant integrated into the Zigmosis AI platform.

- Allows users to ask general pet-care questions.
- Provides helpful information through a chat interface.
- Supports users with accessible pet-care guidance.
- Makes it easier to find basic information through conversation.

*PawPal provides general information and does not replace professional veterinary advice or diagnosis.*

---

## Technologies Used

The project uses the following technologies and tools:

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| TypeScript | Adding type safety to the application |
| Vite | Frontend development and build tool |
| Supabase | Backend services, authentication and data storage |
| Supabase Storage | Storing supported uploaded images |
| HTML5 | Structuring web content |
| CSS3 | Styling and responsive layouts |
| JavaScript | Application functionality |
| Git and GitHub | Version control and source-code management |
| Netlify | Website deployment and hosting |

---

##  Database and Storage

Zigmosis AI uses Supabase for selected backend functionality.

The project includes:

- **Supabase Authentication:** Supports user authentication.
- **Supabase Database:** Stores supported pet-report information.
- **Supabase Storage:** Stores uploaded pet-report images.

The project also uses browser local storage for selected frontend functionality.

---

##  How the Platform Works

The general user journey is:

1. **Access the platform:** Users visit the Zigmosis AI website.
2. **Explore the home page:** Users learn about the platform and its services.
3. **Register a pet:** Owners enter their pet's information and create a digital identity.
4. **Use the QR identity:** The pet's digital identity includes a QR code.
5. **Report a missing pet:** Owners submit a missing pet report with relevant details.
6. **Report a found pet:** Users submit information about pets they have found.
7. **Browse pet listings:** Users explore available missing and found reports.
8. **View pet details:** Users open individual reports to learn more.
9. **Access pet-care resources:** Users explore articles and guides.
10. **Ask PawPal:** Users interact with the AI assistant for general pet-care guidance.



##  Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git
- Visual Studio Code or another code editor

### Step 1 – Clone the Repository

```bash
git clone https://github.com/kivindip/Zigmosis-AI.git
```

### Step 2 – Open the Project Folder

```bash
cd Zigmosis-AI
```

### Step 3 – Install Dependencies

```bash
npm install
```

### Step 4 – Configure Environment Variables

If the project requires Supabase environment variables, create a `.env` file in the project root and add the required values.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use your own Supabase project details. Never publish private keys or service-role credentials in a public repository.

### Step 5 – Run the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal to view the website.

### Step 6 – Build the Project

```bash
npm run build
```

=


##  Future Improvements

The following improvements could be introduced in future versions:

- Improve QR code scanning and pet identification.
- Add notifications when a matching missing or found pet report is submitted.
- Introduce advanced search and filtering for pet listings.
- Improve user profiles and pet management.
- Add a map-based view of missing and found pet locations.
- Expand PawPal with more pet-care information and improved AI responses.
- Add multilingual support for Sinhala, Tamil and English.
- Improve accessibility and mobile responsiveness.
- Expand the platform's database and reporting functionality.
- Introduce stronger user and data management features.



##  Project Information

**Project Name:** Zigmosis AI  
**Project Type:** Web-Based Pet Care Platform  
**Project Category:** Artificial Intelligence and Web Development  
**Project Purpose:** Digital Pet Identity, Pet Care Guidance, and Missing and Found Pet Support  
**Repository Owner:** [kivindip](https://github.com/kivindip)



