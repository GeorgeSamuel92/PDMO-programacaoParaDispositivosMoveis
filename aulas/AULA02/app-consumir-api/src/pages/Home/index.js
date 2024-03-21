import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaClienteId = () => {
        navigation.navigate('DetalhesCliente');
    }
    const inserirNovoClientes= () => {
        navigation.navigate('NovoCliente');
    }

    const listarTodosClientes= () => {
        navigation.navigate('TodosClientes');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text> Tela HOME </Text>

            <Button title='Abrir pesquisa por ID' onPress={navegaPesquisaClienteId} style={styles.botao} />

            <Button title='Cadastrar novo cliente' onPress={inserirNovoClientes} style= {styles.botao}/>

            <Button title='Exibir todos os cliente' onPress={listarTodosClientes} style={styles.botao} />
            
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    
    botao: {
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        height: 40,
        borderRadius: 4,
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 20,
    },

  });
  