import { NotificationType } from './notificationTypes';
import { RateLimitRules, rateLimitRules } from './rateLimitRules';
import { UserNotificationRecord, createUserNotificationRecord } from './userNotificationRecord';

export type Gateway = (userId: string, message: string) => void;

export const gateway: Gateway = (userId, message) => {
    console.log(`Sending message to user ${userId}: ${message}`);
};

export type UserNotificationMap = Map<string, Map<NotificationType, UserNotificationRecord>>;

export const userNotificationMap: UserNotificationMap = new Map();

export const sendNotification = (
    type: NotificationType,
    userId: string,
    message: string,
    gateway: Gateway,
    userNotificationMap: UserNotificationMap
): void => {
    if (canSendNotification(userId, type, userNotificationMap)) {
        gateway(userId, message);
        recordNotification(userId, type, userNotificationMap);
    } else {
        console.log(`Rate limit exceeded for ${userId} on ${type}`);
    }
};

const canSendNotification = (
    userId: string,
    type: NotificationType,
    userNotificationMap: UserNotificationMap
): boolean => {
    const userRecords = userNotificationMap.get(userId) || new Map();
    const record = userRecords.get(type) || createUserNotificationRecord();

    const now = new Date();
    const timeDiff = now.getTime() - record.lastSentTime.getTime();
    const rule = rateLimitRules[type];

    if (timeDiff >= rule.duration) {
        return true;
    }

    return record.count < rule.limit;
};

const recordNotification = (
    userId: string,
    type: NotificationType,
    userNotificationMap: UserNotificationMap
): void => {
    const userRecords = userNotificationMap.get(userId) || new Map();
    const record = userRecords.get(type) || createUserNotificationRecord();

    const now = new Date();
    const timeDiff = now.getTime() - record.lastSentTime.getTime();
    const rule = rateLimitRules[type];

    if (timeDiff >= rule.duration) {
        record.count = 1; // Reset count
    } else {
        record.count++;
    }

    record.lastSentTime = now;
    userRecords.set(type, record);
    userNotificationMap.set(userId, userRecords);
};
