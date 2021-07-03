import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { 
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { Background } from '../../components/Background';
import { Profile } from "../../components/Profile";
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';

export function Home() {

  const [category, setCategory] = useState( "" );
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true)
;
  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory( "" ) : setCategory(categoryId);    
  }

  const navigation = useNavigation();

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected: guildSelected })
  }
  
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }
 
  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category){
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  },[category]))

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
         </View>     

      {
        loading ?
        <Loading />
        :
        <>
          <View style={styles.content}>
              <ListHeader
                title="Partidas agendadas"
                subtitle={`Total: ${appointments.length}`}
              />
            </View>      

          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
                />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.matches}
            contentContainerStyle={{paddingBottom: 27}}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <ListDivider />}
          />
        </> 
      }

    </Background>
  );
}