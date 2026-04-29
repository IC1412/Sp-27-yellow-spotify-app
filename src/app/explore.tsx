import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Mobile-only sound object
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Search backend for tracks
  const searchTracks = async () => {
    try {
      //CHANGE THIS BACK IF IT DOESNT WORK!!! const res = await fetch(`http://192.168.1.155:8081/search?q=${query}`);
      const res = await fetch(`https://sp-27-yellow-spotify-app.vercel.app/search?q=${query}`);
      const data = await res.json();
      setTracks(data);
      setPlayingIndex(null);

      // Stop previous mobile sound ALSO NOT WORKING RIGHT NOW
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //plays preview url of track, with different handling for web vs mobile
  const playTrack = async (previewUrl: string, index: number) => {
    if (!previewUrl) return;

    // Web playback NOT WORKING RIGHT NOW
    if (Platform.OS === "web") {
      const audio = new Audio(previewUrl);
      audio.play().catch(err => console.error("Web playback error:", err));
      setPlayingIndex(index);
      audio.onended = () => setPlayingIndex(null);
      return;
    }

    // Mobile playback cant check with current sdk
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: previewUrl });
      setSound(newSound);
      setPlayingIndex(index);
      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setPlayingIndex(null);
          newSound.unloadAsync();
        }
      });
    } catch (err) {
      console.error("Mobile playback error:", err);
    }
  };

<<<<<<< Updated upstream
=======

export default function Explore() {
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a song..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchTracks} />

      <FlatList
        data={tracks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.trackItem}>
            <View style={styles.trackInfo}>
              <Text style={styles.trackName}>{item.name}</Text>
              <Text style={styles.trackArtist}>{item.artist}</Text>
            </View>
            {item.preview_url ? (
              <Pressable
                style={[
                  styles.playButton,
                  playingIndex === index && styles.playingButton
                ]}
                onPress={() => playTrack(item.preview_url, index)}
              >
                <Text style={styles.playButtonText}>
                  {playingIndex === index ? "Playing" : "Play"}
                </Text>
              </Pressable>
            ) : (
              <Text style={{ color: "#999" }}>No Preview</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  trackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  trackInfo: { flexShrink: 1 },
  trackName: { fontWeight: "bold" },
  trackArtist: { color: "#555" },
  playButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#e04545",
    borderRadius: 5,
  },
  playingButton: {
    backgroundColor: "#4caf50",
  },
  playButtonText: { color: "#fff", fontWeight: "bold" },
});