const express = require("express");
const main_router = require("./controllers/main");
const rest_router = require("./controllers/rest_main");
const auth_router = require("./controllers/auth");
const path = require("path");
const Driver = require("./models/driver");
const Package = require("./models/package");
const { connectDB } = require("./utils/utils");
const { auth } = require("./utils/firestore");
const textToSpeech = require("@google-cloud/text-to-speech");
const translation = require("@google-cloud/translate");
const fs = require("fs");
const axios = require("axios");
require('dotenv').config();

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const translateClient = new translation.TranslationServiceClient();
const translateNamespace = io.of("translate");
translateNamespace.on("connection", (socket) => {

    socket.on('translate', (data) => {

        const request = {
            parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/global`,
            contents: [data.content],
            targetLanguageCode: data.language
        };


        translateClient.translateText(request, (err, res) => {
            if (err) {
                console.log("ERROR:", err);
                return;
            }

            socket.emit('return', res.translations[0].translatedText);
        });
    });
});


const textToSpechClient = new textToSpeech.TextToSpeechClient();
const textToSpeechNameSpace = io.of("text-to-speech");
textToSpeechNameSpace.on("connection", (socket) => {

    socket.on('text', (text) => {
        const request = {
            input: { text: text },
            // Select the language and SSML Voice Gender (optional)
            voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: "MP3" },
          };

        textToSpechClient.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.log("ERROR:", err);
                return;
            }

            fs.writeFile(`audio/${text}.mp3`, response.audioContent, "binary", err => {
                if (err) {
                    console.log(err);
                }
            });

            socket.emit('return', 'Successful')
        });
    });
});


const distanceNamespace = io.of('distance');
distanceNamespace.on("connection", (socket) => {

    socket.on('distance', async (data) => {
        const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
            params: {
                origins: "Melbourne, VIC",
                destinations: data,
                key: `${process.env.GOOGLE_API_KEY}`
            }
        })

        // console.log(response.data.rows[0].elements)
        try {
            let value = response.data.rows[0].elements[0].distance.value;
            socket.emit('return', value);
        } catch (e) {
            socket.emit('return', -1);
        }

    });
});

app.set('port', 8080);
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("../frontend/dist/assignment-3/browser"));
app.use(express.static("images"));


app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use("/32963742/James/api", rest_router);
app.use("/32963742/James", auth_router);
app.use("/32963742/James", main_router);


app.use("/audio", express.static(path.join(__dirname, 'audio')));


/**
 * This function renders the homepage of the app
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
*/
async function renderIndex(req, res) {
    let driverNum = await Driver.countDocuments();
    let packageNum = await Package.countDocuments();
    res.render("common/index.html", {driverNum, packageNum, login: auth.currentUser ? true : false});
}
app.get("/", renderIndex);


/**
 * This function redirects any invalid route to the 404 view
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
*/
function redirect404(req, res) {
    res.redirect("/32963742/James/error");
}
app.get("*", redirect404);

// listen to port
server.listen(app.get('port'), () => {
    console.log("Listening to port 8080 at http://localhost:8080");

})

connectDB();
