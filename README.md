# EcoScan

EcoScan is a web application that allows users to scan or search for products and see their sustainability rating. The application provides users with valuable information about the environmental impact of the products they use and helps them make more sustainable choices.

## Members

| Full Name      | Student Short | Matriculation Number |
|----------------|---------------|----------------------|
| Jana Eichholz  | je067         | 42961                |
| Julius Beutel  | js266         | 42768                |
| Lea Bretz      | lb153         | 39217                |
| Lisa Kohls     | lk210         | 43583                |
| Sandra Barsoum | sb283         | 40168                |
| Steffen Singer | ss546         | 42686                |


## Getting started guide

### How to start

```
git clone https://gitlab.mi.hdm-stuttgart.de/mwa/ss23/ecoscan.git
cd ecoscan/
docker compose up
```

### Where to open

Web-Browser: `http://localhost:3000`

### How to login

You can register your own user by clicking on `Create new account` or open `http://localhost:3000/registration`.

After a successful registration you can log in with your created account.

## Testing

### Frontend

Component tests are in the same folder as the Component
- [PrimaryButton Component Test](./client/src/components/buttons/ButtonPrimary.test.tsx)
- [SustainabilityBar Component Test](./client/src/components/sustainabilitybar/SustainabilityBar.test.tsx)

### Backend

All tests are in the [/server/tests/](./server/tests) folder.

- CRUD End-to-End Test: [productCRUD.test.ts](./server/tests/productCRUD.test.ts)

- CRUD Unit Test: [TODO](TODO)


