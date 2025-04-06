// Inside WorkerScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const WorkerScreen = () => {
  const navigation = useNavigation();

  const mechanicName = 'Jani Dhruv';
  const workingFor = 'Redline Auto Garage';

  const assignedTask = {
    title: 'Battery Replacement',
    description: 'Replace car battery for a Hyundai i20 near Downtown Street.',
    date: 'April 6, 2025',
  };

  const previousWorks = [
    {
      title: 'Engine Repair',
      description: 'Repaired and tuned a 4-cylinder petrol engine.',
      date: 'March 10, 2025',
    },
    {
      title: 'Brake Replacement',
      description: 'Replaced brake pads and rotors for a Toyota Corolla.',
      date: 'February 28, 2025',
    },
    {
      title: 'Oil Change',
      description: 'Performed full oil and filter change.',
      date: 'February 18, 2025',
    },
  ];

  const handleConfirmLocationPress = () => {
    navigation.navigate('YourLocation');
  };

  const handleAssignedTaskPress = () => {
    navigation.navigate('TrackUserLocation'); // 👈 navigate to the new screen
  };

  return (
    <ScrollView style={styles.container}>
      {/* Red Header */}
      <View style={styles.redSection}>
        <Text style={styles.heading}>Worker Profile</Text>
        <Text style={styles.subHeading}>{mechanicName}</Text>
        <Text style={styles.workingFor}>Working at: {workingFor}</Text>

        {/* Confirm Location Button */}
        <TouchableOpacity onPress={handleConfirmLocationPress} style={styles.locationButton}>
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>

      {/* Task Assigned */}
      <View style={styles.taskSection}>
        <Text style={styles.sectionTitle}>Task Assigned</Text>
        <TouchableOpacity onPress={handleAssignedTaskPress}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>{assignedTask.title}</Title>
              <Paragraph>{assignedTask.description}</Paragraph>
              <Text style={styles.date}>{assignedTask.date}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Previous Work */}
      <View style={styles.workSection}>
        <Text style={styles.sectionTitle}>Previous Work History</Text>
        {previousWorks.map((work, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>{work.title}</Title>
              <Paragraph>{work.description}</Paragraph>
              <Text style={styles.date}>{work.date}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop:30
  },
  redSection: {
    backgroundColor: '#E50914',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeading: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
  },
  workingFor: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  locationButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#E50914',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskSection: {
    padding: 20,
  },
  workSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  date: {
    marginTop: 6,
    color: 'gray',
    fontSize: 12,
  },
});

export default WorkerScreen;
