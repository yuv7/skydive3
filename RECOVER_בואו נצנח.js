(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"RECOVER_בואו נצנח_atlas_1", frames: [[0,0,1563,1034]]},
		{name:"RECOVER_בואו נצנח_atlas_2", frames: [[1132,0,825,943],[0,0,1130,1108],[0,1110,1161,645]]},
		{name:"RECOVER_בואו נצנח_atlas_3", frames: [[0,0,1380,490],[0,1251,1146,487],[0,876,1563,373],[0,492,1563,382]]},
		{name:"RECOVER_בואו נצנח_atlas_4", frames: [[0,928,870,325],[1031,1255,734,367],[872,928,870,325],[0,355,1563,243],[0,600,870,326],[736,1624,734,366],[0,1519,734,367],[872,600,870,326],[0,0,1563,353],[0,1255,1029,262]]},
		{name:"RECOVER_בואו נצנח_atlas_5", frames: [[1571,609,58,45],[1016,141,95,77],[350,513,168,46],[1365,540,171,30],[203,558,75,64],[1954,304,73,219],[1744,0,229,214],[2027,173,21,18],[1666,609,47,44],[1365,572,64,60],[1165,306,378,232],[1765,616,34,35],[1016,220,8,8],[1016,0,726,139],[1026,220,8,8],[1120,560,24,25],[1886,621,34,35],[1120,587,22,16],[1714,216,261,86],[1288,540,75,72],[500,602,50,59],[1113,141,48,82],[0,233,1163,137],[1812,510,103,71],[604,513,40,145],[2025,104,18,32],[668,372,153,114],[342,614,38,53],[0,372,173,184],[2027,213,10,16],[823,372,153,114],[668,488,150,88],[350,372,157,139],[2027,193,14,18],[509,372,157,139],[820,488,150,88],[875,623,41,24],[1288,614,48,39],[175,372,173,184],[1917,525,68,94],[1513,609,56,51],[1147,540,68,94],[1715,616,48,39],[918,623,43,22],[1513,572,24,24],[1886,583,24,24],[1714,141,25,31],[1545,510,93,97],[2025,54,17,48],[1922,621,44,23],[2025,0,19,52],[1631,609,33,77],[382,614,40,50],[972,560,72,62],[142,558,59,82],[646,513,20,21],[1640,510,93,97],[875,578,72,43],[646,578,35,102],[1812,583,72,43],[424,614,40,50],[683,578,76,46],[1545,306,407,202],[0,558,69,71],[1431,572,39,92],[1472,572,39,92],[342,561,77,51],[421,561,77,51],[1714,174,25,31],[761,578,76,46],[2027,138,17,33],[203,624,40,22],[71,558,69,71],[1046,560,72,62],[552,602,34,76],[1735,510,75,104],[978,372,167,92],[1217,540,69,85],[978,466,167,92],[1975,0,48,138],[520,513,82,87],[1977,140,48,138],[1977,280,69,18],[1165,141,547,163],[280,558,60,79],[839,578,34,101],[1987,525,40,145],[1120,605,22,16],[963,624,50,16],[0,0,1014,231]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_23 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Group = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Group_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.Group_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Group_4 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Group_5 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_4 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Group_10 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Group_10_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.Group_11 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.Group_11_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.Group_12 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.Group_10_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.Group_12_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.Group_13 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Group_13_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.Group_13_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.Group_12_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.Group_14 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.Group_14_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.Group_11_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.Group_15 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.Group_15_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.Group_15_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.Group_14_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.Group_16 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.Group_16_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.Group_16_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.Group_17 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.Group_19 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.Group_18 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.Group_17_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.Group_19_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.Group_18_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_4 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_5 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_6 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.Group_19_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.Group_20 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_5 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.Group_20_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.Group_2_7 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.Group_21 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.Group_22 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.Group_23 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.Group_23_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.Group_24 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.Group_24_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.Group_17_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.Group_21_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.Group_3_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.Group_3_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Group_4_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Group_3_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_6 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.Group_4_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Group_5_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Group_22_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.Group_18_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.Group_5_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Group_6 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Group_6_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.Group_7 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.Group_8 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.Group_8_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.Group_8_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.Group_9 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.Group_9_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.Group_9_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.Group_21_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.initialize(img.Path);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3126,1487);


(lib.PathGroup = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Path_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Path_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.PathPathPathPath = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.PathGroup_1 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.PathPath = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.Group_5_3 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_7 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.Group_3_4 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.Group_20_2 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["RECOVER_בואו נצנח_atlas_5"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_2_4();
	this.instance.setTransform(-345.65,-133.95,0.5009,0.5467);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-345.6,-133.9,691.3,267.9);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_2();
	this.instance.setTransform(0,0,0.8216,0.7245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,214.5,62.3), null);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_1_1();
	this.instance.setTransform(0,0,0.2978,0.2484);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,259.1,80.8), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_2_4();
	this.instance.setTransform(0,0,0.3824,0.3518);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,527.7,172.4), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_4_1();
	this.instance.setTransform(0,0,0.4552,0.2345);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,334.1,86.1), null);


