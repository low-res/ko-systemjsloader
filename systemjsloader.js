define([
    'knockout'
], function( ko ){

    // add SystemJS loader to knockout in order
    // to load components with SystemJS
    var systemJSloader = {
        loadComponent: function(componentName, templateConfig, callback){
            if( templateConfig.systemjs ) {
                console.log( "load", templateConfig.systemjs );
                if( SystemJS ) {
                    SystemJS.import(templateConfig.systemjs)
                        .then( function( comp ) {
                            console.log( "loaded", comp );
                            var createViewModel = comp.viewModel.createViewModel ? comp.viewModel.createViewModel : function(params, componentInfo){ return comp.viewModel(params, componentInfo); }
                            callback({
                                createViewModel: createViewModel,
                                template: ko.utils.parseHtmlFragment( comp.template )
                            });
                        });
                } else {
                    console.error( "No SystemJS available. Is needed to load component "+ componentName );
                }
            }
        }
    };
    ko.components.loaders.unshift( systemJSloader );

});