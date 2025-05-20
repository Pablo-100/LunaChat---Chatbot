import os
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permet les requêtes cross-origin

# Configuration de l'API
# Remplacez par une clé API valide obtenue depuis Google Cloud Console
os.environ["GEMINI_API_KEY"] = "AIzaSyAD-mHgk7uJQy3hK641mNiRIv7iKUDUmtM"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Initialisation du modèle
# Essai avec gemini-2.0-flash, un modèle plus récent
try:
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=os.getenv("GEMINI_API_KEY"))
    # Test initial pour vérifier si le modèle est accessible
    test_response = llm.invoke("Test de connexion")
    print("Connexion au modèle Gemini réussie:", test_response.content)
except Exception as e:
    print(f"Erreur lors de l'initialisation du modèle: {str(e)}")

# Template du prompt
prompt = PromptTemplate(
    input_variables=["history", "question"],
    template="Historique de la conversation :\n{history}\n\nUtilisateur : {question}\n\nAssistant :"
)

# Pipeline LangChain
chain = prompt | llm

# Stockage des conversations
conversations = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question', '')
    conversation_id = data.get('conversation_id', 'default')
    
    if conversation_id not in conversations:
        conversations[conversation_id] = []
    
    history = conversations[conversation_id]
    
    try:
        history_text = "\n".join([f"Utilisateur : {q}\nAssistant : {r}" for q, r in history])
        response = chain.invoke({"history": history_text, "question": question})
        history.append((question, response.content))
        conversations[conversation_id] = history
        formatted_history = [(q, r) for q, r in history]
        print(f"Réponse générée pour la question '{question}': {response.content}")
        return jsonify({
            'response': response.content,
            'conversation_id': conversation_id,
            'history': formatted_history
        })
    except Exception as e:
        error_message = str(e)
        print(f"Erreur API détaillée pour la question '{question}': {error_message}")
        formatted_history = [(q, r) for q, r in history] if history else []
        
        if "429" in error_message or "quota" in error_message or "ResourceExhausted" in error_message:
            fallback_message = "Désolé, le service Gemini API est temporairement indisponible en raison de limites de quota. Veuillez réessayer plus tard."
        elif "401" in error_message or "unauthorized" in error_message.lower():
            fallback_message = "Erreur d'authentification : la clé API est invalide. Veuillez vérifier votre clé API."
        elif "model" in error_message.lower():
            fallback_message = "Aucun modèle Gemini n'est accessible (actuellement testé : gemini-2.0-flash). Vérifiez la disponibilité des modèles dans la documentation Google Generative AI ou contactez l'administrateur."
        else:
            fallback_message = f"Une erreur s'est produite lors du traitement de votre demande : {error_message}"
        
        history.append((question, fallback_message))
        conversations[conversation_id] = history
        return jsonify({
            'response': fallback_message,
            'conversation_id': conversation_id,
            'history': formatted_history
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)