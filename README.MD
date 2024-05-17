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

<summary></summary>
<details>

### 정의

| 이름    | 타입   | 설명                 |
| ------- | ------ | -------------------- |
| status  | number | HTTP Status Code     |
| message | string | API 호출 성공 메시지 |
| data    | Object | API 호출 결과 데이터 |

### 예시

```JSON
{
  "status": 201,
  "message": "상품 생성에 성공했습니다.",
  "data": {
    "_id": "6645ac72d19781e943f6d1b1",
	"id": 16,
	"name": "두근두근 자료구조",
	"description": "나의 심장은 멈췄다.",
	"manager": "이강산",
	"status": "FOR_SALE",
	"createdAt": "2024-05-16T06:49:22.038Z",
	"updateAt": "2024-05-16T06:49:22.038Z",
	"__v": 0
    },
}
```

### Failure

| 이름    | 타입   | 설명                 |
| ------- | ------ | -------------------- |
| status  | number | HTTP Status Code     |
| message | string | API 호출 실패 메세지 |

| status | message                         |
| ------ | ------------------------------- |
| 400    | 이미 등록된 상품명입니다.       |
| 401    | 비밀번호를 입력해주세요.        |
| 402    | 비밀번호가 일치하지 않습니다.   |
| 404    | 존재하지 않는 상품입니다.       |
| 500    | 서버에서 에러가 발생하였습니다. |

### 예시

```JSON
{
	"errorMessage": "존재하지 않는 상품입니다."
}
```

</details>

## 상품 생성(C)

<summary></summary>
<details>

### **Request** - Body

### 정의

| 이름        | 타입   | 필수 여부 | 설명      |
| ----------- | ------ | --------- | --------- |
| name        | string | Y         | 상품명    |
| description | string | N         | 상품 설명 |
| manager     | string | Y         | 담당자    |
| password    | string | Y         | 비밀번호  |

### 예시

```JSON
{
    "name" : "Insomnia",
    "description" : "를 이용해서 정보 넣어보자",
    "manager" : "이강산",
    "password" : "123456"
}
```

### **Responce** - Success

### 정의

| 이름        | 타입   | 설명       |
| ----------- | ------ | ---------- |
| \_id        | string | 상품 ID    |
| id          | number | 상품등록순 |
| name        | string | 상품명     |
| description | string | 상품 설명  |
| manager     | string | 담당자     |
| password    | string | 비밀번호   |
| status      | string | 상품 상태  |
| createdAt   | Date   | 생성 일시  |
| updatedAt   | Date   | 수정 일시  |

### 예시

```JSON
{
	"status": 201,
	"message": "상품 생성에 성공했습니다.",
	"data": {
		"id": 22,
		"name": "Insomnia",
		"description": "를 이용해서 정보 넣어보자",
		"manager": "이강산",
		"password": "123456",
		"status": "FOR_SALE",
		"createdAt": "2024-05-17T02:17:22.132Z",
		"updateAt": "2024-05-17T02:17:22.132Z",
		"_id": "6646be32432c8d3a456fc5e4",
		"__v": 0
	}
}
```

</details>

## 상품 목록 조회(R)

<summary></summary>
<details>

### -> Request

---

### <- Response

| 이름        | 타입   | 설명       |
| ----------- | ------ | ---------- |
| \_id        | string | 상품 ID    |
| id          | number | 상품등록순 |
| name        | string | 상품명     |
| description | string | 상품 설명  |
| manager     | string | 담당자     |
| status      | string | 상품 상태  |
| createdAt   | Date   | 생성 일시  |
| updatedAt   | Date   | 수정 일시  |

### 예시

```JSON
{
    "_id": "6646be32432c8d3a456fc5e4",
	"id": 22,
	"name": "insomnia2",
	"description": "정보넣기됬으니 수정해보자",
	"manager": "2강산",
	"status": "SOLD_OUT",
	"createdAt": "2024-05-17T02:17:22.132Z",
	"updateAt": "2024-05-17T02:18:19.380Z",
	"__v": 0
},
```

