# ER-Profile

> 이터널 리턴 전적 검색 사이트

### [방문🔗](https://er-profile.vercel.app/)

## 프로젝트 설명
배틀로얄 게임 [이터널리턴🔗](https://playeternalreturn.com/main?hl=ko-KR)의 공식 api를 활용한 전적 검색 사이트의 프론트엔드입니다.

각 시즌별, 모드별 간단한 데이터를 조회할수 있으며 최근 90일의 상세한 경기 정보를 제공합니다.

[ER-API](https://github.com/JH-YUN/er-api) 프로젝트와 통신하여 작동합니다.

## ENV 설정
```bash
# 이터널 리턴 공식 API 주소
API_URL=https://open-api.bser.io
# 이터널 리턴 공식 API KEY
API_KEY=[YOUR_API_KEY]
# ER-Profile(현재 프로젝트) 주소
NEXT_PUBLIC_SERVER=http://localhost:3000
# ER-API 프로젝트 주소
NEXT_PUBLIC_ER_API_URL=https://localhost:3030
```
## 사용 기술
- Next.js
- TypeScript
- TailwindCSS
- TanStack Query

## 배포환경
- Vercel