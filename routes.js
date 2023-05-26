const express = require("express");
const router = express.Router();
const Car = require("./models/car");

// Hae kaikki autot
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lisää uusi auto
router.post("/cars", async (req, res) => {
  try {
    const { brand, model, color, year } = req.body;
    const newCar = await Car.create({ brand, model, color, year });
    res.status(201).json(newCar);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
// Poista auto
router.delete("/cars", async (req, res) => {
  try {
    const poistettavaAuto = await Car.deleteOne({ _id: req.body.id });
    res.status(200).json(poistettavaAuto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Muokkaa autoa
router.put("/cars/:id", async (req, res) => {
  try {
    const muokattuAuto = await Car.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(muokattuAuto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
