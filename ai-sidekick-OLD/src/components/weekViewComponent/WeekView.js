import React from 'react';
import { FlatList, TouchableOpacity, Text, } from 'react-native';
import styles from './weekView.styles';

export default function WeekView({week, selectedDate, setSelectedDate}) {
    return (
        <FlatList
            horizontal
            data={week}
            keyExtractor={(item) => item.formatted}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={[styles.dayButton,
                        selectedDate === item.formatted && styles.daySelected,
                    ]}
                    onPress={() => setSelectedDate(item.formatted)}
                >
                    <Text>{item.formatted.split(',')[0]}</Text>
                    <Text>{item.formatted.split(',')[1]}</Text>
                </TouchableOpacity>
            )}        
        />
    );
}
