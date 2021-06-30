import React from 'react';
import { 
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { styles } from './styles';
import { useAuth } from '../../hooks/auth';

import { Background } from '../../components/Background';
import { ButtonIcon } from "../../components/ButtonIcon";
import IllustrationImg from '../../assets/illustration.png';
import { theme } from '../../global/styles/theme';

export function SignIn() {

  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (err) {
      Alert.alert(err); 
    }
  }

    return (
      <Background>
        <View style={styles.container}>      

          <Image
            source={IllustrationImg}      
            style={styles.image}
            resizeMode='stretch'
          />

          <View style={styles.content}>

            <Text style={styles.title}>
              Conecte-se {'\n'}
              e organize {'\n'}
              suas jogatinas
            </Text>

            <Text style={styles.subTitle}>
              Crie grupos para jogar seus games favoritos {`\n`}
              com seus amigos
            </Text>

            {
              loading
              ?                            
              <ActivityIndicator color={theme.colors.primary}/>
              :
              <ButtonIcon
                title="Entrar com Discord"            
                onPress={handleSignIn}   
              />
            }

          </View>
          
          </View>
        </Background>
    );
}