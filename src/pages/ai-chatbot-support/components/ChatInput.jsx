import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-border bg-input px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gentle-transition"
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        
        {message?.trim() && (
          <div className="absolute right-2 bottom-2">
            <Button
              type="submit"
              size="icon"
              disabled={disabled || !message?.trim()}
              iconName="Send"
              className="h-8 w-8 rounded-full"
            />
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          iconName="Paperclip"
          className="rounded-full"
        />
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          iconName="Mic"
          className="rounded-full"
        />
      </div>
    </form>
  );
};

export default ChatInput;