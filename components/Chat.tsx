import styles from '../styles/Chat.module.css';
import { useCallback, useEffect, useState } from 'react';

interface ChatProps {
  channelsList: string[] | string;
}

export default function Chat(props: ChatProps) {
  
  const normalizeChatList = () => {
    if(Array.isArray(props.channelsList)) {
      return props.channelsList.map((channel, index) => {
        if(index === 0) {
          return {
            name: channel,
            selected: true
          }
        }
        return {
          name: channel,
          selected: false
        }
      })
    } else return [{name: props.channelsList, selected: true}];
  }
  console.log(normalizeChatList());
  const [channelsList, setChannelsList] = useState(normalizeChatList());
  const [channelChat, setChannelChat] = useState(Array.isArray(channelsList) ? channelsList[0].name : channelsList);
  
  const handleChatButton = (channel: any, index: number) => {
    setChannelChat(channel.name);
    if(Array.isArray(channelsList)){
      setChannelsList(
        channelsList.map((channel, i) => {
          if(i === index) {
            return {
              name: channel.name,
              selected: true
            }
          } else {
            return {
              name: channel.name,
              selected: false
            }
          }
        })
      )
    }
  }

  const renderButtons = useCallback(
    (channels: any) => {
      console.log('channelsList no render Buttons', channels);
      if(Array.isArray(channelsList)) {
        console.log('entrou no if do render buttons');
        return channelsList.map(((channel, index) => {
          return <button key={index}  className={channel.selected ? styles.chatButtonSelected : styles.chatButton} onClick={e => handleChatButton(channel, index)}>{channel.name}</button>
        }))
      } else return <p>aquelas coisa né man</p>
    }, [channelsList]) 

  const [chatUrl, setChatUrl] =  useState(`https://twitch.tv/embed/${channelChat}/chat?parent=multi-twitch-ecru.vercel.app/&darkpopout`);
  
  useEffect(()=> {
    setChatUrl( `https://twitch.tv/embed/${channelChat}/chat?parent=multi-twitch-ecru.vercel.app/&darkpopout`);
  }, [channelChat])

  useEffect(()=> {
    setChannelsList(normalizeChatList());
  }, [])


  return (
    <div className={styles.chatContainer}>
      <div className={styles.buttonsContainer}>
        {channelsList.length >= 1 ? renderButtons(channelsList) : <p>ai n currrti</p>}
      </div>
      <iframe style={{border: 'none'}} src={chatUrl} height="90%" width="100%"></iframe>
    </div>
  )
}