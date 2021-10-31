export enum possibleUserStatus {
  created,
  active,
  deleted,
}

export enum JwtErrorMessage {
  expired = 'jwt expired'
}

export enum PostgresErrorCode {
  UniqueViolation = '23505',
}
