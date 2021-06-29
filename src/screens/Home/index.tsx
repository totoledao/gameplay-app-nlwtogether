import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';

import { styles } from './styles';
import { Background } from '../../components/Background';

import { Profile } from "../../components/Profile";
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';

export function Home() {

  const [category, setCategory] = useState( "" );

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory( "" ) : setCategory(categoryId);    
  }

  const navigation = useNavigation();

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }
  
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  const appointments = [
    {
    id: '1',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '2',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: false,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '3',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: false,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '4',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '5',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '6',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
    id: '7',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
      },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    }
  ]

  return (
    <Background>
      <View style={styles.container}>
        
        <View style={styles.header}>

          <Profile />
          <ButtonAdd
            onPress={handleAppointmentCreate}
          />

        </View>
        
        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />      

        <View style={styles.content}>
          <ListHeader
            title="Partidas agendadas"
            subtitle="Total: 6"
          />
        </View>

      </View>

      <FlatList
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Appointment
            data={item}
            onPress={handleAppointmentDetails}
            />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.matches}
        contentContainerStyle={{paddingBottom: 27}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <ListDivider />}
      />   
      
    </Background>
  );
}