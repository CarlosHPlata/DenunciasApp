import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import Navigation from './App/navigation';
import useCachedResources from './App/hooks/useCachedResources';
import { rootReducer } from './App/store/reducers/rootReducer';


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  const isLoadingCompleted = useCachedResources();

  if (!isLoadingCompleted){
    return null;
  }
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
          <Navigation colorScheme={'light'} />
          <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}

