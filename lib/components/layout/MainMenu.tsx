import { FC } from 'react';
import * as Icon from '../icons';
import { MenuAlternative } from '../ui/menu/Menu';
import './MainMenu.css';

const items: MenuAlternative[] = [{
    id: 'articles',
    text: 'Публикации',
    icon: <Icon.Files/>,
},{
    id: 'groups',
    text: 'Группы',
    icon: <Icon.Users/>,
},{
    id: 'projects',
    text: 'Проекты',
    icon: <Icon.Gamepad/>,
},{
    id: 'launches',
    text: 'Запуски',
    icon: <Icon.Rocket/>,
},{
    id: 'calendar',
    text: 'Календарь',
    icon: <Icon.Calendar/>,
}];

type Props = {
    onMenuClick?: (id: number|string) => void;
};

const MainMenu: FC<Props> = ({ onMenuClick }) => {
    return (
        <div className='MainMenu'>
            {items.map(item => <div key={item.id} onClick={() => { if(onMenuClick) onMenuClick(item.id) }}>
                {item.icon}<span>{item.text}</span>
            </div>)}
        </div>
    );
};

export default MainMenu;
