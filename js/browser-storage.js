var browserStorage = function() {
	var browserStoragePackage = [];

	var diagramStorageKey = null;
	
	browserStoragePackage.loadLastOpenDocumentIfExists = function() {
		var lastOpenDocument = localStorage.getItem("boxesAndArrows.lastOpenDocument");
		if (lastOpenDocument) {
			$("#ba-editor").val(localStorage.getItem(lastOpenDocument));
		}
	}

	browserStoragePackage.refeshExistingDocumentsList = function() {
		$(".ba-existing-documents-list").find("*").remove();
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			if (key.indexOf("boxesAndArrows.source.") === 0) {
				$(".ba-existing-documents-list").append("<option>" + key.substr("boxesAndArrows.source.".length) + "</option>");
			}
		}
	}

	var open = function() {
		diagramStorageKey = $("#ba-open-storage-key").val();
		$("#ba-content-editor").val(localStorage.getItem("boxesAndArrows.source." + diagramStorageKey));
		window.history.back();
		editorChanged();
	}

	var saveAs = function() {
		diagramStorageKey = $("#ba-save-as-storage-key").val();
		save();
	}

	var save = function() {
		if (diagramStorageKey) {
			localStorage.setItem("boxesAndArrows.source." + diagramStorageKey, $("#ba-content-editor").val());
			localStorage.setItem("boxesAndArrows.lastOpenDocument", diagramStorageKey);
			showSaveSuccessfulMessage();
		} else {
			window.location.hash = "save-as";
		}
	}

	var showSaveSuccessfulMessage = function() {
		var message = $(".ba-message.prototype").clone();
		message.text("Saved successfully");
		message.removeClass("prototype");
		$(".ba-button-bar").append(message);
		message.fadeOut(3000, function() {
			message.remove();
		})
	}

	browserStoragePackage.bindStorageButtons = function() {
		$(".ba-toggle-editor").click(function() {
			$(".ba-editor").toggleClass("hidden");
		});
		$(".ba-button-open").click(function() {
			browserStoragePackage.refeshExistingDocumentsList();
			window.location.hash = "open";
		});
		$(".ba-button-save").click(save);
		$(".ba-button-save-as").click(function() {
			browserStoragePackage.refeshExistingDocumentsList();
			window.location.hash = "save-as";
		});
		$("#ba-button-open-ok").click(open);
		$("#ba-button-save-as-ok").click(saveAs);
		$(".ba-existing-documents-list").change(function() {
			$(".ba-diagram-storage-key").val($(".ba-existing-documents-list").val());
		});
	}
	
	return browserStoragePackage;
}();