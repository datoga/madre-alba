export default function AtrapaIngredientes({ onWin, onFail }) {
  return <div><button onClick={onWin}>WIN</button><button onClick={onFail}>FAIL</button></div>
}
