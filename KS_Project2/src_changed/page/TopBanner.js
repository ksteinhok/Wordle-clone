import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 10}} >
            <Typography variant='h5'>
                TopBanner
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;