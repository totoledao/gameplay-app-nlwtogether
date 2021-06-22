import React, {ReactNode} from 'react';
import { 
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { discIMG } from '../../assets/illustration.png'
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  urlImage: string;
}

export function Avatar({ urlImage } : Props) {
  return (

    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}   
    >
      <Image
        source={{uri: urlImage}}
        style={styles.avatar}
      />
    </LinearGradient>

  )}