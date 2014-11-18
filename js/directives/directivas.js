/**
	
*/

(function(){
	window.validation={};
	var app=angular.module("directivas",['redFactorys']);
	var lastDir='';

	
	/**
		Autor: Rey David Dominguez
		Fecha: 14/10/2014
		Crea una pantalla de espera
	*/
	app.directive('redWaitscreen',function(){
		return{
			restrict: 'E',
			template: '<div id="divBloqueo" style="display:none;text-align:center; position:absolute; top:0px; left:0px; width:100%; height:150%; z-index:999; background-image:  url(images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x;background:rgba(170,170,170, 0.5)">'
      					+'<div id="subDivBloqueo" style="margin-top:200px;opacity:1;text-align:center;background: none;width:400px;margin-left:auto;margin-right:auto;">'
        					+'<font color="#0000CC" face="Verdana" size="5"><span id="lb_mensajeEspera"></span></font><br>  '
        					+'<img class="imgEspera" src="img/espera.gif" alt="Cargando, favor de esperar"  height="150px" width="150px"/>'
      					+'</div>'
    				+'</div>',
			link:function(scope,element){

				window.fnc_showWaitScreen=function(msg){
					if(msg)
						$('#lb_mensajeEspera').html(msg);
					else
						$('#lb_mensajeEspera').html("Cargando");

					$('#divBloqueo').css('display','');
				};

				window.fnc_closeWaitScreen=function(){
					$('#divBloqueo').css('display','none');
				};

				window.fnc_waitScreenIsVisble=function(){
					return $('#divBloqueo').css('display')==''?true:false;
				};
			}
		};
	});
	
	/**
		Autor: Rey David Dominguez
		Fecha: 14/10/2014
		Crea y muestra diferentes alertas para mostrar mensajes
	*/
	app.directive('redAlert',['$interval',function($interval){
			return{
				restrict: 'E',
				template: '<div id="divBloqueoAlert" style="display:none;text-align:center; position:absolute; top:0px; left:0px; width:100%; height:150%; z-index:999;background:rgba(170,170,170,0.4)">'
	      					+'<div id="subDivAlert" class="modal-content" style="position: relative; width:500px;margin-left:auto;margin-right:auto;margin-top:220px;">'
	        					
	      					+'</div>'
	    				+'</div>',
				link:function(scope,element){
					
					var _fnc_success='';

					window.fnc_showAlert=function(msg,type,delay,fnc){
						clearAlert();
						_fnc_success=fnc?fnc:false;
						$('#divMensaje').html('<div style="display: table-cell;vertical-align: middle;">'+msg+'</div>');
						var clase='';
						if(type=='danger')
							clase='alert alert-danger';
						else if(type=='success')
							clase='alert alert-success';						
						else if(type=='warning')
							clase='alert alert-warning';
						else
							clase='alert alert-info';
	
						$('#divMensaje').attr('class',clase);
						$('#divBloqueoAlert').css('display','');
						$('#divFooterAlert').html('<button class="btn btn-primary" onclick="fnc_closeAlert()">Aceptar</button>');
						if(type=='success')
						{
							$('#divFooterAlert').css('display','none');
							if(!delay || isNaN(delay) || delay==0)
								delay=1;

							$interval(function(){
								fnc_closeAlert()
							},delay*1000,1);
						}
						else
							$('#divFooterAlert').css('display','');
					};

					window.fnc_showErrorDetail=function(msg,detail){
						clearAlert();
						$('#divMensaje').html('<div style="display: table-cell;vertical-align: middle;">'+msg+getDivDetail(detail)+'</div>');
						var clase='alert alert-danger';
						
	
						$('#divMensaje').attr('class',clase);
						$('#divBloqueoAlert').css('display','');
						$('#divFooterAlert').html('<button class="btn btn-primary" onclick="fnc_closeAlert()">Aceptar</button>');
						$('#divFooterAlert').css('display','');
					};

					function clearAlert(){
						$('#subDivAlert').html('<div id="divMensaje" style="margin:10px;min-height: 100px;font-size: medium;display: table;width: 95%;"></div>'
							    +'<div id="divFooterAlert" class="modal-footer"></div>');
					};

					function getDivDetail(detail){
						var detalle='';
						if(detail && $.isPlainObject(detail))
						{
							detail='<b>Detalle:</b> '+detail.DETAIL+'<br>'
										+'<br><b>Archivo:</b> '+detail.ARCHIVO+'<br>'
										+'<br><b>Linea:</b> '+detail.LINE+'<br>'
										+'<br><b>SQL:</b> '+detail.SQL;
							detalle='<div onclick="_fnc_showAlertDetail()"  style="cursor:pointer;border-bottom: solid 1px #a94442">'
										+'Ver detalle'
										+'<button id="btnShow" class="btn-icon15p btn-show15p" ng-class="clase" ></button>'
									+'</div><br>'
									+'<div style="display:none" id="divAlertDtail">'
										+detail
									+'</div>'
						}

						var div='<br><br><div style="text-align: left;font-size: 12px;">'
									+detalle									
								+'</div>';

						return div;
					};

					window._fnc_showAlertDetail=function(){
							// $('#divAlertDtail').toggle();

							if($( "#btnShow" ).hasClass( "btn-show15p" ))
							{
								$('#divAlertDtail').show(150);
								$('#btnShow').switchClass( "btn-show15p", "btn-hide15p",150,'easeOutBack');
							}
							else
							{
								$('#divAlertDtail').hide(150);
								$('#btnShow').switchClass( "btn-hide15p", "btn-show15p",150,'easeOutBack');
							}
					};

					window.fnc_showConfirm=function(msg,fnc_success){
						clearAlert();
						$('#divMensaje').html('<div style="display: table-cell;vertical-align: middle;">'+msg+'</div>');
						$('#divFooterAlert').html('<button class="btn btn-primary" onclick="fnc_closeConfirm(true)">Aceptar</button><button class="btn btn-warning" onclick="fnc_closeConfirm(false)">Cancelar</button>');
						$('#divBloqueoAlert').css('display','');
						_fnc_success=fnc_success;
					};

					window.fnc_closeConfirm=function(confirm){
						fnc_closeAlert();
						_fnc_success(confirm);
					};

					window.fnc_closeAlert=function(){
						$('#divBloqueoAlert').css('display','none');
						if(_fnc_success)
							_fnc_success();
					};
				}
			};
	}]);
	
	
	
	app.directive('redFilemodel', ['$parse','redProxy', function ($parse,redProxy) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.redFilemodel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                	if(!attrs.multiple)
	                    	modelSetter(scope, element[0].files[0]);
	                    else
	                    	modelSetter(scope, element[0].files);
	                });
	            });

	            window.fnc_uploadFiles=function(files,index,dir,names){
	            	if(names[index])
	            	{
	            		name=names[index];
			        	name=name+'.'+fnc_getExtFile(files[index]);
	            	}
	            	else
	            		name=files[index].name;

		            redProxy.fileUpload(name,files[index], dir).success(function(data){                
		                if(!data.ISOK)
		                    fnc_showErrorDetail(data.MSG,data.CFCATCH);
		                else if((index+1)<files.length)
		                    fnc_uploadFiles(files,index+1,dir,names);
		                else
		                {
		                    fnc_showAlert(data.MSG,'success');
		                    element.val(null);
		                }
		            });
		        };

		        window.fnc_uploadFile=function(file,dir,name){
		        	if(!name)
		        		name=file.name;
		        	else
			        	name=name+'.'+fnc_getExtFile(file);

		            redProxy.fileUpload(name,file, dir).success(function(data){                
		                if(!data.ISOK)
		                    fnc_showErrorDetail(data.MSG,data.CFCATCH);
		                else
		                {
		                    fnc_showAlert(data.MSG,'success');
		                    element.val(null);
		                }
		            });
		        };

		        window.fnc_deleteFile=function(file){
					redProxy.fileDelete(file).success(function(data){                
		                if(!data.ISOK)
		                    fnc_showErrorDetail(data.MSG,data.CFCATCH);
		                else
		                    fnc_showAlert(data.MSG,'success');
		            });
		        };

		        window.fnc_getExtFile=function(file){
		        	if(!file)
		        		return '';

		        	var ext=file.name.split('.');
			        	ext=ext[ext.length-1];

			        return ext;
		        }
	        }
	    };
	}]);

	
})();