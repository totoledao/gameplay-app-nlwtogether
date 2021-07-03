import React from 'react';
import { 
  Image,
  View,   
} from 'react-native';

import { styles } from './styles';
import DiscordSVG from '../../assets/discord.svg';

type Props = {
  guildID: string;
  iconId: string | null;
}

const { CDN_IMG } = process.env;

export function GuildIcon({guildID, iconId} : Props) {

  const uri = `${CDN_IMG}/icons/${guildID}/${iconId}.png`;
 
  return (    

    <View style={styles.container}>
      { iconId ?
        <Image
        style={styles.image}
        source={{uri}}
        resizeMode='cover'
        />        
        :
        <DiscordSVG
          width={40}
          height={40}
        />
      }
    </View>
  )}