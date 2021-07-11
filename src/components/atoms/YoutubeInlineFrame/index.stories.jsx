import React from 'react'
import styled from 'styled-components'

import YoutubeInline from '.'

const Wrapper = styled.div`
position: relative;
width: 560px;
height: 315px;
`;

export default { title: 'atoms/YoutubeInlineFrame' }

export const inlineFrame = () => (
    <Wrapper>
        <YoutubeInline
        videoId='39m7aKAT170'
        />
    </Wrapper>
)