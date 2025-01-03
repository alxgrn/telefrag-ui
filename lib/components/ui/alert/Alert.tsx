import React from 'react';
import Message, { MessageIconType } from '../message/Message';
import Modal from '../modal/Modal';
import Form from '../../form/form/Form';
import { ButtonType } from '../../form/button/Button';

export interface AlertProps {
	icon?: string | null;
	type?: MessageIconType;
	title?: string | null;
	message: string | React.ReactNode;
	close?: string;
	closeType?: ButtonType;
    isOpen: boolean;
    onClose: () => void;
}

const CLOSE = 'Ok';

const Alert: React.FC<AlertProps> = ({ icon, type, title, message, close, closeType, isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Message
				icon={icon}
				title={title}
				message={message}
				type={type}
			/>
			<Form
				submit={close ?? CLOSE}
				submitType={closeType}
				onSubmit={onClose}
			/>
		</Modal>
	);
};

export default Alert;
