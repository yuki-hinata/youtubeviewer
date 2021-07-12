import React,{ useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useOnScrollEnd from '~/utils/useOnScrollEnd';

const Root = styled.div`
width: 100%;
height: 100%;
`;

const HeaderWrapper = styled.div`
max-width: 720px;
margin: auto;
border-bottom: 1px solid #ccc;
`;

const TitleWrapper = styled.div`
max-width: 720px;
margin: auto;
`;

const SearchWrapper = styled.div`
max-width: 720px;
margin: auto;
`;

const VideosListWrapper = styled.div`
max-width: 720px;
margin: auto;
`;

const VideosListTemplate = ({
    headerContents,
    titleContents,
    searchFormContents,
    videosListContents,
    onScrollEnd,
}) => {
    //?????
    useOnScrollEnd(onScrollEnd)
    return(
        <Root>
            <HeaderWrapper>
                {headerContents}
            </HeaderWrapper>
            <TitleWrapper>
                {titleContents}
            </TitleWrapper>
            <SearchWrapper>
                {searchFormContents}
            </SearchWrapper>
            <VideosListWrapper>
                {videosListContents}
            </VideosListWrapper>
        </Root>
    )
}

VideosListTemplate.propTypes = {
    headerContents: PropTypes.node,
    titleContents: PropTypes.node,
    searchFormContents: PropTypes.node,
    videosListContents: PropTypes.node.isRequired,
    onScrollEnd: PropTypes.func,
}

VideosListTemplate.defaultProps = {
    headerContents: null,
    titleContents: null,
    searchFormContents: null,
    onScrollEnd: null,
}

export default VideosListTemplate;