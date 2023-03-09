import { ITask } from "../App";
import './tasks.css'

interface Props {
  task: ITask;
  deleteTask(taskId: number): void;
}

const DailyTask = ({ task, deleteTask }: Props) => {
  return (
    <div className="task bor mar pad">
      <div className="task-container">
        <span className="task-name">{task.taskName}</span>
        <span className="task-time">{task.time}</span>
      </div>
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default DailyTask;
