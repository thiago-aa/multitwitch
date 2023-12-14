import  styles  from '../styles/Home.module.css'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router';
import ListItem from '@/components/ListItem';
import Warning from '@/components/Warning';

export default function Multitwitch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [inputVal, setInputVal] = useState<string>('');
  const [buttonText, setButtonText] = useState('Add');
  const [channelsList, setChannelsList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [warningText, setWarningText] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(()=> {
    inputRef.current && inputRef.current.focus();
  },[])

  const validateField = (text: string) => {
    text = text.trim();
    if(text.length === 0 ) {
      setShowWarning(true);
      setWarningText('Please fill in the channel name field with the name of the channel');
      return false;
    } else if(text.indexOf(' ') !== -1) {
      setShowWarning(true);
      setWarningText('Spaces are not allowed in the channel name');
      return false;
    }
    if(showWarning) {
      setShowWarning(false);
    }
    return true;
  }

  const handleAdd = useCallback(
    () => {
      if(!validateField(inputVal)) {
        inputRef.current && inputRef.current.focus();
      } else {
        setChannelsList([ inputVal, ...channelsList]);
        setInputVal('');
        inputRef.current && inputRef.current.focus();
      }
    },
    [channelsList, inputVal]
  );

  const handleEdit = useCallback(
    () => {
          if(currentIndex  === 0) {
            const auxArr = channelsList.slice(1);
            auxArr.unshift(inputVal)
            setChannelsList(auxArr);
            setInputVal('');
            setButtonText('Add');
            inputRef.current && inputRef.current.focus();
          } else if(currentIndex  === (channelsList.length - 1)) {
            const auxArr = channelsList.slice(0, -1);
            auxArr.push(inputVal);
            setChannelsList(auxArr);
            setInputVal('');
            setButtonText('Add');
            inputRef.current && inputRef.current.focus();
          } else if(currentIndex){
            const auxArr = [...channelsList]
            auxArr.splice(currentIndex, 1, inputVal);
            setChannelsList(auxArr);
            setInputVal('');
            setButtonText('Add');
            inputRef.current && inputRef.current.focus();
          }
          if(showWarning) {
            setShowWarning(false);
          }
      },
    [channelsList, inputVal, currentIndex]
  );
  
  const [buttonFunc, setButtonFunc] = useState<() => void>(() => handleAdd);
  
  const setEdit = useCallback(
    (index: any) => {
      setInputVal(channelsList[index]);
      setCurrentIndex(index);
      setButtonFunc(() => handleEdit);
      setButtonText('Edit');
    }, [inputVal, channelsList]
  );

  useEffect(()=> {
    if(buttonText === 'Add'){
      setButtonFunc(() => handleAdd);
    } else {
      setButtonFunc(() => handleEdit);
    }
  },[inputVal, channelsList, currentIndex])

  const handleDelete = (index: any) => {
    if(index === 0) {
      setChannelsList(channelsList.slice(1))      
    }else if(index === (channelsList.length - 1)) {
      setChannelsList(channelsList.slice(0, -1));
    } else {
      setChannelsList([...channelsList.slice(0, index), ...channelsList.slice(index+1)])
    }
  }

  
const handleEnter = (e: any) => e.key === 'Enter' && buttonFunc();
  
  

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
          <Warning text={warningText} hidden={!showWarning}/>
          <div className={styles.inputContainer}>          
            <input type="text" value={inputVal} ref={inputRef} onChange={ e => setInputVal(e.target.value) } onKeyUp={e => handleEnter(e)}/>
            <button onClick={buttonFunc}>{buttonText}</button>
            <button disabled={channelsList.length <= 0} onClick={handleGo}>Go</button>
          </div>
          <div className={styles.channelsList}>
              {channelsList && channelsList.map( (item, i) => <ListItem handleDelete={handleDelete} handleEdit={setEdit} key={i} index={i} value={item}/> )}
          </div>
        </div>
      </div>
    </div>
  )
}