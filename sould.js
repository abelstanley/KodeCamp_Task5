
// ///function declaration
// // function greeting() {
// //     console.log('Good morning class')
// // }

// ///function expression

// const greet = function() {
//     console.log('Good afternoon, Allen')
// }


// function greeting(name) {
//     console.log(`Good morning everyone, my name is ${name}`)
// }

// // const calcAge = (name, yearOfBirth) => {
// //     console.log(`Good morning everyone, my name is ${name} and i am ${2025 - yearOfBirth} years old`)
// // }


// // calcAge('Allen', 1998)
// // calcAge('comfort', 2002)
// // calcAge('Akin', 2000)
// // calcAge('Godfrey', 2001)

// // const calcAge = function (birthYear) {
// //     return 2025 - birthYear
// // }


// // const yearsUntilRetirement = function(birthYear, firstName)   {
// //     const age = calcAge(birthYear)
// //     const retirement = 65 - age


// //     if(retirement > 0) {
// //         console.log(`${firstName} retires in ${retirement}`)
// //     } else {
// //         console.log(`${firstName} has already retired`)
// //     }
// // }


// // console.log(yearsUntilRetirement(1998, 'Allen'))

// /////Array
// const friend1 = 'James'
// const friend2 = 'Margret'
// const friend3 = 'comfort'

// console.log(friend1, friend2, friend3)


// // console.log(friends[2])


// ////Basic Array methods
// const friends = ['James', 'Margret', 'Comfort', 'Hammed']
//  friends.push('Daniel') ///Add to the end
// // const newFriends = friends.unshift('Daniel') /// Add to the beginning

////DOM ELEMENTS SELECTION
const taskInput = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const taskList = document.getElementById('task-list')
const emptyState = document.getElementById('empty-state')
const totalTaskElement = document.getElementById('total-tasks')
const completedTask = document.getElementById('completed-tasks')
const pendingTask = document.getElementById('pending-tasks')
const filterButtons = document.querySelectorAll('.filter-btn')


////TASK DATA  STORAGE
let tasks = []
let taskIdCounter = 1
let currentFilter = 'all'


///CLICK EVENT ON BUTTON

// addBtn.addEventListener('click', addTask());
taskInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        addTask()
    }
})


////iNPUT VALIDATION
taskInput.addEventListener('input', function() {
    const isEmpty = this.value.trim() === "";
    addBtn.disabled = isEmpty;
});


////FILTERING BUTTON AND REMOVING/ADDING ACTIVE STATE
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active')
        currentFilter = this.dataset.filter;
        renderTask()
    })
})



///Adding Task 
const addTask = () => {
    const taskText = taskInput.value.trim();


    if(taskText === '') {
        alert('Please enter task');
        return
    };


    ////create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    }

    ////Updating the Array with new task
    tasks.push()

    ///Clear input
    taskInput.value = "",
    addBtn.disable = true

    ///update ui

    renderTask()
    // updateTask()

}


const toggleTask = (taskId) => {
    const task = tasks.find(task => task.id === taskId)

    if(task) {
        task.completed = !taskCompleted;
        renderTask()
        // updateTask()
    }
}


const deleteTask =(taskId) => {
    if(confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id);

        renderTask()
        // updateTask()
    }
} 


const renderTask = () => {
    taskList.innerHTML = '';

    let filteredTask = tasks;

    if(currentFilter === 'completed') {
        filteredTask = tasks.filter(task => task.completed)
    } else if (currentFilter === 'pending') {
        filteredTask = tasks.filter(t => !t.completed)
    }


    if(filteredTask.length === 0) {

        emptyState.style.display = 'block'
        return
    } else {
        emptyState.style.display = 'none'
    }
}



const createTask = (task) => {
    const li = document.createElement('li')

    li.className = `task-item ${task.completed ? 'completed' : ''}`

    li.setAttribute('data-data-id', task.id);


    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox" ${task.completed ? checked : "" }
                onChange="toggleTask${task.completed ? 'completed' : ""}">

            <span class="task-text${task.completed ? 'completed' : ""}">${task.text}</span>
            <button class="btn delete-btn" onClick="delete(${task.id})">
                Delete
            </button>
        
        
        </div>
    
    `;

    return li
}


const init = () => {
    addBtn.disabled = true;
    renderTask()
    // updateTask()
}

init()





