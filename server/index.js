const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/info')
  .then(() => console.log('Connected!'));
const cors = require("cors");
const Notis = require("./notification.js");
const express = require('express')
const app = express();
app.use(express.static("build"));
app.use(express.json());
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const bodyParser = require("body-parser");
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with the origin of your frontend application
    methods: ['GET', 'POST'],
    credentials: true, // Include credentials (e.g., cookies) in cross-origin requests if needed
  },
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use("/noti", require("./routes.js"));
// jsonifying
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the origin of your frontend application
  methods: ['GET', 'POST'],
  credentials: true, // Include credentials (e.g., cookies) in cross-origin requests if needed
};

// // allowing CORS:
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc" +
//       "ess-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   // no cache
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

app.use(express.static("build"));
server.listen(4000, ()=>{
    console.log("Listening at http://localhost:4000")
});


io.on("connection", async(socket) => {
  console.log("Connected");

  // On connection start pushing notifications to database
  const notificationsPush = setInterval(() => {
    // create a random notification
    let num = Math.random();
      console.log("Added New Notification");
      // Push new notification to client
      socket.emit("new-notification", num)}, 3000);
      socket.on("disconnect", () => {
        clearInterval(notificationsPush);
        console.log("Disconnected");
      });
});