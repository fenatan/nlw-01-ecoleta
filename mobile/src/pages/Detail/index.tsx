import React from 'react';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: 'https://blog.guiabolso.com.br/wp-content/uploads/2018/02/mercado-1-1024x681.jpg' }} />

        <Text style={styles.pointName}>Mercadão</Text>
        <Text style={styles.pointItems}>Lampadas, oleo</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço:</Text>
          <Text style={styles.addressContent}>Dourados, MS</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" sie={20} color="#fff"/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" sie={20} color="#fff"/>
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail;  