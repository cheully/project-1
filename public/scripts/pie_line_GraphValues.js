function get_Size(array) {
	if (array.length != 0) {
		return "List is not zero";
	} else {
		return "The list is empty! Cannot work!";
	}
}

function create_lineData(array) {
	var lineData = [];
	
	for (var i = 2; i<data.length; i++) {
		for (var item in data[i]) {
			lineData.push([item, data[i][item]]);
		}
	}
	lineData.sort();
	lineData.reverse();
	lineData = lineData.slice(0,3);
	lineData.sort();
	
	return lineData;
}

function create_DataList(array, type) {
	var num = (type === 'x') ? 0 : 1;
	var lineData = [type];
	
	for (var i = 0; i < array.length; i++) {
		lineData.push(array[i][num]);
	}
	
	return lineData;
}