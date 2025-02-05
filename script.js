const addTaskBtn = document.querySelector(".addTaskBtn");
const inputTask = document.querySelector(".inputTask");
const theTable = document.querySelector(".tableBody");
const dueDate = document.querySelector(".dueDate");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const editTaskBox = document.querySelector(".editBox");
document.addEventListener("DOMContentLoaded", function () {
    let dateInput = document.querySelector(".dueDate");
    let dateInput2 = document.querySelector(".editedDueDate")
    let today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
    dateInput2.setAttribute("min", today);
});


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
        dueDatePara.style.width ="20%";
        done.style.color = "#fa6240";

        taskPara.innerText = task.text;
        if(task.due!==""){
            dueDatePara.innerText = "Due Date: "+task.due;
        }
        else{
            dueDatePara.innerText = "No Due Date";
        }
        edit.innerText = "EDIT";
        done.innerText = "DONE";
        tdTask.appendChild(taskPara);
        tdTask.appendChild(dueDatePara);
        tdTask.appendChild(edit);
        tdTask.appendChild(done);
        tr.appendChild(tdTask);
        theTable.appendChild(tr);
        
        edit.addEventListener("click", (event) => {
            const index = tasks.findIndex(task => task.text === taskPara.innerText);
            if (index !== -1) {
                let theTitle = document.querySelector(".theTask");
                theTitle.innerText = taskPara.innerText;
                let editBox = document.querySelector(".editBox");
                
                let rect = event.target.closest("tr").getBoundingClientRect();
                let boxWidth = editBox.offsetWidth;
                editBox.style.position = "absolute";
                editBox.style.top = `${rect.top + window.scrollY - editBox.offsetHeight+50}px`;
                let leftPosition = rect.left + window.scrollX + (rect.width / 2) - (boxWidth / 2);
                editBox.style.left = `${leftPosition}px`;
                editBox.style.visibility = "visible";
        
                let doneBtn = document.querySelector(".changeDoneBtn");
                doneBtn.replaceWith(doneBtn.cloneNode(true)); // Remove old event listeners
                doneBtn = document.querySelector(".changeDoneBtn");
                document.querySelector(".editedDueDate").addEventListener("click", function() {
                    this.showPicker();
                });
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
                    } else {
                        dueDatePara.innerText = "No Due Date";
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
                done.style.color = "rgb(31, 161, 51)";
                done.innerText = "Task Completed";
            }
        });
    }
});

dueDate.addEventListener("click", function() {
    this.showPicker();
});

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
    dueDatePara.style.width ="20%";
    done.style.color = "#fa6240";

    taskPara.innerText = task;
    if(dueDateVal!==""){
        dueDatePara.innerText = "Due Date: "+dueDateVal;
    }
    else{
        dueDatePara.innerText = "No Due Date";
    }
    edit.innerText = "EDIT";
    done.innerText = "DONE";
    tdTask.appendChild(taskPara);
    tdTask.appendChild(dueDatePara);
    tdTask.appendChild(edit);
    tdTask.appendChild(done);
    tr.appendChild(tdTask);
    theTable.appendChild(tr);

    edit.addEventListener("click", (event) => {
        const index = tasks.findIndex(task => task.text === taskPara.innerText);
        if (index !== -1) {
            let theTitle = document.querySelector(".theTask");
            theTitle.innerText = taskPara.innerText;
            let editBox = document.querySelector(".editBox");
            
            // Get the clicked task's position
            let rect = event.target.closest("tr").getBoundingClientRect();
            let boxWidth = editBox.offsetWidth;
            editBox.style.position = "absolute";
            editBox.style.top = `${rect.top + window.scrollY - editBox.offsetHeight+50}px`;

            let leftPosition = rect.left + window.scrollX + (rect.width / 2) - (boxWidth / 2);
            editBox.style.left = `${leftPosition}px`;
            editBox.style.visibility = "visible";
    
            let doneBtn = document.querySelector(".changeDoneBtn");
            doneBtn.replaceWith(doneBtn.cloneNode(true)); // Remove old event listeners
            doneBtn = document.querySelector(".changeDoneBtn");
            document.querySelector(".editedDueDate").addEventListener("click", function() {
                this.showPicker();
            });
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
                } else {
                    dueDatePara.innerText = "No Due Date";
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
            done.style.color = "rgb(31, 161, 51)";
            done.innerText = "Task Completed";
        }
    });

    tasks.push({ text: task, due:dueDateVal,status: "pending" });
    localStorage.setItem("tasks", JSON.stringify(tasks));
});