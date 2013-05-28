var optiIntel = window.optiInfo || {};


optiIntel.detectOptiExperiments = function(){
    var opti = window.optimizely;
    var allExperiments = opti.allExperiments;
    var allVariations = window.optimizely.allVariations;

    var optiData = {
        'name': '',
        'id': '',
        'variation_ids': [],
        'variation_names': []
    };
    
    var dataArr = jQuery.map(allExperiments, function(value, key){
        optiData.name = value.name;
        optiData.id = key;
        optiData.variation_ids = value.variation_ids;
        optiData.variation_names = getVariationNames(value.variation_ids);
        return optiData;
    });

    function getVariationNames(variation_ids) {
        var variationNames;
        for (var i = 0; i < variation_ids; i++) {
            jQuery.each(allVariations, function(key, value){
                if (key == variation_ids[i]){
                    variationNames.push(value.name);
                }
            });
        }
        return variationNames;
    }

    console.log('Opti Data ------', dataArr);

    optiIntel.insertDisplayPanel(dataArr);
    optiIntel.insertData(dataArr);
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