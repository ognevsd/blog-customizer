import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
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
import { Separator } from '../separator';

type TArticleProps = {
	fontFamily: OptionType;
	setFontFamily: Dispatch<SetStateAction<OptionType>>;
	fontSize: OptionType;
	setFontSize: Dispatch<SetStateAction<OptionType>>;
	fontColor: OptionType;
	setFontColor: Dispatch<SetStateAction<OptionType>>;
	bgColor: OptionType;
	setBgColor: Dispatch<SetStateAction<OptionType>>;
	contentWidth: OptionType;
	setContentWidth: Dispatch<SetStateAction<OptionType>>;
	handleReset: () => void;
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

	return (
		<>
			<ArrowButton isOpen={isOpen} handleClick={handleClick} />
			<aside className={cn(styles.container, openStyle)} ref={formContainer}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						title='Шрифт'
						selected={props.fontFamily}
						options={fontFamilyOptions}
						onChange={props.setFontFamily}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeOptions'
						selected={props.fontSize}
						options={fontSizeOptions}
						onChange={props.setFontSize}
					/>
					<Select
						title='Цвет шрифта'
						selected={props.fontColor}
						options={fontColors}
						onChange={props.setFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={props.bgColor}
						options={backgroundColors}
						onChange={props.setBgColor}
					/>
					<Select
						title='Ширина контента'
						selected={props.contentWidth}
						options={contentWidthArr}
						onChange={props.setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
