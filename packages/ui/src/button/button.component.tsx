import React from 'react';
import { ButtonProps } from './button.types';
import styles from './button.module.scss';

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
    const classes = [
      styles.btn,
      styles[`btn_${variant}`],
      styles[`btn_${size}`],
      fullWidth ? styles.btn_fullWidth : '',
      isLoading ? styles.btn_loading : '',
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
          <span className={styles.btn__spinner} aria-hidden="true" />
        )}
        
        {leftIcon && !isLoading && (
          <span className={styles.btn__icon_left}>
            {leftIcon}
          </span>
        )}
        
        <span className={styles.btn__text}>{children}</span>
        
        {rightIcon && !isLoading && (
          <span className={styles.btn__icon_right}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 