const searchForm = document.getElementById("buscarform")
const searchInput = document.getElementById("searchInput")

searchForm.addEventListener('submit', function(event){
    event.preventDefault()
    const container = document.getElementById("items")
    const results = document.getElementById("results")
    fetch(`https://api.chucknorris.io/jokes/search?query=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            results.textContent = data.total ? `Results found: ${data.total}` : "Results not found"
            jokesHTML = renderJokes(data.result)
            container.innerHTML = jokesHTML
            showSlides()
        })
        .catch(error => console.log(error))
    searchInput.value = ""
})

var slideIndex = 1;
const plusSlides = (num) => {
    slideIndex+=num;
    showSlides()
}

const renderJokes = (jokes) => {
    let jokesHTML = "";
    for (i=0;i<jokes.length;i++){
        jokesHTML += `
        <div class="item">
            <p class="joke_value">${jokes[i].value}</p>
            <a href=${jokes[i].url} target="_blank" class="url_joke">See more...</a>
        </div>
        `;
    }
    
    return jokesHTML;
};


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("item");

    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    if(slideIndex > slides.length){
        slideIndex = 1
    }
    if(slideIndex==0){
        slideIndex = slides.length;
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides,2000);
}