import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import VideosListTemplate from '~/components/templates/VideoPlayerTemplate';
import Header from '~/components/organisms/Header'
import Videoinfo from '~/components/organisms/VideoInfo'
import VideoList from '~/components/organisms/VideoList';
import YoutubeInline from '~/components/atoms/YoutubeInlineFrame'
import Typography from '~/components/atoms/Typography'

const RecommendVideosWrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

export const Playerpresent = ({
  videoId,
  videoData,
  relativeVideos,
  loadingRelatedVideos,
  onScrollEnd,
}) => (
  <VideosListTemplate
  headerContents={<Header />}
  playerContents={<YoutubeInline videoId={videoId} />}
  videoInfoContents={videoData && <Videoinfo item={videoData} />}
  relativeVideosListContents={(
    <RecommendVideosWrapper>
      <Typography variant='subtitle' bold>関連動画</Typography>
      <VideoList videos={relativeVideos} loading={loadingRelatedVideos} />
    </RecommendVideosWrapper>
  )}
  onScrollEnd={onScrollEnd}
  />
)

Playerpresent.propTypes = {
  videoId: PropTypes.string.isRequired,
  relatedVideos: PropTypes.arrayOf(PropTypes.shape({})),
  loadingRelatedVideos: PropTypes.bool,
  videoData: PropTypes.shape({}),
  onScrollEnd: PropTypes.func,
};

Playerpresent.defaultProps = {
  relatedVideos: [],
  loadingRelatedVideos: false,
  videoData: null,
  onScrollEnd: null,
};

//プレゼンテーションナルコンポーネント
export const Playercontain = ({
  api,
  presenter,
}) => {
  const { videoId } = useParams()
  const [videoData, setVideoData] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false)
  const [nextPageToken, setNextPageToken] = useState('') 
    

  const getVideoData = async () => {
    const { data } = await api.getVideoData(videoId)
    setVideoData(data)
    console.log(data)
  }


  const getRelatedVideos = async () => {
    if(loadingRelatedVideos){
      return;
    }

    setLoadingRelatedVideos(true)

    const {
      data: {
        items: videos,

        nextPageToken: newNextPageToken,
      },
    } = await api.getRelatedVideos(videoId, nextPageToken)

    setLoadingRelatedVideos(false)

    setRelatedVideos(relatedVideos.concat(videos.filter(
      ({ id: itemId}) => !relatedVideos.find(({ id }) => id === itemId),
    )))

    setNextPageToken(newNextPageToken)
  }

  useEffect(() => {
    getVideoData();
    getRelatedVideos();
  }, [videoId])

  return presenter({
    videoId,
    videoData,
    relatedVideos,
    loadingRelatedVideos,
    onScrollEnd: getRelatedVideos,
  })
}

Playercontain.propTypes = {
  api: PropTypes.shape({
    getRelatedVideos: PropTypes.func,
    getVideoData: PropTypes.func,
  }),
};

Playercontain.defaultProps = {
  api: {
    getVideoData: (videoId) => axios.get(`/api/videos/${videoId}`),
    getRelatedVideos: (videoId, pageToken = '') => axios.get(`/api/videos/${videoId}/related?pageToken=${pageToken}`),
  },
};

export default (props) => (
  <Playercontain
    presenter={Playerpresent}
    {...props}
  />
);