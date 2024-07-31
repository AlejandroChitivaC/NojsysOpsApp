// HouseDetails.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { House } from '@/app/entities/House'; // Asegúrate de importar la interfaz correcta

interface HouseDetailsProps {
    houseNo: string;
}

const HouseDetails: React.FC<HouseDetailsProps> = ({ houseNo }) => {
    const [houseData, setHouseData] = useState<House | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await axios.get<House>(`https://api.example.com/houses/${houseNo}`);
                setHouseData(response.data);
            } catch (err) {
                setError('Error fetching house details');
            } finally {
                setLoading(false);
            }
        };

        fetchHouseDetails();
    }, [houseNo]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>House Details</Text>
            {houseData ? (
                <FlatList
                    data={Object.entries(houseData)}
                    keyExtractor={([key]) => key}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.key}>{item[0]}:</Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    key: {
        fontWeight: 'bold',
        width: 120,
    },
    value: {
        flex: 1,
    },
    errorText: {
        color: 'red',
    },
});

export default HouseDetails;
