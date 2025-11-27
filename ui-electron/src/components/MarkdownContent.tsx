import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { LanguageFn } from 'react-syntax-highlighter';
import shell from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import type { Message } from '../store/slices/chatSlice';

import styles from './MessageRenderer.module.css';

const LANGUAGES: Array<[string, LanguageFn]> = [
  ['tsx', tsx],
  ['typescript', typescript],
  ['javascript', javascript],
  ['json', json],
  ['yaml', yaml],
  ['python', python],
  ['shell', shell],
  ['bash', shell],
  ['markup', markup],
  ['go', go],
  ['java', java],
];

LANGUAGES.forEach(([name, language]) => {
  SyntaxHighlighter.registerLanguage(name, language);
});

interface MarkdownContentProps {
  message: Message;
  isDarkTheme: boolean;
  onCopy: (value?: string) => void;
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

const MarkdownContent: React.FC<MarkdownContentProps> = ({ message, isDarkTheme, onCopy }) => {
  if (!message.text) {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        code({ inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          const snippet = String(children).replace(/\n$/, '');

          if (!inline && language) {
            return (
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
                      onCopy(snippet);
                    }}
                  >
                    <ContentCopyIcon fontSize="inherit" />
                  </IconButton>
                </Box>
                <SyntaxHighlighter
                  style={isDarkTheme ? oneDark : oneLight}
                  language={language}
                  PreTag="div"
                  showLineNumbers
                  wrapLines
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
            );
          }

          return (
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
  );
};

export default MarkdownContent;
