const loadFetch = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => showFetch(data.data))
}


const showFetch = data => {
    console.log(data.tools[0]);
    const parantDiv = document.getElementById('parantDiv');
    data.tools.forEach(singleItem => {
        const childDiv = document.createElement('div');
        childDiv.classList.add('col');
        childDiv.innerHTML=`
        <div class="card h-100">
            <img src="${singleItem.image}" class="card-img-top align-items-center" alt="...">
            <div class="card-body">
                <h4 class="card-title">Features</h4>
                <p class="m-0">1. ${singleItem.features[0]}</p>
                <p class="m-0">2. ${singleItem.features[1]}</p>
                <p class="m-0">3. ${singleItem.features[2]}</p>
             </div>
             <span class="border mx-3 border-top-0 border-light-subtle"></span>
        </div>
        `;
        parantDiv.appendChild(childDiv);

    })
}

loadFetch();