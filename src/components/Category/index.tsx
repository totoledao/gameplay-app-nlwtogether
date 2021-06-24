import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
}

export function Category({
  title,
  icon: Icon,
  hasCheckBox= false,
  checked= false,
  ...rest} : Props) {

    return(
      <RectButton style={styles.container} {...rest}>

        <LinearGradient
          style={styles.container}
          colors={[theme.colors.secondary50, theme.colors.secondary70]}   
        >
        
        <LinearGradient
          style={[
            styles.content,
            {opacity: checked ? 1 : 0.5}
          ]}
          colors={[checked ? theme.colors.secondary75 : theme.colors.secondary40, theme.colors.secondary50]}
        >
          { hasCheckBox &&
            <View style={checked ? styles.checked : styles.check} />
          }

          <Icon
            width={48}
            height={48}
          />          

          <Text style={styles.title}>
            {title}
          </Text>

        </LinearGradient>

        </LinearGradient>

      </RectButton>
    )
  
}