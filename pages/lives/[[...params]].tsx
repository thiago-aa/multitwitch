import Player from '../../components/Player'
import { useRouter } from 'next/router'
import styles from '../../styles/Lives.module.css';
import Chat from '../../components/Chat'


export default function Lives() {
  const router =  useRouter();
  const channels = router.query.params;

  const calcFlexBasis = () => {
    const length = channels?.length;
    if(length >= 2 && length < 5) {
      return '49%';
    } else if (length < 10) {
      return '32%';
    } else {
      return '22%';
    }
  }
  const renderChannels = () => {
    if(channels !== undefined) {
     return Array.isArray(channels) ? channels.map((channel: string) => <Player channelName={channel} flexBasis={calcFlexBasis()}/>) : '';
    }
  }


  return (
    <div className={styles.mainContainer}>      
      <div className={styles.channelsContainer}>
        {
          renderChannels()
        }
      </div>
      <div style={{flexGrow: '1'}} className={styles.chatContainer}>
       {channels && <Chat channelsList={channels}/>} 
      </div>
    </div>
  )
}
