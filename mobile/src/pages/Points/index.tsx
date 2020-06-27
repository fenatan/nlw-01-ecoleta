import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

import styles from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const Points = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);
  
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data);
    });

  }, []);

  useEffect(() => {
    async function loadPosition(){
      const { status } = await Location.requestPermissionsAsync();

      if(status !== 'granted'){
        Alert.alert('Ooops...', 'Preicsamos de sua permissão para obter sua localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      console.log(location.coords);
      const {latitude, longitude} = location.coords;

      setInitialPosition([latitude, longitude])
    }

    loadPosition();
  }, []);

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

       {initialPosition[0] !== 0 && (
          <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
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
                <SvgUri width={42} height={42} uri="http://192.168.1.8:8000/uploads/lampadas.svg" />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>

          </MapView>
        </View>
       )}
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {items.map(item => (
            <TouchableOpacity 
              activeOpacity={0.6} 
              key={String(item.id)} 
              style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} 
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default Points;  