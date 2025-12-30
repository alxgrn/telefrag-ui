import React, { FC } from 'react';
import { TelefragLogo, TelefragSymbol } from '../icons';
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
                <div className='HeaderMobile' onClick={onMenuSwitch}>
                    <TelefragSymbol/>
                </div>
                <div className='HeaderTablet'>
                    <TelefragLogo onClick={onMenuSwitch}/>
                </div>
                <div className='HeaderDesktop'>
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
