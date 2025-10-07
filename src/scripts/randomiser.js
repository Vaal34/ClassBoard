export function grouperAleatoireParNEleves(listeEleves, tailleGroupe) {
  const listeMelangee = listeEleves.sort(() => Math.random() - 0.5)
  const groupes = []
  let groupeCourant = []

  for (let i = 0; i < listeMelangee.length; i++) {
    groupeCourant.push(listeMelangee[i])

    if (groupeCourant.length === tailleGroupe) {
      groupes.push(groupeCourant)
      groupeCourant = []
    }
  }

  if (groupeCourant.length > 0) {
    groupes.push(groupeCourant)
  }

  return groupes
}

export function grouperAleatoireParNGroupes(listeEleves, nombreGroupes) {
  const listeMelangee = listeEleves.sort(() => Math.random() - 0.5)
  const groupes = []

  if (nombreGroupes <= 1 || nombreGroupes === undefined) {
    return [listeMelangee]
  }

  for (let i = 0; i < nombreGroupes; i++) {
    groupes.push([])
  }

  let indexGroupe = 0

  for (let i = 0; i < listeMelangee.length; i++) {
    groupes[indexGroupe].push(listeMelangee[i])
    indexGroupe++
    if (indexGroupe >= groupes.length) {
      indexGroupe = 0
    }
  }

  return groupes
}
