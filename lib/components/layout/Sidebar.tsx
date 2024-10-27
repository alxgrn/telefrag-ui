import { FC, PropsWithChildren } from "react";

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='Sidebar'>
            <div className='SidebarInner'>
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
