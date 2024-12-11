import React, { FC } from 'react';
import { Menu, TelefragLogo } from '../icons';
import './Header.css';

type Props = {
    userMenu: React.ReactNode;
    onMenuSwitch: () => void;
};

const Header: FC<Props> = ({ userMenu, onMenuSwitch }) => {
    return (
        <header className='HeaderWrapper'>
            <div className='Header'>
                <div className='HeaderLeft'>
                    <span onClick={onMenuSwitch}><Menu/></span>
                </div>
                <div className='HeaderCenter'>
                    <TelefragLogo/>
                </div>
                <div className='HeaderRight'>
                    {userMenu}
                </div>
            </div>
        </header>
    );
};

export default Header;
