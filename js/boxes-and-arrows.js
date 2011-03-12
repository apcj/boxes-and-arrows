var BA = {};

BA.diagramStorageKey = null;

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

BA.loadLastOpenDocumentIfExists = function() {
	var lastOpenDocument = localStorage.getItem("boxesAndArrows.lastOpenDocument");
	if (lastOpenDocument) {
		$("#ba-editor").val(localStorage.getItem(lastOpenDocument));
	}
}

BA.refeshExistingDocumentsList = function() {
	$(".ba-existing-documents-list").find("*").remove();
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (key.indexOf("boxesAndArrows.source.") === 0) {
			$(".ba-existing-documents-list").append("<option>" + key.substr("boxesAndArrows.source.".length) + "</option>");
		}
	}
}

BA.open = function() {
	BA.diagramStorageKey = $("#ba-open-storage-key").val();
	$("#ba-content-editor").val(localStorage.getItem("boxesAndArrows.source." + BA.diagramStorageKey));
	window.history.back();
	editorChanged();
}

BA.saveAs = function() {
	BA.diagramStorageKey = $("#ba-save-as-storage-key").val();
	BA.save();
}

BA.save = function() {
	if (BA.diagramStorageKey) {
		localStorage.setItem("boxesAndArrows.source." + BA.diagramStorageKey, $("#ba-content-editor").val());
		localStorage.setItem("boxesAndArrows.lastOpenDocument", BA.diagramStorageKey);
		BA.showSaveSuccessfulMessage();
	} else {
		window.location.hash = "save-as";
	}
}

BA.showSaveSuccessfulMessage = function() {
	var message = $(".ba-message.prototype").clone();
	message.text("Saved successfully");
	message.removeClass("prototype");
	$(".ba-button-bar").append(message);
	message.fadeOut(3000, function() {
		message.remove();
	})
}