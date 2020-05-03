import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import logo from "./assets/logo.png";
import * as wordList from "./assets/words.json";

export default function App() {
  const [word, setWord] = React.useState(null);
  const [usedLetters, setUsedLetters] = React.useState([]);

  let [fontsLoaded] = useFonts({
    Pacifico: require("./assets/Pacifico-Regular.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

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

  const startNewGame = () => {
    setUsedLetters([]);
    setWord(getRandomWord());
  };

  if (word !== null) {
    const replayButton = () => {
      if (!word.word.split("").every((letter) => usedLetters.includes(letter)))
        return null;

      return (
        <TouchableOpacity style={homepageStyles.button} onPress={startNewGame}>
          <Text style={homepageStyles.buttonText}>Play again</Text>
        </TouchableOpacity>
      );
    };

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
        {replayButton()}
        <View style={guessingStyle.lettersContainer}>{getAlphabet()}</View>
      </View>
    );
  }

  return (
    <View style={homepageStyles.container}>
      <Image source={logo} style={homepageStyles.logo} />
      <TouchableOpacity style={homepageStyles.button} onPress={startNewGame}>
        <Text style={homepageStyles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const homepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0FFEE",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#05c46b",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
  },
  logo: {
    width: 170,
    resizeMode: "contain",
  },
});

const guessingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0FFEE",
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
    fontFamily: "Pacifico",
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
    backgroundColor: "#1e272e",
    marginHorizontal: 6,
    marginVertical: 6,
    width: 40,
    borderRadius: 3,
    paddingHorizontal: 5,
  },
  letter: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  usedLetter: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    opacity: 0.1,
  },
});
