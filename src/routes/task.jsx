import { Form, useLoaderData } from "react-router-dom";
import { getTask } from "../tasks";

export async function loader({ params }) {
    const task = await getTask(params.taskId);
    return { task };
}

function Task() {
    const { task } = useLoaderData();
  
    return (
      <div id="task">
        <div>
          <h1>
            {task.title || task.description ? (
              <>
                {task.title}
              </>
            ) : (
              <i>No Title</i>
            )}
            <Checked task={task} />
          </h1>
          <h2>
            <span className="task-description">{task.description}</span>
          </h2>
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !window.confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  function Checked({ task }) {
    let checked = task.checked;
  
    return (
      <Form method="post">
        <button
          name="checked"
          value={checked ? "false" : "true"}
          aria-label={checked ? "Remove from checked" : "Add to checked"}
          className="checkbox-button"
        >
          {checked ? "✅" : "🔲"}
        </button>
      </Form>
    );
  }


export default Task;