import { Counter } from "./features/counter/Counter"
import "./App.css"
import { Exchanger } from "./features/exchanger/Exchanger"

function App() {
  return (
    <div className="App">
      <Exchanger />
      <Counter />
    </div>
  )
}

export default App
