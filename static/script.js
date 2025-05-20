// Variables globales
let conversationId = 'default';
let isWaitingForResponse = false;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Vérifier que les éléments existent
    if (!chatContainer || !userInput || !sendButton) {
        console.error('Un ou plusieurs éléments DOM sont manquants.');
        return;
    }

    // Fonction pour ajouter un message à l'interface
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Si c'est un message de l'IA, on traite le markdown
        if (!isUser) {
            const formattedContent = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Gras
                .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italique
                .replace(/\n\n/g, '<br><br>') // Sauts de ligne
                .replace(/\n/g, '<br>'); // Sauts de ligne simples
            
            messageContent.innerHTML = `<div class="markdown-content">${formattedContent}</div>`;
        } else {
            messageContent.textContent = content;
        }
        
        messageDiv.appendChild(messageContent);
        
        // Ajouter l'heure du message
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        const now = new Date();
        timeDiv.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        messageDiv.appendChild(timeDiv);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll vers le bas
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Fonction pour afficher l'indicateur de frappe
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';
        
        const indicatorContent = document.createElement('div');
        indicatorContent.className = 'typing-indicator';
        indicatorContent.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(indicatorContent);
        chatContainer.appendChild(typingDiv);
        
        // Scroll vers le bas
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Fonction pour supprimer l'indicateur de frappe
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Fonction pour envoyer un message à l'API
    async function sendMessage(message) {
        if (!message.trim() || isWaitingForResponse) return;
        
        // Ajouter le message de l'utilisateur à l'interface
        addMessage(message, true);
        
        // Réinitialiser l'input
        userInput.value = '';
        userInput.style.height = '50px';
        
        // Afficher l'indicateur de frappe
        isWaitingForResponse = true;
        showTypingIndicator();
        
        try {
            // Appel à l'API avec URL explicite
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: message,
                    conversation_id: conversationId
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Mettre à jour l'ID de conversation
            conversationId = data.conversation_id;
            
            // Supprimer l'indicateur de frappe
            removeTypingIndicator();
            
            // Ajouter la réponse de l'IA
            addMessage(data.response);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            removeTypingIndicator();
            
            // Message d'erreur plus spécifique
            if (error.toString().includes('429') || error.toString().includes('quota')) {
                addMessage('Désolé, la limite de requêtes à l\'API Gemini a été atteinte. Veuillez réessayer dans quelques minutes.');
            } else {
                addMessage('Désolé, une erreur s\'est produite lors de la communication avec le serveur. Veuillez réessayer.');
            }
        } finally {
            isWaitingForResponse = false;
        }
    }

    // Événement pour envoyer un message
    sendButton.addEventListener('click', () => {
        sendMessage(userInput.value);
    });

    // Envoyer le message avec la touche Entrée (mais Shift+Entrée pour nouvelle ligne)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(userInput.value);
        }
    });

    // Ajuster automatiquement la hauteur du textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = '50px';
        userInput.style.height = (userInput.scrollHeight > 150 ? 150 : userInput.scrollHeight) + 'px';
    });
});