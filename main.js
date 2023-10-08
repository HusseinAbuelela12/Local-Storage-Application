let myBtn = document.querySelector(".add");
let input = document.querySelector(".input");
let contentAdd = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayTasks = [];


//check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger  get data from local storage
getData();
    
myBtn.onclick = function () {
    
    // check if input have info inside or not
    let valueInput = input["value"];

    let valueVale = false;
    if (valueInput !== "") {
        valueVale = true;
        addTaskToArray(valueInput);
        input["value"] = ""
    } 
    if (valueVale === false){
        return;
    }
};

//  click on task element delete
contentAdd.addEventListener("click", (e) => {
    if(e.target.classList.contains("dll")) {
        //remove task from local storage
        deleteTask (e.target.parentElement.getAttribute("data-id"));
        //remove element from page
        e.target.parentElement.remove();
    }
});




function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    //push task to array of tasks
    arrayTasks.push(task);
    //add tasks to page
    createElement(arrayTasks);
    //add tasks to local storage
    addToLocalStorage(arrayTasks);
};


// add task data
function createElement (arrayTasks) {
    // empty the tasks div
    contentAdd.innerHTML = "";
    // looping on array of tasks
    arrayTasks.forEach ((task) => {

        //create min div
        let minDiv = document.createElement("div");
        minDiv.setAttribute("class" , "delete")
        minDiv.setAttribute("data-id" , task["id"]);
        minDiv.appendChild(document.createTextNode(task.title));
        // minDiv.style.cssText = "width:400px; background-color:red;"
        // check if task is done
        // if (task.completed) {
        //     inputText.classList = "done";
        // }
        minDiv.style.cssText ="margin-bottom: 20px;font-size: 18px;width: 450px;height: 47px;border: 1px solid rgb(223, 222, 222);border-radius: 4px;padding: 0px 10px;background-color: #fff;display: flex;justify-content: space-between;align-items: center;";
        
        //create bottom delete
        let deleteDiv = document.createElement("span");
        deleteDiv.setAttribute("class","btn dll");
        deleteDiv.appendChild(document.createTextNode("delete"));
        // append bottom delete
        minDiv.appendChild(deleteDiv);
        
        // append min div
        contentAdd.appendChild(minDiv);
        
    })
    
};



// set data in local storage
function addToLocalStorage(arrayTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrayTasks));
};


// get data from local storage
function getData () {
    let data =window.localStorage.getItem("tasks");
    if (data) {
        let task = JSON.parse(data);
        createElement(task);
    }
};


function deleteTask(id) {
    arrayTasks = arrayTasks.filter((task) => task.id != id);

    addToLocalStorage(arrayTasks);
};