import {CommonActions, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';

type ResetFunction = () => void;

export const useResetOnBackNavigation = (resetFunction: ResetFunction) => {
  const navigation = useNavigation();
  const hasReset = useRef(false);

  const handleReset = useCallback(() => {
    if (!hasReset.current) {
      resetFunction();
      hasReset.current = true;
    }
  }, [resetFunction]);

  const handleGoBack = useCallback(() => {
    handleReset();
    navigation.dispatch(CommonActions.goBack());
  }, [handleReset, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleGoBack();
        return true;
      },
    );

    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!hasReset.current) {
        e.preventDefault();
        handleGoBack();
      }
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation, handleGoBack]);

  return handleGoBack;
};
