import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';

export default function Home({ navigation }) {

    const [data, setData] = useState();
    const [color, setColor] = useState("#0F52BA");

    const API_URL = 'https://www.bcferriesapi.ca/api/TSA/';

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json()) //converts the data to json file
            .then(response => {
                console.log(response);
                setData(response); //the data is now stored in the useState
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <View style={styles.container}>
            <View className={`${styles.main}`}>
                <Text>Ferries Leaving Tsawwassen</Text>
                <Text>To: Duke Point (Nanaimo)</Text>
                <View>
                    {
                        data && data.DUK.sailings.map((s, index) => {
                            if (s.iscancelled === true) {
                                return ("Cancelled")
                            } else if (s.isCancelled === false) {

                                return (
                                    <View key={index}>
                                        <Text>Vessel Name: {s.vesselName}</Text>
                                        <Text>{s.isCancelled ? "Cancelled" : "Not Cancelled"}</Text>
                                        <View className={styles.progressBar}>
                                            <View>{s.carFill < 60 ? <Progress.Bar color={"#0F52BA"} progress={s.carFill / 100} width={200} /> :
                                            <Text>{s.carFill == 100 ? "Full" : 
                                            <Progress.Bar color={s.carFill >= 60 ? "#FDB515" : "#800000"} progress={s.carFill / 100} width={200} />}
                                            </Text>
                                             } 
                                             </View>

                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
