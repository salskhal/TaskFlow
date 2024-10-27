interface CircularProgressBarProps {
    totalTasks: number;
    completedTasks: number;
    size?: number;
    trackColor?: string;
    indicatorColor?: string;
    labelClassName?: string;
  }
  
  export default function CircularProgressBar({
    totalTasks,
    completedTasks,
    size = 30,
    trackColor = "#e5e7eb",
    indicatorColor = "#4f46e5",
    labelClassName = "text-xs text-gray-700",
  }: CircularProgressBarProps) {
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    // SVG properties
    const strokeWidth = size * 0.15; // Proportional stroke width
    const radius = size / 2;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg height={size} width={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke={trackColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={indicatorColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={labelClassName}>
            {completedTasks}/{totalTasks}
          </span>
        </div>
      </div>
    );
  }