export enum ApplicationType {
    EMPLOYMENT = 'employment', // наем на работу
    CONTACT_REQUEST = 'contact_request', // Связаться с водителем
    STATUS_UPGRADE = 'status_upgrade', // Повышение статуса
    SUPPORT = 'support', // Техподдержка
    OTHER = 'other' // Другое
}

export const APPLICATION_TYPES = Object.values(ApplicationType)

export enum ApplicationStatus {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three'
}

export const APPLICATION_STATUSES = Object.values(ApplicationStatus)

export enum DriverStatus {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three'
}

export const DRIVER_STATUSES = Object.values(DriverStatus)
