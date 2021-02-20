export enum Types {
  INCOMME = "INCOMME",
  OUTCOME = "OUTCOME"
}

export type Transaction = {
  id: string
  user_id: string
  value: number
  type: Types
  description: string
  created_at: Date
}

export type inputTransaction = {
  user_id: string
  value: number
  type: Types
  description: string
}