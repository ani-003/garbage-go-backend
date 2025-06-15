# 🗑️ GarbageGo – Backend Server

This is the backend server for **GarbageGo**, a smart city garbage management system. Built using **Node.js**, **Express.js**, and **MongoDB**, it supports multiple user roles (User, Collector, Admin) and handles real-time garbage truck tracking, complaint management, and notification systems.

---

## 🚀 Features

- 🔐 **JWT-based Authentication**  
  Secure login for Users, Admins, and Garbage Collectors using mobile number and passcode.

- 🧾 **RESTful API Endpoints**  
  Clean, modular endpoints for:
  - User registration & login
  - Collector/admin role management
  - Complaint submission with image upload
  - Truck status tracking and schedules

- 🛻 **Truck Tracking via Landmark Timings**  
  Supports landmark-based route scheduling. Tracks when the truck reaches/leaves a landmark.

- 📍 **Smart Status Messaging**  
  Provides user-friendly messages like:
  - `Truck left 5 minutes ago`
  - `2.3 km to Nilgunj More`

- 📸 **Image Upload Support**  
  Users can report uncollected garbage with photos (using Multer; Cloudinary support planned).

- 📜 **Activity Logs in JSONL Format**  
  Efficient truck activity logging using `.jsonl` for easy parsing and scalability.

---

## 🧰 Tech Stack

| Layer         | Tech                      |
|---------------|---------------------------|
| Runtime       | Node.js                   |
| Framework     | Express.js                |
| Database      | MongoDB (Mongoose)        |
| File Uploads  | Multer                    |
| Logging       | JSONL format (per truck)  |

---


---

## 🧪 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/ani-003/garbage-go-backend.git
cd garbage-go-backend

# Install dependencies
npm install

# Create a .env file and add:
MONGODB_URI=your_mongo_connection_string
PORT=5000

# Start the server
npm run dev
```

## 🧑‍💻 Author

**Anirban Das**  
💼 Backend Developer | BCA Student  
🌍 [LinkedIn]([https://www.linkedin.com/in/anirban003](https://www.linkedin.com/in/anirban-das-727440246/)  
💻 [GitHub](https://github.com/ani-003)
