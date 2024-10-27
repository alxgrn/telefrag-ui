import React, { FC, PropsWithChildren, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './Layout.css';
import { Sidebar } from '../../main';

type Props = {
	menu?: React.ReactNode;
}

const Layout: FC<PropsWithChildren<Props>> = ({ children, menu }) => {
	const [ isMenuVisible, setIsMenuVisible ] = useState(false);
	return (
		<div className='Layout'>
            <Header onMenuSwitch={() => setIsMenuVisible(b => !b)}/>
            <Content menu={menu}>
				{children}
			</Content>
            <Footer/>
			<Sidebar
				isOpen={isMenuVisible}
				onClose={() => setIsMenuVisible(false)}
				//position='Right'
			>
				{menu}
			</Sidebar>
		</div>
	);
};

export default Layout;
