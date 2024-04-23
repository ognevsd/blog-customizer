import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);

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
			<aside className={cn(styles.container, openStyle)}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
