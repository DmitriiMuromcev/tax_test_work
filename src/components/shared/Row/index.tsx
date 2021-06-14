import React from 'react';
import './style.sass';

const Row:React.FC<{className?: string}> = ({children, className}) => <div className={`row ${className}`}>{children}</div>;

export default Row;
