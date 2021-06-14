import React from 'react';
import './style.sass';

const Column:React.FC<{className?: string}> = ({children, className}) => <div className={`column ${className}`}>{children}</div>;

export default Column;
