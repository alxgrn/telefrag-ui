import React, { FC, PropsWithChildren, useState } from 'react';
import Header from './Header';
//import Footer from './Footer';
import Content from './Content';
import { Sidebar } from '../../main';
import MainMenu, { MainMenuItem } from './MainMenu';
import './Layout.css';

type Props = {
	mainMenu: MainMenuItem[];
	userMenu: React.ReactNode;
	onLogoClick?: () => void;
}

const Layout: FC<PropsWithChildren<Props>> = ({ children, mainMenu, userMenu, onLogoClick }) => {
	const [ isMenuVisible, setIsMenuVisible ] = useState(false);
	return (
		<div className='Layout'>
            <Header
				userMenu={userMenu}
				onMenuSwitch={() => setIsMenuVisible(b => !b)}
				onLogoClick={onLogoClick}
			/>
            <Content mainMenu={mainMenu}>
				{children}
			</Content>
            {/* <Footer/> */}
			<Sidebar
				isOpen={isMenuVisible}
				onClose={() => setIsMenuVisible(false)}
			>
				<MainMenu
					items={mainMenu}
					onMenuClick={() => setIsMenuVisible(false)}
				/>
			</Sidebar>
		</div>
	);
};

export default Layout;
