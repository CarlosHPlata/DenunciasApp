import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'

export default function useCachedResources () {
    const [ isLoadingCompleted, setIsLoadingCompleted ] = useState(false);

    useEffect(() => {
        const loadResourcesAndDataAsync = async () => {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    ... Ionicons.font,
                });
            } catch (e) {
                //provide this error to an error reporting service
                console.warn(e);
            } finally {
                setIsLoadingCompleted(true);
                SplashScreen.hideAsync();
            }
        };

        loadResourcesAndDataAsync();
    }, [  ]);

    return isLoadingCompleted;
}