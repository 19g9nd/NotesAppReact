import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/slices/tasksSlice";

function EditTask() {
  const { task } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData);

    // Dispatch the updateTask action with the task ID and updates
    await dispatch(updateTask({ id: task.id, ...updates }));

    // Redirect to the task details page
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Form method="post" id="task-form" onSubmit={handleSubmit}>
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Task title"
          type="text"
          name="title"
          defaultValue={task.title}
        />
        <input
          placeholder="Description"
          aria-label="Task description"
          type="text"
          name="description"
          defaultValue={task.description}
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}

export default EditTask;









// import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { updateTask } from "../redux/slices/tasksSlice";

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);

//     await updateTask(params.taskId, updates);

//     return redirect(`/tasks/${params.taskId}`);
// }

// function EditTask() {
//     const { task } = useLoaderData();
//     console.log(task);
//     const navigate = useNavigate();

//     return (
//         <Form method="post" id="task-form">
//             <p>
//                 <span>Title</span>
//                 <input
//                     placeholder="Title"
//                     aria-label="Task title"
//                     type="text"
//                     name="title"
//                     defaultValue={task.title}
//                 />
//                 <input
//                     placeholder="Description"
//                     aria-label="Task description"
//                     type="text"
//                     name="description"
//                     defaultValue={task.description}
//                 />
//             </p>
//             <p>
//                 <button onClick={updateTask()}>Save</button>
//                 <button
//                     type="button"
//                     onClick={() => {
//                         navigate(-1);
//                     }}
//                 >Cancel</button>
//             </p>
//         </Form>
//     );
// }

// export default EditTask;