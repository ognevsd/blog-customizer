import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { fontFamilyOptions } from 'src/constants/articleProps';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);
	const formContainer = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutsideForm = (event: MouseEvent) => {
			if (
				formContainer.current &&
				!formContainer.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideForm);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideForm);
		};
	}, []);

	const openStyle = isOpen ? styles.container_open : null;

	// Handlers
	const handleClick = () => {
		setOpen(!isOpen);
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.warn('Form submitted');
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} handleClick={handleClick} />
			<aside className={cn(styles.container, openStyle)} ref={formContainer}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select selected={null} options={fontFamilyOptions} title='Шрифт' />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
