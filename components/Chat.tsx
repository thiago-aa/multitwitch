import { channel } from 'diagnostics_channel';
import styles from '../styles/Chat.module.css';
import { useEffect, useState } from 'react';

interface ChatProps {
  channelsList: string[] | string;
}

export default function Chat(props: ChatProps) {
  const {channelsList} = props;
  const [channelChat, setChannelChat] = useState(Array.isArray(channelsList) ? channelsList[0] : channelsList);

  const renderButtons = () => {
    if(Array.isArray(channelsList)) {
      return channelsList.map(((channel, index) => {
        return <button onClick={() => setChannelChat(channel)}>{channel}</button>
      }))
    }
  }
  let chatUrl =  `https://twitch.tv/embed/${channelChat}/chat?parent=localhost`;
  useEffect(()=> {
    chatUrl = `https://twitch.tv/embed/${channelChat}/chat?parent=localhost`;
  }, [channelChat])

  return (
    <div className={styles.chatContainer}>
      <div>
        {renderButtons()}
      </div>
      <iframe src={`https://twitch.tv/embed/${channelChat}/chat?parent=localhost`} height="90%" width="100%"></iframe>
    </div>
  )
}