import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

function App() {
    const numBoxesPerRow = 5;
    const color = 'white';


    const [activeRow, setActiveRow] = useState(new Array(numBoxesPerRow).fill({
        backgroundColor: color
    }));

    const [keyboardActiveRow, setKeyboardActiveRow] = useState(new Array(numBoxesPerRow).fill({
        backgroundColor: color
    }));

    const changeColor = (idx) => {
        if( idx < 5) { // click is in active row.
            const newActiveRow = activeRow.slice();
            newActiveRow[idx] = {
                backgroundColor: 'orange'
            }
            setActiveRow(newActiveRow);
            setKeyboardActiveRow(newActiveRow);
        }
        console.log(JSON.stringify(activeRow));
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
              <GuessArea onClick={(idx) => changeColor(idx)} activeRow={activeRow}/>
              <MessageCenter />
              <Keyboard activeRow={keyboardActiveRow}/>
          </Box>
      </Fragment>
  );
}

export default App;
