import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import FavoriteButton from '~/components/molecules/FavoriteButton'
import Typography from '~/components/atoms/Typography'
import Paperbtn from '~/components/atoms/PaperButton'

const Root = styled.div`
width: 100%;
padding: 10px;
box-sizing: border-box;
`;

const TitleWrapper = styled.div`
display: flex;
align-items: flex-start;
`;

const Title = styled(Typography)`
margin: 4px 0 10px;
flex-grow: 1;
`;

const StyledFavoriteButton = styled(FavoriteButton)`
flex-shrink: 0;
`;

//showalldescriptionがfalseの時-webkit~が表示され、省略表示。
const Description = styled(Typography)`
display: -webkit-box;
margin-top: 10px;
height: fit-content;
overflow: hidden;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
${({ showAllDescription }) => !showAllDescription && '-webkit-line-clamp: 3'};
white-space: pre-wrap;
`;

export const Videoinfo = ({
    videoId,
    title,
    description,
    publishedAt,
    viewCount,
}) => {
    const [showAllDescription, setShowAllDescription] = useState(false)
    return(
        <Root>
            <TitleWrapper>
            <Title size='subtitle' bold>{title}</Title>
            <StyledFavoriteButton videoId={videoId} />
            </TitleWrapper>
            <Typography size='xs' color='gray'>
                {viewCount}
                回視聴・
                {publishedAt}
            </Typography>
            <Description showAllDescription={showAllDescription}>
                {description}
            </Description>
            {/* もっとミルを押すとshowalldescriptionのtrue/falseを変化、 */}
            <Paperbtn
            onClick={() => setShowAllDescription(!showAllDescription)}>
                {showAllDescription ? '一部を表示' : 'もっと見る'}
            </Paperbtn>
        </Root>
    );
}

Videoinfo.propTypes = {
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const Videocontainer = ({
    item :{
        id: videoId,
        snippet: {
            publishedAt,
            title,
            description,
        },
        statistics: {
            viewCount,
        },
    },
    presenter,
}) => (presenter({
    videoId,
    title,
    viewCount,
    publishedAt: moment(publishedAt).format('YYYY/MM/DD'),
    description,
}))

Videocontainer.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        snippet: PropTypes.shape({
            publishedAt: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
        statistics: PropTypes.shape({
            viewCount: PropTypes.string,
        }),
    }),
    presenter: PropTypes.func.isRequired,
};

export default (props) => (
    <Videocontainer
    presenter={Videoinfo}
    {...props}
    />
);