/**
 * Простая панель для размещения прочих компонентов 
 */
import React, { MouseEvent, PropsWithChildren } from 'react';
import './Panel.css';

type PanelProps = {
    className?: string;
    onClick?: (e: MouseEvent) => void;
};

const Panel: React.FC<PropsWithChildren<PanelProps>> = ({ children, className, onClick }) => {
    return (
        <div
            className={className ? `Panel ${className}` : 'Panel'}
            onClick={e => { if (onClick) onClick(e) }}
        >
            {children}
        </div>
    );
};

export default Panel;
