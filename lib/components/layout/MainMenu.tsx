import { FC, ReactNode } from 'react';
import './MainMenu.css';

export type MainMenuTitle = {
    id?: never;
    text?: never;
    icon?: never;
    title: string;
    checked?: never;
};

export type MainMenuAlternative = {
    id: string;
    text: string;
    icon: ReactNode;
    title?: never;
    checked?: boolean; 
};

export type MainMenuItem = MainMenuTitle | MainMenuAlternative;

type Props = {
    items: MainMenuItem[];
    onMenuClick?: (id: string) => void;
};

const MainMenu: FC<Props> = ({ items, onMenuClick }) => {
    return (
        <div className='MainMenu'>
            {items.map((item, index) => <div
                key={index}
                onClick={() => { if(onMenuClick && item.id) onMenuClick(item.id) }}
                className={item.title ? 'MainMenuTitle' : undefined}
            >
                {item.title
                ? <span className='one-line'>{item.title}</span>
                : <>{item.icon}<span className='one-line'>{item.text}</span></>}
                {item.checked && <span className='MainMenuCheck'/>}
            </div>)}
        </div>
    );
};

export default MainMenu;
