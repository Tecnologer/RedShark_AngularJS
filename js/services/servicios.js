var _services=angular.module('redFactorys',[]);

_services.service('redProxy', ['$http',function($http){

	this.invoke=function(component,method,arguments){
		if(!arguments)
			arguments={};

		return $http(
				{
					url: "componentes/cfproxy.cfc?method=proxy",
					method: 'POST',
					data:{
						component: component,
						execMethod: method,
						argumentcollection: arguments
					}
				}
			);
	};

	this.fileUpload=function(nb_archivo, file, uploadUrl){
		
		verifLoggin();

        // fnc_showWaitScreen("Subiendo archivo");
		var fd = new FormData();
        fd.append('fileField', file);
        fd.append('nb_archivo',nb_archivo);
        fd.append('de_PathDestino',uploadUrl);

        // var p='nb_archivo='+nb_archivo
        // 	  +'&fileField='+file
        // 	  +'&de_PathDestino='+uploadUrl;
        // return this.invoke('uploadfile','subirArchivo',{nb_archivo:nb_archivo,fileField: file, de_PathDestino: uploadUrl});
        return $http.post("componentes/uploadfile.cfc?method=subirArchivo", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
	};

	this.fileDelete=function(file){
		var fd = new FormData();
        fd.append('file', file);
        return $http.post("componentes/uploadfile.cfc?method=deleteFile", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
	};
	return this;
}]);
