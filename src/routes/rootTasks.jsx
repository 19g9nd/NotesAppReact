import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TasksList from "../components/TasksList/TasksList";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { getTasks } from "../tasks";
import { addTask, fetchTasksFromLocalStorage } from "../redux/slices/tasksSlice";
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const tasks = await getTasks(q);

  return { tasks, q };
}

export async function action() {
  const task = await addTask();
  return redirect(`/tasks/${task.id}/edit`);
}

function Root() {
  // const { tasks, q } = useLoaderData();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleNewButtonClick = () => {
    setShowAddTaskForm(true);
  };

  useEffect(() => {
    dispatch(fetchTasksFromLocalStorage());
  }, [dispatch]);


  return (
    <>
      <div id="sidebar">
        <h1>React tasks</h1>
        <div>
          {/* <Form id="search-form" role="search">
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
          </Form> */}

            <button onClick={handleNewButtonClick}>New</button>
          {/* <Form method="post">
            {<button type="submit">New</button> }
          </Form> чтобы не происходил автоматический вызов edit и таска не добавлялась в локалсторадж */ } 
        </div>
        <div className="filter_by">
          <button>All</button>
          <button>In progress</button>
          <button>Done</button>
        </div>

        <TasksList />
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {showAddTaskForm && <AddTaskForm />}
        <Outlet />
      </div>
    </>
  );
}

export default Root;
