import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const { isLoggedIn } = useAuthContext();
    console.log(isLoggedIn);
    
    const handleClick = async () => {
        if (!isLoggedIn) {
            return;
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${isLoggedIn.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            dispatch({
                type:'DELETE_WORKOUT',
                payload: json
            })
        }
    }
    return (
       <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{ addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
       </div>
    )
}

export default WorkoutDetails;