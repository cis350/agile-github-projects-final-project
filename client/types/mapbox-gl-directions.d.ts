declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { LngLatLike, LngLatBoundsLike, EventData } from 'mapbox-gl';
  
    interface DirectionsOptions {
      accessToken: string;
      unit?: 'imperial' | 'metric';
      profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
      alternatives?: boolean;
      congestion?: boolean;
      controls?: {
        inputs?: boolean;
        instructions?: boolean;
        profileSwitcher?: boolean;
      };
      flyTo?: boolean;
      interactive?: boolean;
      placeholderOrigin?: string;
      placeholderDestination?: string;
      zoom?: number;
      styles?: object;
      geocoder?: object;
      directions?: object;
      fitBoundsOptions?: object;
      onLoad?: () => void;
      onRoute?: (e: any) => void;
    }
  
    export default class MapboxDirections {
      constructor(options: DirectionsOptions);
      setOrigin(origin: LngLatLike): void;
      setDestination(destination: LngLatLike): void;
      on(type: string, fn: (data: EventData) => void): void;
      off(type: string, fn: (data: EventData) => void): void;
      queryOrigin(input: string): void;
      queryDestination(input: string): void;
      addWaypoint(index: number, waypoint: LngLatLike): void;
      removeWaypoint(index: number): void;
      getWaypoints(): any;
      getOrigin(): any;
      getDestination(): any;
      getRoutes(): any;
      getRoute(index: number): any;
      setLanguage(language: string): void;
      fitBounds(bounds: LngLatBoundsLike, options?: any): void;
    }
  }
  