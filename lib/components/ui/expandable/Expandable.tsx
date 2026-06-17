import React, { useState, useRef, PropsWithChildren, useCallback, useLayoutEffect, useEffect } from 'react';
import './Expandable.css';

const MIN_HEIGHT = 50; // Не должно быть меньше высоты тени, иначе некрасиво.
const DEFAULT_MAX_HEIGHT = 300;
const DELAY_CHECK = 1000; // Задержка перед контрольной проверкой

type Props = {
    maxHeight?: number;
    aspectRatio?: '1x1' | '16x9';
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
    noShadow,
}) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ shouldExpand, setShouldExpand ] = useState(false);
    const [ maxHeightStyle, setMaxHeightStyle ] = useState<string | number>('none');
    const contentRef = useRef<HTMLDivElement>(null);
    const hasCheckedRef = useRef(false); // Нужно для предотвращения повторного запуска опроса при изменении пропсов
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);

    // Подсчёт максимальной высоты для свёрнутого блока
    const getMaxHeight = useCallback((): number => {
        // Если указана высота в пропсах, то вернём её, но при условии что она больше минимальной
        if (maxHeight !== undefined) return Math.max(maxHeight, MIN_HEIGHT);
        // Если элемент ещё не определен, вернём дефолтную высоту
        const element = contentRef.current;
        if (!element) return DEFAULT_MAX_HEIGHT;
        // Если ширина элемента ещё не определена, вернём дефолтную высоту
        const width = element.offsetWidth;
        if (width === 0) return DEFAULT_MAX_HEIGHT;
        // Подсчитаем высоту в соответствии с установками
        const height = aspectRatio === '16x9' ? Math.ceil((width / 16) * 9) : width;
        // В любом случае не возвращаем высоту меньше минимальной
        return Math.max(height, MIN_HEIGHT);
    }, [ maxHeight, aspectRatio ]);


    // Проверка того, может ли компонент быть увеличен
    const checkShouldExpand = useCallback(() => {
        const element = contentRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        // Пропускаем, если элемент скрыт или невидим
        if (rect.width === 0 || rect.height === 0 || style.display === 'none' || style.visibility === 'hidden') {
            return;
        }

        // 🔥 Принудительный рефлоу — заставляем браузер пересчитать layout
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.offsetHeight;

        // Компонент может быть раскрыт, если высота контента больше высоты определенной как максимальная
        const scrollHeight = element.scrollHeight;
        const currentMaxHeight = getMaxHeight();
        setShouldExpand(scrollHeight > currentMaxHeight);
    }, [ getMaxHeight ]);


    // Если внутри компонента есть картинки, необходимо дождаться их загрузки
    // и после этого перепроверить может ли компонент раскрываться
    const checkImages = useCallback(() => {
        const element = contentRef.current;
        if (!element) return;

        const images = element.querySelectorAll('img');
        const pendingImages = Array.from(images).filter(img => !img.complete);

        if (pendingImages.length === 0) {
            // Если картинок нет — сразу проверяем переполнение
            checkShouldExpand();
            return;
        }

        // Запускаем проверку после загрузки всех картинок
        Promise.all(pendingImages.map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
        }))).then(checkShouldExpand);

    }, [ checkShouldExpand ]);


    // Запуск проверки при монтировании через useLayoutEffect
    // useLayoutEffect срабатывает после рендера, но до отрисовки в DOM,
    // к этому моменту ref уже установлен, contentRef.current гарантированно
    // есть, если элемент отрендерился.
    useLayoutEffect(() => {
        // Если контента нет или мы уже отработали его появление, выходим
        if (hasCheckedRef.current || !contentRef.current) return;

        // Взведём флаг того что уже запустили проверки,
        // т.к. только на contentElement полагаться нельзя
        hasCheckedRef.current = true;

        // Элемент отслеживаем по contentRef а не по contentElement!
        const element = contentRef.current;

        // MutationObserver для отслеживания появления картинок и новых дочерних элементов
        const mutationObserver = new MutationObserver(checkImages);
        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
        });
        if (mutationObserverRef.current) mutationObserverRef.current.disconnect();
        mutationObserverRef.current = mutationObserver;

        // ResizeObserver отслеживает изменения размера, но только если изменения происходят
        // у видимой части элемента! Если растёт скрытая часть, то обсервер ничего не пришлёт!
        const resizeObserver = new ResizeObserver(checkImages);
        resizeObserver.observe(element);
        if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
        resizeObserverRef.current = resizeObserver;

        // Страховка: проверка через delayCheck
        const timeoutId = setTimeout(checkImages, DELAY_CHECK);

        // Первоначальная проверка
        checkImages();

        // При размонтировании очищаем всё
        return () => {
            clearTimeout(timeoutId);
            if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
            if (mutationObserverRef.current) mutationObserverRef.current.disconnect();
        };

    }, [ checkImages ]);


    // Для анимации необходимо вычислять высоту блока при переключении
    useEffect(() => {
        if (isExpanded) {
            // Если компонент раскрыт, то ставим его максимальную высоту, а если не знаем её то 'none'
            setMaxHeightStyle(contentRef.current ? `${contentRef.current.scrollHeight}px` : `none`);
        } else {
            // Если компонент свернут, то ставим высоту из установок
            setMaxHeightStyle(`${getMaxHeight()}px`);
        }
    }, [ isExpanded, getMaxHeight ]);


    return (
        <div className='Expandable'>
            <div
                ref={contentRef}
                // Класс и стиль нужны для плавной анимации раскрытия/закрытия
                className={shouldExpand ? (isExpanded ? 'ExpandableExpanded' : 'ExpandableCollapsed') : undefined}
                style={shouldExpand ? { maxHeight: maxHeightStyle } : undefined}
            >
                {children}
            </div>

            {shouldExpand && (
                <>
                    {isExpanded && isCollapsable && (
                        <span
                            className='ExpandableButton'
                            onClick={() => setIsExpanded(false)}
                        >
                            {collapse}
                        </span>
                    )}

                    {!isExpanded && (
                        <>
                            {!noShadow && <div className='ExpandableShadow'/>}
                            <span
                                className='ExpandableButton'
                                onClick={() => setIsExpanded(true)}
                            >
                                {expand}
                            </span>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Expandable;
