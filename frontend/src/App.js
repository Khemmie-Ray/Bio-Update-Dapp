import React, { useState } from "react"
import contractABI from "./abi.json"
const { ethers } = require("ethers")

function App() {
  const [inputName, setInputName] = useState("")
  const [inputAge, setInputAge] = useState("")
  const [updatedDetails, setUpdatedDetails] = useState('')

  const contractAddress = "0x34110D7Ca7dAC360Ccf77204f28A42B0f2Ece964"
 

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  async function updateDetails() {
    console.log("updateDetails function called")
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("Provider", provider)
      const signer = await provider.getSigner();
      console.log("signer", signer)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        console.log("contract", contract);
        await contract.updateName(inputName);
        console.log("Name Updated")
        await contract.updateAge(inputAge);
        // await transaction.wait();
        // await ageUpdate.wait();
        console.log('Name and age set');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function getEntityDetails () {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      try {
        const details = await contract.getEntityDetails();
        const [entityName, entityAge] = details;
        setUpdatedDetails(`${entityName}, ${entityAge}`)
        console.log('age set');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  return (
    <div className="bg-red-400">
     <div>
      <input 
      type="text" 
      placeholder="Type your name" 
      value={inputName}
      onChange={(e) => {
        setInputName(e.target.value)}}
      className="border rounded-md mb-4 outline-none px-4 py-2 block"
      />
       <input 
      type="text" 
      placeholder="Type your age" 
      value={inputAge}
      onChange={(e) => {
        setInputAge(e.target.value)}}
      className="border rounded-md mb-4 outline-none px-4 py-2 block"
      />
      <button onClick={updateDetails} className="border bg-black block">Update</button>
     </div>
     <div>
      <button onClick={getEntityDetails} className="border bg-black block">Get Details</button>
     </div>
     <p>{updatedDetails}</p>
    </div>
  );
}

export default App;
