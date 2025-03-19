import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const useHapticFeedback = () => {
  const triggerHaptic = (
    type: 'impactLight' | 'impactMedium' | 'impactHeavy',
  ) => {
    ReactNativeHapticFeedback.trigger(type, options);
  };

  return {triggerHaptic};
};

export default useHapticFeedback;
