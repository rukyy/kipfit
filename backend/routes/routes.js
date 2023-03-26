const express = require('express')
const {createWorkout, getworkouts, getworkout, deleteworkout, updateworkout}= require('../controller/workoutcontroller')
const router = express.Router()

// get all workouts
router.get('/',getworkouts)

// get a single workout
router.get("/:id",getworkout)

// post a new workout
router.post("/",createWorkout)

// delete a workout
router.delete('/:id',deleteworkout)

// update a workout
router.patch('/:id',updateworkout)


module.exports = router