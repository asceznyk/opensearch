const queryHandler = document.getElementById('query');
const resultHandler = document.getElementById('results');

let results;
queryHandler.addEventListener("keyup", async function() {
	results = await fetch("/", {
		method:"post", 
		headers:{"content-type":"application/json"}, 
		body: JSON.stringify({
			"query": queryHandler.value,
		}), 
	});
	results = await results.json();
	console.log(results);
});
 



