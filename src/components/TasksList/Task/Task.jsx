import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTask, updateTask } from "../../../redux/slices/tasksSlice";
import { useState, useRef, useEffect } from "react";
// { taskData }
function Task() {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  //достаю  первую таску  но надо доставать выбранную fetchTask дает ошибку
   const tasks = useSelector((state) => state.tasksReducer);

   const taskData = tasks.find(task => task.id === '9088f6b5-031b-48dc-92e3-87d562498e7a');

   console.log('AAAAAAAAAAAAAAAAAAA',taskData);

  // useEffect(() => {
  //   dispatch(fetchTask(taskData.id));
  // }, [dispatch, taskData.id]);

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
