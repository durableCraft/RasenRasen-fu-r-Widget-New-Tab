const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');
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

const currentWorkingDirectory = process.cwd();

// Definiere den Pfad zum Ordner mit statischen Dateien (z. B. Bilder)
const staticFolderPath = path.join(currentWorkingDirectory, 'static');

// Statische Dateien bedienen
app.use('/static', express.static(staticFolderPath));

app.get('/', (req, res) => {
    // Lies den Inhalt der HTML-Datei und sende sie als Antwort
    const indexPath = path.join(currentWorkingDirectory, '..', 'index.html');
    res.sendFile(indexPath);
});

app.get('/images/mower.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower.png');
    res.sendFile(indexPath);
})

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
