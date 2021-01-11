const express = require("express")
const path = require("path")
const router = express.Router()
const Workout = require("../models/workout.js")


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
        .catch(err => {
            res.json(err)
        })
})

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {
            res.json(err)
        })
})


router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})
router.get("/api/workouts/range", (req, res) => {
    // aggregating code https://masteringjs.io/tutorials/mongoose/aggregate
    Workout.aggregate([
        {
            // aggregating the fields based off of total duration which is equal to the sum of the exercise duration
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        // sorting the workout results by id and then only returning 7 results (7 days)
        .sort({ _id: 1 })
        .limit(7)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.json(err)
        })
})
router.put("/api/workouts/:id", ({ body, params }, res) => {

    //finding by id and updating https://kb.objectrocket.com/mongo-db/how-to-use-mongoose-to-find-by-id-and-update-with-an-example-1209
    Workout.findByIdAndUpdate(params.id ,{ exercises: body}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }

    })

})
module.exports = router