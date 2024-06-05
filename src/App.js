import { render } from "@testing-library/react";
import { useEffect, useRef, useState } from "react";
import Gameover from "./Gameover";

export default function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [currentGuess, setCurrentGuess] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState(Array(30).fill(" "));
  const [count, setCount] = useState(0);
  const [correctPosition, setCorrectPositiont] = useState([]);
  const [incorrectPosition, setIncorretPosition] = useState([]);
  const [noPosition, setNoPosition] = useState([]);

  const refCurrentGuess = useRef([]);
  const refWords = useRef([]);
  const refCurrentWord = useRef([]);
  const refCurrentCount = useRef(0);

  const correctSquareStyle = {
    background: "#37b24d",
  };

  const incorrectPositionStyle = {
    background: "#f59f00",
  };

  const incorrectSquareStyle = {
    background: "#343a40",
  };

  useEffect(() => {
    refCurrentGuess.current = currentGuess;
  });

  useEffect(() => {
    refWords.current = words;
  });

  useEffect(() => {
    refCurrentWord.current = currentWord;
  });

  useEffect(() => {
    refCurrentCount.current = count;
  });

  // mount API //

  useEffect(function () {
    async function fetchWord() {
      const res = await fetch(
        `https://random-word-api.herokuapp.com/word?length=5`
      );
      const data = await res.json();
      setCurrentWord(data);
      console.log(data);
    }
    fetchWord();
  }, []);

  // keydown effect //

  useEffect(() => {
    document.addEventListener("keydown", handleValue);
  }, []);

  useEffect(() => {
    //// enter letters for the first row words[0 - 4]/////

    if (count === 0) {
      setWords((value) =>
        value.map((x, i) => {
          if (typeof currentGuess[i] !== "undefined") {
            return (x = currentGuess[i]);
          } else if (typeof currentGuess[i] === "undefined") {
            return (x = "");
          } else if (currentGuess.length === 0) {
            return (x = "");
          }
        })
      );
    }

    //// enter letters for the second row words[5 - 9]/////

    if (count === 1) {
      setWords((letter) =>
        letter.map((x, i) => {
          if (i > 4) {
            if (typeof currentGuess[i - 5] !== "undefined") {
              return (x = currentGuess[i - 5]);
            } else if (typeof currentGuess[i - 5] === "undefined") {
              return (x = "");
            } else if (currentGuess.length === 0) {
              return (x = "");
            }
          } else {
            return x;
          }
        })
      );
    }

    //// enter letters for the third row words[10 - 14]/////

    if (count === 2) {
      setWords((letter) =>
        letter.map((x, i) => {
          if (i > 9) {
            if (typeof currentGuess[i - 10] !== "undefined") {
              return (x = currentGuess[i - 10]);
            } else if (typeof currentGuess[i - 10] === "undefined") {
              return (x = "");
            } else if (currentGuess.length === 0) {
              return (x = "");
            }
          } else {
            return x;
          }
        })
      );
    }

    //// enter letters for the forth row words[15 - 19]/////

    if (count === 3) {
      setWords((letter) =>
        letter.map((x, i) => {
          if (i > 14) {
            if (typeof currentGuess[i - 15] !== "undefined") {
              return (x = currentGuess[i - 15]);
            } else if (typeof currentGuess[i - 15] === "undefined") {
              return (x = "");
            } else if (currentGuess.length === 0) {
              return (x = "");
            }
          } else {
            return x;
          }
        })
      );
    }

    //// enter letters for the fifth row words[20 - 24]/////

    if (count === 4) {
      setWords((letter) =>
        letter.map((x, i) => {
          if (i > 19) {
            if (typeof currentGuess[i - 20] !== "undefined") {
              return (x = currentGuess[i - 20]);
            } else if (typeof currentGuess[i - 20] === "undefined") {
              return (x = "");
            } else if (currentGuess.length === 0) {
              return (x = "");
            }
          } else {
            return x;
          }
        })
      );
    }

    //// enter letters for the sixth row words[25 - 29]/////

    if (count === 5) {
      setWords((letter) =>
        letter.map((x, i) => {
          if (i > 24) {
            if (typeof currentGuess[i - 25] !== "undefined") {
              return (x = currentGuess[i - 25]);
            } else if (typeof currentGuess[i - 25] === "undefined") {
              return (x = "");
            } else if (currentGuess.length === 0) {
              return (x = "");
            }
          } else {
            return x;
          }
        })
      );
    }
  }, [currentGuess]);

  function handleValue(e) {
    if (e.key === "Enter") {
      if (refCurrentGuess.current.length < 5) {
        return;
      } else {
        setCurrentGuess([]);
        setCount((c) => c + 1);
        handleAdd();
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess((val) => val.splice(0, val.length - 1));
    } else if (refCurrentGuess.current.length < 5) {
      setCurrentGuess((val) => [...val, e.key]);
    } else {
      return;
    }
  }

  function handleAdd() {
    let y = 0;
    let t = refCurrentWord.current.toString();
    let correctPositionCount = 0;

    /// checks the first row if it matches the current word ///

    if (refCurrentCount.current === 0) {
      for (let i = 0; i < 5; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //
        if (refWords.current[i] === refCurrentWord.current[0][i]) {
          setCorrectPositiont((guess) => [...guess, i]);
          correctPositionCount = correctPositionCount + 1;

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }

    /// checks the second row if it matches the current word ///

    if (refCurrentCount.current === 1) {
      for (let i = 5; i < 10; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //
        if (refWords.current[i] === refCurrentWord.current[0][y]) {
          setCorrectPositiont((guess) => [...guess, i]);
          correctPositionCount = correctPositionCount + 1;

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
        y = y + 1;
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }

    /// checks the third row if it matches the current word ///

    if (refCurrentCount.current === 2) {
      for (let i = 10; i < 15; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //

        if (refWords.current[i] === refCurrentWord.current[0][y]) {
          setCorrectPositiont((guess) => [...guess, i]);
          correctPositionCount = correctPositionCount + 1;

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
        y = y + 1;
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }

    /// checks the forth row if it matches the current word ///

    if (refCurrentCount.current === 3) {
      for (let i = 15; i < 20; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //
        if (refWords.current[i] === refCurrentWord.current[0][y]) {
          setCorrectPositiont((guess) => [...guess, i]);
          correctPositionCount = correctPositionCount + 1;

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
        y = y + 1;
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }

    /// checks the fifth row if it matches the current word ///

    if (refCurrentCount.current === 4) {
      for (let i = 20; i < 25; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //
        if (refWords.current[i] === refCurrentWord.current[0][y]) {
          setCorrectPositiont((guess) => [...guess, i]);

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
        y = y + 1;
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }

    /// checks the sixth row if it matches the current word ///

    if (refCurrentCount.current === 5) {
      for (let i = 25; i < 30; i++) {
        /// this statement will check if the letter is in the correct position in the word mounted //
        if (refWords.current[i] === refCurrentWord.current[0][y]) {
          setCorrectPositiont((guess) => [...guess, i]);
          correctPositionCount = correctPositionCount + 1;

          /// this statement will check if the letter is in included in the word mounted //
        } else if (t.includes(refWords.current[i].toString()) === true) {
          setIncorretPosition((guess) => [...guess, i]);
        } else {
          setNoPosition((guess) => [...guess, i]);
        }
        y = y + 1;
      }

      if (correctPositionCount === 5) {
        setGameOver((g) => true);
      }
    }
  }

  // function handles the style of eact individual square and their position //

  function handleStyle(index) {
    for (let i = 0; i < correctPosition.length; i++) {
      if (correctPosition[i] === index) {
        return correctSquareStyle;
      }
    }

    for (let y = 0; y < incorrectPosition.length; y++) {
      if (incorrectPosition[y] === index) {
        return incorrectPositionStyle;
      }
    }

    for (let y = 0; y < noPosition.length; y++) {
      if (noPosition[y] === index) {
        return incorrectSquareStyle;
      }
    }
  }

  function handleRestart() {
    setGameOver(!gameOver);
  }

  return (
    <div className="app">
      {gameOver ? (
        <Gameover onRestart={handleRestart} />
      ) : (
        <div className="row">
          {words.map((x, i) => (
            <div key={i} className="box" style={handleStyle(i)}>
              <span key={i}>{x}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
