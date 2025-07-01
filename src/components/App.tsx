//вынесен в отдельный файл из index
import styles from '../styles/index.module.scss';

import { CSSProperties, useState } from 'react';

import { defaultArticleState } from '../constants/articleProps';

import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import { Article } from '../components/article/Article';

export const App = () => {
	const [articleProps, setArticleProps] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleProps.fontFamilyOption.value,
					'--font-size': articleProps.fontSizeOption.value,
					'--font-color': articleProps.fontColor.value,
					'--container-width': articleProps.contentWidth.value,
					'--bg-color': articleProps.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApplySettings={setArticleProps}
				initialSettings={articleProps}
			/>
			<Article />
		</main>
	);
};
