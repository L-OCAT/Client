import {useState} from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

interface UseImagePickerOptions {
  maxImages?: number;
  initialImages?: string[];
  singleImage?: boolean;
}

export const useImagePicker = ({
  maxImages = 10,
  initialImages = [],
  singleImage = false,
}: UseImagePickerOptions = {}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [mainImage, setMainImage] = useState<string | null>(
    initialImages[0] || null,
  );

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: singleImage ? 1 : maxImages - images.length,
      },
      (response: ImagePickerResponse) => {
        if (response.assets) {
          const newImages = response.assets.map(asset => asset.uri as string);
          if (singleImage) {
            setImages(newImages);
            setMainImage(newImages[0] || null);
          } else {
            const updatedImages = [...images, ...newImages].slice(0, maxImages);
            setImages(updatedImages);
            if (!mainImage && updatedImages.length > 0) {
              setMainImage(updatedImages[0]);
            }
          }
        }
      },
    );
  };

  const handleImageDelete = (index: number) => {
    if (singleImage) {
      setImages([]);
      setMainImage(null);
    } else {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      if (mainImage === images[index]) {
        setMainImage(updatedImages[0] || null);
      }
    }
  };

  const handleSetMainImage = (image: string) => {
    if (!singleImage) {
      setMainImage(image);
    }
  };

  return {
    images,
    mainImage,
    handleImageSelect,
    handleImageDelete,
    handleSetMainImage,
    isSingleImage: singleImage,
  };
};
