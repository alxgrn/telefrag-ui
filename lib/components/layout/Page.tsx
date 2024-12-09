import React, { FC, PropsWithChildren, useState } from 'react';
import { Sidebar } from '../../main';
import './Page.css';

type Props = {
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
}

const Page: FC<PropsWithChildren<Props>> = ({ header, children, sidebar }) => {
	const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);
	return (
		<div className='Page'>
            {header && <div className='PageHeader'>{header}</div>}
            <div>
				<div className='PageContent'>{children}</div>
				{sidebar && <div className='PageSidebar'>{sidebar}</div>}
			</div>
			{sidebar && <Sidebar
				isOpen={isSidebarVisible}
				onClose={() => setIsSidebarVisible(false)}
				position='Right'
			>
				{sidebar}
			</Sidebar>}
		</div>
	);
};

export default Page;
