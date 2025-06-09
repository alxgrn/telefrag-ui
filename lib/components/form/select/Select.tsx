import React, { useEffect, useRef, useState } from 'react';
import Label from '../label/Label';
import './Select.css';
import { Icons, Menu, MenuItem } from '../../../main';

export interface SelectOption {
    option: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps {
    id: string;
    value: string;
    options: SelectOption[];
    onChange: (b: string) => void;
    label?: string | null;
    top?: string | null;
    bottom?: string | null;
    placeholder?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
    //__TYPE?: 'Select';
}

export const Select: React.FC<SelectProps> = ({ id, value, onChange, label, placeholder,
                                                top, required = false, disabled = false,
                                                bottom, options }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [ items, setItems ] = useState<MenuItem[]>([]);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ innerValue, setInnerValue ] = useState('');

    useEffect(() => {
        let innerValue = '';
        const items = options.map(item => {
            if (item.value === value) innerValue = item.option;
            return {
                id: item.value,
                text: item.option,
                icon: item.value === value ? <Icons.Check/> : <div className='empty'/>
            }
        });
        setItems(items);
        setInnerValue(innerValue);
    }, [ value, options ]);

    const isError = () => {
        if(required) {
            const index = options.findIndex(a => a.value === value);
            if(index < 0) return true;
        }
        return false;
    };

    const getStyle = () => {
        if(isError()) return {
            borderColor:'var(--alxgrn-input-border-error)',
            backgroundColor:'var(--alxgrn-input-bg-error)',
        };
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
                <div className='SelectWrap'>
                    <input
                        id={id}
                        ref={ref}
                        type='text'
                        value={innerValue}
                        style={getStyle()}
                        disabled={disabled ? true : false}
                        onClick={() => setIsOpen(true)}
                        readOnly
                        placeholder={placeholder ?? undefined}
                    />
                    <div className='Icon'>
                        <Icons.ChevronDown/>
                    </div>
                </div>
            </Label>
            {!disabled && ref.current && <Menu
                parent={ref.current}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                horizontal='inner-left'
                margin='var(--alxgrn-unit-small)'
                items={items}
                maxHeight='auto'
                width='parent'
                onClick={i => {
                    setIsOpen(false);
                    onChange(`${i.id}`);
                }}
            />}
        </div>
    );
};
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Select.defaultProps = {
//     __TYPE: 'Select',
// };

export default Select;
