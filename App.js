import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import logo from "./assets/icon.png";
import * as wordList from "./assets/words.json";

export default function App() {
  const [word, setWord] = React.useState(null);
  const [usedLetters, setUsedLetters] = React.useState([]);

  const getAlphabet = () => {
    const letters = [..."abcdefghijklmnopqrstuvwxyz"];
    return letters.map((letter) => (
      <TouchableOpacity
        key={letter}
        onPress={() => {
          setUsedLetters([...usedLetters, letter]);
        }}
        style={guessingStyle.letterButton}
        disabled={usedLetters.includes(letter)}
      >
        <Text
          style={
            usedLetters.includes(letter)
              ? guessingStyle.usedLetter
              : guessingStyle.letter
          }
        >
          {letter}
        </Text>
      </TouchableOpacity>
    ));
  };

  const getRandomWord = () => {
    const words = [];
    for (const category in wordList) {
      if (category !== "default") {
        wordList[category].forEach((word) => {
          words.push({ word, category });
        });
      }
    }
    return words[Math.floor(Math.random() * words.length)];
  };

  if (word !== null) {
    return (
      <View style={guessingStyle.container}>
        <Text style={guessingStyle.category}>{word.category}</Text>
        <Text style={guessingStyle.word}>
          {word.word
            .split("")
            .map((letter) =>
              usedLetters.includes(letter) || letter === " " ? letter : "_"
            )
            .join(" ")}
        </Text>
        <View style={guessingStyle.lettersContainer}>{getAlphabet()}</View>
      </View>
    );
  }

  return (
    <View style={homepageStyles.container}>
      <Image source={logo} style={homepageStyles.logo} />
      <TouchableOpacity
        style={homepageStyles.button}
        onPress={() => setWord(getRandomWord())}
      >
        <Text style={homepageStyles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const homepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#2FFAC3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: "#1a1a1a",
    fontSize: 32,
  },
  logo: {
    width: 1230,
    resizeMode: "contain",
  },
});

const guessingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    position: "absolute",
    top: 50,
    fontSize: 40,
  },
  word: {
    fontSize: 35,
  },
  lettersContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  letterButton: {
    backgroundColor: "#C0FFEE",
    marginHorizontal: 6,
    marginVertical: 6,
    width: 40,
    borderRadius: 3,
    paddingHorizontal: 5,
  },
  letter: {
    textAlign: "center",
    fontSize: 30,
  },
  usedLetter: {
    textAlign: "center",
    fontSize: 30,
    opacity: 0.1,
  },
});
