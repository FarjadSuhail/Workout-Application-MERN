import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutContext();
    
    useEffect(()=> {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            // console.log(response);
            const json = await response.json();
            // console.log(json);
            
            if (response.ok) {
                // setWorkouts(json);
                dispatch({
                    type:'SET_WORKOUTS',
                    payload: json
                })
            }
        }
        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=> (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;