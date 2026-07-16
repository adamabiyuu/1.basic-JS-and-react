
const MyTasksForm = (props) => {
    const { onSubmit, setTaskTitle, taskTitle } = props;
    return (
      <form className="form" id="taskForm" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">
            Mau ngapain hari ini?
          </label>
          <input className="form-input form-input--full" type="text" id="taskTitle" name="taskTitle" placeholder="Masukkan kegiatan" onChange={(event) => setTaskTitle(event.target.value)} value={taskTitle} />
        </div>
        <div className="form-group form-group--button-right">
          <button className="button" type="submit">
            Simpan
          </button>
        </div>
      </form>
    );
}

const MyTasksList = (props) => {
    const { tasks, deleteTask, checkTask } = props;
    return (
      <div className="tasks">
        <h2 className="tasks-title">Agendaku</h2>
        <ul className="tasks-list" id="tasksList">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={task.id} className={`tasks-list-item ${task.checked ? "checked" : ""}`}>
                <div className="task">
                  <div>
                    <input type="checkbox" checked={task.checked} onChange={(event) => checkTask(event, index)} />
                  </div>
                  <div className="task-title">{task.title}</div>
                  <button className="button" onClick={() => deleteTask(index)}>Hapus</button>
                </div>
              </li>
            ))
          ) : (
            <div class="tasks">
              <div className="task-title">Tidak ada kegiatan</div>
            </div>
          )}
        </ul>
      </div>
    );
}

const MyTasksContainer = (props) => {
    return <div className="container">{props.children}</div>
}

const App = () => {
    const [taskTitle, setTaskTitle] = React.useState("");
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
      const storedTaks = localStorage.getItem("tasks");
      if (storedTaks) {
        setTasks(JSON.parse(storedTaks));
      }
    }, []);

    const addTask = (event) => {
        event.preventDefault();
        if(taskTitle.trim() === "") {
            alert("Judul tidak boleh kosong!");
            return;
        }

        const newTask = {
            id: tasks.length + 1,
            title: taskTitle.trim(),
        };

        setTasks([...tasks, newTask]);
        setTaskTitle("");
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    }
    
    const deleteTask = (taskIndex) => {
      const updatedTasks = tasks.filter((_, index) => index !== taskIndex)
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const checkTask = (event, taskIndex) => {
      const isChecked = event.target.checked;
      const updatedTasks = tasks.map((task, index) => {
        if (taskIndex === index) {
          return {
            ...task,
            checked: isChecked,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    
    return (
        <MyTasksContainer>
            <MyTasksForm onSubmit={addTask} taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
            <MyTasksList tasks={tasks} checkTask={checkTask} deleteTask={deleteTask} />
        </MyTasksContainer>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);