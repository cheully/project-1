// Get the size of array
function get_Size(array) {
	if (array.length != 0) {
		return "The list of schools is not zero";
	} else {
		return "The list is empty! Cannot work!";
	}
}

// Check if an institution is within the array
function institution_exists(name, array) {
	for (var i = 0; i < array.length; i++) {
		var objName = array[i].INSTNM;
		
		if (name === objName) { return true; }
	
	}
	return false;
}

// Check if the total is not equal to zero
function total_NonZero(obj) {
	if (obj.Total != 0) { return obj.Total; }
		else { return "Value is zero"; }
}

// Create a list of data for enrollment
function create_enrollData(array) {
	var enrollData = ['Enrollments'];
	
	for (var i = 0; i < data.length; i++) {
		enrollData.push(data[i].Total);
	}
	
	return enrollData;
}

// Create a list of names for the x axis
function create_xData(array) {
	var xData = ['x'];
	
	for (var i = 0; i < data.length; i++) {
		xData.push(data[i].INSTNM);
	}
	
	return xData;
}