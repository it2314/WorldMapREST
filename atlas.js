const continent = document.getElementById('continent');
const modal = new bootstrap.Modal(document.getElementById('windowCountry'));
const modalBody = document.getElementById('modal-body-content');
const modalInfo = document.getElementById('modal-body-info');

async function getData(region) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      let blocks = '';
      json.forEach((country) => {
        blocks += `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" style="margin-top: 20px">                
                <div class="card">
                    <img class="card-img-top" src="${country.flags.png}"  alt="Vlajka">
                    <div class="card-body">
                      <h4 class="card-title">${country.name.common}</h4>
                      <p class="card-text">Population: ${country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
                      <a href="#" class="btn btn-info card-link btn-grow" data-name="${country.name.common}">More Information ></a>
                    </div>
                </div>
            </div>            
        `;
      });
      listCountries.innerHTML = blocks;
      document.querySelectorAll('[data-name]').forEach(button => {
        button.addEventListener('click', () => {
          const countryName = button.getAttribute('data-name');
          modal.show();
          fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then(res => res.json())
          .then(data => {
            const country = data[0];
            modalBody.innerHTML = `<h1 class="fw-bold text-center">${country.name.common}</h1>`
            modalInfo.innerHTML = ` 
            <p><b>Continent:</b> ${country.continents ?? "Not specified"}</p> 
            <p><b>Languages:</b> ${Object.values(country.languages) ?? "Not specified"}</p>
            <p><b>Area:</b> ${country.area ?? "Not specified"} km<sup>2</sup></p>
            <p><b>Timezones:</b> ${country.timezones ?? "Not specified"}</p>
            <p><b>Capital:</b> ${country.capital ?? "Not specified"}</p> 
            <p><b>Alternative Spellings:</b> ${country.altSpellings ?? "Not specified"}</p>`
          })
          .catch(error => {
            console.error(error)
          })
        })
      });
    } catch (error) {
      console.error(error.message);
    }
  }

continent.addEventListener('change', ()=> {
    getData(continent.value);
});

getData('europe');
