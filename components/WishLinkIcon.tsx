import React from "react";

interface WishlinkIconProps {
  size?: number;
  className?: string;
}

const WishlinkIcon: React.FC<WishlinkIconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Example Wishlink-style logo (a chain link symbol) */}
    <path d="M10.59 13.41a1.99 1.99 0 0 0 2.82 0l3.59-3.59a2 2 0 0 0-2.83-2.83l-.88.88-1.41-1.41.88-.88a4 4 0 0 1 5.66 5.66l-3.59 3.59a4 4 0 0 1-5.66-5.66l.88-.88 1.41 1.41-.88.88a1.99 1.99 0 0 0 0 2.82z" />
  </svg>
);

export default WishlinkIcon;
