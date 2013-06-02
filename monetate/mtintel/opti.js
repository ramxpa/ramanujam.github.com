var optiIntel = window.optiInfo || {};


optiIntel.detectOptiExperiments = function(){
    var opti = window.optimizely;
    var allExperiments = opti.allExperiments;
    var allVariations = window.optimizely.allVariations;

    var optiData = [];    
    jQuery.map(allExperiments, function(value, key){
        var optiExp = {};
        optiExp.name = value.name;
        optiExp.id = key;
        optiExp.variation_ids = value.variation_ids;
        optiExp.variation_names = optiIntel.getVariationNames(value.variation_ids, allVariations);
        optiExp.enabled = value.enabled ? 'true' : 'false';
        optiData.push(optiExp);
    });

    var expCount = optiData.length;
    var activeCount = 0;
    for (var i = 0; i < optiData.length; i++) {
        if (optiData[i].enabled === 'true') {
            activeCount = activeCount + 1;
        }
    }

    console.log('Opti Data --', optiData);
    console.log('Exp count --', expCount);
    console.log('Active count --', activeCount);

    optiIntel.insertDisplayPanel(optiData);
    optiIntel.insertData(optiData);
};

optiIntel.getVariationNames = function(variation_ids, allVariations) {
        var variationNames = [];
        for (var i = 0; i < variation_ids.length; i++) {
            jQuery.each(allVariations, function(key, value){
                if (key == variation_ids[i]){
                    variationNames.push(value.name);
                }
            });
        }
        return variationNames;
};

optiIntel.insertDisplayPanel = function(experimentNames) {
    var bodyTag = document.getElementsByTagName('body')[0];
    if (bodyTag) {
        var containerDiv = document.createElement('div');
        bodyTag.appendChild(containerDiv);
        containerDiv.id = 'mtintel-container';
        containerDiv.innerHTML = '<div id="mtintel-wrapper"><div class="navbar"><div class="navbar-inner"></div><h2 class="heading">Optimizely Campaigns</h2></div><table class="table table-striped total-numbers"><thead><tr><th>Experiments</th><th>Variations</th><th>Active</th></tr></thead><tbody><tr><td class="total-exp"></td><td class="total-var"></td><td class="total-active"></td></tr></tbody></table><table class="table table-bordered table-striped table-1 data-table"><thead><tr><th class="th-1">Experiment Name</th><th class="th-2">Variations</th><th class="th-3">Active</th></tr></thead><tbody><tr><td class="exp-name"></td><td class="var-name"></td><td class="isactive"></td></tr></tbody></table></div>';
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