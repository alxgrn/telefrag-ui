import React, { FC, PropsWithChildren, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './Layout.css';
import { Sidebar } from '../../main';

type Props = {
	mainMenu: React.ReactNode;
	userMenu: React.ReactNode;
}

const Layout: FC<PropsWithChildren<Props>> = ({ children, mainMenu, userMenu }) => {
	const [ isMenuVisible, setIsMenuVisible ] = useState(false);
	return (
		<div className='Layout'>
            <Header
				userMenu={userMenu}
				onMenuSwitch={() => setIsMenuVisible(b => !b)}
			/>
            <Content menu={mainMenu}>
				{children}
			</Content>
            <Footer/>
			<Sidebar
				isOpen={isMenuVisible}
				onClose={() => setIsMenuVisible(false)}
			>
				{mainMenu}
			</Sidebar>
		</div>
	);
};

export default Layout;
