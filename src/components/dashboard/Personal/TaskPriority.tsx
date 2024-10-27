const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-100 border border-red-300"; // High priority - red text
    case "medium":
      return "text-yellow-600 bg-yellow-100" ; // Medium priority - yellow text
    case "low":
      return "text-green-600 bg-green-100 border border-green-300"; // Low priority - green text
    case "normal":
    default:
      return "text-gray-600 bg-gray-100 border border-gray-300"; // Normal priority - gray text
  }
};

export default function TaskPriority({ priority }) {
  return (
    <p className={`capitalize px-4 py-1 font-medium rounded w-fit ${getPriorityClass(priority)}`}>
      • {priority}
    </p>
  );
}
