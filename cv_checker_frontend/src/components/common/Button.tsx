import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  is_delete?: boolean;
  children: React.ReactNode;
  status?: 'primary' | 'secondary';
  click_func?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    is_delete = false,
    children,
    status = 'primary',
    click_func,
    className,
    ...otherProps
  }) => {
    const buttonClass = `font-sans p-2 md:px-4 rounded-md ${status === 'primary' ? (!is_delete ? 'bg-black' : 'bg-red-600') : !is_delete ? 'hover:bg-black' : 'hover:bg-red-600'} md:text-base text-sm ${status === 'primary' ? 'hover:text-black text-white hover:bg-transparent' : 'hover:text-white text-black'} duration-1000 border-2 ${!is_delete ? 'border-black' : 'border-red-600 hover:border-black'} rounded-lg duration-1000 ${className}`;

    return (
      <div>
        <button
          className={buttonClass}
          onClick={click_func}
          aria-label={
            status === 'primary' ? 'Primary Button' : 'Secondary Button'
          }
          role="button"
          {...otherProps}
        >
          {children}
        </button>
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
