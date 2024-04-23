import arrow from 'src/images/arrow.svg';

import cn from 'classnames';

import styles from './ArrowButton.module.scss';
import { FC } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonParams {
	isOpen?: boolean;
	handleClick?: OnClick;
}

export const ArrowButton: FC<ArrowButtonParams> = ({ isOpen, handleClick }) => {
	const openStyle = isOpen ? styles.container_open : null;
	const arrowOpenStyle = isOpen ? styles.arrow_open : null;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={cn(styles.container, openStyle)}
			onClick={handleClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={cn(styles.arrow, arrowOpenStyle)}
			/>
		</div>
	);
};
