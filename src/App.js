import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCJKWnUM3yTTQTLV03JOHIc-IkUfALOzdI',
            authDomain: 'auth-9399f.firebaseapp.com',
            databaseURL: 'https://auth-9399f.firebaseio.com',
            projectId: 'auth-9399f',
            storageBucket: 'auth-9399f.appspot.com',
            messagingSenderId: '278467811310'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );

            case false:
                return <LoginForm />;

            default:
                return <Spinner size="large" />; 
        }
    }
    render() {
        return (
            <Card>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </Card>
        );
    }
}

export default App;
