import React from 'react';
import { MouseEvent, ReactElement, UIEvent, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '../../icons';
import './Scroll.css';
/**
 * Блок, в котором по горизонтали размещаются элементы.
 * Элементы могут не помещаться в блок, в этом случае появляются
 * кнопки скролла.
 * В отличие от Carousel элементы в блоке не занимают все доступное
 * пространство по ширине, напротив - предполагается что сразу
 * несколько из них видны в блоке.
 * NB: Скроллер сам визуально никак не выделяет активный элемент,
 *     но добавляет к блоку ScrollItem класс active
 */
type Props = {
    items: ReactElement[];
    active?: number;
    onActive?: (index: number) => void;
};

const Scroll: React.FC<Props> = ({ items, active, onActive }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const [ showPrev, setShowPrev ] = useState(false);
    const [ showNext, setShowNext ] = useState(false);

    // Проверка видимости кнопок
    const checkPrevNext = (target: HTMLDivElement) => {
        const left  = target.scrollLeft;
        const width = target.offsetWidth;
        const fullWidth = target.scrollWidth;
        if (fullWidth <= width) {
            setShowPrev(false);
            setShowNext(false);
        } else {
            setShowPrev(left > 0);
            setShowNext(Math.round(left + width + 0.5) < fullWidth);
        }
    };

    // Сразу после отрисовки надо определить видимость кнопок
    useEffect(() => {
        if (listRef.current) checkPrevNext(listRef.current);
    }, [ listRef ]);

    // При смене активного элемента пытаемся проскроллить список так, чтобы элемент был по центру
    useEffect(() => {
        if (active !== undefined && itemRefs.current[active] && listRef.current) {
            listRef.current.scrollLeft = itemRefs.current[active].offsetLeft + itemRefs.current[active].clientWidth/2 - listRef.current.offsetWidth/2;
        }
    }, [ active, itemRefs, listRef ]);

    // Обработаем видимость кнопок после скролла
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        checkPrevNext(event.currentTarget);
    };

    // При клике на кнопку влево мы ищем первый элемент списка
    // который не виден целиком слева и скроллим к нему
    const onPrevClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!listRef.current) return;
        const left = listRef.current.scrollLeft;
        for (let i = itemRefs.current.length - 1; i >= 0; i-- ) {
            if (itemRefs.current[i].offsetLeft < left) {
                listRef.current.scrollLeft = itemRefs.current[i].offsetLeft;
                break;
            }
        }
    };

    // При клике на кнопку вправо мы ищем первый элемент списка
    // который не виден целиком справа и скроллим к нему
    const onNextClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!listRef.current) return;
        const width = listRef.current.offsetWidth;
        const right = listRef.current.scrollLeft + width;
        for (let i = 0; i < itemRefs.current.length; i++ ) {
            const rightBorder = itemRefs.current[i].offsetLeft + itemRefs.current[i].clientWidth;
            if (rightBorder > right) {
                listRef.current.scrollLeft = rightBorder - width;
                break;
            }
        }
    };

    // При клике на элемент списка уведомим об этом родителя
    const onItemClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.stopPropagation();
        if (onActive) onActive(index);
    };

    return (
        <div className='Scroll'>
            <div className='ScrollList' onScroll={handleScroll} ref={listRef}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={index === active ? 'ScrollItem active' : 'ScrollItem'}
                    onClick={e => onItemClick(e, index)}
                    ref={(node) => {
                        if (node) {
                            itemRefs.current[index] = node;
                        }
                    }}
                >
                    {item}
                </div>
            ))}
            </div>

            {showPrev && <div className='ScrollPrev' onClick={onPrevClick}><ChevronLeft/></div>}
            {showNext && <div className='ScrollNext' onClick={onNextClick}><ChevronRight/></div>}            
        </div>
    );
};

export default Scroll;
