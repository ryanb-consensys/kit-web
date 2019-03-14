;
(function (window,$) {
    var ost = ns('ost'),
        transactions_and_ost_volume = ns('ost.transactions_and_ost_volume'),//TODO create one ns with 2 keys config and filtermap
        transaction_by_type         = ns('ost.transaction_by_type'),//TODO create one ns with 2 keys config and filtermap
        transaction_by_name         = ns('ost.transaction_by_name'),//TODO create one ns with 2 keys config and filtermap
        utilities                   =  ns("ost.utilities"),

        transactions_and_ost_volume_config = transactions_and_ost_volume['config'],
        filterOptionsMap                   = transactions_and_ost_volume['filterOptionsMap'],  //TODO change to specific name
        jTransactionsAndOstVolumeIntervals = $('.transactions_and_ost_volume .interval'), //TODO 3 different for each ,  and name change
        jTransactionsByNameIntervals       = $('.transaction_by_name .interval');
    var oThis = ost.dashboard = {
      init: function (config) {
          $.extend(oThis,config);
          oThis.initCharts();
          oThis.bindActions();
      },

      initCharts: function(){
        oThis.transactionAndOstVolumeGraph = new GoogleCharts();
        oThis.transactionByNameGraph = new GoogleCharts();
        oThis.drawTransactionAndOstVolumeGraph() ;
        //oThis.drawTransactionByTypeGraph() ;
        oThis.drawTransactionByNameGraph() ;
      },

      drawTransactionAndOstVolumeGraph: function (filter) { //TODO Name change to draw
        var config = $.extend(true , {} , transactions_and_ost_volume_config ),
            url = oThis.getAjaxUrl( oThis.transactions_and_ost_volume_url , filter) ,
            ajax = utilities.deepGet( config , 'ajax' )
        ;
        console.log('ajax',transactions_and_ost_volume_config['ajax']);
        ajax['url'] = url ;

        if(filter){
          var hAxis = utilities.deepGet( config , 'options.hAxis' ),
              gridlines = hAxis['gridlines'] ,
              columns = config['columns']
          ;
          gridlines['count'] = filterOptionsMap[filter].count;
          hAxis['format']=filterOptionsMap[filter].format;
          columns[0] = filterOptionsMap[filter].columns_1;
        }

        oThis.transactionAndOstVolumeGraph.draw( config );
      },

      drawTransactionByTypeGraph : function () {
        //TODO
      },

      drawTransactionByNameGraph : function (filter) {
        //TODO
        var config = $.extend(true , {} , transaction_by_name ),
          url = oThis.getAjaxUrl( oThis.transaction_by_name_url , filter) ,
          ajax = utilities.deepGet( config , 'ajax' )
        ;
        console.log('ajax',transactions_and_ost_volume_config['ajax']);
        ajax['url'] = url ;

        // if(filter){
        //   var hAxis = utilities.deepGet( config , 'options.hAxis' ),
        //     gridlines = hAxis['gridlines'] ,
        //     columns = config['columns']
        //   ;
        //   gridlines['count'] = filterOptionsMap[filter].count;
        //   hAxis['format']=filterOptionsMap[filter].format;
        //   columns[0] = filterOptionsMap[filter].columns_1;
        // }

        oThis.transactionByNameGraph.draw( config );
      },

      getAjaxUrl: function (api ,  val ) {
         if(!val && api.indexOf('graph_duration') < 0 ){
           var url = api + '?graph_duration=day';
           return url;
           console.log("url",url);
         }else {
           var url = api + '?graph_duration=' + val;
           return url
           console.log("url", url);
         }
      },


      bindActions :function () {
        jTransactionsAndOstVolumeIntervals.on('click',function (event) {
          jTransactionsAndOstVolumeIntervals.removeClass('active');
          $(this).addClass('active');
          oThis.drawTransactionAndOstVolumeGraph( $(this).data('interval'));
        });

        jTransactionsByNameIntervals.on('click',function (event) {
          jTransactionsByNameIntervals.removeClass('active');
          $(this).addClass('active');
          oThis.drawTransactionByNameGraph($(this).data('interval'));
        })
      }




    }




  }(window,jQuery)
)