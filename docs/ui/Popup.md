# Popup
Вспомогательный компонент для отображения всплывающей плашки. Используется для `Menu` и [DatePicker](../DatePicker.md) в компоненте [Date](../Date.md), но может применяться для любых элементов, которые надо отобразить поверх интерфейса относительно родительского компонента.

Родительский компонент, как правило, это элемент интерфейса при клике на который происходит вызов всплывающего компонента. К примеру, это может быть кнопка вызова меню.

`Popup` позиционируется одним из способов:
1. Относительно родительского копонента. Позиционирование может быть явно указано или определяться автоматически на основе расположения родителя относительно центра экрана.

```ts
export type PopupPropsParent = {
    x?: never;
    y?: never;
    parent: HTMLElement;
    isOpen: boolean;
    onClose: () => void;
    margin?: string;
    vertical?: 'auto'|'top'|'bottom'|'inner-top'|'inner-bottom';
    horizontal?: 'auto'|'left'|'right'|'inner-left'|'inner-right';
    maxHeight?: 'auto'|'none';
    width?: 'auto'|'parent';
    position?: 'absolute'|'fixed';
};
```
2. Относительно координат на экране.

```ts
export type PopupPropsPosition = {
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
    margin?: string;
    vertical?: 'auto'|'top'|'bottom';
    horizontal?: 'auto'|'left'|'right';
    maxHeight?: 'auto'|'none';
    position?: 'absolute'|'fixed';
    parent?: never;
    width?: never;
};
```


## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|x|number||x - координата в окне|
|y|number||y - координата в окне|
|parent|HTMLElement||Родитель|
|isOpen|boolean||Флаг показа|
|onClose|() => void||Обработчик закрытия|
|margin?|string|0|Отступ от родителя в css-юнитах
vertical?|'auto'\|'top'\|'bottom'\|'inner-top'\|'inner-bottom'|'auto'|Позиционирование по вертикали
horizontal?|'auto'\|'left'\|'right'\|'inner-left'\|'inner-right'|'auto'|Позиционирование по горизонтали
maxHeight?|'auto'\|'none'|'none'|Максимальная высота
width?|'auto'\|'parent'|'auto'|Ширина
position?|'absolute'\|'fixed'|'absolute'|Будет ли компонент скроллиться вместе с документом или нет

При автоматическом позиционировании выбирается наибольшое расстояние от границы родителя или от точки позиционирования до границы экрана и компонент помещается в соответствующий квадрант.

При указании `maxHeight='auto'` высота компонента будет ограничена так, чтобы он помещался в экран. Если высота компонента при этом будет уменьшена, то добавится скроллинг.

При указании `width='parent'` ширина компонента будет равна ширине родителя.
