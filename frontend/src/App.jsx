import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWYzY2JjZTQ3MjVkYTRlNjJiOWQ4NSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc4MTEwNTEzMiwiZXhwIjoxNzgxMTkxNTMyfQ.jefBLzPf1v5tiPMjxorunD9jdDZllW-lN63kojuUMk4";

const createProject = async () => {
  try {

    const res = await axios.post(
      "team-task-manager-production-ae22.up.railway.app",
      {
        name: projectName,
        description: projectDescription,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert("Project Created Successfully");
    getProjects();
    console.log(res.data);
  } catch (error) {
    alert(
    error.response?.data?.message ||
    error.message ||
    "Error creating project"
  );
  }
};
const createTask = async () => {
  try {
    
    console.log("Due Date Selected:", dueDate);
    console.log({
  title: taskTitle,
  description: taskDescription,
  assignedTo,
  dueDate,
});
    const res = await axios.post(
      "team-task-manager-production-ae22.up.railway.app",
      {
        title: taskTitle,
        description: taskDescription,
        assignedTo,
        dueDate,
        

      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert("Task Created Successfully");
    getTasks();
    console.log(res.data);
  } catch (error) {
    alert(
      error.response?.data?.message ||
      error.message ||
      "Error creating task"
    );
  }
};
const getTasks = async () => {
  try {
    
    const res = await axios.get(
      "team-task-manager-production-ae22.up.railway.app",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTasks(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getProjects = async () => {
  try {
    const res = await axios.get(
      "team-task-manager-production-ae22.up.railway.app",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setProjects(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async () => {
  try {
    const res = await axios.get(
      "team-task-manager-production-ae22.up.railway.app",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setUsers(res.data);
  } catch (error) {
    console.log(error);
  }
};
const updateTaskStatus = async (id) => {
  console.log("Button clicked", id);
  try {
    await axios.put(
      `team-task-manager-production-ae22.up.railway.app/api/tasks/${id}`,
      {
        status: "Completed",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    getTasks();
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
};

useEffect(() => {
  getTasks();
  getProjects();
  getUsers();
}, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "30px",
          color: "#38bdf8",
        }}
      >
        Team Task Manager
      </h1>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h2>{projects.length}</h2>
          <p>Total Projects</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            width: "220px",
            textAlign: "center",
          }}
        >
        <h2>{tasks.length}</h2>
        <p>Total Tasks</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            width: "220px",
            textAlign: "center",
          }}
        >
          <h2>
{
  tasks.filter(
    (task) => task.status === "Completed"
  ).length
}
</h2>
<p>Completed Tasks</p>
        </div>
      <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    width: "220px",
    textAlign: "center",
  }}
>
  <h2>
    {
      tasks.filter(
        task =>
          task.status !== "Completed" &&
          task.dueDate &&
          new Date(task.dueDate) < new Date()
      ).length
    }
  </h2>
  <p>Overdue Tasks</p>
  </div>

</div> 


      {/* Forms */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            width: "400px",
          }}
        >
          <h2>Create Project</h2>

          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            style={{
              width: "95%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <input
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Description"
            style={{
              width: "95%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={createProject}
            style={{
              width: "100%",
              padding: "12px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Project
          </button>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            width: "400px",
          }}
        >
          <h2>Create Task</h2>

          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
            style={{
              width: "95%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <input
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
            style={{
              width: "95%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <select
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
  style={{
    width: "95%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
  }}
>
  <option value="">Select User</option>

  {users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.name}
    </option>
  ))}
</select>
<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  style={{
    width: "95%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "none",
  }}
/>
          <button
            onClick={createTask}
            style={{
              width: "100%",
              padding: "12px",
              background: "#22c55e",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Task
          </button>
        </div>
      </div>

      {/* Tasks Section */}
      <div
        style={{
          marginTop: "40px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Projects</h2>

{projects.map((project) => (
  <div
    key={project._id}
    style={{
      background: "#334155",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "15px",
    }}
  >
    <h3>{project.name}</h3>

    <p>{project.description}</p>
  </div>
))}
        <h2 style={{ marginBottom: "20px" }}>Tasks</h2>
        {tasks.map((task) => (
  <div
    key={task._id}
    style={{
      background: "#334155",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "15px",
    }}
  >
    <h3
      style={{
        marginBottom: "10px",
        fontSize: "22px",
      }}
    >
      {task.title}
    </h3>

    <p
      style={{
        marginBottom: "15px",
        color: "#cbd5e1",
        lineHeight: "1.6",
      }}
    >
      {task.description}
    </p>
    <p>
  Assigned To: {task.assignedTo?.name || "Not Assigned"}
</p>
<p>
  Due Date: {
    task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "No Due Date"
  }
</p>

    <button
  onClick={() => updateTaskStatus(task._id)}
  style={{
    background:
      task.status === "Completed"
        ? "#22c55e"
        : "#f59e0b",
    padding: "6px 14px",
    borderRadius: "20px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {task.status}
</button>
  </div>
))}

        <div
          style={{
            background: "#334155",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          
        </div>
      </div>
    </div>
  );
}

export default App;