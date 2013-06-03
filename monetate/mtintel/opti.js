var optiIntel = window.optiInfo || {};


optiIntel.detectOptiExperiments = function(){
    var opti = window.optimizely;
    optiIntel.insertDisplayPanel();

    if (opti) {
        var allExperiments = opti.allExperiments;
        var allVariations = window.optimizely.allVariations;
        var optiData = [];    
        jQuery.map(allExperiments, function(value, key){
            var optiExp = {};
            optiExp.name = value.name;
            optiExp.id = key;
            optiExp.variation_ids = value.variation_ids;
            optiExp.variation_names = optiIntel.getVariationNames(value.variation_ids, allVariations);
            optiExp.enabled = value.enabled ? 'Yes' : 'No';
            optiData.push(optiExp);
        });

        optiData.totalExp = optiData.length;
        optiData.totalVariations = Object.keys(allVariations).length;

        var activeCount = 0;
        for (var i = 0; i < optiData.length; i++) {
            if (optiData[i].enabled === 'Yes') {
                activeCount++;
            }
        }

        optiData.totalActive = activeCount;
        optiIntel.insertData(optiData);
    } else {
        optiIntel.notAnOptiUser();
    }
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

optiIntel.insertDisplayPanel = function() {
    var bodyTag = document.getElementsByTagName('body')[0];
    if (bodyTag) {
        var containerDiv = document.createElement('div');
        bodyTag.appendChild(containerDiv);
        containerDiv.id = 'mtintel-container';
        containerDiv.innerHTML = '<div id="mtintel-wrapper"><div class="navbar">'+
        '<div class="navbar-inner"><span class="close-button">x</span></div><h2 class="heading">Optimizely Campaigns</h2>'+
        '</div><table class="table total-numbers"><thead><tr><th>Experiments'+
        '</th><th>Variations</th><th>Active</th></tr></thead><tbody><tr>'+
        '<td class="total-exp"></td><td class="total-var"></td><td class="total-active">'+
        '</td></tr></tbody></table><table class="table table-bordered table-striped table-1'+
        ' data-table"><thead><tr><th class="th-1">Experiment Name</th><th class="th-2">'+
        'Variations</th><th class="th-3">Active</th></tr></thead><tbody '+
        'class="exp-data-table-body"></tbody></table><div class="not-a-sucker"'+
        ' style="display:none">Not an Optimizely user.</div></div>';
    }
};


optiIntel.insertData = function(optiData) {
    $('.total-exp').html(optiData.totalExp); 
    $('.total-var').html(optiData.totalVariations);
    $('.total-active').html(optiData.totalActive);

    var expDataTable = $('.exp-data-table-body');
    for (var i =0; i < optiData.length; i++) {
        var expRow = document.createElement('tr');
        expRow.className = 'exp-data-row';

        var variationNames = getVariationHtml(optiData[i].variation_names);

        expRow.innerHTML= '<td class="exp-name">'+ optiData[i].name +'</td>'+
                      '<td class="var-name">'+ variationNames.outerHTML + '</td>'+
                      '<td class="isactive">'+ optiData[i].enabled +'</td>';
        expDataTable.append(expRow);
    }

    function getVariationHtml(variationNames){
        var variationUl = document.createElement('ul');
        variationUl.className = "variations-list";
        for (var k = 0; k < variationNames.length; k++) {
            var variationLi = document.createElement('li');
            variationLi.innerHTML = variationNames[k];
            variationUl.appendChild(variationLi);
        }
        return variationUl;
    }
};

optiIntel.notAnOptiUser = function() {
    $('.total-numbers').hide();
    $('.data-table').hide();
    $('.not-a-sucker').show();

};

optiIntel.init = function () {
    optiIntel.detectOptiExperiments();
}();