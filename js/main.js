
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById('error');


searchBtn.addEventListener('click', function() {
const search = searchInput.value;
if(search === ''){
errorDiv.innerText = 'search field can not be empty';
return;
}
bookContainer.innerHTML = "";
searchInput.value = "";

const url = `https://openlibrary.org/search.json?q=javascript=${search}`;
fetch(url)
.then(res => res.json())
.then(data => {
 console.log(data.numFound);
 document.getElementById("total").innerText= "Total Result: "+ data.numFound;
 // handeling error
 if(data) {
  errorDiv.innerText = "";
} else {
errorDiv.innerText = "No Result Found";
}
 
data.docs.forEach(item => {
   console.log(item.title);
  const div = document.createElement('div')
  div.classList.add('col-md-3')
  div.innerHTML = `
  
  <div class="rounded overflow-hidden border p-2">
     <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="w-100" alt="" />
    </div>

    <div class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        ">
     <h1>${item.title}</h1>
     <h3>${item.author_name}</h3>
     <h4>${item.publisher}</h4>
     <p>${item.first_publish_year}</p>
     <button class="btn btn-danger">Learn More</button>
    </div>
   </div>
  `;
  // append child
bookContainer.appendChild(div);
 });
});
});

