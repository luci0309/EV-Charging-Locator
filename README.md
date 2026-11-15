# ⚡ EV Charging Station Locator

A full-stack web application built using the **MERN stack** that helps electric vehicle (EV) owners discover, locate, and manage EV charging stations through an interactive map-based interface.

The application allows users to explore charging stations, check their availability, filter stations based on charger types, calculate distances from their current location, and navigate to selected charging stations using Google Maps.

---

## 🚀 Project Overview

With the growing adoption of electric vehicles, finding accessible charging infrastructure is becoming increasingly important.

The EV Charging Station Locator aims to simplify this process by providing a centralized platform where users can search for charging stations, view their locations, explore charging details, and manage station information.

The application follows a client-server architecture, using React.js for the frontend, Node.js and Express.js for backend services, and MongoDB for database management.

## ✨ Key Features

- **Charging Station Discovery:** Browse available EV charging stations with detailed information.
- **Interactive Map Integration:** View charging station locations using Leaflet and OpenStreetMap.
- **Location-Based Search:** Use the browser's geolocation API to identify the user's current location.
- **Distance Calculation:** Calculate distances between the user's location and charging stations using the Haversine formula.
- **Search Functionality:** Search stations by name, address, city, and charger type.
- **Advanced Filtering:** Filter stations based on charger type and availability.
- **Station Management:** Add, update, view, and delete charging station records.
- **Google Maps Navigation:** Get directions to selected charging stations.
- **Responsive Interface:** Access the application through desktop and mobile browsers.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Frontend Tooling | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Maps | Leaflet, React Leaflet, OpenStreetMap |
| Geolocation | Browser Geolocation API |
| Navigation | Google Maps Directions |
| API Communication | RESTful APIs |
| Development Tools | Visual Studio Code, Git, GitHub |

## 🏗️ Project Architecture

The application follows a three-layer architecture:

1. **Presentation Layer:** React.js provides the user interface, interactive components, search, and filtering functionality.
2. **Application Layer:** Node.js and Express.js handle API requests, business logic, and CRUD operations.
3. **Data Layer:** MongoDB stores charging station information, while Mongoose manages database schemas and interactions.

### Application Workflow

```text
             User
              |
              v
       React Frontend
              |
              v
       Express REST API
              |
              v
        Node.js Backend
              |
              v
          MongoDB
```

## 📂 Project Structure

```text
EV-Charging-Locator/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── StationCard.jsx
│   │   │   ├── AddStation.jsx
│   │   │   ├── StationMap.jsx
│   │   │   └── FilterBar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── stationController.js
│   │
│   ├── models/
│   │   └── Station.js
│   │
│   ├── routes/
│   │   └── stationRoutes.js
│   │
│   ├── server.js
│   ├── seedStations.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js (v20 or later recommended)
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/EV-Charging-Locator.git
```

Navigate into the project directory:

```bash
cd EV-Charging-Locator
```

### 2. Configure the Backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Replace the MongoDB placeholder with your actual database connection string.

### 3. Start the Backend Server

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 4. Configure the Frontend

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://127.0.0.1:5000
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

## 🔌 API Endpoints

The backend provides RESTful APIs for managing charging station information.

Base URL:

```text
http://localhost:5000/api/stations
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stations` | Retrieve all charging stations |
| GET | `/api/stations/:id` | Retrieve a station by ID |
| POST | `/api/stations` | Add a new charging station |
| PUT | `/api/stations/:id` | Update station information |
| DELETE | `/api/stations/:id` | Delete a charging station |
| GET | `/api/health` | Check backend and database health |

## 📍 Distance Calculation

The application uses the **Haversine formula** to calculate the geographical distance between two coordinates.

This calculation helps identify nearby charging stations and arrange them according to their distance from the user's current location.

The formula uses latitude and longitude coordinates to estimate the great-circle distance between two geographical points.

## 🗄️ Database Schema

Each charging station record contains the following information:

| Field | Description |
|---|---|
| name | Charging station name |
| address | Station address |
| city | City where the station is located |
| chargerType | Type of EV charger |
| powerOutput | Charging power in kW |
| price | Charging price |
| available | Current availability status in the stored data |
| latitude | Geographical latitude |
| longitude | Geographical longitude |

MongoDB stores these records using a Mongoose schema with validation.

## 🔐 Environment Variables

Environment variables are used to manage application configuration and sensitive information.

Never upload actual database credentials or secret environment files to GitHub.

Required variables:

**Backend (`server/.env`)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

**Frontend (`client/.env`)**

```env
VITE_API_URL=http://127.0.0.1:5000
```

## 🔮 Future Enhancements

- Integration with live EV charging station data providers.
- Real-time charger availability and occupancy updates.
- User authentication and personalized accounts.
- Booking and reservation functionality.
- Route optimization based on vehicle range and charging requirements.
- Payment gateway integration.
- Station ratings and user reviews.
- Advanced analytics and charging station recommendations.

## ⚠️ Demo Data Disclaimer

The project includes illustrative charging station records for demonstration and testing purposes. Their locations, prices, and availability are not verified live operational data.

## 👨‍💻 Author

Abhishek Sriavstava

Computer Science Engineering

GitHub: https://github.com/luci0309/
---

⭐ If you find this project interesting, consider giving the repository a star!

**Built to make EV charging discovery simpler, smarter, and more accessible.**
