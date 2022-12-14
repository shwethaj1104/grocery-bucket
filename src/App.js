import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = ()=>{
  let list = [{"id":"1660222747484","title":"Rice"},{"id":"1660222749367","title":"Shampoo"},{"id":"1660222750979","title":"wheat floor"},{"id":"1660222752762","title":"bread"}]
  if(list){
    return list
  }else{
    return []
  }
}

function App() {

  const [name,setName] = useState('')
  const [list,setList] = useState(getLocalStorage())
  const [isEditing,setIsEditing] = useState(false)
  const [editId,setEditId] = useState(null)
  const [alert,setAlert] = useState({show:false,msg:'',type:''})

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!name){
      showAlert(true,'danger','please enter value')
    }else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id === editId){
          return {...item,title:name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'success','cart item edited successfully')
    }else{
      showAlert(true,'success','item added to cart successfully')
      const newItem = {id:new Date().getTime().toString(),title:name}
      setList([...list,newItem]);
      setName('')
    }
  }
  
  const showAlert=(show=false,type='',msg='')=>{
    setAlert({show,type,msg})
  }

  const clearList = ()=>{
    showAlert(true,'danger','Cart is Empty')
    setList([])
  }

  const removeItem=(id)=>{
    showAlert(true,'danger','cart item removed')
    setList(list.filter((item)=>
       item.id !== id
    ))
  }

  const editItem=(id)=>{
    const specificItem = list.find((item)=>item.id === id)
    setIsEditing(true);
    setEditId(id)
    setName(specificItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery cart</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='e g .Eggs' value={name} onChange={(e)=>setName(e.target.value)}></input>
          <button type='submit' className='submit-btn'>{isEditing ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {list.length > 0 && 
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>Clear Cart</button>
      </div>
      }
    </section>
  )
}

export default App
