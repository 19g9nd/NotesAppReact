import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getTasks, createTask } from "../tasks";
import { useEffect } from "react";

export async function loader({ request }) {
  console.log("asdasdasdas");

  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const tasks = await getTasks(q);

  return { tasks, q };
}

export async function action() {
  const task = await createTask();
  return redirect(`/tasks/${task.id}/edit`);
}

function Root() {
  const { tasks, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  useEffect(() => {
    // You can perform additional actions when the component mounts.
  }, []);

  return (
    <>
      <div id="sidebar">
        <h1>React tasks</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search tasks"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.form);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {tasks.length ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <NavLink
                    to={`/tasks/${task.id}`} // Add `/` before `tasks/${task.id}`
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {task.title || task.description ? (
                      <>
                        {task.title}
                      </>
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
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
