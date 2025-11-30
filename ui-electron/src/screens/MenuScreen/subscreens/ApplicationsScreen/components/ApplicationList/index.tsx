import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import {
  ApplicationSummary,
  ApplicationStatus,
  ApplicationType,
} from '../../../../../../utils/api';
import styles from '../../ApplicationsScreen.module.css';

type ApplicationListProps = {
  type: 'store' | 'installed';
  applications: ApplicationSummary[];
  loading: boolean;
  isAuthenticated: boolean;
  emptyLabel: string;
  loginRequiredLabel: string;
  onInstall: (key: string) => void;
  onRemove: (key: string) => void;
  onSubmitForReview: (key: string) => void;
  onEdit: (app: ApplicationSummary) => void;
  pendingAppKey: string | null;
  statusUpdateKey: string | null;
  installedKeys: Set<string>;
  currentUserId?: string;
  renderDescription: (app: ApplicationSummary) => React.ReactNode;
  renderStatusChip: (status: ApplicationStatus) => React.ReactNode;
  ownerLabel: (ownerId?: string) => string | null;
  actionLabels: {
    install: string;
    installing: string;
    installed: string;
    remove: string;
    submitReview: string;
    resubmitReview: string;
    edit: string;
  };
  typeColorMap: Record<ApplicationType, string>;
};

const ApplicationList: React.FC<ApplicationListProps> = ({
  type,
  applications,
  loading,
  isAuthenticated,
  emptyLabel,
  loginRequiredLabel,
  onInstall,
  onRemove,
  onSubmitForReview,
  onEdit,
  pendingAppKey,
  statusUpdateKey,
  installedKeys,
  currentUserId,
  renderDescription,
  renderStatusChip,
  ownerLabel,
  actionLabels,
  typeColorMap,
}) => {
  if (type === 'installed' && !isAuthenticated) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="body2">{loginRequiredLabel}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className={styles.loadingState}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (applications.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <Typography variant="body2">{emptyLabel}</Typography>
      </Box>
    );
  }

  return (
    <List className={styles.list} data-testid={`applications-list-${type}`}>
      {applications.map((app) => {
        const isOwner = Boolean(currentUserId && app.owner === currentUserId);
        const canSubmit =
          type === 'installed' && isOwner && (app.status === 'draft' || app.status === 'rejected');
        const isPending = pendingAppKey === app.key;
        const isUpdatingStatus = statusUpdateKey === app.key;
        const owner = ownerLabel(app.owner);

        return (
          <ListItem key={`${type}-${app.id}`} divider alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={app.icon ?? undefined}
                sx={{
                  bgcolor: app.icon ? 'transparent' : (typeColorMap[app.type] ?? 'primary.main'),
                  fontWeight: 600,
                }}
              >
                {!app.icon && app.type.slice(0, 1).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Box className={styles.listItemHeader}>
                  <Typography variant="subtitle1" component="span">
                    {app.name}
                  </Typography>
                  {renderStatusChip(app.status)}
                </Box>
              }
              secondary={
                <Box className={styles.listItemMeta}>
                  {renderDescription(app)}
                  {owner && (
                    <Typography variant="body2" className={styles.ownerLabel}>
                      {owner}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Box className={styles.actionButtons}>
                {type === 'installed' && (
                  <>
                    {canSubmit && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onSubmitForReview(app.key)}
                        disabled={isUpdatingStatus}
                      >
                        {isUpdatingStatus ? (
                          <CircularProgress size={16} />
                        ) : app.status === 'draft' ? (
                          actionLabels.submitReview
                        ) : (
                          actionLabels.resubmitReview
                        )}
                      </Button>
                    )}
                    {isOwner && (
                      <Button variant="text" size="small" onClick={() => onEdit(app)}>
                        {actionLabels.edit}
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => onRemove(app.key)}
                      disabled={isPending}
                    >
                      {isPending ? <CircularProgress size={16} /> : actionLabels.remove}
                    </Button>
                  </>
                )}
                {type === 'store' && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onInstall(app.key)}
                    disabled={!isAuthenticated || isPending || installedKeys.has(app.key)}
                  >
                    {installedKeys.has(app.key)
                      ? actionLabels.installed
                      : isPending
                        ? actionLabels.installing
                        : actionLabels.install}
                  </Button>
                )}
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ApplicationList;
