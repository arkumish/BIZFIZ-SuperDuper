import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import { green, pink,red,yellow } from '@mui/material/colors';
const parseDate = (str) => {
    let dt = new Date(str);
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}

const statusSwitch = (status) => {
    switch (status) {
        case 1:
            return <Avatar sx={{ bgcolor: green[500] }}><CheckIcon /></Avatar>
        case 2:
            return <Avatar sx={{ bgcolor: red[200] }}><CloseIcon /></Avatar>
        case 0:
            return <Avatar sx={{ bgcolor: yellow[800] }}><CircleIcon /></Avatar>
        default:
            return 'Pending';
    }
}

const SingleList = ({name,mobile,date,status}) => {
    return (<>
    <Box mb={1} ml={2} pt={1}>
    <Paper elevation={3}>
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
               {statusSwitch(status)}
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {mobile}
              </Typography><br></br>
                        {`Submitted : ${parseDate(date)}`}
                    </React.Fragment>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        </Paper>
        </Box>
        </>
    )
}

export default function RequestList({ title,userData }) {
    return (<>
    <h6 className="mx-3 my-3">⚡{title}</h6>
        <List sx={{ width: '100%',display:'flex' }}>
            {userData.map((item, index) => {
                return (
                    <Link key={index} to={`/report/${item.userId}`} >
                       <SingleList
                        name={item.name} mobile={item.mobileNumber} date={item.applicationDate} status={item.applicationStatus}
                       />
                    </Link>
                )
            })}
           


        </List>
        <div class="progress"  style={{width: "70%", height:'3px', backgroundColor:'rgb(92 96 245 / 40%)', margin:'40px 10px 20px 155px ' }}>

</div>
        </>
    );
}
