var optiIntel = window.optiInfo || {};


optiIntel.detectOptiExperiments = function(){
    var opti = window.optimizely;
    var allExperiments = opti.allExperiments;
    var allActions = window.optimizely.allVariations;

    var optiData = {};
    
    jQuery.each(allExperiments, function(key, value) {
        optiData[key] = value.name;
    });

    console.log('Experiment names', optiData);

    optiIntel.insertDisplayPanel(optiData);
    optiIntel.insertData(optiData);
};

optiIntel.insertDisplayPanel = function(experimentNames) {
    var bodyTag = document.getElementsByTagName('body')[0];
    if (bodyTag) {
        var containerDiv = document.createElement('div');
        bodyTag.appendChild(containerDiv);
        containerDiv.id = 'optiintel-container';
        containerDiv.style.cssText = "position:absolute;top:0;background-color:#fff;width:400px;height:300px;"

        var displayPanel = document.createElement('ul');
        if (containerDiv) {
            containerDiv.appendChild(displayPanel);
            displayPanel.id = 'optiintel-panel';
        }
    }
};


optiIntel.insertData = function(campaignData) {
    for (i = 0; i < campaignData.length; i ++) {
        var expLi = document.createElement('li');
        expLi.innerText = campaignData[i];
        // displayPanel.appendChild(expLi);
    }
};

optiIntel.init = function () {
    optiIntel.detectOptiExperiments();
}();