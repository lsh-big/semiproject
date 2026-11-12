# ONFIT

### 나에게 맞는 스타일을 찾고, 코디부터 가격 정보와 가상 피팅까지 이어 주는 패션 큐레이션 서비스

ONFIT은 체형과 스타일 취향을 바탕으로 패션을 탐색하고, 코디와 아이템을 관리하며, 더 나은 구매 결정을 돕도록 만든 팀 프로젝트입니다. 아래 포트폴리오에서 화면과 제작 방식을 먼저 확인하고, 실제 서비스와 소스 코드도 둘러볼 수 있습니다.

<p align="center">
  <a href="https://lsh-big.github.io/semiproject/project-site/"><strong>프로젝트 포트폴리오 보기 ↗</strong></a>
  &nbsp;·&nbsp;
  <a href="https://onfit3.netlify.app/"><strong>ONFIT 서비스 체험 ↗</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/lsh-big/semiproject"><strong>소스 코드 ↗</strong></a>
</p>

<p align="center">
  <a href="https://github.com/lsh-big/semiproject/actions/workflows/github-pages.yml"><img src="https://github.com/lsh-big/semiproject/actions/workflows/github-pages.yml/badge.svg" alt="GitHub Pages 배포 상태" /></a>
</p>

---

## 프로젝트 포트폴리오

