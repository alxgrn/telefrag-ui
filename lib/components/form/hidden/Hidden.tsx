import React from 'react';

export interface HiddenProps {
    id: string;
    value: string | number;
    required?: boolean;
    //__TYPE?: 'Hidden';
};

const Hidden: React.FC<HiddenProps> = ({ id, value, required }) => (
    <input
        id={id}
        type='hidden'
        value={value}
        required={required}
    />
);
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
// Hidden.defaultProps = {
//     __TYPE: 'Hidden',
// };

export default Hidden;
