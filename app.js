const express = require("express");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://bcc1nc1oglu:T7dXu3K18Vt79E2R@cluster0.9djsobr.mongodb.net/miniFilom"

const app = express();

// CORS çözümü
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


const rentalRouter = require("../miniFilom_Backend/route/rental.js");
const renterRouter = require("../miniFilom_Backend/route/renter.js");
const vehicleRouter = require("../miniFilom_Backend/route/vehicle.js");
const authRouter = require("../miniFilom_Backend/route/auth.js");
require("./Middleware/ScheduledThings.js");

app.use(express.json());
app.use('/vehicle', vehicleRouter);
app.use('/renter', renterRouter);
app.use('/rental', rentalRouter);
app.use('/auth', authRouter);
 

const PORT = process.env.PORT || 3000; 


mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: false })
  .then((result) => {
    app.listen(PORT);
    console.log(PORT);
  })
  .catch((err) => {
    console.log(err);
  });