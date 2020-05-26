import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native'

export default class flatdeneme extends Component {
    constructor(props){
        super(props);
        //Dizi elemanları tanımlandı.
        this.dizi=[{
            eleman:'1'
        },
        {
            eleman:'2'
        },
        {
            eleman:'3'
        },
        {
            eleman:'4'
        }
    ],
    //Diziyi tutması ve text boxda yazılanları alması için state tanımlandı.
    this.state={
        diziTut:[],
        textInputTut:''
    }
    }
    //Başta tanımlanan dizideki elemanlar dizitutan diziye aktarıldı
    componentDidMount(){
        this.setState({diziTut:[...this.dizi]})
    }
    //Textinputtut state'indeki elemanları diziye ekleme ve güncellenen diziyi tekraran dizi tutucuya atma
    veriekle=()=>{
        this.dizi.push({eleman:this.state.textInputTut})
        this.setState({diziTut:[...this.dizi]})
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                style={styles.flat}
                //Flatlist veri kaynağı belirlendi
                data={this.state.diziTut}
                //itemleri birbirinden ayıran key index numarasına gore ayarlandı.
                keyExtractor={(index) => index.toString()}
                //itemlerin nasıl render edilecegi belirlendi.
                renderItem={({ item }) => <Text> {item.eleman} </Text>}
                >
                </FlatList>
                <TextInput 
                placeholder='Veri giriniz.'
                //Text inputa yazılan veri textinput tutan diziye aktarıldı.
                onChangeText={veri=> this.setState({textInputTut:veri})}>
                </TextInput>

                <TouchableOpacity style={styles.button}
                //Tuşa basıldığında veriekle fonksiyonu çalıştırıldı
                  onPress={() => {
                    this.veriekle()
                  }}>
                    <Text style={styles.butontext}>Buton</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    flat:{
        backgroundColor:'#918F8F',
        width:300,
        height:400,
    },
    button:{  
        marginTop:50,
        height:40,
        width:200,
        alignItems:"center",
        backgroundColor:'#1F9792',
        borderRadius:20,
        justifyContent:'center'    
    },
    butontext:{
        fontSize:14,
        color:'#ddd'

    }

})
