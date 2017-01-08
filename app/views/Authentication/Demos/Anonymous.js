import React from 'react'

import {
  View,
  Text,
  NativeModules
} from 'react-native'

import env from '../../../../config/environment';
import { Container, Header, Title, Content, Button } from 'native-base';
import appStyles from '../../../styles/app';

export class Anonymous extends React.Component {

  componentWillMount() {
    const {firestack} = this.props;

    this.unsubscribe = firestack.auth().onAuthStateChanged(function(user) {
      console.log('auth state changed', user);
    });
  }

  loginAnonymously(evt) {
    const {firestack} = this.props;
    firestack.auth().signInAnonymously()
      .then(u => {
        console.log('Signed in!', u);
      })
      .catch(err => {
        console.log('An error occurred', err);
      });
  }

  componentWillUnmount() {
    const {firestack} = this.props;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <Container> 
        <Content>
          <Button
            onPress={this.loginAnonymously.bind(this)}>
              Anonymously login
          </Button>
        </Content>
      </Container>
    )
  }

}

export default Anonymous