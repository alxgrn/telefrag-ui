import React, { FC, PropsWithChildren, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal/Portal';
import { ANIMATION_LENGTH } from '../../../config';
import './Overlay.css';

const TIMEOUT = ANIMATION_LENGTH;

export type Props = {
    isOpen: boolean;
    onClick?: () => void;
    vAlign?: 'Top' | 'Middle' | 'Bottom';
    hAlign?: 'Left' | 'Center' | 'Right';
};

export const Overlay: FC<PropsWithChildren<Props>> = ({ children, isOpen, onClick, vAlign = 'Middle', hAlign = 'Center' }) => {
    const nodeRef = useRef(null);

    const onBeforeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClick) onClick();
    };

    // не нужно при использовании CSSTransition
    // if (!isOpen) return null;

	return (
        <Portal id='alxgrn-overlay' fixBody>
            <CSSTransition
                in={isOpen}
                timeout={TIMEOUT}
                unmountOnExit
                classNames='Overlay'
                nodeRef={nodeRef}
            >
                <div className={`Overlay ${vAlign} ${hAlign}`} ref={nodeRef} onClick={onBeforeClick}>
                    {children}
                </div>
            </CSSTransition>
        </Portal>
	);
};

export default Overlay;
