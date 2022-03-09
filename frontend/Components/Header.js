import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

//TODO: Uncomment to show ETH address on header
//import Address from "./Address";

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <Text style={{ fontWeight: 'bold', textAlign: 'left', color: '#fff', fontSize: 18 }}>Crypto Memes</Text>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
        <FontAwesomeIcon
            icon={faWallet}
            size={25}
            style={{
              color: '#fff',
              marginLeft: 110,
            }}
          />
        <Text style={{ fontWeight: 'bold', marginLeft: 10, color: '#fff' }}>Balance: 0.020</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    flex: 1,
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },
});
