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
    if (window.jQuery === undefined) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                optiIntel.detectOptiExperiments();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}();