import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateTask } from "../tasks";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    await updateTask(params.taskId, updates);

    return redirect(`/tasks/${params.taskId}`);
}

function EditTask() {
    const { task } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="task-form">
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
                >Cancel</button>
            </p>
        </Form>
    );
}

export default EditTask;