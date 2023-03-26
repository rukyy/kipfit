import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const Workoutform = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, settitle]=useState('')
    const [load, setLoad]=useState('')
    const [reps, setreps]=useState('')
    const [emptyFields, setemptyFields]=useState([])
    const [error, seterror]=useState(null)


    const handlesubmit = async (e)=>{
            e.preventDefault()
            const workout= {title, reps, load}

            const response = await fetch('/api/workouts',{
                method:"POST",
                body:JSON.stringify(workout),
                headers:{"Content-Type":"application/json"}
            })

            const json =await response.json()
            
            if(!response.ok){
                seterror(json.error)
                setemptyFields(json.emptyFields)
            }
            if(response.ok){
                settitle('')
                setLoad('')
                setreps('')
                seterror(null)
                setemptyFields([])
                dispatch({type : 'CREATE_WORKOUT', payload: json})
                console.log("new workout added",json)
            }
        } 
       



    return ( 
            <form onSubmit={handlesubmit} className="create">
                <label>Exercise Title</label>
                <input type="text"
                onChange={(e)=>{settitle(e.target.value)}}
                value={title} 
                className = {emptyFields.includes('title')? 'error' : ''}
                />

                <label>Load (in kg)</label>
                <input type="number"
                onChange={(e)=>{setLoad(e.target.value)}}
                value={load} 
                className = {emptyFields.includes('load')?'error':''}
                />

                <label>Reps </label>
                <input type="number"
                onChange={(e)=>{setreps(e.target.value)}}
                value={reps}
                className={emptyFields.includes('reps')?'error':''}
                 />

                <button>add workout</button> 
                {error && <div>{error}</div>}

            </form>

    );
}
 
export default Workoutform;