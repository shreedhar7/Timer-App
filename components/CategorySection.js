import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import TimerCard from './TimerCard'; // Assuming you have a TimerCard component

export default function CategorySection({ category, timers, fetchTimers }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={styles.container}>
      {/* Category Header */}
      <TouchableOpacity 
        style={styles.headerContainer} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View>
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.timerCount}>{`${timers.length} Timers`}</Text>
        </View>
        <IconButton
          icon={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          onPress={() => setIsExpanded(!isExpanded)}
          color="#000"
        />
      </TouchableOpacity>

      {/* Timer List */}
      {isExpanded && (
        <FlatList
          data={timers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TimerCard timer={item} fetchTimers={fetchTimers} />
          )}
          style={styles.timerList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F0FE', // Light blue background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A73E8', // Blue text color
  },
  timerCount: {
    fontSize: 14,
    color: '#5F6368', // Muted gray for secondary text
    marginTop: 4,
  },
  timerList: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
});
