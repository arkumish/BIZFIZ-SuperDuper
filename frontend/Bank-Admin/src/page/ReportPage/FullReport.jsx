import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Progressbar from '../../component/Progressbar';
import SectorCard from './SectorCard';
import { Chip, Typography } from '@mui/material';
import { InsertEmoticonSharp } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Pdf from "react-to-pdf";
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [14, 14]
};
const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },

];

const objctToArray = (obj) => {
    const x = Object.entries(obj);
    return x;

}

const getString = (x) => {
    return x.toString();
}

const getFirstLetter = (x) => {
    return x.charAt(0)
}
const getArrayListSector = (data) => {
    return Object.keys(data).map(key => (` ${key} : ${data[key]} `));
}
const getIndicatorList = (list) => {
    let obj = [
        {
            name: list[0].name,
            rating: list[0].rating,
            listTitle: "competitors",
            list: list[0].competitors,
            remark: list[0].remarks
        },

        {
            name: list[2].name,
            rating: list[2].rating,
            listTitle: "Sectors",
            list: getArrayListSector(list[2].sectors),
            remark: list[2].remark
        },
        {
            name: list[3].name,
            rating: list[3].rating,
            listTitle: "More Prosperous Areas",
            list: list[3].moreProsperousAreas,
            remark: list[3].remark
        },
        {
            name: list[4].name,
            rating: list[4].rating,
            listTitle: "Better Areas",
            list: list[4].betterAreas,
            remark: list[4].remark
        },
        {
            name: list[1].name,
            rating: list[1].rating,
            listTitle: "",
            list: [],
            remark: ""
        },


    ]
    console.log("scrd", obj)
    return obj
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));




const SideBox = (data) => {
    return (
        <div className="sidebar">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"

            >
                <Avatar sx={{ width: 116, height: 116 }}>{getFirstLetter(data.data['Name'])}</Avatar>

            </Grid>
            <Box mt={4}>
                {console.log("332", data.data['Name'])}
                <List >
                    {
                        objctToArray(data.data).map((item, index) => {
                            return (
                                <ListItem disablePadding><ListItemButton>

                                    <ListItemText primary={`⚡ ${item[0]} : ${item[1]}`} />
                                </ListItemButton>
                                </ListItem>
                            )
                        })
                    }

                </List>
            </Box>
        </div>

    )
}

const MainBox = ({ piedata, score, credit }) => {
    return (
        <div className="mainbox">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container >
                    {console.log(piedata, score, credit)}
                    <Grid item xs={6} style={{ borderRight: '0.1px solid grey', minHeight: '40vh' }}>
                        <h5>Transactional Analysis : </h5>
                        {piedata.map((item, index) => {
                            return <Chip size="small" label={`${item.name} : ${item.value} `} style={{ marginRight: '10px' }} />
                        })}

                        <>

                            <PieChart width={300} height={250}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={piedata}
                                    // startAngle={180}
                                    // endAngle={0}
                                    cx="60%"
                                    cy="50%"
                                    // outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />{
                                    piedata.map((entry, index) => <Cell key={`cell-${index}`} strokeWidth={index === 2 ? 4 : 1} />)
                                }

                                <Tooltip />

                            </PieChart>

                        </>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Pdf targetRef={ref} options={options} filename="code-example.pdf">
                                        {({ toPdf }) => <Button variant="contained" className="btn btn-primary" size="small" onClick={toPdf}>Generate Pdf</Button>}
                                    </Pdf>

                                </Box>
                            </Grid>
                        </Grid>
                        <Box mt={3} ml={3} pt={3}>
                            <List >
                                <ListItem disablePadding><ListItemButton> <ListItemIcon>
                                    < WorkIcon />
                                </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography type="body2" style={{ color: 'black' }}>{`Score  :  ${score} / 500`}</Typography>
                                        } />
                                </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding><ListItemButton> <ListItemIcon>
                                    < WorkIcon />
                                </ListItemIcon>
                                    <ListItemText primary={
                                          <Typography type="body2" style={{ color: 'black' }}>{`Max Allowed Credit : ₹ ${credit}`}</Typography>
                                        } />
                                        
                                         
                                </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

