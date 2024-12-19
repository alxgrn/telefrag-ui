import React, { FC, PropsWithChildren, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { Sidebar } from '../../main';
import './Layout.css';
import MainMenu, { MainMenuItem } from './MainMenu';

type Props = {
	mainMenu: MainMenuItem[];
	userMenu: React.ReactNode;
	onLogoClick?: () => void;
	onMenuClick?: (id: string) => void;
}

const Layout: FC<PropsWithChildren<Props>> = ({ children, mainMenu, userMenu, onLogoClick, onMenuClick }) => {
	const [ isMenuVisible, setIsMenuVisible ] = useState(false);
	return (
		<div className='Layout'>
            <Header
				userMenu={userMenu}
				onMenuSwitch={() => setIsMenuVisible(b => !b)}
				onLogoClick={onLogoClick}
			/>
            <Content mainMenu={mainMenu} onMenuClick={onMenuClick}>
				{children}
			</Content>
            <Footer/>
			<Sidebar
				isOpen={isMenuVisible}
				onClose={() => setIsMenuVisible(false)}
			>
				<MainMenu
					items={mainMenu}
					onMenuClick={id => {
						setIsMenuVisible(false);
						if (onMenuClick) onMenuClick(id);
					}}
				/>
			</Sidebar>
		</div>
	);
};

export default Layout;
