# 1. 프로젝트명: 나만의 내배캠 장터 백엔드 서버 만들기

## 2. 기술 스택

1.  **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2.  **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다.
3.  **모듈 시스템**: **ESM(ES6 모듈 시스템)**을 사용합니다.
4.  **데이터베이스**: Cloud 서비스인 [[**MongoDB Atlas**](https://www.mongodb.com/products/platform/cloud)]에서 대여해 사용합니다.
5.  **ODM**: [[**mongoose ODM**](https://mongoosejs.com/docs/guide.html)]을 사용합니다.

## 설계

- API 명세서작성.

| 분류 | 설명                                  | Method | URL             | 작성 | 구현 |
| ---- | ------------------------------------- | ------ | --------------- | ---- | ---- |
|      | [공통 명세 사항](#공통-명세-사항)     |        |                 |      |      |
| 상품 | [상품 생성(C)](#상품-생성c)           | POST   | /products       | [x]  | [x]  |
| 상품 | [상품 목록 조회(R)](#상품-목록-조회r) | GET    | /products       | [x]  | [x]  |
| 상품 | [상품 상세 조회(R)](#상품-상세-조회r) | GET    | /products/:\_id | [x]  | [x]  |
| 상품 | [상품 수정(U)](#상품-수정u)           | PATCH  | /products/:\_id | [x]  | [x]  |
| 상품 | [상품 삭제(D)](#상품-삭제d)           | DELETE | /products/:\_id | [x]  | [x]  |

## 개발 (준비)

1. `README.md`
2. `.env`
3. `.gitignore`
4. `.prettierrc`

## 개발 (필수)

- [x] 상품 생성 API를 구현했나요?
- [x] 상품 목록 조회 API를 구현했나요?
- [x] 상품 상세 조회 API를 구현했나요?
- [x] 상품 수정 API를 구현했나요?
- [x] 상품 삭제 API를 구현했나요?

## 테스트

- [x] 구현 된 모든 API를 Insomnia를 이용해서 테스트 했나요?

## 배포

- [x] AWS EC2에 프로젝트를 배포했나요?
- [x] 터미널을 빠져 나와서 서버가 계속 실행될 수 있게 PM2로 실행했나요?
- [x] IP 또는 도메인으로 접속 했을 때 정상 동작하나요?

## 더 고민해 보기

- [x] 모든 질문에 답변을 작성했나요?

---

## 공통 명세 사항

<details>
<summary>설치 방법 자세히 보기</summary>

### 정의

| 이름    | 타입   | 설명                 |
| ------- | ------ | -------------------- |
| status  | number | HTTP Status Code     |
| message | string | API 호출 성공 메시지 |
| data    | Object | API 호출 결과 데이터 |

</details>

## 상품 생성(C)

asdfasdfasdfasdfasdfasdf

## 상품 목록 조회(R)

asd2f13asd2f1a3s2df

## 상품 상세 조회(R)

1a2sd1f3a2sd1f32as1df32

## 상품 수정(U)

a1sd23f1a3sdf13a2sd1f3a

## 상품 삭제(D)

a1sd23fa1sd32f1as3df1
