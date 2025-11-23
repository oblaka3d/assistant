import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { MessageList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

interface Message {
  id: string;
  position: 'left' | 'right';
  type: 'text';
  text: string;
  date: Date;
}

interface ChatScreenProps {
  onClose: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      position: 'left',
      type: 'text',
      text: 'Привет! Я ваш голосовой ассистент. Чем могу помочь?',
      date: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messageListRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Прокрутка к последнему сообщению
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    // Альтернативный способ через ref библиотеки, если доступен
    if (messageListRef.current && typeof messageListRef.current.scrollToBottom === 'function') {
      messageListRef.current.scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      position: 'right',
      type: 'text',
      text: inputValue,
      date: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Отправить запрос ассистенту
    if (window.api) {
      try {
        const response = await window.api.getAssistantResponse(inputValue);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          position: 'left',
          type: 'text',
          text: response.text || 'Извините, не удалось получить ответ.',
          date: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Failed to get assistant response:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          position: 'left',
          type: 'text',
          text: 'Произошла ошибка при обработке запроса.',
          date: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Заголовок */}
      <AppBar position="static" sx={{ backgroundColor: '#2d2d2d' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            История диалогов
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Список сообщений */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              История пуста
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Начните диалог с ассистентом
            </Typography>
          </Box>
        ) : (
          <Box
            ref={scrollContainerRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
            }}
          >
            <MessageList
              referance={messageListRef}
              className="message-list"
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages.map((msg) => ({
                id: msg.id,
                position: msg.position,
                type: msg.type,
                text: msg.text,
                date: msg.date,
                title: msg.position === 'right' ? 'Вы' : 'Ассистент',
                titleColor: msg.position === 'right' ? '#4a90e2' : '#27ae60',
              }))}
            />
          </Box>
        )}
      </Box>

      {/* Поле ввода */}
      <Paper
        elevation={3}
        sx={{
          padding: 1,
          backgroundColor: '#2d2d2d',
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Введите сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                '& fieldset': {
                  borderColor: '#4a90e2',
                },
                '&:hover fieldset': {
                  borderColor: '#357abd',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4a90e2',
                },
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            sx={{
              backgroundColor: '#4a90e2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#357abd',
              },
              '&:disabled': {
                backgroundColor: '#2d2d2d',
                color: '#666666',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>

      <style>{`
        .message-list {
          background-color: transparent !important;
        }
        .rce-mlist {
          background-color: transparent !important;
        }
        .rce-container-mbox {
          background-color: rgba(45, 45, 45, 0.9) !important;
          backdrop-filter: blur(10px);
        }
        .rce-mbox {
          background-color: rgba(45, 45, 45, 0.9) !important;
        }
        .rce-mbox-right {
          background-color: rgba(74, 144, 226, 0.3) !important;
        }
        .rce-mbox-left {
          background-color: rgba(45, 45, 45, 0.9) !important;
        }
      `}</style>
    </Box>
  );
};

export default ChatScreen;

