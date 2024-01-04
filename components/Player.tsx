interface playerProps {
  channelName: string;
  flexBasis: string;
}


export default function Player(props: playerProps) {
  const url = `https://player.twitch.tv/?channel=${props.channelName}&parent=multitwitch-one.vercel.app`
  return (
    <div style={{border: "none", display: 'flex', flexBasis: props.flexBasis}}>
      <iframe  style={{ width: '100%', aspectRatio: '16/9', border: 'none'}} src={url} allowFullScreen={true}></iframe>
    </div>
  )
}