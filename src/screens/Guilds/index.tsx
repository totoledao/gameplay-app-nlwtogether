import React from 'react';
import { 
  View,
  FlatList,
} from 'react-native';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelected} : Props) {

  const guilds= [
    {
      id: '1',
      name:'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '2',
      name:'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '3',
      name:'Lendários',
      icon: null,
      owner: true,
    }
  ];

    return (
      
        <View style={styles.container}>

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
            style={styles.guilds}
          />
          
        </View>      
    );
}