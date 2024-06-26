import Currencies from '@tf2autobot/tf2-currencies';

export interface PricerOptions {
    pricerUrl?: string;
    pricerApiToken?: string;
}

/**
 * Basic pricer interface
 *
 * Those wishing to plug in something other than PricesTf should provide at least
 * the following interface plus a "pricer" module with the following method to get the constructor:
 * static getPricer(options: PricerOptions): Pricer
 */
export default interface IPricer {
    getOptions(): PricerOptions;

    requestCheck(sku: string): Promise<RequestCheckResponse>;

    getPrice(sku: string): Promise<GetItemPriceResponse>;

    getPriceHistory?(sku: string): Promise<GetPriceHistoryResponse>;

    getPricelist(): Promise<GetPricelistResponse>;

    get isPricerConnecting(): boolean;

    connect(enabled: boolean): void;

    shutdown(enabled: boolean): void;

    init(enabled: boolean): void;

    bindHandlePriceEvent(onPriceChange: (item: GetItemPriceResponse) => void): void;
}

export type RequestCheckFn = (sku: string) => Promise<RequestCheckResponse>;
export type GetPrice = (sku: string) => Promise<GetItemPriceResponse>;

export interface GetPricelistResponse {
    currency?: string | null;
    items?: Item[];
}

export interface Item {
    sku: string;
    source: string;
    time: number;
    buy: Currencies | null;
    sell: Currencies | null;
}

export interface Links {
    ptf: string;
    mptf: string;
    scm: string;
    bptf: string;
}

export interface GetItemPriceResponse {
    sku?: string;
    currency?: string;
    source?: string;
    time?: number;
    buy?: Currencies;
    sell?: Currencies;
    message?: string;
}

export interface GetPriceHistoryResponse {
    priceHistory: PriceHistoryEntry[];
}

export interface PriceHistoryEntry {
    id: number;
    sku: string;
    buy_keys: number;
    buy_metal: number;
    sell_keys: number;
    sell_metal: number;
    timestamp: string;
}

export interface Sale {
    id: string;
    steamid: string;
    automatic: boolean;
    attributes: any;
    intent: number;
    currencies: Currencies;
    time: number;
}

export interface RequestCheckResponse {
    sku: string;
    name?: string;
}
