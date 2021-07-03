import React, { useState } from 'react';
import { 
  View,
  FlatList,
} from 'react-native';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { useEffect } from 'react';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelected} : Props) {

  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchGuilds() {
    const response = await api.get('users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  },[])
    return (
      
        <View style={styles.container}>

          { loading?
            <Loading />
            :
            <FlatList
            data={guilds}
            keyExtractor={item => item.id }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Guild
                data={ item }
                onPress={() => handleGuildSelected(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            ListHeaderComponent={() => <ListDivider />}
            style={styles.guilds}
            contentContainerStyle={{paddingBottom: 27, paddingTop: 103}}
            />
          }
          
        </View>      
    );
}