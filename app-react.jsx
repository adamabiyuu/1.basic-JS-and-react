
const MyTasksForm = (props) => {
    return (
      <form className="form" id="taskForm" onSubmit={(event) => props.onSubmit(event)}>
        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">
            Mau ngapain hari ini?
          </label>
          <input className="form-input form-input--full" type="text" id="taskTitle" name="taskTitle" placeholder="Masukkan kegiatan" onChange={(event) => props.setTaskTitle(event.target.value)} value={props.taskTitle} />
        </div>
        <div className="form-group form-group--button-right">
          <button className="button" type="submit">
            Simpan
          </button>
        </div>
      </form>
    );
}

const MyTasksList = () => {
    return (
      <div className="tasks">
        <h2 className="tasks-title">Agendaku</h2>
        <ul className="tasks-list" id="tasksList"></ul>
      </div>
    );
}

const MyTasksContainer = (props) => {
    return <div className="container">{props.children}</div>
}

const App = () => {
    const [taskTitle, setTaskTitle] = React.useState("");
    const [tasks, setTasks] = React.useState([]);

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
    
    return (
        <MyTasksContainer>
            <MyTasksForm onSubmit={addTask} taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
            <MyTasksList />
        </MyTasksContainer>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);