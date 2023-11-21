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

// import EditTask, { action as editTaskAction } from "./routes/editTasks";
import { action as destroyTaskAction } from "./routes/destroy";
import Index from "./routes";
import { Provider } from "react-redux";
import EditTask from "./routes/editTasks";
import Task from "./components/TasksList/Task/Task";
// import Task from "./components/TasksList/Task/Task";

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
             loader: rootLoader,
          },
          {
            path: "tasks/:taskId/edit",
             element: <EditTask />,
            // action: editTaskAction,
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
		
	</Provider>
  </React.StrictMode>
);
