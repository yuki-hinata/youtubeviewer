import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import Typography from '~/components/atoms/Typography'
import Paperbtn from '~/components/atoms/PaperButton'

const Root = styled.div`
width: 100%;
padding: 10px;
box-sizing: border-box;
`;

const Title = styled(Typography)`
margin: 4px 0 10px;
`;

//showalldescriptionがfalseの時-webkit~が表示され、省略表示。
const Description = styled(Typography)`
display: -webkiit-box;
margin-top: 10px;
height: fit-content;
overflow: hidden;
text-overflow: ellipsis;
${({ showAllDescription }) => !showAllDescription && '-webkit-line-clamp: 3'};
-webkit-box-orient: vertical;
white-space: pre-wrap;
`;

export const Videoinfo = ({
    title,
    description,
    publishedAt,
    viewCount,
}) => {
    const [showAllDescription, setShowAllDescription] = useState(false)
    return(
        <Root>
            <Title size='subtitle' bold>{title}</Title>
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
    title: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const Videocontainer = ({
    item :{
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
    title,
    viewCount,
    publishedAt: moment(publishedAt).format('YYYY/MM/DD'),
    description,
}))

Videocontainer.propTypes = {
    item: PropTypes.shape({
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