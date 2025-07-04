import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal/Portal';
import { ANIMATION_LENGTH } from '../../../config';
import './Popup.css';
/**
 * Компонент всплывающего блока.
 * Используется для отображения меню, блока выбора даты и т.п.
 * Предполагается что его надо располагать относительно родительского компонента.
 */
const TIMEOUT = ANIMATION_LENGTH;

// Позиционирование относительно точки окна
export type PopupPropsPosition = {
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
    margin?: string; // отступ от точки в css-юнитах
    vertical?: 'auto'|'top'|'bottom';
    horizontal?: 'auto'|'left'|'right';
    maxHeight?: 'auto'|'none';
    position?: 'absolute'|'fixed'; // скроллим элемент вместе с окном или нет
    parent?: never;
    width?: never;
};

// Позиционирование относительно родительского компонента
export type PopupPropsParent = {
    x?: never;
    y?: never;
    parent: HTMLElement;
    isOpen: boolean;
    onClose: () => void;
    margin?: string; // отступ от родителя в css-юнитах
    vertical?: 'auto'|'top'|'bottom'|'inner-top'|'inner-bottom';
    horizontal?: 'auto'|'left'|'right'|'inner-left'|'inner-right';
    maxHeight?: 'auto'|'none';
    width?: 'auto'|'parent';
    position?: 'absolute'|'fixed'; // скроллим элемент вместе с окном или нет
};

export type PopupProps = PopupPropsPosition | PopupPropsParent;

export const Popup:FC<PropsWithChildren<PopupProps>> = ({ x, y, parent, isOpen, onClose,
                                                        vertical = 'auto', horizontal = 'auto', margin = '0',
                                                        maxHeight = 'none', width = 'auto', position = 'absolute',
                                                        children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ innerStyle, setInnerStyle ] = useState({});
    const [ popupStyle, setPopupStyle ] = useState({});

    // Если расположение меню относительно родителя не указано явно через
    // vertical/horizontal, располагаем его в зависимости от того, в каком
    // квадранте экрана находится родитель.
    useEffect(() => {
        // Если мы закрываемся, то ничего не пересчитываем. В противном случае
        // при закрытии после скролла может быть перескок в новые координаты.
        if(!isOpen) return;
        // Размеры окна
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        // Координаты точки позиционирования
        let prnt: any = {};
        // Формируем координаты компонента относительно которого будеи позиционироваться
        if(parent) {
            // Координаты родителя относительно viewport
            prnt = parent.getBoundingClientRect();
            // Проверим не в модалке ли мы и если да, то принудительно поставим позицию в fixed
            // если этого не сделать то позиция попапа будет вычислена неверно из-за смещения внутри модалки
            const modal = parent.closest('ModalInner');
            if (modal) position = 'fixed';
        } else {
            // Координаты точки в окне
            prnt.y = prnt.top = prnt.bottom = y;
            prnt.x = prnt.left = prnt.right = x;
            prnt.width = prnt.height = 0;
        }
        // Установим координаты и размеры контейнера с учетом того, как позиционируем попап
        setPopupStyle({
            position,
            top: position === 'fixed' ? prnt.top : prnt.top + window.scrollY,
            left: position === 'fixed' ? prnt.left : prnt.left + window.scrollX,
            width: prnt.width,
            height: prnt.height,
        });
        // Позиционирование содержимого относительно контейнера
        const style: any = {
            width: width === 'parent' ? prnt.width : 'auto',
        };
        let maxHeightValue: number = 0;
        // Позиционирование по вертикали
        switch(vertical) {
            case 'top':
                // над родительским компонентом
                style.bottom = '100%';
                style.marginBottom = margin;
                maxHeightValue = prnt.top;
                break;
            case 'bottom':
                // под родительским компонентом
                style.top = '100%';
                style.marginTop = margin;
                maxHeightValue = clientHeight - prnt.bottom;
                break;
            case 'inner-top':
                // верхняя граница совпадает с верхней границей родителя
                style.top = 0;
                maxHeightValue = clientHeight - prnt.top;
                break;
            case 'inner-bottom':
                // нижняя граница совпадает с нижней границей родителя
                style.bottom = 0;
                maxHeightValue = prnt.bottom;
                break;
            default:
                // если снизу места больше, чем сверху, то покажем снизу, иначе - сверху
                if(prnt.top < clientHeight - prnt.bottom) {
                    style.top = '100%';
                    style.marginTop = margin;
                    maxHeightValue = clientHeight - prnt.bottom;
                } else {
                    style.bottom = '100%';
                    style.marginBottom = margin;
                    maxHeightValue = prnt.top;
                }
                break;
        }
        // Ограничим размер по вертикали
        if(maxHeight === 'auto') {
            style.maxHeight = `calc(${maxHeightValue}px - 2 * ${margin})`;
        }
        // Позиционирование по горизонтали
        switch(horizontal) {
            case 'left':
                // слева от родительского компонента
                style.right = '100%';
                style.marginRight = margin;
                break;
            case 'right':
                // справа от родительского компонента
                style.left = '100%';
                style.marginLeft = margin;
                break;
            case 'inner-left':
                // левая граница совпадает с левой границей родителя
                style.left = 0;
                break;
            case 'inner-right':
                // правая граница совпадает с правой границей родителя
                style.right = 0;
                break;
            default:
                // если слева места больше, чем справа, то покажем слева, иначе - справа
                if(prnt.left < clientWidth - prnt.right) {
                    style.left = '100%';
                    style.marginLeft = margin;
                } else {
                    style.right = '100%';
                    style.marginRight = margin;
                }
                break;
        }
        // Устанавливаем
        setInnerStyle(style);
    }, [ parent, isOpen, margin, vertical, horizontal, maxHeight, width, position ]);

    // Скрываем при клике вне компонента
    // Используем нисходящее событие, а не восходящее!
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !(ref.current as any).contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClose ]);

    // Скрываем по Esc и Enter
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };
        document.body.addEventListener("keydown", handleEscape);
        return () => {
            document.body.removeEventListener("keydown", handleEscape);
        };
    }, [ onClose ]);

    // Не нужно при использовании CSSTransition с unmountOnExit
    // if (!isOpen) return null;

    return (
        <Portal id='alxgrn-popup'>
            <CSSTransition
                in={isOpen}
                timeout={TIMEOUT}
                unmountOnExit
                classNames='Popup'
                nodeRef={ref}
            >
                <div className='Popup' style={popupStyle}>
                    <div className='PopupInner' ref={ref} style={innerStyle}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
};

export default Popup;
