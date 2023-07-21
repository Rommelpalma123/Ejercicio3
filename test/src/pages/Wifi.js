import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const Wifi = () => {
  const [wifiList, setWifiList] = useState([]);

  useEffect(() => {
    requestLocationPermission(); // Solicitar permiso en tiempo de ejecución
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de Ubicación',
          message: 'Se requiere permiso de ubicación para escanear redes WiFi.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        scanWifi(); // Escanear redes WiFi una vez que se concede el permiso
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const scanWifi = async () => {
    try {
      const wifiArray = await WifiManager.loadWifiList();
      setWifiList(wifiArray);
    } catch (error) {
      console.error('Error scanning WiFi:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.wifiItem}>
      <Text style={styles.ssidText}>SSID: {item.SSID}</Text>
      <Text style={styles.bssidText}>BSSID: {item.BSSID}</Text>
      <Text style={styles.levelText}>Level: {item.level}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={wifiList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wifiItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  ssidText: {
    fontSize: 18,
    color: "black"
  },
  bssidText: {
    fontSize: 16,
    color: 'gray',
  },
  levelText: {
    fontSize: 16,
    color: 'green',
  },
});

export default Wifi;
