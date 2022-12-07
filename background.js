/*
Copyright 2018 The Extra Keyboards for Chrome OS Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var lut = {
	"Backquote": [ "\u1BA6", "`" ],
	
	// angka
	
	"Digit0": [ "\u1BB0", ")" ],
	"Digit1": [ "\u1BB1", "!" ],
	"Digit2": [ "\u1BB2", "@" ],
	"Digit3": [ "\u1BB3", "#" ],	
	"Digit4": [ "\u1BB4", "$" ],
	"Digit5": [ "\u1BB5", "%" ],
	"Digit6": [ "\u1BB6", "^" ],
	"Digit7": [ "\u1BB7", "&" ],
	"Digit8": [ "\u1BB8", "*" ],
	"Digit9": [ "\u1BB9", "(" ],
	// QWERT
  	"KeyQ": [ "ᮋ", "\u1B81" ],
  	"KeyW": [ "ᮝ", "\u1BA9" ],
  	"KeyE": [ "\u1BA8", "ᮈ" ],
  	"KeyR": [ "ᮛ", "\u1BA2" ],
  	"KeyT": [ "ᮒ", "\u1B86" ],
  	"KeyY": [ "ᮚ", "\u1BA1̓" ],
  	"KeyU": [ '\u1BA5', "ᮅ"],
  	"KeyI": [ "\u1BA4", "ᮄ" ],
  	"KeyO": [ "\u1BA7", "ᮇ" ],
  	"KeyP": [ "ᮕ", "p" ],
  	"KeyA": [ "", "ᮃ" ],
  	"KeyS": [ "ᮞ", "\u1BAF" ],
  	"KeyD": [ "ᮓ", "\u1B89" ],
  	"KeyF": [ "ᮖ", "ᮻ" ],
  	"KeyG": [ "ᮌ", "\u1B8D" ],
  	"KeyH": [ "ᮠ", "\u1B82" ],
  	"KeyJ": [ "ᮏ", "\u1BAE" ],
  	"KeyK": [ "ᮊ", "ᮾ" ],
  	"KeyL": [ "ᮜ", "\u1BA3" ],
  	"Semicolon": [ "᮪", ":" ],
  	"KeyZ": [ "ᮐ", "\u1BAC" ],
  	"KeyX": [ "ᮟ", "\u1BAD" ],
  	"KeyC": [ "ᮎ", "ᮑ" ],
  	"KeyV": [ "ᮗ", "ᮺ" ],
  	"KeyB": [ "ᮘ", "ᮽ" ],
  	"KeyN": [ "ᮔ", "\u1B80" ],
  	"KeyM": [ "ᮙ", "ᮿ" ],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
