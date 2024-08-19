const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// Serve the static HTML file
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    // Example: Send sensor data periodically
    setInterval(() => {
        const sensorData = getSensorData(); // Replace with actual sensor reading logic
        socket.emit('sensorData', sensorData);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const getSensorData = () => {
    // Mock sensor data, replace with actual sensor reading
    return {
        temperature: Math.random() * 100,
        humidity: Math.random() * 100
    };
};

server.listen(port, () => console.log(`Listening on port ${port}`));
