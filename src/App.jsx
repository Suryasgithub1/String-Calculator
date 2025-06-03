import './App.css'
import Calculator from './components/Caluclator'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 sm:py-12 lg:py-24">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          String Calculator
        </h1>
      </header>
      <main className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
       <Calculator />
      </main>
    </div>
    </>
  )
}

export default App
