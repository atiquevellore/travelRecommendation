document.getElementById('search').addEventListener('click', function(event) {
  event.preventDefault(); 
  getRecommendations();
});

async function getRecommendations() {
  const searchtext = document.getElementById('searchtext').value;
  await getRecommendationsList(searchtext);
}

async function getRecommendationsList(givenstring) {
  console.log("searchtext", givenstring);
  let recommendations;
  try {
      const response = await fetch('./travel_recommendation_api.json');
      recommendations = await response.json();

      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = ''; // Clear previous results


      let found = false
      for (const key in recommendations) {
          if (key === givenstring && givenstring !== "") {
              // Output the matching recommendations
              const recommendation = recommendations[key];
               console.log("recommendations", recommendation)
              const matchedListHtml = recommendations[key].map(item => `
              <div class="card-container">
              <ul class="cardlist">
                <li>
                  <div class="card">
                    <img src="${item.imageUrl}" alt="${item.name}" style="width:100%">
                    <div>
                      <h4><b> ${item.name}</b></h4> 
                      <p>${item.description}</p> 
                    </div>
                  </div>
                </li>
              </ul>
              </div>
            `).join('');
            
               resultsContainer.innerHTML = matchedListHtml;
              found = true;
          }
      }
      if (!found) {
        resultsContainer.innerHTML = '<p>No matching recommendations found.</p>';
    }
  } catch (error) {
      console.log("Error message", error.message);
  }
}

document.getElementById("clear").addEventListener('click',function(event){
  event.preventDefault();
  clearRecommendations();
});

function clearRecommendations(){
  console.log("clear clicked")
  const searchtext = document.getElementById('searchtext')
  searchtext.value = ''
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
}