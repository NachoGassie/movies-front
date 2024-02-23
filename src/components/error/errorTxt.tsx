
interface Props{
  msg: string;
}

export default function ErrorTxt({msg}: Props){
  return <p className="errorText red">{msg}</p>
}