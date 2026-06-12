/**
 * Функция для обхода всех функциональных дочерних компонентов включая вложенные
 * Ранее использовали пакет react-children-utilities
 * NB: написано с использованием ИИ от Яндекса
 */
import React, { ReactNode, ReactElement, ComponentType } from 'react';

/**
 * Тип для React-обёрток вроде memo и forwardRef
 */
type ExoticComponentWithSymbol = {
    $$typeof: symbol;
    type: any;
};

/**
 * Проверяет, является ли объект exotic-компонентом (memo/forwardRef)
 */
function isExoticComponent(obj: any): obj is ExoticComponentWithSymbol {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        '$$typeof' in obj &&
        typeof obj.$$typeof === 'symbol'
    );
};

/**
 * Определяет, является ли элемент функциональным компонентом
 */
function isFunctionalComponent(element: ReactElement): boolean {
    if (!React.isValidElement(element)) return false;

    let type = element.type;

    // Пропускаем DOM-теги (строки)
    if (typeof type === 'string') return false;

    // Пробираемся сквозь React.memo и React.forwardRef
    while (isExoticComponent(type)) {
        if (type.$$typeof === Symbol.for('react.memo') ||
            type.$$typeof === Symbol.for('react.forward_ref')) {
            type = type.type;
        } else {
            break; // Неизвестный exotic-тип — выходим
        }
    }

    // Теперь проверяем: это функция и не классовый компонент?
    return typeof type === 'function' && !((type as ComponentType).prototype?.isReactComponent);
};

/**
 * Рекурсивно обходит всех потомков и вызывает callback для каждого функционального компонента
 */
function traverseFunctionalComponents(
    children: ReactNode,
    callback: (element: ReactElement) => void
): void {
    React.Children.forEach(children, (child) => {
        if (!child) return;

        // Проверяем, что это React-элемент
        if (React.isValidElement(child)) {
            // Проверяем, является ли он функциональным компонентом
            if (isFunctionalComponent(child)) {
                callback(child);
            }

            // props может быть {}, но children — опциональное поле
            const childProps = child.props as { children?: ReactNode };

            // Рекурсивно обходим вложенные children, если они есть
            if ('children' in childProps && childProps.children != null) {
                traverseFunctionalComponents(childProps.children, callback);
            }
        }
    });
};

export default traverseFunctionalComponents;
