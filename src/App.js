import React, { useRef } from 'react';
import CanvasJSReact from './canvasjs.react';
import axios from "axios"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

 
function App(){

     var data=[]
     const options = {
      animationEnabled: true,	
      title:{

      },
      axisY : {

        suffix:"K"
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: []
      }]
  } 



    var objectReference={}
    var revObj={
      Jan:0,
      Feb:0,
      Mar:0,
      Apr:0,
      May:0,
      Jun:0,
      Jul:0,
      Aug:0,
      Sep:0,
      Oct:0,
      Nov:0,
      Dec:0
    }
  var revDict={}
  
  var chartRef=useRef(null)
   async function getData (){
    function clone(obj){
      var  tempObj={}
      var tempKeys=Object.keys(obj)
      for(let i=0;i<tempKeys.length;i++){
        tempObj[tempKeys[i]]=obj[tempKeys[i]]
      }
      return(tempObj)
    }




    console.log(chartRef)

        var dropDown=document.getElementsByClassName("dropdown")[0]
        console.log("here")
        let res=await axios.get("http://fetest.pangeatech.net/data")
        console.log("after response")
        console.log(res.data)
       for(let i=0;i<res.data.length;i++){
        var p=res.data[i].product
        var revType=res.data[i].revenue_type
        let month=res.data[i].month
        month=month.slice(0,3)
        if(objectReference[p]===undefined){
          objectReference[p]={
            "all":clone(revObj)
          }
        }
     
          if(objectReference[p][revType]===undefined){
            objectReference[p][revType]=clone(revObj)
          }
        objectReference[p][revType][month]+=res.data[i].revenue/1000
        objectReference[p]["all"][month]=res.data[i].revenue/1000
        if(revDict[revType]===undefined){
          revDict[revType]=true
          var newOption=document.createElement("option")
          newOption.innerText=revType
          dropDown.appendChild(newOption)

        }
        }
        var newOption=document.createElement("option")
          newOption.innerText="all"
          dropDown.appendChild(newOption)





      var table=document.getElementsByClassName("table")[0]
      var newRow
      var newValue
      for(let a=0;a<res.data.length;a++){
        newRow=document.createElement("tr")
        var obj=res.data[a]
        var objKeys=Object.keys(obj)
        if(a===0){
          for(let b=0;b<objKeys.length;b++){
            newValue=document.createElement("td")
            newValue.innerText=objKeys[b]
            newRow.append(newValue)
            newRow.style.backgroundColor="pink"
            newValue.style.border="1px solid black"

          }
        }
        else{
          for(let b=0;b<objKeys.length;b++){
            newValue=document.createElement("td")
            newValue.innerText=obj[objKeys[b]]
            newRow.append(newValue)
            newValue.style.border="1px solid black"

          }
        }
        table.append(newRow)
      }

      console.log(objectReference)
       }
   var hello= "initioal"

    function constructor(){
      
      var dropDown=document.getElementsByClassName("dropdown")[0]
      data=[]
      var Revenue=dropDown.value
      var keys1=Object.keys(objectReference)
      for(let i=0;i<keys1.length;i++){
       var o1=objectReference[keys1[i]][Revenue]
       if(o1===undefined){
        continue
       }
       var tempArray=[]
       var keys2=Object.keys(o1)
       for(let j=0;j<keys2.length;j++){
        tempArray.push({
          label:keys2[j],
          y:o1[keys2[j]]
        })
       }
       
       data.push({
                  type:"line",
                  name:keys1[i],
                  showInLegend:true,
                  dataPoints:tempArray

       })
      }
    options.data=data
    var container=document.getElementsByClassName("container")[0]
    }

    
		return (
     
		<div className='container'>

     <div className='getData'><button  onClick={getData}> Get Data</button> </div> 
      <div className='header' style={{
        backgroundColor:"lightblue",
        display:"flex",
        flexDirection:"row"
      }}>
        <select placeholder='Select' className='dropdown' onChange={constructor} style={{
          marginTop:"15x",
          width:"25%",
          backgroundColor:"violet"
        }}>
           
        </select>

        <div className='spanName' style={{
          marginLeft:"auto",
          height:"20px",
          width:"100px",
        }}> Hello John</div>
      </div>
     <CanvasJSChart className="chart" options = {options}    ref={chartRef}/>
      <table className='table' style={{
        border:"1px solid black",
        width:"100%"
      }}>

      </table>
			
		</div>
		);
	}

 
export default App;                              