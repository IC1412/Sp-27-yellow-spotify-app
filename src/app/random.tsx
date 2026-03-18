import { StyleSheet, Text, View } from 'react-native';

export default function Random() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Playlist Generator</Text>
      <Text style={styles.text}>Placeholder screen. Add features later.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});