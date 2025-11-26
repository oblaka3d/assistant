import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { useAppSelector } from '../store/hooks';
import { Message, MessageImage } from '../store/slices/chatSlice';

import styles from './MessageRenderer.module.css';

interface MessageRendererProps {
  message: Message;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
  const { theme, accentColorLight, accentColorDark } = useAppSelector((state) => state.settings);

  const effectiveTheme =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const isDarkTheme = effectiveTheme === 'dark';
  const accentColor = isDarkTheme ? accentColorDark : accentColorLight;

  const containerStyle = useMemo(
    () =>
      ({
        '--accent-color': accentColor,
      }) as React.CSSProperties,
    [accentColor]
  );

  const handleCopy = useCallback((value?: string) => {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(value).catch(() => void 0);
  }, []);

  const renderCopyButton = (value?: string, label = 'Скопировать') => {
    if (!value) return null;
    return (
      <Tooltip title={label} enterDelay={400}>
        <IconButton
          size="small"
          className={styles.copyButton}
          aria-label={label}
          onClick={(event) => {
            event.stopPropagation();
            handleCopy(value);
          }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    );
  };

  // Обработка обычного текста
  if (message.type === 'text' || !message.text) {
    return (
      <Box className={`${styles.messageRenderer} ${styles.textWrapper}`} style={containerStyle}>
        {renderCopyButton(message.text)}
        <Typography variant="body1" className={styles.textMessage}>
          {message.text || ''}
        </Typography>
      </Box>
    );
  }

  // Обработка изображений
  if (message.type === 'image' && message.images && message.images.length > 0) {
    return (
      <Box className={`${styles.messageRenderer} ${styles.imageMessage}`} style={containerStyle}>
        {renderCopyButton(message.text || message.images[0]?.url)}
        <Box className={styles.imageContainer}>
          {message.images.map((image: MessageImage, index: number) => (
            <Box key={index} className={styles.imageWrapper}>
              <img
                src={image.url}
                alt={image.alt || 'Изображение'}
                className={styles.messageImage}
                style={{
                  maxWidth: image.width || '100%',
                  maxHeight: image.height || '400px',
                }}
                loading="lazy"
              />
              {image.alt && (
                <Typography variant="caption" className={styles.imageCaption}>
                  {image.alt}
                </Typography>
              )}
            </Box>
          ))}
          {message.text && (
            <Typography variant="body2" className={styles.imageText}>
              {message.text}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // Обработка markdown
  if (message.type === 'markdown') {
    return (
      <Box
        className={`${styles.markdownContainer} ${styles.messageRenderer}`}
        style={containerStyle}
      >
        {renderCopyButton(message.text)}
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            code({ inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const snippet = String(children).replace(/\n$/, '');

              return !inline && language ? (
                <Paper elevation={0} className={styles.codeBlock}>
                  <Box className={styles.codeBlockHeader}>
                    <Typography variant="caption" className={styles.codeLanguage}>
                      {language}
                    </Typography>
                    <IconButton
                      size="small"
                      className={styles.codeCopyButton}
                      aria-label="Скопировать код"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCopy(snippet);
                      }}
                    >
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                  <SyntaxHighlighter
                    style={isDarkTheme ? oneDark : oneLight}
                    language={language}
                    PreTag="div"
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                      margin: 0,
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}
                    {...props}
                  >
                    {snippet}
                  </SyntaxHighlighter>
                </Paper>
              ) : (
                <code className={styles.inlineCode} {...props}>
                  {children}
                </code>
              );
            },
            p({ children }) {
              return (
                <Typography variant="body1" className={styles.paragraph}>
                  {children}
                </Typography>
              );
            },
            h1({ children }) {
              return (
                <Typography variant="h4" className={styles.heading1}>
                  {children}
                </Typography>
              );
            },
            h2({ children }) {
              return (
                <Typography variant="h5" className={styles.heading2}>
                  {children}
                </Typography>
              );
            },
            h3({ children }) {
              return (
                <Typography variant="h6" className={styles.heading3}>
                  {children}
                </Typography>
              );
            },
            h4({ children }) {
              return (
                <Typography variant="h6" className={styles.heading4}>
                  {children}
                </Typography>
              );
            },
            h5({ children }) {
              return (
                <Typography variant="h6" className={styles.heading5}>
                  {children}
                </Typography>
              );
            },
            h6({ children }) {
              return (
                <Typography variant="h6" className={styles.heading6}>
                  {children}
                </Typography>
              );
            },
            ul({ children }) {
              return <ul className={styles.unorderedList}>{children}</ul>;
            },
            ol({ children }) {
              return <ol className={styles.orderedList}>{children}</ol>;
            },
            li({ children }) {
              return <li className={styles.listItem}>{children}</li>;
            },
            blockquote({ children }) {
              return (
                <Box className={styles.blockquote}>
                  <Typography variant="body2">{children}</Typography>
                </Box>
              );
            },
            table({ children }) {
              return (
                <Box className={styles.tableContainer}>
                  <table className={styles.table}>{children}</table>
                </Box>
              );
            },
            thead({ children }) {
              return <thead className={styles.tableHead}>{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className={styles.tableBody}>{children}</tbody>;
            },
            tr({ children }) {
              return <tr className={styles.tableRow}>{children}</tr>;
            },
            th({ children }) {
              return <th className={styles.tableHeader}>{children}</th>;
            },
            td({ children }) {
              return <td className={styles.tableCell}>{children}</td>;
            },
            img({ src, alt, title }: ImageProps) {
              return (
                <Box className={styles.markdownImageWrapper}>
                  <img
                    src={src}
                    alt={alt}
                    title={title}
                    className={styles.markdownImage}
                    loading="lazy"
                  />
                  {alt && (
                    <Typography variant="caption" className={styles.imageCaption}>
                      {alt}
                    </Typography>
                  )}
                </Box>
              );
            },
            a({ href, children }) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {children}
                </a>
              );
            },
            strong({ children }) {
              return <strong className={styles.bold}>{children}</strong>;
            },
            em({ children }) {
              return <em className={styles.italic}>{children}</em>;
            },
            del({ children }) {
              return <del className={styles.strikethrough}>{children}</del>;
            },
          }}
        >
          {message.text}
        </ReactMarkdown>
      </Box>
    );
  }

  // Fallback для неизвестных типов
  return (
    <Typography variant="body1" className={styles.textMessage}>
      {message.text || 'Неподдерживаемый тип сообщения'}
    </Typography>
  );
};

export default MessageRenderer;
