import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

import './App.css'
const instance = axios.create({
    baseURL:' https://glacial-chamber-51444.herokuapp.com/'
})
export default class App extends Component {
    constructor(){
        super();
        this.state={
            currentName:"",
            currentComment:'',
            data:[]
        }
    }
    componentDidMount(){
      
        instance
        .get("/comments",{})
        .then(res=>{
            this.setState({
                data:res.data
            });
           
            
        
        })
        
    }
    commentAdd(e){
        this.setState({
            currentComment:e.target.value
        })
       
    }
    nameAdd(e){
        this.setState({
            currentName:e.target.value
        })
     
        
    }
    uploadData(e){
       
        const comment = {
            id:this.state.data.length+1,
            name:(this.state.currentName!=='')?this.state.currentName:"noName",
            message:(this.state.currentComment!=='')?this.state.currentComment:"noComment",
            upvote:0,
            devote:0,
            date:new Date().toDateString()

        } 
        instance.post('/comments',comment)
        this.setState({
            data:[...this.state.data, comment],
            currentComment:'',
            currentName:''
        })
    }
    voteChange(e,type){
        const id = Number(e.target.parentElement.parentElement.id);
        
        instance.get(`/comments/${id}`,{
        })
        .then(res=>{
            this.setState({
                tmp:res.data
            })
            
            if(type==='upvote'){
                // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tmp.upvote+=1
            }
            if(type==='devote'){
                // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tmp.devote+=1
            }
         
        
            instance.put(`/comments/${id}`,this.state.tmp)
            .then(e=>{
           
            instance.get("/comments",{})
            .then(e=>{
                this.setState({
                    data:e.data
                })
            })
        })
            
        })
       
        this.setState({
            data:this.state.data
        })
        
        
    }
    

 



        
       
    render() {
        const {data} = this.state
        return (
        <div className={"p-1"}>
            <div className={"form-group px-4 py-1 container-fluid"}>
                <input 
                    type="text" 
                    className="jumbotron form-control my-2 p-2"
                    placeholder="Name ..." 
                    onChange={e=>this.nameAdd(e)}
                    value={this.state.currentName}
                />
                <textarea 
                    className={"form-control jumbotron p-2 my-2"} 
                    rows={5} placeholder={"Enter You comment ..."} 
                    onChange={e=>this.commentAdd(e)} 
                    value={this.state.currentComment}>
                    
                
                </textarea>
                <button onClick={e=>this.uploadData(e)} className={'btn btn-success px-3 '}>Post Comment</button>
                
            </div>
            <div className="list-group ">
                {data.map((i) =>
                    <div id={i.id} className="list-group-item" key={i.id}>
                        <strong>{i.name}</strong> 
                        <div className="jumbotron p-2" style={{backgroundColor:"white"}}>{i.message}
                    </div>
                
                <button className="btn p-1 " onClick={e=>this.voteChange(e,'upvote')}>
                    <div onClick={e=>this.voteChange(e,'upvote')} className="up"></div>
                    <div>{i.upvote}</div>
                </button>
                
                <button className="btn p-1 " onClick={e=>this.voteChange(e,'devote')}>
                    <div onClick={e=>this.voteChange(e,'devote')} className="de">
                        </div><div>{i.devote}</div>
                </button>
                <section style={{fonsize:"80px",display:"block"}}>{i.date}</section>
                        </div>
      ) }  </div>
            </div>
            
        )
    }
}
