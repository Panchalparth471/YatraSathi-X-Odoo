const { Server } = require("socket.io");

let activeBookings = {}; // Store active mechanic-user pairs
let mechanics = {}; // Store mechanic locations
let userSockets = {}; // Track user connections

module.exports = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }, // Allow frontend connections
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Store user sockets to send them updates
        socket.on("register-user", (userId) => {
            userSockets[userId] = socket.id;
            console.log(`User ${userId} registered on socket ${socket.id}`);
        });

        // Mechanic sends location updates (only if booked)
        socket.on("mechanic-location", (data) => {
            const { mechanicId, latitude, longitude } = data;
            if (activeBookings[mechanicId]) {
                mechanics[mechanicId] = { latitude, longitude };
                const userId = activeBookings[mechanicId];
                const userSocketId = userSockets[userId];

                // Send update only to the booked user
                if (userSocketId) {
                    io.to(userSocketId).emit("update-location", { mechanicId, latitude, longitude });
                }
            }
        });

        // User confirms a mechanic booking
        socket.on("confirm-booking", (data) => {
            const { userId, mechanicId, latitude, longitude } = data;
            activeBookings[mechanicId] = userId;
            mechanics[mechanicId] = { latitude, longitude };

            console.log(`Tracking started: Mechanic ${mechanicId} for User ${userId}`);

            // Notify the user about the mechanic's initial location
            const userSocketId = userSockets[userId];
            if (userSocketId) {
                io.to(userSocketId).emit("update-location", { mechanicId, latitude, longitude });
            }
        });

        // Booking ends
        socket.on("end-booking", (mechanicId) => {
            delete activeBookings[mechanicId];
            delete mechanics[mechanicId];
            console.log(`Tracking stopped for Mechanic ${mechanicId}`);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
            // Remove user from the tracking list
            for (let userId in userSockets) {
                if (userSockets[userId] === socket.id) {
                    delete userSockets[userId];
                    break;
                }
            }
        });
    });

    return io;
};