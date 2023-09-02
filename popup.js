document.addEventListener('DOMContentLoaded', function() {
  let slider = document.getElementById("volumeRange");
  let tabList = document.getElementById("tabList");

  // Set global volume event listener
  slider.addEventListener("input", function() {
      let volumeLevel = slider.value / 100;  
      chrome.tabs.query({}, function(tabs) {
          tabs.forEach(tab => {
              chrome.tabs.sendMessage(tab.id, {"message": "set_global_volume", "volumeLevel": volumeLevel});
          });
      });
  });

  // Update tab list with checkboxes
  chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
          let label = document.createElement("label");
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = tab.id;
          checkbox.addEventListener("change", function() {
              let tabId = parseInt(checkbox.value);
              chrome.tabs.sendMessage(tabId, {"message": "mute_tab"});
          });
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(tab.title));
          tabList.appendChild(label);
          tabList.appendChild(document.createElement("br")); // Add a line break
      });
  });
}); 


