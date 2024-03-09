import React, { useState } from "react";
import { StatusBar } from "@react-navigation/native"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {

    const navigation = useNavigation();
    const navegapesquisaID = () => {
        navigation.navigate('DetalhesCliente');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text> Ola! </Text>
            <Button title='Abrir pesquisa por ID' onPress={navegapesquisaID} >Clique</Button>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },

  });
  