</details>

## 상품 상세 조회(R)

<summary></summary>
<details>

### -> Request - Path Parameters

### 정의

| 이름 | 타입   | 설명    |
| ---- | ------ | ------- |
| \_id | string | 상품 ID |

### 예시

`/products/6646be32432c8d3a456fc5e4`

### <- Response

| 이름        | 타입   | 설명       |
| ----------- | ------ | ---------- |
| \_id        | string | 상품 ID    |
| id          | number | 상품등록순 |
| name        | string | 상품명     |
| description | string | 상품 설명  |
| manager     | string | 담당자     |
| status      | string | 상품 상태  |
| createdAt   | Date   | 생성 일시  |
| updatedAt   | Date   | 수정 일시  |

### 예시

```JSON
{
	"product": {
		"_id": "6646be32432c8d3a456fc5e4",
		"id": 22,
		"name": "insomnia2",
		"description": "정보넣기됬으니 수정해보자",
		"manager": "2강산",
		"status": "SOLD_OUT",
		"createdAt": "2024-05-17T02:17:22.132Z",
		"updateAt": "2024-05-17T02:18:19.380Z",
		"__v": 0
	}
}
```

</details>

## 상품 수정(U)

<summary></summary>
<details>

### -> Request - Path Parameters

### 정의

| 이름 | 타입   | 설명    |
| ---- | ------ | ------- |
| \_id | string | 상품 ID |

### 예시

`/products/6646be32432c8d3a456fc5e4`

### -> Request - Body

### 정의

| 이름        | 타입   | 필수 여부 | 설명                           |
| ----------- | ------ | --------- | ------------------------------ |
| name        | string | N         | 상품명                         |
| description | string | N         | 상품 설명                      |
| manager     | string | N         | 담당자                         |
| status      | string | N         | 상품 상태 (FOR_SALE, SOLD_OUT) |
| password    | string | Y         | 비밀번호                       |

### 예시

```JSON
{
    "name" : "insomnia2",
    "description" : "정보넣기됬으니 수정해보자",
    "manager" : "2강산",
	"status" : "SOLD_OUT",
    "password" : "123456"
}
```

### <- Responce

### 정의

| 이름        | 타입   | 설명       |
| ----------- | ------ | ---------- |
| \_id        | string | 상품 ID    |
| id          | number | 상품등록순 |
| name        | string | 상품명     |
| description | string | 상품 설명  |
| password    | string | 비밀번호   |
| manager     | string | 담당자     |
| status      | string | 상품 상태  |
| createdAt   | Date   | 생성 일시  |
| updatedAt   | Date   | 수정 일시  |

### 예시

```JSON
{
	"status": 200,
	"message": "상품 수정에 성공했습니다.",
	"data": {
		"_id": "6646be32432c8d3a456fc5e4",
		"id": 22,
		"name": "insomnia2",
		"description": "정보넣기됬으니 수정해보자",
		"manager": "2강산",
		"password": "123456",
		"status": "SOLD_OUT",
		"createdAt": "2024-05-17T02:17:22.132Z",
		"updateAt": "2024-05-17T02:18:19.380Z",
		"__v": 0
	}
}
```

</details>

## 상품 삭제(D)

<summary></summary>
<details>

### 정의

| 이름 | 타입   | 설명    |
| ---- | ------ | ------- |
| \_id | string | 상품 ID |

### 예시

`/products/6646be32432c8d3a456fc5e4`

### -> Request - Body

### 정의

| 이름     | 타입   | 설명     |
| -------- | ------ | -------- |
| password | string | 비밀번호 |

### 예시

```JSON
{
	"password" : "123456"
}
```

### <-Responce

### 정의

| 이름 | 타입   | 설명    |
| ---- | ------ | ------- |
| \_id | string | 상품 ID |

### 예시

```JSON
{
	"status": 200,
	"message": "상품 삭제에 성공했습니다.",
	"data": {
		"id": "6646be32432c8d3a456fc5e4"
	}
}
```

</details>
