import React from 'react';

const Button = ({
  is_delete = false,
  children,
  status = 'primary',
  click_func,
  className,
}: {
  is_delete?: boolean;
  children: React.ReactNode;
  status?: 'primary' | 'secondary';
  click_func?: () => void;
  className?: string;
}) => {
  return (
    <div className={``}>
      <button
        className={`font-sans p-2 md:px-4 rounded-md ${status === 'primary' ? (!is_delete ? 'bg-black' : 'bg-red-600') : !is_delete ? 'hover:bg-black' : 'hover:bg-red-600'} md:text-base text-sm ${status === 'primary' ? 'hover:text-black text-white' : 'hover:text-white text-black'} hover:bg-transparent duration-1000 border-2 rounded-lg ${status === 'primary' ? 'hover:border-black' : 'border-black hover:border-transparent'} duration-1000 border-transparent ${className}`}
        onClick={click_func}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
