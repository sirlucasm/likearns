/* eslint indent: "off" */
import styled from 'styled-components';

const MyInput = styled.input`
    outline: none;
    border: 1.75px solid #b9b9b9;
    border-radius: 4px;
    padding: ${props => props.icon ? (props.iconPosition === 'right' ? '7px 34px 7px 7px' : '7px 7px 7px 28px') : '7px 7px 7px 14px'};
    font-size: 15px;
    transition: .2s;
    width: 100%;
	&:hover {
        border: 1.75px solid #5c5c5c;
    };
    &:focus {
        border: 1.75px solid #5c5c5c;
    };
`;

const SimpleInputArea = styled.div`
	margin: 8px 0;
	position: relative;
`;

const SimpleInputIcon = styled.div`
	position: absolute;
	top: 4px;
	left: ${props => props.iconPosition === 'left' || !props.iconPosition ? '7px' : 'auto'};
	right: ${props => props.iconPosition === 'right' ? '12px' : 'auto'};
	width: 17px !important;
	font-size: 18px;
`;

function SimpleInput({
    forwardRef,
    iconPosition,
    icon,
    ...props
}) {
    return (
        <SimpleInputArea>
            <SimpleInputIcon iconPosition={iconPosition}>{icon}</SimpleInputIcon>
            <MyInput {...props} ref={forwardRef} />
        </SimpleInputArea>
    );
}

export default SimpleInput;
