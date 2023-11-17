import  styles  from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import ListItem from '@/components/ListItem';

export default function Multitwitch() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [channelsList, setChannelsList] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=> {
    inputRef.current && inputRef.current.focus();
  },[])

  const handleAdd = () => {     
   setChannelsList([...channelsList, inputVal]);
   setInputVal('');
   inputRef.current && inputRef.current.focus();
  }

  const handleDelete = (channelName: string) => {
    const newArr = channelsList.filter( item => item !== channelName);
    setChannelsList(newArr);
  }

  const handleEnter = (e: any) => e.key === 'Enter' && handleAdd();

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
            <button onClick={() => handleAdd()}>Add</button>
            <button disabled={channelsList.length <= 0} onClick={handleGo}>Go</button>
          </div>
          <div className={styles.channelsList}>
              {channelsList && channelsList.map( (item, i) => <ListItem handleDelete={handleDelete} key={i} value={item}/> )}
          </div>
        </div>
      </div>
    </div>
  )
}