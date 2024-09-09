import {useState} from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

export const useImagePicker = () => {
  const [image, setImage] = useState<string>('');

  const handleImageSelect = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      (response: ImagePickerResponse) => {
        if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          const newImage = response.assets[0].uri;
          setImage(newImage);
        }
      },
    );
  };

  const handleImageDelete = () => setImage('');

  return {
    image,
    handleImageSelect,
    handleImageDelete,
  };
};
