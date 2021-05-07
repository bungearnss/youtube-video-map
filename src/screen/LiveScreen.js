import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");
const numColumns = 1;

//mock data in dataList state
export class LiveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
        {
          id: 1,
          title:
            "High Angle Close Up of Hands Scrolling COVID Vaccine News Article On Phone",
          story_path:
            "https://cdn.videvo.net/videvo_files/video/free/2021-01/small_watermarked/210114_01_Covid_4k_007_preview.webm",
          web_path:
            "https://www.videvo.net/video/high-angle-close-up-of-hands-scrolling-on-covid-news-website-on-smartphone/677734/",
        },
        {
          id: 2,
          title:
            "Sliding Extreme Close Up of Pile of Newspaper Front Pages with Covid 19 Vaccine Headlines",
          story_path:
            "https://cdn.videvo.net/videvo_files/video/free/2020-12/small_watermarked/201209_02_Covid%20Headlines_4k_007_preview.webm",
          web_path:
            "https://www.videvo.net/video/sliding-extreme-close-up-of-pile-of-newspaper-front-pages-with-covid-19-vaccine-headlines/608624/",
        },
        {
          id: 3,
          title: "Human Medical",
          story_path:
            "https://cdn.videvo.net/videvo_files/video/free/2014-01/small_watermarked/Human_Medical_Background_1_Videvo_preview.webm",
          web_path:
            "https://www.videvo.net/video/human-medical-background---loopable/1918/",
        },
        {
          id: 4,
          title:
            "Newscaster presenting the breaking news, during COVID-19 pandemic",
          story_path:
            "https://media.istockphoto.com/videos/video-newscaster-presenting-the-breaking-news-during-covid19-pandemic-video-id1257245698",
          web_path:
            "https://www.istockphoto.com/video/newscaster-presenting-the-breaking-news-during-covid-19-pandemic-gm1257245698-368390257",
        },
        {
          id: 5,
          title: "ournalist Reporting Live From London",
          story_path:
            "https://media.istockphoto.com/videos/journalist-reporting-live-from-london-video-id181437798",
          web_path:
            "https://www.istockphoto.com/video/journalist-reporting-live-from-london-gm181437798-19450147",
        },
        {
          id: 6,
          title:
            "Showman presents his show, spreading his hands to the sides. The guy in the purple camisole and the cylinder",
          story_path:
            "https://media.istockphoto.com/videos/showman-presents-his-show-spreading-his-hands-to-the-sides-the-guy-in-video-id1157894204",
          web_path:
            "https://www.istockphoto.com/video/showman-presents-his-show-spreading-his-hands-to-the-sides-the-guy-in-the-purple-gm1157894204-316090165",
        },
        {
          id: 7,
          title:
            "Smart Little Boy Wearing Augmented Reality Headset Plays with Space Learning Software, With Gestures He Manipulates 3D Planets, Discovers Facts About Solar System and Cosmos",
          story_path:
            "https://media.istockphoto.com/videos/smart-little-boy-wearing-augmented-reality-headset-plays-with-space-video-id1167521607",
          web_path:
            "https://www.istockphoto.com/video/smart-little-boy-wearing-augmented-reality-headset-plays-with-space-learning-gm1167521607-321982692",
        },
      ],
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
    let { itemStyle, itemInvisible } = styles;
    if (item.empty) {
      return <View style={[itemStyle, itemInvisible]} />;
    }
    return (
      <View style={{ flex: 1, flexDirection: "row", paddingBottom: 30 }}>
        <View style={styles.box} key={index}>
          <Video
            source={{ uri: item.story_path }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={{ color: "#FFF", fontSize: 13, fontWeight: "bold" }}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.web_path)}>
            <Text style={{ fontSize: 10, color: "#FFF", marginTop: 10 }}>
              Open link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Top stories today</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#000099",
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {
    backgroundColor: "#000099",
    alignItems: "center",
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  box: {
    width: Platform.OS === "ios" ? 250 : 220,
    height: Platform.OS === "ios" ? 160 : 140,
    margin: 10,
    backgroundColor: "rgba(250,250,250,1)",
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(192,192,191,0.7)",
  },
  header: {
    color: "#FFF",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 10,
    marginTop: 35,
  },
  descriptionView: {
    width: "40%",
    height: "50%",
    marginTop: 5,
  },
});
