import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text, FlatList, Image, Dimensions } from 'react-native';
import {
    Link
} from "react-router-dom";
import { api_key, image_url, movieSearch } from '../env';

const screen = Dimensions.get('screen');
export const SearchScreen = () => {

    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState('')
    
    function searchMovie(e) {
        fetch(`${movieSearch}?api_key=${api_key}&query=${movie}`)
            .then((res) => res.json())
            .then(({ results }) => setMovies(results))
            .catch((err) => err);
    }


    const Item = ({ title,  id }) => (
        <View style={{ padding: '10px' }}>
            <h3>{title}</h3>
            <Link to={`/detail/${id}`} >
                <span>Detail</span>
            </Link>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item.name} id={item.id} />
    );
    return (
        <View style={styles.body}>
            <View>
                <input onChange={(e) => setMovie(e.target.value)} /><button onClick={searchMovie}>Search</button>
            </View>
            <Text style={{ color: 'white', fontSize: '30px' }}>Search results</Text>
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

