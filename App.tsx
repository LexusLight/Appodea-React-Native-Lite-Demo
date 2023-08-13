import React,{useState} from 'react';
import {Appodeal, AppodealAdType, AppodealLogLevel} from 'react-native-appodeal';
import {StyleSheet, Text, useColorScheme, View,  Pressable} from 'react-native';

import {Colors } from 'react-native/Libraries/NewAppScreen';

import CheckBox from '@react-native-community/checkbox';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [testMode, setTestMode] = useState(false);
  const [logMode, setLogMode] = useState(false);
  const [autocacheBanner, setAutocacheBanner] = useState(true);
  const [autocacheInterstitial, setAutocacheInterstitial] = useState(true);
  const [autocacheRewardedVideo, setAutocacheRewardedVideo] = useState(true);

  const initAppodeal = () => {

    logMode ? Appodeal.setLogLevel(AppodealLogLevel.VERBOSE): Appodeal.setLogLevel(AppodealLogLevel.NONE)
    Appodeal.setTesting(testMode);

    Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, autocacheInterstitial);
    Appodeal.setAutoCache(AppodealAdType.REWARDED_VIDEO, autocacheRewardedVideo);
    Appodeal.setAutoCache(AppodealAdType.BANNER, autocacheBanner);

    const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER
    Appodeal.initialize('d908f77a97ae0993514bc8edba7e776a36593c77e5f44994', adTypes)
  }

  const cacheAll = () => {
    Appodeal.cache(AppodealAdType.BANNER)
    Appodeal.cache(AppodealAdType.REWARDED_VIDEO)
    Appodeal.cache(AppodealAdType.INTERSTITIAL)
  }

  const showBanner = () => {
    Appodeal.show(AppodealAdType.BANNER_BOTTOM)
  }

  const hideBanner = () => {
    Appodeal.hide(AppodealAdType.BANNER_BOTTOM)
  }

  const showInterstitial = () => {
    Appodeal.show(AppodealAdType.INTERSTITIAL)
  }

  const showRewardedVideo = () => {
    Appodeal.show(AppodealAdType.REWARDED_VIDEO)
  }

  return (
    <View style={styles.menuControls}>
    
      <Text style={styles.titleText}>Appodeal React Native</Text>

      {/* Options section */}
      <Text style={styles.sectionTitle}>Mode Section</Text>

      <View style={styles.checkBoxView}>
        <CheckBox value={testMode} onChange={()=>{setTestMode(!testMode)}} tintColors={{true: 'red'}}/>
        <Text style={styles.checkBoxText}>TestMode</Text>

        <CheckBox value={logMode} onChange={()=>{setLogMode(!logMode)}} tintColors={{true: 'red'}}/>
        <Text style={styles.checkBoxText}>LogMode</Text>
      </View>

      <Text style={styles.sectionTitle}>Autocache</Text>
      <View style={styles.checkBoxView}>
        <CheckBox value={autocacheBanner} onChange={()=>{setAutocacheBanner(!autocacheBanner)}} tintColors={{true: 'red'}}/>
        <Text style={styles.checkBoxText}>Banner</Text>

        <CheckBox value={autocacheInterstitial} onChange={()=>{setAutocacheInterstitial(!autocacheInterstitial)}} tintColors={{true: 'red'}}/>
        <Text style={styles.checkBoxText}>Interstitial</Text>

        <CheckBox value={autocacheRewardedVideo} onChange={()=>{setAutocacheRewardedVideo(!autocacheRewardedVideo)}} tintColors={{true: 'red'}}/>
        <Text style={styles.checkBoxText}>Rewarded</Text>
      </View>


      {/* Banner section */}
      <Pressable style={styles.button} onPress={initAppodeal}>
        <Text style={styles.buttonText}>Initialize</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={cacheAll}>
        <Text style={styles.buttonText}>Cache all</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={showBanner}>
        <Text style={styles.buttonText}>Show Banner</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={hideBanner}>
        <Text style={styles.buttonText}>Hide Banner</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={showInterstitial}>
        <Text style={styles.buttonText}>Show Interstitial</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={showRewardedVideo}>
        <Text style={styles.buttonText}>Show Rewarded</Text>
      </Pressable>
      

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    width: "50%",
    alignSelf: "center",
    marginBottom: "2%",
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },

  titleText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    paddingBottom: "5%"
  },

  checkBoxView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    marginBottom: "2%",
    flexDirection:'row', 
    flexWrap:'wrap'
  },

  checkBoxText: {
    alignSelf: "center",
    color: 'black',
  },

  sectionTitle: {
    fontSize: 20,
    alignSelf: "center",
    color: 'black',
  },

  menuControls:{
    marginTop: "25%"
  }
});

export default App;
