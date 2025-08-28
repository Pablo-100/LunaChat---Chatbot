# 🌙 LunaChat - Chatbot Conversationnel avec Gemini API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green)](https://flask.palletsprojects.com/)
[![Gemini API](https://img.shields.io/badge/Gemini%20API-2.0-purple)](https://ai.google.dev/)

![LunaChat Screenshot](https://raw.githubusercontent.com/Pablo-100/LunaChat---Chatbot/master/static/Capture%20d'écran%202025-05-20%20210704.png)

## 📝 Description

LunaChat est une application de chat conversationnel qui utilise l'API Google Gemini pour fournir des réponses intelligentes aux questions des utilisateurs. Grâce à son interface intuitive et élégante, LunaChat permet une communication naturelle avec un assistant IA puissant.

Le projet utilise Flask pour le backend, Vanilla JS pour le frontend, et intègre LangChain pour une gestion optimisée des prompts et du contexte conversationnel.

## ✨ Fonctionnalités

- 💬 Interface de chat intuitive et réactive
- 🧠 Historique des conversations pour un contexte préservé
- 🔄 Indicateur de frappe pendant le traitement des réponses
- ✏️ Support du formatage Markdown basique pour une meilleure lisibilité
- 🚀 Intégration avec le modèle Gemini 2.0 Flash de Google
- ⚡ Ajustement automatique de la zone de saisie
- 🛡️ Gestion robuste des erreurs API

## 🛠️ Technologies utilisées

### Backend
- Python 3.8+
- Flask (Framework web)
- Google Generative AI API
- LangChain (Framework d'orchestration LLM)

### Frontend
- HTML5 / CSS3
- JavaScript (Vanilla)
- Fetch API pour les requêtes asynchrones

## 🚀 Installation et démarrage

### Prérequis
- Python 3.8 ou supérieur
- Compte Google Cloud Platform avec API Gemini activée
- Clé API Gemini

### Étapes d'installation

1. **Cloner le dépôt ou télécharger les fichiers**
   ```bash
   git clone https://github.com/votre-username/lunachat.git
   cd lunachat
   ```
   ou téléchargez et extrayez le projet dans un dossier local

2. **Créer et activer un environnement virtuel** (optionnel mais recommandé)
   ```bash
   python -m venv venv
   
   # Sur Windows
   venv\Scripts\activate
   
   # Sur macOS/Linux
   source venv/bin/activate
   ```

3. **Installer les dépendances**
   ```bash
   pip install --upgrade langchain langchain-community langchain-google-genai google-generativeai flask flask-cors -q
   ```

4. **Configurer la clé API**
   
   Modifiez directement la variable dans le fichier api.py :
   ```python
   os.environ["GEMINI_API_KEY"] = "votre_clé_api_ici"
   ```
   
   Ou pour une meilleure pratique (optionnel), créez un fichier `.env` et modifiez api.py pour l'utiliser :
   ```
   GEMINI_API_KEY=votre_clé_api_ici
   ```

5. **Lancer l'application**
   ```bash
   python api.py
   ```

6. **Accéder à l'application**
   
   Ouvrez votre navigateur et accédez à `http://localhost:5000`

## 📋 Utilisation

1. Accédez à l'interface web via votre navigateur
2. Tapez votre question ou requête dans la zone de texte
3. Appuyez sur la touche Entrée ou cliquez sur le bouton d'envoi
4. Attendez la réponse de l'IA (un indicateur de frappe s'affichera)
5. Continuez la conversation avec un contexte préservé

## 🧩 Structure du projet

```
lunachat/
├── api.py                # Backend Flask et intégration Gemini
├── static/
│   ├── styles.css        # Styles CSS de l'application
│   └── script.js         # Logique JavaScript frontend
└── templates/
    └── index.html        # Structure HTML de l'application
```

## 📝 TODO / Améliorations futures

- [ ] Ajouter une persistance des données avec base de données
- [ ] Implémenter l'authentification utilisateur
- [ ] Améliorer le formatage Markdown avec support de code, listes, etc.
- [ ] Ajouter un thème sombre/clair
- [ ] Développer des tests unitaires et d'intégration
- [ ] Ajouter la possibilité d'exporter les conversations
- [ ] Optimiser pour les appareils mobiles
- [ ] Implémenter un système de retour utilisateur sur la qualité des réponses

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteurs

- **TBINI Mustapha Amin** - *Développement initial* - ING-3-J-G

## 🙏 Remerciements

- Google pour l'accès à l'API Gemini
- L'équipe LangChain pour leur framework d'orchestration LLM
```bash
!pip install --upgrade langchain langchain-community langchain-google-genai google-generativeai -q
```
- Tous les contributeurs et testeurs du projet

---

*Développé avec ❤️ par TBINI*
