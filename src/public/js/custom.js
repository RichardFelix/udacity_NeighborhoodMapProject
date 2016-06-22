'use strict';

//////////////////////////////
//         Model            //
//////////////////////////////
var locations = [
    {
      "name": "John",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": 'Smith',
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Matty",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Prince",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Jewel",
      "lat" : 123,
      "log" : 5595
    }
]

//////////////////////////////
//     Place Object         //
//////////////////////////////
var Place = function Place(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.log = ko.observable(data.log);
};

//////////////////////////////
//       View Model         //
//////////////////////////////
var ViewModel = function ViewModel() {
  var self = this,
        locationLength = locations.length;

  // add all locations to a ko array
  self.locationList = ko.observableArray([]);
  for(var x = 0; x < locationLength; x++) {
    self.locationList.push( new Place(locations[x]) );
  }

  // filter visible list items
  self.filter = function() {
    //console.log(self.input());
    var inputLength = self.input().length;

    // first lowercase all letters in locationList array item and user input from
    // text box.  Then see if both match if so show those items.  Otherwise turn visability
    // off for that item.
    for(var x = 0; x < locationLength; x++) {
      var nameLowerCase = self.locationList()[x].name(),
          nameLowerCase = nameLowerCase.toLowerCase().substring(0,inputLength),
          inputLowerCase = self.input().toLowerCase().substring(0,inputLength);
console.log(inputLowerCase + " " + nameLowerCase);
      if(inputLowerCase === nameLowerCase && inputLowerCase !== '') {
        console.log('greta');
      }
    }
  };

  // text value
  self.input = ko.observable('');

  // self.name = ko.observable(self.locationList()[0].name());
  // self.name1 = ko.observable(self.locationList()[1].name());
  //
  // self.filterList = ko.observable(true);
  // self.input = ko.observable('');
  // self.filter = function() {
  //
  //   var userText = self.input().toLowerCase(),
  //       name = self.name().toLowerCase();
  //
  //   console.log(userText + " " + name);
  //   if(userText == name)
  //     self.filterList(false);
  // };
};

ko.applyBindings(new ViewModel());
