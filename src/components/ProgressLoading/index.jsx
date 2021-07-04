import React, { useEffect } from 'react';

// imports
import { css } from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from '../../styles/components/ProgressLoading.module.css';

const customStyles = {
	root: {
		width: '100%',
		marginTop: 20,
	},

	progressColor: {
		backgroundColor: '#fff',
		'& .MuiLinearProgressBarColorSecondary': {
			backgroundColor: '#5d5858',
		},
	},
};

export default function ProgressLoader({
	enabled,
	title,
	colorText,
	transparent
}) {

	useEffect(() => {
		const loader = document.querySelector('#loader');
		if (loader) {
			const listener = (e) => {
				if (e.target.id === 'loader') {
					loader.classList.add('clickOutAnimation');
					setTimeout(() => { loader.classList.remove('clickOutAnimation'); }, 800);
				}
				e.preventDefault();
			};
			loader.addEventListener('click', listener, false);
		}
	});

	return (
		enabled ? (
			<div className={transparent ? styles["loader-bg-transparent"] : styles["loader-bg-dark"]}>
				<div className={styles["loader-content"]} id="loader">
					<div className={styles["loader"]}>
						<div className={styles["loader-title"]}>
							<span style={{ color: colorText || '#000' }}>{title}</span>
						</div>
						<div style={customStyles.root}>
							<LinearProgress style={customStyles.progressColor} color="secondary" />
						</div>
					</div>
				</div>
			</div>
		) :	null
	);
}
