/**
 * Шапка страницы
 * Отображает логотип, обложку, основную информацию и кнопки управления
 */
import { FC, MouseEvent, ReactNode } from "react";
import { Image, Trash } from "../icons";
import { Button } from "../../main";
import './PageHeader.css';

type Props = {
    menu?: ReactNode;
    title?: string;
    subtitle?: string;
    logo?: string;
    back?: string;
    admin?: boolean;
    square?: boolean;
    onLogoClick?: () => void;
    onBackClick?: () => void;
    onLogoCreate?: () => void;
    onBackCreate?: () => void;
    onLogoRemove?: () => void;
    onBackRemove?: () => void;
    onShowSidebar?: () => void;
};

const PageHeader: FC<Props> = ({ menu, title, subtitle, logo, back, admin, square,
                                 onLogoClick, onLogoCreate, onLogoRemove,
                                 onBackClick, onBackCreate, onBackRemove,
                                 onShowSidebar }) => {

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
                {admin && onBackCreate && <div className='PageHeaderBackCreate' onClick={e => onClick(e, onBackCreate)}><Image/></div>}
                {admin && onBackRemove && <div className='PageHeaderBackRemove' onClick={e => onClick(e, onBackRemove)}><Trash/></div>}
            </div>
			<div className='PageHeaderAbout'>
				<div className='PageHeaderInfo'>
                    <div className='PageHeaderTitle one-line'>{title}</div>
                    <div className='PageHeaderSubtitle one-line'>{subtitle}</div>
				</div>
                {menu && <div className='PageHeaderMenu'>{menu}</div>}
                {onShowSidebar && <div className='PageHeaderShowSidebar'>
                    <Button 
                        label='Ещё...'
                        onClick={onShowSidebar}
                    />
                    </div>}
			</div>
            <div className={square ? 'PageHeaderLogo Square' : 'PageHeaderLogo'}
                onClick={e => onClick(e, onLogoClick)}
                style={{
                    cursor: onLogoClick ? 'pointer' : undefined,
                    backgroundImage: logo ? `url(${logo})` : undefined,
                    borderRadius: square ? undefined : '50%',
                }}
            >
                {admin && onLogoCreate && <div className='PageHeaderLogoCreate' onClick={e => onClick(e, onLogoCreate)}><Image/></div>}
                {admin && onLogoRemove && <div className='PageHeaderLogoRemove' onClick={e => onClick(e, onLogoRemove)}><Trash/></div>}                
            </div>
        </div>
	);
};

export default PageHeader;
