import React, { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, TextInput, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'react-native-image-picker';
import { useMoralis, useNewMoralisObject, useMoralisQuery, useMoralisFile } from "react-moralis";

const UploadModal = (props) => {
  const [memeTitle, setMemeTitle] = useState('');
  const [memeUri, setMemeUri] = useState('');
  const [meme, setMeme] = useState();
  const [memeBase64, setMemeBase64] = useState();
  const { Moralis } = useMoralis();
  const { data } = useMoralisQuery("User");
  const currentUserId = String(data.map((data) => data.id));
  const [isLoading, setIsloading] = useState(false);
  const { isSaving, error, save } = useNewMoralisObject('Posts');


  const selectImage = () => {
    ImagePicker.launchImageLibrary({ includeBase64: true, mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        const stringUri = String(response.assets.map((data) => data.uri))
        setMemeUri(stringUri)
        setMemeBase64(response.assets.map(data => data.base64))
        setMeme(response)
      }
    })
  }

  // const postMeme = async () => {
  //   setIsloading(true)
  //   const data = meme.assets.map((data) => data)
  //   const fileName = encodeURI(data.map((res) => res.fileName));
  //   const media = new Moralis.File(fileName, { base64: String(memeBase64) });
  //   await media.saveIPFS();

  //   save({
  //     'createdById': currentUserId,
  //     'caption': memeTitle,
  //     'assetUrl': media._ipfs
  //   });

  //   if (!isSaving) {
  //     setIsloading(!isLoading);
  //     props.setModalVisible(false);
  //   }
  // }

  const postMeme = async () => {
    const data = meme.assets.map((data) => data)
    const fileName = encodeURI(data.map((res) => res.fileName));
    const media = new Moralis.File(fileName, { base64: String(memeBase64) });
    await media.saveIPFS();

    save({
      'createdById': currentUserId,
      'caption': memeTitle,
      'assetUrl': media._ipfs
    });
  }

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
          setModalVisible(!props.modalVisible);
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
                props.setModalVisible(!props.modalVisible)}
              style={{ marginLeft: 10, padding: 5 }}>
              <FontAwesomeIcon
                icon={faTimes}
                size={20}
                style={{
                  color: '#fff'
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => postMeme()}
              style={{
                position: 'absolute',
                right: 25
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18
                }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            backgroundColor: '#141414',
            width: '100%'
          }}>
          <View
            style={{
              width: '100%',
              borderColor: '#ACACAC',
              borderBottomWidth: 0.3,
              height: 100
            }}>
            <TextInput
              placeholder="Meme title..."
              style={{
                color: '#fff',
                fontSize: 20,
                width: '95%',
                alignSelf: 'center'
              }}
              multiline={true}
              placeholderTextColor={'#fff'}
              maxLength={280}
              onChangeText={(text) => setMemeTitle(text)}
            />
            <Text
              style={{
                color: '#ACACAC',
                position: 'absolute',
                bottom: 10,
                right: 20
              }}>
              {280 - memeTitle.length}/280
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderBottomWidth: 0.3,
              borderBottomColor: '#ACACAC'
            }}>
            <TouchableOpacity
              onPress={() => selectImage()}
              style={{
                backgroundColor: '#141414',
                width: '50%',
                height: 50,
                justifyContent: 'center',
                elevation: 5
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'center'
                }}>
                Select from Galery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#141414',
                width: '50%',
                height: 50,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'center'
                }}>Take a Picture</Text>
            </TouchableOpacity>
          </View>

          {isLoading &&
            <View style={{ top: 260, left: 155, position: 'absolute' }}>
              <ActivityIndicator size={100} style={{ zIndex: 9999 }} color="#0000ff" />
            </View>
          }
          {memeUri ?
            <View style={{flexDirection: 'row'}}>
              <Image source={{ uri: memeUri }}
                style={{ 
                  aspectRatio: 1,
                  flex: 1,
                  resizeMode: 'contain'
                 }}
              />
            </View>
            :
            <View style={{alignSelf: 'center', marginTop: 200}}>
              <FontAwesomeIcon
                icon={faImage}
                size={100}
                style={{
                  color: '#ACACAC'
                }}
              />
            </View>
          }
        </ScrollView>
      </Modal>
    </SafeAreaView>
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

export default UploadModal;