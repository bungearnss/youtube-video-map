import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const height = width * 0.3;

const ASPECT_RATIO = width / height;
const LATITUDE = 13.7760624;
const LONGITUDE = 100.5718923;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.SafeContainer}>
        <Text style={{ color: "#FFF", fontSize: 18, padding: 10, fontWeight: 'bold' }}>
          บริษัท นิลิคอน (ประเทศไทย) จำกัด
        </Text>
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            textAlign: "center",
            paddingBottom: 10,
          }}
        >
          202 Le Concorde Tower, 20th Floor, Room 2001, Ratchadapisek Road,
          Huaykwang, Bangkok 10310
        </Text>
        <StatusBar hidden />
        <MapView
          showsUserLocation={true}
          showsBuildings={true}
          showsCompass={true}
          scrollEnabled={true}
          showsIndoors={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }}
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.textbubble}>
                    {" "}
                    Nilecon Thailand Co., Ltd.{" "}
                  </Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>
        </MapView>
        <View style={{ alignSelf: "flex-end", marginRight: 5 , top: width*0.55}}>
          <Button
            iconLeft
            onPress={() =>
              Linking.openURL(
                "https://www.google.com/maps/place/Nilecon+Thailand+Co.,+Ltd./@13.7761982,100.5717608,17.1z/data=!4m5!3m4!1s0x30e29dfd99764f5f:0xb3dfe1f5381377ee!8m2!3d13.7760766!4d100.5739769"
              )
            }
            style={styles.directionView}
          >
            <MaterialCommunityIcons
              name="directions"
              size={20}
              style={{ marginLeft: 5, marginRight: 5 }}
              color="#606060"
            />
            <Text
              style={{
                marginRight: 5,
                fontWeight: "bold",
                fontSize: 13,
                color: "#606060",
              }}
            >
              Google Map
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  SafeContainer: {
    backgroundColor: "#000099",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "rgba(204,204,255,1)",
    borderRadius: 6,
    borderColor: "#B7B7B7",
    width: 180,
    height: 50,
  },
  textbubble: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "rgba(204,204,255,1)",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "rgba(204,204,255,1)",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  directionView: {
    height: 35,
    borderRadius: 5,
    backgroundColor: "#FFF",
    position: "relative",
    top: Platform.OS === "ios" ? -620 : -380,
    shadowColor: "#000000",
    shadowRadius: 10,
    elevation: Platform.OS === " ios" ? 5 : 20,
    shadowOpacity: 0.1,
  },
});
