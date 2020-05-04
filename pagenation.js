var pagenation = function(current, total){
	var list = [];
	var pageLimit = 5;
	var upperLimit, lowerLimit;
	var currentPage = lowerLimit = upperLimit = Math.min(current, total);

	for (var b = 1; b < pageLimit && b < total;) {
	    if (lowerLimit > 1 ) {
	        lowerLimit--; b++; 
	    }
	    if (b < pageLimit && upperLimit < total) {
	        upperLimit++; b++; 
	    }
	}

	for (var i = lowerLimit; i <= upperLimit; i++) {
	    if (i == currentPage){
	    	list.push("["+i+"]");
	    }
	    else{
	    	list.push(i);
	    }
	}
	console.log(list);
	return list;
}
module.exports = pagenation;