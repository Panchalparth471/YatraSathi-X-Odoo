# Video Url

https://drive.google.com/drive/folders/19UaoxbXzhbGYmg22bMDRhClnkS11Er4a

# Mechanic Booking and Tracking Application

**Technologies Used:**  
- **Languages:** JavaScript  
- **Libraries/Frameworks:** React Native, Node.js, Express, MongoDB, Razorpay, Leaflet, React Navigation, AsyncStorage, React Native WebView, Razorpay API, Expo Location, React Native Picker, React Native Chart Kit

This project is a mobile application designed to streamline mechanic service bookings and real-time tracking. Users can book a mechanic, track their real-time location, and select their preferred payment method (cash or Razorpay) once the service is completed.

## Key Features:
- **User and Mechanic Profiles:**  
  Users can create and manage profiles, select vehicle details, and initiate service requests. Mechanic profiles are also managed with linked workers.
  
- **Real-Time Tracking:**  
  Integrated a real-time tracking system using **Expo Location** and **Leaflet** inside a **React Native WebView**, providing a seamless experience for users to track both their location and the mechanic's progress in real-time.
  
- **Payment Integration:**  
  Implemented **Razorpay** payment gateway for secure transactions. Users can either choose to pay via Razorpay or opt for cash.
  
- **Data Visualization:**  
  Implemented a **Revenue Dashboard** for mechanics to view their earnings over time using **React Native Chart Kit**. Users can choose between weekly, monthly, or quarterly views to monitor their income.
  
- **Backend API:**  
  The backend is powered by **Node.js** and **Express** for building the RESTful API, using **MongoDB** for database management. **Mongoose** is used for schema-based data modeling.
  
- **User Authentication and Role Management:**  
  Users and mechanics are authenticated, and roles (e.g., Mechanic, Worker) are assigned for permission control.
  
- **State Management:**  
  Used **React Native's useState** for state management, with **AsyncStorage** for persisting user data locally.

## Libraries & Tools:
- **React Native**: Cross-platform mobile development framework.
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Framework to build RESTful APIs.
- **MongoDB** & **Mongoose**: NoSQL database and ODM for schema modeling.
- **Razorpay API**: For payment processing.
- **Leaflet**: For interactive maps in the app (via **React Native WebView**).
- **React Navigation**: For managing navigation between app screens.
- **React Native Picker**: For selecting payment methods and data visualization views.
- **React Native Chart Kit**: To render line charts for income visualization.
- **Expo Location**: To fetch user's location.
- **AsyncStorage**: For persisting user data locally.

This project showcases the integration of a wide range of technologies to deliver an efficient, user-friendly, and interactive mobile application.
