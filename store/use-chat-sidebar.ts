import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}
interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (varaint: ChatVariant) => void;
}

export const useChatSideBar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  variant: ChatVariant.CHAT,
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));
