import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  Divider,
  Fab,
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectDialog, setDialogPanelOpen } from '../../../../store/slices/chatSlice';
import { createDialogOnServer, deleteDialogOnServer } from '../../../../store/thunks/chatThunks';

import styles from './DialogPanel.module.css';

const DialogPanel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { dialogs, currentDialogId, dialogPanelOpen } = useAppSelector((state) => state.chat);

  const handleClose = () => {
    dispatch(setDialogPanelOpen(false));
  };

  const handleSelectDialog = (dialogId: string) => {
    dispatch(selectDialog(dialogId));
    handleClose();
  };

  const handleCreateDialog = async () => {
    const dialogId = Date.now().toString();
    try {
      await dispatch(createDialogOnServer({ dialogId, title: 'Новый диалог' })).unwrap();
      dispatch(selectDialog(dialogId));
    } catch (error) {
      console.error('Failed to create dialog:', error);
    }
  };

  const handleDeleteDialog = async (e: React.MouseEvent, dialogId: string) => {
    e.stopPropagation();
    try {
      await dispatch(deleteDialogOnServer(dialogId)).unwrap();
    } catch (error) {
      console.error('Failed to delete dialog:', error);
    }
  };

  const getDialogPreview = (dialog: { messages: Array<{ text?: string }> }) => {
    const lastMessage = dialog.messages[dialog.messages.length - 1];
    return lastMessage?.text?.substring(0, 50) || t('chat.empty');
  };

  return (
    <Drawer
      anchor="left"
      open={dialogPanelOpen}
      onClose={handleClose}
      classes={{ paper: styles.drawer }}
      PaperProps={{
        sx: {
          zIndex: 10001, // Выше, чем StatusBar (z-index: 10000)
        },
      }}
      ModalProps={{
        sx: {
          zIndex: 10001, // Также для overlay
        },
      }}
    >
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.title} sx={{ color: 'text.primary' }}>
          {t('chat.dialogs')}
        </Typography>
        <IconButton onClick={handleClose} size="small" className={styles.closeButton}>
          ×
        </IconButton>
      </Toolbar>
      <Divider />
      <Box className={styles.listContainer}>
        <List className={styles.list}>
          {dialogs.map((dialog) => (
            <ListItem
              key={dialog.id}
              disablePadding
              className={currentDialogId === dialog.id ? styles.activeItem : ''}
            >
              <ListItemButton
                onClick={() => handleSelectDialog(dialog.id)}
                className={styles.listItemButton}
              >
                <Box className={styles.dialogContent}>
                  <Box className={styles.dialogHeader}>
                    <Typography variant="subtitle1" className={styles.dialogTitle}>
                      {dialog.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleDeleteDialog(e, dialog.id)}
                      className={styles.deleteButton}
                      disabled={dialogs.length === 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" className={styles.dialogPreview}>
                    {getDialogPreview(dialog)}
                  </Typography>
                  <Typography variant="caption" className={styles.dialogDate}>
                    {format(dialog.updatedAt, 'dd.MM.yyyy HH:mm')}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={styles.fabContainer}>
        <Fab
          color="primary"
          size="medium"
          onClick={handleCreateDialog}
          className={styles.addButton}
          aria-label={t('chat.newDialog')}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Drawer>
  );
};

export default DialogPanel;
