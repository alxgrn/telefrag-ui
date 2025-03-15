import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import Label from '../label/Label';
import { Icons } from '../../../main';
import './Image.css';

export interface FilesProps {
    id: string;
    image?: File;
    text?: React.ReactNode; // текст для размещения в центре
    label?: string | null;
    placeholder?: string | null; // УРЛ предыдущей картинки
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    onChange: (image?: File) => void;
    accept?: string | null;
    required?: boolean | null;
    disabled?: boolean | null;
}

export const Image: FC<FilesProps> = ({ id, image, text, onChange, accept, top, bottom, label,
                                        placeholder, required = false, disabled = false }) => {

    const [ error, setError ] = useState(false);
    const [ style, setStyle ] = useState<React.CSSProperties|undefined>(undefined);

    useEffect(() => {
        if(required && !image) setError(true); else setError(false);
    }, [ image, required ]);

    useEffect(() => {
        setStyle(undefined);
        if (image) {
            const fr = new FileReader();
            fr.onload = function () { setStyle({ backgroundImage: `url(${this.result}`}); };
            fr.readAsDataURL(image);
            return;
        }
        if (placeholder) setStyle({ backgroundImage: `url(${placeholder}`});
    }, [ placeholder, image ]);

    const doFileChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files as FileList);
        onChange(files[0]);
    };

    const onRemove = (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange();
    };

    return (<div className='FormItem'>
        <Label
            top={top}
            bottom={bottom}
            label={label}
            required={required}
            disabled={disabled}
            error={error}
            passive
        >
            <div
                className={`ImageLabel ${disabled ? 'Disabled' : ''} ${error ? 'Error' : ''}`}
                style={style}
            >
                {(text && !style) && text}
                {image && <div className='ImageRemove' onClick={onRemove}><Icons.Trash/></div>}
                <label>
                    <input
                        id={id}
                        type='file'
                        accept={accept ?? 'image/*'}
                        onChange={e => doFileChange(e)}
                        disabled={disabled ? true : false}
                    />
                </label>
            </div>
        </Label>
    </div>);
}

export default Image;
