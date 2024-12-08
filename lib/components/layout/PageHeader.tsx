import React, { FC, PropsWithChildren } from 'react';

interface IPageHeader {
	onSidebarSwitch?: () => void;
}

const PageHeader: FC<PropsWithChildren<IPageHeader>> = ({ children, onSidebarSwitch }) => {
	return (
		<div>
			{children}
		</div>
	);
};

export default PageHeader;
