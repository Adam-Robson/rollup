import { fetchTasks } from './fetch.js';
import displayTasks from './render.js';

export async function getTaskList(useCache = true) {
  try {
      let taskListResponse = await fetchTasks(useCache);
      if (!taskListResponse) {
          throw new Error('Failed to fetch tasks');
      }
      let tasks = await taskListResponse.json();
      return tasks;

  } catch (error) {
      console.error(error);
  }
}

export async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const addTaskInput = formData.get('add-task-input');
  const addTaskCompleted = formData.get('add-task-completed');

  if (!addTaskInput || !addTaskCompleted) {
    console.error('Please submit both the task and completed fields');
    return;
  }

  try {
    const newTask = {
      task: addTaskInput,
      completed: addTaskCompleted
    };
    
    await addTask(newTask);
    const updatedTaskList = await getTaskList();
    
    if (!updatedTaskList) {
      throw new Error('Failed to get task list');
    } else {
      return displayTasks(updatedTaskList.json());
    }
  } catch (error) {
    console.error(
      `There was an error submitting the form: ${error}`
    );
  }
}
