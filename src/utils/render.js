/**
 * Renders a list of tasks in the DOM.
 *
 * @param {Array} tasks - An array of task objects.
 * @return {Element} The task list container element.
 */

export default function displayTasks(tasks) {
  const taskListContainerEl = document.querySelector('.task-list-container');
  taskListContainerEl.textContent = '';

  if (!tasks || tasks.length === 0) {
    const noTaskEl = document.createElement('p');
    noTaskEl.textContent = 'No tasks found';
    taskListContainerEl.appendChild(noTaskEl);;
    return    
  }

  const taskListEl = document.createElement('ul');
  
  tasks.forEach(taskItem => {
    const { task, completed } = taskItem;
    const taskContainerEl = document.createElement('li');
    const taskEl = document.createElement('span');
    const completedEl = document.createElement('input');

    taskEl.textContent = task;
    completedEl.type = 'checkbox';
    completedEl.checked = completed;

    taskContainerEl.appendChild(taskEl);
    taskContainerEl.appendChild(completedEl);
    taskListEl.appendChild(taskContainerEl);
  });

  taskListEl.addEventListener('change', (event) => {
    const { target } = event;
    const { checked } = target;

    if (target.type === 'checkbox') {
      const taskEl = target.previousElementSibling;
      taskEl.classList.toggle('completed', checked);
    }
  });

  return taskListContainerEl.appendChild(taskListEl);
}
