import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const height = width * 0.3;
const numColumns = 1;

//mock data in dataList state
export class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
        {
          id: 1,
          title: "YONLAPA - Sweetest Cure (Official Music Video)",
          vdo_path:
            "https://www.youtube.com/watch?v=cxxZf5GyYbs&ab_channel=YONLAPA",
        },
        {
          id: 2,
          title:
            "โอปอ กิตฐิพงษ์ - เดินจากไป (เพราะอะไร) Acoustic Ver. [Official Audio]",
          vdo_path:
            "https://www.youtube.com/watch?v=AoQdSIhHzbg&ab_channel=TheGuitartag",
        },
        {
          id: 3,
          title: "Zweed n' Roll - ช่วงเวลา (A Moment) [Official Video]",
          vdo_path:
            "https://www.youtube.com/watch?v=Kkij6nEs2XM&ab_channel=ZWEEDN%27ROLL",
        },
        {
          id: 4,
          title: "หนีห่าง - จุลโหฬาร (cover เขียนไขและวานิช)",
          vdo_path:
            "https://www.youtube.com/watch?v=KdHK7HqU8e0&ab_channel=JunlaholaanBand",
        },
        {
          id: 5,
          title: "Lauv - Never Not (Lyric Video)",
          vdo_path:
            "https://www.youtube.com/watch?v=RmibkOh25uY&list=RDMM&index=3&ab_channel=KoalaKontrol",
        },
      ],
      playing: false,
      setPlaying: true,
      PlayerRef: null,
      status: null,
    };
  }

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return dataList;
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.box} key={index}>
        <YoutubePlayer
          ref={this.state.PlayerRef}
          height={height * 1.4}
          width={width * 0.8}
          videoId={item.vdo_path.substring(32, 43)}
          play={this.state.playing}
          onChangeState={(e) => this.setState({ status: e.state })}
          onReady={() => {}}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={100}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
          showPlayPauseButton={true}
        />
        <View style={{ paddingTop: 7 }}>
          <Text style={{ fontWeight: "bold", textAlign: "left" }}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.SafeContainer}>
        <StatusBar hidden />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.headerText}>Trending Video</Text>
          </View>
          <FlatList
            data={this.formatData(this.state.dataList, numColumns)}
            renderItem={this._renderItem}
            keyExtractor={(index) => index.toString()}
            numColumns={numColumns}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blank: {
    backgroundColor: "#000099",
    alignItems: "center",
    flex: 1,
    height: height,
  },
  SafeContainer: {
    flex: 1,
    backgroundColor: "#000099",
    flexDirection: "column",
    width,
    height,
    paddingBottom: 10,
  },
  box: {
    margin: 10,
    marginTop: Platform.OS === "ios" ? 24 : 15,
    marginLeft: Platform.OS === "ios" ? 22 : 17,
    marginRight: Platform.OS === "ios" ? 22 : 17,
    backgroundColor: "rgba(250,250,250,0.95)",
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(192,192,191,1)",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#FFF",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 20,
    marginTop: 35,
  },
});
