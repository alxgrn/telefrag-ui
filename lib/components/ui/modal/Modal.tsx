import React, { FC, PropsWithChildren, useEffect } from 'react';
import Overlay from '../overlay/Overlay';
import { Plus } from '../../icons';
import './Modal.css';
export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    close?: boolean; // рисовать или нет кнопку закрытия
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isOpen, onClose, close = true }) => {
    // Отслеживаем нажатие ESC для закрытия окна
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };

        if (isOpen) document.body.addEventListener("keydown", closeOnEscapeKey);
        
        return () => {
            if (isOpen) document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [ isOpen, onClose ]);

    // Обработчик клика на кнопку закрытия окна
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

	return (
        <Overlay
            isOpen={isOpen}
            onClick={onClose}
        >
            <div className='Modal' onClick={e => e.stopPropagation()}>
                {close &&
                <div className='ModalClose' onClick={onClick}>
                    <Plus/>
                </div>}
                <div className='ModalInner Scrollbar'>
                    {children}
                </div>
            </div>
        </Overlay>
	);
};

export default Modal;
