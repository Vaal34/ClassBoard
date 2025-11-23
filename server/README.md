# 🏫 ClassBoard Server - Architecture Modulaire

## 📁 Structure du Projet

```
server/
├── server.js                 # Point d'entrée principal
├── routes/
│   ├── index.js             # Regroupement de toutes les routes
│   ├── classes.js           # Routes pour les classes
│   └── eleves.js            # Routes pour les élèves
└── controllers/
    ├── classController.js   # Logique métier pour les classes
    └── eleveController.js   # Logique métier pour les élèves
```

## 🚀 Démarrage

```bash
cd server
npm start
# ou
node server.js
```

## 📋 API Endpoints

### Classes

- `GET /api/classes` - Récupérer toutes les classes
- `GET /api/classes/:path` - Récupérer une classe par son path
- `POST /api/classes` - Créer une nouvelle classe
- `DELETE /api/classes` - Supprimer une classe

### Élèves

- `GET /api/eleves` - Récupérer tous les élèves
- `POST /api/eleves/classes/:path` - Créer un élève dans une classe
- `PUT /api/eleves/:id` - Mettre à jour un élève
- `DELETE /api/eleves` - Supprimer plusieurs élèves

### Santé

- `GET /health` - Vérifier l'état du serveur

## ✨ Avantages de cette Architecture

1. **Modularité** - Chaque fichier a une responsabilité claire
2. **Maintenabilité** - Plus facile de modifier une partie spécifique
3. **Collaboration** - Plusieurs développeurs peuvent travailler sur différents fichiers
4. **Réutilisabilité** - Les contrôleurs peuvent être réutilisés
5. **Tests** - Plus facile de tester chaque module séparément
6. **Gestion d'erreurs** - Centralisée et cohérente
7. **Documentation** - Code auto-documenté avec des commentaires clairs

## 🔧 Améliorations Apportées

- ✅ Séparation claire des responsabilités
- ✅ Gestion d'erreurs améliorée avec codes HTTP appropriés
- ✅ Validation des données d'entrée
- ✅ Messages d'erreur en français
- ✅ Route de santé pour le monitoring
- ✅ Gestion des erreurs 404
- ✅ Code plus lisible et maintenable
