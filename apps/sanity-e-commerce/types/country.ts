export interface Currency {
    name: string;
    symbol: string;
  }
  
  export interface CountryName {
    common: string;
    official: string;
  }
  
  export interface Country {
    cca2: string;
    name?: CountryName;
    currencies: Partial<Record<string, Currency>>;
    languages: Partial<Record<string, string>>;
    flag: string;
  }
  