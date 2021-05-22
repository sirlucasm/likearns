import { createGlobalStyle } from 'styled-components';
// import { Fonts } from './fonts';

const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		background-color: #f0f0f0;

		::-webkit-scrollbar {
			width: 11px;
			height: 11px;
		}
		::-webkit-scrollbar-button {
			width: 0px;
			height: 0px;
		}
		::-webkit-scrollbar-thumb {
			background: #787878;
			border: 0px none #ffffff;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #787878;
		}
		::-webkit-scrollbar-thumb:active {
			background: #636363;
		}
		::-webkit-scrollbar-track {
			background: #d4d4d4;
			border: 0px none #ffffff;
		}
		::-webkit-scrollbar-track:hover {
			background: #d4d4d4;
		}
		::-webkit-scrollbar-track:active {
			background: #d4d4d4;
		}
		::-webkit-scrollbar-corner {
			background: transparent;
		}
	}
  	*, ::after, ::before {
    	box-sizing: border-box;
	}
	a { transition: .2s; }
	a:hover { text-decoration: none; }
	button { outline: none; }
	button:focus { outline: none; }

	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
		-webkit-appearance: none; 
		margin: 0; 
	}

	.show-pass-btn {
		color: #8ea0ff;
		cursor: pointer;
		font-size: 13.2px;
		margin-bottom: 13px;
	}
	.show-pass-btn:hover {
		color: #5873fc;
	}
`;

export default GlobalStyles;
