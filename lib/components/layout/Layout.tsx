import React, { FC, PropsWithChildren, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { Sidebar } from '../../main';
import './Layout.css';
import MainMenu from './MainMenu';

type Props = {
	userMenu: React.ReactNode;
	onLogoClick?: () => void;
	onMenuClick?: (id: number|string) => void;
}

const Layout: FC<PropsWithChildren<Props>> = ({ children, userMenu, onLogoClick, onMenuClick }) => {
	const [ isMenuVisible, setIsMenuVisible ] = useState(false);
	return (
		<div className='Layout'>
            <Header
				userMenu={userMenu}
				onMenuSwitch={() => setIsMenuVisible(b => !b)}
				onLogoClick={onLogoClick}
			/>
            <Content onMenuClick={onMenuClick}>
				{children}
			</Content>
            <Footer/>
			<Sidebar
				isOpen={isMenuVisible}
				onClose={() => setIsMenuVisible(false)}
			>
				<MainMenu onMenuClick={id => {
					setIsMenuVisible(false);
					if (onMenuClick) onMenuClick(id);
				}}/>
			</Sidebar>
		</div>
	);
};

export default Layout;
