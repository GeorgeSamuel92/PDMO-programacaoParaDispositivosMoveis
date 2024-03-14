import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";
import api from "../../services/api/api";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";


export default function TodosClientes() {
  const navigation = useNavigation();
  const route = useRoute();

  let [flatListClientes, setFlatListClientes] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [status, setStatus] = useState(false);

  const navegarEditar = (pId, pNome, pIdade) => {
    navigation.navigate("EditarCliente", {
      id: pId,
      nome: pNome,
      idade: pIdade,
    });
  };

  const exibeAlert = () => {
    setShowAlert(true);
  };
  const listarClientes = async () => {
    try {
      const response = await api.get("/clientes").catch(function (error) {
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
        if (response.data.length > 0) {
          let temp = [];
          for (let i = 0; i < response.data.length; i++) {
            temp.push(response.data[i]);
            setFlatListClientes(temp);
          }
          temp = [];
        } else {
          setAlertMessage("Nenhum cliente encontrado");
          exibeAlert();
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params?.status) {
      setStatus(route.params.status);
    }
  }, [route.params?.status]);

  useEffect(() => {
    listarClientes();
  }, [status]);

  // useFocusEffect(() => {
  //   listarClientes();
  // });

  let listViewItem = (item) => {
    return (
      <View style={styles.modeloCard}>
        <Text style={styles.textHeader}>ID: </Text>
        <Text style={styles.textValue}>{item.id}</Text>

        <Text style={styles.textHeader}>Nome:</Text>
        <Text style={styles.textValue}>{item.nome}</Text>

        <Text style={styles.textHeader}>Idade:</Text>
        <Text style={styles.textValue}>{item.idade}</Text>

        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => {
              navegarEditar(item.id, item.nome, item.idade);
            }}
          >
            <FontAwesome5 name="edit" size={24} color="darkblue" />
          </TouchableOpacity>

          {/* <TouchableOpacity
          onPress={() => {
            console.log("Apagar pressionado");
          }}
          >
            <FontAwesome5 name="trash" size={24} color="darkred"/>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListClientes}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listViewItem(item)}
        />
      </View>
      {showAlert &&
        Alert.alert("Atenção", alertMessage, [
          {
            text: "OK",
            onPress: () => {
              setShowAlert(false);
              navigation.navigate("TodosClientes", { status: true });
            },
          },
        ])}
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginBottom: 15,
    marginTop: 10,
    gap: 15,
  },
  modeloCard: {
    backgroundColor: "#4f092",
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    margin: 10,
    // alignItems: "center",
    marginTop: 12,
  },
  textHeader: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    font: "Arial",
    marginTop: 10,
    marginLeft: 10,
  },
  textValue: {
    color: "black",
    fontSize: 18,
    marginLeft: 50,
  },
});
