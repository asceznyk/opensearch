const queryHandler = document.getElementById('query');
const resultHandler = document.getElementById('results');
 
function autocomplete(inp) {
  var currentFocus;
	var results;

  inp.addEventListener("input", async function(e) {
		var a, b, i; 
		var val = this.value;

		results = await fetch("/", {
			method:"post", 
			headers:{"content-type":"application/json"}, 
			body: JSON.stringify({
				"query": val,
			}), 
		});
		results = JSON.parse(await results.json());
		console.log(results);

		closeAllLists();

		if (!val) { return false; }

		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		for (i = 0; i < results.length; i++) {
			b = document.createElement("DIV");
			b.innerHTML = "<strong>" + results['words'][i].substr(0, val.length) + "</strong>";
			b.innerHTML += results['words'][i].substr(val.length);
			b.innerHTML += "<input type='hidden' value='" + results['words'][i] + "'>";
			a.appendChild(b);
		}
  });

	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) { 
			currentFocus--;
			addActive(x);
		}
	});

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}

	document.addEventListener("click", function (e) {
			closeAllLists(e.target);
	});
}

autocomplete(queryHandler)


