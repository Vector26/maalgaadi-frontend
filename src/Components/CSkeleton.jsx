import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { CardActions } from '@mui/material';

export const CSkeleton=()=>{
    return (
      <Card sx={{ minWidth: 275,maxHeight:200, m: 2,padding:'0.5em'}}>
        <CardContent>
            <React.Fragment>
              <Skeleton animation="wave" height={15} style={{ marginBottom: 10 }} />
              <Skeleton animation="wave" height={15} width="80%" />
              <Skeleton animation="wave" height={15} style={{ marginBottom: 10 }} />
              <Skeleton animation="wave" height={15} width="80%" />
              <Skeleton animation="wave" height={15} style={{ marginBottom: 10 }} />
            </React.Fragment>
              <Skeleton animation="wave" height={60} width={80} />
        </CardContent>
      </Card>
    );
  }