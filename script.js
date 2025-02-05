const addTaskBtn = document.querySelector(".addTaskBtn");
const inputTask = document.querySelector(".inputTask");
const theTable = document.querySelector(".tableBody");
const dueDate = document.querySelector(".dueDate");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const editTaskBox = document.querySelector(".editBox");

// Load tasks from localStorage
tasks.forEach(task => {
    if (task.status !== "completed") {
        
        const tr = document.createElement('tr');
        const tdTask = document.createElement("td");
        const edit = document.createElement('p');
        const done = document.createElement('p');
        const taskPara = document.createElement('p');
        const dueDatePara = document.createElement('p');

        taskPara.style.display = "inline-block";
        taskPara.style.width = "64%";
        dueDatePara.style.display = "inline";
        dueDatePara.style.paddingRight ="105px";
        done.style.color = "#fa6240";

        taskPara.innerText = task.text;
        dueDatePara.innerText = "Due Date: "+task.due;
        edit.innerText = "EDIT";
        done.innerText = "DONE";
        tdTask.appendChild(taskPara);
        tdTask.appendChild(dueDatePara);
        tdTask.appendChild(edit);
        tdTask.appendChild(done);
        tr.appendChild(tdTask);
        theTable.appendChild(tr);
        
        edit.addEventListener("click", () => {
            const index = tasks.findIndex(task => task.text === taskPara.innerText);
            if (index !== -1) {
                let theTitle = document.querySelector(".theTask");
                theTitle.innerText = taskPara.innerText;
                let editBox = document.querySelector(".editBox");
                editBox.style.visibility = "visible";
        
                // Fix: Replace existing button to remove old event listeners
                let doneBtn = document.querySelector(".changeDoneBtn");
                doneBtn.replaceWith(doneBtn.cloneNode(true));
                doneBtn = document.querySelector(".changeDoneBtn");
        
                doneBtn.addEventListener("click", () => {
                    let inputBox = document.querySelector(".editedTaskName");
                    let inputDueBox = document.querySelector(".editedDueDate");
                    let newTask = inputBox.value.trim();
                    let newDueDate = inputDueBox.value.trim();
        
                    if (newTask !== "") {
                        tasks[index].text = newTask;
                        taskPara.innerText = newTask;
                    }
                    if (newDueDate !== "") {
                        tasks[index].due = newDueDate;
                        dueDatePara.innerText = "Due Date: " + newDueDate;
                    }
        
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    editBox.style.visibility = "hidden";
                    inputBox.value = "";
                    inputDueBox.value = "";
                });
            }
        });        

        done.addEventListener('click', () => {
            const index = tasks.findIndex(task => task.text === taskPara.innerText);
            if (index !== -1) {
                tasks[index].status = "completed";
                tasks = tasks.filter(t=>t.status!=='completed');
                localStorage.setItem("tasks", JSON.stringify(tasks));
                tdTask.removeChild(edit);
                done.style.color = "greenyellow";
                done.innerText = "Task Completed";
            }
        });
    }
    else{
        localStorage.removeItem(task);
    }
});

// Add new task
addTaskBtn.addEventListener('click', () => {
    const task = inputTask.value;
    const dueDateVal = dueDate.value;
    inputTask.value = "";
    dueDate.value = "";
    if (task == "") {
        return;
    }
    const tr = document.createElement('tr');
    const tdTask = document.createElement("td");
    const edit = document.createElement('p');
    const done = document.createElement('p');
    const taskPara = document.createElement('p');
    const dueDatePara = document.createElement('p');

    taskPara.style.display = "inline-block";
    taskPara.style.width = "64%";
    dueDatePara.style.display = "inline";
    dueDatePara.style.paddingRight ="105px";
    done.style.color = "#fa6240";

    taskPara.innerText = task;
    dueDatePara.innerText = "Due Date: "+dueDateVal;
    edit.innerText = "EDIT";
    done.innerText = "DONE";
    tdTask.appendChild(taskPara);
    tdTask.appendChild(dueDatePara);
    tdTask.appendChild(edit);
    tdTask.appendChild(done);
    tr.appendChild(tdTask);
    theTable.appendChild(tr);

    edit.addEventListener("click", () => {
        const index = tasks.findIndex(task => task.text === taskPara.innerText);
        if (index !== -1) {
            let theTitle = document.querySelector(".theTask");
            theTitle.innerText = taskPara.innerText;
            let editBox = document.querySelector(".editBox");
            editBox.style.visibility = "visible";
    
            // Fix: Replace existing button to remove old event listeners
            let doneBtn = document.querySelector(".changeDoneBtn");
            doneBtn.replaceWith(doneBtn.cloneNode(true));
            doneBtn = document.querySelector(".changeDoneBtn");
    
            doneBtn.addEventListener("click", () => {
                let inputBox = document.querySelector(".editedTaskName");
                let inputDueBox = document.querySelector(".editedDueDate");
                let newTask = inputBox.value.trim();
                let newDueDate = inputDueBox.value.trim();
    
                if (newTask !== "") {
                    tasks[index].text = newTask;
                    taskPara.innerText = newTask;
                }
                if (newDueDate !== "") {
                    tasks[index].due = newDueDate;
                    dueDatePara.innerText = "Due Date: " + newDueDate;
                }
    
                localStorage.setItem("tasks", JSON.stringify(tasks));
                editBox.style.visibility = "hidden";
                inputBox.value = "";
                inputDueBox.value = "";
            });
        }
    });
    

    done.addEventListener('click', () => {
        const index = tasks.findIndex(task => task.text === taskPara.innerText);
        if (index !== -1) {
            tasks[index].status = "completed";
            tasks = tasks.filter(t=>t.status!=='completed');
            localStorage.setItem("tasks", JSON.stringify(tasks));

            tdTask.removeChild(edit);
            done.style.color = "greenyellow";
            done.innerText = "Task Completed";
        }
    });

    tasks.push({ text: task, due:dueDateVal,status: "pending" });
    localStorage.setItem("tasks", JSON.stringify(tasks));
});