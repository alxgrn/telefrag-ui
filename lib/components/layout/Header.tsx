import React, { FC } from 'react';
import { Menu, TelefragLogo } from '../icons';
import './Header.css';

type Props = {
    userMenu: React.ReactNode;
    onMenuSwitch: () => void;
    onLogoClick?: () => void;
};

const Header: FC<Props> = ({ userMenu, onMenuSwitch, onLogoClick }) => {
    return (
        <header className='HeaderWrapper'>
            <div className='Header'>
                <div className='HeaderLeft'>
                    <span onClick={onMenuSwitch}><Menu/></span>
                </div>
                <div className='HeaderCenter'>
                    <TelefragLogo onClick={onLogoClick}/>
                </div>
                <div className='HeaderRight'>
                    {userMenu}
                </div>
            </div>
        </header>
    );
};

export default Header;
