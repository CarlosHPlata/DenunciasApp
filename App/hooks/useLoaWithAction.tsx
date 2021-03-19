import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useLoadWithAction ( action:any ) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>();
    const dispatch = useDispatch();


    useEffect(() => {
        setError(null);
        setIsLoading(true);

        ( async () => {
            try {
                await dispatch(action());
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        })()
    }, [setIsLoading, setError, dispatch]);

    return [ isLoading, error ];
}