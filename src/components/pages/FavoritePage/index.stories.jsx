import React from 'react'
import { FavoritePagepresenter as Favoritepage } from '.'
import sampleData from '~/components/organisms/VideoList/sampleData.json'

export default { title: 'pages/FavoritePage' }

export const favoritePage = () => <Favoritepage videos={sampleData} />

export const loading = () => <Favoritepage loading />
loading.story={ name: '取得中' };

export const noResult = () => <Favoritepage videos={[]} />
noResult.story = { name: '結果なし' }