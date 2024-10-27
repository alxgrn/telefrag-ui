import { FC } from 'react';
import { Menu, TelefragLogo } from '../icons';
import './Header.css';

type Props = {
    onMenuSwitch: () => void;
};

const Header: FC<Props> = ({ onMenuSwitch }) => {
    return (
        <header className='HeaderWrapper'>
            <div className='Header'>
                <div className='HeaderLeft' onClick={onMenuSwitch}>
                    <Menu/>
                </div>
                <div className='HeaderCenter'>
                    <TelefragLogo/>
                </div>
                <div className='HeaderRight'>
                    <Menu/>
                </div>
            </div>
        </header>
    );
};

export default Header;
