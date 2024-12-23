import { FC, PropsWithChildren } from 'react';
import MainMenu, { MainMenuItem } from './MainMenu';
import './Content.css';

type Props = {
    mainMenu: MainMenuItem[];
    onMenuClick?: (id: string) => void;
};

const Content: FC<PropsWithChildren<Props>> = ({ children, mainMenu, onMenuClick }) => {
    return (
        <main className='Content'>
            <div className='ContentMenu'>
                <MainMenu items={mainMenu} onMenuClick={onMenuClick}/>
            </div>
            <div className='ContentMain'>
                {children}
            </div>
        </main>
    );
};

export default Content;
