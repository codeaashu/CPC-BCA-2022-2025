import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user/user.slice'  // ✅ Correct import
import sessionStorage from 'redux-persist/es/storage/session'
import { persistReducer, persistStore } from 'redux-persist'  // ✅ Import persist functions

// 🔹 Step 1: Define rootReducer
const rootReducer = combineReducers({
    user: userReducer,  // ✅ User reducer ko add karo
})

// 🔹 Step 2: Define persistConfig
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

// 🔹 Step 3: Create persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)  // ✅ Fix

// 🔹 Step 4: Configure Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

// 🔹 Step 5: Persist Store
export const persistor = persistStore(store)  // ✅ Fix

export default store;
