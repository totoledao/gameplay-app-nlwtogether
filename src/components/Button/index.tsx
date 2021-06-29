import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {   
  Text,   
} from 'react-native';

import DiscordImg from "../../assets/discord.png";
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
}

export function Button({title, ...rest} : Props) {
  return (
    <RectButton style={[styles.container, {backgroundColor: theme.colors.primary}]} {...rest}>      

      <Text style={styles.title}>
        {title}
      </Text>

    </RectButton>
  )}