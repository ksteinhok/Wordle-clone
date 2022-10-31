import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {green, blue} from '@mui/material/colors';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

import {
    numGuessAreaRows,
    numGuessAreaColumns} from "./utils/sizes";
import boxStyleVariants from './utils/keyboardAndGuessAreaBoxTypes';

const words = require('./fiveLetterWords.json');
const Word = words[Math.floor(Math.random()*words.length)];
function App() {

    console.log(Word);
    const Top = 'qwertyuiop', TopNum = Top.length;
    const Mid = 'asdfghjkl', MidNum = Mid.length;
    const Bot = 'zxcvbnm', BotNum = Bot.length;
    Math.random()
    //const TestWord = 'ghost';
    const initialKeyBoard = () => {
        let keys = Bot.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))

        const backspaceKey = {
            ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
            width: 50,
            letter: 'Delete',
            isBackspaceKey: true

        }
        const enterKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            display: 'flex',
            width: 50,
            letter: 'Enter',
            isEnterKey: true
        }
        keys.unshift(backspaceKey);
        keys.push(enterKey);

        return keys;
    }

    const RowGrid = (row) => {
        let keys1 = row.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))
        return keys1;
    }

    const createNewActiveRow = () => new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox);
    const [completedRows, setCompleteRows] = useState([]);

    const [activeRow, setActiveRow] = useState(createNewActiveRow);
    const [activeRowIdx, setActiveRowIdx] = useState(0);  // the index of the first letter that gets added to the active row.
    const [keyboard, setKeyboard] = useState(initialKeyBoard); //includes enter and backspace

    const [keyboard1, setKeyboard2] = useState(RowGrid(Top));
    const [keyboard2, setKeyboard3] = useState(RowGrid(Mid));

    const [keyBox, setKeyColor] = useState([]);

    const [message, setMessage] = useState('')


    const remainingRows = new Array((numGuessAreaRows - 1 - Math.floor(completedRows.length / numGuessAreaRows)-1) * numGuessAreaColumns).fill(boxStyleVariants.blankBox);
    const allKeys = [...keyboard,...keyboard1,...keyboard2];
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

    const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {

        console.log(`attributes of the key that was just clicked is ${JSON.stringify(attrsOfKeyThatUserClicked)}`);

        console.log(attrsOfKeyThatUserClicked["letter"]);




        if(activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
            return; // activeRow is empty as such, there are no letters to erase.
        }
        if(attrsOfKeyThatUserClicked.isBackspaceKey) {
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx - 1);
            setMessage('');
            return;
        }
        if(activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) {
            //if the word is in the dictionary, allow the guess to go through, otherwise send message "not real word"

            let tempW="";
            for(let b =0; b <5; b++){
                tempW+=activeRow[b]["letter"] //checks word
            }
            console.log('word is',tempW);
            if(words.indexOf(tempW) === -1 ){
                //msg 'not  a word
                console.log("word didn't appear");
                setMessage('Not in word list');
                return;
            }


            //default all the keyboard presses to grey, then recolor over it.
            for(let i =0; i < 5; i++){
                for(let q = 0; q < keyboard2.length; q++){
                if(activeRow[i]["letter"] === keyboard2[q]["letter"]){
                    keyboard2[q]={
                        ...keyboard2[q],
                        ...boxStyleVariants.keyboardMiss
                    }
                }
            }
                for(let q = 0; q < keyboard1.length; q++){
                    if(activeRow[i]["letter"] === keyboard1[q]["letter"]){
                        keyboard1[q]={
                            ...keyboard1[q],
                            ...boxStyleVariants.keyboardMiss
                        }
                    }
                }
                for(let q = 0; q < keyboard.length; q++){
                    if(activeRow[i]["letter"] === keyboard[q]["letter"]){
                        keyboard[q]={
                            ...keyboard[q],
                            ...boxStyleVariants.keyboardMiss
                        }
                    }
                }
            }

            const newActiveRow = activeRow.slice();

            let greenCounter = 0;
            for(let i =0; i < 5; i++){
                if(activeRow[i]["letter"] === Word[i]){ // if the letter is in the right place
                    console.log(activeRow[i]["letter"]," is a match!");
                    newActiveRow[i] = {
                        ...newActiveRow[i],
                        ...boxStyleVariants.exactMatch
                    }
                    // bad hard coded coloring my keyboard. I didn't have time for usestate
                    greenCounter++; // if we get 5 greens we have a correct word guess
                    for(let q = 0; q < keyboard.length; q++){
                        if(activeRow[i]["letter"] === keyboard[q]["letter"]){
                            keyboard[q] ={
                                ...keyboard[q],
                                ...boxStyleVariants.keyboardMatch
                            }
                        }
                    }
                    for(let q = 0; q < keyboard1.length; q++){
                        if(activeRow[i]["letter"] === keyboard1[q]["letter"]){
                            keyboard1[q]={
                                ...keyboard1[q],
                                ...boxStyleVariants.keyboardMatch
                            }
                        }
                    }
                    for(let q = 0; q < keyboard2.length; q++){
                        if(activeRow[i]["letter"] === keyboard2[q]["letter"]){
                            keyboard2[q]={
                                ...keyboard2[q],
                                ...boxStyleVariants.keyboardMatch
                            }
                        }
                    }
                }
                else{
                    newActiveRow[i]={
                        ...newActiveRow[i],
                        ...boxStyleVariants.noMatch
                    }

                    for(let x =0; x < 5; x++){
                        if(activeRow[i]["letter"] == Word[x] && i !== x){
                            newActiveRow[i]={
                                ...newActiveRow[i],
                                ...boxStyleVariants.partialMatch
                            }
                            for(let q = 0; q < keyboard2.length; q++){
                                if(activeRow[i]["letter"] === keyboard2[q]["letter"] & keyboard2[q]["backgroundColor"] !== '#6ca965'){
                                    keyboard2[q]={
                                        ...keyboard2[q],
                                        ...boxStyleVariants.keyboardPartial
                                    }
                                }
                            }
                            for(let q = 0; q < keyboard1.length; q++){
                                if(activeRow[i]["letter"] === keyboard1[q]["letter"] & keyboard1[q]["backgroundColor"] !== '#6ca965'){
                                    keyboard1[q]={
                                        ...keyboard1[q],
                                        ...boxStyleVariants.keyboardPartial
                                    }
                                }
                            }
                            for(let q = 0; q < keyboard.length; q++){
                                if(activeRow[i]["letter"] === keyboard[q]["letter"] & keyboard[q]["backgroundColor"] !== '#6ca965'){
                                    keyboard[q]={
                                        ...keyboard[q],
                                        ...boxStyleVariants.keyboardPartial
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(remainingRows.length);
            if(remainingRows.length ===0 & tempW !== Word){
                setMessage(`You Lose! The word was ${Word}`);
                return;
            }
            if(greenCounter ===5){
                setMessage('You Win! refresh for a new Word!');
            }

            const newCompletedRows = [...completedRows, ...newActiveRow];
            setCompleteRows((newCompletedRows));


            if(completedRows.length === 6){
                console.log('wow')
            }


            setActiveRow(createNewActiveRow());
            setActiveRowIdx(0);

            // evaluate user's work that is now in activeRow. The feedback boxes get
            // stored in a 5-element array and get pushed into the completedRows.
            // the activeRow gets reset to 5 blank boxes.
            // the number of elements in remainingRows gets reduced by 5.
            //remainingRows = remainingRows-5;
            // if the remainingRows is empty, game is over. Display a message in the
            // message center.
            return;
        }
        if(attrsOfKeyThatUserClicked.isEnterKey) {
            setMessage('Not enough letters!');
            // ignore the enter key as there are not enough letters in activeRow
            return;
        }

        if(activeRowIdx === numGuessAreaColumns) {
            // activeRow is already full.
            return;
        }

        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx + 1);
        // console.log(JSON.stringify(activeRow));
    }


    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-top ',
            }}
          >
              <TopBanner />
              <GuessArea  guessAreaBoxes={allBoxes} />

              <MessageCenter message={message}/>
              <Keyboard keyboard={keyboard1} TopNum={TopNum} Keyrow1={Top} onClickCallback={keyboardKeyPressedCallBack} />
              <Keyboard keyboard={keyboard2} MidNum={MidNum} Keyrow2={Mid} onClickCallback={keyboardKeyPressedCallBack} />
              <Keyboard keyboard={keyboard} BotNum={BotNum} demoKeys={Bot} onClickCallback={keyboardKeyPressedCallBack} />

          </Box>
      </Fragment>
  );
}

export default App;
