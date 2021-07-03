import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { 
  View,
  Text,
  FlatList,  
  Alert,
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { api } from '../../services/api';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Loading } from '../../components/Loading';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];  
}

export function AppointmentDetails() {

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {      
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);

    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. O widget está habilitado?')
    } finally {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchGuildWidget();
  },[])
 
  return (
    <Background>

      <Header
        title= "Detalhes"
        action= {true}
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >

        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            { guildSelected.guild.name }
          </Text>

          <Text style={styles.subtitle}>
            { guildSelected.description }
          </Text>
        </View>

      </ImageBackground>

      { loading ? 
        <Loading /> :
        <>
          <ListHeader
            title='Jogadores'
            subtitle={`Total: ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Member
                data={item}
              />          
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />

          <View style={styles.footerButton}>
            <ButtonIcon            
              title='Entrar na partida'
            />
          </View>
        </>
      }

    </Background>
  );
}