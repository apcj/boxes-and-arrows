var buildDiagram = function(node, parentElement) {
	var newElement = $(".node.prototype").clone();
	newElement.removeClass("prototype");
	newElement.find(".label").append(node.name);
	for (var i = 0; i < node.classes.length; i++) {
		newElement.addClass(node.classes[i]);
	}
	parentElement.append(newElement);
	for (var i = 0; i < node.children.length; i++) {
		var child = node.children[i];
		buildDiagram(child, newElement);
	}
}

var editorChanged = function() {
	var node = parse($('#ba-content-editor').val().split("\n"));
	$("#ba-display").find("*").remove();
	$("style").text($('#ba-style-editor').val());
	buildDiagram(node, $("#ba-display"))
}
