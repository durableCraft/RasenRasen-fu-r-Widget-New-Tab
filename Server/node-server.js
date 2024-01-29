"use strict";

const express = require('express');
const https = require('https'); /* use http for development only, otherwise http(s)! */
const hostname = 'lucapleger.com';
const socketIO = require('socket.io');
const path = require('path');
const fs = require("fs");
const rateLimit = require('express-rate-limit');

const app = express();
const options = {
    key: fs.readFileSync("../../ssl/server.key"),
    cert: fs.readFileSync("../../ssl/lucapleger_com.crt"),
    ca: fs.readFileSync('../../ssl/lucapleger_com.p7b')
};
const serverHTTPS = https.createServer(options, app);
const io = socketIO(serverHTTPS);

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

/* Projects Directory send file + css + js */
app.get('/projects', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'projects.html');
    res.sendFile(indexPath);
});
app.get('/style/projects.css', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'style', 'projects.css');
    res.sendFile(indexPath);
});
app.get('/script/projects.js', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'script', 'projects.js');
    res.sendFile(indexPath);
});

/* About Directory send file + css + js */
app.get('/about', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'about.html');
    res.sendFile(indexPath);
});
app.get('/style/about.css', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'style', 'about.css');
    res.sendFile(indexPath);
});
app.get('/script/about.js', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'script', 'about.js');
    res.sendFile(indexPath);
});

/* Index Direktory send files */
app.get('/images/mower.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_2.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_2.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_3.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_3.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_4.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_4.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_5.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_5.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_6.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_6.png');
    res.sendFile(indexPath);
});
app.get('/images/mower_0.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'mower_0.png');
    res.sendFile(indexPath);
});

app.get('/images/fence.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'fence.png');
    res.sendFile(indexPath);
});

app.get('/images/btn_bg.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'btn_bg.png');
    res.sendFile(indexPath);
});

app.get('/images/lucalogo.svg', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'lucalogo.svg');
    res.sendFile(indexPath);
});

app.get('/script/socket.io.js', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'script', 'socket.io.js');
    res.sendFile(indexPath);
});

app.get('/script/client.js', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'script', 'client.js');
    res.sendFile(indexPath);
});

app.get('/style/main.css', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'style', 'main.css');
    res.sendFile(indexPath);
});

app.get('/assets/Silkscreen/Silkscreen-Regular.ttf', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'assets', 'Silkscreen', 'Silkscreen-Regular.ttf');
    res.sendFile(indexPath);
});

app.get('/assets/Silkscreen/Silkscreen-Bold.ttf', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'assets', 'Silkscreen', 'Silkscreen-Bold.ttf');
    res.sendFile(indexPath);
});

/* 404 Seite bei ungültigem Pfad. */
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(currentWorkingDirectory, '..', '404.html'));
});

const rasenPartikelAnzahl = 300;
let rasenPositionen = {};

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialRasenFlaeche(amount) {
    for (let index = 0; index < amount; index++) {
        const RandPosX = getRandomInteger(22, 1898);
        const RandPosY = getRandomInteger(22, 1058);

        rasenPositionen[RandPosX + RandPosY] = [RandPosX, RandPosY];
    }
}

initialRasenFlaeche(rasenPartikelAnzahl);

let serverInfo = {};
const fps = 30;

function gamelogic(x, y, radius, socketIdent) {
    for (const key in rasenPositionen) {
        const [objX, objY] = rasenPositionen[key];
        const abstand = Math.sqrt(Math.pow(objX - x, 2) + Math.pow(objY - y, 2));

        if (abstand <= radius) {
            delete rasenPositionen[key];
            serverInfo[socketIdent][4] += 1; /* Score +1 */
            return key;
        }
    }
}

io.on('connection', (socket) => {
    socket.emit('clientID', socket.id);

    socket.on('disconnect', () => {
        delete serverInfo[socket.id];

        const currentDate = new Date();
        const formatedDate = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + ' - ';
        console.log(formatedDate + socket.id + ' has left!');

        if (Object.keys(serverInfo).length < 1) {
            rasenPositionen = {};

            /* Erstelle neue Rasenfläche wenn niemand mehr da. */
            initialRasenFlaeche(rasenPartikelAnzahl);
        }
    });

    // Beispiel: Empfange eine Variable vom Client
    socket.on('clientInfo', (data) => {
        serverInfo[socket.id] = [data[0], data[1], data[2], data[3], data[4]];

        const key = gamelogic(data[0] + 50, data[1] + 50, 40, socket.id);
        socket.emit('RemoveRasenPartikel', key);
    });

    // Beispiel: Sende eine Variable an den Client
    setInterval(() => {
        socket.emit('serverInfo', serverInfo);
    }, 1000 / fps);

    /* Rasenpartikel senden */
    socket.emit('rasenPartikel', rasenPositionen);
    setInterval(() => {
        socket.emit('rasenPartikel', rasenPositionen);
    }, 15000); /* Alle 15 Sekunden wird das Absolute Objekt übertragen um Fehler zu beheben. */

    let tempAddRasen = {};

    function AddRasenFlaeche(amount) {
        for (let index = 0; index < amount; index++) {
            const RandPosX = getRandomInteger(22, 1898);
            const RandPosY = getRandomInteger(22, 1058);

            rasenPositionen[RandPosX + RandPosY] = [RandPosX, RandPosY];
            tempAddRasen[RandPosX + RandPosY] = [RandPosX, RandPosY];
        }
    }

    setInterval(() => {
        if (Object.keys(rasenPositionen).length < (rasenPartikelAnzahl - 50)) {
            const menge = (rasenPartikelAnzahl - 50) - Object.keys(rasenPositionen).length;
            AddRasenFlaeche(menge);

            if (tempAddRasen != {}) {
                socket.emit('AddRasenPartikel', tempAddRasen);
                tempAddRasen = {};
            }
        }
    }, 500);

    /* Joining Message: */
    function consoleJoinLog() {
        const currentDate = new Date();
        const formatedDate = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + ' - ';
        console.log(formatedDate + socket.id + ' has joined!');
    }
    consoleJoinLog();
});

serverHTTPS.listen(443, () => {
    console.log('Server läuft auf Port 443');
});