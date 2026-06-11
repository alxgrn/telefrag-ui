import React, { useState, useRef, useEffect, PropsWithChildren, useCallback } from 'react';
import './Expandable.css';

const MIN_HEIGHT = 50; // минимальная высота блока не должна быть меньше размера тени из CSS
const DEFAULT_HEIGHT = 300; // если высота не указана и самого компонента еще нет

type PropsWithMaxHeight = {
    maxHeight?: number;
    aspectRatio?: never;
}

type PropsWithAspectRatio = {
    maxHeight?: never;
    aspectRatio?: '1x1'|'16x9';
}

type Props = (PropsWithAspectRatio | PropsWithMaxHeight) & {
    expand?: string;
    collapse?: string;
    isCollapsable?: boolean;
    noShadow?: boolean;
};

const Expandable: React.FC<PropsWithChildren<Props>> = ({
    children,
    maxHeight,
    aspectRatio = '1x1',
    expand = 'Показать целиком...',
    collapse = 'Свернуть...',
    isCollapsable = true,
    noShadow
}) => {
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);
    const [ shouldExpand, setShouldExpand ] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Вычисление максимальной высоты для свёрнутого блока
    const getMaxHeight = useCallback((): number => {
        if (maxHeight) return Math.max(maxHeight, MIN_HEIGHT);
        const element = contentRef.current;
        if (!element) return DEFAULT_HEIGHT;
        const width = element.clientWidth;
        switch (aspectRatio) {
            case '1x1': return width;
            case '16x9': return Math.ceil((width/16)*9);
            default: return DEFAULT_HEIGHT;
        }
    }, [ maxHeight, aspectRatio, contentRef ]);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;
        const maxHeight = getMaxHeight();

        // Отключаем предыдущий observer, если он был
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
        }

        // Создаём новый ResizeObserver
        const observer = new ResizeObserver(() => {
            // Проверяем, превышает ли фактическая высота максимальную
            setShouldExpand(element.scrollHeight > maxHeight);
        });

        // Наблюдаем за элементом
        observer.observe(element);
        resizeObserverRef.current = observer;

        // Первоначальная проверка высоты
        setShouldExpand(element.scrollHeight > maxHeight);

        // Очистка при размонтировании компонента
        return () => {
            if (observer) observer.disconnect();
        };
    }, [ getMaxHeight ]); // Пересоздаём observer при изменении maxHeight

    return (
    <div className='Expandable'>
        <div
            ref={contentRef}
            className={isExpanded ? 'ExpandableExpanded' : 'ExpandableCollapsed'}
            style={{ maxHeight: isExpanded
                ? (contentRef?.current?.scrollHeight ? contentRef.current.scrollHeight+'px': 'none')
                : `${getMaxHeight()}px` }}
        >
            {children}
        </div>
        {shouldExpand && <>
            {isExpanded && isCollapsable && <span
                className='ExpandableButton'
                onClick={() => setIsExpanded(false)}
                aria-expanded={isExpanded}
                aria-controls='collapsible-content'
            >
                {collapse}
            </span>}

            {!isExpanded && <>
                {!noShadow && <div className='ExpandableShadow'/>}
                <span
                    className='ExpandableButton'
                    onClick={() => setIsExpanded(true)}
                    aria-expanded={isExpanded}
                    aria-controls='collapsible-content'
                >
                    {expand}
                </span>
            </>}
        </>}
    </div>);
};

export default Expandable;
