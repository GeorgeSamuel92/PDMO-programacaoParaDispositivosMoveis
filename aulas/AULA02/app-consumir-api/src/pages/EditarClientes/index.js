import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from "react-native";
import { useNavigation, useRoute, StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../services/api/api";

export default function EditarCliente() {
  const navigation = useNavigation();
  const route = useRoute();

  const [txtId, setTxtId] = useState(route.params?.id);
  const [txtNome, setTxtNome] = useState(route.params?.nome);
  const [txtIdade, setTxtIdade] = useState(route.params?.idade);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

<<<<<<< HEAD
=======
 

>>>>>>> be92bb31f5552088b8ebb3978342a83f130ff1ef
  const handleShowAlert = () => {
    setShowAlert(true);
  };
  
  const editarCliente = async (id) => {
    try {
      console.log(txtNome, txtIdade);

      if (txtNome == " "  || txtNome == null) {
        setAlertMessage("Preencha corretamente o nome");
        handleShowAlert();
        return;
      }
      if (isNaN(Number(txtIdade))) {
        setAlertMessage("Preencha uma idade valida");
        handleShowAlert();
        return;
      }
      if (txtIdade == null || txtIdade== ("") || txtIdade < 1) {
        setAlertMessage("Preencha uma idade valida");
        handleShowAlert();
        return;
      }

      const response = await api.put(`/clientes/${txtId}`, {nome: txtNome, idade: Number(txtIdade) })
        .catch(function (error) {
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
          } else if (error.resquest) {
            if ((error.resquest._response).includes("Failed")) {
              console.error("Erro ao conectar com a API");
            }

          } else {
            console.log('Error',error.message);
          }
          // console.log(error.confing);
        });
      console.log((response));
      if (response != undefined) {
        if (response.data[0].changedRows == 1) {
          setTxtId('');
          setTxtNome("");
          setTxtIdade("");
          setAlertMessage("Cliente alterado com sucesso");
          handleShowAlert();
        } else {
          setAlertMessage(
            "O registro não foi alterado, verifique os dados e tente novamente");
            handleShowAlert();
        }
      }
    }
     catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{width: '80%' }}>
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
      </View>

      <TouchableOpacity
                onPress={() => {
                    editarCliente()
                }}
                style={[styles.alignVH, { width: '80%', height: 40, borderColor: 'black', backgroundColor: 'blue', borderRadius: 4 }]}>
                <Text style={{ color: 'white' }}>Salvar</Text>
      </TouchableOpacity>

      {showAlert && (Alert.alert(
        "Atenção",
         alertMessage, 
         [
          { 
            text: "OK", onPress: () => {
              setShowAlert(false) 
            },
          }
        ],
        { cancelable: false }
        ))}
        <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
  },
  alingVH: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignItems: "center",
    // justifyContent: "center",
    // width: "70%",
    // height: 40,
    // borderRadius: 4,
    // backgroundColor: "red",
    // marginTop: 20,
    // marginBottom: 20,
  },
  caixaTexto: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  alingLeft: {
    alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'auto',
        paddingLeft: 45
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
