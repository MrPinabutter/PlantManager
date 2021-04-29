import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  ActivityIndicator 
} from 'react-native';

import EnviromentButton from '../../components/EnviromentButton';
import Header from '../../components/Header';
import Load from '../../components/Load';
import PlantCardPrimary from '../../components/PlantCardPrimary';
import { PlantProps } from '../../libs/storage';

import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentProps {
  key: string,
  title: string,
}

export default function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [envSelected, setEnvSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { navigate } = useNavigation()

  function handleEnviromentSelected(key: string) {
    setEnvSelected(key);

    if(key === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant =>
      plant.environments.includes(key)  
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants(){
    const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

    if(!data) return setLoading(true);

    if(page > 1){
      setPlants(old => [...old, ...data])
      setFilteredPlants(old => [...old, ...data])
    }else{
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  function handleFetchMore(distance: number) {
    if(distance < 1){
      return;
    }

    setLoadingMore(true);
    setPage(old => old + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigate('PlantSave', { plant });
  }

  useEffect(() => {
    async function fetchEnviroment(){
      const { data } = await api.get('plants_environments?_sort=title&order=asc');
      setEnviroments([
        {key: 'all', title: 'Todos'},
        ...data
      ]);
    };
    fetchEnviroment();
  }, []);
  
  useEffect(() => {
    fetchPlants();
  }, []);

  if(loading) return <Load />;

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item) => item.key + ''}
          renderItem={({item}) => (
            <EnviromentButton 
              title={item.title} 
              active={item.key === envSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => item.id + ''}
          renderItem={({item}) => (
            <PlantCardPrimary 
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
            )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.background,
  },

  header: {
    justifyContent: 'center',
    paddingHorizontal: 30,  
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },

  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32,
    marginRight: 40
  },
  
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})