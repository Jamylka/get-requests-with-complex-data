const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const apiKey = 'xSTfemNCkji4hh10paKKENF7PL1FrfdkxxboFK9a';

const searchURL = 'developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  //iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    /* for each camp object in the data array, add a list item to the results
    list with the full name, description, website URL, and address
    */
  }
}

function getParks(stateSelect, maxResults) {
  const params = {
    stateCode: [stateSelect],
    limit: maxResults
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch (err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });

}

function watchForm() {
  $('form').submit(event => {
    const stateSelect = $('#js-state-search').val();
    const maxResults = $('#js-max-results').val();
    getParks(stateSelect, maxResults);
  });
}

$(watchForm);

