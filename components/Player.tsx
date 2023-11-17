interface playerProps {
  channelName: string
}

export default function Player(props: playerProps) {
  const url = `https://player.twitch.tv/?channel=${props.channelName}&parent=localhost`
  return (
    <div style={{border: "solid 1px red"}}>
      <iframe src={url} allowFullScreen={true}></iframe>
    </div>
  )
}