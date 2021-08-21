import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Task(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View></View>
        <Text>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:20
  },
  itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#d9534f",
    borderWidth:2,
    borderRadius: 5
  },
});
