import { useDispatch, useSelector, useStore } from "react-redux";
import {
  deleteTask,
  fetchTask,
  updateTask,
} from "../../../redux/slices/tasksSlice";
import { useState, useRef } from "react";
import store from "../../../redux/store";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const task = (await store.dispatch(fetchTask(params.taskId))).payload;

  if (!task) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { MyTask: task };
}
function Task() {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const tasks = useSelector((state) => state.tasksReducer);

  const { MyTask } = useLoaderData();
  const taskData = tasks.find((task) => task.id === MyTask.id);
  console.log("AAAAAAAAAAAAAAAAAAA", taskData);

  function handleEdit() {
    const newIsEditMode = !isEditMode;

    setIsEditMode(newIsEditMode);

    if (newIsEditMode) return;

    dispatch(
      updateTask({
        newTitle: titleInputRef.current.value,
        newDescription: descriptionInputRef.current.value,
        id: taskData.id,
      })
    );
  }

  return (
    <div>
      {isEditMode ? (
        <>
          <input
            type="text"
            defaultValue={taskData.title}
            ref={titleInputRef}
          />
          <input
            type="text"
            defaultValue={taskData.description}
            ref={descriptionInputRef}
          />
        </>
      ) : (
        <>
          <i>{taskData.title}</i>
          <div></div>
          <i>{taskData.description}</i>
        </>
      )}
      <button onClick={handleEdit}>{isEditMode ? "Save" : "Edit"}</button>
      <button onClick={() => dispatch(deleteTask(taskData.id))}>Delete</button>
    </div>
  );
}

export default Task;
