import { useWorkoutsContext } from "../hooks/useWorkoutContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Workoutdetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()


    const handleDelete = async ()=>{
        const response = await fetch('/api/workouts/'+workout._id,{
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg):</strong> {workout.load}</p>
            <p><strong>Reps</strong> {workout.reps }</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            <span onClick={handleDelete}><i className="fa fa-trash" aria-hidden="true"></i></span>
        </div>
     );
}
 
export default Workoutdetails;