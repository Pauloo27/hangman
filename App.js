import React from "react";
import * as Localization from "expo-localization";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import * as localeEnglish from "./assets/locale/en_US.json";
import * as localePortuguese from "./assets/locale/pt_BR.json";
import logo from "./assets/logo.png";
import man0 from "./assets/man/0.png";
import man1 from "./assets/man/1.png";
import man2 from "./assets/man/2.png";
import man3 from "./assets/man/3.png";
import man4 from "./assets/man/4.png";
import man5 from "./assets/man/5.png";
import man6 from "./assets/man/6.png";

const images = {
  0: man0,
  1: man1,
  2: man2,
  3: man3,
  4: man4,
  5: man5,
  6: man6,
};

export default function App() {
  const [word, setWord] = React.useState(null);
  const [usedLetters, setUsedLetters] = React.useState([]);
  const [locale, setLocale] = React.useState(localeEnglish);
  const [logoClickCount, setLogoClickCount] = React.useState(0);

  if (locale !== localePortuguese && Localization.locale == "pt-BR")
    setLocale(localePortuguese);

  let [fontsLoaded] = useFonts({
    Pacifico: require("./assets/Pacifico-Regular.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

  const getAlphabet = (disabled) => {
    const letters = [..."abcdefghijklmnopqrstuvwxyz"];
    return letters.map((letter) => (
      <TouchableOpacity
        key={letter}
        onPress={() => {
          setUsedLetters([...usedLetters, letter]);
        }}
        style={guessingStyle.letterButton}
        disabled={usedLetters.includes(letter) || disabled}
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
    for (const category in locale.Words) {
      if (category !== "default") {
        locale.Words[category].forEach((word) => {
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
    const mistakes = usedLetters.filter(
      (letter) => word.word.indexOf(letter) === -1
    ).length;
    const won = word.word
      .split("")
      .every((letter) => usedLetters.includes(letter));

    const replayButton = () => {
      if (won || mistakes >= 6) {
        return (
          <TouchableOpacity style={guessingStyle.button} onPress={startNewGame}>
            <Text style={guessingStyle.buttonText}>
              {locale.Menu.playAgain}
            </Text>
          </TouchableOpacity>
        );
      }
      return null;
    };

    const getManImage = () => {
      if (mistakes in images) return images[mistakes];
      return man6;
    };

    return (
      <View style={guessingStyle.container}>
        <Text style={guessingStyle.category}>{word.category}</Text>
        <Image source={getManImage()} style={guessingStyle.man} />
        <Text style={guessingStyle.word}>
          {word.word
            .split("")
            .map((letter) =>
              usedLetters.includes(letter) || letter === " " ? letter : "_"
            )
            .join(" ")}
        </Text>
        {replayButton()}
        <View style={guessingStyle.lettersContainer}>
          {getAlphabet(mistakes >= 6 || won)}
        </View>
      </View>
    );
  }

  const handleLogoClick = () => {
    if (logoClickCount === 8) {
      setLogoClickCount(1);
      return;
    }
    setLogoClickCount(logoClickCount + 1);
    if (logoClickCount == 3) setLocale(localePortuguese);
    if (logoClickCount == 7) setLocale(localeEnglish);
  };

  return (
    <View style={homepageStyles.container}>
      <TouchableOpacity onPress={handleLogoClick}>
        <Image source={logo} style={homepageStyles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={homepageStyles.button} onPress={startNewGame}>
        <Text style={homepageStyles.buttonText}>{locale.Menu.start}</Text>
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
  button: {
    backgroundColor: "#05c46b",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
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
    bottom: 10,
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
  man: {
    width: 170,
    resizeMode: "contain",
  },
});
