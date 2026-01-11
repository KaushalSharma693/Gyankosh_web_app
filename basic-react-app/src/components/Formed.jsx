import { useState } from "react";
export default function Form(){
      let [formData,setFormData]=useState({
        fullName:"",
        username:"",
      });
    
      
      let handleInputChange=(event)=>{
        setFormData((currData)=>{
            return {...currData,[event.target.name]:event.target.value};
        });
      };

      let handleSubmit=(event)=>{
        event.preventDefault();
        console.log(formData);
        setFormData({
            fullName:"",
            username:"",
        });
      };
     
      
    return (
        <form onSubmit={handleSubmit}>
             <label htmlFor="fullname">Fullname:-</label>
            <input placeholder="enter full name" type="text" value={formData.fullName}  id="fullname" name="fullName" onChange={handleInputChange}/>
             <br></br><br></br>
            <label htmlFor="username">Username:-</label>
            <input placeholder="enter user name" type="text" value={formData.username}  id="username" name="username" onChange={handleInputChange}/>

            <button>submit</button>
            </form>
    );
}