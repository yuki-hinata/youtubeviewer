import React from 'react'
import { actions } from '@storybook/addon-actions'
import { TopPage } from '.'
import sampleData from '~/components/organisms/VideoList/sampleData.json'

export default {title: 'pages/TopPage'}

const props = {
    ...actions('search', 'searchNext'),
    defaultKeyword: 'ねこ',
    videos: sampleData,
};



export const topPage = () => <TopPage {...props} />

export const loading = () => <TopPage {...props} videos={[]} loading />
loading.story = { name: '取得中'}

export const continuationLoading = () => <TopPage {...props} loading />
continuationLoading.story = { name: '続きを取得中' }

export const noresult = () => <TopPage {...props} videos={[]} />
noresult.story = { name: '結果が0件' }