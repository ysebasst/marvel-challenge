type Item = {
  resourceURI: string;
  name: string;
  type: string;
};

type Url = {
  type: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  };
  urls: Url[];
};

export type Data = {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Character[];
};
