const addTaskBtn = document.querySelector(".addTaskBtn");
const inputTask = document.querySelector(".inputTask");
const theTable = document.querySelector(".table");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks from localStorage
tasks.forEach(task => {
    if (task.status !== "completed") {
        const tr = document.createElement('tr');
        const tdTask = document.createElement("td");
        const edit = document.createElement('p');
        const done = document.createElement('p');
        const taskPara = document.createElement('p');

        taskPara.style.display = "inline-block";
        taskPara.style.width = "85%";
        done.style.color = "#fa6240";

        taskPara.innerText = task.text;
        edit.innerText = "EDIT";
        done.innerText = "DONE";
        tdTask.appendChild(taskPara);
        tdTask.appendChild(edit);
        tdTask.appendChild(done);
        tr.appendChild(tdTask);
        theTable.appendChild(tr);

        edit.addEventListener("click", () => {
            const index = tasks.findIndex(task => task.text === taskPara.innerText);
            if (index !== -1) {
                const newTask = prompt("Enter the change you would like", tasks[index].text);
                if (newTask) {
                    tasks[index].text = newTask;
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    taskPara.innerText = newTask;
                }
            }
        });

        done.addEventListener('click', () => {
            const index = tasks.findIndex(task => task.text === taskPara.innerText);
            if (index !== -1) {
                tasks[index].status = "completed";
                tasks = tasks.filter(t=>t.status!=='completed');
                localStorage.setItem("tasks", JSON.stringify(tasks));
                tdTask.removeChild(edit);
                done.style.color = "green";
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
    inputTask.value = "";
    if (task == "") {
        return;
    }
    const tr = document.createElement('tr');
    const tdTask = document.createElement("td");
    const edit = document.createElement('p');
    const done = document.createElement('p');
    const taskPara = document.createElement('p');

    taskPara.style.display = "inline-block";
    taskPara.style.width = "85%";
    done.style.color = "#fa6240";

    taskPara.innerText = task;
    edit.innerText = "EDIT";
    done.innerText = "DONE";
    tdTask.appendChild(taskPara);
    tdTask.appendChild(edit);
    tdTask.appendChild(done);
    tr.appendChild(tdTask);
    theTable.appendChild(tr);

    edit.addEventListener("click", () => {
        const index = tasks.findIndex(task => task.text === taskPara.innerText);
        if (index !== -1) {
            const newTask = prompt("Enter the change you would like", tasks[index].text);
            if (newTask) {
                tasks[index].text = newTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                taskPara.innerText = newTask;
            }
        }
    });

    done.addEventListener('click', () => {
        const index = tasks.findIndex(task => task.text === taskPara.innerText);
        if (index !== -1) {
            tasks[index].status = "completed";
            tasks = tasks.filter(t=>t.status!=='completed');
            localStorage.setItem("tasks", JSON.stringify(tasks));

            tdTask.removeChild(edit);
            done.style.color = "green";
            done.innerText = "Task Completed";
        }
    });

    tasks.push({ text: task, status: "pending" });
    localStorage.setItem("tasks", JSON.stringify(tasks));
});