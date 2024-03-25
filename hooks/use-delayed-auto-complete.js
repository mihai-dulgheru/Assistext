import {useEffect, useRef} from 'react';
import {fetchCompletion} from '../utils/api';

function useDelayedAutoComplete(inputText, setStateAction, delay = 3000) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (inputText.length >= 3) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fetchCompletion(inputText)
          .then((result) => {
            setStateAction(result);
          })
          .catch(() => {
            setStateAction('');
          });
      }, delay);
    } else {
      setStateAction('');
    }

    return () => clearTimeout(timerRef.current);
  }, [inputText]);
}

export default useDelayedAutoComplete;
