import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { DatabaseConnection } from "./src/database/database";

const db = new DatabaseConnection.getConnection();

export default function App() {
  const [nome, setNome] = useState(null);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS clientes (id INTERGER PRIMARY KEY AUTOINCREMENT, nome TEXT)",
        [],
        () => console.log("Tabela clientes criada com sucesso"),
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite um nome"
      />

      <Button title="Cadastrar" />

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
