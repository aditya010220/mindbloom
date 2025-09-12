import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import QuickResponseChips from './components/QuickResponseChips';
import CrisisAlert from './components/CrisisAlert';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import WelcomeMessage from './components/WelcomeMessage';

const AIChatbotSupport = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock AI responses with mental health focus
  const aiResponses = {
    anxiety: [
      `I understand you're feeling anxious. That's a completely normal response to stress. Let's try a quick breathing exercise together:\n\n1. Breathe in slowly for 4 counts\n2. Hold for 4 counts\n3. Breathe out for 6 counts\n4. Repeat 3-5 times\n\nHow are you feeling right now? Can you tell me more about what's causing your anxiety?`,
      `Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Here are some grounding techniques that might help:\n\n• Name 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nThis 5-4-3-2-1 technique can help bring you back to the present moment.`
    ],
    stress: [
      `Academic stress is very common among students. You're not alone in feeling this way. Let's break this down:\n\n• What specific aspects are causing the most stress?\n• Are there any upcoming deadlines or exams?\n• How has this been affecting your sleep and daily routine?\n\nRemember, it's okay to ask for help and take breaks when needed.`,
      `Stress can feel like a heavy weight, but there are ways to manage it effectively. Consider these strategies:\n\n• Break large tasks into smaller, manageable steps\n• Use the Pomodoro Technique (25 min work, 5 min break)\n• Practice saying "no" to additional commitments\n• Schedule regular self-care activities\n\nWhat feels most overwhelming right now?`
    ],
    sleep: [
      `Sleep problems can significantly impact your mental health and academic performance. Let's explore some sleep hygiene tips:\n\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n• Keep your room cool and dark\n• Limit caffeine after 2 PM\n\nHow long have you been experiencing sleep difficulties?`,
      `Poor sleep and mental health often go hand in hand. Here are some gentle techniques to try tonight:\n\n• Progressive muscle relaxation\n• Guided meditation (try apps like Headspace)\n• Journaling to clear your mind\n• Reading something light and positive\n\nWhat time do you usually try to go to sleep?`
    ],
    relationships: [
      `Relationship challenges can be emotionally draining. It's important to remember that healthy relationships require communication, boundaries, and mutual respect.\n\n• Have you been able to express your feelings clearly?\n• Are you taking care of your own needs too?\n• What support system do you have outside this relationship?\n\nWould you like to talk about what's been happening?`,
      `Navigating relationships while managing your mental health can be complex. Some things to consider:\n\n• It's okay to set boundaries\n• You can't control others, only your responses\n• Healthy relationships should feel supportive, not draining\n• Professional counseling can provide valuable perspective\n\nWhat aspect of your relationships feels most challenging right now?`
    ],
    overwhelmed: [
      `Feeling overwhelmed is your mind's way of saying you need to slow down and prioritize. Let's work through this together:\n\n• What are the top 3 things on your mind right now?\n• Which of these can you control vs. can't control?\n• What's one small step you could take today?\n\nRemember: You don't have to handle everything at once. One step at a time is perfectly okay.`,
      `When everything feels like too much, it's time to practice radical self-compassion. You're doing the best you can with what you have right now.\n\n• Take 3 deep breaths with me\n• Acknowledge that this feeling is temporary\n• Focus on just the next hour, not the whole day\n• Consider what you'd tell a good friend in your situation\n\nWhat would feel most helpful right now?`
    ],
    coping: [
      `I'm glad you're actively seeking coping strategies. That shows real strength and self-awareness. Here are some evidence-based techniques:\n\n• Mindfulness meditation (even 5 minutes helps)\n• Physical exercise or movement\n• Creative expression (art, music, writing)\n• Connection with supportive people\n• Professional counseling\n\nWhich of these resonates most with you, or have you tried any before?`,
      `Building a toolkit of coping strategies is one of the best investments in your mental health. Consider these approaches:\n\n• Problem-focused coping (addressing the source)\n• Emotion-focused coping (managing your response)\n• Meaning-focused coping (finding purpose/growth)\n• Social coping (reaching out for support)\n\nWhat situations do you find most challenging to cope with?`
    ],
    crisis: [
      `I'm very concerned about what you've shared. Your safety is the most important thing right now. Please know that you're not alone and help is available immediately.\n\nI'm going to connect you with crisis resources right now. Please don't hesitate to reach out to:\n\n• National Crisis Hotline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nWould you like me to help you schedule an emergency counseling session?`
    ],
    default: [
      `Thank you for sharing that with me. I'm here to listen and support you. Mental health challenges are real and valid, and seeking help shows courage.\n\nCan you tell me more about how you've been feeling lately? I'm here to provide guidance and connect you with resources that might help.`,
      `I appreciate you opening up to me. Everyone's mental health journey is unique, and there's no "right" way to feel.\n\nWhat's been on your mind lately? Whether it's stress, anxiety, relationships, or just feeling overwhelmed, I'm here to help you work through it.`,
      `It sounds like you're going through something difficult. That takes strength to acknowledge and reach out for support.\n\nI'm here to listen without judgment and help you explore coping strategies. What feels most important to talk about right now?`
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const detectCrisisKeywords = (message) => {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself',
      'self harm', 'cutting', 'overdose', 'die', 'death', 'hopeless',
      'no point', 'give up', 'can\'t go on', 'want to disappear'
    ];
    
    const lowerMessage = message?.toLowerCase();
    return crisisKeywords?.some(keyword => lowerMessage?.includes(keyword));
  };

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (detectCrisisKeywords(userMessage)) {
      setShowCrisisAlert(true);
      return aiResponses?.crisis?.[0];
    }
    
    if (lowerMessage?.includes('anxious') || lowerMessage?.includes('anxiety') || lowerMessage?.includes('panic')) {
      return aiResponses?.anxiety?.[Math.floor(Math.random() * aiResponses?.anxiety?.length)];
    }
    
    if (lowerMessage?.includes('stress') || lowerMessage?.includes('academic') || lowerMessage?.includes('exam') || lowerMessage?.includes('deadline')) {
      return aiResponses?.stress?.[Math.floor(Math.random() * aiResponses?.stress?.length)];
    }
    
    if (lowerMessage?.includes('sleep') || lowerMessage?.includes('insomnia') || lowerMessage?.includes('tired') || lowerMessage?.includes('exhausted')) {
      return aiResponses?.sleep?.[Math.floor(Math.random() * aiResponses?.sleep?.length)];
    }
    
    if (lowerMessage?.includes('relationship') || lowerMessage?.includes('friend') || lowerMessage?.includes('family') || lowerMessage?.includes('partner')) {
      return aiResponses?.relationships?.[Math.floor(Math.random() * aiResponses?.relationships?.length)];
    }
    
    if (lowerMessage?.includes('overwhelmed') || lowerMessage?.includes('too much') || lowerMessage?.includes('can\'t handle')) {
      return aiResponses?.overwhelmed?.[Math.floor(Math.random() * aiResponses?.overwhelmed?.length)];
    }
    
    if (lowerMessage?.includes('coping') || lowerMessage?.includes('strategies') || lowerMessage?.includes('help me') || lowerMessage?.includes('what should i do')) {
      return aiResponses?.coping?.[Math.floor(Math.random() * aiResponses?.coping?.length)];
    }
    
    return aiResponses?.default?.[Math.floor(Math.random() * aiResponses?.default?.length)];
  };

  const handleSendMessage = (messageText) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  };

  const handleQuickResponse = (responseText) => {
    handleSendMessage(responseText);
  };

  const handleStartChat = () => {
    setHasStartedChat(true);
    const welcomeMessage = {
      id: Date.now(),
      text: `Hello! I'm your AI mental health assistant. I'm here to provide support, guidance, and resources whenever you need them.\n\nI can help with anxiety, stress, sleep issues, relationship concerns, and general mental wellness. Everything we discuss is confidential.\n\nHow are you feeling today? What would you like to talk about?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setHasStartedChat(false);
    setShowCrisisAlert(false);
  };

  return (
    <>
      <Helmet>
        <title>AI Chatbot Support - MindBloom</title>
        <meta name="description" content="Get instant mental health support and guidance through our AI-powered chatbot, available 24/7 for students." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header userRole="student" isAuthenticated={true} />
        
        <div className="pt-16 h-screen flex flex-col">
          {!hasStartedChat ? (
            <WelcomeMessage onStartChat={handleStartChat} />
          ) : (
            <>
              <ChatHeader 
                onClearChat={handleClearChat}
                onShowCrisisSupport={() => setShowCrisisAlert(true)}
              />
              
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20"
              >
                {messages?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={message?.text}
                    isUser={message?.isUser}
                    timestamp={message?.timestamp}
                  />
                ))}
                
                {isTyping && (
                  <ChatMessage 
                    message=""
                    isUser={false}
                    timestamp={new Date()}
                    isTyping={true} 
                  />
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t border-border bg-background/80 backdrop-blur-sm">
                {messages?.length === 0 && (
                  <div className="p-4">
                    <QuickResponseChips 
                      onChipClick={handleQuickResponse}
                      disabled={isTyping}
                    />
                  </div>
                )}
                
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isTyping}
                  placeholder={isTyping ? "AI is typing..." : "Share what's on your mind..."}
                />
              </div>
            </>
          )}
        </div>

        <CrisisAlert 
          isVisible={showCrisisAlert}
          onClose={() => setShowCrisisAlert(false)}
        />
      </div>
    </>
  );
};

export default AIChatbotSupport;