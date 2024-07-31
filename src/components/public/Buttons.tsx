import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

const PrimaryBtn = () => {
  return (
    <Pressable>PrimaryBtn</Pressable>
  )
}

const styles = StyleSheet.create({
    smallBtn: {
        width: 95,
        height: 47,
        borderRadius: 8
    }
})

export { PrimaryBtn }