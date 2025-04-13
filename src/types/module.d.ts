declare module '@components/*';
declare module '@services/*';
declare module '@utils/*';
declare module '@styles/*';
declare module '@config/*';

// Declare types for React Native to resolve TypeScript errors
declare module 'react-native' {
  export interface ViewStyle {
    [key: string]: any;
  }
  
  export interface TextStyle {
    [key: string]: any;
  }
  
  export interface ImageStyle {
    [key: string]: any;
  }

  export type StyleProp<T> = T | Array<StyleProp<T>> | null | undefined;
  
  export interface StyleSheet {
    create<T extends { [key: string]: any }>(styles: T): T;
    compose<T>(style1: StyleProp<T>, style2: StyleProp<T>): StyleProp<T>;
    flatten<T>(style?: StyleProp<T>): T;
    absoluteFill: any;
    absoluteFillObject: any;
    hairlineWidth: number;
  }
  
  export const StyleSheet: StyleSheet;
  
  export class View extends React.Component<any, any> {}
  export class Text extends React.Component<any, any> {}
  export class TouchableOpacity extends React.Component<any, any> {}
  export class TextInput extends React.Component<any, any> {}
  export class ScrollView extends React.Component<any, any> {}
  export class ActivityIndicator extends React.Component<any, any> {}
  export class Image extends React.Component<any, any> {}
  export class Alert {
    static alert(title: string, message?: string, buttons?: Array<any>, options?: any): void;
  }
  
  export const Platform: {
    OS: 'ios' | 'android' | 'web';
    Version: number | string;
    isPad: boolean;
    isTV: boolean;
    isTesting: boolean;
    select<T>(specifics: { ios?: T; android?: T; native?: T; default?: T; }): T;
  };
}

// React Native Safe Area Context
declare module 'react-native-safe-area-context' {
  import React from 'react';
  
  export interface SafeAreaViewProps {
    children?: React.ReactNode;
    style?: any;
  }
  
  export class SafeAreaProvider extends React.Component<{
    children: React.ReactNode;
    initialMetrics?: any;
  }> {}
  
  export function useSafeAreaInsets(): {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  
  export class SafeAreaView extends React.Component<SafeAreaViewProps> {}
}

// Maps
declare module 'react-native-maps' {
  import React from 'react';
  export const PROVIDER_GOOGLE: string;
  export class Marker extends React.Component<any> {}
  export default class MapView extends React.Component<any> {}
}

// Fix for any other module issues
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
