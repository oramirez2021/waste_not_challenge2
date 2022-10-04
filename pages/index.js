import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../src/components/header'
import { useEffect, useState } from 'react'

export default function Home() {
  //initializing useStates
  const [keyStrokeTimer,setKeyStrokeTimer] = useState();
  const [autoSaveTimer,setAutoSaveTimer] = useState();
  const [event,setEvent] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState();

  //valid that the data enter in the textbox be only numbers. Also reinitialize the timer and the useStates
  const handleChange = event => {
    let inputText = event.target.value;
    let isDigit = new RegExp('^[0-9]*$', 'g').test(inputText);
    if(isDigit){
      clearTimeout(timer);
      setValue(inputText);
      setKeyStrokeTimer(0);
      setAutoSaveTimer(0);
    }
  };
 //Configuring Timer and states will handle Auto-saving and Saved Page state.
  useEffect(()=>{
    if(keyStrokeTimer < 5){
      setTimer(setTimeout(() => {
          setKeyStrokeTimer(keyStrokeTimer + 1);
      }, 1000));
    }else{
      if(keyStrokeTimer > 0){
        setEvent('Auto-saving')
      }
      if(autoSaveTimer < 2){
        setTimeout(() => {
          setAutoSaveTimer(autoSaveTimer + 1);
        }, 1000);
      }else{
        if(autoSaveTimer > 0){
          setEvent('Saved');
        }
        
      }
    }
  },[keyStrokeTimer,autoSaveTimer]);
  
  //Refreshing web page
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title = 'ORDERS' subtitle = 'Enter your numeric quantities'/>
        <div>
          <input value={value} onChange={handleChange}  className='input is-large is-rounded is-focused'></input>
          
        </div>
        <div>
          <label className='label is-large has-text-white is-align-content-center'>{event}</label>
        </div>
        <div>
          Key Stroke Timer:{keyStrokeTimer}
        </div>
        <div>
          Auto Save Timer:{autoSaveTimer}
        </div>
        <div>
          <button onClick={refreshPage} className='button is-large is-rounded'>Refresh Page</button>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
  
}
