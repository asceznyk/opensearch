const queryHandler = document.getElementById('query');
const resultHandler = document.getElementById('results');

queryHandler.addEventListener("keyup", async function() {
	let results = await fetch("/", {
		method:"post", 
		headers:{"content-type":"application/json"}, 
		body: JSON.stringify({
			"query": queryHandler.value,
		}), 
	});
	console.log(results);
});
 



