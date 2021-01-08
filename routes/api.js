const express = require("express")
const path = require("path")
const router = express.Router()
const Workout = require("../models/index")


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/styles.css", (req, res) => {
    console.log("hit styles")
    res.sendFile(path.join(__dirname, "../public/style.css"))
})

router.get("/exercise", (req, res) => {
    console.log("hit styles")
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(workouts => {
        res.json(workouts)
    })
} )


module.exports = router