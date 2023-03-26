const Workout = require('../model/workoutmodel')
const mongoose = require("mongoose")

// get all workouts
const getworkouts = async(req, res)=>{
    const workouts= await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// get a single workout
const getworkout = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Enter the correct id format"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:"there is no such workout"})
    }

    res.status(200).json(workout)
}
// create(post) a new workout
const createWorkout = async (req, res)=>{
    const {title, load, reps}=req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(404).json({error:"please enter all fields",emptyFields})
    }

    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(404).json({error:error.message})
    }
}
// delete a workout
const deleteworkout = async (req, res)=>{
    // a bit of destructuring
    const {id}=req.params
    // checking to see if the id follows the correct toder of the mongoose idand using return to stop the program if it doesn't
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"There is no such document"})
    }
    // checking for the workout and saving to the variable if found
    const workout = await Workout.findOneAndDelete({_id:id})
    // checking if id was in correct format but doesn't exist and using the return to halt the function if there is not
    if(!workout){
        return res.status(404).json({error:"No such workout"})
    }
    // if a result was found
    res.status(200).json(workout)
}
// update a workout
const updateworkout =async (req, res)=>{
    // destructuring
    const {id}=req.params
    // check to see if id is in valid format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{
        // req.body is an object so '...' is used to spread the properties of the olbject
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error:"no such workout"})
    }
    res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getworkouts,
    getworkout,
    deleteworkout,
    updateworkout
}