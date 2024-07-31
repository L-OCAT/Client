import React, { useState } from 'react';
import {Text, TextInput, View} from 'react-native';

//svg
import ProfileImg from '../../assets/svg/defaultProfile.svg';

const ProfileScreen = () => {
    const [nickName, setNickName] = useState('')
    
    const createNickName = () => {
        console.log('createNickName', nickName)
    }

    return (
        <View>
        <Text>프로필과 닉네임을 설정해주세요</Text>
        <ProfileImg/>
        <TextInput 
            autoCapitalize='none'
            maxLength={7}
            placeholder='2글자 이상 8글자 미만'
            value={nickName} 
            onChangeText={(e) => setNickName(e)} 
            onSubmitEditing={createNickName}
        />
        <Text>닉네임은 추후 수정이 가능해요</Text>
        </View>
    );
};

export default ProfileScreen;
