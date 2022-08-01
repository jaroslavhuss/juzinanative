import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import Layout from '../components/Layout'
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserDispatchContext, UserContext } from '../context/GlobalContext';
const KVBezpecnost = () => {
    const {navigate}:{navigate:any} = useNavigation()
    const {width,height}:{width:number, height:number} = Dimensions.get("screen");
    const [w, setWidth] = useState<number>(width);
    const [h, setHeight] = useState<number>(height)
    const [switchStudy, setSwitchStudy] = useState<boolean>(false);

    const showRefWindow = useContext(UserContext);
    const setRefWindow = useContext(UserDispatchContext);
    
    const text = "Zdroj:\n\nGreen JB et al. Effect of Sitagliptin on Cardiovascular Outcomes in Type 2 Diabetes. N Engl J Med 2015;373:232-42. (TECOS study) Trial Evaluating Cardiovascular Outcomes with Sitagliptin (TECOS)"
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
          setHeight(screen.height)
          setWidth(screen.width)
        });
        return () => subscription?.remove();
      });

      const [isLoaded, setIsLoaded] = useState<boolean>(false)
      useFocusEffect(
        React.useCallback(() => {
            setRefWindow({...showRefWindow,showIcon:true,referenceText:text})
          return () => {
            setRefWindow({...showRefWindow,showIcon:false,referenceText:""})
          };
        }, [isLoaded])
      );
  return (
    <Layout>
        <TouchableOpacity style={{width:600, height:100}} onPress={()=>{navigate("hlavni-stranka")}}>

        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
        <Text style={[styles.nadpis,{width:w/2, position:"absolute", top:0, right:0, color:"#08226f", textAlign:"center", fontSize:24}]}> <Entypo style={{textAlign:"center"}} name="shield" size={23} color="#08226f" /> KV Bezpečnost</Text>

        <View style={[styles.platno, {height:h-100}]}>
       <TouchableOpacity onPress={()=>{setSwitchStudy(!switchStudy)}}>
            {!switchStudy&&<Image source={require("../assets/kv_bezpecnost.png")} resizeMode="contain" style={{width:700, height:550}}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setSwitchStudy(!switchStudy)}}>
            {switchStudy&&<Image source={require("../assets/kv_bezpecnost_2.png")} resizeMode="contain" style={{width:700, height:550}}/>}
        </TouchableOpacity>
  
       </View>
    </Layout>
  )
}

export default KVBezpecnost

const styles = StyleSheet.create({
    platno:{
        justifyContent:"center",
        alignItems:"center"
    },
    nadpis:{
        padding:20,
        backgroundColor:"white",
        borderTopRightRadius:12,
        fontSize:18,
        fontWeight:"bold",
        opacity:0.7
    }
})