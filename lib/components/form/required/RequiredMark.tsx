import React from 'react';
import { Asterisk } from '../../icons';
import './RequiredMark.css';

export interface RequiredMarkProps {
    required?: boolean | null;
}

const RequiredMark: React.FC<RequiredMarkProps> = ({ required = false }) => {
    if(!required) return null;
    return (
        <span className='RequiredMark'>
            <Asterisk/>
        </span>
    );
};

export default RequiredMark;
