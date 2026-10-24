import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  const buscarDados = async () => {
    await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken').then((response) => {
      setData(response.data.meals);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    buscarDados();
  }, []);

  const verDetalhes = (item: any) => {
    router.push({
      pathname: '/detalhes',
      params: {
        id: item.idMeal
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de receitas</Text>

      <FlatList
        data={data}
        numColumns={4}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.cardReceita} onPress={() => verDetalhes(item)}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.imagem}
              />
              <Text style={styles.nomeReceita} numberOfLines={2}>{item.strMeal}</Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.idMeal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

  cardReceita: {
    width: 180,
    margin: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center'
  },

  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8
  },

  nomeReceita: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  }
});
