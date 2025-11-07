// Shared types for Navbar components

export type IconName =
  | 'BookOpen'
  | 'Twitter'
  | 'MessageSquare'
  | 'Calculator'
  | 'Code'
  | 'Terminal'
  | 'Youtube'
  | 'Instagram';

export interface NavItem {
  href: string;
  label: string;
  iconName: IconName;
}

export interface SocialLink {
  href: string;
  label: string;
  iconName: IconName;
}
