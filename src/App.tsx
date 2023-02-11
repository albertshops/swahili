import { useEffect, useState } from "react"

const pronouns = [
  ["mimi ni", "I"],
  ["wewe u", "you"],
  ["yeye a", "he/she/it"],
  ["sisi tu", "we"],
  ["wao wa", "they"],
  ["ninyi m", "you (plural)"],
]

const tenses = [
  ["na", "present"],
  ["li", "past"],
  ["ta", "future"],
  ["me", "perfect"],
]

const verbs = [
  ["kula", "eat"],
  ["pika", "cook"],
  ["kula", "eat"],
  ["soma", "read"],
  ["penda", "love"],
  ["enda", "go"],
  ["toka", "leave"],
  ["ona", "see"],
]

function App() {
  const [sentence, setSentence] = useState([0, 0, 0])
  const [showAnswer, setShowAnswer] = useState(false)

  const pronoun = pronouns[sentence[0]]
  const tense = tenses[sentence[1]]
  const verb = verbs[sentence[2]]

  const s = sentence[0] == 2 ? "s" : ""
  const e = (s && sentence[2]) == 5 ? "e" : ""
  const english = `${pronoun[1]} ${verb[1]}${e}${s} (${tense[1]})`
  const swalihi = `${pronoun[0]}${tense[0]} ${verb[0]}`

  const next = () => {
    setSentence([
      Math.floor(Math.random() * pronouns.length),
      Math.floor(Math.random() * tenses.length),
      Math.floor(Math.random() * verbs.length),
    ])
    setShowAnswer(false)
  }

  useEffect(() => {
    next()
  }, [])

  return (
    <div className="h-full w-full flex justify-between items-center flex-col gap-4 text-lg p-8">
      <div />
      <div className="flex flex-col gap-2 items-center">
        <div className="">{english}</div>
        <div>{showAnswer ? swalihi : "-"}</div>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => setShowAnswer(true)}>answer</Button>
        <Button onClick={next}>next</Button>
      </div>
    </div>
  )
}

type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}
function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="border bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default App
