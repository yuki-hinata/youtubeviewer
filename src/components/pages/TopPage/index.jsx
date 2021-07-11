import React,{ useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import VideosListTemplate from '~/components/templates/VideoListTemplate';
import Header from '~/components/organisms/Header';
import SearchForm from '~/components/organisms/SearchForm';
import VideoList from '~/components/organisms/VideoList';



export const TopPage = ({
  search,
  searchNext,
  defaultKeyword,
  videos,
  loading,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    searchFormContents={(
      <SearchForm onSubmit={search} defaultValue={defaultKeyword} />
    )}
    videosListContents={<VideoList videos={videos} loading={loading} />}
    onScrollEnd={searchNext}
    />
)

TopPage.propTypes = {
  search: PropTypes.func.isRequired,
  searchNext: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
  videos: VideoList.propTypes.videos,
  loading: PropTypes.bool,
};

//追加されたコンテナー・コンポネント
TopPage.defaultProps = {
  videos: null,
  loading: false,
  defaultKeyword: '',
}

const TopPageContainer = ({
  api,
  presenter,
  defaultKeyword,
}) => {
  const [videos, setVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [keyword, setKeyword] = useState(defaultKeyword)
  const [loading, setLoading] = useState(false)
  const cleanedUp = useRef(false)
  
/**
   * ビデオの取得
   * @param pageToken 続きを取得する場合は前回取得時のレスポンスに含まれるnextPageTokenを指定する
   * @returns {Promise<void>}
   */

  const getVideo = async (pageToken) => {
    setLoading(true);
    const {
      data: {
      items,
      nextPageToken: newNextPageToken,
    },
  } = await api.search(keyword, { pageToken })
  if(cleanedUp.current){
    return;
  }
  let nextVideo;
  if(pageToken){
    const itemsWithout = items.filter(
      ({ id: itemId }) => !videos.find(({ id }) => id === itemId),
    );
    nextVideo = videos.concat(itemsWithout);
  } else {
    nextVideo = items;
  }
  setVideos(nextVideo)
  setNextPageToken(newNextPageToken)
  setLoading(false);
  };

  //キーワードが変更された時の処理
  useEffect(() => {
    setNextPageToken(undefined)
    setVideos([])
    getVideo()
  }, [keyword])

  useEffect(() =>(() =>  {
    cleanedUp.current = true
  }), [])

  //一番下までスクロールされた時に呼ばれる。
  return presenter({
    search: setKeyword,
    searchNext: () => {
      if(loading || !nextPageToken){
        return;
      }
      getVideo(nextPageToken)
    },
    defaultKeyword,
    videos,
    loading,
  })
}

TopPageContainer.propTypes = {
  api: PropTypes.shape({
    search: PropTypes.func,
  }),
  defaultKeyword: PropTypes.string,
  presenter: PropTypes.func.isRequired,
}

TopPageContainer.defaultProps = {
  api: {
    //axiosの中から取ってくる。
    search: (keyword, params) => axios.get(`/api/videos/search/${keyword}`, { params }),
  },
  defaultKeyword: '猫'
}


export default (props) => (
  <TopPageContainer
    presenter={TopPage}
    {...props}
    />
);