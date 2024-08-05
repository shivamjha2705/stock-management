import { Icons } from '@/components/icons';

export interface IAuthContext {
  login: (data: any) => Promise<void>;
  isAuth: boolean;
  loading: boolean;
  user: any;
  logout: () => void
  // other properties...
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons; // Ensure the icon is of the correct type
  label?: string;
  description?: string;

  subItems?: {
    title: string;
    href?: string;
    icon?: keyof typeof Icons;
    label?: string;
  }[]; // Corrected type for subItems
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
