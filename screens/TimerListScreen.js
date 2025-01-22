import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { Ionicons } from '@expo/vector-icons'; // For the filter icon
import CategorySection from '../components/CategorySection';
import { categories } from '../utils/constants';

export default function TimerListScreen({ navigation }) {
  const [timers, setTimers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category is 'All'
  const [filterVisible, setFilterVisible] = useState(false); // Modal visibility state

  const fetchTimers = async () => {
    const storedTimers = JSON.parse(await AsyncStorage.getItem('timers')) || [];
    setTimers(storedTimers);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTimers);
    return unsubscribe;
  }, [navigation]);

  // Group timers by category, applying the selectedCategory filter
  const groupedTimers = categories
    .filter((category) => selectedCategory === 'All' || category === selectedCategory) // Filter categories based on selection
    .map((category) => ({
      category,
      timers: timers.filter((timer) => timer.category === category),
    }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Timer App</Text>

      {/* Timer List */}
      <FlatList
        data={[{ category: 'Add Timer', timers: [] }, ...groupedTimers]}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) =>
          item.category === 'Add Timer' ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Add Timer')}
            >
              <Text style={styles.addButtonText}>+ Add Timer</Text>
            </TouchableOpacity>
          ) : (
            <CategorySection
              category={item.category}
              timers={item.timers}
              fetchTimers={fetchTimers}
            />
          )
        }
        contentContainerStyle={styles.scrollContainer}
      />

      {/* Filter Icon */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterVisible(true)}
      >
        <Ionicons name="filter" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.modalButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#4C6A92',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  addButton: {
    backgroundColor: '#4C6A92',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 70, // Added extra space for the filter icon
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4C6A92',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4C6A92',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4C6A92',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
