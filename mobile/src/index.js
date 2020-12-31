import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import api from './services/api';

export default function App() {
const [projects, setProjects] = useState([])
    useEffect (() => {
        api.get('projects').then(response =>{
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Fernando de Jesus dos Santos'
        });

        const project = response.data;

        setProjects([ ... projects, project]);
    };

    return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

        <SafeAreaView style={styles.container}>

            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}>Project: {project.title}</Text>)
                }
            />

        <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={handleAddProject}>
            <Text style={styles.buttonText}>Adicionar projecto</Text>
        </TouchableOpacity>
            
        </SafeAreaView>
    </>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#fff',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});