export interface IEventBus {
  publish(eventType: string, data: any): Promise<void>;
  subscribe(eventType: string, handler: (data: any) => void): Promise<void>;
}
