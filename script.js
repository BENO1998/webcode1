const Container = document.createElement("div");
Container.className = "container";
document.body.appendChild(Container);

const searchArea = document.createElement("div");
searchArea.className = "searchArea";
Container.appendChild(searchArea);

const Input = document.createElement("input");
Input.className = "search";
Input.placeholder = "Enter Company Name";
searchArea.appendChild(Input);

const buton = document.createElement("button");
buton.className = "submit";
buton.innerText = "Search";
searchArea.appendChild(buton);

const result = document.createElement("div");
result.className = "result";
Container.appendChild(result);

buton.addEventListener("click", async() => {
    try{
    let searchTerm = document.querySelector(".search").value;
    const response = await fetch("https://api.openbrewerydb.org/breweries?page=1");
    const jsonData = await response.json();
    let filtered_arr = [];
    for(let i = 0; i < jsonData.length; i++){
        if((jsonData[i].name.toLowerCase()).includes(searchTerm.toLowerCase())){
            filtered_arr.push(jsonData[i]);
        }
    }
    const emptyResult = document.querySelector(".result");
    emptyResult.innerHTML = "";

    for(let i = 0; i < filtered_arr.length; i++) {
        let brewData = document.createElement("div"); 
        brewData.innerHTML = `
        <div class="card">
            
                <h3>Name:${filtered_arr[i].name}<br>
                Brewery Type: ${filtered_arr[i].brewery_type}<br><br>
                Address:${filtered_arr[i].street}, ${filtered_arr[i].city}, ${filtered_arr[i].state}, ${filtered_arr[i].country}<br>
                Phone: ${filtered_arr[i].phone}<br><br>
                Website:<a href = "${filtered_arr[i].website_url}" target = "_blank" class = "breweryWebsite">${filtered_arr[i].website_url}</a></h3>
        </div>        
        `
        result.appendChild(brewData);
    }
        
    }
    catch(error){
        result.innerHTML = error;
    }
    
    
   
});