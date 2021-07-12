import React from 'react'
import VideoList from '.'
import videos from './sampleData.json'

export default { title: 'organisms/VideoList' }

export const VideosList = () => <VideoList videos={videos} />

export const loading = () => <VideoList videos={[]} loading />
loading.story = {
    name: '取得中'
}

export const continuationLoading = () => <VideoList videos={videos} loading />
continuationLoading.story ={name: '続き取得中'}

export const notFound = () => <VideoList videos={[]} />
notFound.story={name: '0件'}

export const withFavoriteButton = () => <VideoList videos={videos} withFavoriteButton />
