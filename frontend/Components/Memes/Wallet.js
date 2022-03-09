import React, { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, Pressable, TouchableOpacity, View, ScrollView, TextInput, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'react-native-image-picker';
import { useMoralis } from "react-moralis";

const Wallet = (props) => {
  const { Moralis } = useMoralis();
  // const { data } = useMoralisQuery("AvaxBalance");
  // const currentUserId = String(data.map((data) => data.id));

  //console.log('data---->',data.map((res) => res.balance))
  // console.log('data---->',data.map((res) => res.balance))



  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.balanceModalVisible}
        onRequestClose={() => {
          props.setBalanceModalVisible(!props.balanceModalVisible);
        }}
      >
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#141414',
            justifyContent: 'center',
            elevation: 10
        }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                props.setBalanceModalVisible(!props.balanceModalVisible)}
              style={{ marginLeft: 10, padding: 5 }}>
              <FontAwesomeIcon
                icon={faTimes}
                size={20}
                style={{
                  color: '#fff'
                }}
              />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontSize: 18, marginLeft: 10, marginTop: 1}}>
              Wallet
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: '#141414', flex: 1}}>
          <Image source={require('../../../frontend/matic-token-icon.webp')} style={{ alignSelf: 'center', marginTop: 150, width: 150, height: 150 }} />
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, marginTop: 10}}>Matic Balance: 0</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    margin: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
  },
  button: {
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Wallet;