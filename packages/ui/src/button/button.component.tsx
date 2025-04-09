import React from 'react';
import { ButtonProps } from './button.types';
import './button.style.scss';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    }, 
    ref
  ) => {
    const baseClassName = 'btn';
    const classes = [
      baseClassName,
      `${baseClassName}--${variant}`,
      `${baseClassName}--${size}`,
      fullWidth ? `${baseClassName}--full-width` : '',
      isLoading ? `${baseClassName}--loading` : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className={`${baseClassName}__spinner`} aria-hidden="true" />
        )}
        
        {leftIcon && !isLoading && (
          <span className={`${baseClassName}__icon ${baseClassName}__icon--left`}>
            {leftIcon}
          </span>
        )}
        
        <span className={`${baseClassName}__text`}>{children}</span>
        
        {rightIcon && !isLoading && (
          <span className={`${baseClassName}__icon ${baseClassName}__icon--right`}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 