const MainBoxSecond = ({ account, indicators }) => {
    return (
        <div className="mainbox">
            <Box sx={{ flexGrow: 1 }}  >
                <Grid container spacing={3}>
                    <Grid item xs={6} mt={1} style={{ minHeight: '40vh' }} >
                        {console.log("23", account, indicators)}
                        <Box >
                            <h5>Account Details</h5>
                            <List >
                                {
                                    objctToArray(account).map((item, index) => {
                                        return (
                                            <ListItem disablePadding><ListItemButton>
                                                {console.log(item, index)}
                                                <ListItemText primary={`⚡ ${item[0]} : ${item[1]}`} />
                                            </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }




                            </List>

                        </Box>


                    </Grid>
                    <Grid item xs={6} >

                        <Box >
                            <h3>Indicators </h3>
                            <List >
                                {indicators.map((item, index) => {
                                    const r = item['rating'];
                                    return (
                                        <Box p={1}>
                                            <Typography ml={2} mb={1} style={{fontWeight: 'bold'}}> {`${item['name']} (${r.toString()})`}</Typography>
                                            <Progressbar percentage={item['rating']} /></Box>
                                    )
                                })}




                            </List>
                        </Box>


                    </Grid>

                </Grid>
            </Box>
        </div >
    )
}


const FullReport = ({ reportData,reportId }) => {
    const [open, setOpen] = React.useState(false);
    const [allowedCredit, setAllowedCredit] = React.useState('');
    const [acceptText, setAcceptText] = React.useState('Submit')
    const [rejectText, setRejectText] = React.useState('Reject')
    const [haltText, setHaltText] = React.useState('Halt')

    const handleOpen = (data) => {
        setOpen(true);
        setAllowedCredit(data)

    }

    const handleAcceptSubmit = () => {
        let v = allowedCredit;
        setAcceptText('Submitting...')
      
        const apiUrl = encodeURI(`https://bizfizbe.herokuapp.com/updateuser?userid=${reportId}&updateType=accept&approvedAmount=${v}`);
        console.log(apiUrl);
        
        axios.get(apiUrl)
            .then((res)=>{
                    window.location='/'
            })
            .catch((err)=>{
                window.alert('unable to update');
                setAcceptText('Submit')
            })

    }

    const handleRejectSubmit = () => {
        let v = allowedCredit;
        setRejectText('Rejecting...')
        const apiUrl = encodeURI(`https://bizfizbe.herokuapp.com/updateuser?userid=${reportId}&updateType=reject&approvedAmount=0`);
        console.log(apiUrl);
        axios.get(apiUrl)
            .then((res)=>{
                    window.location='/'
            })
            .catch((err)=>{
                window.alert('unable to update');
                setRejectText('Reject')
            })

    }

    const handleHandleSubmit = () => {
        let v = allowedCredit;
        setHaltText('Halting...')
        const apiUrl = encodeURI(`https://bizfizbe.herokuapp.com/updateuser?userid=${reportId}&updateType=halt&approvedAmount=${v}`);
        console.log(apiUrl);
        axios.get(apiUrl)
            .then((res)=>{
                    window.location='/'
            })
            .catch((err)=>{
                window.alert('unable to update');
                setHaltText('Halt')
            })

    }

   
    const handleClose = () => setOpen(false);

    return (
        <>
            <div ref={ref}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '100vh' }}>
                                <SideBox data={reportData['userFormSubmittedInfo']} /></Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '40vh' }}>
                                <MainBox piedata={reportData['transactionalAnalysis']}
                                    score={reportData['score']}
                                    credit={reportData['allowedCredit']} />

                            </Item>
                            <br />
                            <Item direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '40vh' }}>
                                <MainBoxSecond
                                    account={reportData['accountDetails']}

                                    indicators={reportData['indicators']}
                                /></Item>
                        </Grid>


                        <Grid item container direction="row" xs={12} style={{ minHeight: '40vh' }}>
                            <Typography pl={6}>Details Parameter Analysis : </Typography>
                            <Grid item container  >
                                {
                                    getIndicatorList(reportData['indicators']).map((item, index) => {
                                        return (
                                            <SectorCard
                                                name={item.name}
                                                rating={item.rating}
                                                listTitle={item.listTitle}
                                                list={item.list}


                                            />)
                                    })

                                    // <SectorCard
                                    // name={},rating, listTitle, list
                                }</Grid>
                        </Grid>





                    </Grid>
                </Box>
            </div>
            <Grid
                item xs={12}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}
            >

                <Grid container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly" item xs={3}>
                    <Button variant="contained" color="error" onClick={handleRejectSubmit}>
                        {rejectText}
                            </Button>
                     <Button variant="contained" color="warning" onClick={handleHandleSubmit}>
                        {haltText}
                            </Button>       
                    <Button variant="contained" color="success" onClick={() => handleOpen(reportData['allowedCredit'])}>
                        Accept
                            </Button>

                </Grid>

            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Max Allowed Credit

            <br /><br />
                    </Typography>
                    <TextField id="standard-basic" label="credit" variant="outlined" value={allowedCredit} onChange={(event)=>{setAllowedCredit(event.target.value)}} />
                    <br /><br />
                    <Button variant="contained" color="success" onClick={handleAcceptSubmit}>
                        {acceptText}
                            </Button>
                </Box>
            </Modal>
        </>
    )
}



export default FullReport
