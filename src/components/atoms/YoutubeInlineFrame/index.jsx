import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Inline = styled.iframe`
position: absolute;
top: 0;
right: 0;
width: 100%;
height: 100%;
border: none;
`;

const YoutubeInline = ({
    className,
    videoId,
}) => (
    <Inline 
        className={className}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allowFullScreen={0}
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picuture-in-picuture'
        />
);

YoutubeInline.propTypes = {
    className: PropTypes.string,
    videoId: PropTypes.string.isRequired,
}
 
YoutubeInline.defaultProps = {
    className: '',
}

export default YoutubeInline;