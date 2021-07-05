import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM  from 'react'

import App from '~/routings/App'

const rootEl = document.getElementById('root')

ReactDOM.render(
    <App />,
    rootEl,
)