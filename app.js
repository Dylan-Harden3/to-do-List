// Get the three elements we need
var addForm = document.getElementById('addTask');
var taskList = document.getElementById('list');
var searchBar = document.getElementById('searchbar');

// add eventlisteners 
addForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
searchBar.addEventListener('keyup', searchTasks);

// add a task
function addTask(e){
  e.preventDefault();
  // get the text that was entered
  var newTask = document.getElementById('add-task').value;
  // if nothing was entered we ignore the submission
  if(newTask.length < 1) return;
  // add an li to our list by editing the innerHTML
  taskList.innerHTML += '<li class="list-group-item text-dark bg-aqua">' + newTask + '<button class="btn bg-red btn-sm float-right text-light delete">X</button></li>';
  newTask.value = '';
  // save the innerHTML in the local storage
  localStorage.setItem('tasks',taskList.innerHTML);
}

// remove a task
function removeTask(e){
      // get the li from which the delete button was clicked
      var li = e.target.parentElement;
      // remove the specific li form the list
      taskList.removeChild(li);
      // update the local storage
      localStorage.setItem('tasks',taskList.innerHTML);

}

// search tasks
function searchTasks(e){
  // get the text which was entered
  var searchText = e.target.value.toLowerCase();
  // get all the list items
  var tasks = taskList.getElementsByTagName('li');
  //convert collection to Array so we can run forEach
  Array.from(tasks).forEach(function(task){
    // get the text of the current li
    var name = task.firstChild.textContent;
    // check if the text which was entered matches the text of the current li, if not we set the display to none
    if(name.toLowerCase().indexOf(searchText) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

window.onload = function() {
  // update the task list from the local storage
  var tasks = localStorage.getItem('tasks');
  if(tasks.length > 1){
    taskList.innerHTML = tasks;
    console.log(tasks);
  }
}