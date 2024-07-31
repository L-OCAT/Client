import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

//svg
import ProfileImg from '../../assets/svg/defaultProfile.svg';
import { PrimaryLargeBtn, TertiaryMediumBtn, TextInputStyle } from '../../components/public/Buttons';
import { COLORS } from '../../lib/styles/theme';

const ProfileScreen = () => {
    const [nickName, setNickName] = useState('')
    
    const isDuplicate = () => {
        console.log('isDuplicate', nickName)
    }

    const next = () => {
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
                <Text style={styles.smallText}>닉네임은 추후 수정이 가능해요</Text>
            </View>
            {nickName.length >= 2 ? <PrimaryLargeBtn text={'다음'} onPress={next}/> : <PrimaryLargeBtn text={'다음'} isDisabled={true}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        // paddingBottom: 40
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
    },
    smallText: {
        color: COLORS.gray.Gray04,
        fontSize: 12,
        marginLeft: 16
    }
})

export default ProfileScreen;
