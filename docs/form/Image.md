# Image
Компонент для выбора картинки.

Выбранная картинка сразу отображается в компоненте ещё до отправки на сервер.
Для удаления выбора надо кликнуть на иконку с мусоркой.

```jsx
const [ image, setImage ] = useState<File|undefined>(undefined);
return(
    <Form>
        <Image
            id='image'
            image={image}
            onChange={setImage}
            text={<span><Icon.Image/><br/>Выберите изображение</span>}
            required
            label='Обложка'
            bottom='Выберите файл'
            placeholder='https://telefrag.hb.bizmrg.com/cover/d3cbfb168e7a1fcf.jpeg'
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|image|File||Выбранное изображение|
|onChange|(image?: File) => void||Обработчик выбора|
|label?|string \| null||Название блока ввода|
|text|React.ReactNode||Текст для размещения в центре|
|top?|string \| null \| React.ReactNode||Текст над элементом ввода|
|bottom?|string \| null \| React.ReactNode||Текст под элементом ввода|
|accept?|string \| null|`image/*`|Фильтр разрешенных для выбора типов файлов|
|required?|boolean \| null|`false`|Флаг обязательности для заполнения|
|disabled?|boolean \| null|`false`|Флаг запрета выбора|
|placeholder?|string \| null||URL изображения|

## Особенности
Для отображения ранее загруженной картинки можно указать её URL через поле `placeholder`.

Сейчас компонент занимает всю ширину внешнего блока и имеет соотношение сторон 16x9.