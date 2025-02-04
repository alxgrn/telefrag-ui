/**
 * Шапка страницы
 * Отображает логотип, обложку, основную информацию и кнопки управления
 */
import { FC, MouseEvent } from "react";
import { Image, Trash } from "../icons";
import './PageHeader.css';

type Props = {
    title?: string;
    subtitle?: string;
    logo?: string;
    back?: string;
    square?: boolean;
    onLogoClick?: () => void;
    onBackClick?: () => void;
    onLogoCreate?: () => void;
    onBackCreate?: () => void;
    onLogoRemove?: () => void;
    onBackRemove?: () => void;
};

const PageHeader: FC<Props> = ({ title, subtitle, logo, back, square, onLogoClick, onLogoCreate, onLogoRemove, onBackClick, onBackCreate, onBackRemove }) => {

    const onClick = (e: MouseEvent, f?: () => void) => {
        e.stopPropagation();
        if (f) f();
    }

	return (
		<div className='PageHeader'>
			<div className='PageHeaderBack'
                onClick={e => onClick(e, onBackClick)}
                style={{
                    cursor: onBackClick ? 'pointer' : undefined,
                    backgroundImage: back ? `url(${back})` : undefined,
                }}
            >
                {onBackCreate && <div className='PageHeaderBackCreate' onClick={e => onClick(e, onBackCreate)}><Image/></div>}
                {onBackRemove && <div className='PageHeaderBackRemove' onClick={e => onClick(e, onBackRemove)}><Trash/></div>}
            </div>
			<div className='PageHeaderAbout'>
				<div className={square ? 'PageHeaderLogo Square' : 'PageHeaderLogo'}
                    onClick={e => onClick(e, onLogoClick)}
                    style={{
                        cursor: onLogoClick ? 'pointer' : undefined,
                        backgroundImage: logo ? `url(${logo})` : undefined,
                        borderRadius: square ? undefined : '50%',
                    }}
				>
                    {onLogoCreate && <div className='PageHeaderLogoCreate' onClick={e => onClick(e, onLogoCreate)}><Image/></div>}
                    {onLogoRemove && <div className='PageHeaderLogoRemove' onClick={e => onClick(e, onLogoRemove)}><Trash/></div>}                
                </div>
				<div className='PageHeaderDescr'>
                    <div className='PageHeaderTitle one-line'>{title}</div>
                    <div className='PageHeaderSubtitle one-line'>{subtitle}</div>
				</div>
			</div>
        </div>
	);
};

export default PageHeader;
