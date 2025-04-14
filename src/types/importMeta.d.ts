interface ImportMeta {
    glob: (path: string, options?: { eager?: boolean }) => Record<string, { default: any }>;
  }
  