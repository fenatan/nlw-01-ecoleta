import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

const Points = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontro no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -22.4082889,
              longitude: -54.4451524,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
          >
            <Marker
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -22.4082889,
                longitude: -54.4451524,
              }}
            >
              <View style={styles.mapMarkerContainer}>
              {/* <Image source={{ uri: "http://192.168.1.8:3333/uploads/lampadas.svg"}}/> */}
              <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
              <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>

          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => { }}>
            <SvgUri width={42} height={42} uri="http://192.168.1.8:3333/uploads/lampadas.svg" />
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  )
}

export default Points;  