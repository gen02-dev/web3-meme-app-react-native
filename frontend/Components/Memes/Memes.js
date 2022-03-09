import React, { useEffect, useState, useRef } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UploadModal from './UploadModal';
import Wallet from './Wallet';
import * as ImagePicker from 'react-native-image-picker';


const HeaderList = [
  {
    id: '1',
    title: 'Hot'
  },
  {
    id: '2',
    title: 'Trending'
  },
  {
    id: '3',
    title: 'Fresh'
  },
  {
    id: '4',
    title: 'Top'
  },
  {
    id: '5',
    title: 'Anime'
  },
  {
    id: '6',
    title: 'Games'
  },
  {
    id: '7',
    title: 'LifeStyle'
  }
]

const renderList = ({ item }) => (
  <TouchableOpacity key={item.id} style={styles.titleContainer}>
    <Text style={styles.listTitle}>{item.title}</Text>
  </TouchableOpacity>
)

const renderMemes = ({ item }) => {
  return(
  <View key={item[0].id} style={styles.memeCoinater}>
      <View style={styles.userContainer}>
        {/* <Blockie/> */}
      <Image source={require('../../Blockie.png')}
        style={styles.userProfilePicture}
      />
        <Text style={styles.userName}
          ellipsizeMode={"middle"}
          numberOfLines={1}>
          Gen ({item[0].ethAddress})
        </Text>
    </View>
    <Text style={styles.captionText}>{item[0].caption}</Text>
    <View style={styles.memeImageContainer}>
      <Image source={{ uri: item[0].meme }} style={styles.memeImage} />
    </View>
    <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
        <FontAwesomeIcon
          icon={faArrowUp}
          size={25}
          style={{
            color: '#fff'
          }}
        />
        <Text style={styles.buttonText}>200</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <FontAwesomeIcon
          icon={faArrowDown}
          size={25}
          style={{
            color: '#fff'
          }}
        />
        <Text style={styles.buttonText}>200</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <FontAwesomeIcon
          icon={faCommentAlt}
          size={25}
          style={{
            color: '#fff'
          }}
        />
        <Text style={styles.buttonText}>200</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <FontAwesomeIcon
          icon={faShareAlt}
          size={25}
          style={{
            color: '#fff'
          }}
        />
        <Text style={styles.buttonText}>200</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default function Social() {
  const { Moralis } = useMoralis();
  const [modalVisible, setModalVisible] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false );
  const [memes, setMemes] = useState();
  const flatListRef = useRef();

  const getAllMeme = async () => {
    const posts = await Moralis.Cloud.run("getAllMemes");
    setMemes(posts)
  }

  const subscribeToPosts = async () => {
    let query = new Moralis.Query('Posts');
    let subscription = await query.subscribe();
    subscription.on('create', notifyOnCreate);
  }

  const notifyOnCreate = (result) => {
    setUpdated(result)
  }  

  useEffect(() => {
    getAllMeme();
    //flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
  }, [updated])

  useEffect(() => {
    subscribeToPosts()
  }, [updated])

  return (
    <SafeAreaView>
      <View style={styles.viewContainer}>
        <Text style={{ fontWeight: 'bold', textAlign: 'left', color: '#fff', marginLeft: 15, fontSize: 18 }}>Crypto Memes</Text>
        <TouchableOpacity
          onPress={() => setBalanceModalVisible(!balanceModalVisible)}
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon
              icon={faWallet}
              size={25}
              style={{
                color: '#fff',
                marginLeft: 110,
              }}
            />
          <Text style={{ fontWeight: 'bold', marginLeft: 10, color: '#fff' }}>Balance: 0.00</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={HeaderList}
        renderItem={renderList}
        keyExtractor={item => item.id}
        style={styles.flatListContainer}
        horizontal={true}
      />
      <FlatList
        data={memes}
        renderItem={renderMemes}
        keyExtractor={item => item.id}
        style={styles.memeFlatListContainer}
        inverted={true}
        ref={flatListRef}
      />
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton}
          onPress={() =>
            setModalVisible(!modalVisible)
          }>
          <FontAwesomeIcon
            icon={faPlus}
            size={25}
            style={{
              color: '#fff'
            }}
          />
        </TouchableOpacity>
      </View>
      {modalVisible &&
        <UploadModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
      }
      {balanceModalVisible &&
        <Wallet setBalanceModalVisible={setBalanceModalVisible} balanceModalVisible={balanceModalVisible} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    //flex: 1,
    backgroundColor: 'black',
    flexDirection: "row",
    height: 60,
    //justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    height: 50,
    backgroundColor: '#141414',
    width: '100%'
  },
  listTitle: {
    fontSize: 14,
    color: '#fff',
    padding: 12,
  },
  memeFlatListContainer: {
    backgroundColor: '#000',
    width: '100%',
    paddingBottom: 100
  },

  titleContainer: {
    backgroundColor: '#141414',
    height: 40,
  },

  //Meme
  buttonsContainer: {
    backgroundColor: '#141414',
    width: '100%',
    height: 60,
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10
  },
  captionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  memeImageContainer: {
    flexDirection: 'row'
  },
  memeImage: {
    aspectRatio: 1,
    flex: 1,
    resizeMode: 'contain'
  },
  memeCoinater: {
    backgroundColor: '#141414',
    marginTop: 5,
    width: '100%'
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  userProfilePicture: {
    height: 27,
    width: 27
  },
  userName: {
    color: '#fff',
    marginLeft: 10,
    width: 150
  },
  uploadButtonContainer: {
    position: 'absolute',
    bottom: 150,
    right: 20
  },
  uploadButton: {
    backgroundColor: '#5ea3e9',
    height: 70,
    width: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
