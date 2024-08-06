import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryLargeBtn, TertiaryMediumBtn } from '../../components/public/Buttons';
import { TextInputStyle } from '../../lib/styles/textInputStyles'
import { COLORS } from '../../lib/styles/theme';

//svg
import ProfileImg from '../../assets/svg/defaultProfile.svg';

const ProfileScreen = () => {
    const [isValid, setIsValid] = useState(false);
    const [nickName, setNickName] = useState('')
    
    const isDuplicate = () => {
        console.log('isDuplicate', nickName)
    }

    const validateNickname = (value: string) => {
        const nicknameRegex = /^[\w가-힣]{2,7}$/;
        const isValid = nicknameRegex.test(value);
        setIsValid(isValid);
    };
      
    useEffect(() => {
        validateNickname(nickName);
    }, [nickName]);

    const handleNextPage = () => {
        console.log('next')
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{color: 'black'}}>프로필과 닉네임을 설정해주세요</Text>
                <View style={styles.profileImg}><ProfileImg/></View>
                <View style={styles.textInput}>
                    <TextInput
                        style={{...TextInputStyle.textInput, flex: 1}}
                        autoCapitalize='none'
                        maxLength={7}
                        placeholder='2글자 이상 8글자 미만'
                        placeholderTextColor='#c1c1c1'
                        value={nickName} 
                        onChangeText={(e) => setNickName(e)} 
                        onSubmitEditing={isDuplicate}
                    />
                    <TertiaryMediumBtn text={'중복확인'} onPress={isDuplicate}/>
                </View>
                <Text style={TextInputStyle.smallText}>닉네임은 추후 수정이 가능해요</Text>
            </View>
            <PrimaryLargeBtn 
                text={'다음'} 
                onPress={handleNextPage} 
                isDisabled={!isValid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
    },
    profileImg: {
        alignItems: 'center',
        marginVertical: 30
    },
    textInput: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    }
})

export default ProfileScreen;
