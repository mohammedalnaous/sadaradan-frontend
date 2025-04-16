export enum SubscriptionCode {
    FREE = 'FREE',
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
    SINGLE = 'SINGLE',
  }
  
  export interface PlanResponse {
    code: SubscriptionCode;
    price: number;
  }
  
  export interface UpdatePriceDto {
    code: SubscriptionCode;
    newPrice: number;
  }
  