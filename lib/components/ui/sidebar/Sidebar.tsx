import { FC, PropsWithChildren, useEffect } from 'react';
import Overlay from '../overlay/Overlay';
import './Sidebar.css';

export type Props = {
    position?: 'Left' | 'Right';
    isOpen: boolean;
    onClose: () => void;
};

export const Sidebar: FC<PropsWithChildren<Props>> = ({ children, position = 'Left', isOpen, onClose }) => {
    // Отслеживаем нажатие ESC для закрытия
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };

        if (isOpen) document.body.addEventListener("keydown", closeOnEscapeKey);
        
        return () => {
            if (isOpen) document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [ isOpen, onClose ]);

	return (
        <Overlay
            isOpen={isOpen}
            onClick={onClose}
            hAlign={position}
        >
            <div className={`Sidebar ${position}`} onClick={e => e.stopPropagation()}>
                <div className='SidebarInner Scrollbar'>
                    {children}
                </div>
            </div>
        </Overlay>
	);
};

export default Sidebar;
