import {focusManager} from '@tanstack/react-query';
import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';

function useRefetchOnAppFocus() {
  function onAppStateChange(status) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);
}

export default useRefetchOnAppFocus;
