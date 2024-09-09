import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import CameraIcon from '../../assets/svg/icon_camera.svg';
import DeleteIcon from '../../assets/svg/icon_delete.svg';
import {useImagePicker} from '../../hooks/useImagePicker';
import {COLORS} from '../../lib/styles/theme';
import {typography} from '../../lib/styles/typography';
import {ms} from '../../lib/utils/dimensions';

interface ImagePickerProps {
  onImageChange?: (image: string) => void;
}

const ImagePicker = ({onImageChange}: ImagePickerProps) => {
  const {image, handleImageSelect, handleImageDelete} = useImagePicker();

  React.useEffect(() => {
    onImageChange?.(image);
  }, [image, onImageChange]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={handleImageSelect}>
        {!image ? (
          <View style={styles.noImageWrapper}>
            <CameraIcon width={24} height={24} />
            <Text style={[styles.addButtonText, typography.caption]}>
              {`50mb 이하의${'\n'}PNG,JPG`}
            </Text>
          </View>
        ) : (
          <View style={styles.imageWrapper}>
            <FastImage source={{uri: image}} style={styles.image} />
            <Pressable style={styles.deleteButton} onPress={handleImageDelete}>
              <DeleteIcon width={18} height={18} />
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(90),
    flexDirection: 'row',
    gap: ms(7),
    marginTop: ms(7),
    marginBottom: ms(15),
    alignItems: 'center',
  },
  addButton: {
    width: ms(80),
    height: ms(80),
    backgroundColor: COLORS.gray.Gray02,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageWrapper: {
    paddingHorizontal: ms(6),
    paddingVertical: ms(8),
    gap: ms(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.gray.Gray03,
  },
  imageWrapper: {
    width: ms(90),
    height: ms(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ms(80),
    height: ms(80),
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default ImagePicker;
