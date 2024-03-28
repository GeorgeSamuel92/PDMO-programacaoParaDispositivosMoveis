import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert,Button } from "react-native";

import api from "../../services/api/api";

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [idCli, setIdCli] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const getCliente = async (id) => {
    try {
      if (id > 0) {
        const response = { data } = await api.get(`/clientes/${id}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.resquest) {
              if (error.resquest._response.includes("Falied")) {
                console.log("Erro ao conectar com a API");
              }
            } else {
              console.log("Error", error.message);
            }
            console.log(error.mensagem)
          });

          if (response != undefined) {
            if(response.data.length === 0){
              setCliente([])
              setShowAlert(true)
            }else {
              setCliente(response.data)
            }
          }

      } else {
        setCliente([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texInput}
        placeholder="ID Cliente"
        keyboardType="numeric"
        onChangeText={setIdCli}
        value={idCli}
      ></TextInput>

      <TouchableOpacity onPress={() => getCliente(idCli)} style={styles.botao}>
        <Text style={{ color: "white" }}>pressione para pesquisar</Text>
      </TouchableOpacity>

      <Text>ID: </Text>
      <TextInput
        style={styles.texInput}
        value={cliente[0]?.id.toString()}
      ></TextInput>
      <Text>Nome: </Text>
      <TextInput style={styles.texInput} value={cliente[0]?.nome}></TextInput>
      <Text>Idade: </Text>
      <TextInput
        style={styles.texInput}
        value={cliente[0]?.idade.toString()}
      ></TextInput>

      {showAlert &&
        Alert.alert(
          "Informação", "Esse registro não foi localizado na base de dados",
          [
            { text: "ok", onPress: () => setShowAlert(false) }
          ])}
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
  texInput: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
