import CircularProgressBar from "../CircularProgressBar";

export default function SubTaskProgress({ subTasks }) {
  const totalTasks = subTasks.length;
  const completedTasks = subTasks.filter((task) => task.isChecked).length;

  return (
    <CircularProgressBar
      totalTasks={totalTasks}
      completedTasks={completedTasks}
    />
  );
}
