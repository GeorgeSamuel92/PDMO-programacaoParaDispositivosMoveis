import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import api from "./src/services/api/api";

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [idCli, setIdCli] = useState(0);

  const getCliente = async (id) => {
    try {
      const { data } = await api.get(`/clientes/${id}`);
      console.log(data);
      setCliente(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texinput}
        placeholder="Id Cliente"
        onChangeText={setIdCli}
        value={idCli}
      ></TextInput>

      <TouchableOpacity onPress={() => getCliente(idCli)} style={styles.botao}>
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
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 40,
    borderRadius: 4,
    backgroundColor: "red",
  },
  texinput: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});
