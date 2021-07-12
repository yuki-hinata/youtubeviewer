import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideosListItem from '~/components/organisms/VideoListItem';
import Spinner from '~/components/atoms/Spinner';
import Typography from '~/components/atoms/Typography';

const StyledVideosListItem = styled(VideosListItem)`
  margin-top: 10px;
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const VideoList = ({
    loading,
    videos,
    withFavoriteButton,
}) => (
    <>
        {!loading && !videos.length && <Typography>ビデオがありません</Typography>}
        {videos.map((video) => (
            <StyledVideosListItem 
            key={video.id} 
            video={video}
            withFavoriteButton={withFavoriteButton} 
            />
        ))}
        {loading && <Loading><Spinner /></Loading>}
    </>
)

VideoList.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    withFavoriteButton: PropTypes.bool,
}

VideoList.defaultProps = {
    videos: [],
    loading: false,
    withFavoriteButton: false,
}

export default VideoList;