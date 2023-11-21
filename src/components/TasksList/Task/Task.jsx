import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../../../redux/slices/tasksSlice";
import { useState, useRef } from "react";
// { taskData }
function Task({ taskId }) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

   const tasks = useSelector((state) => state.tasksReducer);
//нажно досать айди нужной задачи
   const taskData = tasks.find(task => task.id === taskId);

   console.log('AAAAAAAAAAAAAAAAAAA',taskData);

  function handleEdit() {
    const newIsEditMode = !isEditMode;

    setIsEditMode(newIsEditMode);

    if (newIsEditMode) return;

    dispatch(updateTask({
      newTitle: titleInputRef.current.value,
      newDescription: descriptionInputRef.current.value,
      id: taskData.id
    }));
  }

  return (
    <div>
      {isEditMode ? (
        <>
          <input type="text" defaultValue={taskData.title} ref={titleInputRef} />
          <input type="text" defaultValue={taskData.description} ref={descriptionInputRef} />
        </>
      ) : (
        <>
          <i>{taskData.title}</i>
          <div></div>
          <i>{taskData.description}</i>
        </>
      )}
      <button onClick={handleEdit}>{isEditMode ? 'Save' : 'Edit'}</button>
      <button onClick={() => dispatch(deleteTask(taskData.id))}>Delete</button>
    </div>
  );
}

export default Task;
