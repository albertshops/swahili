import { useEffect, useState } from "react"

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const pronouns = {
  I: "mimi",
  you: "wewe",
  it: "yeye",
  we: "sisi",
  they: "wao",
  "you all": "ninyi",
} as const

const subjectPrefixes = {
  positive: {
    I: "ni",
    you: "u",
    it: "a",
    we: "tu",
    they: "wa",
    "you all": "m",
  },
  negative: {
    I: "si",
    you: "hu",
    it: "ha",
    we: "hatu",
    they: "hawa",
    "you all": "ham",
  },
}

const tenses = {
  present: {
    positive: "na",
    negative: "",
  },
  past: {
    positive: "li",
    negative: "ku",
  },
  future: {
    positive: "ta",
    negative: "ta",
  },
  perfect: {
    positive: "me",
    negative: "ja",
  },
} as const

const verbs = {
  eat: "kula",
  cook: "pika",
  read: "soma",
  love: "penda",
  go: "enda",
  see: "ona",
  sing: "imba",
  play: "cheza",
  "come from": "toka",
}

type Pronoun = keyof typeof pronouns
type Polarity = "positive" | "negative"
type Tense = keyof typeof tenses
type Verb = keyof typeof verbs
type Sentence = {
  pronoun: Pronoun
  polarity: Polarity
  tense: Tense
  verb: Verb
}

function App() {
  const [sentence, setSentence] = useState<Sentence>()
  const [showAnswer, setShowAnswer] = useState(false)

  const next = () => {
    setSentence({
      pronoun: getRandom(Object.keys(pronouns) as Pronoun[]),
      polarity: getRandom(["positive", "negative"]),
      tense: getRandom(Object.keys(tenses) as Tense[]),
      verb: getRandom(Object.keys(verbs) as Verb[]),
    })

    setShowAnswer(false)
  }

  useEffect(() => {
    next()
  }, [])

  if (!sentence) return <></>

  const { pronoun, polarity, tense, verb } = sentence
  const english = `(${polarity}) ${pronoun} ${verb} (${tense})`

  let swahiliVerb = verbs[verb]
  if (
    swahiliVerb.endsWith("a") &&
    tense === "present" &&
    polarity === "negative"
  )
    swahiliVerb = swahiliVerb.slice(0, -1) + "i"
  const swahili = `${pronouns[pronoun]} ${subjectPrefixes[polarity][pronoun]}${tenses[tense][polarity]}${swahiliVerb}`

  return (
    <div className="h-full w-full flex justify-between items-center flex-col gap-4 text-lg p-8">
      <div />
      <div className="flex flex-col gap-2 items-center">
        <div className="">{english}</div>
        <div>{showAnswer ? swahili : "-"}</div>
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
