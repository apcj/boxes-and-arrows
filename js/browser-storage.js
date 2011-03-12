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

BA.bindStorageButtons = function() {
	$(".ba-toggle-editor").click(function() {
		$(".ba-editor").toggleClass("hidden");
	});
	$(".ba-button-open").click(function() {
		BA.refeshExistingDocumentsList();
		window.location.hash = "open";
	});
	$(".ba-button-save").click(BA.save);
	$(".ba-button-save-as").click(function() {
		BA.refeshExistingDocumentsList();
		window.location.hash = "save-as";
	});
	$("#ba-button-open-ok").click(BA.open);
	$("#ba-button-save-as-ok").click(BA.saveAs);
	$(".ba-existing-documents-list").change(function() {
		$(".ba-diagram-storage-key").val($(".ba-existing-documents-list").val());
	});
}
