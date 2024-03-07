import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import api from "./src/services/api/api";

export default function App() {
  const [cliente, setCliente] = useState([]);

  const getCliente = async () => {
    try {
      const { data } = await api.get(`/clientes/17`);
      console.log(data)
      setCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.texInput}
      >

      </TextInput>


      <TouchableOpacity 
      onPress={() => getCliente()} 
      style={styles.botao}
      >
        <Text style={{ color: "white" }}>pressione para pesquisar</Text>
      </TouchableOpacity>

      <Text>ID do cliente: {cliente[0]?.id} </Text>
      <Text>Nome do cliente: {cliente[0]?.nome} </Text>
      <Text>Idade do cliente: {cliente[0]?.idade} </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    alingItens: "center",
    justifyContent: "center",
    width: "80%",
    height: 40,
    borderRadius: 4,
    backgroundColor: "red",
  },
  texinput:{
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },

});
