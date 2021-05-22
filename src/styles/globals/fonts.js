import { css } from 'styled-components';

import ButlerRegular from '../../assets/fonts/ButlerRegular.otf';
import Timeless from '../../assets/fonts/Timeless.ttf';

export const Fonts = css`
	@font-face {
		font-family: "Butler";
		src: url(${ButlerRegular}) format("otf");
	}

	@font-face {
		font-family: "Timeless";
		src: url(${Timeless}) format("ttf");
	}
`;
