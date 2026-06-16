import { FC, ReactNode } from 'react';
import './MainMenu.css';
import { Link } from 'react-router';

export type MainMenuTitle = {
    text?: never;
    icon?: never;
    link?: never;
    title: string;
    checked?: never;
    node?: never;
};

export type MainMenuAlternative = {
    text: string;
    icon: ReactNode;
    link: string;
    title?: never;
    checked?: boolean;
    node?: never;
};

export type MainMenuNode = {
    text?: never;
    icon?: never;
    link?: never;
    title?: string;
    checked?: never;
    node: ReactNode;
};

export type MainMenuItem = MainMenuTitle | MainMenuAlternative | MainMenuNode;

type Props = {
    items: MainMenuItem[];
    onMenuClick?: () => void;
};

const MainMenu: FC<Props> = ({ items, onMenuClick }) => {
    return (
        <div className='MainMenu'>
            {items.map((item, index) => <div
                key={index}
                className={item.node ? 'MainMenuNode' : item.title ? 'MainMenuTitle' : 'MainMenuAlternative'}
            >
                {item.node ? item.node : item.title ? item.title :
                <Link to={item.link ?? '/'} onClick={() => onMenuClick?.()}>
                    {item.icon}
                    <span className='MainMenuAlternativeText'>{item.text}</span>
                    {item.checked && <span className='MainMenuAlternativeCheck'/>}
                </Link>}
            </div>)}
        </div>
    );
};

export default MainMenu;
