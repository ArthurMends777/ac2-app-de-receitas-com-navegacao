import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [receita, setReceita] = useState<any>(null);

  const buscarReceita = async () => {
    await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => {
      setReceita(response.data.meals[0]);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    buscarReceita();
  }, [id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: receita?.strMealThumb }} style={styles.imagem} />
      <Text style={styles.nome}>{receita?.strMeal}</Text>
      <Text style={styles.instrucoes}>{receita?.strInstructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },

  imagem: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },

  nome: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: 'bold',
  },

  instrucoes: {
    padding: 16,
  },
});