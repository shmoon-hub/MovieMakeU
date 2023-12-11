import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useAudioPlayer = () => {
  const [sound, setSound] = useState();

  useEffect(() => {
    // 컴포넌트가 언마운트 될 때 오디오 리소스 해제
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sound/click-sound.mp3'), // 실제 오디오 파일 경로
      { shouldPlay: true }
    );

    setSound(sound);

    // 오디오 재생 완료 후 리소스 해제
    await sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish && !status.isLooping) {
        await sound.unloadAsync();
        setSound(undefined);
      }
    });
  };

  return playSound;
};
