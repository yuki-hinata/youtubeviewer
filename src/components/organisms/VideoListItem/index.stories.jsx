import React from 'react'
import VideoListItem from '.'
import video from './sampleData.json'

export default { title: 'SearchForm/VideoListItem' }

export const videoListItem = () => <VideoListItem video={video} />

export const videoListItemWithFavoriteButton = () => (
    <VideoListItem video={video} withFavoriteButton />
)