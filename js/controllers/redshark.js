var app=angular.module('redshark',['directivas',"redFactorys",'angularFileUpload']);

app.controller('reproductor',["$scope","$interval", 'FileUploader',function($scope,$interval, FileUploader){
	var uploader = $scope.uploader = new FileUploader({
            url: 'componentes/funciones/upload.php'
    });

	uploader.filters.push({
            name: 'customFilter',
            fn: function(audio /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 100;
            }
    });

	uploader.onCompleteAll = function() {
        uploader.queue.splice(0);
        fnc_showAlert("Archivos cargados correctamente",'success');
    };

	$('#tag_audio').bind('ended', function(){
		$scope.next();
	});
	$scope.current_song=0;
	$scope.shoCurrentTime='0:00';
	$scope.songs=[
		{
			title: "Du Hast",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Du Hast.mp3",
			duration: "3:55",
			playClass: false
		},
		{
			title: "Sehnsucht",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Sehnsucht.mp3",
			duration: "3:55",
			playClass: false
		},
		{
			title: "Engel",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Engel.mp3",
			duration: "3:55",
			playClass: false
		},
		{
			title: "Bestrafe Mich",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Bestrafe Mich.mp3",
			duration: "3:55",
			playClass: false
		}
	];

	$scope.play=function(previous){
		$scope.current_songFile=$scope.songs[$scope.current_song].file;
		$('#audio_tag').load();
		$interval(function(){
			$('#audio_tag')[0].play();
		},100,1);

		// console.log(angular.element($("#songRow_"+$scope.current_song)));
		// $("#songRow_"+$scope.current_song).attr('class','playing');
		$scope.songs[$scope.current_song].playClass=true;
		$scope.isPlaying=true;
		$scope.setTime()
	};

	$scope.pause=function(){
		$('#audio_tag')[$scope.current_song].pause();
		$scope.isPlaying=false;
	};

	$scope.next=function(){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song++;
		if($scope.current_song>=$scope.songs.length)
			$scope.current_song=0;

		$scope.play();
	};

	$scope.previous=function(){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song--;

		if($scope.current_song<0)
			$scope.current_song=$scope.songs.length;

		// $('#audio_tag')[$scope.current_song].play();
		$scope.play();
	};

	$scope.playSong=function(index){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song=index;
		$scope.play();
	};

	$scope.setTime=function(){
		$('.progress-bar').css('width','0%');
		var duration=$scope.songs[$scope.current_song].duration;
			duration=duration.split(":");
		var minutes=angular.fromJson(duration[0])*60000;
		var seconds=angular.fromJson(duration[1])*1000;
		var time=minutes+seconds;
		var repeats=time/1000;
		var currentTime=0;
		$interval(function(){
			currentTime+=1000;
			var percent=(currentTime/time)*100;
			$('.progress-bar').css('width',percent+'%');
			millisToMinutes(currentTime);
		},999,repeats);
	};

	$scope.deleteFile=function(item){
		uploader.queue.splice(uploader.queue.indexOf(item),1);
	};	

	var millisToMinutes=function (millis) {
	  var minutes = Math.floor(millis / 60000);
	  var seconds = ((millis % 60000) / 1000).toFixed(0);
	  $scope.shoCurrentTime=minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
}]);