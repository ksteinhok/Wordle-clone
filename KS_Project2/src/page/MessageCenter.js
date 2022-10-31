import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

const MessageCenter = (props) => {

    const {message} = props;

    return (
        <Fragment>
            <Typography variant='h5'>
                {message}
            </Typography>
        </Fragment>
    )
}

export default MessageCenter;