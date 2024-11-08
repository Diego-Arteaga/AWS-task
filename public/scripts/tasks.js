// scripts/tasks.js

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "index.html";
}

document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});

const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const tasks = await response.json();
    const tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = "";

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <span>${task.title}</span>
            <div class="task-controls">
                <button onclick="editTask('${task._id}')">Editar</button>
                <button onclick="deleteTask('${task._id}')">Eliminar</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
};

fetchTasks();

document.getElementById("addTaskButton").addEventListener("click", async () => {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
    });

    fetchTasks();
});

const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
};

const editTask = (id) => {
    // Similar function for editing tasks
};
