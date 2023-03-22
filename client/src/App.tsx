import { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import DailyTask from "./components/DailyTask";

export interface ITask {
  id: number;
  taskName: string;
  taskDescription: string;
  time: string;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("00:00");
  const [daily, setDaily] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const keyId = useRef<number>(0);

  // Event handler function that updates the state variables when the user types into the form.
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "task") {
      setTask(value);
    } else if (name === "description") {
      setDescription(value);
    } else {
      setTime(value);
    }
  };

  // Event handler function that adds a new task to the task list when the user clicks the "Add Task" button.
  const addTask = (): void => {
    if (!task.trim()) {
      return;
    }
    const newTask = {
      id: keyId.current++,
      taskName: task.trim(),
      taskDescription: description.trim(),
      time: time,
    };
    setDaily([...daily, newTask]);
    setTask("");
    setDescription("");
    setTime("00:00");
  };

  // Event handler function that deletes a task from the task list when the user clicks the delete button.
  const deleteTask = (taskId: number): void => {
    setDaily((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // TODO: Add editTask function to edit a task in the task list.

  // Event handler function that selects a task in the task list when the user clicks on it.
  const handleTaskClick = (
    taskId: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target instanceof HTMLButtonElement) {
      return;
    }
    const task = daily.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  // Event handler function that compares task times inputed, creating them into Date objects and returning the difference in miliseconds.
  function compareTasks(a: { time: string }, b: { time: string }): number {
    const time1 = new Date(`2000-01-01T${a.time}`);
    const time2 = new Date(`2000-01-01T${b.time}`);
    return time1.getTime() - time2.getTime();
  }

  // Event handler function that sorts compared task times in the order they are scheduled for.
  const sortedTasks = daily.sort(compareTasks);

  return (
    <div className="App">
      <header className="header bor mar pad">
        <h1>Daily Planner</h1>
      </header>
      <div className="sub-header bor mar pad">
        <div className="inputs">
          <input
            type="text"
            value={task}
            placeholder="Task..."
            name="task"
            onChange={handleChange}
          />
          <input
            type="text"
            value={description}
            placeholder="Description..."
            name="description"
            onChange={handleChange}
          />
          <input
            type="time"
            value={time}
            placeholder="Time..."
            name="time"
            onChange={handleChange}
          />
        </div>
        <button className="input-btn" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="daily-tasks">
        {sortedTasks.map((task: ITask) => {
          return (
            <div
              className="daily-tasks"
              key={task.id}
              onClick={(e) => handleTaskClick(task.id, e)}
            >
              <DailyTask key={task.id} task={task} deleteTask={deleteTask} />
            </div>
          );
        })}
      </div>
      {selectedTask && (
        <div className="modal">
          <div className="modal-container">
            <button className="close" onClick={() => setSelectedTask(null)}>
              X
            </button>
            <div className="modal-content">
              <h2>{selectedTask.taskName}</h2>
              <p>{selectedTask.taskDescription}</p>
              <span>{selectedTask.time}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
