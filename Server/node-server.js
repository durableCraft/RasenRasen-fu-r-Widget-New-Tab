const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Rate Limiting für API-Endpunkte (z.B. Socket.io)
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 Minute
    max: 3800, // Maximale Anzahl von Anfragen pro Minute
    message: 'Zu viele Anfragen von dieser IP, bitte versuche es später erneut.'
});

app.use('/api/', apiLimiter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

/* const rasenPartikelAnzahl = 300;
let rasenPositionen = [{}];

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialRasenFlaeche(amount) {
    for (let index = 0; index < amount; index++) {
        const RandPosX = getRandomInteger(1, canvas.width);
        const RandPosY = getRandomInteger(1, canvas.height);

        rasenPositionen.push([RandPosX, RandPosY]);
    }
}

initialRasenFlaeche(rasenPartikelAnzahl); */

let serverInfo = [{}];
const fps = 60;

function gamlogic() {
    
}

io.on('connection', (socket) => {
    // Beispiel: Sende eine Variable an den Client
    setInterval(() => {
        socket.emit('serverInfo', serverInfo);
    }, 1000 / fps);

    // Beispiel: Empfange eine Variable vom Client
    socket.on('clientInfo', (data) => {
        serverInfo.push(data);
    });
});

server.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
