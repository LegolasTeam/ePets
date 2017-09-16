import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Timeline from "react-native-timeline-listview";
import firebase from "../../utils/firebase";
import moment from "moment";

class Timelines extends Component {
  constructor() {
    super();
    this.data = [];

    // this.data = [
    //   {
    //     time: "08.01.1996",
    //     title: "Archery Training",
    //     description:
    //       "The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ",
    //     lineColor: "#009688",
    //     imageUrl:
    //       "https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg"
    //   },
    //   {
    //     time: "08.01.1996",
    //     title: "Play Badminton",
    //     description:
    //       "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
    //     imageUrl:
    //       "https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg"
    //   },
    //   {
    //     time: "08.01.1996",
    //     title: "Lunch",
    //     description: "Lunch time!",
    //     imageUrl:
    //       "https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg"
    //   },
    //   {
    //     time: "08.01.1996",
    //     title: "Watch Soccer",
    //     description:
    //       "Team sport played between two teams of eleven players with a spherical ball. ",
    //     lineColor: "#009688",
    //     imageUrl:
    //       "https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg"
    //   },
    //   {
    //     time: "08.01.1996",
    //     title: "Go to Fitness center",
    //     description: "Look out for the Best Gym & Fitness Centers around me :)",
    //     imageUrl:
    //       "https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg"
    //   }
    // ];
    this.state = {
      selected: null,
      data: []
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("Users")
      .child("rocky_dog")
      .child("posts")
      .on("child_added", data => {
        let t = {
          id: data.key,
          time: moment.unix(data.val().date).fromNow(),
          description: data.val().caption,
          imageUrl: data.val().url
        };
        this.data.push(t);
      });
    this.setState({
      data: this.data.reverse()
    });
  }
  onEventPress = data => {
    this.props.navigation.navigate("Feed", {
      info: {
        item: {
          root: "rocky_dog",
          id: data.id,
          post: { caption: data.description, url: data.imageUrl },
          user: {
            ava:
              "https://firebasestorage.googleapis.com/v0/b/epets-80b54.appspot.com/o/ProfilePictures%2Fhusky_dog%2Fpics%2Frocky_dog.PNG?alt=media&token=4910e27c-944d-469a-ad9e-f03cebe6cb00",
            name: "Rocky"
          }
        }
      }
    });
  };

  renderDetail(rowData, sectionID, rowID) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: 100, borderRadius: 10 }}
          source={{ uri: rowData.imageUrl }}
        />
        <Text style={{ color: "black", marginTop: 5 }}>
          {rowData.description}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length == 0 ? (
          <Text>loading...</Text>
        ) : (
          <Timeline
            style={styles.list}
            data={this.state.data}
            circleSize={20}
            circleColor="rgba(0,0,0,0)"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{ minWidth: 52, marginTop: 5 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "#ff9797",
              color: "white",
              padding: 5,
              borderRadius: 13
            }}
            options={{ style: { paddingTop: 5 } } // descriptionStyle={{ color: "gray" }}
            }
            innerCircle={"dot"}
            circleColor={"#ff0000"}
            separator={false}
            onEventPress={this.onEventPress}
            renderDetail={(rowData, sectionID, rowID) =>
              this.renderDetail(rowData, sectionID, rowID)}
            columnFormat="two-column"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "white"
  },
  list: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: "gray"
  }
});

export default Timelines;
