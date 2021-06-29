import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  View,
  Text,    
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';;
import { theme } from '../../global/styles/theme';
import { GuildProps } from '../Guild';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

type Props = RectButtonProps & {
  data: AppointmentProps;
}

export function Appointment({data, ...rest} : Props) {

  const [category] = categories.filter(item => item.id === data.category);

  return (
    <RectButton style={styles.container} {...rest}>
      
      <View>
        <LinearGradient
        style={styles.guildIconContainer}
          colors={[theme.colors.secondary50, theme.colors.secondary70]}
        >
          <GuildIcon />
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {data.guild.name}
          </Text>

          <Text style={styles.category}>
            {category.title}
          </Text>
        </View>

        <View style={styles.footer}>

          <View style={styles.dateInfo}>
            <CalendarSvg />
            <Text style={styles.date}>
              { data.date }
            </Text>
          </View>
       
            <View style={styles.playersInfo}>
              <PlayerSvg
                fill= {data.guild.owner ? theme.colors.primary : theme.colors.on}
              />

              <Text style={[
                styles.player,
                { color: data.guild.owner ? theme.colors.primary : theme.colors.on }
              ]}>
                {data.guild.owner ? "Anfitrião" : "Visitante"}
              </Text>
            </View>

          </View>

        </View>      

    </RectButton>
  )}