import { StyleSheet, Text, View } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.text}>Here you will be able to search for songs, artists, and playlists.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#121010',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
});