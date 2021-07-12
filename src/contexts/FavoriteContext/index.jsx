import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import reducer from './reducer' 

const favoriteContext = createContext()

const initialstate = {
    favoriteIds: [],
}

export const FavoriteProvider = ({ api, children }) => {
    const [state, dispatch] = useReducer(reducer, { ids: [] })
    const value = { state, dispatch };
    useEffect(() => {
        api.get().then(({ data }) => {
            dispatch({ type: 'init', ids: data })
        })
    }, [])

    //
    return (
        <favoriteContext.Provider value={{ state, dispatch }}>
            {children}
        </favoriteContext.Provider>
    )
}

FavoriteProvider.propTypes = {
    children: PropTypes.node.isRequired,
    api: PropTypes.shape({
        get: PropTypes.func,
    }),
}

FavoriteProvider.defaultProps = {
    api: {
        get: () => axios.get('/api/favorites')
    }
}

export default favoriteContext;