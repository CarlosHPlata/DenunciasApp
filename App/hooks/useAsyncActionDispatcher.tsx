
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useAsyncActionDispatcher ( action:any, dependencies:any[] ): [loadFn:()=>Promise<void>, isLoading: boolean, error: string | null | undefined] {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>();
    
    const dispatch = useDispatch();

    const loadFn = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(action());
        } catch (e){
            setError(e.message);
        } finally {
            setIsLoading(false);
        }

    }, [setIsLoading, setError, dispatch, ...dependencies]);

    return [loadFn, isLoading, error];
}