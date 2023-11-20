import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { updateTask } from "../../redux/slices/tasksSlice";

// Function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  const localStorageTasks = localStorage.getItem('tasks');
  return localStorageTasks ? JSON.parse(localStorageTasks) : [];
};

function TasksList() {
  // Load tasks from localStorage initially
  const initialTasks = loadTasksFromLocalStorage();
  const tasks = useSelector((state) => state.tasksReducer) || initialTasks;

  
  // Function to dispatch an action to update tasks in Redux state from localStorage
  const dispatch = useDispatch();
  const updateTaskFromLocalStorage = () => {
    const localStorageTasks = loadTasksFromLocalStorage();
    dispatch(updateTask(localStorageTasks));
  };

  return (
    <nav>
      {tasks.length ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <NavLink
                to={`/tasks/${task.id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {task.title || task.description ? (
                  <>{task.title}</>
                ) : (
                  <i>No Title</i>
                )}{" "}
                {task.checked && <span>✅</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No tasks</i>
        </p>
      )}
    </nav>
  );
}

export default TasksList;
