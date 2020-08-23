import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text, FlatList, Image, Dimensions } from 'react-native';
import {
    Link
} from "react-router-dom";
import { api_key,image_url } from '../env';

const screen = Dimensions.get('screen');
export const MainScreen = () => {

    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState('')
    useEffect(() => {
        discoverMovies();
    }, [])

  
    function discoverMovies() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
            .then((res) => res.json())
            .then(({results}) => setMovies(results))
            .catch((err) => err);
    }
    
    console.log(movies)

    const Item = ({ title, poster, id }) => (
        <View style={{padding:'10px'}}>
            <Image source={{ uri: `${image_url}/${poster}` }}
                style={{ width: 200, height: 250 }} />
            <Text>{title}</Text>
            <Link to={`/detail/${id}`} >
            <span>Info</span>
            </Link>
        </View>
    );
    const renderItem = ({ item }) => (
            <Item title={item.title} poster={item.poster_path} id={item.id} />    
    );
    return (
        <View style={styles.body}>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                <Text style={{ color: 'white', fontSize: '30px' }}>Trending Now</Text>
                 <Link to="/search">Search</Link>
                </View>
                <FlatList
                    horizontal
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
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

