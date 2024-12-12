import React, { FC, PropsWithChildren } from 'react';
import './Content.css';

type Props = {
    menu?: React.ReactNode;
};

const Content: FC<PropsWithChildren<Props>> = ({ children, menu }) => {
    return (
        <main className='Content'>
            {menu &&
            <div className='ContentMenu'>
                <div className='ContentMenuInner'>
                    {menu}
                </div>
            </div>}
            <div className='ContentMain'>
                {children}
            </div>
        </main>
    );
};

export default Content;
