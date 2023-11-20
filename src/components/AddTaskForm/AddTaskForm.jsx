import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";

function AddTaskForm() {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        dispatch(addTask({
            title: formData.get('title'),
            id: crypto.randomUUID()
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title"/>
            <button type="submit">Add task</button>
        </form>
    )
}

export default AddTaskForm;