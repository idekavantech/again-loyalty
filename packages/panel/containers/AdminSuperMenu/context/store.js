import { configureStore } from '@reduxjs/toolkit'
import menu from './superMenu';

export default configureStore({
    reducer: {
        superMenu: menu
    }
});