import React from 'react'
import { Videoinfo } from '.'

export default { title: 'organisms/VideoInfo' }

const props = {
    title: '猫と学ぶ宇宙のこと100',
    description: '動画説明サンプルです。動画説明サンプルです。動画説明サンプルです。 \n'.repeat(10),
    publishedAt: '2021/07/09',
    viewCount: '100000',
};

export const videoInfo = () => <Videoinfo {...props} />