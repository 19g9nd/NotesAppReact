import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/rootTasks";
import ErrorPage from "./error-page";
import Task, {
  loader as taskLoader,
  action as TaskAction,
} from "./routes/task";
import EditTask, { action as editTaskAction } from "./routes/editTasks";
import { action as destroyTaskAction } from "./routes/destroy";
import Index from "./routes";
import { Provider } from "react-redux";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import TasksList from "./components/TasksList/TasksList";

const container = document.getElementById("root");

if (container === null) throw new Error("You don't have root element");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "tasks/:taskId",
            element: <Task />,
            loader: taskLoader,
            action: TaskAction,
          },
          {
            path: "tasks/:taskId/edit",
            element: <EditTask />,
            loader: taskLoader,
            action: editTaskAction,
          },
          {
            path: "tasks/:taskId/destroy",
            action: destroyTaskAction,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <AddTaskForm />
		
	</Provider>
  </React.StrictMode>
);
