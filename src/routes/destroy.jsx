import { redirect } from "react-router-dom";
import { deleteTask } from "../redux/slices/tasksSlice";

export async function action({ params }) {
    await deleteTask(params.id);
    return redirect("/");
}