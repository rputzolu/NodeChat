			// The following function provide Inheritance to JS
			function _inheritsFrom(child, parent) {
				var tmpObj = Object.create(parent.prototype);
				tmpObj.constructor = child;
				child.prototype = tmpObj;
			}

			function Base() {};

			/* Class CircularArray */
			var CircularArray = (function(_super) {
				_myself = CircularArray ;
				_inheritsFrom(_myself, _super);
				//constructor
				function CircularArray(an_array){
					_super.call(this);
					this._data = an_array;
					this._currentIdx = 0;
				}
				_myself.prototype.pop = function(){
					idx =  this._currentIdx % this._data.length;
					this._currentIdx++;
					return this._data[idx];
				};
				return _myself;
			})(Base);

			/* Class ColorPicker */
			var ColorPicker = (function(_super) {
				_myself = ColorPicker;
				_inheritsFrom(_myself, _super);
				function ColorPicker(){
					_super.call(this, [ '#EEFFEE','#FFFFEE', '#DDDDEE', '#EEFFFF','#FFEEEE','#99FFCC','#66CCFF','#CCFF99']);
				};
				return _myself;
			})(CircularArray);

			/* Class OffsetPicker */
			var OffsetPicker = (function(_super) {
				_myself = OffsetPicker;
				_inheritsFrom(_myself, _super);
				function OffsetPicker(){
					_super.call(this, [ 5,45,15,35,25,10,40,30]);
				};
				return _myself;
			})(CircularArray);

			/* Class ChatDisplay */
			var ChatDisplay = (function (_super) { _myself = ChatDisplay;
				_inheritsFrom(_myself, _super);
				function ChatDisplay (parentDiv) {
					_super.call(this);
					this._cp = new ColorPicker();
					this._op = new OffsetPicker();
					this._lastUser = '';
					this._userSettings = {'fake_nikname':{'bgColor':'#ff00aa', 'leftPerc':40}};
					//console.log(parentDiv)
					this._container = document.getElementById(parentDiv);

					console.log(this._container);
				}
				//Methods
				_myself.prototype.update = function (messageBlock) {
						//messageBlock = last json block of messages downloaded
						var mb = JSON.parse(messageBlock);
						var htmlContent = "";
						for(i=0;i<mb.length;i++){
							if(this._lastUser != mb[i].nikname){
								divStyleObj = this._userSettings[mb[i].nikname];
								if(divStyleObj==undefined){
									divStyleObj = {};
									divStyleObj['bgColor']=this._cp.pop();
									divStyleObj['leftPerc']= this._op.pop();
									this._userSettings[mb[i].nikname] = divStyleObj;
								}
								var el = document.createElement( 'div' );
								el.innerHTML = mb[i].message;
                el.className = "enjoy-css";
							//	el.style.left=divStyleObj['leftPerc']+'%';
                el.style.marginLeft = divStyleObj['leftPerc']+'%';
                el.style.marginRight = 50 - parseInt(divStyleObj['leftPerc'])+'%';
								el.style['background-color'] = divStyleObj['bgColor'];
								this._container.appendChild(el);
							}
							else{
								this._container.lastChild.innerHTML += mb[i].message;
							}
							this._lastUser = mb[i].nikname;
						}
					};
				return _myself;
			})(Base);
/*
			var cd = new ChatDisplay('display');
			testMessageBlock = '[{"msgIndex": 4, "nikname": "Renzo", "message": "aaaa"}, {"msgIndex": 5, "nikname": "Renzo", "message": "bbbb"}, {"msgIndex": 6, "nikname": "Renzo", "message": "cccc"}]';
			cd.update(testMessageBlock);
			testMessageBlock = '[{"msgIndex": 4, "nikname": "zorro", "message": "aaaa"}, {"msgIndex": 5, "nikname": "zorro", "message": "bbbb"}, {"msgIndex": 6, "nikname": "pippo", "message": "cccc"}]';
			cd.update(testMessageBlock);
			testMessageBlock = '[{"msgIndex": 4, "nikname": "pippo", "message": "aaaa"}, {"msgIndex": 5, "nikname": "pippo", "message": "bbbb"}, {"msgIndex": 6, "nikname": "pippo", "message": "cccc"}]';
			cd.update(testMessageBlock);
			testMessageBlock = '[{"msgIndex": 4, "nikname": "Renzo", "message": "aaaa"}, {"msgIndex": 5, "nikname": "Renzo", "message": "bbbb"}, {"msgIndex": 6, "nikname": "Renzo", "message": "cccc"}]';
			cd.update(testMessageBlock);

      */