import { configureStore } from '@reduxjs/toolkit'
import channels from './saleChannels';

export default configureStore({
    reducer: {
        saleChannel: channels
    }
});