import styled, { css } from 'styled-components';
import Link from 'next/link';

export const Button = styled.a`
	color: #303030;
	cursor: pointer;
	background-color: #f0f0f0;
	padding: 9px 17px;
	font-size: 16px;
	transition: .4s;
	text-align: center;
	border-radius: 3px;
	&:hover {
		text-decoration: none;
		color: #303030;
		background-color: #c5c5c5;
	};
`;

export const FormButton = styled.input`
	color: #f0f0f0;
	background-color: #ff5050;
	padding: 9px 17px;
	font-size: 16px;
	transition: .4s;
	text-align: center;
	border-radius: 3px;
	border: none;
    outline:none;
	&:hover {
		text-decoration: none;
		background-color: #c13e3e;
	};
	${props => props.disabled && css`
		background-color: #bbb;
		color: #545454;
		&:hover {
			background-color: #bbb;
		};
	`}
`;

export const CustomButton = styled.button`
	color: #303030;
	background-color: #f0f0f0;
	padding: 9px 17px;
	font-size: 16px;
	transition: .4s;
	text-align: center;
	border-radius: 3px;
	border: none;
	&:hover {
		text-decoration: none;
		color: #303030;
		background-color: #c5c5c5;
	};
	${props => props.primary && css`
		background-color: #ff5050;
		color: #f0f0f0;
		&:hover {
			text-decoration: none;
			color: #f0f0f0;
			background-color: #c13e3e;
		};
	`}
`;

export const CustomIconButton = styled.button`
	background-color: #f0f0f0;
	padding: 9px 12px;
	transition: .4s;
	text-align: center;
	border-radius: 3px;
	border: none;
	&:hover {
		text-decoration: none;
		color: #303030;
		background-color: #c5c5c5;
	};
	${props => props.primary && css`
		background-color: #ff5050;
		&:hover {
			text-decoration: none;
			background-color: #c13e3e;
		};
	`}
	${props => props.rounded && css`
		border-radius: 50%;
	`}
	${props => props.bgColor && css`
		background-color: ${props.bgColor};
	`}
	${props => props.color && css`
		color: ${props.color};
	`}
`;
