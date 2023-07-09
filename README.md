# EcoScan

EcoScan is a web application that allows users to scan or search for products and see their sustainability rating. The application provides users with valuable information about the environmental impact of the products they use and helps them make more sustainable choices.

## Members

| Full Name      | Student Short | Matriculation Number |
|----------------|---------------|----------------------|
| Jana Eichholz  | je067         | 42961                |
| Julius Beutel  | jb266         | 42768                |
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

### Additional requirements

No need to populate the database manually, it gets populated on the server startup.

## Testing

### Frontend

Component tests are in the same folder as the Component

- [PrimaryButton Component Test](./client/src/components/buttons/ButtonPrimary.test.tsx)
- [SustainabilityBar Component Test](./client/src/components/sustainabilitybar/SustainabilityBar.test.tsx)
- [InputField Component Test](./client/src/components/addProduct/InputField.test.tsx)
- [ProductCard Component Test](./client/src/components/productcard/ProductCard.test.tsx)

### Backend

All tests are in the [/server/tests/](./server/tests) folder.

- **CRUD End-to-End Test:**
  - [productCRUD.test.ts](./server/tests/productCRUD.test.ts)


- **Unit Test:**
  - [product read/update/delete](./server/tests/productService.test.ts)
  - [product create](./server/tests/productCreateService.test.ts)

# Known Issues

There is still much to improve on the web app - no software is ever finished.

## Overall
- More Feedback to the user (e.g.: Notifications)
- Code could be better split into services
- Profile: User change name is implemented in frontend but has is without functionality
- Request & Response: Types should be shared between server & client (overall more typesafe code)
- Users are not able to add personal product with the same barcode another user already has (easy to fix, but we did not set prioritization to it)
- The API should later not always return all products, but only a few and through endless scroll or a button should then be able to fetch more products.
- We have implemented input validation, but this can also be improved by regex or minimum number of characters.
- If the user adds his own products currently he is just able to add barcode/name/description/sustainableIndex, there could be also more input fields and a picture. (But we just implemented this feature because of requirements, later on, we just want t have data from the greenDB)

When we plan to improve the Web-App this would be the next steps we would do.