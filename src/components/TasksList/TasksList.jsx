import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { fetchTasksFromLocalStorage, updateTask } from "../../redux/slices/tasksSlice";



function TasksList() {
  const tasks = useSelector((state) => state.tasksReducer);

  useEffect(() => {
    // dispatch(updateTaskFromLocalStorage());
  }, []);

  // Function to dispatch an action to update tasks in Redux state from localStorage
  const dispatch = useDispatch();
  const updateTaskFromLocalStorage = () => {
    const localStorageTasks = fetchTasksFromLocalStorage();
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
