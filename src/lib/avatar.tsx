import React from "react";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  width = 48,     // Default width
  height = 48,     // Default height
  className = "",
  loading = "lazy", // Lazy loading by default
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={`object-cover ${className}`}
      {...props}
    />
  );
};

export default Avatar;
