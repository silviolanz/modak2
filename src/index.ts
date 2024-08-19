import { sendNotification } from './rateLimitedNotificationService';
import { NotificationType } from './notificationTypes';
import { gateway, userNotificationMap } from './rateLimitedNotificationService';

// Example usage
sendNotification(NotificationType.STATUS, "user1", "Status update 1", gateway, userNotificationMap);
sendNotification(NotificationType.STATUS, "user1", "Status update 2", gateway, userNotificationMap);
sendNotification(NotificationType.STATUS, "user1", "Status update 3", gateway, userNotificationMap); // Should be rate-limited

sendNotification(NotificationType.NEWS, "user1", "Daily news", gateway, userNotificationMap);
sendNotification(NotificationType.NEWS, "user1", "Another news", gateway, userNotificationMap); // Should be rate-limited

sendNotification(NotificationType.MARKETING, "user1", "Marketing email 1", gateway, userNotificationMap);
sendNotification(NotificationType.MARKETING, "user1", "Marketing email 2", gateway, userNotificationMap);
sendNotification(NotificationType.MARKETING, "user1", "Marketing email 3", gateway, userNotificationMap);
sendNotification(NotificationType.MARKETING, "user1", "Marketing email 4", gateway, userNotificationMap); // Should be rate-limited
