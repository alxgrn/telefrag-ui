import React, { FC, useState } from 'react';
import { Sidebar } from '../../main';

type Props = {
	header?: React.ReactNode;
	content: React.ReactNode;
	sidebar?: React.ReactNode;
}

const Page: FC<Props> = ({ header, content, sidebar }) => {
	const [ isSidebarVisible, setIsSidebarVisible ] = useState(false);
	return (
		<div className='Page'>
            {header && <div className='PageHeader'>{header}</div>}
            <div>
				<div className='PageContent'>{content}</div>
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
