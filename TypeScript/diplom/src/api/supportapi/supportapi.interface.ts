export interface SupportParams {
  text: string;
}

export interface WebSocketParams {
  ChatId: string;
  UserId: string;
}

export interface MarkAsReadParams {
  createdBefore: string;
}

export interface SupportQueryParams {
  offset?: number;
  limit?: number;
  isActive?: boolean;
}
