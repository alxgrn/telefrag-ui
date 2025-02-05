import React, { FC, PropsWithChildren } from 'react';
import { Sidebar } from '../../main';
import './Page.css';

type Props = {
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
	isSidebarVisible?: boolean;
	onSidebarClose?: () => void;
}

const Page: FC<PropsWithChildren<Props>> = ({ header, children, sidebar, isSidebarVisible = false, onSidebarClose }) => {
	return (
		<div className='Page'>
            {header && <>{header}</>}
            <div className='PageBody'>
				<div className='PageContent'>{children}</div>
				{sidebar &&
				<div className='PageSidebar'>
					<div className='PageSidebarInner'>
						{sidebar}
					</div>
				</div>}
			</div>
			{sidebar && <Sidebar
				isOpen={isSidebarVisible}
				onClose={() => { if(onSidebarClose) onSidebarClose() }}
				position='Right'
			>
				{sidebar}
			</Sidebar>}
		</div>
	);
};

export default Page;
