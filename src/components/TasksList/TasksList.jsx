import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function TasksList() {
  const tasks = useSelector((state) => state.tasksReducer);

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
