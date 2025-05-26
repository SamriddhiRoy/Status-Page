# Status Page Application

This is a simplified status page application . The application allows administrators to manage services, their statuses, incidents, and provide a public-facing page for users to view the current status of all services.

## Features

-   **User Authentication**: Secure login for admins using dummy credentials.
-   **Team Management**: Ability to add and manage users within different teams.
-   **Service Management**: Perform CRUD operations on services and update their statuses (Operational, Degraded Performance, Partial Outage, Major Outage).
-   **Incident/Maintenance Management**: Create, update, and resolve incidents and scheduled maintenances associated with services.
-   **Real-time Status Updates**: Real-time status updates using WebSockets to notify connected clients.
-   **Public Status Page**: A public-facing page displaying the status of all services and active incidents.

## Tech Stack

-   **Frontend**: React (with Shadcn UI for styling)
-   **Backend**: FastAPI (Python)
-   **WebSockets** for real-time status updates


## Setup Instructions

### Prerequisites

-   Git installed
-   Node.js (for the frontend)
-   Python 3.7+ (for the backend)
-   FastAPI and Uvicorn for backend setup

### Step 1: Clone the repository

Clone the repository to your local machine.

`gh repo clone SamriddhiRoy/Status-Page`

Navigate into the cloned directory.

`cd status-page-app`

### Step 2: Backend Setup (FastAPI)

Navigate to the backend directory.

`cd backend`

Create a virtual environment (recommended for Python) to manage dependencies.

`python -m venv venv`

Activate the virtual environment:

* **For Linux/Mac:** `source venv/bin/activate`
* **For Windows:** `venv\Scripts\activate`

Install the required Python dependencies listed in `requirements.txt`.

`pip install -r requirements.txt`

Run the FastAPI server.

`uvicorn app.main:app --host 0.0.0.0 --port 8001`

Your backend API should now be accessible at `http://127.0.0.1:8001`.

### Step 3: Frontend Setup (React)

Navigate to the frontend directory.

`cd ../client`

Install the frontend dependencies.

`npm install`

Run the React application.

`npm start`

The frontend should now be accessible at `http://localhost:3000`.
