import { useRef, useState } from 'react';

import classNames from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleSettingsProps = {
	onApplySettings: (settings: ArticleStateType) => void;
	initialSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApplySettings,
	initialSettings,
}: ArticleSettingsProps) => {
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [formState, setFormState] = useState(initialSettings);
	const sidebarRef = useRef(null);

	useOutsideClickClose({
		isOpen: sidebarVisible,
		rootRef: sidebarRef,
		onChange: setSidebarVisible,
	});

	const updateFormValue = <K extends keyof ArticleStateType>(
		key: K,
		newValue: ArticleStateType[K]
	) => {
		setFormState((prev) => ({
			...prev,
			[key]: newValue,
		}));
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApplySettings(formState);
	};

	const handleFormReset = (event: React.FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApplySettings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={sidebarVisible}
				onClick={() => setSidebarVisible((prev) => !prev)}
			/>
			<aside
				className={classNames(
					styles.container,
					sidebarVisible && styles.container_open
				)}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>задайте параметры</h2>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						placeholder={formState.fontFamilyOption.title}
						onChange={(val) => updateFormValue('fontFamilyOption', val)}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(val) => updateFormValue('fontSizeOption', val)}
						title='размер шрифта'
					/>
					<Select
						title='цвет текста'
						options={fontColors}
						selected={formState.fontColor}
						placeholder={formState.fontColor.title}
						onChange={(val) => updateFormValue('fontColor', val)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						placeholder={formState.backgroundColor.title}
						onChange={(val) => updateFormValue('backgroundColor', val)}
					/>
					<Select
						title='ширина блока'
						options={contentWidthArr}
						selected={formState.contentWidth}
						placeholder={formState.contentWidth.title}
						onChange={(val) => updateFormValue('contentWidth', val)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
