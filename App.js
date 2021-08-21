import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import logo from "./assets/todo.png";

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (!task) {
      Alert.alert("Debe Ingresar una tarea...");
      return;
    }
    if (!taskItems.includes(task)) {
      Keyboard.dismiss();
      setTaskItems((currentItems) => [
        ...taskItems,
        { id: Math.random().toString(), value: task },
      ]);
      setTask(null);
    } else {
      Alert.alert("No se permiten tareas duplicadas...");
    }
  };

  const CompleteTask = (index) => {
    Alert.alert("Atención", "¿Esta seguro de borrar la tarea?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: () => {
          let itemsCopy = [...taskItems];
          itemsCopy.splice(index, 1);
          setTaskItems(itemsCopy);
        },
        style: "OK",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.listTaskTitle}>Listado de Tareas</Text>
        <View style={styles.itemTask}>
          <FlatList
            data={taskItems}
            keyExtractor={(item) => item.id}
            renderItem={(data) => (
              <TouchableOpacity key={data.item.id} onPress={() => CompleteTask(data.item.id)}>
                <Task text={data.item.value} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Ingrese una tarea"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBEBE",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  taskContainer: {
    margin: 25,
  },
  listTaskTitle: {
    fontSize: 32,
    color: "#1B1B1B",
  },
  image: {
    width: 300,
    height: 150,
  },
  button: {
    backgroundColor: "red",
    padding: 7,
    marginTop: 10,
    color: "white",
  },
  itemTask: {
    marginTop: 25,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#c1c1c1",
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#d9534f",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {
    color: "#fff",
    fontSize: 32,
  },
});
