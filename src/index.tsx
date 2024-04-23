import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamilyState, setFontFamilyState] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeState, setFontSizeState] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorState, setFontColorState] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColorState, setBackgrounColorState] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidthState, setContentWidthState] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [articleStyleState, setArticleStyleState] = useState({
		fontFamily: fontFamilyState.value,
		fontSize: fontSizeState.value,
		fontColor: fontColorState.value,
		contentWidth: contentWidthState.value,
		bgColor: backgroundColorState.value,
	});

	const handleFormSubmit = () => {
		setArticleStyleState({
			fontFamily: fontFamilyState.value,
			fontSize: fontSizeState.value,
			fontColor: fontColorState.value,
			contentWidth: contentWidthState.value,
			bgColor: backgroundColorState.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyleState.fontFamily,
					'--font-size': articleStyleState.fontSize,
					'--font-color': articleStyleState.fontColor,
					'--container-width': articleStyleState.contentWidth,
					'--bg-color': articleStyleState.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamily={fontFamilyState}
				setFontFamily={setFontFamilyState}
				handleSubmit={handleFormSubmit}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
