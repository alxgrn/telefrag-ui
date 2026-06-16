import { FC, PropsWithChildren } from 'react';
import MainMenu, { MainMenuItem } from './MainMenu';
import './Content.css';

type Props = {
    mainMenu: MainMenuItem[];
};

const Content: FC<PropsWithChildren<Props>> = ({ children, mainMenu }) => {
    return (
        <main className='Content'>
            <div className='ContentMenu'>
                <MainMenu items={mainMenu}/>
            </div>
            <div className='ContentMain'>
                {children}
            </div>
        </main>
    );
};

export default Content;
