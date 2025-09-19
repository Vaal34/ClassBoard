const Data219 = [
  { id: 1, prenom: "Théo", nom: "Dupont", checked: true },
  { id: 2, prenom: "Sonia", nom: "Martin", checked: true },
  { id: 3, prenom: "Billy", nom: "Lemoine", checked: true },
  { id: 4, prenom: "Kamel", nom: "Benali", checked: true },
  { id: 5, prenom: "Amine", nom: "Zouari", checked: true },
  { id: 6, prenom: "Camille", nom: "Durand", checked: true },
  { id: 7, prenom: "Pierre-Alexis", nom: "Leroy", checked: true },
  { id: 8, prenom: "William", nom: "Dupont", checked: true },
];

const Data220 = [
  { id: 1, prenom: "Adil", nom: "Khan", checked: true },
  { id: 2, prenom: "Canna", nom: "Smith", checked: true },
  { id: 3, prenom: "Caliste", nom: "Johnson", checked: true },
  { id: 4, prenom: "Vladimir", nom: "Putin", checked: true },
  { id: 5, prenom: "Corentin", nom: "Houssein", checked: true },
  { id: 6, prenom: "Samira", nom: "Benzema", checked: true },
  { id: 7, prenom: "Seraphine", nom: "Williams", checked: true },
];

const Data1STI = [
  { id: 1, prenom: "Lina", nom: "Muller", checked: true },
  { id: 2, prenom: "Youssef", nom: "El Amrani", checked: true },
  { id: 3, prenom: "Chloé", nom: "Morel", checked: true },
  { id: 4, prenom: "Lucas", nom: "Garcia", checked: true },
  { id: 5, prenom: "Eva", nom: "Roux", checked: true },
  { id: 6, prenom: "Hugo", nom: "Fernandez", checked: true },
  { id: 7, prenom: "Léa", nom: "Garnier", checked: true },
];

const Data2ndSTIA = [
  { id: 1, prenom: "Alice", nom: "Dubois", checked: true },
  { id: 2, prenom: "Mohamed", nom: "Bennani", checked: true },
  { id: 3, prenom: "Julien", nom: "Lefevre", checked: true },
  { id: 4, prenom: "Sarah", nom: "Moreau", checked: true },
  { id: 5, prenom: "Maxime", nom: "Mercier", checked: true },
  { id: 6, prenom: "Emma", nom: "Faure", checked: true },
  { id: 7, prenom: "Antoine", nom: "Chevalier", checked: true },
];

const DataTleB = [
  { id: 1, prenom: "Lucas", nom: "Garnier", checked: true },
  { id: 2, prenom: "Inès", nom: "Lemoine", checked: true },
  { id: 3, prenom: "Thomas", nom: "Rousseau", checked: true },
  { id: 4, prenom: "Camille", nom: "Blanc", checked: true },
  { id: 5, prenom: "Mathis", nom: "Guerin", checked: true },
  { id: 6, prenom: "Léa", nom: "Moulin", checked: true },
  { id: 7, prenom: "Nicolas", nom: "Henry", checked: true },
];

const DataTleG = [
  { id: 1, prenom: "Clara", nom: "Brun", checked: true },
  { id: 2, prenom: "Jules", nom: "Garnier", checked: true },
  { id: 3, prenom: "Manon", nom: "Garcia", checked: true },
  { id: 4, prenom: "Louis", nom: "Chevalier", checked: true },
  { id: 5, prenom: "Zoé", nom: "Lemoine", checked: true },
  { id: 6, prenom: "Gabriel", nom: "Roux", checked: true },
  { id: 7, prenom: "Léna", nom: "Faure", checked: true },
];

const DataSpeAMC = [
  { id: 1, prenom: "Eva", nom: "Morel", checked: true },
  { id: 2, prenom: "Mathis", nom: "Fernandez", checked: true },
  { id: 3, prenom: "Lina", nom: "Dupont", checked: true },
  { id: 4, prenom: "Hugo", nom: "Garcia", checked: true },
  { id: 5, prenom: "Chloé", nom: "Lemoine", checked: true },
  { id: 6, prenom: "Youssef", nom: "Roux", checked: true },
  { id: 7, prenom: "Lucas", nom: "Morel", checked: true },
];

export const listClasses = {
  "219": { id: 1, name: "Seconde 219", path: "219", data: Data219 },
  "220": { id: 2, name: "Seconde 220", path: "220", data: Data220 },
  "1STI": { id: 3, name: "Première STI2D", path: "1STI", data: Data1STI },
  "TleSTI": { id: 4, name: "Terminale STI2D", path: "TleSTI", data: Data2ndSTIA },
  "TleB": { id: 5, name: "Terminale B", path: "TleB", data: DataTleB },
  TleG: { id: 6, name: "Terminale G", path: "TleG", data: DataTleG },
  SpeAMC: { id: 7, name: "Spécialité AMC", path: "SpeAMC", data: DataSpeAMC },
};
