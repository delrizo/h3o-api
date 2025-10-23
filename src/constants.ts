export enum ApplicationType {
    EMPLOYMENT = 'employment', // наем на работу
    CONTACT_REQUEST = 'contact_request', // Связаться с водителем
    STATUS_UPGRADE = 'status_upgrade', // Повышение статуса
    SUPPORT = 'support', // Техподдержка
    OTHER = 'other' // Другое
}

export const APPLICATION_TYPES = Object.values(ApplicationType)

export enum ApplicationTypeWithAll {
    ALL = 'all',
    EMPLOYMENT = 'employment',
    CONTACT_REQUEST = 'contact_request',
    STATUS_UPGRADE = 'status_upgrade',
    SUPPORT = 'support',
    OTHER = 'other'
}

export const APPLICATION_TYPES_WITH_ALL = Object.values(ApplicationTypeWithAll)

/**
 * Статусы жизненного цикла заявки
 * @enum {string}
 * @property {string} PENDING - Заявка создана и ожидает начала обработки
 * @property {string} IN_PROGRESS - Заявка находится в процессе рассмотрения
 * @property {string} APPROVED - Заявка успешно одобрена
 * @property {string} REJECTED - Заявка отклонена по каким-либо причинам
 * @property {string} ARCHIVED - Заявка перемещена в архив для хранения
 */
export enum ApplicationStatus {
    /** Ожидает рассмотрения */
    PENDING = 'pending',
    /** В работе */
    IN_PROGRESS = 'in_progress',
    /** Одобрена */
    APPROVED = 'approved',
    /** Отклонена */
    REJECTED = 'rejected',
    /** В архиве */
    ARCHIVED = 'archived'
}

export const APPLICATION_STATUSES = Object.values(ApplicationStatus)

export enum DriverStatus {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three'
}

export const DRIVER_STATUSES = Object.values(DriverStatus)
