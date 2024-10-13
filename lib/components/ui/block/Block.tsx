/**
 * Блок текста с подсветко и окантовкой
 */
import React, { PropsWithChildren } from 'react';
import './Block.css';

export type BlockType = 'Error'|'Success'|'Accent'|'Default';
export type BlockProps = {
    type?: BlockType;
    className?: string;
};

const Block: React.FC<PropsWithChildren<BlockProps>> = ({ children, type = 'Default', className }) => {
    return (
        <div className={className ? `Block ${type} ${className}` : `Block ${type}`}>
            {children}
        </div>
    );
};

export default Block;
