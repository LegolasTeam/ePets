import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent,
  RkStyleSheet
} from 'react-native-ui-kitten';

import Icon from "react-native-vector-icons/FontAwesome";

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);

    this.likes = this.props.likes || 18;
    this.comments = this.props.comments || 26;
    this.shares = this.props.shares || 5;
    this.state = {
      likes: this.likes,
      comments: this.comments,
      shares: this.shares,
    }
  }

  render() {
    //let {container, section, icon, label} = this.defineStyles();
    //console.log(container)

    let likes = this.state.likes + (this.props.showLabel ? ' Likes' : '');
    let comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
    let shares = this.state.shares + (this.props.showLabel ? ' Shares' : '');

    let updateLikes = () => {
      if (this.state.likes === this.likes)
        this.setState({likes: this.state.likes + 1});
      else
        this.setState({likes: this.likes});
    };

    let updateComments = () => {
      this.props.navigation.navigate('Comments',{ id: this.props.id})
    };

    let updateShares = () => {
      if (this.state.shares === this.shares)
        this.setState({shares: this.state.shares + 1});
      else
        this.setState({shares: this.shares});
    };


    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <RkButton rkType='clear' onPress={updateLikes}>
            <RkText rkType='awesome primary' style={styles.icon}><Icon name="heart-o" size={25} /></RkText>
            <RkText rkType='primary primary4' style={styles.label}>{likes}</RkText>
          </RkButton>
        </View>
        <View style={styles.section}>
          <RkButton rkType='clear' onPress={updateComments}>
            <RkText rkType='awesome hintColor' style={styles.icon}><Icon name="comment-o" size={25} /></RkText>
            <RkText rkType='primary4 hintColor' style={styles.label}>{comments}</RkText>
          </RkButton>
        </View>
        <View style={styles.section}>
          <RkButton rkType='clear' onPress={updateShares}>
            <RkText rkType='awesome hintColor' style={styles.icon}><Icon name="share" size={25} /></RkText>
            <RkText rkType='primary4 hintColor' style={styles.label}>{shares}</RkText>
          </RkButton>
        </View>
      </View>
    )
  }
}
let styles = RkStyleSheet.create(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  section: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    fontSize: 20
  },
  label: {
    marginLeft: 8,
    alignSelf: 'flex-end'
  }
}))