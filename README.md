# EcoScan

EcoScan is a web application that allows users to scan or search for products and see their sustainability rating. The application provides users with valuable information about the environmental impact of the products they use and helps them make more sustainable choices.

## Members

- Lea Bretz lb153 39217,

- Sandra Barsoum sb283 40168, 

- Julius Beutel js266 42768, 

- Steffen Singer ss536 42686, 

- Lisa Kohls lk210 43583, 

- Jana Eichholz je067 42961

## Run with docker

`docker compose up`
or with building: `docker compose up --build`

## Run Development Environment

- `docker run -d -p 27017:27017 --name ecoscan-db mongo:4.4`
- In client folder
  - `npm i && npm run dev`
- In server folder
  - `npm i && npm run dev`

## Getting Started

To get started with EcoScan, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies by running `npm install`
3. Start the client by running `npm start` in the client directory
4. Start the server by running `npm start` in the server directory
5. Open your web browser and navigate to `http://localhost:3000`

## Usage

Once you have the EcoScan application running, you can use it to scan or search for products. Simply click on the scan or search button and enter the name of the product you are looking for. The application will retrieve information about the product's sustainability rating and display it to you.

## Technologies Used

EcoScan is built using the following technologies:

- TypeScript
- React
- Vite
- Node.js
- Express

## Testing

### Frontend
- PrimaryButton component Test
- SustainabilityBar component Test

### Backend


## License

No license for now 
