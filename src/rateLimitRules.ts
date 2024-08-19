import { NotificationType } from './notificationTypes';

export type RateLimitRules = {
    [key in NotificationType]: { limit: number; duration: number };
};

export const rateLimitRules: RateLimitRules = {
    [NotificationType.STATUS]: { limit: 2, duration: 60 * 1000 }, // 2 per minute
    [NotificationType.NEWS]: { limit: 1, duration: 24 * 60 * 60 * 1000 }, // 1 per day
    [NotificationType.MARKETING]: { limit: 3, duration: 60 * 60 * 1000 }, // 3 per hour
};