**먼저 볼 곳:** [ONFIT 화면·제작 포트폴리오](https://lsh-big.github.io/semiproject/project-site/)

페이지별 화면과 사용자 흐름, 주요 UI 구성, API·데이터 연결 방식, 기술 선택을 별도 웹사이트에 정리했습니다. 화면 설명을 읽은 뒤 링크를 눌러 ONFIT 앱도 확인할 수 있습니다.

| 포트폴리오 항목                                                                        | 살펴볼 내용                                                     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [전체 화면과 제작 과정](https://lsh-big.github.io/semiproject/project-site/)            | 서비스 소개, 주요 기능, 화면 안내, 아키텍처와 배포 방식         |
| [화면별 포트폴리오](https://lsh-big.github.io/semiproject/project-site/#screens)        | 홈, 스타일 프로필, 코디, 옷장, 가격, 피팅 화면과 각 화면의 목적 |
| [구현 방식과 기술 구성](https://lsh-big.github.io/semiproject/project-site/#process)    | 사용자 흐름 설계, 공통 UI, API 연결, 이미지 검색 파이프라인     |
| [ONFIT 앱](https://onfit3.netlify.app/)                                                 | 공개된 프론트엔드 데모                                          |
| [AI 패션 검색 구현 설명](https://lsh-big.github.io/semiproject/project-site/#ai-search) | 이미지 선택부터 segmentation·유사 상품·가상 착용 요청까지     |

### 화면에서 확인할 수 있는 기능

| 화면                     | 사용자 경험                                      | 데모                                                                                                             |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 홈·에디토리얼           | 서비스 소개와 주요 패션 콘텐츠 탐색              | [홈 열기](https://onfit3.netlify.app/#/home)                                                                      |
| 스타일 프로필            | 스타일·색상·핏 선호 설정                       | [스타일 설정 열기](https://onfit3.netlify.app/#/style)                                                            |
| 코디·시즌 룩북          | 추천 룩 탐색과 시즌별 필터                       | [코디 열기](https://onfit3.netlify.app/#/outfits) · [시즌 룩북 열기](https://onfit3.netlify.app/#/seasonal)       |
| 디지털 옷장              | 저장한 아이템과 코디 확인                        | [옷장 열기](https://onfit3.netlify.app/#/wardrobe)                                                                |
| 가격 비교·인사이트      | 상품별 가격 비교 및 가격 이력 확인               | [가격 비교 열기](https://onfit3.netlify.app/#/compare) · [가격 인사이트 열기](https://onfit3.netlify.app/#/price) |
| 3D 가상 피팅             | 체형 치수와 의류 조합을 아바타로 미리보기        | [피팅 화면 열기](https://onfit3.netlify.app/#/fitting)                                                            |
| 이미지 기반 AI 패션 검색 | 이미지에서 아이템을 선택해 유사 상품을 찾는 흐름 | [구현 설명](https://lsh-big.github.io/semiproject/project-site/#ai-search)                                        |

> 데모의 로그인·저장·가격 데이터·이미지 검색은 백엔드와 외부 연동 설정에 따라 동작 범위가 다를 수 있습니다. 일부 화면은 샘플 데이터를 사용하고, 3D 피팅 모델은 배포된 에셋 구성에 영향을 받습니다.

비로그인 사용자는 시즌 코디 상품을 브라우저에 찜할 수 있으며, 이 목록은 로그인 계정과 자동으로 동기화되지 않습니다. 가격 인사이트의 최근 1년(13개월) 차트는 찜할 때 저장된 가격을 기준으로 상품별 패턴을 생성한 시연용 데이터이며, 실제 가격 이력이나 계절별 변동을 나타내지 않습니다.

---

## 한눈에 보는 프로젝트

| 구분     | 내용                                                                            |
| -------- | ------------------------------------------------------------------------------- |
| 프로젝트 | ONFIT — 퍼스널 패션 큐레이션 웹 서비스                                         |
| 목적     | 스타일 탐색, 코디 관리, 가격 비교, 가상 피팅 경험을 하나의 서비스 흐름으로 연결 |
| 구성     | React 웹 프론트엔드, FastAPI 백엔드, 별도 AI 패션 검색 화면                     |
| 데이터   | SQLAlchemy 기반 관계형 데이터 모델, MySQL 호환 TiDB 연동                        |
| 배포     | GitHub Actions·Pages 정적 소개/프론트엔드 배포, Render 백엔드 구성             |

## 주요 사용자 흐름

```text
취향·체형 설정
      ↓
코디와 시즌 룩 탐색
      ↓
아이템 저장 · 디지털 옷장
      ↓
가격 비교 · 가격 흐름 확인
      ↓
3D 가상 피팅
```

이미지 기반 AI 검색은 별도 화면에서 사진 입력 → 관심 영역 선택 → 유사 상품 검색 → 가상 착용 요청 순서로 구성했습니다.

## 개인 기여

팀 프로젝트에서 **가격 흐름 화면과 시연 데이터 시각화**를 담당했습니다. 실제 가격 이력 연동이 없는 환경에서도 사용자가 기능 구성을 이해할 수 있도록 찜 상품 기준의 예시 그래프와 월별 기록 화면을 구현했습니다.

## 기술 구성

| 영역             | 기술                                 | 담당 역할                               |
| ---------------- | ------------------------------------ | --------------------------------------- |
| 웹 프론트엔드    | React, Vite, Tailwind CSS            | 서비스 화면, 사용자 입력과 인터랙션     |
| 3D 그래픽        | Three.js, React Three Fiber          | 브라우저 기반 아바타·의류 모델 렌더링  |
| 백엔드 API       | Python, FastAPI, Pydantic            | 인증, 프로필, 상품·가격 및 피팅 API    |
| 데이터 계층      | SQLAlchemy, Alembic, TiDB/MySQL      | 데이터 모델, 저장 및 마이그레이션       |
| 이미지 검색 화면 | React, Canvas, FormData              | 이미지 입력·영역 선택 및 검색 API 요청 |
| 배포 자동화      | GitHub Actions, GitHub Pages, Render | 정적 사이트 배포 및 백엔드 서비스 구성  |

## 구현 포인트

- **페이지 구성:** URL hash 경로로 주요 ONFIT 화면을 전환해 정적 호스팅에서도 화면별 링크를 사용할 수 있게 했습니다.
- **기능 분리:** 재사용 가능한 UI 요소와 서비스/API 모듈을 나눠 화면 표현과 네트워크 요청의 책임을 분리했습니다.
- **데이터 상태:** 비동기 요청의 로딩·오류·완료 상태를 UI 흐름에 반영하고, 로그인 기반 기능은 세션 상태와 연결했습니다.
- **이미지 검색:** 선택한 이미지 영역을 segmentation 요청에 전달하고, crop 이미지로 유사 상품 및 가상 착용 요청을 이어가도록 구성했습니다.
- **반응형 UI:** 데스크톱과 모바일에서 화면 탐색과 주요 입력을 사용할 수 있도록 레이아웃을 구성했습니다.
- **자동 배포:** `main` 브랜치 변경 시 GitHub Actions가 GitHub Pages용 정적 산출물을 빌드·배포합니다.

## 로컬 실행

### 준비물

- Node.js와 npm
- Python 3.11 이상
- 백엔드 데이터 연동이 필요한 경우 TiDB/MySQL 접속 정보

### 설치 및 시작 (Windows PowerShell)

저장소 루트에서 실행합니다.

```powershell
npm ci --prefix frontend
npm ci --prefix ai-fashion
python -m venv backend/.venv
.\backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
}

.\Start-ONFIT.ps1
```

로컬 환경 변수는 `.env.example`을 참고해 설정하세요. 비밀번호, API 키 등 비밀 값은 저장소에 커밋하지 마세요.

| 서비스       | 로컬 주소                                                             |
| ------------ | --------------------------------------------------------------------- |
| ONFIT        | [http://127.0.0.1:5173/](http://127.0.0.1:5173/)                       |
| 3D 피팅      | [http://127.0.0.1:5173/#/fitting](http://127.0.0.1:5173/#/fitting)     |
| AI 패션 화면 | [http://127.0.0.1:5174/ai-fashion/](http://127.0.0.1:5174/ai-fashion/) |
| API 문서     | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)               |

## 저장소 구조

```text
.
├── project-site/       # ONFIT 웹 포트폴리오
├── frontend/           # 메인 React 앱과 3D 피팅
├── ai-fashion/         # 이미지 기반 AI 패션 검색 UI
├── backend/            # FastAPI API와 서비스
├── database/           # 데이터베이스 스키마·시드 자료
├── assets/             # 3D 모델과 서비스 에셋
├── scripts/            # 통합 빌드 스크립트
└── .github/workflows/  # GitHub Pages 자동 배포
```

## 팀

| 담당   | 주요 영역                                     |
| ------ | --------------------------------------------- |
| 이승호 | 가격 흐름 화면과 시연 데이터 시각화            |
| 송성근 | 회원·프로필, 개인 맞춤 코디, 인바디, 3D 피팅 |
| 황상옥 | 공통 웹 화면과 사용자 인터페이스 |
| 안종범 | 상품 크롤링, 동일 상품 매칭, 가격 비교 |

## 링크

- **포트폴리오:** [ONFIT 프로젝트 웹사이트](https://lsh-big.github.io/semiproject/project-site/)
- **서비스 데모:** [ONFIT 열기](https://onfit3.netlify.app/)
- **소스 코드:** [GitHub 저장소](https://github.com/lsh-big/semiproject)
- **배포 상태:** [GitHub Actions](https://github.com/lsh-big/semiproject/actions/workflows/github-pages.yml)
