$(document).ready(function(){



	$("#navigation").treeview({
		collapsed: true,
		//unique: true,
		persist: "location",
		animated: "fast",
		control: "#treecontrol"
	});



	$("#gray, #black").treeview({
		control: "#treecontrol"
	});



});