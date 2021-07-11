import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.button`
appearance: none;
border: 0;
font-size: 14px;
border-radius: 4px;
background: transparent;
color: #8c8c8c;
cursor: pointer;
:hover {
    text-decoration: underline;
}
:focus{
    outline: none;
}
`;

const Paperbtn = ({
    className,
    children,
    type,
    onClick,
}) => (
    <Root 
        className={className}
        type={type}
        onClick={onClick}
        >
        {children}
    </Root>        
)

Paperbtn.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
}

Paperbtn.defaultProps = {
    className: '',
    type: 'button',
    onClick: null,
}

export default Paperbtn