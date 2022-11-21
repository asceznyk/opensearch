const queryHandler = document.getElementById('query');
const querySender = document.getElementById('search');

querySender.addEventListener("click", function() {
	fetch("/", {
		method:"post", 
		headers:{"content-type":"application/json"}, 
		body: JSON.stringify({
			"query": queryHandler.value,
		}), 
	})
});
 



