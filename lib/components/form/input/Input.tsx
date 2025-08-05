import React, { FC, useEffect, useRef } from 'react';
import Label from '../label/Label';
import './Input.css';

export type InputProps = {
    id: string;
    type?: 'text' | 'password' | 'textarea';
    value: string;
    onChange: (s: string) => void;
    label?: string | null;
    placeholder?: string | null;
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    required?: boolean | null;
    disabled?: boolean | null;
    limit?: number | null;
    rows?: number | null;
    autoFocus?: boolean;
    autoGrow?: boolean;
    //__TYPE?: 'Input';
};

const Input: FC<InputProps> = ({ id, type = 'text', value, onChange, label, 
                                placeholder, rows = 5, top, bottom, autoFocus = false, autoGrow = false,
                                required = false, disabled = false, limit }) => {

    const ref = useRef<HTMLTextAreaElement>(null);

    // Установим минимальную высоту через стили для подгона высоты
    useEffect(() => {
        if (!autoGrow || !ref.current) return;
        ref.current.style.minHeight = `calc(${rows} * var(--alxgrn-font-size) * var(--alxgrn-line-height))`;
    }, [ rows, ref, autoGrow ]);

    // Подгоняем размер поля ввода под содержание
    useEffect(() => {
        if (!autoGrow || !ref.current) return;
        ref.current.style.height = '0px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
        ref.current.style.overflow = 'hidden';
    }, [ autoGrow, value, ref ]);

    const isError = () => {
        if(required && !value.trim().length) return true; else return false;
    };

    const getStyle = () => {
        if(isError()) return {
            caretColor:'var(--alxgrn-input-caret-error)',
            borderColor:'var(--alxgrn-input-border-error)',
            backgroundColor:'var(--alxgrn-input-bg-error)',
        };
    };

    const doChange = (value: string) => {
        if(limit) value = value.substring(0, limit);
        onChange(value);
    };

    return (
        <div className='FormItem'>
        <Label
            top={top}
            bottom={bottom}
            label={label}
            required={required}
            disabled={disabled}
            error={isError()}
        >

            {/* TEXT or PASSWORD */}
            {(type === 'text' || type === 'password') &&
            <input
                id={id}
                type={type}
                value={value}
                onChange={e => doChange(e.target.value)}
                placeholder={placeholder ?? undefined}
                style={getStyle()}
                disabled={disabled ? true : false}
                autoFocus={autoFocus ? true : false}
            />}

            {/* TEXTAREA */}
            {type === 'textarea' &&
            <textarea
                id={id}
                ref={ref}
                rows={rows ? rows : 5}
                value={value}
                onChange={(e) => doChange(e.target.value)}
                placeholder={placeholder ?? undefined}
                style={getStyle()}
                disabled={disabled ? true : false}
                autoFocus={autoFocus ? true : false}
            />}

        </Label>
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Input.defaultProps = {
//     __TYPE: 'Input',
// }

export default Input;
