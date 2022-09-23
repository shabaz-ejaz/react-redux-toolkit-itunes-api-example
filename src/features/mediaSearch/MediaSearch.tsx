import React, {useState, useEffect} from 'react';

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
    search,
    clear,
    selectMedia,
    selectStatus
} from './mediaSearchSlice';
import styles from './MediaSearch.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';


import {TextField} from "@mui/material";

export function MediaSearch()
{
    const media = useAppSelector(selectMedia);
    const mediaStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [mediaListItems, setMediaListItems] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [noMoreResults, setNoMoreResults] = useState(false);

    useEffect(() =>
    {
        const delayDebounceFn = setTimeout(() =>
        {
            if (searchTerm !== '')
            {
                if (searchTerm.length >= 3)
                {
                    console.log('searching*****', searchTerm)
                    dispatch(search({searchTerm, offset: media.length + 1}))
                }

            } else
            {
                dispatch(clear())
            }

        }, 1000);

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);


    const loadMore = () =>
    {
        dispatch(search({searchTerm, offset: media.length + 1}))
    };


    console.log('media****', media)
    return (
        <div>
            <h2>Search for an artist, song or album</h2>
            <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth label="Search for an artist, song or album" id="fullWidth"/>

            {
                media && media.length > 0 ? media.map(function (item, i)
                {
                    return <div className={styles.mainCard} key={i}>
                        <a href={item.collectionViewUrl} target="_blank" style={{
                            textDecoration: "none",
                            color: "initial"
                        }}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={item.artistName}
                                    height="140"
                                    image={item.artworkUrl100}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.trackName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Album: {item.collectionName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card></a></div>
                }) : <h5>There were no results returned from your query</h5>}


            {
                media.length > 0 && mediaStatus !== 'loading'?
                    <Button onClick={() =>
                    {
                        loadMore();

                    }} className={styles.loadMoreButton} variant="contained" style={{
                        margin: '40px'
                    }}>Load more</Button>
                    :
                    null
            }

            {
                mediaStatus == 'loading' ?
                    <LoadingButton style={{
                        margin: '40px'
                    }} className={styles.loadMoreButton} loading variant="outlined">
                        Loading
                    </LoadingButton> : null
            }

        </div>
    );
}
