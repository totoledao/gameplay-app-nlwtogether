import React, { useState }  from 'react';
import { ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { 
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform  
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Discord } from '../../assets/discord.png';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';

export function AppointmentCreate() {

  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [openGuildsModal, setopenGuildsModal] = useState<boolean>(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  
  function handleOpenGuildsModal() {
    setopenGuildsModal(true);
  }
  
  function handleCloseModal() {
    setopenGuildsModal(false);
  }

  function handleGuildSelected(guildSelected : GuildProps) {
    setGuild(guildSelected);
    setopenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);    
  }

  async function handleSaveAppointment() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]));

    navigation.navigate('Home');
  }
 
  return (
    <KeyboardAvoidingView      
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView>
      <Background>

        <Header
          title= "Agendar Partida"     
        />

        <Text style={[ styles.label,
          {marginLeft: 24, marginTop: 27} ]}
        >
          Categoria
        </Text>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
          hasCheckBox
        />

        <View style={styles.form}>

          <RectButton
            onPress={handleOpenGuildsModal}
          >

            <View
              style={styles.select}
            >
              
              <GuildIcon guildID={guild.id} iconId={guild.icon}/>                 
                      
              <View style={styles.selectBody}>
                <Text style={styles.selectLabel}>
                  {guild.name ? guild.name : 'Selecione um servidor'}
                </Text>
              </View>

              <Feather
                name='chevron-right'
                color={theme.colors.heading}
                size={18}
              />
              
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>

              <Text style={styles.label}>
                Dia e mês
              </Text>

              <View style={styles.column}>
                <SmallInput
                  maxLength={2}
                  onChangeText={setDay}
                />

                <Text style={styles.divider}>
                  /
                </Text>
                
                <SmallInput
                  maxLength={2}                  
                  onChangeText={setMonth}
                />
              </View>

            </View>

            <View>

              <Text style={styles.label}>
                Hora e minuto
              </Text>

              <View style={styles.column}>
                <SmallInput
                  maxLength={2}
                  onChangeText={setHour}
                  />

                <Text style={styles.divider}>
                  :
                </Text>
                
                <SmallInput 
                maxLength={2}
                onChangeText={setMinute}
                />
              </View>

            </View>
          
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.textMax}>
              Max 100 caracters
            </Text>
          </View>
            
          <TextArea
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            multiline={true}
            onChangeText={setDescription}
          />

          <View style={styles.footer}>
              <Button
              title={"Agendar"}
              onPress={handleSaveAppointment}
              />
          </View>

        </View>          

      </Background>
    </ScrollView>
    
    <ModalView visible={openGuildsModal} closeModal={handleCloseModal}>
      <Guilds handleGuildSelected= {handleGuildSelected} />    
    </ModalView>      

    </KeyboardAvoidingView>
    )
}