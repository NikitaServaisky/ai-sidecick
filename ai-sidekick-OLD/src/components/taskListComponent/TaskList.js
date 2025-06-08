import React from "react";
import { FlatList, TouchableOpacity, Text, } from "react-native";
import styles from './taskList.styles';

export default function TaskList({tasks, toggleTaskDone}) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
                    <Text style={[styles.task, item.done && styles.done]}>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
    );
}