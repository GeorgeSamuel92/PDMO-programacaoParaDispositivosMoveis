import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert,Button } from "react-native";

import api from "../../services/api/api";

export default function NovoCliente() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const exibeAlert = () => {
    setShowAlert(true);
  };
  const salvarCliente = async () => {
    try {
      if (nome == " " || idade == " " || nome == null) {
        setAlertMessage("Preencha corretamente o nome");
        exibeAlert(true);
        return;
      }
      if (isNaN(idade)){
        setAlertMessage("Preencha uma idade valida");
        exibeAlert(true);
        return;
      }
      if (idade == null || idade < 1) {
        setAlertMessage("Preencha uma idade valida");
        exibeAlert(true);
        return;
      }
      const response = await api
        .post("/clientes", {
          nome: nome,
          idade: Number(idade),
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.resquest) {
            if (error.resquest._response.includes("Failed")) {
              console.log("Erro ao conectar com a API");
            }
          } else {
            console.log(error.message);
          }
          console.log(error.confing);
        });

      if (response != undefined) {
        if (response.data[0].affectedRows == 1) {
          setAlertMessage("Cliente Cadastrado com sucesso");
          exibeAlert();
          setNome("");
          setIdade("");
        } else {
          console.log(
            "O registro não foi inserindo, verifique os dados e tente novamente"
          );
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardTitle}>
        <Text style={styles.title}>Cadastrar novo cliente</Text>
      </View>
      <Text> Nome: do cliente:</Text>
      <TextInput style={styles.caixaTexto} value={nome} onChangeText={setNome} />

      <Text> idade do Cliente </Text>
      <TextInput
        style={styles.caixaTexto}
        value={idade.toString()}
        onChangeText={setIdade}
      />

      <TouchableOpacity
        onPress={() => {
          salvarCliente();
        }}
        style={styles.alingVH}c
      >
        <Text>Salvar</Text>
      </TouchableOpacity>

      {showAlert &&
        Alert.alert("Atenção", alertMessage, [
          { text: "OK", onPress: () => setShowAlert(false) },
        ])}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  alingVH: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 40,
    borderRadius: 4,
    backgroundColor: "red",
    marginTop: 20,
    marginBottom: 20
  },
  caixaTexto: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: "80%",
  },
  cardTitle: {
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

});
