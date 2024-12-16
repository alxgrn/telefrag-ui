import { FC, PropsWithChildren } from 'react';
import MainMenu from './MainMenu';
import './Content.css';

type Props = {
    onMenuClick?: (id: number|string) => void;
};

const Content: FC<PropsWithChildren<Props>> = ({ children, onMenuClick }) => {
    return (
        <main className='Content'>
            <div className='ContentMenu'>
                <div className='ContentMenuInner'>
                    <MainMenu onMenuClick={onMenuClick}/>
                </div>
            </div>
            <div className='ContentMain'>
                {children}
            </div>
        </main>
    );
};

export default Content;
