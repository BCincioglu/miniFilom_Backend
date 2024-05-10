const express = require("express");

const vehicleController = require("../controller/vehicle.js");
const { isAuth } = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.get("/", isAuth, vehicleController.getAllVehicles);

router.get("/:id", isAuth, vehicleController.getVehicleById);

router.post("/", isAuth, vehicleController.postNewVehicle);

router.post("/:id", isAuth, vehicleController.postEditVehicle);

router.delete("/:id", isAuth, vehicleController.postDeleteVehicle);

module.exports = router;