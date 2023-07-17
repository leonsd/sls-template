export interface ICacheClient {
  connect: () => Promise<void>;
  close: () => Promise<string>;
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<string | null>;
  incrementBy: (key: string, value?: number) => Promise<number>;
}
