"use strict";

const express = require('express');
const https = require('https'); /* use http for development only, otherwise http(s)! */
const http = require('http');
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

app.get('/images/flower.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'flower.png');
    res.sendFile(indexPath);
});

app.get('/images/peg.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'peg.png');
    res.sendFile(indexPath);
});

app.get('/images/rock.png', (req, res) => {
    const indexPath = path.join(currentWorkingDirectory, '..', 'images', 'rock.png');
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

const rasenPartikelAnzahl = 350;
const flowerAnzahl = 15;
const obstacleAnzahl = 4;
let rasenPositionen = {};
let flowerPositionen = {};
let obstaclePositionen = {};

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

function initialFlowerFlache(amount) {
    for (let index = 0; index < amount; index++) {
        const RandPosX = getRandomInteger(22, 1898);
        const RandPosY = getRandomInteger(22, 1058);

        flowerPositionen[RandPosX + RandPosY] = [RandPosX, RandPosY];
    }
}
initialFlowerFlache(obstacleAnzahl);

function initialObstacleFlache(amount) {
    for (let index = 0; index < amount; index++) {
        const RandPosX = getRandomInteger(22, 1898);
        const RandPosY = getRandomInteger(22, 1058);
        const type = getRandomInteger(0, 1);

        obstaclePositionen[RandPosX + RandPosY] = [RandPosX, RandPosY, type];
    }
}
initialObstacleFlache(obstacleAnzahl);

let serverInfo = {};
const fps = 30;
let tempDelRasen = [];
let tempDelFlower = [];

function gamelogic(x, y, radius, socketIdent) {
    for (const key in rasenPositionen) {
        const [objX, objY] = rasenPositionen[key];
        const abstand = Math.sqrt(Math.pow(objX - x, 2) + Math.pow(objY - y, 2));

        if (abstand <= radius) {
            delete rasenPositionen[key];
            serverInfo[socketIdent][4] += 1; /* Score +1 */
            tempDelRasen.push(key);
        }
    }

    for (const key in flowerPositionen) {
        const [objX, objY] = flowerPositionen[key];
        const abstand = Math.sqrt(Math.pow(objX - x, 2) + Math.pow(objY - y, 2));

        if (abstand <= radius) {
            delete flowerPositionen[key];
            serverInfo[socketIdent][4] += 2; /* Score +2 */
            tempDelFlower.push(key);
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
            /* Erstelle neue Rasenfläche wenn niemand mehr da. */
            rasenPositionen = {};
            initialRasenFlaeche(rasenPartikelAnzahl);
            flowerPositionen = {};
            initialFlowerFlache(flowerAnzahl);
            obstaclePositionen = {};
            initialObstacleFlache(obstacleAnzahl);
        }
    });

    //Empfange eine Variable vom Client
    socket.on('clientInfo', (data) => {
        serverInfo[socket.id] = [data[0], data[1], data[2], data[3], data[4]];

        gamelogic(data[0] + 50, data[1] + 50, 40, socket.id);

        //Sende eine Variable an den Client
        socket.emit('serverInfo', serverInfo);
    });

    /* Rasenpartikel etc senden */
    socket.emit('rasenPartikel', rasenPositionen);
    socket.emit('flowers', flowerPositionen);
    socket.emit('obstacles', obstaclePositionen);
    setInterval(() => {
        socket.emit('rasenPartikel', rasenPositionen);
        socket.emit('flowers', flowerPositionen);
    }, 15000); /* Alle 15 Sekunden wird das Absolute Objekt übertragen um Fehler zu beheben. */

    let tempAddRasen = {};
    let tempAddFlower = {};

    function AddRasenFlaeche(amount) {
        for (let index = 0; index < amount; index++) {
            const RandPosX = getRandomInteger(22, 1898);
            const RandPosY = getRandomInteger(22, 1058);

            rasenPositionen[RandPosX + RandPosY] = [RandPosX, RandPosY];
            tempAddRasen[RandPosX + RandPosY] = [RandPosX, RandPosY];
        }
    }

    function AddFlowerFlache(amount) {
        for (let index = 0; index < amount; index++) {
            const RandPosX = getRandomInteger(22, 1898);
            const RandPosY = getRandomInteger(22, 1058);

            flowerPositionen[RandPosX + RandPosY] = [RandPosX, RandPosY];
            tempAddFlower[RandPosX + RandPosY] = [RandPosX, RandPosY];
        }
    }

    /* Rasenpartikel / Flowers hinzufügen oder entfernen */
    setInterval(() => {
        if (Object.keys(rasenPositionen).length < (rasenPartikelAnzahl - 50)) {
            const menge = (rasenPartikelAnzahl - 50) - Object.keys(rasenPositionen).length;
            AddRasenFlaeche(menge);

            if (tempAddRasen != {}) {
                io.emit('AddRasenPartikel', tempAddRasen);
                tempAddRasen = {};
            }
        }
    }, 500);

    setInterval(() => {
        if (Object.keys(flowerPositionen).length < flowerAnzahl) {
            const menge = flowerAnzahl - Object.keys(flowerPositionen).length;
            AddFlowerFlache(menge);

            if (tempAddFlower != {}) {
                io.emit('AddFlower', tempAddFlower);
                tempAddFlower = {};
            }
        }
    }, 2000);

    setInterval(() => {
        if (tempDelRasen != []) {
            io.emit('RemoveRasenPartikel', tempDelRasen);
            tempDelRasen = [];
        }
        if (tempDelFlower != []) {
            io.emit('RemoveFlowers', tempDelFlower);
            tempDelFlower = [];
        }
    }, 250);

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

// Hier startet der HTTP-Server für die Weiterleitung
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers['host']}${req.url}` });
    res.end();
});
httpServer.listen(80, () => {
    console.log('HTTP Server läuft auf Port 80 und leitet auf HTTPS um');
});