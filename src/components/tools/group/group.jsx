import { useState, useId } from 'react'
import { SettingGenerate } from './settingsGenerate/settingGenerate'
import { Generate } from './generate/generate'

function Group({ dataClasse }) {
  const [Gpvalue, setGpValue] = useState(0)
  const [Elvalue, setElvalue] = useState(0)
  const [method, setMethod] = useState('')
  const [isGenerate, setIsGenerate] = useState(false)
  const componentId = useId()
  const [eleves, setEleves] = useState(
    (dataClasse?.eleves || []).map((eleve) => ({
      ...eleve,
      uniqueId: `${componentId}-${eleve.id}`,
    }))
  )

  const handleIsChecked = (uniqueId) => {
    setEleves((prev) =>
      prev.map((el) =>
        el.uniqueId === uniqueId ? { ...el, checked: !el.checked } : el
      )
    )
  }

  const handleIsGenerate = (methodParam) => {
    if (methodParam) {
      setMethod(methodParam)
    }
    setIsGenerate(!isGenerate)
  }

  const increment = (e) => {
    if (e.currentTarget.id === 'gp') {
      setGpValue((prev) => prev + 1)
    } else if (e.currentTarget.id === 'el') {
      setElvalue((prev) => prev + 1)
    }
  }

  const decrement = (e) => {
    if (e.currentTarget.id === 'gp') {
      setGpValue((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.currentTarget.id === 'el') {
      setElvalue((prev) => (prev > 0 ? prev - 1 : 0))
    }
  }

  return (
    <>
      {isGenerate ? (
        <Generate
          eleves={eleves.filter((el) => el.checked)}
          Elvalue={Elvalue}
          Gpvalue={Gpvalue}
          method={method}
          handleIsGenerate={handleIsGenerate}
        />
      ) : (
        <SettingGenerate
          eleves={eleves}
          Gpvalue={Gpvalue}
          Elvalue={Elvalue}
          increment={increment}
          decrement={decrement}
          handleIsChecked={handleIsChecked}
          handleIsGenerate={handleIsGenerate}
        />
      )}
    </>
  )
}

export default Group
