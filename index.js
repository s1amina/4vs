const puppeteer = require('puppeteer');
async function comparePrices() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.technodom.kz/p/smartfon-apple-iphone-11-128gb-black-mhdh3rma-228942')
    const technodomPrice = await page.evaluate(() => {
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    await page.goto('https://www.sulpak.kz/g/smartfon_apple_iphone_11_128gb_slim_box_black_77_2729')
    const sulpakPrice = await page.evaluate(() => {
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    await page.goto('https://www.mechta.kz/product/telefon-sotovyy-apple-iphone-11-128gb-black-eco/')
    const mechtaPrice = await page.evaluate(() => {
        const price = document.querySelector('.text-bold.text-ts5.text-color1').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    console.log(sulpakPrice)
    
     if (technodomPrice == sulpakPrice && sulpakPrice == mechtaPrice && mechtaPrice == technodomPrice) {
        console.log('цены одинаковы');
     } else if (technodomPrice > sulpakPrice && technodomPrice > mechtaPrice) {
        console.log('https://www.technodom.kz/');
     }
     else if (sulpakPrice > technodomPrice && sulpakPrice > mechtaPrice){
        console.log('https://www.sulpak.kz/');
     } else if (mechtaPrice > technodomPrice && mechtaPrice > sulpakPrice) {
        console.log('https://www.mechta.kz/');
     }
     else {
        console.log('ошибка');
     }
    
    await browser.close();
}
comparePrices();