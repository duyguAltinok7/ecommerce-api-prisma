# E-Ticaret API

Node.js, Express ve Prisma ORM ile geliştirilmiş, katmanlı mimariye sahip bir e-ticaret backend API'si. Auth, ürün, sepet ve sipariş/ödeme akışlarını içerir.

**Bu proje bir öğrenme/çalışma projesidir**
Node.js, Express ve Prisma ORM kullanarak katmanlı mimari (Layered Architecture) prensibini anlamak ve Prisma ORM'yi deneyimlemek amacıyla geliştirilmiştir.

## Teknolojiler

Node.js · Express · Prisma (PostgreSQL) · JWT

## Mimari

```
routes → middlewares (auth/validation) → controllers → services → repositories
```

```
src/
├── config/         # DB & Prisma config
├── controllers/
├── errors/
├── middlewares/     # auth, role, error handler
├── repositories/
├── routes/
├── services/
└── validators/
```

## Kurulum

```bash
git clone <repo-url>
cd <proje-klasörü>
npm install
cp .env.example .env   # .env dosyasını doldur
npx prisma migrate dev
npm run dev
```



