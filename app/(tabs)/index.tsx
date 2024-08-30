// app/HomeScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Linking } from 'react-native';

const HomeScreen = () => {
  const [urls, setUrls] = useState('');

  const handleStartOpening = async () => {
    if (!urls.trim()) {
      Alert.alert('Error', 'Please enter URLs.');
      return;
    }

    // Clean the URLs: remove quotation marks and extra spaces
    const cleanedUrls = urls
      .replace(/"/g, '')  // Remove all double quotation marks
      .replace(/'/g, '')  // Remove all single quotation marks
      .trim();            // Remove any leading or trailing spaces

    // Split URLs by commas and remove empty entries
    const urlArray = cleanedUrls.split(',').map(url => url.trim()).filter(url => url);

    if (urlArray.length === 0) {
      Alert.alert('Error', 'No valid URLs provided.');
      return;
    }

    // Open URLs with a delay of 5 seconds
    for (let i = 0; i < urlArray.length; i++) {
      const url = urlArray[i];
      if (url) {
        setTimeout(() => {
          Linking.openURL(url).catch(err =>
            Alert.alert('Error', `Failed to open ${url}: ${err}`)
          );
        }, i * 3000); // 5000 milliseconds = 5 seconds
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Paste URLs separated by commas"
        value={urls}
        onChangeText={setUrls}
      />
      <Button title="Start Opening" onPress={handleStartOpening} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
