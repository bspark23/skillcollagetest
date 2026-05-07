import { ApiService } from './api.service';
import { Content } from "@/models/content";

export class ContentService {
  // --- Content Methods ---
  static async getContent(): Promise<Content> {
    return ApiService.request<Content>("/content");
  }

  static async getSiteContent(): Promise<Content['siteContent']> {
    return ApiService.request<Content['siteContent']>("/content/site-content");
  }
  
  static async getSystemSettings(): Promise<Content['systemSettings']> {
    return ApiService.request<Content['systemSettings']>("/content/system-settings");
  }

  static async updateContent(data: Partial<Content>): Promise<Content> {
    return ApiService.request<Content>("/content", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}
