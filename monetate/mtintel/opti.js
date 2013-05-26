var optiIntel = window.optiInfo || {};


optiIntel.detectOptiExperiments = function(){
    var opti = window.optimizely;
    var allExperiments = opti.allExperiments;
    var activeExperiments = opti.activeExperiments;

    var allnum = Object.getOwnPropertyNames(allExperiments).length;
    var activenum = Object.getOwnPropertyNames(activeExperiments).length;

    var experimentNames = [];

    jQuery.each(allExperiments, function( key, value ) {
        experimentNames.push(value.name);
    });

    console.log('Experiment names', experimentNames);

    optiIntel.insertDisplayPanel(experimentNames);

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

        for (i = 0; i < experimentNames.length; i ++) {
            var expLi = document.createElement('li');
            expLi.innerText = experimentNames[i];
            displayPanel.appendChild(expLi);
        }

    }
};

optiIntel.init = function () {
    optiIntel.detectOptiExperiments();
}();