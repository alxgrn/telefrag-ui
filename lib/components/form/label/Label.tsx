import React, { FC, PropsWithChildren } from 'react';
import RequiredMark from '../required/RequiredMark';
import './Label.css';

export type LabelProps = {
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    label?: string | null;
    error?: boolean | null;
    disabled?: boolean | null;
    required?: boolean | null;
    passive?: boolean; // флаг того что вместо тега label надо использовать div
};

const Label: FC<PropsWithChildren<LabelProps>> = ({ label, top, bottom,
                    required = false, error = false, disabled = false, children, passive = false }) => {

    const className = (name?: string) => {
        let c = name ?? '';
        if(error) c += ' Error';
        if(disabled) c += ' Disabled';
        return c;
    };

    if (passive) return (
        <div className={className('LabelWrap')}>
            {label &&
            <div className='Label'>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </div>}
            {top && <div className='Top'>{top}</div>}
            {children}
            {bottom && <div className='Bottom'>{bottom}</div>}
        </div>
    );

    return (
        <label className={className()}>
            {label &&
            <div className='Label'>
                <RequiredMark required={required}/>
                <span>{label}</span>
            </div>}
            {top && <div className='Top'>{top}</div>}
            {children}
            {bottom && <div className='Bottom'>{bottom}</div>}
        </label>
    );
};

export default Label;
