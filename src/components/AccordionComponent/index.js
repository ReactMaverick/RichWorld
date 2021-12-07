import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { View,Text} from 'react-native';
import styles from "./styles";
import HTMLView from 'react-native-htmlview';

export default class AccordionComponent extends Component {
  constructor(props){
    
    super(props);
    this.state = {
      activeSections: [],
      SECTIONS: props.item
    }
  }
 

  

  _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.faq_title}</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <HTMLView
        value={section.faq_desc}
        stylesheet={styles.contentText}
      />
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.state.SECTIONS}
        activeSections={this.state.activeSections}    
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
