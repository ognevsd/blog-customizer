import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
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
	setArticleStyleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: TArticleProps) => {
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
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
		props.setArticleStyleState(formState);
	};

	const handleReset = () => {
		props.setArticleStyleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleOptionChange =
		(changedParam: keyof ArticleStateType) => (selected: OptionType) => {
			setFormState({ ...formState, [changedParam]: selected });
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} handleClick={handleClick} />
			<aside className={cn(styles.container, openStyle)} ref={formContainer}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeOptions'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOptionChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
