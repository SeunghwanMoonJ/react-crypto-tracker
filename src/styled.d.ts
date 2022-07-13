import "styled-components";

// 스타일 컴포넌트의 테마 정의를 확장
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}