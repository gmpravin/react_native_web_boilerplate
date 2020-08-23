import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text, ImageBackground, Image, Dimensions } from 'react-native';
import {
    Link,
    useParams
} from "react-router-dom";
import { api_key, back_img_url } from '../env';

const screen = Dimensions.get('screen');
export const DetailsScreen = () => {
    const [movie, setMovie] = useState([])
    let { id } = useParams();

    useEffect(() => {
        fetchMovieDetail();
    }, [id])


    function fetchMovieDetail() {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
            .then((res) => res.json())
            .then((json) => setMovie(json))
            .catch((err) => err);
    }

    return (
        <View style={styles.body}>
            <Text style={{ color: 'white', fontSize: '30px' }}>{movie.original_title}</Text>
            <ImageBackground>
                <Image source={{ uri: `${back_img_url}/${movie.backdrop_path}` }} style={{ width: '60%', height: '60vh' }} />
            </ImageBackground>
            <View>
                <Text style={{ marginTop: "10px" }}>Overview : {movie.overview}</Text>
                <a href={movie.homepage}>Movie Avaialable</a> 
                <Text>Release date : {movie.release_date}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        padding: '20px',
        backgroundColor: '#202e43',
        width: screen.width,
        height: Platform.OS === 'web' ? '100vh' : '100%',
    },
});

