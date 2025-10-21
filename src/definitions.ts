export interface Category {
  name: string,
  description: string,
  requiredLevel: number,
  image: string
}

export enum ComponentIconPosition {
  Left,
  Right
}

export enum ButtonColor {
  Primary = 'primary',
  Light = 'light',
  Dark = 'dark',
  Yellow = 'yellow'
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum ButtonType {
  Default = 'default',
  Outlined = 'outlined'
}

export enum ButtonCorners {
  Default = 'corners-default',
  Rounded = 'corners-rounded'
}

export enum InputFieldColor {
  Primary = 'primary',
  Secondary = 'secondary'
}

export interface ComponentIcon {
  icon: string,
  position: ComponentIconPosition
}

export enum NavbarContentColor {
  Primary = "primary",
  Secondary = "secondary"
}

export interface NavbarContent {
  content: string,
  color: NavbarContentColor
}

export interface User {
  firstName: string,
  lastName: string,
  profileImg: string,
  online: boolean
}

export interface Room {
  name: string,
  rounds: number,
  roundDuration: number,
  category: Category,
  creator: User,
  pinCode: string,
  invitedUsers: User[]
}