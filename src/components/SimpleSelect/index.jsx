/* eslint indent: "off" */
import styled from 'styled-components';

const MySelect = styled.select`
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

const SimpleSelectArea = styled.div`
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

function SimpleSelect({
    forwardRef,
    iconPosition,
    icon,
    items,
    placeholder,
    ...props
}) {
    const renderItems = items.map((item, key) => (
        <option value={key+1} key={key+1} >{item.value}</option>
    ));

    return (
        <SimpleSelectArea>
            <SimpleInputIcon>{icon}</SimpleInputIcon>
            <MySelect {...props} ref={forwardRef}>
                <option value={0} key={0} >{placeholder}</option>
                {renderItems}
            </MySelect>
        </SimpleSelectArea>
    );
}

export default SimpleSelect;
