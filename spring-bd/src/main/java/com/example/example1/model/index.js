import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Button, Header, Icon } from 'react-native-elements';
import logo from './../../../../../assets/images/logo.png'

//esta  clase lisa la colecion de carts segun el email del usuario, tambine puede navegar
//al componente ChooseAdress si unde el boton seguir con la compra
function CartList (props) {
  const [lista, setLista] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const {navigate} = props.navigation;
  const {navigation} = props;
  const {user, firestore} = props;

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log('focus carts');
      var response = []
      var sum = 0;
      firestore().collection('carts').get()
      .then((snapshot) => {
        var response = [];
        snapshot.forEach((doc) => {
          if (doc.data().email === user.email) {
            sum = sum + Number(doc.data().cant)*Number(doc.data().price);
            response.push(doc.data());
          }
        });
        setLista(response);
        setSubTotal(sum)
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
      return () => {
        console.log('unfocus carts');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style = {styles.container}>
      <Header
        leftComponent = {() => {
          return (
            <Icon
              name = 'menu'
              onPress = {() => {
                navigation.openDrawer();
              }}
            />
          );
        }}
        rightComponent = {() => {
          return (
            <Image
              source = {logo}
              style = {styles.img}
            />
          );
        }}
        containerStyle = {{
          backgroundColor: '#ffffff',
          justifyContent: 'space-around',
        }}
      />
      <View style = {styles.center}>
        <Text style = {styles.title}>
          subTotal:
        </Text>
        <Text style = {styles.title}>
          {subTotal}
        </Text>
      </View>
      <Button
        buttonStyle = {styles.btn}
        titleStyle = {styles.title}
        title = 'Limpiar carrito'
        onPress = {
          () => {
            if (lista.length > 0) {
              firestore().collection('carts').get()
              .then((snapshot) => {
                snapshot.forEach((doc) => {
                  if (doc.data().email === user.email) {
                    firestore().collection('carts').doc(doc.data().email + doc.data().nameProduct).delete();
                  }
                });
                setLista([]);
                setSubTotal(0);
                Alert.alert(
                  'Exito',
                  'Eliminado exitosamente',
                  [{
                    text: 'ok',
                    onPress: () => console.log('ok Pressed'),
                  }],
                  {cancelable: false},
                );
              })
              .catch((err) => {
                console.log('Error deleting documents', err);
              });
            }
          }
        }
      />
      <ScrollView>
        {
          lista.map((info, i) => {
            return (
              <Card
                key = {i}
                containerStyle = {styles.subcontainer}
                title = {info.nameProduct}
                titleStyle = {styles.title}
              //image={require('../images/pic2.jpg')}
              >
                <View style = {styles.center}>
                  <Text style = {styles.title}>
                    {'COP$ ' + info.price}
                  </Text>
                  <Text style = {styles.title}>
                    {'cantidad: ' + info.cant}
                  </Text>
                </View>
              </Card>
            );
          })
        }
      </ScrollView>
      <Button
        buttonStyle = {styles.btn}
        titleStyle = {styles.title}
        title = 'Seguir con la compra'
        onPress = {
          () => {
            if (lista.length > 0) {
              navigate('Choose Adress', {productListInfo: lista, subTotal});
            }
            else {
              Alert.alert(
                'Error',
                'Primero debe agregar productos al carrito',
                [{
                  text: 'ok',
                  onPress: () => console.log('ok Pressed'),
                }],
                {cancelable: false},
              );
            }
          }
        }
      />
    </View>
  );
}

function CartListNav({route, navigation}) {
  const {firestore, user} = route.params;
  return (
    <CartList
      navigation = {navigation}
      firestore = {firestore}
      user = {user}
    />
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
	},
  img: {
    height: 40,
    width: 30,
    resizeMode: 'contain',
  },
  subcontainer: {
    backgroundColor: '#ffffff',
	},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 16,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#f8f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: '100%',
    elevation: 3,
  },
});

export default CartListNav;
