import "./App.css"
import { Exchanger } from "./features/exchanger/Exchanger"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Exchanger />
      </QueryClientProvider>
    </div>
  )
}

export default App
