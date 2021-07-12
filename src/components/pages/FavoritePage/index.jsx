import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import FavoriteContext from '~/contexts/FavoriteContext'
import VideosListTemplate from '~/components/templates/VideoListTemplate'
import Header from '~/components/organisms/Header'
import VideoList from '~/components/organisms/VideoList'
import Typography from '~/components/atoms/Typography'

const Subtitle = styled(Typography).attrs({ size: 'title'})`
 margin-top: 10px;
 `;

 export const FavoritePagepresenter = ({
     videos,
     loading,
 }) => (
     <VideosListTemplate
     headerContents={<Header />}
     titleContents={(
         <Subtitle size='title'>お気に入り動画</Subtitle>
     )}
     videosListContents={<VideoList videos={videos} loading={loading} />}
     />
 )

 FavoritePagepresenter.propTypes = {
     videos: VideoList.propTypes.videos,
     loading: Proptypes.bool,
 };

 FavoritePagepresenter.defaultProps = {
     videos: [],
     loading: false,
 }

 const FavoritePageContainer = ({
     api,
     presenter,
 }) => {
     //コンテクストを使ってお気に入り動画のiDを取得。
     const { state: { ids, initialized } } = useContext(FavoriteContext);
     const [videos, setVideos] = useState();
     const [loading, setLoading ] = useState(false)

     const getVideos = async () => {
         setLoading(true)
         const {
             data: {
                 items,
             },
         } = await api.getFavoriteVideos()
         setVideos(items);
         setLoading(false);
     }

     useEffect (() => {
         if(!initialized){
             return;
         }
         getVideos()
     }, [ids])

     return presenter({
         videos,
         loading,
     })
 }

 FavoritePageContainer.propTypes = {
     api: PropTypes.shape({
         getFavoriteList: PropTypes.func,
     }),
     presenter: PropTypes.func.isRequired,
 };

 FavoritePageContainer.defaultProps = {
     api: {
         getFavoriteVideos: () => axios.get('/api/videos/favorites'),
     },
 };

 export default (props) => (
     <FavoritePageContainer
     presenter={FavoritePagepresenter}
     {...props}
     />
 )