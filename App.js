import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity,FlatList, AsyncStorage } from 'react-native'
import data from './data'
import Swipeout from 'react-native-swipeout'

class FlatListItem extends Component {
  constructor(props){
    super(props);
    this.state={
      activeRowKey:null
    }
  }
  render(){
    const swipeSettings={
      autoClose:true,
      onClose:(secId,rowId,direction)=>{
        if(this.state.activeRowKey!=null){
          this.setState({activeRowKey:null});
        }
      },
      onOpen:(secId,rowId,direction)=>{
        this.setState({activeRowKey:this.props.item.key});
      },
      right:[
        {
          onPress:()=>{
            const deletingRow=this.state.activeRowKey
            data.splice(this.props.index,1)
            this.props.parentFlatList.refreshFlatList(deletingRow)

          },
          text:'Sil',type:'delete'
        }
      ],
      rowId:this.props.index,
      sectionId:1
    }
    return(
      <Swipeout {...swipeSettings}>
        <View style={styles.flatstil}>
        <Text>{this.props.item.title}</Text>
        </View>
      </Swipeout>

    )
  }
}
export default class App extends Component {
constructor(props){
  super(props);
  this.state=({
    deletedRowKey:null,
    yeniveri:''
  })
}
refreshFlatList=(activeKey)=>{
  this.setState((prevState)=>{
    return{
      deletedRowKey:activeKey
    }
  }
  )
    
}
_iduret=(numberOfCharecters)=>{
  return require('random-string')({length:numberOfCharecters})
}

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} 
        placeholder='Alışveriş Listenize Eklemek İstediğiniz Ürünü Yazınız'
        value={this.state.yeniveri}
        onChangeText={(text)=>this.setState({yeniveri:text})}  
        >
        </TextInput>
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{  
          const yeniid=this._iduret(24);
          const yeni={
            key:yeniid,
            title:this.state.yeniveri
          }
          data.push(yeni)
          this.refreshFlatList(yeniid)
        }
        }
        >
          <Text style={styles.buttontext} >
              EKLE
          </Text>
        </TouchableOpacity>
         <FlatList
         data={data}
         renderItem={({item,index})=>{
           return(
             <FlatListItem item={item} index={index} parentFlatList={this} ></FlatListItem> 
           )
         }
        }
         >
         </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    margin:30,
    backgroundColor:'#F5FCFF'
  },
  input:{
    borderWidth: 2,
    borderColor:'#48A7DD',
    color:'#B2B2B2'
  },
  button:{
    backgroundColor:'#009788',
    borderRadius:3,
    paddingVertical:10,
    alignItems:'center',
    marginTop:10
  },
  buttontext:{
    fontSize:15,
    color:'white'
  },
  flatstil:{
    padding:10,
    backgroundColor:'gray',
    borderWidth:1
  }
}

)

