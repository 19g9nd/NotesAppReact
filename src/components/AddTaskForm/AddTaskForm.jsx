import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";
import { useState } from "react";

function AddTaskForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
        };
        dispatch(addTask(newTask));
        saveTaskToLocalStorage(newTask);
      //очистка полей после ввода
        setTitle('');
        setDescription('');
    }
    const saveTaskToLocalStorage = (task) => {
        // Retrieve existing tasks from localStorage or initialize an empty array
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task to the array
        existingTasks.push(task);

        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    };
    return (
        <form onSubmit={handleSubmit}>
            <p>
            <span>Title</span>
                <input
                    placeholder="Title"
                    aria-label="Task title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </p>
            <p>
                <input
                    placeholder="Description"
                    aria-label="Task description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </p>
            <p>
                <button type="submit">Add task</button>
            </p>
        </form>
    );
}

export default AddTaskForm;
