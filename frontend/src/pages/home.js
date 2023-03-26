import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import Workoutdetails from "../components/workoutdetails";
import Workoutform from "../components/workoutform";

const Home = () => {
    const {workouts, dispatch}= useWorkoutsContext()


    useEffect(()=>{
        const fetchworkouts=async ()=>{
            const response= await fetch("/api/workouts")
            const json =await response.json()

            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }

        fetchworkouts()
    },[dispatch])

    return ( 
        <div className="home">
            <div className="workouts">
                 {workouts && workouts.map((workout)=>(
                    <Workoutdetails key={workout._id } workout={workout}/>
                 ))}
            </div>
            <Workoutform />
        </div>
     );
}
 
export default Home;