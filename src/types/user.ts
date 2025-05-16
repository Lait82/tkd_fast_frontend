export interface User {
  firstname: string
  lastname: string
  email: string
  id_number: string
  phone: string
  rank: string
  school: string
  federation: string
  dob: string
  uuid: string
  created_at: string
  updated_at: string
}

export interface SignupData {
  firstname: string
  lastname: string
  email: string
  phone: string
  rank: string
  school: string
  id_number: string
  password: string
  password_confirmation: string
  asociation: string
  federation: string
  dob: string
  invite_token?: string
}

export interface LoginData {
  email: string
  password: string
}
