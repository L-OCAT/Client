import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import CameraIcon from '../../assets/svg/icon_camera.svg';
import DeleteIcon from '../../assets/svg/icon_delete.svg';
import {useImagePicker} from '../../hooks/useImagePicker';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';

interface ImagePickerProps {
  onImagesChange?: (images: string[]) => void;
  onMainImageChange?: (mainImage: string | null) => void;
  maxImages?: number;
  initialImages?: string[];
}

const ImagePicker = ({
  onImagesChange,
  onMainImageChange,
  maxImages = 10,
  initialImages = [],
}: ImagePickerProps) => {
  const {
    images,
    mainImage,
    handleImageSelect,
    handleImageDelete,
    handleSetMainImage,
  } = useImagePicker({maxImages, initialImages});

  React.useEffect(() => {
    onImagesChange?.(images);
  }, [images, onImagesChange]);

  React.useEffect(() => {
    onMainImageChange?.(mainImage);
  }, [mainImage, onMainImageChange]);

  const imageCounting =
    images.length > 0 ? `${images.length}/10` : `50mb 이하의${'\n'}PNG,JPG`;

  const renderImageItem = ({item, index}: {item: string; index: number}) => (
    <View style={styles.imageOuterContainer}>
      <Pressable
        style={[
          styles.imageContainer,
          item === mainImage && styles.mainImageWrapper,
        ]}
        onPress={() => handleSetMainImage(item)}>
        <FastImage source={{uri: item}} style={styles.image} />
        {item === mainImage && (
          <View style={styles.mainImageBadge}>
            <Text style={[styles.mainImageText, typography.caption]}>
              대표사진
            </Text>
          </View>
        )}
      </Pressable>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleImageDelete(index)}>
        <DeleteIcon width={18} height={18} />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={handleImageSelect}>
        <CameraIcon width={24} height={24} />
        <Text style={[styles.addButtonText, typography.caption]}>
          {imageCounting}
        </Text>
      </Pressable>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(90),
    flexDirection: 'row',
    paddingHorizontal: ms(10),
    gap: ms(7),
    marginVertical: ms(11),
    alignItems: 'center',
  },
  addButton: {
    width: ms(80),
    height: ms(80),
    paddingHorizontal: ms(6),
    paddingVertical: ms(8),
    gap: ms(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray.Gray02,
    borderRadius: 4,
  },
  addButtonText: {
    color: COLORS.gray.Gray03,
  },
  imageList: {
    gap: ms(8),
  },
  imageOuterContainer: {
    width: ms(90),
    height: ms(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: ms(80),
    height: ms(80),
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray.Gray02,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  mainImageWrapper: {
    borderWidth: 1,
    borderColor: COLORS.orange.Orange01,
  },
  mainImageBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    paddingVertical: ms(4),
    alignItems: 'center',
  },
  mainImageText: {
    color: COLORS.white,
  },
});

export default ImagePicker;
