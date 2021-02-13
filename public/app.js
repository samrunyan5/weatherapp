async function fetchQuote() {
    const response = await fetch('/cowspiration');
    const {cow} = await response.json();
    $('#results').empty().append($(`<pre>${cow}</pre>`))
}

fetchQuote();