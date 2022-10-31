import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";
import {act} from "react-dom/test-utils";

const numBoxesPerRow = 5;
const numRows = 6;

const LetterBox = (props) => {

    const {index, value} = props;
    const { backgroundColor } = value;
    console.log(`backgroundColor ${backgroundColor}`);
    return (
        <Box sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: 'black',
            backgroundColor,
        }}>
            {index}
        </Box>
    )
}
const color = 'white';

const Keyboard = (props) => {

    const {activeRow} = props;

    const completedRows = [];


    const remainingRows = new Array((numRows - 1) * numBoxesPerRow).fill({
        backgroundColor: color
    });

    console.log(JSON.stringify(activeRow));
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

    console.log(`num square is ${allBoxes.length}`);
/*
    const changeColor = (idx) => {
        if( idx < 5) { // click is in active row.
            const newActiveRow = activeRow.slice();
            newActiveRow[idx] = {
                backgroundColor: 'orange'
            }
            setActiveRow(newActiveRow);
        }
        console.log(JSON.stringify(activeRow));
    }

 */

    return (
        <Fragment>
            <Grid  container columns={5}
                   sx={{
                       width: 5 * 40 + 4 * 10,
                   }}
            >
                {
                    allBoxes.map((elementAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                        >
                            <LetterBox index={idx} value={elementAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;