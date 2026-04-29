import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, FlatList, Platform, Pressable, Text, TextInput, View } from "react-native";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const searchTracks = async () => {
    try {
      const res = await fetch(
        `https://sp-27-yellow-spotify-app.vercel.app/search?q=${query}`
      );
      const data = await res.json();
      setTracks(data);
      setPlayingIndex(null);

      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const playTrack = async (previewUrl: string, index: number) => {
    if (!previewUrl) return;

    if (Platform.OS === "web") {
      const audio = new Audio(previewUrl);
      audio.play().catch(err => console.error(err));
      setPlayingIndex(index);
      audio.onended = () => setPlayingIndex(null);
      return;
    }

    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: previewUrl,
      });

      setSound(newSound);
      setPlayingIndex(index);
      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate(status => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setPlayingIndex(null);
          newSound.unloadAsync();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

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
                  playingIndex === index && styles.playingButton,
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