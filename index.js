const puppeteer = require('puppeteer');
var _ = require('underscore');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//let userInput = "";
//rl.question("Que quieres buscar\n", function (string) {
//    userInput = string;

//    rl.close();

    (async ()=>{
        const browser = await puppeteer.launch({headless:false});  // headless:false para ver lo que está realizando el código en tiempo real

        const page = await browser.newPage();
        await page.goto('https://www.falabella.com/falabella-cl');

        // await page.waitForSelector('[class="TernaryNavBar-module_container__1dqro TernaryNavBar-module_zone-container__3qifB"]');
        // await page.click('[class="airship-btn airship-btn-deny"]')

        await page.type('#testId-SearchBar-Input', "Celulares");
        await page.waitForSelector('[class="SearchBar-module_searchIcon__FS7b4"]');
        await page.waitForTimeout(1000);
        await page.click('[class="SearchBar-module_searchIcon__FS7b4"]'); // has click en el input que hay dentro de esta clase
        await page.waitForTimeout(1000);
        await page.click('[class="SearchBar-module_searchIcon__FS7b4"]');
        // await page.screenshot({path:'captura.jpg'});
        await page.waitForTimeout(2000);

        await page.waitForSelector('[class="jsx-98721354 label-text "]');  // para indicar el momento en que se haya realizado la busqueda buscamos un atributo que se encuentre cuando la página ya esté cargada
        await page.waitForTimeout(1000);

        // investigar dentro de la página buscada


        const enlaces = await page.evaluate(()=> { //función anónima que inspecciona la página
            const elements = document.querySelectorAll('[class="jsx-98721354 label-text "]')  // devuelve todos los elementos que están en la sección 'a' que está en h2 que está en data-component-type="s-search-results". Es decir que devuelve todos los links que me interesan

            const marcas = [];  // array que contendrá cada uno de los links de los resultados de la búsqueda
            for(let marca of elements) {
                marcas.push(marca.innerText)  //href hace referencia a un hipervínculo
            }
            return marcas;
        });

        console.log(enlaces);

    })();
//});


