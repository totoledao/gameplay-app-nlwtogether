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
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Discord } from '../../assets/discord.png';

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

  const [category, setCategory] = useState('');
  const [openGuildsModal, setopenGuildsModal] = useState<boolean>(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleOpenGuildsModal() {
    setopenGuildsModal(true);
  }

  function handleGuildSelected(guildSelected : GuildProps) {
    setGuild(guildSelected);
    setopenGuildsModal(false);
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
          {marginLeft: 24, marginTop: 36, marginBottom: 18} ]}
        >
          Categoria
        </Text>

        <CategorySelect
          categorySelected={category}
          setCategory={setCategory}
          hasCheckBox
        />

        <View style={styles.form}>

          <RectButton
            onPress={handleOpenGuildsModal}
          >

            <View
              style={styles.select}
            >
              {
                guild.icon !== null ? <GuildIcon /> : <View style={styles.image} />                 
              }        
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
                <SmallInput maxLength={2} />

                <Text style={styles.divider}>
                  /
                </Text>
                
                <SmallInput maxLength={2} />
              </View>

            </View>

            <View>

              <Text style={styles.label}>
                Hora e minuto
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />

                <Text style={styles.divider}>
                  :
                </Text>
                
                <SmallInput maxLength={2} />
              </View>

            </View>
          
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
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
          />

          <View style={styles.footer}>
              <Button title={"Agendar"} />
          </View>

        </View>          

      </Background>
    </ScrollView>
    
    <ModalView visible={openGuildsModal}>
      <Guilds handleGuildSelected= {handleGuildSelected} />    
    </ModalView>      

    </KeyboardAvoidingView>
    )
}