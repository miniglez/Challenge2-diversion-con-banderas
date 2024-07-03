const countriesList = document.getElementById("countries-list")
const countryInfo = document.getElementById("countryInfo")
const countryArray = []

const funcioPrueba = (idButton) => {
    const countrySelected = countryArray.filter((object) => object.id == idButton)
    const template = `
        <div class="countryInfoInfo">
            <div class="countrySelected">
                <div class="theCountry">
                    <img src="${countrySelected[0].flag}">
                    <div class="textInfo">
                        <h3>${countrySelected[0].countryName}</h3>
                        <p>Capital: ${countrySelected.capital}</p>
                        <p>Poblacion: ${countrySelected.population}</p>
                        <p>Lado de la carretera: ${countrySelected.rideDirection}</p>
                    </div>
                </div>
                <button id="btn">Cerrar</button>
            </div>
        </div>
    `
    countryInfo.innerHTML = template
     const btn = document.getElementById("btn")
     btn.addEventListener("click", () => {
         countryInfo.innerHTML = ""
     })
}

const addCountry = (data) => {
    data.forEach(country => {
        const template = `
            <div id="${country.id}" class="country" onClick="funcioPrueba('${country.id}')">
                <img src="${country.flag}">
                <h2>${country.countryName}</h2>
            </div>
        `
        countriesList.innerHTML += template
    }) 
}


const getFetch = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3/all")
        if(!res.ok){
            throw new Error("Se ha producido un error", res.status)
        }
        const data = await res.json()
        for(i in data){
            const object = {
                id: i,
                countryName: data[i].altSpellings[data[i].altSpellings.length - 1],
                flag: data[i].flags[0],
                capital: data[i].capital,
                population: data[i].population,
                rideDirection: `${data[i].car.side}`
            }
            countryArray.push(object)
        }
        addCountry(countryArray)
        return countryArray
    }
    catch(error){
        console.error("Se ha producido un error", error)
    }
}


getFetch()



