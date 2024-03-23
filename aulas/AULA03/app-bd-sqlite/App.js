import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { DatabaseConnection } from "./src/database/database";

const db = new DatabaseConnection.getConnection();

export default function App() {
  const [nome, setNome] = useState(null);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)",
        [],
        () => console.log("Tabela clientes criada com sucesso!"),
        (er, error) => console.error(er, error)
      );
    });
  }, []);

  const adicionarCliente = () => {
    if (nome == null || nome.trim() === "") {
      Alert.alert("ERROR", "Insira um valor válido para o nome!");
      return;
    }

    db.transaction(tx => {
      tx.executeSql("INSERT INTO clientes (nome) VALUES (?)",
        [nome],
        (_) => {
          Alert.alert("INFO", "Cliente adicionado com sucesso!");
          setNome("");
          atualizarLista();
        },
        (_, error) => {
          console.error("Erro ao inserir dados: ", error);
          Alert.alert("ERROR", "Ocoreu um erro ao adcionar o cliente");
        }
      );
    });
  };

  const atualizarLista = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM clientes;",
        [],
        (_, { rows }) => {
          setRegistros(rows._array);
        }
      );
    });
  };

  useEffect(() =>{
    atualizarLista();
  },[])

  const excluirCliente = (id) => {
    db.transaction(tx=>{
      tx.executeSql("DELETE FROM clientes WHERE id = ?",
      [id],
      (_, { rowsAffected}) => {
        if (rowsAffected > 0){
          atualizarLista();
          Alert.alert("INFO", "Cliente excluido com sucesso!")
        }else{
          Alert.alert("ERROR", "Registro não excluido, verifique e tente novamente")
        }
      },
      (_, error) => {
        console.error("Erro ao excluir registro: ", error);
      }
    )
  })
}

  return (
    <View style={styles.container}>

      {registros.map(item => (
        <View key={item.id}>
          <Text>{item.id}</Text>
          <Text>{item.nome}</Text>
          <Button title="Deletar" onPress={() => excluirCliente(item.id)} />
        </View>
      ))}

      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite um nome"
      />

      <Button title="Cadastrar" onPress={adicionarCliente} />

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
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
