# Mechanic Booking and Tracking Application

**Video Link**
https://drive.google.com/file/d/1F64WKfcG7hwGqGHYy1NyOr3LWqX0NWvw/view?usp=drivesdk

**Technologies Used:**

- **Languages:** JavaScript
- **Libraries/Frameworks:** React Native, Node.js, Express, MongoDB, Razorpay, Leaflet, React Navigation, AsyncStorage, React Native WebView, Razorpay API, Expo Location, React Native Picker, React Native Chart Kit, OpenAI GPT-4, Sharp, **Socket.IO**, **WebRTC**

This project is a mobile application designed to streamline mechanic service bookings, real-time tracking, damage cost estimation, and live communication between users and mechanics. Users can book a mechanic, track their real-time location, select their preferred payment method (cash or Razorpay), and estimate the cost of vehicle damage using OpenAI once the service is completed. Additionally, **Socket.IO** and **WebRTC** are integrated to enable real-time messaging and video communication.

## Key Features:

- **User and Mechanic Profiles:**  
  Users can create and manage profiles, select vehicle details, and initiate service requests. Mechanic profiles are also managed with linked workers.

- **Real-Time Tracking:**  
  Integrated a real-time tracking system using **Expo Location** and **Leaflet** inside a **React Native WebView**, providing a seamless experience for users to track both their location and the mechanic's progress in real-time.

- **Damage Cost Estimation using AI:**  
  Integrated **OpenAI's GPT-4** model to estimate the cost of vehicle repairs based on uploaded images of vehicle damage and provided vehicle details. The AI generates an estimated repair cost, damage severity, and a breakdown of repairs.

- **Payment Integration:**  
  Implemented **Razorpay** payment gateway for secure transactions. Users can either choose to pay via Razorpay or opt for cash once the service is completed.

- **Data Visualization:**  
  Implemented a **Revenue Dashboard** for mechanics to view their earnings over time using **React Native Chart Kit**. Users can choose between weekly, monthly, or quarterly views to monitor their income.

- **Backend API:**  
  The backend is powered by **Node.js** and **Express** for building the RESTful API, using **MongoDB** for database management. **Mongoose** is used for schema-based data modeling. It also supports image uploads and communicates with OpenAI for processing damage cost estimations.

- **User Authentication and Role Management:**  
  Users and mechanics are authenticated, and roles (e.g., Mechanic, Worker) are assigned for permission control.

- **State Management:**  
  Used **React Native's useState** for state management, with **AsyncStorage** for persisting user data locally.

- **Real-Time Communication using Socket.IO and WebRTC:**  
  - **Socket.IO** is used for real-time messaging between users and mechanics, enabling live chat.
  - **WebRTC** is integrated for video calls, allowing users and mechanics to communicate face-to-face in case of service-related queries.

## Libraries & Tools:

- **React Native:** Cross-platform mobile development framework.
- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Framework to build RESTful APIs.
- **MongoDB & Mongoose:** NoSQL database and ODM for schema modeling.
- **Razorpay API:** For payment processing.
- **Leaflet:** For interactive maps in the app (via **React Native WebView**).
- **React Navigation:** For managing navigation between app screens.
- **React Native Picker:** For selecting payment methods and data visualization views.
- **React Native Chart Kit:** To render line charts for income visualization.
- **Expo Location:** To fetch user's location.
- **AsyncStorage:** For persisting user data locally.
- **OpenAI GPT-4:** For AI-powered damage cost estimation based on vehicle images and details.
- **Sharp:** For resizing and compressing vehicle damage images before processing.
- **Socket.IO:** For real-time messaging and communication.
- **WebRTC:** For peer-to-peer video calls between users and mechanics.

This project showcases the integration of a wide range of technologies to deliver an efficient, user-friendly, and interactive mobile application with service booking, damage cost estimation powered by OpenAI, and real-time communication through **Socket.IO** and **WebRTC**.
