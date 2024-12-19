import { FC, ReactNode } from 'react';
import './MainMenu.css';

export type MainMenuTitle = {
    id?: never;
    text?: never;
    icon?: never;
    title: string;
};

export type MainMenuAlternative = {
    id: string;
    text: string;
    icon: ReactNode;
    title?: never;
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
                ? <span>{item.title}</span>
                : <>{item.icon}<span>{item.text}</span></>}
            </div>)}
        </div>
    );
};

export default MainMenu;
