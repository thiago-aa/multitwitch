import  styles  from '../styles/Home.module.css'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router';
import ListItem from '@/components/ListItem';

export default function Multitwitch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [inputVal, setInputVal] = useState<string>('');
  const [buttonText, setButtonText] = useState('Add');
  const [channelsList, setChannelsList] = useState<string[]>([]);
  
  
  
  useEffect(()=> {
    inputRef.current && inputRef.current.focus();
  },[])

  function handleAdd() {
    console.log('chamou handleAdd');
      setInputVal((prevInputVal) => {
        // const currentInputVal = prevInputVal;
        setChannelsList((prevChannelsList) => [...prevChannelsList, prevInputVal]);
        return '';
      });
      inputRef.current && inputRef.current.focus();
  }


 const [buttonFunc, setButtonFunc] = useState<() => void>(() => handleAdd);

  const handleDelete = (index: any) => {
    if(index === 0) {
      setChannelsList(channelsList.slice(1))      
    }else if(index === (channelsList.length - 1)) {
      setChannelsList(channelsList.slice(0, -1));
    } else {
      setChannelsList([...channelsList.slice(0, index), ...channelsList.slice(index+1)])
    }
  }

  
const handleEnter = (e: any) => e.key === 'Enter' && handleAdd();
  
  const changeToEdit = (index: any) => {
    // setInputVal(channelsList[index]);
    // setButtonText('Edit');
    // const handleEdit = () => {
    //   if(index === 0) {
    //     setChannelsList(channelsList.slice(1))      
    //   }else if(index === (channelsList.length - 1)) {
    //     setChannelsList(channelsList.slice(0, -1));
    //   } else {
    //     setChannelsList([...channelsList.slice(0, index), ...channelsList.slice(index+1)])
    //   }
    // }
    // setButtonFunc(() => handleEdit);
  }


  const handleGo = () => {
    router.push(`lives/${channelsList.join('/')}`)
  }

  return (
    <div className={styles.mainContainer}>
      <nav className={styles.title}>
        <h1>
          Multitwitch
        </h1>
      </nav>
      <div className={styles.main}>
        <h2>Add Channels</h2>
        <div>        
          <div className={styles.inputContainer}>          
            <input type="text" value={inputVal} ref={inputRef} onChange={ e => setInputVal(e.target.value) } onKeyUp={e => handleEnter(e)}/>
            <button onClick={() => buttonFunc()}>{buttonText}</button>
            <button disabled={channelsList.length <= 0} onClick={handleGo}>Go</button>
          </div>
          <div className={styles.channelsList}>
              {channelsList && channelsList.map( (item, i) => <ListItem handleDelete={handleDelete} changeToEdit={changeToEdit} key={i} index={i} value={item}/> )}
          </div>
        </div>
      </div>
    </div>
  )
}