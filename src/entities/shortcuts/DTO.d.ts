export interface ShortcutList {
  shortcuts: Shortcut[];
}

export interface Shortcut {
  name: string;
  iconName: string;
  link: string;
}

export interface UpdateShortcutsRequest {
  shortcuts: Shortcut[];
}

export interface UpdateShortcutsResponse {
  success: boolean;
  message: string;
}
