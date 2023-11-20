import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTasks(query) {
  await fakeNetwork(`getTasks:${query}`);
  try {
    let tasks = await JSON.parse(localStorage.getItem("tasks")) || [];
    if (query) {
      tasks = matchSorter(tasks, query, { keys: ["title", "description"] });
    }
    return tasks.sort(sortBy("last", "createdAt"));
  } catch (error) {
    console.error("Error parsing tasks:", error);
    return [];
  }  
}


export async function getTask(id) {
  await fakeNetwork(`task:${id}`);
  try {
    let tasks = await JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find((task) => task.id === id);
    return task || null;
  } catch (error) {
    console.error("Error parsing tasks:", error);
    return null;
  }

}

// export async function updateTask(id, updates) {
//   await fakeNetwork();
//   let tasks = await JSON.parse(localStorage.getItem("tasks")) || [];
//   let task = tasks.find(task => task.id === id);
//   if (!task)  throw new Error(`No task found for id: ${id}`);
//   Object.assign(task, updates);
//   await set(tasks);
//   return task;
// }

export async function deleteTask(id) {
  let tasks = await JSON.parse(localStorage.getItem("tasks")) || [];;
  let index = tasks.findIndex(task => task.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
    await set(tasks);
    return true;
  }
  if (index === -1) {
    throw new Error(`No task found for id: ${id}`);
  }
  return false;
}

function set(tasks) {
  return localStorage.setItem("tasks", JSON.stringify(tasks));
}

// fake a cache so wae don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
