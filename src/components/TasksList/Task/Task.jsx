import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../../redux/slices/tasksSlice";
import { useState, useRef } from "react";

function Task({taskData}) {
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const inputRef = useRef(null);

    function handleEdit() {
        const newIsEditMode = !isEditMode;

        setIsEditMode(newIsEditMode);

        if (newIsEditMode) return;

        dispatch(updateTask({
            newTitle: inputRef.current.value,
            id: taskData.id
        }))
    }

    return (
        <div>
            {
                isEditMode ?
                    <input type="text" defaultValue={taskData.title} ref={inputRef}/> :
                    <i>{taskData.title}</i>
            }
            <button onClick={handleEdit}>{isEditMode ? 'Save' : 'Edit'}</button>
            <button onClick={() => dispatch(deleteTask(taskData.id))}>Delete</button>
        </div>
    )
}

export default Task;