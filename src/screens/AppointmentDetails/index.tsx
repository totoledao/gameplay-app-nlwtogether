import React from 'react';
import { ImageBackground } from 'react-native';
import { 
  View,
  Text,
  FlatList,  
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {

  const members = [
    {
      id: "1",
      username: "Guilherme",
      avatar_url: "https://github.com/totoledao.png",
      status: 'online',
    },
    {
      id: "2",
      username: "Guilherme",
      avatar_url: "https://github.com/totoledao.png",
      status: 'offline',
    },
  ] 

 
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
            Lendários
          </Text>

          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md"1"0
          </Text>
        </View>

      </ImageBackground>

      <ListHeader
        title='Jogadores'
        subtitle='Total 3'
      />

      <FlatList
        data={members}
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

    </Background>
  );
}