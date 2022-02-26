const newTaskForm = document.getElementById('new-task-form')
const taskList = document.getElementById('tasks-list')

let tasks = []

const clearListView = () => {
  const children = [...taskList.children] //Vai pegar a taskList e transformar em um array para q a gnt possa usar o forEach
  children.forEach((child) => {
    taskList.removeChild(child)
  })
}

const updateListView = () => {
  console.log('updateListView', tasks)
  clearListView()

  tasks.forEach((task) => {
    const listItem = document.createElement('li')
    listItem.textContent = task.title

    const buttonDelete = document.createElement('button')
    buttonDelete.innerHTML = 'Delete'
    buttonDelete.onclick = () => {
      handleDeleteClick(task)
    }
    listItem.appendChild(buttonDelete)

    const checkboxIsDone = document.createElement('input')
    checkboxIsDone.setAttribute('type', 'checkbox')
    checkboxIsDone.checked = task.isDone
    checkboxIsDone.onchange = () => {
      // handleCheckboxChange(task)
    }


    listItem.appendChild(checkboxIsDone)
    taskList.appendChild(listItem)
  })

  const listItem = document.createElement('li')

}

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('tasks')
  if (savedData === NULL){
    return
  }

  const parsedData = JSON.parse(savedData)
  tasks = parsedData

  updateListView()
}

const saveToLocalStorage = () => {
  //localStorage.setItem('tasks', tasks) //Se eu só tentar salvar assim, vou ter um problema. O meu tipo de dados vai ficar esquisito, dai vamos usar JSON
  const parsedData = JSON.stringify(tasks)
  localStorage.setItem('tasks', parsedData)
}



const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
    return task != targetTask
  })
  tasks = filtered

  saveToLocalStorage()
  updateListView()
}

const handleCheckboxChange = (targetTask) => {
  targetTask.isDone = !targetTask.isDone;

  saveToLocalStorage();
  updateListView();
}
// const handleCheckboxChange
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm)
  const formEntries = Object.fromEntries(formData)

  const newTask = {
    id: tasks.length,
    title: formEntries.title,
    description: formEntries.description,
    isDone: false
  }
  tasks.push(newTask);
  saveToLocalStorage();
  updateListView();


}
newTaskForm.addEventListener('submit', handleSubmit)
