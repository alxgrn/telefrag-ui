import React from 'react';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import Scroll from '../scroll/Scroll';
import './Toolbar.css';

export type ToolbarItem = {
    id: string | number;
    icon?: ReactNode;
    text?: ReactNode|string;
};

type ToolbarProps = {
    items: ToolbarItem[];
    panel?: boolean;
    active?: string | number;
    className?: string;
    onActive: (id: string | number) => void;
};

const Toolbar: React.FC<ToolbarProps> = ({ items, panel, active, className, onActive }) => {
    const [ current, setCurrent ] = useState(0);
    const [ scroll, setScroll ] = useState<ReactElement[]>([]);

    useEffect(() => {
        const index = items.findIndex(item => item.id === active);
        setCurrent(index);
    }, [ items, active ]);

    useEffect(() => {
        const scroll = items.map(item => {
            return (<div className='ToolbarItem'>
                {item.icon ? <span>{item.icon}</span> : null}
                {item.text ? <span>{item.text}</span> : null}
            </div>);
        });
        setScroll(scroll);
    }, [ items ]);

    return (
        <div className={`Toolbar ${panel ? 'LikePanel' : ''} ${className ? className : ''}`}>
            <Scroll items={scroll} active={current} onActive={id => onActive(items[id].id)}/>
        </div>
    );
};

export default Toolbar;
