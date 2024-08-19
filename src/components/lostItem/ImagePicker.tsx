import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRecoilState} from 'recoil';

import CameraIcon from '../../assets/svg/icon_camera.svg';
import DeleteIcon from '../../assets/svg/icon_delete.svg';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';
import {lostItemImagesAtom, lostItemMainImageAtom} from '../../stores/lostItem';

const ImagePicker = () => {
  const [images, setImages] = useRecoilState(lostItemImagesAtom);
  const [mainImage, setMainImage] = useRecoilState(lostItemMainImageAtom);

  const handleImageSelect = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 10 - images.length},
      response => {
        if (response.assets) {
          const newImages = response.assets.map(asset => asset.uri as string);
          const updatedImages = [...images, ...newImages].slice(0, 10);
          setImages(updatedImages);
          if (!mainImage && updatedImages.length > 0) {
            setMainImage(updatedImages[0]);
          }
        }
      },
    );
  };

  const imageCounting =
    images.length > 0 ? `${images.length}/10` : `50mb 이하의${'\n'}PNG,JPG`;

  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (mainImage === images[index]) {
      setMainImage(updatedImages[0] || null);
    }
  };

  const handleSetMainImage = (image: string) => {
    setMainImage(image);
  };

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
