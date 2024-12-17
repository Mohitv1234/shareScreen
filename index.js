// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server and bind the app
const server = http.createServer(app);

// Set up Socket.io on the server
const io = socketIo(server);

// Serve static files (optional, if you have a client-side project)
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A client connected');

    // Event for when a screenshot is taken (client emits this event)
    socket.on('screenshotTaken', (data) => {
        console.log('Screenshot data received:', data);

        // Send a response back to the client
        socket.emit('screenshotResponse', {
            message: 'Screenshot received!',
            data
        });
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
