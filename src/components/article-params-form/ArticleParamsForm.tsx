import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import cn from 'classnames';

import styles from './ArticleParamsForm.module.scss';
import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

type TArticleProps = {
	fontFamily: OptionType;
	setFontFamily: Dispatch<SetStateAction<OptionType>>;
	handleReset?: () => void;
	handleSubmit: () => void;
};

export const ArticleParamsForm = (props: TArticleProps) => {
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
		props.handleSubmit();
	};

	// Selection handlers
	const handleFontSelect = (selected: OptionType) => {
		props.setFontFamily(selected);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} handleClick={handleClick} />
			<aside className={cn(styles.container, openStyle)} ref={formContainer}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						selected={props.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontSelect}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
