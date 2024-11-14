import "@testing-library/jest-dom"
import { render,screen } from "@testing-library/react";
import { Logon,Signu,Heade,Welcom,Resul } from "./logina";

test('inputi i botuni u loginu', () => {
  render(<Logon />);
  const inputi1=screen.getByTestId("inputi1");
  const inputi2=screen.getByTestId("inputi2");

  const buttonEl = screen.getByTestId("botunP");
  expect(buttonEl).toBeInTheDocument();
  expect(inputi1).toBeInTheDocument();
  expect(inputi2).toBeInTheDocument();


})

test("inputi botun u signupu",()=>{
  render(<Signu/>);
  const inputi1=screen.getByPlaceholderText("name")
  const inputi2=screen.getByPlaceholderText("email")
  const inputi3=screen.getByTestId("inputi3");
  const h1=screen.getByTestId("prijava");
  const botunR=screen.getByTestId("SignupB");

  expect(inputi1).toBeInTheDocument();
  expect(inputi2).toBeInTheDocument();
  expect(inputi3).toBeInTheDocument();
  expect(h1).toBeInTheDocument();
  expect(botunR).toBeInTheDocument();

})

test("Botuni se nalaze u headeru",()=>{
  render(<Heade/>);
  const botunL=screen.getByTestId("login");
  const botunS=screen.getByTestId("signup");
  const botun=screen.getByTestId("logout");
  const h1=screen.getByTestId("header");


  expect(botunL).toBeInTheDocument();
  expect(botunS).toBeInTheDocument();
  expect(botun).toBeInTheDocument();
  expect(h1).toBeInTheDocument();

})

test("Prikazuje se lista pravila testa",()=>{
  render(<Welcom/>);
  const h1=screen.getByText("Dobrodošao u PythonTest")
  const lista=screen.getByTestId("lista")
  const li1=screen.getByText("Test se sastoji od 10pitanja")
  const li2=screen.getByText("Svako pitanje ima 3 opcije")
  const li3=screen.getByText("Mogu se minjat odgovori prije nego se zavrsi kviz")
  const li4=screen.getByText("Rezultat ce biti vidljiv na kraju kviza")


  expect(h1).toBeInTheDocument();
  expect(lista).toBeInTheDocument();
  expect(li1).toBeInTheDocument();
  expect(li2).toBeInTheDocument();
  expect(li3).toBeInTheDocument();
  expect(li4).toBeInTheDocument();

})

test("Lista rezultata",()=>{
  render(<Resul/>);
  const h1=screen.getByText("Python test");
  const re=screen.getByTestId("result")
  const botunR=screen.getByText("Restart")

  expect(h1).toBeInTheDocument();
  expect(re).toBeInTheDocument();
  expect(botunR).toBeInTheDocument();
  
})