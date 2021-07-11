import React from 'react'
import { actions } from '@storybook/addon-actions'

import Playerpresent from '.'
import sampleData from './sampleData.json'

export default {title: 'pages/PlayerPage'}

const props = {
    ...sampleData,
    loadingRelatedVideos: false,
    ...actions('onScrollEnd'),
}

export const playerPage = () => <Playerpresent {...props} />
playerPage.story= { name: 'デフォルト'}

export const loading = () => (
    <Playerpresent 
    {...props}
    relatedVideos = {[]}
    videoData={null}
    loadingRelatedVideos
    />
)
loading.story= { name: 'ロード中' }