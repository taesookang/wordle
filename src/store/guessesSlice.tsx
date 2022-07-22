import { createSlice } from "@reduxjs/toolkit";
import data from "./data";
import type { Result } from ".";

const initialState = {
  answer: "",
  lines: new Array<string>(6).fill(""),
  currentLine: 0,
  resultsTable: new Array<Result[]>(6).fill(Array(5).fill("notMatched")),
  isCorrectAnswer: false,
};

const guessesSlice = createSlice({
  name: "guesses",
  initialState: initialState,
  reducers: {
    saveAnswer(state, action) {
      state.answer = action.payload;
    },
    refreshAnswer(state) {
      const newAnswer = data[Math.floor(Math.random() * (data.length + 1))];
      state.answer = newAnswer;
    },
    addValue(state, action) {
      state.lines[state.currentLine] =
        state.lines[state.currentLine] + action.payload;
    },
    deleteValue(state) {
      state.lines[state.currentLine] = state.lines[state.currentLine].slice(
        0,
        -1
      );
    },
    submitGuess(state) {
      for (let i = 0; i < state.lines[state.currentLine].length; i++) {
        if (state.answer.includes(state.lines[state.currentLine][i])) {
          if (state.answer[i] === state.lines[state.currentLine][i]) {
            state.resultsTable[state.currentLine][i] = "matched";
          } else {
            state.resultsTable[state.currentLine][i] = "wrongPlace";
          }
        }
      }
      state.currentLine++;
      if (
        state.resultsTable[state.currentLine - 1].every(
          (value) => value === "matched"
        )
      ) {
        state.isCorrectAnswer = true;
        console.log("answer is correct");
      }
    },
  },
});

export const { refreshAnswer, addValue, deleteValue, saveAnswer, submitGuess } =
  guessesSlice.actions;

export default guessesSlice.reducer;
