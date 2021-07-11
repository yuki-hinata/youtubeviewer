import React from 'react'
import { actions } from '@storybook/addon-actions'
import Paperbtn from '.'

export default { title: 'atoms/PaperButton' }

const props = actions('onClick')

export const paperButton = () => (
    <Paperbtn {...props}>もっと見る</Paperbtn>
)