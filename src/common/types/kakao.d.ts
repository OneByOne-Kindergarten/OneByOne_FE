declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    addControl(
      control: MapTypeControl | ZoomControl,
      position: ControlPosition
    ): void;
  }

  function load(callback: () => void): void;

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class LatLng {
    constructor(latitude: number, longitude: number);
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  namespace services {
    class Places {
      keywordSearch(
        keyword: string,
        callback: (result: PlaceSearchResult[], status: string) => void,
        options?: PlaceSearchOptions
      ): void;
    }

    interface PlaceSearchResult {
      place_name: string;
      address_name: string;
      x: string;
      y: string;
    }

    interface PlaceSearchOptions {
      page?: number;
      size?: number;
      sort?: string;
    }
  }

  enum ControlPosition {
    TOP = 1,
    TOPLEFT = 2,
    TOPRIGHT = 3,
    LEFT = 4,
    RIGHT = 5,
    BOTTOMLEFT = 6,
    BOTTOM = 7,
    BOTTOMRIGHT = 8,
  }

  class MapTypeControl {
    constructor();
  }

  class ZoomControl {
    constructor();
  }
}

export {};
