import { ApiService } from './api.service';
import { Subscriber } from '@/models/subscriber';

export type SubscriberInput = Pick<Subscriber, 'name' | 'email' | 'type'> & {
  phone?: string;
  metadata?: { message?: string };
};

export class SubscriberService {
  static async subscribe(data: SubscriberInput): Promise<Subscriber> {
    return ApiService.request<Subscriber>('/subscriber', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
