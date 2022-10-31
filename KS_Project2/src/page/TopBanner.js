import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 10,ml:'130px', justifyContent:'center'}} >
            <Typography variant='h5' >
                    Wordle By Karsten

            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;