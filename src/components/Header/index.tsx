import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather, Fontisto } from '@expo/vector-icons';
import { 
  View,
  Text,    
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  title: string;
  action?: boolean;
}

export function Header({title, action} : Props) {

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      colors={[theme.colors.secondary100, theme.colors.secondary40]} 
      style={styles.container}
      >

        <BorderlessButton
          onPress={handleGoBack}
        >
          <Feather
            name='arrow-left'
            size={24}
            color={theme.colors.heading}
          />
        </BorderlessButton>

        <Text style={styles.title}>
          { title }
        </Text>
      
        {
          action
          ?

          <BorderlessButton>
            <Fontisto
              name= "share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>

          :
          <View style={{width: 24}} />
        }

    </LinearGradient>
  )}