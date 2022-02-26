import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SectorCard({name,rating, listTitle, list}) {
  return (
    <Card sx={{ margin:2  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {""}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Rating : ${rating}`}
        </Typography>
        <span class="badge bg-soft-success text-success">{listTitle}</span>
        
        <Typography variant="body2">
        
          <br />
          <ul>
            {list.map((item)=>{
              return(
                <li>{item}</li>
              )
            })
            }
          </ul>
        </Typography>
      </CardContent>
      
    </Card>
  );
}