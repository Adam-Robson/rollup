import { store, checkError } from './store';

// Cache for the tasks list.
let taskListCache = null;

/**
 * Fetches tasks from the 'tasks-table' in the database.
 *
 * @param {boolean} useCache - Indicates whether to use the cached task list.
 * @return {Promise} A promise that resolves with the fetched task data.
 */
export async function fetchTasks(useCache = true) {
  if (useCache && taskListCache) {
    return taskListCache;
  }

  const { data: tasks, error } = await store
    .from('tasks-table')
    .select('*');
  
   const data = checkError({ data: tasks, error});
   taskListCache = data;
   return data;
}

/**
 * Adds a task to the 'tasks-table' in the database.
 *
 * @param {Object} task - The task object to be added.
 * @return {Promise<void>} - A promise that resolves when the task is added.
 */
export async function addTask(task) {
  const { data, error } = await store
    .from('tasks-table')
    .insert([{ task, completed: false }])
    .select();

    if (error) {
      console.error(
        `There was an error while calling the database: ${error.message}`);
      return null;
    }

    taskListCache = null;
    return data;
}

/**
 * Updates a task in the 'tasks-table' in the database.
 *
 * @param {Object} task - The task object to be updated.
 * @return {Promise} A promise that resolves with the updated task data.
 */
export async function updateTask(newTask) {
  const { id, task, completed } = newTask;

  const { data, error } = await store
    .from('tasks-table')
    .update({ task, completed })
    .eq({ id })
    .select();

    if (error) {
      console.error(
        `There was an error while calling the database: ${error.message}`);
      return null;
    }

    taskListCache = null;
    return checkError(data);
}

/**
 * Deletes a task from the 'tasks-table' in the database.
 *
 * @param {number} taskId - The ID of the task to be deleted.
 * @return {Promise} A promise that resolves with the deleted task data.
 */
export async function deleteTask(taskId) {
  const { data, error } = await store
    .from('tasks-table')
    .delete()
    .match({ id: taskId });
    
    if (error) {
      console.error(
        `There was an error while calling the database: ${error.message}`);
      return null;
    }

    taskListCache = null;
    return checkError(data);
}
