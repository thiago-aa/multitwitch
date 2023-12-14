interface playerProps {
  channelName: string;
  flexBasis: string;
}


export default function Player(props: playerProps) {
  const url = `https://player.twitch.tv/?channel=${props.channelName}&parent=multi-twitch-ecru.vercel.app/`
  return (
    <div style={{border: "none", display: 'flex', flexBasis: props.flexBasis}}>
      <iframe  style={{ width: '100%', aspectRatio: '16/9', flexGrow: '0', border: 'none'}} src={url} allowFullScreen={true}></iframe>
    </div>
    // <div style={{backgroundColor: 'red', margin: '2px'}}>
    //   player
    // </div>
  )
}