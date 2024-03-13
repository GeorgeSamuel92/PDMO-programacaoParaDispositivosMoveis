import React, { useState } from "react";
import { StatusBar } from "@react-navigation/native"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {

    const navigation = useNavigation();
    const navegapesquisaID = () => {
        navigation.navigate('DetalhesCliente');
    }

    const navegaNovoClietne= () => {
        navigation.navigate('NovoCliente');
    }

    const navegaTodosClietne= () => {
        navigation.navigate('TodosClientes');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text> Ola! </Text>
            <Button title='Abrir pesquisa por ID' onPress={navegapesquisaID} style={styles.botao} />
            <Button title='Cadastrar novo cliente' onPress={navegaNovoClietne} style= {styles.botao}/>
            <Button title='Exibir todos os cliente' onPress={navegaTodosClietne} style={styles.botao} />
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
    botao: {
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        height: 40,
        borderRadius: 4,
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 20
    },

  });
  