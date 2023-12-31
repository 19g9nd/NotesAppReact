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
import { useState } from "react";
export async function loader({ request }) {
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
  const [currentFilter, setCurrentFilter] = useState("All");
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>React tasks</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search tasks"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <div className="filter_by">
          <div className="filter_by">
            <button onClick={() => setCurrentFilter("All")}>All</button>
            <button onClick={() => setCurrentFilter("In progress")}>
              In progress
            </button>
            <button onClick={() => setCurrentFilter("Done")}>Done</button>
          </div>
        </div>
        <nav>
          {tasks.length ? (
            <ul>
              {tasks
                .filter((task) => {
                  if (currentFilter === "All") {
                    return true;
                  } else if (currentFilter === "In progress") {
                    return !task.checked;
                  } else {
                    return task.checked;
                  }
                })
                .map((task) => (
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
