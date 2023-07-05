import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    console.log('Before tests');
});

test.afterAll(async () =>{
    console.log('After tests')
});

test('Login page and enter credentials', async ({ page }) => {
  await page.goto('https://www.m2iformation.fr/mon-compte/particuliers/');
  await page.locator('input[name="email"]').fill(process.env.USERNAME as string);
  await page.locator('input[name="password"]').fill(process.env.PASSWORD as string);
  await page.getByText('Connexion').click();
  await page.getByText('Signer la feuille de présence').first().click();
  await page.getByRole('banner').getByRole('link', { name: '2 Feuille de présence' }).click();
  var today = getToday();
  if(await page.locator(`[id='${today}']`).getAttribute("src") == "http://sign.m2iformation.fr/images/images-fdp/signatureicon.jpg"){ 
    await page.click(`[id='${today}']`);
    console.log("Bien joué tu as signé aujourd'hui")
  }
  else{
    console.log("T'as déjà signé aujourd'hui!");
  }
});

function getToday(){
  var date = new Date();
  var dateMonth
  var dateDay
  //Le mois récupéré est écrit sans 0 avant et les id du site pour les images sont au format MM/DD/YYYY
  //Donc si mois < 10, il faut ajouter un 0.
  //Je ne sais pas pourquoi les dates il faut ajouter +1 au mois, peut-être pcq il commence à 0??
  if(date.getMonth()<10)
    dateMonth = "0"+ (date.getMonth()+1);
  else
    dateMonth = (date.getMonth()+1);
  //Pareil pour le jour
  if(date.getMonth()<10)
    dateDay = "0"+date.getDate();
  else
    dateDay = date.getDate();
  var dateFormat = (dateMonth) + "/" + dateDay + "/" + date.getFullYear();
  //On ajoute am ou pm pour matin ou aprem
  if(date.getHours()>13){ dateFormat += "pm"; }
  else { dateFormat += "am"; }
  
  return dateFormat;
}