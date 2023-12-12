interface playerProps {
  channelName: string;
  flexBasis: string;
}


export default function Player(props: playerProps) {
  const url = `https://player.twitch.tv/?channel=${props.channelName}&parent=localhost`
  return (
    <div style={{border: "none", display: 'flex', flexBasis: props.flexBasis}}>
      <iframe  style={{ width: '100%', aspectRatio: '16/9', flexGrow: '0'}} src={url} allowFullScreen={true}></iframe>
    </div>
    // <div style={{backgroundColor: 'red', margin: '2px'}}>
    //   player
    // </div>
  )
}