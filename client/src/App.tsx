import { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import DailyTask from "./components/DailyTask";

export interface ITask {
  id: number;
  taskName: string;
  time: string;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [time, setTime] = useState<string>("00:00");
  const [daily, setDaily] = useState<ITask[]>([]);
  const keyId = useRef<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setTime(event.target.value);
    }
  };

  const addTask = (): void => {
    const newTask = { id: keyId.current++, taskName: task, time: time };
    setDaily([...daily, newTask]);
    setTask("");
    setTime("00:00");
  };

  const deleteTask = (taskId: number): void => {
    setDaily(
      daily.filter((task) => {
        return task.id != taskId;
      })
    );
  };

  // Add edit feature: const editTask = (taskNameEdit: undefined): void => {}


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
            <DailyTask key={task.id} task={task} deleteTask={deleteTask} />
            // Add modal/pop-up for task description
          );
        })}
      </div>
    </div>
  );
}

export default App;
