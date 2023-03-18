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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else {
      setTime(event.target.value);
    }
  };

  const addTask = (): void => {
    const newTask = {
      id: keyId.current++,
      taskName: task,
      taskDescription: description,
      time: time,
    };
    if (task != "") {
      setDaily([...daily, newTask]);
      setTask("");
      setDescription("");
      setTime("00:00");
    }
  };

  const deleteTask = (taskId: number): void => {
    setDaily((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Add edit feature: const editTask = (taskNameEdit: undefined): void => {}

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

  // Splitting up task time (string -> numbers) then sorting in list by time
  const compareTasks = (a: ITask, b: ITask) => {
    const [aHour, aMinute] = a.time.split(":").map(Number);
    const [bHour, bMinute] = b.time.split(":").map(Number);

    if (aHour < bHour) {
      return -1;
    } else if (aHour > bHour) {
      return 1;
    } else {
      if (aMinute < bMinute) {
        return -1;
      } else if (aMinute > bMinute) {
        return 1;
      } else {
        return 0;
      }
    }
  };

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
            </div>
          </div>
        </div>
      )}
      <audio src="../audio/EntertheArena.mp3" controls></audio>
    </div>
  );
}

export default App;
