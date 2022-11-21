const queryHandler = document.getElementById('query');

fetch("/", {
	method:"post", 
	headers:{"content-type":"application/json"}, 
	body: JSON.stringify({
		"query": queryHandler.value,
	}), 
})
 



