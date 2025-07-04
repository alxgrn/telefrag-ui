import React, { useEffect, useState, ReactNode, ReactElement, PropsWithChildren } from 'react';
import { deepForEach } from 'react-children-utilities';
import { isValidDate } from '../date/Date';
import { RadioListOption } from '../radio/RadioList';
import { Select, SelectOption } from '../select/Select';
import { CheckboxListOption, CheckboxListValue } from '../checkbox/CheckboxList';
import Button, { ButtonType } from '../button/Button';
import { Hidden, Checkbox, Input, RadioList, Files, Image, Date, CheckboxList, Time, Block } from '../../../main';
import './Form.css';

export type FormProps = {
    info?: string | null;
    error?: string | null;
    success?: string | null;
    submit?: string | null;
    cancel?: string | null;
    submitType?: ButtonType;
    cancelType?: ButtonType;
    wide?: boolean | null;
    onSubmit?: (d: FormData) => void;
    onCancel?: () => void;
}

export type FormData = {
    [i: string]: string | number | boolean | File | File[] | any[];
};

export const Form: React.FC<PropsWithChildren<FormProps>> = ({ info, error, success, submit, cancel,
                                                        submitType = 'Accent', cancelType = 'Error',
                                                        wide, onSubmit, onCancel, children }) => {
    const [ disabled, setDisabled ] = useState(false);
    // Если выводим кнопку сабмита, то проверяем все ли данные введены для required полей.
    // Подробности про props.__TYPE описаны тут:
    // https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
    // ВНИМАНИЕ: Этот метод устарел т.к. скоро defaultProps перестанут поддерживать!
    //           Поэтому переписали перебор с фильтрацией не по __TYPE а по функции компонента
    useEffect(() => {
        if(!submit) return;
        setDisabled(false);
        deepForEach(children, (child: ReactNode) => {            
            if (!child) return;
            const element = child as ReactElement;
            if (typeof element.type !== 'function') return; // Игнорируем все, кроме функциональных компонентов
            const props = element.props as any;
            if (!props.required) return; // Проверяем только компоненты в которых ввод обязателен
            // Обрабатываем только известные нам компоненты
            switch(element.type) {
                case Input:
                    // Значение должно быть непустой строкой
                    if(!(props.value as string).trim()) setDisabled(true);
                    break;
                case Checkbox:
                    // Чекбокс должен быть отмечен
                    if(!(props.checked as boolean)) setDisabled(true);
                    break;
                case Select: {
                    // Среди списка опций должна быть опция с указанным значением
                    const value = props.value as string;
                    const options = props.options as SelectOption[];
                    if(options.findIndex(a => a.value === value) < 0) setDisabled(true); }
                    break;
                case RadioList: {
                    // Среди списка опций должна быть опция с указанным значением
                    const value = props.value as string;
                    const options = props.options as RadioListOption[];
                    if(options.findIndex(a => a.value === value) < 0) setDisabled(true); }
                    break;
                case Files:
                    // Должен быть выбран хотя бы один файл
                    const files = props.files as File[];
                    if(files.length < 1) setDisabled(true);
                    break;
                case Image:
                    // Файл картинки должен быть выбран
                    const image = props.value as File;
                    if (!image) setDisabled(true);
                    break;
                case Date:
                    // Дата должна быть валидна
                    if(!isValidDate((props.value as string).trim())) setDisabled(true);
                    break;
                case CheckboxList: {
                    // Должен быть выбран хотя бы один чекбокс
                    const options = props.options as CheckboxListOption[];
                    if(options.findIndex(a => a.checked === true) < 0) setDisabled(true); }
                    break;
                default:
                    break;
            }
        });
    }, [ children, submit ]);

    const onClick = () => {
        if(!onSubmit) return;
        const data: FormData = {};

        // Мы добавляем даные по идентификатору.
        // Если идентификатор повторяется, то мы создаем массив значений.
        const addData = (id: string, value: string|number|boolean|File|File[]|CheckboxListValue[]) => {
            if(!data[id]) {
                data[id] = value;
                return;
            }
            if(data[id] instanceof Array) {
                (data[id] as any[]).push(value);
            } else {
                data[id] = [ data[id], value ];
            }
        };

        deepForEach(children, (child: ReactNode) => {
            if (!child) return;
            const element = child as ReactElement;
            if (typeof element.type !== 'function') return; // Игнорируем все, кроме функциональных компонентов
            const props = element.props as any;
            // Обрабатываем только известные нам компоненты
            switch(element.type) {
                case Date:
                case Time:
                case Input:
                    addData(props.id, (props.value as string).trim());
                    break;
                case Checkbox:
                    addData(props.id, props.checked as boolean ? props.value : undefined);
                    break;
                case Select: 
                case RadioList:
                    addData(props.id, props.value as string);
                    break;
                case Files:
                    addData(props.id, props.files as File[]);
                    break;
                case Image:
                    addData(props.id, props.value as File);
                    break;
                case Hidden:
                    addData(props.id, props.value as string | number);
                    break;
                case CheckboxList: {
                    const value: CheckboxListValue[] = [];
                    const options = props.options as CheckboxListOption[];
                    options.forEach(o => { if(o.checked) value.push(o.value); });
                    addData(props.id, value); }
                    break;
                default:
                    break;
            }            
        });
        onSubmit(data);
    };

    return (
        <div className={wide ? 'Form FormWide' : 'Form'}>
            {success && <Block type='Success'>{success}</Block>}
            {error && <Block type='Error'>{error}</Block>}
            {info && <Block>{info}</Block>}
            {children}
            {(submit || cancel) &&
            <div className='FormSubmitButtons'>
                {submit &&
                <Button
                    type={submitType}
                    label={submit}
                    disabled={disabled}
                    onClick={onClick}
                />}
                {cancel &&
                <Button
                    type={cancelType}
                    label={cancel}
                    onClick={onCancel}
                />}
            </div>}
        </div>
    );
}

export default Form;