(lib.plane = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(505.4,113.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_22();
	this.instance_1.setTransform(404.85,170.95,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_21();
	this.instance_2.setTransform(367.25,47.5,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_20();
	this.instance_3.setTransform(312.6,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_19();
	this.instance_4.setTransform(284.4,4.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_18();
	this.instance_5.setTransform(7.95,157.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_17();
	this.instance_6.setTransform(391.95,89.2,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_16();
	this.instance_7.setTransform(144.35,130.85,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_15();
	this.instance_8.setTransform(0,87.1,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_14();
	this.instance_9.setTransform(2.75,65.4,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_13();
	this.instance_10.setTransform(89.75,220.1,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_12();
	this.instance_11.setTransform(83.15,214.25,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_11();
	this.instance_12.setTransform(78.8,209.7,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_10();
	this.instance_13.setTransform(448.05,214.75,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_9();
	this.instance_14.setTransform(444,210.35,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_8();
	this.instance_15.setTransform(441.5,207.8,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_7();
	this.instance_16.setTransform(427.85,219.05,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_9();
	this.instance_17.setTransform(423.8,214.95,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_5();
	this.instance_18.setTransform(421.3,212.45,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_4();
	this.instance_19.setTransform(402.7,176.9,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_3();
	this.instance_20.setTransform(70.35,192.8,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_2();
	this.instance_21.setTransform(78.1,193.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.plane, new cjs.Rectangle(0,0,534.4,239.7), null);


(lib.parachute_open = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_6();
	this.instance.setTransform(0,0,0.0337,0.0253);

	this.instance_1 = new lib.Group_5_1();
	this.instance_1.setTransform(1,7,0.0337,0.0253);

	this.instance_2 = new lib.Group_4_2();
	this.instance_2.setTransform(0,5,0.0337,0.0253);

	this.instance_3 = new lib.Group_3_3();
	this.instance_3.setTransform(11,12,0.0337,0.0253);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.parachute_open, new cjs.Rectangle(0,0,39.1,35.9), null);


(lib.diver15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_24();
	this.instance.setTransform(75.15,42.45,0.3636,0.4204,0,48.7022,41.2941);

	this.instance_1 = new lib.Group_24();
	this.instance_1.setTransform(88.8,43.1,0.276,0.2905,0,48.7034,41.2968);

	this.instance_2 = new lib.Group_23();
	this.instance_2.setTransform(91.3,57.95,0.276,0.2905,0,48.7034,41.2968);

	this.instance_3 = new lib.Group_22_1();
	this.instance_3.setTransform(80.85,31.8,0.276,0.2905,0,48.7034,41.2968);

	this.instance_4 = new lib.Group_21();
	this.instance_4.setTransform(109.8,37.45,0.276,0.2905,0,48.7034,41.2968);

	this.instance_5 = new lib.Group_20();
	this.instance_5.setTransform(109.8,37.45,0.276,0.2905,0,48.7034,41.2968);

	this.instance_6 = new lib.Group_19();
	this.instance_6.setTransform(116.2,28.95,0.276,0.2905,0,48.7034,41.2968);

	this.instance_7 = new lib.Group_18_2();
	this.instance_7.setTransform(96.9,41.7,0.276,0.2905,0,48.7034,41.2968);

	this.instance_8 = new lib.Group_17();
	this.instance_8.setTransform(81.6,0,0.276,0.2905,0,48.7034,41.2968);

	this.instance_9 = new lib.Group_16_2();
	this.instance_9.setTransform(125.1,76.35,0.276,0.2905,0,48.7034,41.2968);

	this.instance_10 = new lib.Group_15();
	this.instance_10.setTransform(113.05,34.65,0.276,0.2905,0,48.7034,41.2968);

	this.instance_11 = new lib.Group_14_2();
	this.instance_11.setTransform(30.9,7.75,0.276,0.2905,0,48.7034,41.2968);

	this.instance_12 = new lib.Group_13();
	this.instance_12.setTransform(80.85,5,0.276,0.2905,0,48.7034,41.2968);

	this.instance_13 = new lib.Group_12_2();
	this.instance_13.setTransform(93.75,53,0.276,0.2905,0,48.7034,41.2968);

	this.instance_14 = new lib.Group_11_2();
	this.instance_14.setTransform(70.35,25.45,0.276,0.2905,0,48.7034,41.2968);

	this.instance_15 = new lib.Group_10_2();
	this.instance_15.setTransform(26.1,43.1,0.276,0.2905,0,48.7034,41.2968);

	this.instance_16 = new lib.Group_9();
	this.instance_16.setTransform(30.1,15.55,0.276,0.2905,0,48.7034,41.2968);

	this.instance_17 = new lib.Group_8();
	this.instance_17.setTransform(22.8,27.55,0.276,0.2905,0,48.7034,41.2968);

	this.instance_18 = new lib.Group_2_7();
	this.instance_18.setTransform(38.95,28.95,0.276,0.2905,0,48.7034,41.2968);

	this.instance_19 = new lib.Group_1_4();
	this.instance_19.setTransform(32.5,36.05,0.276,0.2905,0,48.7034,41.2968);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.diver15, new cjs.Rectangle(0,0,135.5,97.2), null);


(lib.diver1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_5();
	this.instance.setTransform(57,34,0.2887,0.2606);

	this.instance_1 = new lib.Group_24_1();
	this.instance_1.setTransform(68,26,0.2887,0.2606);

	this.instance_2 = new lib.Group_23_1();
	this.instance_2.setTransform(82,34,0.2887,0.2606);

	this.instance_3 = new lib.Group_22();
	this.instance_3.setTransform(53,22,0.2887,0.2606);

	this.instance_4 = new lib.Group_21_1();
	this.instance_4.setTransform(78,10,0.2887,0.2606);

	this.instance_5 = new lib.Group_20_1();
	this.instance_5.setTransform(80,10,0.2887,0.2606);

	this.instance_6 = new lib.Group_19_2();
	this.instance_6.setTransform(76,0,0.2887,0.2606);

	this.instance_7 = new lib.Group_18_1();
	this.instance_7.setTransform(72,20,0.2887,0.2606);

	this.instance_8 = new lib.Group_17_2();
	this.instance_8.setTransform(31,1,0.2887,0.2606);

	this.instance_9 = new lib.Group_16_1();
	this.instance_9.setTransform(119,27,0.2887,0.2606);

	this.instance_10 = new lib.Group_15_2();
	this.instance_10.setTransform(80,5,0.2887,0.2606);

	this.instance_11 = new lib.Group_14_1();
	this.instance_11.setTransform(0,36,0.2887,0.2606);

	this.instance_12 = new lib.Group_13_2();
	this.instance_12.setTransform(32,4,0.2887,0.2606);

	this.instance_13 = new lib.Group_12_1();
	this.instance_13.setTransform(80,30,0.2887,0.2606);

	this.instance_14 = new lib.Group_11_1();
	this.instance_14.setTransform(42,25,0.2887,0.2606);

	this.instance_15 = new lib.Group_10_1();
	this.instance_15.setTransform(25,63,0.2887,0.2606);

	this.instance_16 = new lib.Group_9_2();
	this.instance_16.setTransform(6,42,0.2887,0.2606);

	this.instance_17 = new lib.Group_8_2();
	this.instance_17.setTransform(12,55,0.2887,0.2606);

	this.instance_18 = new lib.Group_2_2();
	this.instance_18.setTransform(23,46,0.2887,0.2606);

	this.instance_19 = new lib.Group_1_7();
	this.instance_19.setTransform(25,55,0.2887,0.2606);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.diver1, new cjs.Rectangle(0,0,126,92.8), null);


(lib.divdiv = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_21_2();
	this.instance.setTransform(26,48,0.4322,0.5481);

	this.instance_1 = new lib.Group_20_2();
	this.instance_1.setTransform(30,34,0.4322,0.5481);

	this.instance_2 = new lib.Group_19_1();
	this.instance_2.setTransform(49,32,0.4322,0.5481);

	this.instance_3 = new lib.Group_18();
	this.instance_3.setTransform(25,35,0.4322,0.5481);

	this.instance_4 = new lib.Group_17_1();
	this.instance_4.setTransform(30,11,0.4322,0.5481);

	this.instance_5 = new lib.Group_16();
	this.instance_5.setTransform(30,12,0.4322,0.5481);

	this.instance_6 = new lib.Group_15_1();
	this.instance_6.setTransform(27,0,0.4322,0.5481);

	this.instance_7 = new lib.Group_14();
	this.instance_7.setTransform(31,26,0.4322,0.5481);

	this.instance_8 = new lib.Group_13_1();
	this.instance_8.setTransform(0,4,0.4322,0.5481);

	this.instance_9 = new lib.Group_12();
	this.instance_9.setTransform(72,2,0.4322,0.5481);

	this.instance_10 = new lib.Group_11();
	this.instance_10.setTransform(31,6,0.4322,0.5481);

	this.instance_11 = new lib.Group_10();
	this.instance_11.setTransform(39,146,0.4322,0.5481);

	this.instance_12 = new lib.Group_9_1();
	this.instance_12.setTransform(2,9,0.4322,0.5481);

	this.instance_13 = new lib.Group_8_1();
	this.instance_13.setTransform(45,7,0.4322,0.5481);

	this.instance_14 = new lib.Group_7();
	this.instance_14.setTransform(24,32,0.4322,0.5481);

	this.instance_15 = new lib.Group_6_1();
	this.instance_15.setTransform(39,111,0.4322,0.5481);

	this.instance_16 = new lib.Group_5_3();
	this.instance_16.setTransform(40,75,0.4322,0.5481);

	this.instance_17 = new lib.Group_3_1();
	this.instance_17.setTransform(25,144,0.4322,0.5481);

	this.instance_18 = new lib.Group_2_1();
	this.instance_18.setTransform(25,110,0.4322,0.5481);

	this.instance_19 = new lib.Group_1_5();
	this.instance_19.setTransform(26,74,0.4322,0.5481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.divdiv, new cjs.Rectangle(0,0,76.3,163.6), null);


(lib.cloud11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_5_2();
	this.instance.setTransform(0,0,0.2566,0.3829);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud11, new cjs.Rectangle(0,0,223.3,124.8), null);


(lib.cloud10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group();
	this.instance.setTransform(0,0,0.4026,0.3664);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud10, new cjs.Rectangle(0,0,350.3,119.1), null);


(lib.cloud9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_2_4();
	this.instance.setTransform(0,0,0.3824,0.3518);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud9, new cjs.Rectangle(0,0,527.7,172.4), null);


(lib.cloud8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_1_1();
	this.instance.setTransform(0,0,0.2978,0.2484);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud8, new cjs.Rectangle(0,0,259.1,80.8), null);


(lib.cloud7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_1_1();
	this.instance.setTransform(0,0,0.2978,0.2484);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud7, new cjs.Rectangle(0,0,259.1,80.8), null);


(lib.cloud5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_3_2();
	this.instance.setTransform(0,0,0.6216,0.4235);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud5, new cjs.Rectangle(0,0,456.3,155), null);


(lib.cloud2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Group_5_2();
	this.instance.setTransform(0,0,0.5229,0.3829);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud2, new cjs.Rectangle(0,0,455,124.8), null);


(lib.cloud1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cloud1, new cjs.Rectangle(0,0,203.5,101), null);


// stage content:
(lib.RECOVER_בואונצנח = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(444));

	// cloud1
	this.instance = new lib.cloud1();
	this.instance.setTransform(352.8,328.5,1,1,0,0,0,101.8,50.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(116).to({_off:false},0).wait(1).to({y:319.8},0).wait(1).to({y:311.15},0).wait(1).to({y:302.5},0).wait(1).to({y:293.8},0).wait(1).to({y:285.15},0).wait(1).to({y:276.5},0).wait(1).to({y:267.8},0).wait(1).to({x:352.85,y:259.15},0).wait(1).to({y:250.5},0).wait(1).to({y:241.85},0).wait(1).to({y:233.15},0).wait(1).to({y:224.5},0).wait(1).to({y:215.85},0).wait(1).to({y:207.15},0).wait(1).to({y:198.5},0).wait(1).to({x:352.9,y:189.85},0).wait(1).to({y:181.15},0).wait(1).to({y:172.5},0).wait(1).to({y:163.85},0).wait(1).to({y:155.2},0).wait(1).to({y:146.5},0).wait(1).to({y:137.85},0).wait(1).to({y:129.2},0).wait(1).to({x:352.95,y:120.5},0).wait(1).to({y:111.85},0).wait(1).to({y:103.2},0).wait(1).to({y:94.55},0).wait(1).to({y:85.85},0).wait(1).to({y:77.2},0).wait(1).to({y:68.55},0).wait(1).to({x:353,y:59.85},0).wait(1).to({y:51.2},0).wait(1).to({y:42.6},0).wait(1).to({y:33.9},0).wait(1).to({y:25.25},0).wait(1).to({y:16.6},0).wait(1).to({y:7.95},0).wait(1).to({y:-0.75},0).wait(1).to({x:353.05,y:-9.4},0).wait(1).to({y:-18.05},0).wait(1).to({y:-26.75},0).wait(1).to({y:-35.4},0).wait(1).to({y:-44.05},0).wait(1).to({y:-52.75},0).wait(1).to({y:-61.4},0).wait(1).to({y:-70.05},0).wait(1).to({x:353.1,y:-78.7},0).wait(1).to({y:-87.4},0).wait(1).to({y:-96.05},0).wait(1).to({y:-104.7},0).wait(1).to({y:-113.4},0).wait(1).to({y:-122.05},0).wait(1).to({y:-130.7},0).wait(1).to({x:353.15,y:-139.4},0).to({_off:true},1).wait(273));

	// cloud10
	this.instance_1 = new lib.cloud10();
	this.instance_1.setTransform(1086.2,971.6,1,1,0,0,0,175.2,59.6);
	this.instance_1._off = true;

	this.instance_2 = new lib.Group();
	this.instance_2.setTransform(911,912,0.4026,0.3664);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},116).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[]},91).wait(157));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(116).to({_off:false},0).wait(1).to({regX:175.1,regY:59.5,x:1086.1,y:957.9},0).wait(1).to({y:944.35},0).wait(1).to({y:930.75},0).wait(1).to({y:917.2},0).wait(1).to({y:903.6},0).wait(1).to({y:890.05},0).wait(1).to({y:876.5},0).wait(1).to({y:862.9},0).wait(1).to({y:849.35},0).wait(1).to({y:835.75},0).wait(1).to({y:822.2},0).wait(1).to({y:808.6},0).wait(1).to({y:795.05},0).wait(1).to({y:781.5},0).wait(1).to({y:767.9},0).wait(1).to({y:754.35},0).wait(1).to({y:740.75},0).wait(1).to({y:727.2},0).wait(1).to({y:713.65},0).wait(1).to({y:700.05},0).wait(1).to({y:686.5},0).wait(1).to({y:672.9},0).wait(1).to({y:659.35},0).wait(1).to({y:645.75},0).wait(1).to({y:632.2},0).wait(1).to({y:618.65},0).wait(1).to({y:605.05},0).wait(1).to({y:591.5},0).wait(1).to({y:577.9},0).wait(1).to({y:564.35},0).wait(1).to({y:550.8},0).wait(1).to({y:537.2},0).wait(1).to({y:523.65},0).wait(1).to({y:510.05},0).wait(1).to({y:496.5},0).wait(1).to({y:482.9},0).wait(1).to({y:469.35},0).wait(1).to({y:455.8},0).wait(1).to({y:442.2},0).wait(1).to({y:428.65},0).wait(1).to({y:415.05},0).wait(1).to({y:401.5},0).wait(1).to({y:387.95},0).wait(1).to({y:374.35},0).wait(1).to({y:360.8},0).wait(1).to({y:347.2},0).wait(1).to({y:333.65},0).wait(1).to({y:320.05},0).wait(1).to({y:306.5},0).wait(1).to({y:292.95},0).wait(1).to({y:279.35},0).wait(1).to({y:265.8},0).wait(1).to({y:252.2},0).wait(1).to({y:238.65},0).wait(1).to({y:225.1},0).wait(1).to({y:211.5},0).wait(1).to({y:197.95},0).wait(1).to({y:184.35},0).wait(1).to({y:170.8},0).wait(1).to({y:157.2},0).wait(1).to({y:143.65},0).wait(1).to({y:130.1},0).wait(1).to({y:116.5},0).wait(1).to({y:102.95},0).wait(1).to({y:89.35},0).wait(1).to({y:75.8},0).wait(1).to({y:62.25},0).wait(1).to({y:48.7},0).wait(1).to({y:35.15},0).wait(1).to({y:21.55},0).wait(1).to({y:8},0).wait(1).to({y:-5.6},0).wait(1).to({y:-19.15},0).wait(1).to({y:-32.7},0).wait(1).to({y:-46.3},0).wait(1).to({y:-59.85},0).wait(1).to({y:-73.45},0).wait(1).to({y:-87},0).wait(1).to({y:-100.6},0).to({_off:true},1).wait(248));

	// cloud2
	this.instance_3 = new lib.cloud2();
	this.instance_3.setTransform(0,525.55);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(116).to({_off:false},0).wait(1).to({regX:227.5,regY:62.4,x:227.1,y:571.05},0).wait(1).to({x:226.65,y:554.15},0).wait(1).to({x:226.2,y:537.25},0).wait(1).to({x:225.75,y:520.35},0).wait(1).to({x:225.3,y:503.45},0).wait(1).to({x:224.9,y:486.55},0).wait(1).to({x:224.45,y:469.65},0).wait(1).to({x:224,y:452.75},0).wait(1).to({x:223.55,y:435.9},0).wait(1).to({x:223.1,y:419},0).wait(1).to({x:222.65,y:402.1},0).wait(1).to({x:222.25,y:385.2},0).wait(1).to({x:221.8,y:368.3},0).wait(1).to({x:221.35,y:351.4},0).wait(1).to({x:220.9,y:334.5},0).wait(1).to({x:220.45,y:317.6},0).wait(1).to({x:220,y:300.7},0).wait(1).to({x:219.6,y:283.85},0).wait(1).to({x:219.15,y:266.95},0).wait(1).to({x:218.7,y:250.05},0).wait(1).to({x:218.25,y:233.15},0).wait(1).to({x:217.8,y:216.25},0).wait(1).to({x:217.35,y:199.35},0).wait(1).to({x:216.95,y:182.45},0).wait(1).to({x:216.5,y:165.55},0).wait(1).to({x:216.05,y:148.65},0).wait(1).to({x:215.6,y:131.8},0).wait(1).to({x:215.15,y:114.9},0).wait(1).to({x:214.7,y:98},0).wait(1).to({x:214.3,y:81.1},0).wait(1).to({x:213.85,y:64.2},0).wait(1).to({x:213.4,y:47.35},0).wait(1).to({x:212.95,y:30.45},0).wait(1).to({x:212.5,y:13.55},0).wait(1).to({x:212.05,y:-3.35},0).wait(1).to({x:211.65,y:-20.2},0).wait(1).to({x:211.2,y:-37.1},0).wait(1).to({x:210.75,y:-54},0).wait(1).to({x:210.3,y:-70.9},0).wait(1).to({x:209.85,y:-87.8},0).wait(1).to({x:209.4,y:-104.7},0).wait(1).to({x:209,y:-121.6},0).wait(1).to({x:208.55,y:-138.5},0).wait(1).to({x:208.1,y:-155.4},0).wait(1).to({x:207.65,y:-172.25},0).wait(1).to({x:207.2,y:-189.15},0).wait(1).to({x:206.75,y:-206.05},0).wait(1).to({x:206.35,y:-222.95},0).wait(1).to({x:205.9,y:-239.85},0).wait(1).to({x:205.45,y:-256.75},0).wait(1).to({x:205,y:-244.3},0).wait(1).to({x:204.55,y:-231.85},0).wait(1).to({x:204.1,y:-219.4},0).wait(1).to({x:203.7,y:-206.95},0).wait(1).to({x:203.25,y:-194.5},0).wait(1).to({x:202.8,y:-182.05},0).wait(1).to({x:202.35,y:-177.7},0).wait(1).to({x:201.9,y:-173.35},0).wait(1).to({x:201.45,y:-169},0).wait(1).to({x:201.05,y:-164.7},0).wait(1).to({x:200.6,y:-160.35},0).wait(1).to({x:200.15,y:-156},0).wait(1).to({x:199.7,y:-151.65},0).wait(1).to({x:199.25,y:-147.3},0).wait(1).to({x:198.8,y:-142.95},0).wait(1).to({x:198.4,y:-138.65},0).wait(1).to({x:197.95,y:-134.3},0).wait(1).to({x:197.5,y:-129.95},0).wait(1).to({x:197.05,y:-125.6},0).wait(1).to({x:196.6,y:-121.25},0).wait(1).to({x:196.15,y:-116.9},0).wait(1).to({x:195.7,y:-112.6},0).wait(1).to({regX:0,regY:0,x:1014.45,y:1882.95},0).wait(1).to({regX:227.5,regY:62.4,x:1241.8,y:1923.75},0).wait(1).to({x:1241.7,y:1902.2},0).wait(1).to({x:1241.6,y:1880.6},0).wait(1).to({x:1241.5,y:1859.05},0).wait(1).to({x:1241.4,y:1837.45},0).wait(1).to({x:1241.3,y:1815.9},0).wait(1).to({x:1241.15,y:1794.3},0).wait(1).to({x:1241.05,y:1772.75},0).wait(1).to({x:1240.95,y:1751.15},0).wait(1).to({x:1240.85,y:1729.6},0).wait(1).to({x:1240.75,y:1708},0).wait(1).to({x:1240.65,y:1686.45},0).wait(1).to({x:1240.55,y:1664.9},0).wait(1).to({x:1240.4,y:1643.3},0).wait(1).to({x:1240.3,y:1621.75},0).wait(1).to({x:1240.2,y:1600.15},0).wait(1).to({x:1240.1,y:1578.6},0).wait(1).to({x:1240,y:1557},0).wait(1).to({x:1239.9,y:1535.45},0).wait(1).to({x:1239.75,y:1513.85},0).wait(1).to({x:1239.65,y:1492.3},0).wait(1).to({x:1239.55,y:1470.7},0).wait(1).to({x:1239.45,y:1449.15},0).wait(1).to({x:1239.35,y:1427.6},0).wait(1).to({x:1239.25,y:1406},0).wait(1).to({x:1239.15,y:1384.45},0).wait(1).to({x:1239,y:1362.85},0).wait(1).to({x:1238.9,y:1341.3},0).wait(1).to({x:1238.8,y:1319.7},0).wait(1).to({x:1238.7,y:1298.15},0).wait(1).to({x:1238.6,y:1276.55},0).wait(1).to({x:1238.5,y:1255},0).wait(1).to({x:1238.35,y:1233.4},0).wait(1).to({x:1238.25,y:1211.85},0).wait(1).to({x:1238.15,y:1190.25},0).wait(1).to({x:1238.05,y:1168.7},0).wait(1).to({x:1237.95,y:1147.15},0).wait(1).to({x:1237.85,y:1125.55},0).wait(1).to({x:1237.75,y:1104},0).wait(1).to({x:1237.6,y:1082.4},0).wait(1).to({x:1237.5,y:1060.85},0).wait(1).to({x:1237.4,y:1039.25},0).wait(1).to({x:1237.3,y:1017.7},0).wait(1).to({x:1237.2,y:996.1},0).wait(1).to({x:1237.1,y:974.55},0).wait(1).to({x:1236.95,y:952.95},0).wait(1).to({x:1236.85,y:931.4},0).wait(1).to({x:1236.75,y:909.85},0).wait(1).to({x:1236.65,y:888.25},0).wait(1).to({x:1236.55,y:866.7},0).wait(1).to({x:1236.45,y:845.1},0).wait(1).to({x:1236.35,y:823.55},0).wait(1).to({x:1236.2,y:808.9},0).wait(1).to({x:1236.1,y:794.3},0).wait(1).to({x:1236,y:779.65},0).wait(1).to({x:1235.9,y:765.05},0).wait(1).to({x:1235.75,y:750.4},0).wait(1).to({x:1235.65,y:735.75},0).wait(1).to({x:1235.55,y:721.15},0).wait(1).to({x:1235.45,y:706.5},0).wait(1).to({x:1235.35,y:691.9},0).wait(1).to({x:1235.2,y:677.25},0).wait(1).to({x:1235.1,y:662.65},0).wait(1).to({x:1235,y:648},0).wait(1).to({x:1234.9,y:633.4},0).wait(1).to({x:1234.75,y:618.75},0).wait(1).to({x:1234.65,y:604.1},0).wait(1).to({x:1234.55,y:589.5},0).wait(1).to({x:1234.45,y:574.85},0).wait(1).to({x:1234.35,y:560.25},0).wait(1).to({x:1234.2,y:545.6},0).wait(1).to({x:1234.1,y:531},0).wait(1).to({x:1234,y:516.35},0).wait(1).to({x:1233.9,y:501.75},0).wait(1).to({x:1233.8,y:487.1},0).wait(1).to({x:1233.65,y:472.5},0).wait(1).to({x:1233.55,y:457.85},0).wait(1).to({x:1233.45,y:443.2},0).wait(1).to({x:1233.35,y:428.6},0).wait(1).to({x:1233.2,y:413.95},0).wait(1).to({x:1233.1,y:399.35},0).wait(1).to({x:1233,y:384.7},0).wait(1).to({x:1232.9,y:370.1},0).wait(1).to({x:1232.8,y:355.45},0).wait(1).to({x:1232.65,y:340.85},0).wait(1).to({x:1232.55,y:326.2},0).wait(1).to({x:1232.45,y:311.55},0).wait(1).to({x:1232.35,y:296.95},0).wait(1).to({x:1232.2,y:282.3},0).wait(1).to({x:1232.1,y:267.7},0).wait(1).to({x:1232,y:253.05},0).wait(1).to({x:1231.9,y:238.45},0).wait(1).to({x:1231.8,y:223.8},0).wait(1).to({x:1231.65,y:209.2},0).wait(1).to({x:1231.55,y:194.55},0).wait(1).to({x:1231.45,y:179.95},0).wait(1).to({x:1231.35,y:165.3},0).wait(1).to({x:1231.2,y:150.65},0).wait(1).to({x:1231.1,y:136.05},0).wait(1).to({x:1231,y:121.4},0).wait(1).to({x:1230.9,y:106.8},0).wait(1).to({x:1230.8,y:92.15},0).wait(1).to({x:1230.65,y:77.55},0).wait(1).to({x:1230.55,y:62.9},0).wait(1).to({x:1230.45,y:48.35},0).wait(1).to({x:1230.35,y:33.7},0).wait(1).to({x:1230.2,y:19.05},0).wait(1).to({x:1230.1,y:4.45},0).wait(1).to({x:1230,y:-10.2},0).wait(1).to({x:1229.9,y:-24.8},0).wait(1).to({x:1229.8,y:-39.45},0).wait(1).to({x:1229.65,y:-54.05},0).wait(1).to({x:1229.55,y:-68.7},0).wait(1).to({x:1229.45,y:-83.3},0).wait(1).to({x:1229.35,y:-97.95},0).wait(1).to({x:1229.25,y:-112.6},0).to({_off:true},1).wait(138));

	// cloud11
	this.instance_4 = new lib.cloud11();
	this.instance_4.setTransform(169.6,948.4,1,1,0,0,0,111.6,62.4);
	this.instance_4._off = true;

	this.instance_5 = new lib.Group_5_2();
	this.instance_5.setTransform(58,886,0.2566,0.3829);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},116).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[]},91).wait(150));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(116).to({_off:false},0).wait(1).to({x:169.55,y:936.4},0).wait(1).to({x:169.5,y:924.45},0).wait(1).to({x:169.45,y:912.45},0).wait(1).to({x:169.4,y:900.5},0).wait(1).to({y:888.55},0).wait(1).to({x:169.35,y:876.55},0).wait(1).to({x:169.3,y:864.6},0).wait(1).to({x:169.25,y:852.6},0).wait(1).to({y:840.65},0).wait(1).to({x:169.2,y:828.7},0).wait(1).to({x:169.15,y:816.7},0).wait(1).to({x:169.1,y:804.75},0).wait(1).to({y:792.75},0).wait(1).to({x:169.05,y:780.8},0).wait(1).to({x:169,y:768.85},0).wait(1).to({x:168.95,y:756.85},0).wait(1).to({y:744.9},0).wait(1).to({x:168.9,y:732.9},0).wait(1).to({x:168.85,y:720.95},0).wait(1).to({x:168.8,y:709},0).wait(1).to({y:697},0).wait(1).to({x:168.75,y:685.05},0).wait(1).to({x:168.7,y:673.05},0).wait(1).to({x:168.65,y:661.1},0).wait(1).to({y:649.15},0).wait(1).to({x:168.6,y:637.15},0).wait(1).to({x:168.55,y:625.2},0).wait(1).to({x:168.5,y:613.2},0).wait(1).to({y:601.25},0).wait(1).to({x:168.45,y:589.3},0).wait(1).to({x:168.4,y:577.3},0).wait(1).to({x:168.35,y:565.35},0).wait(1).to({y:553.35},0).wait(1).to({x:168.3,y:541.4},0).wait(1).to({x:168.25,y:529.45},0).wait(1).to({x:168.2,y:517.45},0).wait(1).to({y:505.5},0).wait(1).to({x:168.15,y:493.5},0).wait(1).to({x:168.1,y:481.55},0).wait(1).to({x:168.05,y:469.6},0).wait(1).to({y:457.6},0).wait(1).to({x:168,y:445.65},0).wait(1).to({x:167.95,y:433.7},0).wait(1).to({x:167.9,y:421.7},0).wait(1).to({x:167.85,y:409.75},0).wait(1).to({y:397.75},0).wait(1).to({x:167.8,y:385.8},0).wait(1).to({x:167.75,y:373.85},0).wait(1).to({x:167.7,y:361.85},0).wait(1).to({y:349.9},0).wait(1).to({x:167.65,y:337.9},0).wait(1).to({x:167.6,y:325.95},0).wait(1).to({x:167.55,y:314},0).wait(1).to({y:302},0).wait(1).to({x:167.5,y:290.05},0).wait(1).to({x:167.45,y:278.05},0).wait(1).to({x:167.4,y:266.1},0).wait(1).to({y:254.15},0).wait(1).to({x:167.35,y:242.15},0).wait(1).to({x:167.3,y:230.2},0).wait(1).to({x:167.25,y:218.2},0).wait(1).to({y:206.25},0).wait(1).to({x:167.2,y:194.3},0).wait(1).to({x:167.15,y:182.3},0).wait(1).to({x:167.1,y:170.35},0).wait(1).to({y:158.35},0).wait(1).to({x:167.05,y:146.4},0).wait(1).to({x:167,y:134.45},0).wait(1).to({x:166.95,y:122.45},0).wait(1).to({y:110.5},0).wait(1).to({x:166.9,y:98.5},0).wait(1).to({x:166.85,y:86.55},0).wait(1).to({x:166.8,y:74.6},0).wait(1).to({y:62.6},0).wait(1).to({x:166.75,y:50.7},0).wait(1).to({x:166.7,y:38.7},0).wait(1).to({x:166.65,y:26.75},0).wait(1).to({y:14.8},0).wait(1).to({x:166.6,y:2.8},0).wait(1).to({x:166.55,y:-9.15},0).wait(1).to({x:166.5,y:-21.15},0).wait(1).to({y:-33.1},0).wait(1).to({x:166.45,y:-45.05},0).wait(1).to({x:166.4,y:-57.05},0).wait(1).to({x:166.35,y:-69},0).wait(1).to({y:-81},0).to({_off:true},1).wait(241));

	// cloud4
	this.instance_6 = new lib.Symbol1();
	this.instance_6.setTransform(1037.1,142,1,1,0,0,0,167.1,43);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(116).to({_off:false},0).wait(1).to({y:136.65},0).wait(1).to({y:131.3},0).wait(1).to({y:126},0).wait(1).to({y:120.65},0).wait(1).to({y:115.3},0).wait(1).to({y:110},0).wait(1).to({y:104.65},0).wait(1).to({y:99.3},0).wait(1).to({y:94},0).wait(1).to({y:88.65},0).wait(1).to({y:83.3},0).wait(1).to({y:78},0).wait(1).to({y:72.65},0).wait(1).to({y:67.3},0).wait(1).to({y:62},0).wait(1).to({y:56.65},0).wait(1).to({y:51.3},0).wait(1).to({y:46},0).wait(1).to({y:40.7},0).wait(1).to({y:35.35},0).wait(1).to({y:30.05},0).wait(1).to({y:24.7},0).wait(1).to({y:19.35},0).wait(1).to({y:14.05},0).wait(1).to({y:8.7},0).wait(1).to({y:3.35},0).wait(1).to({y:-1.95},0).wait(1).to({y:-7.3},0).wait(1).to({y:-12.65},0).wait(1).to({y:-17.95},0).wait(1).to({y:-23.3},0).wait(1).to({y:-28.65},0).wait(1).to({y:-33.95},0).wait(1).to({y:-39.3},0).wait(1).to({y:-44.65},0).wait(1).to({y:-49.95},0).wait(1).to({y:-55.3},0).wait(1).to({y:-60.65},0).wait(1).to({y:-65.95},0).wait(1).to({y:-71.3},0).wait(1).to({y:-76.65},0).wait(1).to({x:918.05,y:1713.75},0).wait(1).to({y:1698.4},0).wait(1).to({x:918.1,y:1683.05},0).wait(1).to({x:918.15,y:1667.75},0).wait(1).to({x:918.2,y:1652.4},0).wait(1).to({x:918.25,y:1637.1},0).wait(1).to({y:1621.75},0).wait(1).to({x:918.3,y:1606.4},0).wait(1).to({x:918.35,y:1591.1},0).wait(1).to({x:918.4,y:1575.75},0).wait(1).to({x:918.45,y:1560.45},0).wait(1).to({x:918.5,y:1545.1},0).wait(1).to({y:1529.75},0).wait(1).to({x:918.55,y:1514.45},0).wait(1).to({x:918.6,y:1499.1},0).wait(1).to({x:918.65,y:1483.8},0).wait(1).to({x:918.7,y:1468.45},0).wait(1).to({y:1453.15},0).wait(1).to({x:918.75,y:1437.8},0).wait(1).to({x:918.8,y:1422.45},0).wait(1).to({x:918.85,y:1407.15},0).wait(1).to({x:918.9,y:1391.8},0).wait(1).to({x:918.95,y:1376.5},0).wait(1).to({y:1361.15},0).wait(1).to({x:919,y:1345.8},0).wait(1).to({x:919.05,y:1330.5},0).wait(1).to({x:919.1,y:1315.15},0).wait(1).to({x:919.15,y:1299.85},0).wait(1).to({y:1284.5},0).wait(1).to({x:919.2,y:1269.2},0).wait(1).to({x:919.25,y:1253.85},0).wait(1).to({x:919.3,y:1238.5},0).wait(1).to({x:919.35,y:1223.2},0).wait(1).to({x:919.4,y:1207.85},0).wait(1).to({y:1192.55},0).wait(1).to({x:919.45,y:1177.2},0).wait(1).to({x:919.5,y:1161.85},0).wait(1).to({x:919.55,y:1146.55},0).wait(1).to({x:919.6,y:1131.2},0).wait(1).to({y:1115.9},0).wait(1).to({x:919.65,y:1100.55},0).wait(1).to({x:919.7,y:1085.2},0).wait(1).to({x:919.75,y:1069.9},0).wait(1).to({x:919.8,y:1054.55},0).wait(1).to({x:919.85,y:1039.25},0).wait(1).to({y:1023.9},0).wait(1).to({x:919.9,y:1008.6},0).wait(1).to({x:919.95,y:993.25},0).wait(1).to({x:920,y:977.9},0).wait(1).to({x:920.05,y:962.6},0).wait(1).to({y:947.25},0).wait(1).to({x:920.1,y:931.95},0).wait(1).to({x:920.15,y:916.6},0).wait(1).to({x:920.2,y:901.25},0).wait(1).to({x:920.25,y:885.95},0).wait(1).to({x:920.3,y:870.6},0).wait(1).to({y:855.3},0).wait(1).to({x:920.35,y:839.95},0).wait(1).to({x:920.4,y:824.65},0).wait(1).to({x:920.45,y:809.3},0).wait(1).to({x:920.5,y:793.95},0).wait(1).to({y:778.65},0).wait(1).to({x:920.55,y:763.3},0).wait(1).to({x:920.6,y:748},0).wait(1).to({x:920.65,y:732.65},0).wait(1).to({x:920.7,y:717.3},0).wait(1).to({x:920.75,y:702},0).wait(1).to({y:686.65},0).wait(1).to({x:920.8,y:671.35},0).wait(1).to({x:920.85,y:656},0).wait(1).to({x:920.9,y:640.65},0).wait(1).to({x:920.95,y:625.35},0).wait(1).to({y:610},0).wait(1).to({x:921,y:594.7},0).wait(1).to({x:921.05,y:579.35},0).wait(1).to({x:921.1,y:564.05},0).wait(1).to({x:921.15,y:548.7},0).wait(1).to({x:921.2,y:533.35},0).wait(1).to({y:518.05},0).wait(1).to({x:921.25,y:502.7},0).wait(1).to({x:921.3,y:487.4},0).wait(1).to({x:921.35,y:472.05},0).wait(1).to({x:921.4,y:456.7},0).wait(1).to({y:441.4},0).wait(1).to({x:921.45,y:426.05},0).wait(1).to({x:921.5,y:410.75},0).wait(1).to({x:921.55,y:395.4},0).wait(1).to({x:921.6,y:380.1},0).wait(1).to({x:921.65,y:364.75},0).wait(1).to({y:349.4},0).wait(1).to({x:921.7,y:334.1},0).wait(1).to({x:921.75,y:318.75},0).wait(1).to({x:921.8,y:303.45},0).wait(1).to({x:921.85,y:288.1},0).wait(1).to({y:272.75},0).wait(1).to({x:921.9,y:257.45},0).wait(1).to({x:921.95,y:242.1},0).wait(1).to({x:922,y:226.8},0).wait(1).to({x:922.05,y:211.45},0).wait(1).to({x:922.1,y:196.1},0).wait(1).to({y:180.8},0).wait(1).to({x:922.15,y:165.45},0).wait(1).to({x:922.2,y:150.15},0).wait(1).to({x:922.25,y:134.8},0).wait(1).to({x:922.3,y:119.5},0).wait(1).to({y:104.15},0).wait(1).to({x:922.35,y:88.8},0).wait(1).to({x:922.4,y:73.5},0).wait(1).to({x:922.45,y:58.15},0).wait(1).to({x:922.5,y:42.9},0).wait(1).to({x:922.55,y:27.55},0).wait(1).to({y:12.2},0).wait(1).to({x:922.6,y:-3.1},0).wait(1).to({x:922.65,y:-18.45},0).wait(1).to({x:922.7,y:-33.75},0).wait(1).to({x:922.75,y:-49.1},0).wait(1).to({x:922.8,y:-64.45},0).to({_off:true},1).wait(169));

	// cloud_5
	this.instance_7 = new lib.cloud5();
	this.instance_7.setTransform(85.2,1501.5,1,1,0,0,0,228.2,77.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(116).to({_off:false},0).wait(1).to({regX:228.1,x:84.85,y:1488.4},0).wait(1).to({x:84.6,y:1475.3},0).wait(1).to({x:84.35,y:1462.2},0).wait(1).to({x:84.1,y:1449.1},0).wait(1).to({x:83.85,y:1436},0).wait(1).to({x:83.55,y:1422.95},0).wait(1).to({x:83.3,y:1409.85},0).wait(1).to({x:83.05,y:1396.75},0).wait(1).to({x:82.8,y:1383.65},0).wait(1).to({x:82.55,y:1370.55},0).wait(1).to({x:82.25,y:1357.5},0).wait(1).to({x:82,y:1344.4},0).wait(1).to({x:81.75,y:1331.3},0).wait(1).to({x:81.5,y:1318.2},0).wait(1).to({x:81.25,y:1305.1},0).wait(1).to({x:80.95,y:1292},0).wait(1).to({x:80.7,y:1278.95},0).wait(1).to({x:80.45,y:1265.85},0).wait(1).to({x:80.2,y:1252.75},0).wait(1).to({x:79.95,y:1239.65},0).wait(1).to({x:79.65,y:1226.55},0).wait(1).to({x:79.4,y:1213.5},0).wait(1).to({x:79.15,y:1200.4},0).wait(1).to({x:78.9,y:1187.3},0).wait(1).to({x:78.65,y:1174.2},0).wait(1).to({x:78.35,y:1161.1},0).wait(1).to({x:78.1,y:1148.05},0).wait(1).to({x:77.85,y:1134.95},0).wait(1).to({x:77.6,y:1121.85},0).wait(1).to({x:77.35,y:1108.75},0).wait(1).to({x:77.05,y:1095.65},0).wait(1).to({x:76.8,y:1082.55},0).wait(1).to({x:76.55,y:1069.5},0).wait(1).to({x:76.3,y:1056.4},0).wait(1).to({x:76.05,y:1043.3},0).wait(1).to({x:75.8,y:1030.2},0).wait(1).to({x:75.5,y:1017.1},0).wait(1).to({x:75.25,y:1004.05},0).wait(1).to({x:75,y:990.95},0).wait(1).to({x:74.75,y:977.85},0).wait(1).to({x:74.5,y:964.75},0).wait(1).to({x:74.2,y:951.65},0).wait(1).to({x:73.95,y:938.55},0).wait(1).to({x:73.7,y:925.5},0).wait(1).to({x:73.45,y:912.4},0).wait(1).to({x:73.2,y:899.3},0).wait(1).to({x:72.9,y:886.2},0).wait(1).to({x:72.65,y:873.1},0).wait(1).to({x:72.4,y:860.05},0).wait(1).to({x:72.15,y:846.95},0).wait(1).to({x:71.9,y:833.85},0).wait(1).to({x:71.6,y:820.75},0).wait(1).to({x:71.35,y:807.65},0).wait(1).to({x:71.1,y:794.6},0).wait(1).to({x:70.85,y:781.5},0).wait(1).to({x:70.6,y:768.4},0).wait(1).to({x:70.3,y:755.3},0).wait(1).to({x:70.05,y:742.2},0).wait(1).to({x:69.8,y:729.1},0).wait(1).to({x:69.55,y:716.05},0).wait(1).to({x:69.3,y:702.95},0).wait(1).to({x:69,y:689.85},0).wait(1).to({x:68.75,y:676.75},0).wait(1).to({x:68.5,y:663.65},0).wait(1).to({x:68.25,y:650.6},0).wait(1).to({x:68,y:637.5},0).wait(1).to({x:67.75,y:624.4},0).wait(1).to({x:67.45,y:611.3},0).wait(1).to({x:67.2,y:598.2},0).wait(1).to({x:66.95,y:585.1},0).wait(1).to({x:66.7,y:572.05},0).wait(1).to({x:66.45,y:558.95},0).wait(1).to({x:66.15,y:545.85},0).wait(1).to({x:65.9,y:532.75},0).wait(1).to({x:65.65,y:519.65},0).wait(1).to({x:65.4,y:506.6},0).wait(1).to({x:65.15,y:493.5},0).wait(1).to({x:64.85,y:480.4},0).wait(1).to({x:64.6,y:467.3},0).wait(1).to({x:64.35,y:454.2},0).wait(1).to({x:64.1,y:441.15},0).wait(1).to({x:63.85,y:428.05},0).wait(1).to({x:63.55,y:414.95},0).wait(1).to({x:63.3,y:401.85},0).wait(1).to({x:63.05,y:388.75},0).wait(1).to({x:62.8,y:375.65},0).wait(1).to({x:62.55,y:362.6},0).wait(1).to({x:62.25,y:349.5},0).wait(1).to({x:62,y:336.4},0).wait(1).to({x:61.75,y:323.3},0).wait(1).to({x:61.5,y:310.2},0).wait(1).to({x:61.25,y:297.15},0).wait(1).to({x:60.95,y:284.05},0).wait(1).to({x:60.7,y:270.95},0).wait(1).to({x:60.45,y:257.85},0).wait(1).to({x:60.2,y:244.75},0).wait(1).to({x:59.95,y:231.65},0).wait(1).to({x:59.7,y:218.6},0).wait(1).to({x:59.4,y:205.5},0).wait(1).to({x:59.15,y:192.4},0).wait(1).to({x:58.9,y:179.3},0).wait(1).to({x:58.65,y:166.2},0).wait(1).to({x:58.4,y:153.15},0).wait(1).to({x:58.1,y:140.05},0).wait(1).to({x:57.85,y:126.95},0).wait(1).to({x:57.6,y:113.85},0).wait(1).to({x:57.35,y:100.75},0).wait(1).to({x:57.1,y:87.7},0).wait(1).to({x:56.8,y:74.65},0).wait(1).to({x:56.55,y:61.55},0).wait(1).to({x:56.3,y:48.45},0).wait(1).to({x:56.05,y:35.35},0).wait(1).to({x:55.8,y:22.25},0).wait(1).to({x:55.5,y:9.2},0).wait(1).to({x:55.25,y:-3.9},0).wait(1).to({x:55,y:-17},0).wait(1).to({x:54.75,y:-30.1},0).wait(1).to({x:54.5,y:-43.2},0).wait(1).to({x:54.2,y:-56.25},0).wait(1).to({x:53.95,y:-69.35},0).wait(1).to({x:53.7,y:-82.45},0).wait(1).to({x:53.45,y:-95.55},0).wait(1).to({x:53.2,y:-108.65},0).wait(1).to({x:52.9,y:-121.75},0).wait(1).to({regX:0,regY:0,x:415.55,y:2580.9},0).wait(1).to({regX:228.1,regY:77.5,scaleY:1.0085,x:643.95,y:2607.6},0).wait(1).to({scaleY:1.0169,x:644.25,y:2556.8},0).wait(1).to({scaleY:1.0254,x:644.55,y:2506},0).wait(1).to({scaleY:1.0338,x:644.85,y:2455.25},0).wait(1).to({scaleY:1.0423,x:645.15,y:2404.5},0).wait(1).to({scaleY:1.0508,x:645.45,y:2353.7},0).wait(1).to({scaleY:1.0592,x:645.75,y:2302.9},0).wait(1).to({scaleY:1.0677,x:646.05,y:2252.15},0).wait(1).to({scaleY:1.0762,x:646.35,y:2201.35},0).wait(1).to({scaleY:1.0846,x:646.7,y:2150.55},0).wait(1).to({scaleY:1.0931,x:647,y:2099.75},0).wait(1).to({scaleY:1.1015,x:647.3,y:2049},0).wait(1).to({scaleY:1.11,x:647.6,y:1998.25},0).wait(1).to({scaleY:1.1185,x:647.9,y:1947.45},0).wait(1).to({scaleY:1.1269,x:648.2,y:1896.7},0).wait(1).to({scaleY:1.1354,x:648.5,y:1845.9},0).wait(1).to({scaleY:1.1439,x:648.8,y:1795.1},0).wait(1).to({scaleY:1.1523,x:649.1,y:1744.3},0).wait(1).to({scaleY:1.1608,x:649.45,y:1693.55},0).wait(1).to({scaleY:1.1692,x:649.75,y:1642.75},0).wait(1).to({scaleY:1.1777,x:650.05,y:1591.95},0).wait(1).to({scaleY:1.1862,x:650.35,y:1541.2},0).wait(1).to({scaleY:1.1946,x:650.65,y:1490.45},0).wait(1).to({scaleY:1.2031,x:650.95,y:1439.65},0).wait(1).to({scaleY:1.2116,x:651.25,y:1388.85},0).wait(1).to({scaleY:1.22,x:651.55,y:1338.05},0).wait(1).to({scaleY:1.2285,x:651.85,y:1287.3},0).wait(1).to({scaleY:1.2369,x:652.2,y:1236.5},0).wait(1).to({scaleY:1.2454,x:652.5,y:1185.7},0).wait(1).to({scaleY:1.2539,x:652.8,y:1134.95},0).wait(1).to({scaleY:1.2623,x:653.1,y:1084.2},0).wait(1).to({scaleY:1.2708,x:653.4,y:1033.4},0).wait(1).to({scaleY:1.2793,x:653.7,y:982.6},0).wait(1).to({scaleY:1.2877,x:654,y:931.85},0).wait(1).to({scaleY:1.2962,x:654.3,y:881.05},0).wait(1).to({scaleY:1.3046,x:654.6,y:830.25},0).wait(1).to({scaleY:1.3131,x:654.95,y:779.45},0).wait(1).to({scaleY:1.3216,x:655.25,y:728.7},0).wait(1).to({scaleY:1.33,x:655.55,y:677.95},0).wait(1).to({scaleY:1.3385,x:655.85,y:627.15},0).wait(1).to({scaleY:1.347,x:656.15,y:576.35},0).wait(1).to({scaleY:1.3554,x:656.45,y:525.6},0).wait(1).to({scaleY:1.3639,x:656.75,y:474.8},0).wait(1).to({x:657.05,y:423.35},0).wait(1).to({x:657.35,y:371.95},0).wait(1).to({x:657.7,y:320.5},0).wait(1).to({x:658,y:269.05},0).wait(1).to({x:658.3,y:217.6},0).wait(1).to({x:658.6,y:166.2},0).wait(1).to({x:658.9,y:114.75},0).wait(1).to({x:659.2,y:63.35},0).wait(1).to({x:659.5,y:11.9},0).wait(1).to({x:659.8,y:-39.5},0).wait(1).to({x:660.1,y:-90.95},0).wait(1).to({x:660.45,y:-142.4},0).wait(1).to({x:660.75,y:-193.85},0).to({_off:true},1).wait(146));

	// cloud6
	this.instance_8 = new lib.Tween1("synched",0);
	this.instance_8.setTransform(976.65,432.95);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(116).to({_off:false},0).wait(1).to({y:425.072},0).wait(1).to({y:417.194},0).wait(1).to({y:409.316},0).wait(1).to({y:401.438},0).wait(1).to({y:393.56},0).wait(1).to({y:385.682},0).wait(1).to({y:377.804},0).wait(1).to({y:369.926},0).wait(1).to({y:362.048},0).wait(1).to({y:354.17},0).wait(1).to({y:346.292},0).wait(1).to({y:338.414},0).wait(1).to({y:330.536},0).wait(1).to({y:322.658},0).wait(1).to({y:314.78},0).wait(1).to({y:306.902},0).wait(1).to({y:299.024},0).wait(1).to({y:291.146},0).wait(1).to({y:283.268},0).wait(1).to({y:275.39},0).wait(1).to({y:267.512},0).wait(1).to({y:259.634},0).wait(1).to({y:251.756},0).wait(1).to({y:243.878},0).wait(1).to({y:236},0).wait(1).to({y:228.122},0).wait(1).to({y:220.244},0).wait(1).to({y:212.366},0).wait(1).to({y:204.488},0).wait(1).to({y:196.61},0).wait(1).to({y:188.732},0).wait(1).to({y:180.854},0).wait(1).to({y:172.976},0).wait(1).to({y:165.098},0).wait(1).to({y:157.22},0).wait(1).to({y:149.342},0).wait(1).to({y:141.464},0).wait(1).to({y:133.586},0).wait(1).to({y:125.708},0).wait(1).to({y:117.83},0).wait(1).to({y:109.952},0).wait(1).to({y:102.074},0).wait(1).to({y:94.196},0).wait(1).to({y:86.318},0).wait(1).to({y:78.44},0).wait(1).to({y:70.562},0).wait(1).to({y:62.684},0).wait(1).to({y:54.806},0).wait(1).to({y:46.928},0).wait(1).to({y:39.05},0).wait(1).to({y:31.172},0).wait(1).to({y:23.294},0).wait(1).to({y:15.416},0).wait(1).to({y:7.538},0).wait(1).to({y:-0.34},0).wait(1).to({y:-8.218},0).wait(1).to({y:-16.096},0).wait(1).to({y:-23.974},0).wait(1).to({y:-31.852},0).wait(1).to({y:-39.73},0).wait(1).to({y:-47.608},0).wait(1).to({y:-55.486},0).wait(1).to({y:-63.364},0).wait(1).to({y:-71.242},0).wait(1).to({y:-79.12},0).wait(1).to({y:-86.998},0).wait(1).to({y:-94.876},0).wait(1).to({y:-102.754},0).wait(1).to({y:-110.632},0).wait(1).to({y:-118.51},0).wait(1).to({y:-126.388},0).wait(1).to({y:-134.266},0).wait(1).to({y:-142.144},0).wait(1).to({y:-150.022},0).wait(1).to({y:-157.9},0).wait(1).to({x:485.1,y:1579},0).wait(1).to({x:484.8391,y:1561.1568},0).wait(1).to({x:484.5781,y:1543.3135},0).wait(1).to({x:484.3172,y:1525.4703},0).wait(1).to({x:484.0563,y:1507.6271},0).wait(1).to({x:483.7953,y:1489.7839},0).wait(1).to({x:483.5344,y:1471.9406},0).wait(1).to({x:483.2734,y:1454.0974},0).wait(1).to({x:483.0125,y:1436.2542},0).wait(1).to({x:482.7516,y:1418.4109},0).wait(1).to({x:482.4906,y:1400.5677},0).wait(1).to({x:482.2297,y:1382.7245},0).wait(1).to({x:481.9688,y:1364.8813},0).wait(1).to({x:481.7078,y:1347.038},0).wait(1).to({x:481.4469,y:1329.1948},0).wait(1).to({x:481.1859,y:1311.3516},0).wait(1).to({x:480.925,y:1293.5083},0).wait(1).to({x:480.6641,y:1275.6651},0).wait(1).to({x:480.4031,y:1257.8219},0).wait(1).to({x:480.1422,y:1239.9786},0).wait(1).to({x:479.8813,y:1222.1354},0).wait(1).to({x:479.6203,y:1204.2922},0).wait(1).to({x:479.3594,y:1186.449},0).wait(1).to({x:479.0984,y:1168.6057},0).wait(1).to({x:478.8375,y:1150.7625},0).wait(1).to({x:478.5766,y:1132.9193},0).wait(1).to({x:478.3156,y:1115.076},0).wait(1).to({x:478.0547,y:1097.2328},0).wait(1).to({x:477.7938,y:1079.3896},0).wait(1).to({x:477.5328,y:1061.5464},0).wait(1).to({x:477.2719,y:1043.7031},0).wait(1).to({x:477.0109,y:1025.8599},0).wait(1).to({x:476.75,y:1008.0167},0).wait(1).to({x:476.4891,y:990.1734},0).wait(1).to({x:476.2281,y:972.3302},0).wait(1).to({x:475.9672,y:954.487},0).wait(1).to({x:475.7063,y:936.6438},0).wait(1).to({x:475.4453,y:918.8005},0).wait(1).to({x:475.1844,y:900.9573},0).wait(1).to({x:474.9234,y:883.1141},0).wait(1).to({x:474.6625,y:865.2708},0).wait(1).to({x:474.4016,y:847.4276},0).wait(1).to({x:474.1406,y:829.5844},0).wait(1).to({x:473.8797,y:811.7411},0).wait(1).to({x:473.6188,y:793.8979},0).wait(1).to({x:473.3578,y:776.0547},0).wait(1).to({x:473.0969,y:758.2115},0).wait(1).to({x:472.8359,y:740.3682},0).wait(1).to({x:472.575,y:722.525},0).wait(1).to({x:472.3141,y:704.6818},0).wait(1).to({x:472.0531,y:686.8385},0).wait(1).to({x:471.7922,y:668.9953},0).wait(1).to({x:471.5313,y:651.1521},0).wait(1).to({x:471.2703,y:633.3089},0).wait(1).to({x:471.0094,y:615.4656},0).wait(1).to({x:470.7484,y:597.6224},0).wait(1).to({x:470.4875,y:579.7792},0).wait(1).to({x:470.2266,y:561.9359},0).wait(1).to({x:469.9656,y:544.0927},0).wait(1).to({x:469.7047,y:526.2495},0).wait(1).to({x:469.4438,y:508.4063},0).wait(1).to({x:469.1828,y:490.563},0).wait(1).to({x:468.9219,y:472.7198},0).wait(1).to({x:468.6609,y:454.8766},0).wait(1).to({x:468.4,y:437.0333},0).wait(1).to({x:468.1391,y:419.1901},0).wait(1).to({x:467.8781,y:401.3469},0).wait(1).to({x:467.6172,y:383.5036},0).wait(1).to({x:467.3563,y:365.6604},0).wait(1).to({x:467.0953,y:347.8172},0).wait(1).to({x:466.8344,y:329.974},0).wait(1).to({x:466.5734,y:312.1307},0).wait(1).to({x:466.3125,y:294.2875},0).wait(1).to({x:466.0516,y:276.4443},0).wait(1).to({x:465.7906,y:258.601},0).wait(1).to({x:465.5297,y:240.7578},0).wait(1).to({x:465.2688,y:222.9146},0).wait(1).to({x:465.0078,y:205.0714},0).wait(1).to({x:464.7469,y:187.2281},0).wait(1).to({x:464.4859,y:169.3849},0).wait(1).to({x:464.225,y:151.5417},0).wait(1).to({x:463.9641,y:133.6984},0).wait(1).to({x:463.7031,y:115.8552},0).wait(1).to({x:463.4422,y:98.012},0).wait(1).to({x:463.1813,y:80.1688},0).wait(1).to({x:462.9203,y:62.3255},0).wait(1).to({x:462.6594,y:44.4823},0).wait(1).to({x:462.3984,y:26.6391},0).wait(1).to({x:462.1375,y:8.7958},0).wait(1).to({x:461.8766,y:-9.0474},0).wait(1).to({x:461.6156,y:-26.8906},0).wait(1).to({x:461.3547,y:-44.7339},0).wait(1).to({x:461.0938,y:-62.5771},0).wait(1).to({x:460.8328,y:-80.4203},0).wait(1).to({x:460.5719,y:-98.2635},0).wait(1).to({x:460.3109,y:-116.1068},0).wait(1).to({x:460.05,y:-133.95},0).to({_off:true},1).wait(155));

	// cloud9
	this.instance_9 = new lib.cloud9();
	this.instance_9.setTransform(541.9,1195.2,1,1,0,0,0,263.9,86.2);
	this.instance_9._off = true;

	this.instance_10 = new lib.Group_2_4();
	this.instance_10.setTransform(278,1109,0.3824,0.3518);

	this.instance_11 = new lib.Symbol3();
	this.instance_11.setTransform(354.9,895.2,1,1,0,0,0,263.9,86.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},116).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},43).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[]},1).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(116).to({_off:false},0).wait(1).to({regX:263.8,x:541.8,y:1184.15},0).wait(1).to({x:541.85,y:1173.15},0).wait(1).to({y:1162.15},0).wait(1).to({x:541.9,y:1151.15},0).wait(1).to({y:1140.15},0).wait(1).to({x:541.95,y:1129.15},0).wait(1).to({y:1118.15},0).wait(1).to({x:542,y:1107.1},0).wait(1).to({y:1096.1},0).wait(1).to({x:542.05,y:1085.1},0).wait(1).to({y:1074.1},0).wait(1).to({x:542.1,y:1063.1},0).wait(1).to({y:1052.1},0).wait(1).to({x:542.15,y:1041.1},0).wait(1).to({y:1030.1},0).wait(1).to({x:542.2,y:1019.05},0).wait(1).to({y:1008.05},0).wait(1).to({x:542.25,y:997.05},0).wait(1).to({y:986.05},0).wait(1).to({x:542.3,y:975.05},0).wait(1).to({y:964.05},0).wait(1).to({x:542.35,y:953.05},0).wait(1).to({y:942.05},0).wait(1).to({x:542.4,y:931},0).wait(1).to({y:920},0).wait(1).to({x:542.45,y:909},0).wait(1).to({y:898},0).wait(1).to({x:542.5,y:887},0).wait(1).to({y:876},0).wait(1).to({x:542.55,y:865},0).wait(1).to({y:853.95},0).wait(1).to({x:542.6,y:842.95},0).wait(1).to({y:831.95},0).wait(1).to({x:542.65,y:820.95},0).wait(1).to({y:809.95},0).wait(1).to({x:542.7,y:798.95},0).wait(1).to({y:787.95},0).wait(1).to({x:542.75,y:776.95},0).wait(1).to({y:765.9},0).wait(1).to({x:542.8,y:754.9},0).wait(1).to({y:743.9},0).wait(1).to({x:542.85,y:732.9},0).wait(1).to({y:721.9},0).wait(1).to({x:542.9,y:710.9},0).wait(1).to({y:699.9},0).wait(1).to({x:542.95,y:688.9},0).wait(1).to({y:677.85},0).wait(1).to({x:543,y:666.85},0).wait(1).to({y:655.85},0).wait(1).to({x:543.05,y:644.85},0).wait(1).to({y:633.85},0).wait(1).to({x:543.1,y:622.85},0).wait(1).to({y:611.85},0).wait(1).to({x:543.15,y:600.8},0).wait(1).to({y:589.8},0).wait(1).to({x:543.2,y:578.8},0).wait(1).to({y:567.8},0).wait(1).to({x:543.25,y:556.8},0).wait(1).to({y:545.8},0).wait(1).to({x:543.3,y:534.8},0).wait(1).to({y:523.8},0).wait(1).to({x:543.35,y:512.75},0).wait(1).to({y:501.75},0).wait(1).to({x:543.4,y:490.75},0).wait(1).to({y:479.75},0).wait(1).to({x:543.45,y:468.75},0).wait(1).to({y:457.75},0).wait(1).to({x:543.5,y:446.75},0).wait(1).to({y:435.75},0).wait(1).to({x:543.55,y:424.7},0).wait(1).to({y:413.7},0).wait(1).to({x:543.6,y:402.7},0).wait(1).to({y:391.7},0).wait(1).to({x:543.65,y:380.7},0).wait(1).to({y:369.7},0).wait(1).to({x:543.7,y:358.7},0).wait(1).to({y:347.65},0).wait(1).to({x:543.75,y:336.65},0).wait(1).to({y:325.65},0).wait(1).to({x:543.8,y:314.65},0).wait(1).to({y:303.65},0).wait(1).to({x:543.85,y:292.65},0).wait(1).to({y:281.65},0).wait(1).to({x:543.9,y:270.65},0).wait(1).to({y:259.6},0).wait(1).to({x:543.95,y:248.6},0).wait(1).to({y:237.6},0).wait(1).to({x:544,y:226.6},0).wait(1).to({y:215.6},0).wait(1).to({x:544.05,y:204.6},0).wait(1).to({y:193.6},0).wait(1).to({x:544.1,y:182.6},0).wait(1).to({y:171.55},0).wait(1).to({x:544.15,y:160.55},0).wait(1).to({y:149.55},0).wait(1).to({x:544.2,y:138.55},0).wait(1).to({y:127.55},0).wait(1).to({x:544.25,y:116.55},0).wait(1).to({y:105.55},0).wait(1).to({x:544.3,y:94.5},0).wait(1).to({y:83.55},0).wait(1).to({x:544.35,y:72.55},0).wait(1).to({y:61.55},0).wait(1).to({x:544.4,y:50.55},0).wait(1).to({y:39.55},0).wait(1).to({x:544.45,y:28.55},0).wait(1).to({y:17.55},0).wait(1).to({x:544.5,y:6.5},0).wait(1).to({y:-4.5},0).wait(1).to({x:544.55,y:-15.5},0).wait(1).to({y:-26.5},0).wait(1).to({x:544.6,y:-37.5},0).wait(1).to({y:-48.5},0).wait(1).to({x:544.65,y:-59.5},0).wait(1).to({y:-70.5},0).wait(1).to({x:544.7,y:-81.55},0).wait(1).to({y:-92.55},0).wait(1).to({x:544.75,y:-103.55},0).wait(1).to({y:-114.55},0).wait(1).to({x:544.8,y:-125.55},0).wait(1).to({y:-136.55},0).wait(1).to({x:544.85,y:-147.55},0).wait(1).to({x:544.9,y:-158.6},0).to({_off:true},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(283).to({_off:false},0).wait(1).to({regX:263.8,x:355.05,y:860.7},0).wait(1).to({x:355.3,y:826.2},0).wait(1).to({x:355.6,y:791.7},0).wait(1).to({x:355.85,y:757.25},0).wait(1).to({x:356.1,y:722.75},0).wait(1).to({x:356.4,y:688.25},0).wait(1).to({x:356.65,y:653.75},0).wait(1).to({x:356.95,y:619.3},0).wait(1).to({x:357.2,y:584.8},0).wait(1).to({x:357.45,y:550.3},0).wait(1).to({x:357.75,y:515.85},0).wait(1).to({x:358,y:481.35},0).wait(1).to({x:358.25,y:446.85},0).wait(1).to({x:358.55,y:412.35},0).wait(1).to({x:358.8,y:377.9},0).wait(1).to({x:359.1,y:343.4},0).wait(1).to({x:359.35,y:308.9},0).wait(1).to({x:359.6,y:274.4},0).wait(1).to({x:359.9,y:239.95},0).wait(1).to({x:360.15,y:205.45},0).wait(1).to({x:360.4,y:170.95},0).wait(1).to({x:360.7,y:136.5},0).wait(1).to({x:360.95,y:102},0).wait(1).to({x:361.25,y:67.55},0).wait(1).to({x:361.5,y:33.05},0).wait(1).to({x:361.75,y:-1.4},0).wait(1).to({x:362.05,y:-35.9},0).wait(1).to({x:362.3,y:-70.4},0).wait(1).to({x:362.6,y:-104.9},0).to({_off:true},1).wait(131));

	// cloud_7
	this.instance_12 = new lib.cloud7();
	this.instance_12.setTransform(211.6,96.4,1,1,0,0,0,129.6,40.4);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(116).to({_off:false},0).wait(1).to({regX:129.5,x:211.5,y:85.35},0).wait(1).to({y:74.35},0).wait(1).to({y:63.35},0).wait(1).to({y:52.35},0).wait(1).to({y:41.35},0).wait(1).to({y:30.4},0).wait(1).to({y:19.4},0).wait(1).to({y:8.4},0).wait(1).to({y:-2.6},0).wait(1).to({y:-13.6},0).wait(1).to({y:-24.6},0).wait(1).to({y:-35.6},0).wait(1).to({y:-46.6},0).wait(1).to({y:-57.6},0).wait(1).to({y:-68.6},0).wait(1).to({y:-79.6},0).wait(1).to({y:-90.6},0).wait(1).to({y:-101.6},0).wait(1).to({y:-112.6},0).wait(1).to({y:-123.6},0).wait(1).to({y:-134.6},0).wait(1).to({y:-145.6},0).wait(1).to({y:-156.6},0).wait(1).to({y:-167.6},0).wait(1).to({y:-178.65},0).wait(1).to({y:-189.65},0).wait(1).to({y:-200.65},0).wait(1).to({y:-211.65},0).wait(1).to({y:-222.65},0).wait(1).to({y:-233.65},0).wait(1).to({y:-244.65},0).wait(1).to({y:-255.65},0).wait(1).to({y:-266.65},0).wait(1).to({y:-277.65},0).wait(1).to({y:-288.65},0).wait(1).to({y:-299.65},0).wait(1).to({y:-310.65},0).wait(1).to({y:-321.65},0).wait(1).to({y:-332.65},0).wait(1).to({y:-343.65},0).wait(1).to({y:-354.65},0).wait(1).to({y:-365.65},0).wait(1).to({y:-376.65},0).wait(1).to({y:-387.65},0).wait(1).to({y:-398.65},0).wait(1).to({y:-409.65},0).wait(1).to({y:-420.65},0).wait(1).to({y:-431.65},0).wait(1).to({y:-442.65},0).wait(1).to({y:-453.7},0).wait(1).to({regX:129.6,x:78.25,y:1644.35},0).wait(1).to({regX:129.5,x:78.15,y:1642.4},0).wait(1).to({y:1640.45},0).wait(1).to({y:1638.5},0).wait(1).to({y:1636.6},0).wait(1).to({y:1634.65},0).wait(1).to({y:1632.7},0).wait(1).to({x:78.1,y:1630.8},0).wait(1).to({y:1628.85},0).wait(1).to({y:1626.9},0).wait(1).to({y:1625},0).wait(1).to({y:1623.05},0).wait(1).to({y:1621.1},0).wait(1).to({x:78.05,y:1619.15},0).wait(1).to({y:1617.25},0).wait(1).to({y:1615.3},0).wait(1).to({y:1613.35},0).wait(1).to({y:1611.45},0).wait(1).to({y:1609.5},0).wait(1).to({y:1607.55},0).wait(1).to({x:78,y:1605.65},0).wait(1).to({y:1603.7},0).wait(1).to({y:1601.75},0).wait(1).to({y:1599.8},0).wait(1).to({y:1597.9},0).wait(1).to({y:1595.95},0).wait(1).to({x:77.95,y:1594},0).wait(1).to({y:1592.1},0).wait(1).to({y:1590.15},0).wait(1).to({y:1588.2},0).wait(1).to({y:1586.3},0).wait(1).to({y:1584.35},0).wait(1).to({x:77.9,y:1582.4},0).wait(1).to({y:1580.45},0).wait(1).to({y:1578.55},0).wait(1).to({y:1576.6},0).wait(1).to({y:1574.65},0).wait(1).to({y:1572.75},0).wait(1).to({y:1570.8},0).wait(1).to({x:77.85,y:1568.85},0).wait(1).to({y:1566.95},0).wait(1).to({y:1565},0).wait(1).to({y:1563.05},0).wait(1).to({y:1561.15},0).wait(1).to({y:1559.2},0).wait(1).to({x:77.8,y:1557.25},0).wait(1).to({y:1555.3},0).wait(1).to({y:1553.4},0).wait(1).to({y:1551.45},0).wait(1).to({y:1549.5},0).wait(1).to({y:1547.6},0).wait(1).to({x:77.75,y:1545.65},0).wait(1).to({y:1543.7},0).wait(1).to({y:1541.8},0).wait(1).to({y:1539.85},0).wait(1).to({y:1537.9},0).wait(1).to({y:1535.95},0).wait(1).to({y:1534.05},0).wait(1).to({x:77.7,y:1532.1},0).wait(1).to({y:1530.15},0).wait(1).to({y:1528.25},0).wait(1).to({y:1526.3},0).wait(1).to({y:1524.35},0).wait(1).to({y:1522.45},0).wait(1).to({x:77.65,y:1520.5},0).wait(1).to({y:1518.55},0).wait(1).to({y:1516.6},0).wait(1).to({y:1514.7},0).wait(1).to({y:1512.75},0).wait(1).to({y:1510.8},0).wait(1).to({y:1508.9},0).wait(1).to({x:77.6,y:1506.95},0).wait(1).to({y:1505},0).to({_off:true},1).wait(204));

	// cloud_8
	this.instance_13 = new lib.cloud8();
	this.instance_13.setTransform(1115.6,1438.4,1,1,0,0,0,129.6,40.4);
	this.instance_13._off = true;

	this.instance_14 = new lib.Symbol5();
	this.instance_14.setTransform(1115.6,1438.4,1,1,0,0,0,129.6,40.4);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(116).to({_off:false},0).wait(1).to({regX:129.5,x:1115.5,y:1425.4},0).wait(1).to({y:1412.4},0).wait(1).to({y:1399.4},0).wait(1).to({y:1386.4},0).wait(1).to({y:1373.4},0).wait(1).to({y:1360.45},0).wait(1).to({y:1347.45},0).wait(1).to({y:1334.45},0).wait(1).to({y:1321.45},0).wait(1).to({y:1308.45},0).wait(1).to({y:1295.5},0).wait(1).to({y:1282.5},0).wait(1).to({y:1269.5},0).wait(1).to({y:1256.5},0).wait(1).to({y:1243.5},0).wait(1).to({y:1230.55},0).wait(1).to({y:1217.55},0).wait(1).to({y:1204.55},0).wait(1).to({y:1191.55},0).wait(1).to({y:1178.55},0).wait(1).to({y:1165.6},0).wait(1).to({y:1152.6},0).wait(1).to({y:1139.6},0).wait(1).to({y:1126.6},0).wait(1).to({y:1113.6},0).wait(1).to({y:1100.65},0).wait(1).to({y:1087.65},0).wait(1).to({y:1074.65},0).wait(1).to({y:1061.65},0).wait(1).to({y:1048.65},0).wait(1).to({y:1035.7},0).wait(1).to({y:1022.7},0).wait(1).to({y:1009.7},0).wait(1).to({y:996.7},0).wait(1).to({y:983.7},0).wait(1).to({y:970.75},0).wait(1).to({y:957.75},0).wait(1).to({y:944.75},0).wait(1).to({y:931.75},0).wait(1).to({y:918.75},0).wait(1).to({y:905.75},0).wait(1).to({y:892.8},0).wait(1).to({y:879.8},0).wait(1).to({y:866.8},0).wait(1).to({y:853.8},0).wait(1).to({y:840.8},0).wait(1).to({y:827.85},0).wait(1).to({y:814.85},0).wait(1).to({y:801.85},0).wait(1).to({y:788.85},0).wait(1).to({y:775.85},0).wait(1).to({y:762.9},0).wait(1).to({y:749.9},0).wait(1).to({y:736.9},0).wait(1).to({y:723.9},0).wait(1).to({y:710.9},0).wait(1).to({y:697.95},0).wait(1).to({y:684.95},0).wait(1).to({y:671.95},0).wait(1).to({y:658.95},0).wait(1).to({y:645.95},0).wait(1).to({y:633},0).wait(1).to({y:620},0).wait(1).to({y:607},0).wait(1).to({y:594},0).wait(1).to({y:581},0).wait(1).to({y:568.05},0).wait(1).to({y:555.05},0).wait(1).to({y:542.05},0).wait(1).to({y:529.05},0).wait(1).to({y:516.05},0).wait(1).to({y:503.1},0).wait(1).to({y:490.1},0).wait(1).to({y:477.1},0).wait(1).to({y:464.1},0).wait(1).to({y:451.1},0).wait(1).to({y:438.15},0).wait(1).to({y:425.15},0).wait(1).to({y:412.15},0).wait(1).to({y:399.15},0).wait(1).to({y:386.15},0).wait(1).to({y:373.15},0).wait(1).to({y:360.2},0).wait(1).to({y:347.2},0).wait(1).to({y:334.2},0).wait(1).to({y:321.2},0).wait(1).to({y:308.2},0).wait(1).to({y:295.25},0).wait(1).to({y:282.25},0).wait(1).to({y:269.25},0).wait(1).to({y:256.25},0).wait(1).to({y:243.25},0).wait(1).to({y:230.3},0).wait(1).to({y:217.3},0).wait(1).to({y:204.3},0).wait(1).to({y:191.3},0).wait(1).to({y:178.3},0).wait(1).to({y:165.35},0).wait(1).to({y:152.35},0).wait(1).to({y:139.35},0).wait(1).to({y:126.35},0).wait(1).to({y:113.35},0).wait(1).to({y:100.4},0).wait(1).to({y:87.4},0).wait(1).to({y:74.4},0).wait(1).to({y:61.4},0).wait(1).to({y:48.4},0).wait(1).to({y:35.5},0).wait(1).to({y:22.5},0).wait(1).to({y:9.5},0).wait(1).to({y:-3.5},0).wait(1).to({y:-16.5},0).wait(1).to({y:-29.45},0).wait(1).to({y:-42.45},0).wait(1).to({y:-55.45},0).wait(1).to({y:-68.45},0).wait(1).to({y:-81.45},0).to({_off:true},1).wait(210));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(234).to({_off:false},0).wait(1).to({regX:129.5,x:1115.1,y:1429.3},0).wait(1).to({x:1114.7,y:1420.2},0).wait(1).to({x:1114.3,y:1411.1},0).wait(1).to({x:1113.95,y:1402},0).wait(1).to({x:1113.55,y:1392.9},0).wait(1).to({x:1113.15,y:1383.8},0).wait(1).to({x:1112.8,y:1374.7},0).wait(1).to({x:1112.4,y:1365.65},0).wait(1).to({x:1112,y:1356.55},0).wait(1).to({x:1111.65,y:1347.45},0).wait(1).to({x:1111.25,y:1338.35},0).wait(1).to({x:1110.85,y:1329.25},0).wait(1).to({x:1110.5,y:1320.15},0).wait(1).to({x:1110.1,y:1311.05},0).wait(1).to({x:1109.7,y:1302},0).wait(1).to({x:1109.35,y:1292.9},0).wait(1).to({x:1108.95,y:1283.8},0).wait(1).to({x:1108.55,y:1274.7},0).wait(1).to({x:1108.15,y:1265.6},0).wait(1).to({x:1107.8,y:1256.5},0).wait(1).to({x:1107.4,y:1247.4},0).wait(1).to({x:1107,y:1238.35},0).wait(1).to({x:1106.65,y:1229.25},0).wait(1).to({x:1106.25,y:1220.15},0).wait(1).to({x:1105.85,y:1211.05},0).wait(1).to({x:1105.5,y:1201.95},0).wait(1).to({x:1105.1,y:1192.85},0).wait(1).to({x:1104.7,y:1183.75},0).wait(1).to({x:1104.35,y:1174.7},0).wait(1).to({x:1103.95,y:1165.6},0).wait(1).to({x:1103.55,y:1156.5},0).wait(1).to({x:1103.2,y:1147.4},0).wait(1).to({x:1102.8,y:1138.3},0).wait(1).to({x:1102.4,y:1129.2},0).wait(1).to({x:1102,y:1120.1},0).wait(1).to({x:1101.65,y:1111.05},0).wait(1).to({x:1101.25,y:1101.95},0).wait(1).to({x:1100.85,y:1092.85},0).wait(1).to({x:1100.5,y:1083.75},0).wait(1).to({x:1100.1,y:1074.65},0).wait(1).to({x:1099.7,y:1065.55},0).wait(1).to({x:1099.35,y:1056.45},0).wait(1).to({x:1098.95,y:1047.4},0).wait(1).to({x:1098.55,y:1038.3},0).wait(1).to({x:1098.2,y:1029.2},0).wait(1).to({x:1097.8,y:1020.1},0).wait(1).to({x:1097.4,y:1011},0).wait(1).to({x:1097.05,y:1001.9},0).wait(1).to({x:1096.65,y:992.8},0).wait(1).to({x:1096.25,y:983.75},0).wait(1).to({x:1095.85,y:974.65},0).wait(1).to({x:1095.5,y:965.55},0).wait(1).to({x:1095.1,y:956.45},0).wait(1).to({x:1094.7,y:947.35},0).wait(1).to({x:1094.35,y:938.25},0).wait(1).to({x:1093.95,y:929.15},0).wait(1).to({x:1093.55,y:920.1},0).wait(1).to({x:1093.2,y:911},0).wait(1).to({x:1092.8,y:901.9},0).wait(1).to({x:1092.4,y:892.8},0).wait(1).to({x:1092.05,y:883.7},0).wait(1).to({x:1091.65,y:874.6},0).wait(1).to({x:1091.25,y:865.5},0).wait(1).to({x:1090.9,y:856.45},0).wait(1).to({x:1089.65,y:797.5},0).wait(1).to({x:1088.45,y:738.6},0).wait(1).to({x:1087.25,y:679.7},0).wait(1).to({x:1086.05,y:620.8},0).wait(1).to({x:1084.8,y:561.9},0).wait(1).to({x:1083.6,y:502.95},0).wait(1).to({x:1082.4,y:444.05},0).wait(1).to({x:1081.2,y:385.15},0).wait(1).to({x:1079.95,y:326.25},0).wait(1).to({x:1078.75,y:267.35},0).wait(1).to({x:1077.55,y:208.4},0).wait(1).to({x:1076.35,y:149.5},0).wait(1).to({x:1075.1,y:90.6},0).wait(1).to({x:1073.9,y:31.75},0).wait(1).to({x:1072.7,y:-27.15},0).wait(1).to({x:1071.5,y:-86.1},0).to({_off:true},1).wait(129));

	// plane
	this.instance_15 = new lib.plane();
	this.instance_15.setTransform(1575.35,152.8,1,1,0,0,180,267,119.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1).to({regX:267.2,regY:119.9,x:1557.6,y:152.9},0).wait(1).to({x:1540.05},0).wait(1).to({x:1522.5},0).wait(1).to({x:1504.95},0).wait(1).to({x:1487.4},0).wait(1).to({x:1469.85},0).wait(1).to({x:1452.3},0).wait(1).to({x:1434.75},0).wait(1).to({x:1417.25},0).wait(1).to({x:1399.7},0).wait(1).to({x:1382.15},0).wait(1).to({x:1364.6},0).wait(1).to({x:1347.05},0).wait(1).to({x:1329.5},0).wait(1).to({x:1311.95},0).wait(1).to({x:1294.4},0).wait(1).to({x:1276.9},0).wait(1).to({x:1259.35},0).wait(1).to({x:1241.8},0).wait(1).to({x:1224.25},0).wait(1).to({x:1206.7},0).wait(1).to({x:1189.15},0).wait(1).to({x:1171.6},0).wait(1).to({x:1154.05},0).wait(1).to({x:1136.55},0).wait(1).to({x:1119},0).wait(1).to({x:1101.45},0).wait(1).to({x:1083.9},0).wait(1).to({x:1066.35},0).wait(1).to({x:1048.8},0).wait(1).to({x:1031.25},0).wait(1).to({x:1013.7},0).wait(1).to({x:996.2},0).wait(1).to({x:978.65},0).wait(1).to({x:961.1},0).wait(1).to({x:943.55},0).wait(1).to({x:926},0).wait(1).to({x:908.45},0).wait(1).to({x:890.9},0).wait(1).to({x:873.35},0).wait(1).to({x:855.85},0).wait(1).to({x:838.3},0).wait(1).to({x:820.75},0).wait(1).to({x:803.2},0).wait(1).to({x:785.65},0).wait(1).to({x:768.1},0).wait(1).to({x:750.55},0).wait(1).to({x:733},0).wait(1).to({x:715.5},0).wait(1).to({x:697.95},0).wait(1).to({x:680.4},0).wait(1).to({x:662.85},0).wait(1).to({x:645.3},0).wait(1).to({x:627.75},0).wait(1).to({x:610.2},0).wait(1).to({x:592.65},0).wait(1).to({x:575.1},0).wait(1).to({x:557.6},0).wait(1).to({x:540.05},0).wait(1).to({x:522.5},0).wait(1).to({x:504.95},0).wait(1).to({x:487.4},0).wait(1).to({x:469.85},0).wait(1).to({x:452.3},0).wait(1).to({x:434.75},0).wait(1).to({x:417.25},0).wait(1).to({x:399.7},0).wait(1).to({x:382.15},0).wait(1).to({x:364.6},0).wait(1).to({x:347.05},0).wait(1).to({x:329.5},0).wait(1).to({x:311.95},0).wait(1).to({x:294.4},0).wait(1).to({x:276.9},0).wait(1).to({x:259.35},0).wait(1).to({x:241.8},0).wait(1).to({x:224.25},0).wait(1).to({x:206.7},0).wait(1).to({x:189.15},0).wait(1).to({x:171.6},0).wait(1).to({x:154.05},0).wait(1).to({x:136.55},0).wait(1).to({x:119},0).wait(1).to({x:101.45},0).wait(1).to({x:83.9},0).wait(1).to({x:66.35},0).wait(1).to({x:48.8},0).wait(1).to({x:31.25},0).wait(1).to({x:13.7},0).wait(1).to({x:-3.8},0).wait(1).to({x:-21.35},0).wait(1).to({x:-38.9},0).wait(1).to({x:-56.45},0).wait(1).to({x:-74},0).wait(1).to({x:-91.55},0).wait(1).to({x:-109.1},0).wait(1).to({x:-126.65},0).wait(1).to({x:-144.15},0).wait(1).to({x:-161.7},0).wait(1).to({x:-179.25},0).wait(1).to({x:-196.8},0).wait(1).to({x:-214.35},0).wait(1).to({x:-231.9},0).wait(1).to({x:-249.45},0).wait(1).to({x:-267},0).wait(1).to({x:-284.5},0).to({_off:true},1).wait(337));

	// diver_1
	this.instance_16 = new lib.diver1();
	this.instance_16.setTransform(674.05,173.8,1,1,0,0,0,63,46.5);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(46).to({_off:false},0).wait(1).to({regY:46.4,rotation:-0.1463,x:673,y:184.8},0).wait(1).to({rotation:-0.2925,x:672,y:195.9},0).wait(1).to({rotation:-0.4388,x:670.95,y:207},0).wait(1).to({rotation:-0.585,x:669.9,y:218.1},0).wait(1).to({rotation:-0.7313,x:668.9,y:229.25},0).wait(1).to({rotation:-0.8775,x:667.85,y:240.35},0).wait(1).to({rotation:-1.0238,x:666.85,y:251.5},0).wait(1).to({rotation:-1.17,x:665.8,y:262.55},0).wait(1).to({rotation:-1.3163,x:664.75,y:273.7},0).wait(1).to({rotation:-1.4625,x:663.8,y:284.8},0).wait(1).to({rotation:-1.6088,x:662.75,y:295.95},0).wait(1).to({rotation:-1.755,x:666.2,y:306.85},0).wait(1).to({rotation:-1.9013,x:669.75,y:317.8},0).wait(1).to({rotation:-2.0475,x:673.25,y:328.75},0).wait(1).to({rotation:-2.1938,x:676.8,y:339.75},0).wait(1).to({rotation:-2.34,x:680.3,y:350.7},0).wait(1).to({rotation:-2.4863,x:683.8,y:361.65},0).wait(1).to({rotation:-2.6325,x:679.95,y:365.25},0).wait(1).to({rotation:-2.7788,x:676,y:368.85},0).wait(1).to({rotation:-2.925,x:672,y:372.45},0).wait(1).to({rotation:-3.0713,x:668.1,y:376},0).wait(1).to({rotation:-3.2175,x:669,y:383.65},0).wait(1).to({rotation:-3.3638,x:669.85,y:391.25},0).wait(1).to({rotation:-3.51,x:670.8,y:398.9},0).wait(1).to({rotation:-3.6563,x:671.6,y:406.55},0).wait(1).to({rotation:-3.8025,x:672.5,y:414.15},0).wait(1).to({rotation:-3.9488,x:673.4,y:421.8},0).wait(1).to({rotation:-4.095,x:674.25,y:429.45},0).wait(1).to({rotation:-4.2413,x:675.2,y:437.1},0).wait(1).to({rotation:-4.3875,x:674.4,y:442.65},0).wait(1).to({rotation:-4.5338,x:673.7,y:448.15},0).wait(1).to({rotation:-4.68,x:673.05,y:453.7},0).wait(1).to({rotation:-4.8263,x:672.3,y:459.25},0).wait(1).to({rotation:-4.9725,x:671.55,y:464.8},0).wait(1).to({rotation:-5.1188,x:670.85,y:470.3},0).wait(1).to({rotation:-5.265,x:670.15,y:475.8},0).wait(1).to({rotation:-5.4113,x:669.45,y:481.35},0).wait(1).to({rotation:-5.5575,x:668.7,y:486.9},0).wait(1).to({rotation:-5.7038,x:670.7,y:497},0).wait(1).to({rotation:-5.85,x:672.65,y:507.15},0).wait(1).to({rotation:-5.9963,x:674.65,y:517.25},0).wait(1).to({rotation:-6.1425,x:676.6,y:527.4},0).wait(1).to({rotation:-6.2888,x:678.6,y:537.55},0).wait(1).to({rotation:-6.435,x:680.55,y:547.7},0).wait(1).to({rotation:-6.5813,x:682.5,y:557.85},0).wait(1).to({rotation:-6.7275,x:684.5,y:567.95},0).wait(1).to({rotation:-6.8738,x:686.45,y:578.05},0).wait(1).to({rotation:-7.02,x:688.45,y:588.2},0).wait(1).to({rotation:-7.1663,x:690.4,y:598.35},0).wait(1).to({rotation:-7.3125,x:692.4,y:608.45},0).wait(1).to({rotation:-7.4588,x:689.25,y:611.9},0).wait(1).to({rotation:-7.605,x:686.25,y:615.45},0).wait(1).to({rotation:-7.7513,x:683.1,y:618.95},0).wait(1).to({rotation:-7.8975,x:680.05,y:622.4},0).wait(1).to({rotation:-8.0438,x:677,y:625.9},0).wait(1).to({rotation:-8.19,x:673.9,y:629.4},0).wait(1).to({rotation:-8.3363,x:670.85,y:632.8},0).wait(1).to({rotation:-8.4825,x:667.75,y:636.3},0).wait(1).to({rotation:-8.6288,x:664.7,y:639.8},0).wait(1).to({rotation:-8.775,x:661.6,y:643.3},0).wait(1).to({rotation:-8.9213,x:662.75,y:657.55},0).wait(1).to({rotation:-9.0675,x:663.85,y:671.75},0).wait(1).to({rotation:-9.2138,x:665,y:686},0).wait(1).to({rotation:-9.36,x:666.1,y:700.25},0).wait(1).to({rotation:-9.5063,x:667.25,y:714.5},0).wait(1).to({rotation:-9.6525,x:668.4,y:728.75},0).wait(1).to({rotation:-9.7988,x:669.5,y:743},0).wait(1).to({rotation:-9.945,x:670.6,y:757.2},0).wait(1).to({rotation:-10.0913,x:671.8,y:771.5},0).wait(1).to({regY:46.5,rotation:0,x:648.1,y:287.8},0).wait(1).to({regY:46.4,rotation:0.9184,x:647.95,y:288.6},0).wait(1).to({rotation:1.8367,x:647.8,y:289.55},0).wait(1).to({rotation:2.7551,x:647.7,y:290.45},0).wait(1).to({rotation:3.6734,x:647.6,y:291.4},0).wait(1).to({rotation:4.5918,x:647.5,y:292.3},0).wait(1).to({rotation:5.5102,x:647.35,y:293.25},0).wait(1).to({rotation:6.4285,x:647.2,y:294.15},0).wait(1).to({rotation:7.3469,x:647.1,y:295.05},0).wait(1).to({rotation:8.2652,x:647,y:295.95},0).wait(1).to({rotation:9.1836,x:646.9,y:296.9},0).wait(1).to({rotation:10.102,x:646.7,y:297.85},0).wait(1).to({rotation:11.0203,x:646.65,y:298.8},0).wait(1).to({rotation:11.9387,x:646.5,y:299.7},0).wait(1).to({rotation:12.857,x:646.4,y:300.6},0).wait(1).to({rotation:13.7754,x:646.25,y:301.55},0).wait(1).to({rotation:14.6937,x:646.15,y:302.5},0).wait(1).to({rotation:15.6121,x:646.05,y:303.4},0).wait(1).to({rotation:16.5305,x:645.9,y:304.3},0).wait(1).to({rotation:17.4488,x:645.8,y:305.25},0).wait(1).to({rotation:18.3672,x:645.7,y:306.2},0).wait(1).to({rotation:19.2855,x:645.55,y:307.1},0).wait(1).to({rotation:20.2039,x:645.4,y:308},0).wait(1).to({rotation:21.1223,x:645.3,y:308.95},0).wait(1).to({rotation:22.0406,x:645.2,y:309.85},0).wait(1).to({rotation:22.959,x:645.05,y:310.75},0).wait(1).to({rotation:23.8773,x:644.9,y:311.75},0).wait(1).to({rotation:24.7957,x:644.8,y:312.6},0).wait(1).to({rotation:25.7141,x:644.65,y:313.6},0).wait(1).to({rotation:26.6324,x:644.55,y:314.55},0).wait(1).to({rotation:27.5508,x:644.45,y:315.45},0).wait(1).to({rotation:28.4691,x:644.35,y:316.4},0).wait(1).to({rotation:29.3875,x:644.2,y:317.3},0).wait(1).to({rotation:30.3059,x:644.1,y:318.2},0).wait(1).to({rotation:31.2242,x:643.95,y:319.15},0).wait(1).to({rotation:32.1426,x:643.8,y:320.05},0).wait(1).to({rotation:33.0609,x:643.7,y:320.95},0).wait(1).to({rotation:33.9793,x:643.6,y:321.9},0).wait(1).to({rotation:34.8976,x:643.45,y:322.8},0).wait(1).to({rotation:35.816,x:643.35,y:323.75},0).wait(1).to({rotation:36.7344,x:643.25,y:324.7},0).wait(1).to({rotation:37.6527,x:643.1,y:325.6},0).wait(1).to({rotation:38.5711,x:642.95,y:326.55},0).wait(1).to({rotation:39.4894,x:642.85,y:327.4},0).wait(1).to({rotation:40.4078,x:642.7,y:328.4},0).wait(1).to({rotation:41.3262,x:642.6,y:329.3},0).wait(1).to({rotation:42.2445,x:642.5,y:330.2},0).wait(1).to({rotation:43.1629,x:642.35,y:330.9},0).wait(1).to({rotation:44.0812,x:642.2,y:331.65},0).wait(1).to({rotation:44.9996,x:642.15,y:332.3},0).wait(1).to({x:642,y:332.95},0).wait(1).to({x:641.9,y:333.65},0).wait(1).to({x:641.75,y:334.35},0).wait(1).to({x:641.65,y:335.05},0).wait(1).to({x:641.5,y:335.7},0).wait(1).to({x:641.4,y:336.4},0).wait(1).to({x:641.25,y:337.1},0).wait(1).to({x:641.15,y:337.75},0).wait(1).to({x:641,y:338.45},0).wait(1).to({x:640.9,y:339.15},0).wait(1).to({x:640.75,y:339.85},0).wait(1).to({x:640.65,y:340.5},0).wait(1).to({x:640.5,y:341.2},0).wait(1).to({x:640.4,y:341.9},0).wait(1).to({x:640.25,y:342.6},0).wait(1).to({x:640.15,y:343.25},0).wait(1).to({x:640,y:343.95},0).wait(1).to({x:639.9,y:344.65},0).wait(1).to({x:639.75,y:345.35},0).wait(1).to({x:639.65,y:346},0).wait(1).to({x:639.5,y:346.7},0).wait(1).to({x:639.4,y:347.4},0).wait(1).to({x:639.25,y:348.1},0).wait(1).to({x:639.15,y:348.75},0).wait(1).to({x:639,y:349.45},0).wait(1).to({x:638.9,y:350.15},0).wait(1).to({x:638.75,y:350.85},0).wait(1).to({x:638.65,y:351.5},0).wait(1).to({x:638.5,y:352.2},0).wait(1).to({x:638.4,y:352.9},0).wait(1).to({x:638.25,y:353.55},0).wait(1).to({x:638.15,y:354.25},0).wait(1).to({x:638.05,y:354.95},0).wait(1).to({x:637.9,y:355.65},0).wait(1).to({x:637.8,y:356.3},0).wait(1).to({x:637.65,y:357},0).wait(1).to({x:637.55,y:357.7},0).wait(1).to({x:637.4,y:358.4},0).wait(1).to({x:637.3,y:359.05},0).wait(1).to({x:637.15,y:359.75},0).wait(1).to({x:637.05,y:360.45},0).wait(1).to({x:636.9,y:361.15},0).wait(1).to({x:636.8,y:361.8},0).wait(1).to({x:636.65,y:362.5},0).wait(1).to({x:636.55,y:363.2},0).wait(1).to({x:636.4,y:363.9},0).wait(1).to({x:636.3,y:364.55},0).wait(1).to({x:636.15,y:365.25},0).wait(1).to({x:636.05,y:365.95},0).wait(1).to({x:635.9,y:366.65},0).wait(1).to({x:635.8,y:367.3},0).wait(1).to({x:635.65,y:368},0).wait(1).to({x:635.55,y:368.7},0).wait(1).to({x:635.4,y:369.35},0).wait(1).to({x:635.3,y:370.05},0).wait(1).to({x:635.15,y:370.75},0).wait(1).to({x:635.05,y:371.45},0).wait(1).to({x:634.9,y:372.1},0).wait(1).to({x:634.8,y:372.8},0).wait(1).to({x:634.65,y:373.5},0).wait(1).to({x:634.55,y:374.2},0).wait(1).to({x:634.4,y:374.85},0).wait(1).to({x:634.3,y:375.55},0).wait(1).to({x:634.15,y:376.25},0).wait(1).to({x:634.05,y:376.95},0).wait(1).to({x:633.9,y:377.6},0).wait(1).to({x:633.8,y:378.3},0).wait(1).to({x:633.65,y:379},0).wait(1).to({x:633.55,y:379.7},0).wait(1).to({x:633.4,y:380.35},0).wait(1).to({x:633.3,y:381.05},0).wait(1).to({x:633.15,y:381.75},0).wait(1).to({x:633.05,y:382.45},0).wait(1).to({x:632.9,y:383.1},0).wait(1).to({x:632.8,y:383.8},0).wait(1).to({x:632.65,y:384.5},0).wait(1).to({x:632.55,y:385.15},0).wait(1).to({x:632.45,y:385.85},0).wait(1).to({x:632.3,y:386.55},0).wait(1).to({x:632.2,y:387.25},0).wait(1).to({x:632.05,y:387.9},0).wait(1).to({x:631.95,y:388.6},0).wait(1).to({x:631.8,y:389.3},0).wait(1).to({x:631.7,y:390},0).wait(1).to({x:631.55,y:390.65},0).wait(1).to({x:631.45,y:391.35},0).wait(1).to({x:631.3,y:392.05},0).wait(1).to({x:631.2,y:392.75},0).wait(1).to({x:631.05,y:393.4},0).to({_off:true},1).wait(189));

	// _Group__21
	this.instance_17 = new lib.divdiv();
	this.instance_17.setTransform(619.5,498.8,1,1,0,0,0,38.1,81.8);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(284).to({_off:false},0).wait(1).to({regX:38.2,x:619.55,y:504.8},0).wait(1).to({x:619.5,y:510.8},0).wait(1).to({x:619.45,y:516.85},0).wait(1).to({y:522.9},0).wait(1).to({x:619.4,y:529},0).wait(1).to({y:535.1},0).wait(1).to({y:541.2},0).wait(1).to({x:619.35,y:547.3},0).wait(1).to({y:553.4},0).wait(1).to({y:559.55},0).wait(1).to({y:565.7},0).wait(1).to({y:571.85},0).wait(1).to({y:578},0).wait(1).to({y:584.15},0).wait(1).to({y:590.35},0).wait(1).to({y:596.55},0).wait(1).to({y:602.75},0).wait(1).to({y:608.95},0).wait(1).to({y:615.2},0).wait(1).to({x:619.4,y:621.45},0).wait(1).to({y:627.7},0).wait(1).to({y:633.95},0).wait(1).to({x:619.45,y:640.2},0).wait(1).to({y:646.5},0).wait(1).to({x:619.5,y:652.75},0).wait(1).to({y:659.1},0).wait(1).to({x:619.55,y:665.4},0).wait(1).to({x:619.6,y:671.7},0).wait(1).to({y:678.05},0).wait(1).to({x:619.65,y:684.4},0).wait(1).to({x:619.7,y:690.75},0).wait(1).to({x:619.75,y:697.15},0).wait(1).to({x:619.8,y:703.5},0).wait(1).to({x:619.85,y:709.9},0).wait(1).to({x:619.9,y:716.3},0).wait(1).to({x:619.95,y:722.75},0).wait(1).to({x:620,y:729.2},0).wait(1).to({x:620.1,y:735.65},0).wait(1).to({x:620.15,y:742.1},0).wait(1).to({x:620.2,y:748.6},0).wait(1).to({x:620.3,y:755.05},0).wait(1).to({x:620.35,y:761.6},0).wait(1).to({x:620.45,y:768.1},0).wait(1).to({x:620.55,y:774.65},0).wait(1).to({x:620.6,y:781.2},0).wait(1).to({x:620.7,y:787.75},0).wait(1).to({x:620.8,y:794.35},0).wait(1).to({x:620.9,y:800.95},0).wait(1).to({x:621,y:807.6},0).wait(1).to({x:621.1,y:814.25},0).wait(1).to({x:621.25,y:820.9},0).wait(1).to({x:621.35,y:827.6},0).wait(1).to({x:621.45,y:834.3},0).wait(1).to({x:621.6,y:841},0).wait(1).to({x:621.75,y:847.75},0).wait(1).to({x:621.85,y:854.55},0).wait(1).to({x:622,y:861.35},0).wait(1).to({x:622.15,y:868.15},0).wait(1).to({x:622.3,y:875},0).wait(1).to({x:622.45,y:881.85},0).wait(1).to({x:622.65,y:888.75},0).wait(1).to({x:622.8,y:895.7},0).wait(1).to({x:623,y:902.65},0).wait(1).to({x:623.2,y:909.65},0).wait(1).to({x:623.4,y:916.65},0).wait(1).to({x:623.6,y:923.75},0).wait(1).to({x:623.8,y:930.8},0).wait(1).to({x:624,y:937.95},0).wait(1).to({x:624.25,y:945.15},0).wait(1).to({x:624.5,y:952.35},0).wait(1).to({x:624.75,y:959.6},0).wait(1).to({x:625,y:966.95},0).wait(1).to({x:625.25,y:974.3},0).wait(1).to({x:625.55,y:981.7},0).wait(1).to({x:625.85,y:989.2},0).wait(1).to({x:626.15,y:996.75},0).wait(1).to({x:626.5,y:1004.4},0).wait(1).to({x:626.85,y:1012.1},0).wait(1).to({x:627.25,y:1019.85},0).wait(1).to({x:627.6,y:1027.75},0).wait(1).to({x:628.05,y:1035.75},0).wait(1).to({x:628.5,y:1043.85},0).wait(1).to({x:628.95,y:1052.05},0).wait(1).to({x:629.45,y:1060.45},0).wait(1).to({x:630,y:1069},0).wait(1).to({x:630.6,y:1077.8},0).wait(1).to({x:631.25,y:1086.8},0).wait(1).to({x:632,y:1096.15},0).wait(1).to({x:632.8,y:1105.9},0).wait(1).to({x:633.75,y:1116.15},0).wait(1).to({x:634.9,y:1127.25},0).wait(1).to({regX:38.1,x:625.65,y:-1.4},0).wait(1).to({regX:38.2,y:6.1},0).wait(1).to({x:625.6,y:13.55},0).wait(1).to({x:625.5,y:21},0).wait(1).to({x:625.45,y:28.45},0).wait(1).to({x:625.4,y:35.9},0).wait(1).to({x:625.3,y:43.35},0).wait(1).to({x:625.25,y:50.8},0).wait(1).to({x:625.2,y:58.25},0).wait(1).to({x:625.1,y:65.75},0).wait(1).to({x:625.05,y:73.2},0).wait(1).to({x:625,y:80.65},0).wait(1).to({x:624.9,y:88.05},0).wait(1).to({x:624.85,y:95.5},0).wait(1).to({x:624.8,y:102.95},0).wait(1).to({x:624.7,y:110.4},0).wait(1).to({x:624.65,y:117.85},0).wait(1).to({x:624.6,y:125.3},0).wait(1).to({x:624.5,y:132.8},0).wait(1).to({x:624.45,y:140.25},0).wait(1).to({x:624.4,y:147.7},0).wait(1).to({x:624.3,y:155.15},0).wait(1).to({x:624.25,y:162.6},0).wait(1).to({x:624.2,y:170.05},0).wait(1).to({x:624.1,y:177.5},0).wait(1).to({x:624.05,y:184.95},0).wait(1).to({x:624,y:192.4},0).wait(1).to({x:623.9,y:199.9},0).wait(1).to({x:623.85,y:207.35},0).wait(1).to({x:623.8,y:214.8},0).wait(1).to({x:623.7,y:222.25},0).wait(1).to({x:623.65,y:229.7},0).wait(1).to({x:623.6,y:237.15},0).wait(1).to({x:623.5,y:244.6},0).wait(1).to({x:623.45,y:252.05},0).wait(1).to({x:623.4,y:259.5},0).wait(1).to({x:623.3,y:267},0).wait(1).to({x:623.25,y:274.45},0).wait(1).to({x:623.2,y:281.9},0).wait(1).to({x:623.1,y:289.35},0).wait(1).to({x:623.05,y:296.8},0).wait(1).to({x:623,y:304.25},0).wait(1).to({x:622.9,y:311.7},0).wait(1).to({x:622.85,y:319.15},0).wait(1).to({x:622.8,y:326.6},0).wait(1).to({x:622.7,y:334.1},0).wait(1).to({x:622.65,y:341.55},0).wait(1).to({x:622.6,y:349},0).wait(1).to({x:622.5,y:356.45},0).wait(1).to({x:622.45,y:363.9},0).wait(1).to({x:622.4,y:371.35},0).wait(1).to({x:622.3,y:378.8},0).wait(1).to({x:622.25,y:386.25},0).wait(1).to({x:622.2,y:393.75},0).wait(1).to({x:622.1,y:401.2},0).wait(1).to({x:622.05,y:408.65},0).wait(1).to({x:622,y:416.1},0).wait(1).to({x:621.9,y:423.55},0).wait(1).to({x:621.85,y:431},0).wait(1).to({x:621.8,y:438.45},0).wait(1).to({x:621.7,y:445.9},0).wait(1).to({x:621.65,y:453.35},0).wait(1).to({x:621.6,y:460.85},0).wait(1).to({x:621.5,y:468.3},0).wait(1).to({x:621.45,y:475.75},0).wait(1).to({x:621.4,y:483.2},0).wait(1).to({x:621.3,y:490.65},0).wait(1).to({x:621.25,y:498.1},0).wait(1));

	// _Group__20
	this.instance_18 = new lib.Group_20_2();
	this.instance_18.setTransform(631,451,0.4322,0.5481);

	this.instance_19 = new lib.Group_19_1();
	this.instance_19.setTransform(650,449,0.4322,0.5481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},301).to({state:[{t:this.instance_19}]},28).to({state:[]},1).wait(114));

	// _Group__19
	this.instance_20 = new lib.Group_19_1();
	this.instance_20.setTransform(650,449,0.4322,0.5481);

	this.instance_21 = new lib.Group_18();
	this.instance_21.setTransform(626,452,0.4322,0.5481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},301).to({state:[{t:this.instance_21}]},28).to({state:[]},1).wait(114));

	// _Group__18
	this.instance_22 = new lib.Group_18();
	this.instance_22.setTransform(626,452,0.4322,0.5481);

	this.instance_23 = new lib.Group_17_1();
	this.instance_23.setTransform(631,428,0.4322,0.5481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},301).to({state:[{t:this.instance_23}]},28).to({state:[]},1).wait(114));

	// _Group__17
	this.instance_24 = new lib.Group_17_1();
	this.instance_24.setTransform(631,428,0.4322,0.5481);

	this.instance_25 = new lib.Group_16();
	this.instance_25.setTransform(631,429,0.4322,0.5481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},301).to({state:[{t:this.instance_25}]},28).to({state:[]},1).wait(114));

	// _Group__16
	this.instance_26 = new lib.Group_16();
	this.instance_26.setTransform(631,429,0.4322,0.5481);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__15
	this.instance_27 = new lib.Group_15_1();
	this.instance_27.setTransform(628,417,0.4322,0.5481);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__14
	this.instance_28 = new lib.Group_14();
	this.instance_28.setTransform(632,443,0.4322,0.5481);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__13
	this.instance_29 = new lib.Group_13_1();
	this.instance_29.setTransform(601,421,0.4322,0.5481);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__12
	this.instance_30 = new lib.Group_12();
	this.instance_30.setTransform(673,419,0.4322,0.5481);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__11
	this.instance_31 = new lib.Group_11();
	this.instance_31.setTransform(632,423,0.4322,0.5481);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__10
	this.instance_32 = new lib.Group_10();
	this.instance_32.setTransform(640,563,0.4322,0.5481);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__9
	this.instance_33 = new lib.Group_9_1();
	this.instance_33.setTransform(603,426,0.4322,0.5481);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__8
	this.instance_34 = new lib.Group_8_1();
	this.instance_34.setTransform(646,424,0.4322,0.5481);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__7
	this.instance_35 = new lib.Group_7();
	this.instance_35.setTransform(625,449,0.4322,0.5481);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__6
	this.instance_36 = new lib.Group_6_1();
	this.instance_36.setTransform(640,528,0.4322,0.5481);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__5
	this.instance_37 = new lib.Group_5_3();
	this.instance_37.setTransform(641,492,0.4322,0.5481);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__3
	this.instance_38 = new lib.Group_3_1();
	this.instance_38.setTransform(626,561,0.4322,0.5481);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// _Group__2
	this.instance_39 = new lib.Group_2_1();
	this.instance_39.setTransform(626,527,0.4322,0.5481);
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(301).to({_off:false},0).wait(33).to({_off:true},1).wait(109));

	// _Group__1
	this.instance_40 = new lib.Group_1_5();
	this.instance_40.setTransform(627,491,0.4322,0.5481);
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(301).to({_off:false},0).wait(28).to({_off:true},1).wait(114));

	// lower_harnest
	this.instance_41 = new lib.diver15();
	this.instance_41.setTransform(627.3,426.8,1,1,0,0,0,67.8,48.6);
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(267).to({_off:false},0).wait(1).to({regX:67.7,rotation:-4.2857,x:625.2,y:421.25},0).wait(1).to({rotation:-8.5714,x:623.2,y:415.75},0).wait(1).to({rotation:-12.8571,x:621.15,y:410.3},0).wait(1).to({rotation:-17.1428,x:623.45,y:399.35},0).wait(1).to({rotation:-21.4286,x:625.65,y:388.4},0).wait(1).to({rotation:-25.7143,x:627.95,y:377.5},0).wait(1).to({rotation:-30,x:630.25,y:366.55},0).wait(1).to({rotation:-34.2857,x:625.85,y:368.45},0).wait(1).to({rotation:-38.5714,x:621.4,y:370.4},0).wait(1).to({rotation:-42.8571,x:617,y:405.2},0).wait(1).to({rotation:-47.1428,x:618.95,y:416},0).wait(1).to({rotation:-51.4285,x:620.85,y:426.9},0).wait(1).to({rotation:-55.7143,x:622.85,y:505.7},0).wait(1).to({rotation:-60,x:632,y:438.1},0).wait(1).to({rotation:-64.2857,x:630.3,y:453},0).wait(1).to({rotation:-68.5714,x:628.7,y:467.85},0).wait(1).to({rotation:-72.8571,x:630.65,y:466.5},0).to({_off:true},1).wait(159));

	// upper_harnest
	this.instance_42 = new lib.Group_24();
	this.instance_42.setTransform(638.7,431.35,0.276,0.2905,0,48.7034,41.2968);
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// r_harrnest
	this.instance_43 = new lib.Group_23();
	this.instance_43.setTransform(650.8,441.95,0.276,0.2905,0,48.7034,41.2968);
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// l_harnest
	this.instance_44 = new lib.Group_22_1();
	this.instance_44.setTransform(640.35,415.8,0.276,0.2905,0,48.7034,41.2968);
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// eye2
	this.instance_45 = new lib.Group_21();
	this.instance_45.setTransform(669.3,421.45,0.276,0.2905,0,48.7034,41.2968);
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// eyes
	this.instance_46 = new lib.Group_20();
	this.instance_46.setTransform(669.3,421.45,0.276,0.2905,0,48.7034,41.2968);
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// helmet
	this.instance_47 = new lib.Group_19();
	this.instance_47.setTransform(675.7,412.95,0.276,0.2905,0,48.7034,41.2968);
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// neck
	this.instance_48 = new lib.Group_18_2();
	this.instance_48.setTransform(656.4,425.7,0.276,0.2905,0,48.7034,41.2968);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// hand_l
	this.instance_49 = new lib.Group_17();
	this.instance_49.setTransform(641.1,384,0.276,0.2905,0,48.7034,41.2968);
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// hand_r
	this.instance_50 = new lib.Group_16_2();
	this.instance_50.setTransform(684.6,460.35,0.276,0.2905,0,48.7034,41.2968);
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// face
	this.instance_51 = new lib.Group_15();
	this.instance_51.setTransform(672.55,418.65,0.276,0.2905,0,48.7034,41.2968);
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// shoe_l
	this.instance_52 = new lib.Group_14_2();
	this.instance_52.setTransform(590.4,391.75,0.276,0.2905,0,48.7034,41.2968);
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// arm_l
	this.instance_53 = new lib.Group_13();
	this.instance_53.setTransform(640.35,389,0.276,0.2905,0,48.7034,41.2968);
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// arm_r
	this.instance_54 = new lib.Group_12_2();
	this.instance_54.setTransform(653.25,437,0.276,0.2905,0,48.7034,41.2968);
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// body
	this.instance_55 = new lib.Group_11_2();
	this.instance_55.setTransform(629.85,409.45,0.276,0.2905,0,48.7034,41.2968);
	this.instance_55._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// upper_leg_r
	this.instance_56 = new lib.Group_10_2();
	this.instance_56.setTransform(585.6,427.1,0.276,0.2905,0,48.7034,41.2968);
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// buttom_leg_l
	this.instance_57 = new lib.Group_9();
	this.instance_57.setTransform(589.6,399.55,0.276,0.2905,0,48.7034,41.2968);
	this.instance_57._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// upper_leg_r
	this.instance_58 = new lib.Group_8();
	this.instance_58.setTransform(582.3,411.55,0.276,0.2905,0,48.7034,41.2968);
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// shoes
	this.instance_59 = new lib.Group_2_7();
	this.instance_59.setTransform(598.45,412.95,0.276,0.2905,0,48.7034,41.2968);
	this.instance_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// leg_r
	this.instance_60 = new lib.Group_1_4();
	this.instance_60.setTransform(592,420.05,0.276,0.2905,0,48.7034,41.2968);
	this.instance_60._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(254).to({_off:false},0).to({_off:true},13).wait(177));

	// parachute_b_copy
	this.instance_61 = new lib.parachute_open();
	this.instance_61.setTransform(651.6,455.9,1,1,0,0,0,19.6,17.9);
	this.instance_61._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(267).to({_off:false},0).wait(1).to({regX:19.5,regY:18,scaleX:1.4893,scaleY:1.7115,x:650.9,y:428.15},0).wait(1).to({scaleX:1.9786,scaleY:2.423,x:650.3,y:400.35},0).wait(1).to({scaleX:2.4678,scaleY:3.1345,x:649.65,y:372.55},0).wait(1).to({scaleX:2.9571,scaleY:3.8461,x:649.05,y:344.75},0).wait(1).to({scaleX:3.4464,scaleY:4.5576,x:646.75,y:325.9},0).wait(1).to({scaleX:3.9357,scaleY:5.2691,x:644.45,y:307.05},0).wait(1).to({scaleX:4.4249,scaleY:5.9806,x:642.15,y:288.2},0).wait(1).to({scaleX:4.9142,scaleY:6.6921,x:631.85,y:269.95},0).wait(1).to({scaleX:5.4035,scaleY:7.4036,x:621.5,y:251.75},0).wait(1).to({scaleX:5.8928,scaleY:8.1151,x:622.65,y:257.55},0).wait(1).to({scaleX:6.382,scaleY:8.8267,x:623.75,y:263.35},0).wait(1).to({scaleX:6.8713,scaleY:9.5382,x:624.9,y:290.2},0).wait(1).to({scaleX:7.3606,scaleY:10.2497,x:626.05,y:317.6},0).wait(1).to({scaleX:7.8499,scaleY:10.9612,x:628.25,y:239.35},0).wait(1).to({regX:22.3,regY:18.5,x:628.7,y:268.4},0).wait(1).to({regX:19.5,regY:18,x:606.85,y:270},0).wait(1).to({x:607.05,y:277.1},0).wait(1).to({x:607.25,y:284.25},0).wait(1).to({x:607.45,y:291.35},0).wait(1).to({x:607.6,y:298.5},0).wait(1).to({x:607.8,y:305.6},0).wait(1).to({x:608,y:312.75},0).wait(1).to({x:608.2,y:319.85},0).wait(1).to({x:608.35,y:327},0).wait(1).to({x:608.55,y:334.1},0).wait(1).to({x:608.75,y:341.2},0).wait(1).to({x:608.95,y:348.35},0).wait(1).to({x:609.1,y:355.45},0).wait(1).to({x:609.3,y:362.6},0).wait(1).to({x:609.5,y:369.7},0).wait(1).to({x:609.7,y:376.85},0).wait(1).to({x:609.9,y:383.95},0).wait(1).to({x:610.05,y:391.1},0).wait(1).to({x:610.25,y:398.2},0).wait(1).to({x:610.45,y:405.35},0).wait(1).to({x:610.65,y:412.45},0).wait(1).to({x:610.8,y:419.55},0).wait(1).to({x:611,y:426.7},0).wait(1).to({x:611.2,y:433.8},0).wait(1).to({x:611.4,y:440.95},0).wait(1).to({x:611.55,y:448.05},0).wait(1).to({x:611.75,y:455.2},0).wait(1).to({x:611.95,y:462.3},0).wait(1).to({x:612.15,y:469.45},0).wait(1).to({x:612.35,y:476.55},0).wait(1).to({x:612.5,y:483.65},0).wait(1).to({x:612.7,y:490.8},0).wait(1).to({x:612.9,y:497.9},0).wait(1).to({x:613.1,y:505.05},0).wait(1).to({x:613.25,y:512.15},0).wait(1).to({x:613.45,y:519.3},0).wait(1).to({x:613.65,y:526.4},0).wait(1).to({x:613.85,y:533.55},0).wait(1).to({x:614,y:540.65},0).wait(1).to({x:614.2,y:547.8},0).wait(1).to({x:614.4,y:554.9},0).wait(1).to({x:614.6,y:562},0).wait(1).to({x:614.8,y:569.15},0).wait(1).to({x:614.95,y:576.25},0).wait(1).to({x:615.15,y:583.4},0).wait(1).to({x:615.35,y:590.5},0).wait(1).to({x:615.55,y:597.65},0).wait(1).to({x:615.7,y:604.75},0).wait(1).to({x:615.9,y:611.9},0).wait(1).to({x:616.1,y:619},0).wait(1).to({x:616.3,y:626.1},0).wait(1).to({x:616.45,y:633.25},0).wait(1).to({x:616.65,y:640.35},0).wait(1).to({x:616.85,y:647.5},0).wait(1).to({x:617.05,y:654.6},0).wait(1).to({x:617.25,y:661.75},0).wait(1).to({x:617.4,y:668.85},0).wait(1).to({x:617.6,y:676},0).wait(1).to({x:617.8,y:683.1},0).wait(1).to({x:618,y:690.25},0).wait(1).to({x:618.15,y:697.35},0).wait(1).to({x:618.35,y:704.45},0).wait(1).to({x:618.55,y:711.6},0).wait(1).to({x:618.75,y:718.7},0).wait(1).to({x:618.9,y:725.85},0).wait(1).to({x:619.1,y:732.95},0).wait(1).to({x:619.3,y:740.1},0).wait(1).to({x:619.5,y:747.2},0).wait(1).to({x:619.7,y:754.35},0).wait(1).to({x:619.85,y:761.45},0).wait(1).to({x:620.05,y:768.55},0).wait(1).to({x:620.25,y:775.7},0).wait(1).to({x:620.45,y:782.8},0).wait(1).to({x:620.6,y:789.95},0).wait(1).to({x:620.8,y:797.05},0).wait(1).to({x:621,y:804.2},0).wait(1).to({x:621.2,y:811.3},0).wait(1).to({x:621.35,y:818.45},0).wait(1).to({x:621.55,y:825.55},0).wait(1).to({x:621.75,y:832.7},0).wait(1).to({x:621.95,y:839.8},0).wait(1).to({x:622.15,y:846.9},0).wait(1).to({x:622.3,y:854.05},0).wait(1).to({x:622.5,y:861.15},0).wait(1).to({x:622.7,y:868.3},0).wait(1).to({x:622.9,y:875.4},0).wait(1).to({x:623.05,y:882.55},0).wait(1).to({x:623.25,y:889.65},0).wait(1).to({x:623.45,y:896.8},0).wait(1).to({x:623.65,y:903.9},0).wait(1).to({x:623.8,y:911},0).wait(67).to({_off:true},1).wait(3));

	// cloud_r
	this.instance_62 = new lib.Group_3();
	this.instance_62.setTransform(933,56,0.4066,0.4864);

	this.timeline.addTween(cjs.Tween.get(this.instance_62).to({_off:true},115).wait(329));

	// cloud_l
	this.instance_63 = new lib.Group_2_3();
	this.instance_63.setTransform(70,330,0.4066,0.4864);

	this.timeline.addTween(cjs.Tween.get(this.instance_63).to({_off:true},115).wait(329));

	// blue_backround
	this.instance_64 = new lib.Path();
	this.instance_64.setTransform(0,0,0.4091,0.4864);

	this.timeline.addTween(cjs.Tween.get(this.instance_64).to({_off:true},316).wait(128));

	// dark_grass
	this.instance_65 = new lib.PathGroup_1();
	this.instance_65.setTransform(1,689,0.8216,0.7245);
	this.instance_65._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(332).to({_off:false},0).to({_off:true},26).wait(86));

	// cloud_15
	this.instance_66 = new lib.Symbol6();
	this.instance_66.setTransform(159.55,320.25,1,1,0,0,0,107.2,31.2);
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(332).to({_off:false},0).wait(1).to({y:302.5},0).wait(1).to({y:284.8},0).wait(1).to({y:267.05},0).wait(1).to({y:249.35},0).wait(1).to({y:231.65},0).wait(1).to({y:213.9},0).wait(1).to({y:196.2},0).wait(1).to({y:178.45},0).wait(1).to({y:160.75},0).wait(1).to({y:143.05},0).wait(1).to({y:125.3},0).wait(1).to({y:107.6},0).wait(1).to({y:89.9},0).wait(1).to({y:72.15},0).wait(1).to({y:54.45},0).wait(1).to({y:36.7},0).wait(1).to({y:19.05},0).wait(1).to({y:1.35},0).wait(1).to({y:-16.4},0).wait(1).to({y:-34.1},0).wait(1).to({y:-51.85},0).to({_off:true},1).wait(90));

	// _Group_
	this.instance_67 = new lib.Group_1();
	this.instance_67.setTransform(19,627,0.8216,0.7245);
	this.instance_67._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(332).to({_off:false},0).wait(21).to({_off:true},1).wait(90));

	// _Group__3
	this.instance_68 = new lib.Group_3_4();
	this.instance_68.setTransform(714,792,0.8216,0.7245);
	this.instance_68._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(332).to({_off:false},0).wait(22).to({_off:true},1).wait(89));

	// _Group__2
	this.instance_69 = new lib.Group_2_6();
	this.instance_69.setTransform(1222,499,0.8216,0.7245);
	this.instance_69._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(332).to({_off:false},0).wait(22).to({y:656},0).to({_off:true},1).wait(89));

	// _Group__1
	this.instance_70 = new lib.Group_1_6();
	this.instance_70.setTransform(745,542,0.8216,0.7245);
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(332).to({_off:false},0).wait(22).to({y:699},0).to({_off:true},1).wait(89));

	// _Path_____Group_
	this.instance_71 = new lib.PathGroup();
	this.instance_71.setTransform(1,460,0.8216,0.7245);
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(332).to({_off:false},0).wait(22).to({x:0,y:615},0).to({_off:true},1).wait(89));

	// _Path_
	this.instance_72 = new lib.Path_2();
	this.instance_72.setTransform(1,608,0.8216,0.7245);
	this.instance_72._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(312).to({_off:false},0).wait(7).to({y:451},0).to({_off:true},1).wait(124));

	// _Path_____Path_____Path_____Path_
	this.instance_73 = new lib.PathPathPathPath();
	this.instance_73.setTransform(1,602,0.8216,0.7245);
	this.instance_73._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(312).to({_off:false},0).wait(7).to({y:445},0).to({_off:true},1).wait(124));

	// _Group_
	this.instance_74 = new lib.Group_4();
	this.instance_74.setTransform(1213,535,0.8216,0.7245);
	this.instance_74._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(312).to({_off:false},0).wait(7).to({y:378},0).to({_off:true},1).wait(124));

	// _Path_____Path_
	this.instance_75 = new lib.Group_4();
	this.instance_75.setTransform(1213,535,0.8216,0.7245);
	this.instance_75._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(312).to({_off:false},0).wait(7).to({y:378},0).to({_off:true},1).wait(124));

	// _Group__2
	this.instance_76 = new lib.PathPath();
	this.instance_76.setTransform(836,485,0.8216,0.7245);
	this.instance_76._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(332).to({_off:false},0).to({_off:true},24).wait(88));

	// _Group__2
	this.instance_77 = new lib.PathPath();
	this.instance_77.setTransform(836,485,0.8216,0.7245);
	this.instance_77._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(332).to({_off:false},0).to({_off:true},24).wait(88));

	// _Group__1
	this.instance_78 = new lib.Group_2_5();
	this.instance_78.setTransform(349,501,0.8216,0.7245);
	this.instance_78._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(332).to({_off:false},0).to({_off:true},24).wait(88));

	// hills
	this.instance_79 = new lib.Group_1_3();
	this.instance_79.setTransform(1,431,0.8216,0.7245);
	this.instance_79._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(332).to({_off:false},0).wait(23).to({y:274},0).to({_off:true},1).wait(88));

	// _Path_
	this.instance_80 = new lib.Path_1();
	this.instance_80.setTransform(1,1,0.8216,0.961);
	this.instance_80._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(332).to({_off:false},0).wait(23).to({scaleY:0.6597,y:0},0).to({_off:true},1).wait(88));

	// _Group__1
	this.instance_81 = new lib.Group_1_2();
	this.instance_81.setTransform(1,504,0.8216,0.7245);
	this.instance_81._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(332).to({_off:false},0).to({_off:true},24).wait(88));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(88.3,-134.1,1754.1000000000001,2870);
// library properties:
lib.properties = {
	id: 'BB26D7308087DF40A3DE97C6A34F29EA',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Path.png?1618079457161", id:"Path"},
		{src:"images/RECOVER_בואו נצנח_atlas_1.png?1618079456906", id:"RECOVER_בואו נצנח_atlas_1"},
		{src:"images/RECOVER_בואו נצנח_atlas_2.png?1618079456907", id:"RECOVER_בואו נצנח_atlas_2"},
		{src:"images/RECOVER_בואו נצנח_atlas_3.png?1618079456907", id:"RECOVER_בואו נצנח_atlas_3"},
		{src:"images/RECOVER_בואו נצנח_atlas_4.png?1618079456907", id:"RECOVER_בואו נצנח_atlas_4"},
		{src:"images/RECOVER_בואו נצנח_atlas_5.png?1618079456908", id:"RECOVER_בואו נצנח_atlas_5"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BB26D7308087DF40A3DE97C6A34F29EA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;