import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify+</Text>
      <Text style={styles.subtitle}>Welcome to your project</Text>

      <View style={styles.menuContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/random')}>
          <Text style={styles.buttonText}>Generate Random Playlist</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/explore')}>
          <Text style={styles.buttonText}>Search Songs</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/library')}>
          <Text style={styles.buttonText}>View Library</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 18,
    marginBottom: 30,
  },
  menuContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});