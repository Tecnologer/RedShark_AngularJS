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
	var timerSong;
	var timerSongPause=false;
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
			duration: "4:04",
			playClass: false
		},
		{
			title: "Engel",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Engel.mp3",
			duration: "4:24",
			playClass: false
		},
		{
			title: "Bestrafe Mich",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Bestrafe Mich.mp3",
			duration: "3:38",
			playClass: false
		},
		{
			title: "Tier",
			artist: "Rammstein",
			album: "Default",
			file: "media/Rammstein/Default/Tier.mp3",
			duration: "3:47",
			playClass: false
		}
	];
	$scope.current_songFile=$scope.songs[$scope.current_song].file;
	$('#audio_tag').load();

	$scope.play=function(){
		$scope.current_songFile=$scope.songs[$scope.current_song].file;
		$('#audio_tag').load();
		$interval(function(){
			$('#audio_tag')[0].play();
		},100,1);
		$scope.songs[$scope.current_song].playClass=true;
		$scope.isPlaying=true;
		$scope.setTime(!timerSongPause);
	};

	$scope.pause=function(){
		$('#audio_tag')[0].pause();
		$scope.isPlaying=false;
		$scope.pauseTimer();
		timerSongPause=true;
	};

	$scope.next=function(){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song++;
		if($scope.current_song>=$scope.songs.length)
			$scope.current_song=0;

		timerSongPause=false;
		$interval.cancel(timerSong);
		$scope.play();
	};

	$scope.previous=function(){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song--;

		if($scope.current_song<0)
			$scope.current_song=$scope.songs.length;

		timerSongPause=false;
		$interval.cancel(timerSong);
		$scope.play();
	};

	$scope.playSong=function(index){
		$scope.songs[$scope.current_song].playClass=false;
		$scope.current_song=index;
		$interval.cancel(timerSong);
		timerSongPause=false;
		$scope.play();
	};

	$scope.setTime=function(reset){
		$('.progress-bar').css('width','0%');
		var duration=$scope.songs[$scope.current_song].duration;
			duration=duration.split(":");
		var minutes=Number(duration[0])*60000;
		var seconds=Number(duration[1])*1000;
		var time=minutes+seconds;
		var repeats=time/1000;
		if(reset)
			$scope.currentTime=0;

		timerSong=$interval(function(){
			$scope.currentTime+=1000;
			var percent=($scope.currentTime/time)*100;
			$('.progress-bar').css('width',percent+'%');
			millisToMinutes($scope.currentTime);
		},999,repeats);
	};

	$scope.pauseTimer=function(){
		$interval.cancel(timerSong);
	};

	$scope.setCurrentTime=function(event){
		$interval.cancel(timerSong);
		var divLength=angular.element(event.target)[0].offsetWidth;
		var click=event.offsetX;
		var duration=$scope.songs[$scope.current_song].duration;
			duration=duration.split(":");
		var minutes=Number(duration[0])*60000;
		var seconds=Number(duration[1])*1000;
			duration=minutes+seconds;
		var percent=click/divLength;
		$('.progress-bar').css('width',(percent*100)+'%');
		$scope.currentTime=duration*percent;
		$scope.setTime();
		$('#audio_tag')[0].currentTime = $scope.currentTime/1000;
		$('#audio_tag')[0].play();
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