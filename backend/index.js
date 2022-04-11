//================================imports================================
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
//================================importing routes================================
const testAPI = require("./routes/test_route");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
//================================start of config================================
dotenv.config();

const PORT = process.env.PORT || 3001;
const USERNAME = encodeURIComponent(process.env.USERNAME);
const PASSWORD = encodeURIComponent(process.env.PASSWORD);
const CLUSTER = process.env.CLUSTER;
const DBNAME = process.env.DBNAME;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_IP_ADDRESS,
      process.env.LOCALHOST_FRONTEND_IP_ADDRESS,
    ],
    // methods: ["GET", "POST"],
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//================================connecting to mongoDB================================
//const mongoURI = `mongodb+srv://etsy-clone-user-1:${PASSWORD}@${DBNAME}.lumj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoURI = `mongodb+srv://etsy-clone-user-1:${PASSWORD}@${CLUSTER}.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
//const mongoURI3 = `mongodb+srv://etsy-clone-user-1:Somil@54321@etsy-clone-mern-stack-c.lumj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

mongoose.connection.on("connecting", () => {
  console.log(
    "connecting to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("connected", () => {
  console.log(
    "connected to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("disconnecting", () => {
  console.log(
    "disconnecting to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});
mongoose.connection.on("disconnected", () => {
  console.log(
    "disconnected to mongoDB...and the readyState is",
    mongoose.connection.readyState
  );
});

//================================sample api to test the server================================
app.use("/api/v1/", testAPI);
//================================actual apis================================
app.use("/api/v1/register", registerRoute);
app.use("/api/v1/login", loginRoute);
