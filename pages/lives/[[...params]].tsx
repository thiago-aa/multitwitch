import { useEffect } from 'react';
import Player from '../../components/Player'
import { useRouter } from 'next/router'


export default function Lives() {
  const router =  useRouter();
  const channels = router.query.params;

  const renderChannels = () => {
    if(channels !== undefined) {
     return Array.isArray(channels) ? channels.map((channel: string) => <Player channelName={channel}/>) : '';
    }
  }


  return (
    <div>
      {
        renderChannels()
      }
    </div>
  )
}
