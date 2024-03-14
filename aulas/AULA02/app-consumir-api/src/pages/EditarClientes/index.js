import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
} from "react-native";
import api from "../../services/api/api";
import { safeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function EditarCliente() {
  const route = useRoute();

  const [txtId, setTxtId] = useState(route.params?.id);
  const [txtNome, setTxtNome] = useState(route.params?.nome);
  const [txtIdade, setTxtIdade] = useState(route.params?.idade);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const exibeAlert = () => {
    setShowAlert(true);
  };
  const editarCliente = async () => {
    try {
      if (txtNome == " "  || txtNome == null) {
        setAlertMessage("Preencha corretamente o nome");
        exibeAlert(true);
        return;
      }
      if (isNaN(txtIdade)) {
        setAlertMessage("Preencha uma idade valida");
        exibeAlert(true);
        return;
      }
      if (txtIdade == null || txtIdade== ("") || txtIdade < 1) {
        setAlertMessage("Preencha uma idade valida");
        exibeAlert(true);
        return;
      }

      const response = await api.put(`/clientes/${txtId}`, {
          nome: txtNome,
          idade: Number(txtIdade),
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
        if (response.data[0].onChangeRows == 1) {
          setAlertMessage("Cliente alterado com sucesso");
          exibeAlert();
          setTxtId('');
          setTxtNome("");
          setTxtIdade("");
        } else {
          console.log(
            "O registro não foi alterado, verifique os dados e tente novamente"
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
      
      <Text> ID</Text>
      <TextInput
        style={styles.caixaTexto}
        value={txtId.toString()}
        onChangeText={setTxtId}
        readOnly
      />

      <Text> Nome: do cliente:</Text>
      <TextInput
        style={styles.caixaTexto}
        value={txtNome}
        onChangeText={setTxtNome}
      />

      <Text> idade do Cliente </Text>
      <TextInput
        style={styles.caixaTexto}
        value={txtIdade.toString()}
        onChangeText={setTxtIdade}
      />

      <TouchableOpacity
        onPress={() => {
          editarCliente();
        }}
        style={styles.alingVH}
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
    marginBottom: 20,
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
